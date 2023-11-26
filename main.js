const { app,BrowserWindow,ipcMain } = require('electron')
const path = require('node:path')

const creatWindow = () => {
    const win = new BrowserWindow({
        width:800,
        heght:600,
        webPreferences: {
            preload: path.join(__dirname, 'UI/editor_preload.js')
          }
    })

    win.loadFile('UI/editor.html')
    win.webContents.openDevTools()

}



app.whenReady().then(() => {
    creatWindow();
    ipcMain.on("createTodoDir",(TodoListTitle)=>{
        console.log(TodoListTitle);
    })
})

//关闭窗口时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })