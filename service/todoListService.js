const fs = require('fs').promises;
const path = require('path');

// 封装异步读取文件的 Promise
const readFilePromise = (filePath) => {
    return fs.readFile(filePath, 'utf8');
};

// 封装异步读取文件夹的 Promise
const readDirPromise = (dirPath) => {
    return fs.readdir(dirPath);
};

// 封装遍历读取目录下所有 .md 文件的 Promise
const traverseMarkdownFiles = async (folderPath) => {
    try {
        const files = await readDirPromise(folderPath);

        const filePromises = files.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && path.extname(file) === '.md') {
                const content = await readFilePromise(filePath);
                return { filePath, content };
            } else if (stats.isDirectory()) {
                const subfolderPath = path.join(folderPath, file);
                return await traverseMarkdownFiles(subfolderPath);
            } else {
                return null;
            }
        });

        const results = await Promise.all(filePromises);
        return results.flat().filter((result) => result !== null);
    } catch (error) {
        throw error;
    }
};

// 从文件内容中提取待办事项
 const extractTodoItems = (content) => {
    const regex = /\- \[ \] (.+)/g;
    const matches = content.match(regex);

    return matches ? matches.map((match) => match.replace('- [ ] ', '').trim()) : [];
};

// 示例使用 
/*
const folderPath = '/path/to/your/directory';

traverseMarkdownFiles(folderPath)
  .then((files) => {
    const todos = files.flatMap((file) => {
      const todoItems = extractTodoItems(file.content);
      return todoItems.map((todo) => ({ filePath: file.filePath, todo }));
    });

    console.log(JSON.stringify(todos, null, 2));
  })
  .catch((error) => {
    console.error('发生错误：', error);
  });
*/
module.exports = {traverseMarkdownFiles,extractTodoItems};