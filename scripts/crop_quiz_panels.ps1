Add-Type -AssemblyName System.Drawing

$slides = @(
  'karnivora_1', 'karnivora_2', 'karnivora_3', 'karnivora_4', 'karnivora_5',
  'herbivora_1', 'herbivora_2', 'herbivora_3', 'herbivora_4', 'herbivora_5',
  'omnivora_1', 'omnivora_2', 'omnivora_3', 'omnivora_4', 'omnivora_5'
)

$outDir = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\panels"
if (!(Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

foreach ($s in $slides) {
  $imgPath = "assets\slides\$s.jpg"
  if (Test-Path $imgPath) {
    $fullPath = (Resolve-Path $imgPath).Path
    $bmp = New-Object System.Drawing.Bitmap($fullPath)
    $rect = New-Object System.Drawing.Rectangle(780, 40, 480, 650)
    $crop = $bmp.Clone($rect, $bmp.PixelFormat)
    $outPath = Join-Path $outDir "$s`_panel.png"
    $crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    $bmp.Dispose()
    Write-Output "Cropped $s -> $outPath"
  }
}
