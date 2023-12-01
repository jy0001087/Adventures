// 扩展 HTMLElement 原型
HTMLElement.prototype.todolistContentAppendChild = function(newChild) {
    // 在这里添加你的自定义函数逻辑
    // console.log("F-todolistContentAppendChild: ", newChild.innerHTML);
    const title = newChild.innerHTML;
    newChild.onclick = function () {
        //console.log("F-todolistContentAppendChild-onclick:");
        var todolist_title= document.getElementById("todolist-title");
        todolist_title.innerText = title;
    }
    Node.prototype.appendChild.call(this,newChild);
};