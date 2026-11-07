Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackground([string]$srcPath, [string]$destPath, [int]$threshold = 238) {
    $srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)
    
    # Scale down to crisp 600x400 for mobile game performance
    $targetW = 600
    $targetH = [int](($srcImg.Height * $targetW) / $srcImg.Width)
    
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($srcImg, 0, 0, $targetW, $targetH)
    $g.Dispose()
    $srcImg.Dispose()
    
    # Flood-fill from outer border
    $visited = New-Object 'bool[,]' $targetW, $targetH
    $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]
    
    # Add border pixels to queue
    for ($x = 0; $x -lt $targetW; $x++) {
        $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $targetH - 1)))
        $visited[$x, 0] = $true
        $visited[$x, $targetH - 1] = $true
    }
    for ($y = 0; $y -lt $targetH; $y++) {
        $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($targetW - 1, $y)))
        $visited[0, $y] = $true
        $visited[$targetW - 1, $y] = $true
    }
    
    # BFS flood fill
    while ($queue.Count -gt 0) {
        $pt = $queue.Dequeue()
        $px = $pt.X
        $py = $pt.Y
        $color = $bmp.GetPixel($px, $py)
        
        # Check if near white/light grey
        $isBg = ($color.R -ge $threshold -and $color.G -ge $threshold -and $color.B -ge $threshold)
        if ($isBg) {
            # Make transparent
            $bmp.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            
            # Check 4 neighbors
            $neighbors = @(
                (New-Object System.Drawing.Point($px + 1, $py)),
                (New-Object System.Drawing.Point($px - 1, $py)),
                (New-Object System.Drawing.Point($px, $py + 1)),
                (New-Object System.Drawing.Point($px, $py - 1))
            )
            foreach ($n in $neighbors) {
                if ($n.X -ge 0 -and $n.X -lt $targetW -and $n.Y -ge 0 -and $n.Y -lt $targetH) {
                    if (-not $visited[$n.X, $n.Y]) {
                        $visited[$n.X, $n.Y] = $true
                        $queue.Enqueue($n)
                    }
                }
            }
        }
    }
    
    # Save as PNG with transparency
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Processed transparent cutout: $destPath"
}

$destDir = 'D:\03. Game Boim\assets\animals_cutout'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$testSrc = 'D:\03. Game Boim\Karakter Hewan\singa.jpg.jpeg'
$testDest = Join-Path $destDir 'singa.png'
Remove-WhiteBackground $testSrc $testDest
