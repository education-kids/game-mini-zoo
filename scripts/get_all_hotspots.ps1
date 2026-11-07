Add-Type -AssemblyName System.Drawing

$slides = @(
  'karnivora_1', 'karnivora_2', 'karnivora_3', 'karnivora_4', 'karnivora_5',
  'herbivora_1', 'herbivora_2', 'herbivora_3', 'herbivora_4', 'herbivora_5',
  'omnivora_1', 'omnivora_2', 'omnivora_3', 'omnivora_4', 'omnivora_5'
)

$out = @{}

foreach ($s in $slides) {
  $file = (Resolve-Path "assets\slides\$s.jpg").Path
  $bmp = New-Object System.Drawing.Bitmap($file)
  
  # We know the options are located around x = 860 to 1240 (67.4% to 97%)
  # Let's inspect column x = 900, 1000, 1100
  # At y = 380 to 670
  # Find dark brown borders of the 3 pills and the orange button
  # A border is where luminance drops sharply and R is dark brown
  
  $yProfile = @()
  for ($y = 380; $y -lt 670; $y++) {
    $c = $bmp.GetPixel(1050, $y)
    # Brightness / button test
    $isCream = ($c.R -gt 225 -and $c.G -gt 205 -and $c.B -gt 150)
    $isOrange = ($c.R -gt 230 -and $c.G -gt 130 -and $c.B -lt 60)
    $yProfile += if ($isCream) { "C" } elseif ($isOrange) { "O" } else { "." }
  }
  
  $str = -join $yProfile
  # Find segments of C and O
  $matches = [regex]::Matches($str, "(C+|O+)")
  $btnInfo = @()
  foreach ($m in $matches) {
    if ($m.Length -ge 12) {
      $top = 380 + $m.Index
      $h = $m.Length
      $bottom = $top + $h
      $type = if ($m.Value[0] -eq 'C') { "Option" } else { "Submit" }
      $pctTop = [math]::Round($top / 720 * 100, 2)
      $pctH = [math]::Round($h / 720 * 100, 2)
      $btnInfo += [PSCustomObject]@{
        Type = $type
        Top = $top
        Height = $h
        PctTop = $pctTop
        PctH = $pctH
      }
    }
  }
  $bmp.Dispose()
  Write-Output "=== $s (found $($btnInfo.Count) buttons) ==="
  for ($i = 0; $i -lt $btnInfo.Count; $i++) {
    $b = $btnInfo[$i]
    Write-Output "   [$($i+1)] $($b.Type): Top=$($b.Top)px ($($b.PctTop)%), H=$($b.Height)px ($($b.PctH)%)"
  }
}
