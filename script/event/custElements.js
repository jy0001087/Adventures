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