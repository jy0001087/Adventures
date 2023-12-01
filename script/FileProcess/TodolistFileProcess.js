function createTodoDir(TodoListTitle){
    window.electronAPI.createTodoDir(TodoListTitle);
}

function saveTodoListContent(TodoListContent,TodoListPath){
    window.electronAPI.saveTodoListContent(TodoListContent,TodoListPath);
}

window.electronAPI.getTodoListDirArray((event,todoListArray)=>{
    //console.log("F-getTodoListDirArray:"+todoListArray);
    var todolistContent = document.getElementById("todolist-content");
    for ( var todoList of todoListArray){
        var newtodoList = document.createElement("div");
        newtodoList.innerText=todoList;
        todolistContent.todolistContentAppendChild(newtodoList);
    }
})

window.electronAPI.resLoadTodoContent((event,TodoListTitle,TodoContent)=>{
    var editor = document.getElementById("editor");
    var textDecoder = new TextDecoder('utf-8');
    var TodoContent = textDecoder.decode(TodoContent);   
    editor.value=TodoContent.toString();
    var converter = new showdown.Converter();
    var html = converter.makeHtml(TodoContent);
    document.getElementById("result").innerHTML = html;
})