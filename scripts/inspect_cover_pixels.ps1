Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('assets\slides\cover.jpg')
$rect = New-Object System.Drawing.Rectangle(440, 480, 520, 200)
$crop = $bmp.Clone($rect, $bmp.PixelFormat)
$crop.Save('C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\cover_button_crop.png', [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$bmp.Dispose()
Write-Output "Saved cover_button_crop.png"
