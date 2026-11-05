/**
 * Petualangan Mini Zoo - Google Apps Script Backend
 * Serves the responsive 16:9 3D Single Page Application (SPA).
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Petualangan Mini Zoo - Game Edukasi Satwa 3D')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
