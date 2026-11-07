const https = require('https');
const fs = require('fs');

const thumbUrl = 'https://www.figma.com/file/cSg8ZmqnwTpwLVH6OVxfiu/thumbnail?node-id=4003-3';

function download(url, dest) {
  const file = fs.createWriteStream(dest);
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  }, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      console.log('Redirecting to:', response.headers.location);
      return download(response.headers.location, dest);
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded thumbnail:', fs.statSync(dest).size, 'bytes');
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    console.error(err);
  });
}

download(thumbUrl, 'assets/figma_thumb.png');
