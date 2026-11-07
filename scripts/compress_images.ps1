Add-Type -AssemblyName System.Drawing

function Compress-ImageFile {
    param(
        [string]$SrcPath,
        [string]$DstPath,
        [int]$Quality = 70,
        [int]$MaxWidth = 960,
        [int]$MaxHeight = 540
    )
    
    $orig = [System.Drawing.Bitmap]::FromFile($SrcPath)
    
    # Calculate scaled dimensions preserving aspect ratio
    $ratioX = $MaxWidth / $orig.Width
    $ratioY = $MaxHeight / $orig.Height
    $ratio = [Math]::Min($ratioX, $ratioY)
    
    $newWidth = [int]($orig.Width * $ratio)
    $newHeight = [int]($orig.Height * $ratio)
    
    $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($orig, 0, 0, $newWidth, $newHeight)
    $g.Dispose()
    $orig.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
    
    $resized.Save($DstPath, $codec, $encoderParams)
    $resized.Dispose()
    
    $bytes = (Get-Item $DstPath).Length
    Write-Host "Compressed ${DstPath}: $([math]::Round($bytes / 1024, 1)) KB"
}

$userDir = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\.user_uploaded"
$outDir = "d:\03. Game Boim\assets\compressed"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Compress-ImageFile "$userDir\media_1793982509138_944008b3.jpg" "$outDir\bg_splash.jpg" 62 960 540
Compress-ImageFile "$userDir\media_1793982561879_fa2cfb9c.jpg" "$outDir\bg_instructions.jpg" 62 960 540
Compress-ImageFile "$userDir\media_1793982548570_ba5d99a5.jpg" "$outDir\bg_main_map.jpg" 62 960 540
Compress-ImageFile "$userDir\media_1793982583938_d2e775c1.jpg" "$outDir\bg_reward.jpg" 62 960 540
Compress-ImageFile "$userDir\media_1793982611999_a48d5547.jpg" "$outDir\bg_victory.jpg" 62 960 540
