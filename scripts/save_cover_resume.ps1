Add-Type -AssemblyName System.Drawing

$srcClean = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\cover_clean_1794023113033.jpg"
$destCleanJpg = "assets\slides\cover_resume.jpg"
$destCleanPng = "assets\slides\cover_resume.png"

$origCover = New-Object System.Drawing.Bitmap("assets\slides\cover.jpg")
$targetW = $origCover.Width
$targetH = $origCover.Height
$origCover.Dispose()

Write-Output "Target dimensions from original cover.jpg: $targetW x $targetH"

$cleanBmp = New-Object System.Drawing.Bitmap($srcClean)
$resized = New-Object System.Drawing.Bitmap($targetW, $targetH)
$g = [System.Drawing.Graphics]::FromImage($resized)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($cleanBmp, 0, 0, $targetW, $targetH)
$g.Dispose()
$cleanBmp.Dispose()

# Save PNG
$resized.Save($destCleanPng, [System.Drawing.Imaging.ImageFormat]::Png)

# Save JPG (quality 92)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
$resized.Save($destCleanJpg, $codec, $ep)
$resized.Dispose()

Write-Output "Successfully saved $destCleanJpg and $destCleanPng"
