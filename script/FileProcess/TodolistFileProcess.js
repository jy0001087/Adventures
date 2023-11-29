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
        todolistContent.appendChild(newtodoList);
    }
})