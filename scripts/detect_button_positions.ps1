Add-Type -AssemblyName System.Drawing

$panels = @(
  'karnivora_1', 'karnivora_2', 'karnivora_3', 'karnivora_4', 'karnivora_5',
  'herbivora_1', 'herbivora_2', 'herbivora_3', 'herbivora_4', 'herbivora_5',
  'omnivora_1', 'omnivora_2', 'omnivora_3', 'omnivora_4', 'omnivora_5'
)

$panelDir = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\panels"

# Full slide is 1280 x 720. The panel crop was: x=780, y=40, width=480, height=650.
# In slide coordinates:
# slideX = 780 + panelX
# slideY = 40 + panelY

foreach ($p in $panels) {
  $file = Join-Path $panelDir "$p`_panel.png"
  if (!(Test-Path $file)) { continue }
  $bmp = New-Object System.Drawing.Bitmap($file)
  
  # Scan column at panelX = 250 (which is slideX = 1030)
  # Let's find vertical segments that match button interiors
  $results = @()
  $inPill = $false
  $pillType = ""
  $startY = 0
  
  for ($y = 0; $y -lt $bmp.Height; $y++) {
    $c = $bmp.GetPixel(250, $y)
    
    # Cream pill (Option A, B, C): high R, high G, moderate-to-high B, relatively neutral warm
    $isCream = ($c.R -gt 220 -and $c.G -gt 200 -and $c.B -gt 150 -and ($c.R - $c.B) -lt 85)
    # Orange pill (Jawab Sekarang): high R, moderate G, low B
    $isOrange = ($c.R -gt 230 -and $c.G -gt 140 -and $c.G -lt 210 -and $c.B -lt 60)
    
    $currentType = if ($isCream) { "cream" } elseif ($isOrange) { "orange" } else { "" }
    
    if (-not $inPill -and $currentType -ne "") {
      $inPill = $true
      $pillType = $currentType
      $startY = $y
    } elseif ($inPill -and ($currentType -ne $pillType)) {
      $inPill = $false
      $height = $y - $startY
      if ($height -gt 25) {
        $slideTop = 40 + $startY
        $slideBottom = 40 + $y
        $pctTop = [math]::Round($slideTop / 720 * 100, 2)
        $pctH = [math]::Round($height / 720 * 100, 2)
        $results += $pillType + ": top=" + $slideTop + "px (" + $pctTop + "%), h=" + $height + "px (" + $pctH + "%)"
      }
    }
  }
  
  $bmp.Dispose()
  Write-Output "[$p] buttons detected: $($results.Count)"
  foreach ($r in $results) {
    Write-Output "   $r"
  }
}
