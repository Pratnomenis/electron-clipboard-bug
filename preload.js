const {
  ipcRenderer,
  nativeImage,
  desktopCapturer,
  clipboard
} = require('electron');

const path = require('path');
const fs = require('fs');

ipcRenderer.on('make-a-shot', async (_, data) => {
  const {
    width,
    height
  } = data;

  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width,
      height
    }
  });

  const thumbnail = sources[0].thumbnail;
  const imgBase64 = thumbnail.toDataURL();
  const img = nativeImage.createFromDataURL(imgBase64);

  clipboard.writeImage(img);
  document.querySelector('h1').innerText = 'Screenshot copied to clipboard!'
});

ipcRenderer.on('make-a-shot-and-write-a-file', async (_, data) => {
  const {
    width,
    height
  } = data;
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
    document.querySelector('h1').innerText = 'Screenshot copied to clipboard and file!'
  });
});

ipcRenderer.on('load-shot-from-file', async (_, data) => {
  const filePath = path.join('test.txt');
  fs.readFile(filePath, {
    encoding: 'utf-8'
  }, (err, contents) => {
    const img = nativeImage.createFromDataURL(contents);
    clipboard.writeImage(img);
    document.querySelector('h1').innerText = 'Image from file copied to clipboard!'
  });
});