const fs = require("fs");
const path = require("path");

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(path.basename(filePath));
    }
  });

  return fileList;
}

module.exports = getFiles;
