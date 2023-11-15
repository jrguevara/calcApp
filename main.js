const { app, BrowserWindow } = require('electron')
const path = require('path')

process.env.NODE_ENV = 'production'

const isMAc = process.platform !== 'darwin'
const isDev = process.env.NODE_ENV !== 'production'

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: isDev ? 1200 : 350,
        height: isDev ? 800 : 550
    })

    //Abre DevTools si esta en env dev
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
    mainWindow.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
    createMainWindow()

    app.on('ready', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMAc) {
        app.quit()
    }
})

