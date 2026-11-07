Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("D:\03. Game Boim\NASKAH ALUR PERMAINAN.docx")
Write-Host "Total entries: $($zip.Entries.Count)"
$media = $zip.Entries | Where-Object { $_.FullName -like "word/media/*" }
Write-Host "Total media in docx: $($media.Count)"
foreach ($m in $media) {
    Write-Host "$($m.FullName) -> $([math]::Round($m.Length/1024, 1)) KB"
}
$zip.Dispose()
