Add-Type -AssemblyName System.Drawing

$srcDir = 'D:\03. Game Boim\Karakter Hewan'
$destDir = 'D:\03. Game Boim\assets\animals'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$files = Get-ChildItem -Path $srcDir -Filter '*.jpeg'
foreach ($f in $files) {
    $baseName = $f.BaseName.Replace('.jpg', '')
    $outPath = Join-Path $destDir ($baseName + '.jpg')
    
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $targetW = 800
    $targetH = [int](($img.Height * $targetW) / $img.Width)
    
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($img, 0, 0, $targetW, $targetH)
    $bmp.Save($outPath, $jpegCodec, $encoderParams)
    
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    
    $fileInfo = Get-Item $outPath
    $kb = [math]::Round($fileInfo.Length / 1024, 1)
    Write-Host "Optimized $baseName -> $kb KB"
}
