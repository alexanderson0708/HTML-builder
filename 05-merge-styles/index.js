const fs = require('fs');
const path = require('path');
const stylePath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist/bundle.css');
const output = fs.createWriteStream(distPath);

fs.promises.readdir(stylePath).then(async (files)=>{
    files.forEach(async (file)=>{
        const filePath = path.join(stylePath,file);
        const fileName = path.basename(filePath);
        const fileExtName = path.extname(filePath);
        if (fileExtName === '.css'){
            const input = fs.createReadStream(path.join(stylePath,fileName));
            input.on('data', data => {
                output.write(data.toString()+'\n');
            });
        }
    });
});