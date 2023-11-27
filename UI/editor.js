function compile() {
    var text = document.getElementById("editor").value;
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    document.getElementById("result").innerHTML = html;
}


window.onload = function () {
    var newTodo = document.getElementById("newTodoList");
    var todolistContent = document.getElementById("todolist-content");
    var todolist_title= document.getElementById("todolist-title");

    newTodo.onclick = function () {
        todolist_title.innerText="";
        
        //创建侧边todo列表栏控件
        var newTodoItem = document.createElement("div");
        newTodoItem.innerHTML = "新待办";
        todolistContent.appendChild(newTodoItem);

        //左侧markdown编辑区标题栏增加输入控件
        var newTodoItemTitle = document.createElement("input");
        newTodoItemTitle.style.height="inherit";
        newTodoItemTitle.style.width="inherit";
        newTodoItemTitle.style.background="#6cb233";
        todolist_title.appendChild(newTodoItemTitle);
        //焦点给到新增的input元素
        newTodoItemTitle.focus();
        //input失去焦点，检查是否有输入，有输入则删除input，并将input值给到todolist_title.innerText
        newTodoItemTitle.onblur = () =>{
            let titlevalue= newTodoItemTitle.value;
            if(titlevalue.length == 0){
                newTodoItemTitle.style.background="#D34B62";
                newTodoItemTitle.placeholder="请输入文字"
                newTodoItemTitle.focus();
            }else{
                todolist_title.innerText = newTodoItemTitle.value; //替换innerText已经删除了newTodoItemTitle
                newTodoItem.innerHTML =  todolist_title.innerText;
                createTodoDir(newTodoItem.innerHTML);  //向主进程通讯，建立对应文件夹
            }
        }

        newTodoItemTitle.oninput = () =>{
            newTodoItemTitle.style.background="#6cb233";
        }
    }

    
    var text = document.getElementById("editor");

    //markdown区域tab键处理
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


    //监听全局ctrl+s保存事件
    document.onkeydown = function(event){
        if(event.ctrlKey&&event.keyCode ==83){
            var fileName = todolist_title.innerHTML;
            if(fileName.length != 0) saveTodoListContent(document.getElementById("editor").value,todolist_title.innerHTML); //textarea内容和菜单栏的标题内容
        }
    }
}