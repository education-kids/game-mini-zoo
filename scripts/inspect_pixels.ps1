Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem -Path 'D:\03. Game Boim\Karakter Hewan' -Filter '*.jpeg'
foreach ($f in $files) {
    $img = [System.Drawing.Bitmap]::FromFile($f.FullName)
    $tl = $img.GetPixel(10, 10)
    $tr = $img.GetPixel($img.Width - 10, 10)
    $bl = $img.GetPixel(10, $img.Height - 10)
    Write-Host "$($f.Name): TL=($($tl.R), $($tl.G), $($tl.B)) TR=($($tr.R), $($tr.G), $($tr.B)) BL=($($bl.R), $($bl.G), $($bl.B))"
    $img.Dispose()
}
