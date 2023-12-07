const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("electronAPI",{
    createTodoDir:(TodoListTitle)=> ipcRenderer.send("createTodoDir",TodoListTitle),
    deleteTodoDir:(TodoListTitle)=> ipcRenderer.send("deleteTodoDir",TodoListTitle),
    saveTodoListContent:(TodoListContent,TodoListPath)=> ipcRenderer.send("saveTodoListContent",TodoListContent,TodoListPath),
    getTodoListDirArray:(callback) => ipcRenderer.on("todoListDirArray",callback),
    reqLoadTodoContent:(TodoListTitle) => ipcRenderer.send("reqLoadTodoContent",TodoListTitle),
    resLoadTodoContent:(TodoListTitle,TodoContent) => ipcRenderer.on("resLoadTodoContent",TodoListTitle,TodoContent)
});
