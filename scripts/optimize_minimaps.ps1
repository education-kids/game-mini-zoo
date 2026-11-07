Add-Type -AssemblyName System.Drawing

$srcDir = "d:\03. Game Boim\assets\minimaps"
$backupDir = "d:\03. Game Boim\assets\minimaps_raw"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

# Only process from backup to ensure clean inputs
$files = Get-ChildItem -Path $backupDir -Include "*.png", "*.jpg" -Recurse
Write-Host "Optimizing $($files.Count) minimaps from backup..."

foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $ms = New-Object System.IO.MemoryStream(,$bytes)
    $orig = [System.Drawing.Bitmap]::FromStream($ms)
    
    $ratio = [Math]::Min(1280 / $orig.Width, 720 / $orig.Height)
    $w = [int]($orig.Width * $ratio)
    $h = [int]($orig.Height * $ratio)
    
    $resized = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($orig, 0, 0, $w, $h)
    
    $orig.Dispose()
    $ms.Dispose()
    
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $dstPath = "$srcDir\$baseName.jpg"
    if (Test-Path $dstPath) { Remove-Item $dstPath -Force }
    $resized.Save($dstPath, $codec, $p)
    
    $g.Dispose()
    $resized.Dispose()
    
    $kb = [math]::Round((Get-Item $dstPath).Length / 1024, 1)
    Write-Host "Saved $baseName.jpg ($kb KB)"
}

Write-Host "Minimaps optimization completely finished without errors!"
