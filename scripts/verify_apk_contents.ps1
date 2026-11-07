Add-Type -AssemblyName System.IO.Compression.FileSystem

$apkPath = "D:\03. Game Boim\android\app\build\outputs\apk\debug\app-debug.apk"
$zip = [System.IO.Compression.ZipFile]::OpenRead($apkPath)

$slides = $zip.Entries | Where-Object { $_.FullName -like "assets/public/assets/slides/*" }
$minimaps = $zip.Entries | Where-Object { $_.FullName -like "assets/public/assets/minimaps/*" }
$animals = $zip.Entries | Where-Object { $_.FullName -like "assets/public/assets/animals/*" }

Write-Host "--- PACKAGED ASSETS IN APK ---"
Write-Host "Slides in APK:" $slides.Count
Write-Host "Minimaps in APK:" $minimaps.Count
Write-Host "Animal Sprites in APK:" $animals.Count
Write-Host "Total verified game assets in APK:" ($slides.Count + $minimaps.Count + $animals.Count)

$zip.Dispose()
