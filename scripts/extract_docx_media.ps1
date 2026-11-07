Add-Type -AssemblyName System.IO.Compression.FileSystem
$dest = "D:\03. Game Boim\assets\docx_media"
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

$zip = [System.IO.Compression.ZipFile]::OpenRead("D:\03. Game Boim\NASKAH ALUR PERMAINAN.docx")
$media = $zip.Entries | Where-Object { $_.FullName -like "word/media/*" }
Write-Host "Extracting $($media.Count) media files to $dest..."

foreach ($m in $media) {
    $outPath = Join-Path $dest $m.Name
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($m, $outPath, $true)
}
$zip.Dispose()
Write-Host "Extraction complete!"
