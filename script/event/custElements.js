// 扩展 HTMLElement 原型
HTMLElement.prototype.todolistContentAppendChild = function (newChild) {
    // console.log("F-todolistContentAppendChild: ", newChild.innerHTML);
    const title = newChild.innerHTML;
    newChild.classList.add("todoMenuTitle");
    newChild.onclick = function () {
        var editor = document.getElementById("editor");
        editor.value = "";
        //console.log("F-todolistContentAppendChild-onclick:");
        //让标题栏标题=列表栏标题
        var todolist_title = document.getElementById("todolist-title");
        todolist_title.innerText = title;
        //读取白"标题/标题.md"，并显示至textarea
        window.electronAPI.reqLoadTodoContent(title);
    }

    //右键菜单
    if (newChild.innerHTML != "回收站") {
        newChild.addEventListener('contextmenu', function (e) {
            e.preventDefault();

            var customMenu = document.getElementById('custom-menu');
            customMenu.style.left = e.pageX + 'px';
            customMenu.style.top = e.pageY + 'px';
            customMenu.style.display = 'block';
            targetDeleteTodoDiv = e.target;
        });
    }
    Node.prototype.appendChild.call(this, newChild);
};

//右键菜单清除
document.addEventListener('click', function () {
    var customMenu = document.getElementById('custom-menu');
    customMenu.style.display = 'none';
});

//右键菜单删除事件执行内容
function deleteTodoDiv() {
    var parent = targetDeleteTodoDiv.parentNode;

    window.electronAPI.deleteTodoDir(targetDeleteTodoDiv.innerText);
    document.getElementById("editor").value = "";
    document.getElementById("result").innerHTML = "";
    parent.removeChild(targetDeleteTodoDiv);
    document.getElementById("todolist-title").innerText = "";
    document.getElementById("result").innerHTML = "";
}