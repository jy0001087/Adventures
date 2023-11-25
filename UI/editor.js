function compile() {
    var text = document.getElementById("editor").value;
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    document.getElementById("result").innerHTML = html;
}


window.onload = function () {
    var newTodo = document.getElementById("newTodoList");
    newTodo.onclick = function () {
        var newTodoItem = document.createElement("div");
        newTodoItem.innerHTML = "新待办";
        var todolistContent = document.getElementById("todolist-content")
        todolistContent.appendChild(newTodoItem);
    }

    var text = document.getElementById("editor");

    text.onkeydown = () => {
        if (event.code !== "Tab") return true;

        event.preventDefault();

        let start = text.selectionStart;
        let end = text.selectionEnd;
        if (start === end) {
            document.execCommand('insertText', false, "  ");
        }
        else {
            let strBefore = text.value.slice(0, start);
            let curLineStart = strBefore.includes('\n') ? strBefore.lastIndexOf('\n') + 1 : 0;
            let strBetween = text.value.slice(curLineStart, end + 1);
            let newStr = "  " + strBetween.replace(/\n/g, '\n  ');
            let lineBreakCount = strBetween.split('\n').length;
            let newStart = start + 2;
            let newEnd = end + (lineBreakCount + 1) * 2;

            text.setSelectionRange(curLineStart, end);
            document.execCommand("insertText", false, newStr);
            text.setSelectionRange(newStart, newEnd);
        }
    }
}