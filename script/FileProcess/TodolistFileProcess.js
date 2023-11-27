function createTodoDir(TodoListTitle){
    window.electronAPI.createTodoDir(TodoListTitle);
}

function saveTodoListContent(TodoListContent,TodoListPath){
    window.electronAPI.saveTodoListContent(TodoListContent,TodoListPath);
}