Add-Type -AssemblyName System.Drawing

function FindButtons($imgPath, $name) {
    $bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
    Write-Host "=== Analyzing $name ($($bmp.Width)x$($bmp.Height)) ==="
    
    # Sample along bottom 30% of image to find high saturation / vibrant colored button areas
    # (buttons are typically bright yellow/gold, orange, or green)
    $h = $bmp.Height
    $w = $bmp.Width
    $step = 10
    
    $buttonPixels = @()
    for ($y = [int]($h * 0.65); $y -lt $h; $y += $step) {
        for ($x = 0; $x -lt $w; $x += $step) {
            $c = $bmp.GetPixel($x, $y)
            # Yellow/Gold button: R > 200, G > 160, B < 80
            # Green button: G > 160, R < 120
            # Orange button: R > 210, G > 100, B < 60
            if (($c.R -gt 200 -and $c.G -gt 150 -and $c.B -lt 90) -or 
                ($c.G -gt 150 -and $c.R -lt 120 -and $c.B -lt 100) -or
                ($c.R -gt 210 -and $c.G -gt 90 -and $c.B -lt 50)) {
                $buttonPixels += @{ X = $x; Y = $y; Color = $c }
            }
        }
    }
    
    if ($buttonPixels.Count -gt 0) {
        $minX = ($buttonPixels | Measure-Object -Property X -Minimum).Minimum
        $maxX = ($buttonPixels | Measure-Object -Property X -Maximum).Maximum
        $minY = ($buttonPixels | Measure-Object -Property Y -Minimum).Minimum
        $maxY = ($buttonPixels | Measure-Object -Property Y -Maximum).Maximum
        
        $pctL = [math]::Round(($minX / $w) * 100, 2)
        $pctT = [math]::Round(($minY / $h) * 100, 2)
        $pctW = [math]::Round((($maxX - $minX) / $w) * 100, 2)
        $pctH = [math]::Round((($maxY - $minY) / $h) * 100, 2)
        Write-Host "Detected button cluster: left $pctL%, top $pctT%, width $pctW%, height $pctH%"
    }
    
    $bmp.Dispose()
}

FindButtons "d:\03. Game Boim\assets\slides\pre_ending.png" "pre_ending.png"
FindButtons "d:\03. Game Boim\assets\slides\tamat.png" "tamat.png"
FindButtons "d:\03. Game Boim\assets\slides\karnivora_gate.png" "karnivora_gate.png"
FindButtons "d:\03. Game Boim\assets\slides\pembuka.png" "pembuka.png"
