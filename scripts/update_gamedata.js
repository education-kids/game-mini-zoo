const fs = require('fs');

const path = 'src/GameData.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Update kingdoms with minimapGate and minimapEnd
content = content.replace(
  "castleKey: 'karnivora_castle',",
  "castleKey: 'karnivora_castle',\n      minimapGate: 'assets/minimaps/karnivora_minimap_1.jpg',\n      minimapEnd: 'assets/minimaps/karnivora_minimap_end.jpg',"
);

content = content.replace(
  "castleKey: 'herbivora_castle',",
  "castleKey: 'herbivora_castle',\n      minimapGate: 'assets/minimaps/herbivora_minimap_1.jpg',\n      minimapEnd: 'assets/minimaps/herbivora_minimap_end.jpg',"
);

content = content.replace(
  "castleKey: 'omnivora_castle',",
  "castleKey: 'omnivora_castle',\n      minimapGate: 'assets/minimaps/omnivora_minimap_1.jpg',\n      minimapEnd: 'assets/minimaps/omnivora_minimap_ending.jpg',"
);

// 2. Update levels with slideImage and minimapImage
const levelMapping = [
  // Karnivora
  { id: 'singa', slide: 'assets/slides/karnivora_1.jpg', map: 'assets/minimaps/karnivora_minimap_1.jpg' },
  { id: 'harimau', slide: 'assets/slides/karnivora_2.jpg', map: 'assets/minimaps/karnivora_minimap_2.jpg' },
  { id: 'buaya', slide: 'assets/slides/karnivora_3.jpg', map: 'assets/minimaps/karnivora_minimap_3.jpg' },
  { id: 'serigala', slide: 'assets/slides/karnivora_4.jpg', map: 'assets/minimaps/karnivora_minimap_4.jpg' },
  { id: 'hiu', slide: 'assets/slides/karnivora_5.jpg', map: 'assets/minimaps/karnivora_minimap_5.jpg' },

  // Herbivora
  { id: 'sapi', slide: 'assets/slides/herbivora_1.jpg', map: 'assets/minimaps/herbivora_minimap_1.jpg' },
  { id: 'kelinci', slide: 'assets/slides/herbivora_2.jpg', map: 'assets/minimaps/herbivora_minimap_2.jpg' },
  { id: 'jerapah', slide: 'assets/slides/herbivora_3.jpg', map: 'assets/minimaps/herbivora_minimap_3.jpg' },
  { id: 'gajah', slide: 'assets/slides/herbivora_4.jpg', map: 'assets/minimaps/herbivora_minimap_4.jpg' },
  { id: 'rusa', slide: 'assets/slides/herbivora_5.jpg', map: 'assets/minimaps/herbivora_minimap_5.jpg' },

  // Omnivora
  { id: 'beruang', slide: 'assets/slides/omnivora_1.jpg', map: 'assets/minimaps/omnivora_minimap_1.jpg' },
  { id: 'ayam', slide: 'assets/slides/omnivora_2.jpg', map: 'assets/minimaps/omnivora_minimap_2.jpg' },
  { id: 'babi', slide: 'assets/slides/omnivora_3.jpg', map: 'assets/minimaps/omnivora_minimap_3.jpg' },
  { id: 'monyet', slide: 'assets/slides/omnivora_4.jpg', map: 'assets/minimaps/omnivora_minimap_4.jpg' },
  { id: 'gagak', slide: 'assets/slides/omnivora_5.jpg', map: 'assets/minimaps/omnivora_minimap_5.jpg' }
];

levelMapping.forEach(item => {
  const target = `assetKey: '${item.id}'`;
  const replacement = `assetKey: '${item.id}',\n      slideImage: '${item.slide}',\n      minimapImage: '${item.map}'`;
  content = content.replace(target, replacement);
});

// 3. Update narratives with slides
content = content.replace(
  "gameSubtitle: 'Game Edukasi Pengenalan Jenis Hewan Berdasarkan Makanan',",
  `gameSubtitle: 'Game Edukasi Pengenalan Jenis Hewan Berdasarkan Makanan',
    splashSlide: 'assets/slides/cover.jpg',
    instructionsSlide: 'assets/slides/pembuka.jpg',
    mainMapSlide: 'assets/slides/main_map.jpg',
    preEndingSlide: 'assets/slides/pre_ending.jpg',
    tamatSlide: 'assets/slides/tamat.jpg',
    flowchartSlide: 'assets/slides/alur_permainan.jpg',`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated src/GameData.html with all slide and minimap image paths!');
