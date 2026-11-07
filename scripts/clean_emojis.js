const fs = require('fs');

const path = 'src/Index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace emojis
html = html.replace('📋 Alur Game', 'Alur Game');
html = html.replace('🗺️ Peta Jalur', 'Peta Jalur');
html = html.replace('🗺️ Perbesar Peta', 'Perbesar Peta');
html = html.replace('🗺️ Peta Tuntas', 'Peta Tuntas');
html = html.replace('Lanjut ke Piagam Tamat ➜', 'Lanjut ke Piagam Tamat');

fs.writeFileSync(path, html, 'utf8');
console.log('Removed emojis from src/Index.html');
