Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("D:\03. Game Boim\NASKAH ALUR PERMAINAN.docx")
$entry = $zip.GetEntry("word/document.xml")
[System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, "D:\03. Game Boim\scripts\document.xml", $true)
$rels = $zip.GetEntry("word/_rels/document.xml.rels")
[System.IO.Compression.ZipFileExtensions]::ExtractToFile($rels, "D:\03. Game Boim\scripts\document.xml.rels", $true)
$zip.Dispose()
Write-Host "Extracted xml and rels successfully!"
