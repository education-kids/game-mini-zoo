const https = require('https');

const url = 'https://www.figma.com/proto/cSg8ZmqnwTpwLVH6OVxfiu/UI-Button-For-Kids-6---12-Years-Old--Community-?node-id=4003-3';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const title = html.match(/<title>([^<]+)<\/title>/i);
    const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/i);
    const ogDesc = html.match(/property="og:description"\s+content="([^"]+)"/i);
    const twitterImg = html.match(/name="twitter:image(?::src)?"\s+content="([^"]+)"/i);
    console.log('Title:', title ? title[1] : 'none');
    console.log('OG Image:', ogImage ? ogImage[1] : 'none');
    console.log('Twitter Image:', twitterImg ? twitterImg[1] : 'none');
    console.log('OG Desc:', ogDesc ? ogDesc[1] : 'none');
  });
}).on('error', (err) => console.error(err));
