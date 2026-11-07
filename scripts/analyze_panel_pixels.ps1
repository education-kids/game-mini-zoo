Add-Type -AssemblyName System.Drawing

function AnalyzePanel($name) {
  $file = "C:\Users\TUF\.gemini\antigravity\brain\20b84d47-09db-4cdd-b38e-46ba02d50737\panels\$name`_panel.png"
  $bmp = New-Object System.Drawing.Bitmap($file)
  Write-Output "=== Analyzing $name (Height: $($bmp.Height)) ==="
  
  # Scan column 300 from y = 300 to y = 630
  for ($y = 300; $y -lt 630; $y += 5) {
    $c = $bmp.GetPixel(300, $y)
    $slideY = $y + 40
    $pctY = [math]::Round($slideY / 720 * 100, 1)
    # Check if border (dark brown) or pill inside (cream or orange)
    $type = "other"
    if ($c.R -gt 230 -and $c.G -gt 200 -and $c.B -gt 150) { $type = "CREAM PILL" }
    elseif ($c.R -gt 230 -and $c.G -gt 130 -and $c.B -lt 60) { $type = "ORANGE BTN" }
    elseif ($c.R -lt 120 -and $c.G -lt 60 -and $c.B -lt 25) { $type = "DARK BORDER" }
    Write-Output "y=$slideY (${pctY}%): R=$($c.R) G=$($c.G) B=$($c.B) -> $type"
  }
  $bmp.Dispose()
}

AnalyzePanel "karnivora_1"
AnalyzePanel "omnivora_3"
