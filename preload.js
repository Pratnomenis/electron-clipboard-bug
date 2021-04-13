const {
    ipcRenderer,
    nativeImage,
    clipboard
  } = require('electron');

  const path = require('path');
  const fs = require('fs');

  ipcRenderer.on('make-a-shot', async (_, data) => {
    const filePath = path.join('test.txt');
    fs.readFile(filePath, {
      encoding: 'utf-8'
    }, (err, contents) => {
      const img = nativeImage.createFromDataURL(contents);
      clipboard.writeImage(img);
      document.querySelector('h1').innerText = 'image copied to clipboard!'
    });


  });