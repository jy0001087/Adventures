// 扩展 HTMLElement 原型
HTMLElement.prototype.todolistContentAppendChild = function(newChild) {
    // 在这里添加你的自定义函数逻辑
    // console.log("F-todolistContentAppendChild: ", newChild.innerHTML);
    const title = newChild.innerHTML;
    newChild.onclick = function () {
        var editor = document.getElementById("editor");
        editor.value="";
        //console.log("F-todolistContentAppendChild-onclick:");
        //让标题栏标题=列表栏标题
        var todolist_title= document.getElementById("todolist-title");
        todolist_title.innerText = title;
        //读取白"标题/标题.md"，并显示至textarea
        window.electronAPI.reqLoadTodoContent(title);
    }
    Node.prototype.appendChild.call(this,newChild);
};