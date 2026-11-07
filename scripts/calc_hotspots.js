// Measuring hotspot coordinates in percentage for 1670x942 original slides
const SLIDE_W = 1670;
const SLIDE_H = 942;

function toPct(x, y, w, h) {
  return {
    left: ((x / SLIDE_W) * 100).toFixed(2) + '%',
    top: ((y / SLIDE_H) * 100).toFixed(2) + '%',
    width: ((w / SLIDE_W) * 100).toFixed(2) + '%',
    height: ((h / SLIDE_H) * 100).toFixed(2) + '%'
  };
}

// 1. Cover: "Mulai Petualangan" button is at bottom center
console.log('Cover Mulai Petualangan:', toPct(635, 715, 520, 155));

// 2. Pembuka: "Ayo Mulai!" button is at bottom right
console.log('Pembuka Ayo Mulai:', toPct(985, 745, 510, 150));

// 3. Main Map:
console.log('Main Map Karnivora Castle:', toPct(200, 140, 390, 360));
console.log('Main Map Herbivora Castle:', toPct(650, 100, 390, 370));
console.log('Main Map Omnivora Castle:', toPct(1120, 220, 390, 360));
console.log('Main Map Mulai Petualangan Button:', toPct(1230, 800, 400, 130));

// 4. Kingdom Gates: "MASUK KERAJAAN" button is at bottom right
console.log('Gate Masuk Kerajaan Button:', toPct(1190, 800, 440, 130));

// 5. Quiz Challenge Screens:
// Option A: x ~ 1130, y ~ 600, w ~ 500, h ~ 70
// Option B: x ~ 1130, y ~ 680, w ~ 500, h ~ 70
// Option C: x ~ 1130, y ~ 760, w ~ 500, h ~ 70
// Jawab Sekarang Button: x ~ 1130, y ~ 850, w ~ 500, h ~ 80
console.log('Quiz Option A:', toPct(1125, 595, 505, 75));
console.log('Quiz Option B:', toPct(1125, 675, 505, 75));
console.log('Quiz Option C:', toPct(1125, 755, 505, 75));
console.log('Quiz Jawab Sekarang Button:', toPct(1125, 848, 505, 85));

// 6. Kingdom Ending: "Lanjutkan Petualangan" button is at bottom right
console.log('Ending Lanjutkan Petualangan Button:', toPct(1140, 785, 480, 140));
