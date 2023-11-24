function compile(){
    var text = document.getElementById("content").value;
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    document.getElementById("result").innerHTML = html;
}


window.onload=function(){
    var newTodo = document.getElementById("newTodoList");
    newTodo.onclick = function(){
        var newTodoItem = document.createElement("div");
        newTodoItem.innerHTML="新待办";
        var todolistContent = document.getElementById("todolist-content")
        todolistContent.appendChild(newTodoItem);
    }
}