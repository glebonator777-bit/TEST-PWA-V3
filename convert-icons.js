const sharp = require('sharp');
const fs = require('fs');

async function convertIcons() {
  await sharp('icon-192.svg')
    .resize(192, 192)
    .png()
    .toFile('icon-192.png');
  
  await sharp('icon-512.svg')
    .resize(512, 512)
    .png()
    .toFile('icon-512.png');
  
  console.log('Иконки сконвертированы!');
}

convertIcons();
