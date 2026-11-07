Add-Type -AssemblyName System.Drawing

$file = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\panels\karnivora_2_panel.png"
$bmp = New-Object System.Drawing.Bitmap($file)

# Scan column 300 from y = 300 to y = 640
for ($y = 350; $y -lt 640; $y += 5) {
  $c = $bmp.GetPixel(300, $y)
  $slideY = $y + 40
  $pctY = [math]::Round($slideY / 720 * 100, 1)
  $type = "other"
  if ($c.R -gt 230 -and $c.G -gt 200 -and $c.B -gt 150) { $type = "CREAM PILL" }
  elseif ($c.R -gt 230 -and $c.G -gt 130 -and $c.B -lt 60) { $type = "ORANGE BTN" }
  elseif ($c.R -lt 120 -and $c.G -lt 60 -and $c.B -lt 25) { $type = "DARK BORDER" }
  Write-Output "y=$slideY (${pctY}%): R=$($c.R) G=$($c.G) B=$($c.B) -> $type"
}
$bmp.Dispose()
