const { app,BrowserWindow } = require('electron')

const creatWindow = () => {
    const win = new BrowserWindow({
        width:800,
        heght:600,
    })

    win.loadFile('UI/editor.html')
    win.webContents.openDevTools()

}



app.whenReady().then(() => {
    creatWindow()
})

//关闭窗口时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })