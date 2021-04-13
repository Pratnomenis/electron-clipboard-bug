const {
    ipcRenderer,
    desktopCapturer,
    nativeImage,
    clipboard
  } = require('electron');

  const path = require('path');
  const fs = require('fs');

  ipcRenderer.on('make-a-shot', async (_, data) => {
    const { width, height } = data;
    const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: {
            width,
            height
        }
    });
    const thumbnail = sources[0].thumbnail;
    const thumbnail4x = thumbnail.resize({
      width: width * 4,
      height: height * 4,
      quality: 'best'
    });
    const imgBase64 = thumbnail4x.toDataURL();
    const img = nativeImage.createFromDataURL(imgBase64);
    const filePath = path.join('test.txt');
    fs.writeFile(filePath, imgBase64, {
      encoding: 'utf-8'
    }, (err) => {
      clipboard.writeImage(img);
      document.querySelector('h1').innerText = 'image copied to clipboard!'
    });


  });