Add-Type -AssemblyName System.Drawing

$slides = @(
  'karnivora_1', 'karnivora_2', 'karnivora_3', 'karnivora_4', 'karnivora_5',
  'herbivora_1', 'herbivora_2', 'herbivora_3', 'herbivora_4', 'herbivora_5',
  'omnivora_1', 'omnivora_2', 'omnivora_3', 'omnivora_4', 'omnivora_5'
)

foreach ($s in $slides) {
  $path = (Resolve-Path "assets\slides\$s.jpg").Path
  $bmp = New-Object System.Drawing.Bitmap($path)
  $x = 1050 # horizontal middle of options
  
  $yRanges = @()
  $inBtn = $false
  $startY = 0
  
  for ($y = 350; $y -lt 710; $y++) {
    $c = $bmp.GetPixel($x, $y)
    # Check if pixel is light cream (option body) or bright orange (submit body)
    $isBtn = ($c.R -gt 230 -and $c.G -gt 200 -and $c.B -gt 150) -or ($c.R -gt 240 -and $c.G -gt 150 -and $c.B -lt 60)
    if (-not $inBtn -and $isBtn) {
      $inBtn = $true
      $startY = $y
    } elseif ($inBtn -and -not $isBtn) {
      $inBtn = $false
      if (($y - $startY) -gt 20) {
        $yRanges += "$startY-$y (h=$($y-$startY), pct=$([math]::Round($startY/720*100, 1))%-$([math]::Round($y/720*100, 1))%)"
      }
    }
  }
  if ($inBtn -and (($y - $startY) -gt 20)) {
    $yRanges += "$startY-$y"
  }
  
  $bmp.Dispose()
  Write-Output "$s : $($yRanges -join ' ; ')"
}
