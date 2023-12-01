function TodoMenuItemDivElement() {
    // 创建一个 div 元素作为对象的表示
    this.element = document.createElement('div');
    // 初始化一些属性
}

// 重写todolist-content元素的appendChild方法
TodoMenuItemDivElement.prototype.appendChild = function (newChild) {

    console.log("Before appending child:", newChild);
    newChild.setAttribute("class","TodoMenuItem");
    // 调用原始的appendChild方法
    Element.prototype.appendChild.call(this, newChild);
};
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