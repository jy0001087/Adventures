const { app,BrowserWindow,ipcMain } = require('electron')
const fs = require('fs');
const path = require('node:path')
const todoListPath="D:/MyFiles/文档/兴业材料/待办事项/";

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
    ipcMain.on("createTodoDir",(event,TodoListTitle)=>{
        createTodoDir(TodoListTitle);
    });
    ipcMain.on("saveTodoListContent",(event,TodoListContent,TodoListFileName)=>{
        saveTodoListContent(TodoListContent,TodoListFileName);
    });
})

//关闭窗口时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


function createTodoDir(TodoListTitle){
    console.log(TodoListTitle.toString());
    fs.mkdir(todoListPath+TodoListTitle.toString(),(error) =>{
        if(error) throw error ;
    });
}

function saveTodoListContent(TodoListContent,TodoListFileName){
    console.log(TodoListContent.toString()+"----"+TodoListFileName.toString());
    fs.writeFile(todoListPath+TodoListFileName+"/"+TodoListFileName+".md", TodoListContent, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
}