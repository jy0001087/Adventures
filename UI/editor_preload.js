const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    createTodoDir:(TodoListTitle)=> ipcRenderer.send("createTodoDir",TodoListTitle)
})

