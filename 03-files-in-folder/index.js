const path = require('path');
const fs = require('fs/promises');

async function readDir(){
const files = await fs.readdir(path.join(__dirname,'secret-folder'),{withFileTypes:true});
for(let file of files){
    if(file.isFile()){
        let tempFile = await fs.stat(path.join(__dirname,'secret-folder',file.name));
        let fileExtension = path.extname(path.join(__dirname,'secret-folder',file.name));
        let fileName = path.basename(path.join(__dirname,'secret-folder',file.name),fileExtension);
        console.log(fileName,' - ',fileExtension.slice(1),' - ',tempFile.size/1024,'kb');
    }
}
}

readDir();