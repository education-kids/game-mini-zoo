Add-Type -AssemblyName System.Drawing

$srcPath = "assets\slides\cover.jpg"
$destPath = "assets\slides\cover_resume.jpg"
$previewPath = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\cover_resume_preview.png"

$bmp = New-Object System.Drawing.Bitmap($srcPath)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Helper function to stamp with soft edge feathering
function Stamp-Texture($srcRect, $destRect, $alpha) {
    $crop = $bmp.Clone($srcRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cm = New-Object System.Drawing.Imaging.ColorMatrix
    $cm.Matrix33 = $alpha # Alpha multiplier
    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)
    $g.DrawImage($crop, $destRect, 0, 0, $crop.Width, $crop.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
    $crop.Dispose()
    $ia.Dispose()
}

# 1. First cover upper foliage (y = 505 to 550) using the shrubs at y = 465 to 505
$rectFoliageSrc = New-Object System.Drawing.Rectangle(475, 470, 420, 38)
$rectFoliageDest = New-Object System.Drawing.Rectangle(475, 508, 420, 42)
Stamp-Texture $rectFoliageSrc $rectFoliageDest 1.0

# 2. Cover the yellow sparks on the right (x=875-930, y=515-585) using hedge at x=940-990, y=520-590
$rectHedgeSrc = New-Object System.Drawing.Rectangle(945, 520, 60, 75)
$rectHedgeDest = New-Object System.Drawing.Rectangle(875, 515, 65, 80)
Stamp-Texture $rectHedgeSrc $rectHedgeDest 1.0

# 3. Path area: The stone cobblestone walkway extends diagonally from Mini Zoo gate (x=800-920, y=580) down to foreground (x=600-1000, y=650-718)
# Sample stones from foreground x=660-980, y=655-715
$rectStoneSrc1 = New-Object System.Drawing.Rectangle(660, 655, 300, 60)
$rectStoneDest1 = New-Object System.Drawing.Rectangle(620, 580, 275, 75)
Stamp-Texture $rectStoneSrc1 $rectStoneDest1 1.0

# Upper path connection leading to gate
$rectStoneSrc2 = New-Object System.Drawing.Rectangle(780, 655, 180, 55)
$rectStoneDest2 = New-Object System.Drawing.Rectangle(740, 550, 160, 60)
Stamp-Texture $rectStoneSrc2 $rectStoneDest2 0.9

# 4. Lawn grass on the left (x=475-630, y=540-660)
$rectGrassSrc = New-Object System.Drawing.Rectangle(340, 630, 95, 80)
$rectGrassDest = New-Object System.Drawing.Rectangle(475, 545, 125, 105)
Stamp-Texture $rectGrassSrc $rectGrassDest 1.0

# Blend boundary between grass and stone path (x=580-640)
$rectBlendSrc = New-Object System.Drawing.Rectangle(560, 660, 70, 50)
$rectBlendDest = New-Object System.Drawing.Rectangle(580, 575, 70, 75)
Stamp-Texture $rectBlendSrc $rectBlendDest 0.85

# Soft feathering passes on borders
$rectFoliageDest2 = New-Object System.Drawing.Rectangle(475, 535, 420, 25)
Stamp-Texture $rectFoliageSrc $rectFoliageDest2 0.35

$g.Dispose()

# Save final cover_resume.jpg and preview png
$bmp.Save($previewPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Save as high-quality JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
$bmp.Save($destPath, $codec, $ep)
$bmp.Dispose()

Write-Output "Successfully generated: $destPath and $previewPath"
