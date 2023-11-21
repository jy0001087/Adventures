const { app,BrowserWindow } = require('electron')

const creatWindow = () => {
    const win = new BrowserWindow({
        width:800,
        heght:600
    })

    win.loadURL('https://www.bing.com')
}

app.whenReady().then(() => {
    creatWindow()
})