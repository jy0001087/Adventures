function createTodoDir(TodoListTitle) {
    window.electronAPI.createTodoDir(TodoListTitle);
}

function saveTodoListContent(TodoListContent, TodoListPath) {
    window.electronAPI.saveTodoListContent(TodoListContent, TodoListPath);
}

window.electronAPI.getTodoListDirArray((event, todoListArray) => {
    //console.log("F-getTodoListDirArray:"+todoListArray);
    var todolistContent = document.getElementById("todolist-content");
    for (var todoList of todoListArray) {
        var newtodoList = document.createElement("div");
        newtodoList.innerText = todoList;
        todolistContent.todolistContentAppendChild(newtodoList);
    }
})

window.electronAPI.resLoadTodoContent((event, TodoListTitle, TodoContent) => {
    var editor = document.getElementById("editor");
    var textDecoder = new TextDecoder('utf-8');
    var TodoContent = textDecoder.decode(TodoContent);
    editor.value = TodoContent.toString();
    var converter = new showdown.Converter();
    var html = converter.makeHtml(TodoContent);
    document.getElementById("result").innerHTML = html;
})

//等待待办列表返回，修改UI待办模块内容
window.electronAPI.JsonResponse((event, jsonString) => {
    //allNeedToDo.innerText=JSON.parse(jsonString);
    document.getElementById("allNeedToDo").innerText = "";
    todoJSONArray = JSON.parse(jsonString);
    for (var element of todoJSONArray) {
        for (var key in element) {
            var curLine = "";
            if (element.hasOwnProperty(key)) {
                curLine += key + ":-/^:" + element[key];
                //appendTextWithNewLine(key + ":" + element[key]);
            }
            if (curLine.startsWith("filePath")) {
                var temp = curLine.split(':-/^:')
                var match = temp[1].match(/[\u4e00-\u9fa5]+\.md$/);
                var betweenText = match[0];
                appendTextWithNewLine(betweenText);
            } else if (curLine.startsWith("todoItems")) {
                var temp = curLine.split(':-/^:')
                var todolines = temp[1].split(',');
                for (const line of todolines) {
                    appendTextWithNewLine("\u0009 - \u0009" + line);
                }
            }
        }
    }
})


function appendTextWithNewLine(text) {
    var outputDiv = document.getElementById("allNeedToDo");

    // 获取当前内容
    var currentContent = outputDiv.innerText;

    // 在当前内容末尾添加文本和换行符
    outputDiv.innerText = currentContent + (currentContent === "" ? "" : "\n") + text;
}