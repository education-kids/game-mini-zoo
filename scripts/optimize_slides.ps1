Add-Type -AssemblyName System.Drawing

$srcDir = "d:\03. Game Boim\assets\slides"
$backupDir = "d:\03. Game Boim\assets\slides_raw"
$optDir = "d:\03. Game Boim\assets\slides_opt"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
New-Item -ItemType Directory -Force -Path $optDir | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$files = Get-ChildItem -Path $srcDir -Filter "*.png"
Write-Host "Optimizing $($files.Count) slides..."

foreach ($f in $files) {
    Copy-Item $f.FullName -Destination "$backupDir\$($f.Name)" -Force
    
    $orig = [System.Drawing.Bitmap]::FromFile($f.FullName)
    $ratio = [Math]::Min(1280 / $orig.Width, 720 / $orig.Height)
    $w = [int]($orig.Width * $ratio)
    $h = [int]($orig.Height * $ratio)
    
    $resized = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($orig, 0, 0, $w, $h)
    
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $dstPath = "$optDir\$baseName.jpg"
    $resized.Save($dstPath, $codec, $p)
    
    $g.Dispose()
    $resized.Dispose()
    $orig.Dispose()
    
    $kb = [math]::Round((Get-Item $dstPath).Length / 1024, 1)
    Write-Host "Saved $baseName.jpg ($kb KB)"
}

Write-Host "Optimization finished!"
