Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("D:\03. Game Boim\assets\slides\tamat.png")
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# Sample horizontal strip at y = 80% to 90%
$ySample = [int]($bmp.Height * 0.82)
$changes = @()
$prevIsBright = $false

for ($x = 0; $x -lt $bmp.Width; $x += 5) {
    $c = $bmp.GetPixel($x, $ySample)
    $isBright = ($c.R -gt 180 -and $c.G -gt 140) -or ($c.G -gt 150 -and $c.B -lt 100)
    if ($isBright -ne $prevIsBright) {
        $pct = [math]::Round(($x / $bmp.Width) * 100, 1)
        $changes += "$pct% (x=$x, isBright=$isBright, RGB=$($c.R),$($c.G),$($c.B))"
        $prevIsBright = $isBright
    }
}
$bmp.Dispose()
$changes | ForEach-Object { Write-Host $_ }
