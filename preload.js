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
    const img = nativeImage.createFromDataURL(thumbnail.toDataURL());
    clipboard.writeImage(img);
    document.querySelector('h1').innerText = 'image copied to clipboard!'
  });