const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
const fse = require('fs-extra');
const path = require('node:path')
const todoListPath = "D:/MyFiles/文档/兴业材料/待办事项/";
const {traverseMarkdownFiles,extractTodoItems} = require('./service/todoListService.js')

const creatWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        heght: 600,
        webPreferences: {
            preload: path.join(__dirname, 'UI/editor_preload.js')
        }
    });

    win.loadFile('UI/editor.html');
    win.webContents.openDevTools();
}



app.whenReady().then(() => {
    creatWindow();
    ipcMain.on("createTodoDir", (event, TodoListTitle) => {
        createTodoDir(TodoListTitle);
    });
    ipcMain.on("saveTodoListContent", (event, TodoListContent, TodoListFileName) => {
        saveTodoListContent(TodoListContent, TodoListFileName);
    });
    //接收reqLoadTodoContent消息，读取对应TodoListTitle.md文件并发回
    ipcMain.on("reqLoadTodoContent", (event, TodoListTitle) => {
        loadTodoContent(event, TodoListTitle);
    });
    ipcMain.on("deleteTodoDir", (event, TodoListTitle) => {
        deleteTodoDir(TodoListTitle);
    });

    //读取所有待办事项，发送至UI界面
    traverseMarkdownFiles(todoListPath)
        .then((files) => {
            const todos = files.flatMap((file) => {
                const todoItems = extractTodoItems(file.content);
                return todoItems.map((todo) => ({ filePath: file.filePath, todo }));
            });

            console.log(JSON.stringify(todos, null, 2));
        })
        .catch((error) => {
            console.error('发生错误：', error);
        });
    // did-finish-load等待窗口渲染结束后，向渲染进程发起消息
    const window = BrowserWindow.getFocusedWindow();
    window.webContents.on('did-finish-load', () => {
        fs.readdir(todoListPath, (error, files) => {
            for (var dir of files) { console.log("F-readAllDir: " + dir.toString()); }
            window.webContents.send("todoListDirArray", files);
        });
    })
})

//关闭窗口时，退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


function createTodoDir(TodoListTitle) {
    console.log(TodoListTitle.toString());
    fs.mkdir(todoListPath + TodoListTitle.toString(), (error) => {
        if (error) throw error;
    });
}

function saveTodoListContent(TodoListContent, TodoListFileName) {
    console.log(TodoListContent.toString() + "----" + TodoListFileName.toString());
    fs.writeFile(todoListPath + TodoListFileName + "/" + TodoListFileName + ".md", TodoListContent, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function loadTodoContent(event, TodoListTitle) {
    fs.readFile(todoListPath + TodoListTitle + "/" + TodoListTitle + ".md", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        event.sender.send("resLoadTodoContent", TodoListTitle, data);
    });
}

//删除文件夹实际为移动到回收站
function deleteTodoDir(TodoListTitle) {
    const destinationPath = todoListPath + "回收站" + "/" + TodoListTitle;
    const sourcePath = todoListPath + "/" + TodoListTitle;

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }

    // 读取源文件夹中的内容
    fs.readdirSync(sourcePath).forEach((file) => {
        const sourceFilePath = path.join(sourcePath, file);
        const destinationFilePath = path.join(destinationPath, file);

        // 将文件复制到目标文件夹
        fs.copyFileSync(sourceFilePath, destinationFilePath);

        // 如果是文件夹，递归移动子文件夹
        if (fs.lstatSync(sourceFilePath).isDirectory()) {
            moveFolder(sourceFilePath, destinationFilePath);
        }
    });

    // 删除源文件夹
    fse.removeSync(sourcePath);
    console.log(`Folder ${sourcePath} moved to ${destinationPath} successfully.`);
}

