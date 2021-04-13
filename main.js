const {
    app,
    BrowserWindow,
    screen
} = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');

    const primaryDisplay = screen.getPrimaryDisplay();
    const {scaleFactor} = primaryDisplay;
    let {
        width,
        height
    } = primaryDisplay.bounds;

    width *= scaleFactor;
    height *= scaleFactor;

    win.send('make-a-shot', {
        width,
        height
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})