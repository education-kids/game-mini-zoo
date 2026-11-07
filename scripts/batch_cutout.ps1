$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class ImageProcessor
{
    public static void MakeTransparentCutout(string srcPath, string destPath, int threshold = 236)
    {
        using (Bitmap original = (Bitmap)Image.FromFile(srcPath))
        {
            int targetW = 600;
            int targetH = (int)((long)original.Height * targetW / original.Width);

            using (Bitmap bmp = new Bitmap(targetW, targetH, PixelFormat.Format32bppArgb))
            {
                using (Graphics g = Graphics.FromImage(bmp))
                {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    g.DrawImage(original, 0, 0, targetW, targetH);
                }

                BitmapData bmpData = bmp.LockBits(
                    new Rectangle(0, 0, targetW, targetH),
                    ImageLockMode.ReadWrite,
                    PixelFormat.Format32bppArgb);

                int stride = bmpData.Stride;
                int bytes = Math.Abs(stride) * targetH;
                byte[] rgbValues = new byte[bytes];
                System.Runtime.InteropServices.Marshal.Copy(bmpData.Scan0, rgbValues, 0, bytes);

                bool[,] visited = new bool[targetW, targetH];
                Queue<Point> queue = new Queue<Point>();

                for (int x = 0; x < targetW; x++)
                {
                    queue.Enqueue(new Point(x, 0));
                    visited[x, 0] = true;
                    queue.Enqueue(new Point(x, targetH - 1));
                    visited[x, targetH - 1] = true;
                }
                for (int y = 0; y < targetH; y++)
                {
                    queue.Enqueue(new Point(0, y));
                    visited[0, y] = true;
                    queue.Enqueue(new Point(targetW - 1, y));
                    visited[targetW - 1, y] = true;
                }

                int[] dx = { 1, -1, 0, 0 };
                int[] dy = { 0, 0, 1, -1 };

                while (queue.Count > 0)
                {
                    Point pt = queue.Dequeue();
                    int idx = pt.Y * stride + pt.X * 4;
                    byte b = rgbValues[idx];
                    byte gVal = rgbValues[idx + 1];
                    byte r = rgbValues[idx + 2];

                    if (r >= threshold && gVal >= threshold && b >= threshold)
                    {
                        // Set alpha to 0
                        rgbValues[idx + 3] = 0;

                        for (int i = 0; i < 4; i++)
                        {
                            int nx = pt.X + dx[i];
                            int ny = pt.Y + dy[i];
                            if (nx >= 0 && nx < targetW && ny >= 0 && ny < targetH && !visited[nx, ny])
                            {
                                visited[nx, ny] = true;
                                queue.Enqueue(new Point(nx, ny));
                            }
                        }
                    }
                }

                System.Runtime.InteropServices.Marshal.Copy(rgbValues, 0, bmpData.Scan0, bytes);
                bmp.UnlockBits(bmpData);

                bmp.Save(destPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies System.Drawing

$srcDir = 'D:\03. Game Boim\Karakter Hewan'
$destDir = 'D:\03. Game Boim\assets\animals_cutout'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$files = Get-ChildItem -Path $srcDir -Filter '*.jpeg'
foreach ($f in $files) {
    $baseName = $f.BaseName.Replace('.jpg', '')
    $outPath = Join-Path $destDir ($baseName + '.png')
    [ImageProcessor]::MakeTransparentCutout($f.FullName, $outPath, 236)
    $fi = Get-Item $outPath
    Write-Host "Processed transparent cutout: $baseName.png ($([math]::Round($fi.Length/1024, 1)) KB)"
}
