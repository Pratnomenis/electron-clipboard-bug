const {
    ipcRenderer,
    desktopCapturer,
    nativeImage,
    clipboard
  } = require('electron');

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
    clipboard.writeImage(img);
    document.querySelector('h1').innerText = 'image copied to clipboard!'
  });