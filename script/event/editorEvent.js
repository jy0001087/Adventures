
function insertCurrentDate() {
    var textarea = document.getElementById('editor');
    if (textarea) {
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleString();

        // 获取光标位置
        var cursorPosition = textarea.selectionStart;

        // 在光标处插入当前日期
        var textBefore = textarea.value.substring(0, cursorPosition);
        var textAfter = textarea.value.substring(cursorPosition);
        textarea.value = textBefore + formattedDate + textAfter;

        // 将光标移动到插入的日期后面
        textarea.setSelectionRange(cursorPosition + formattedDate.length, cursorPosition + formattedDate.length);
    }
}
