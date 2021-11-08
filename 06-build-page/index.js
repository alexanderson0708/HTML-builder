const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'project-dist');

const stylesPath = path.join(__dirname,'styles');
const assetsPath = path.join(__dirname,'assets');

function createDirectory(){
    fs.mkdir(path.join(__dirname, 'project-dist'),{recursive:true,},err => {
        if (err) {
            throw new Error('You have problem!');
        }
    });
    //console.log('create files work!!!');
};
createDirectory();

function createMarkupFile(){
    const input = fs.createReadStream(path.join(__dirname, 'template.html'));
    const output = fs.createWriteStream(path.join(dist, 'index.html'));
    let code = '';
    input.on('data', data=>{code=data.toString();
    
    function PartsOfHtml(e) {return `{{${e}}}`}; 
    
    const compPath = path.join(__dirname,'components');

    fs.readdir(compPath,{withFileTypes:true}, (err,data)=>{if (err) throw err;
    const parts =[];
    
    data.forEach(part => {
       const fileName = part.name.slice(0,-5);
       parts.push(PartsOfHtml(fileName));
       //console.log(parts.push(PartsOfHtml(fileName)))
    });
    fs.promises.readdir(path.join(__dirname,'components')).then(result => {
        result.forEach((comp,index)=>{
            const readebleStream = fs.createReadStream(path.join(__dirname, 'components', comp),'utf-8');
            readebleStream.on('data', data => {
                code = code.replace(parts[index],data);
                if (!parts.find(part => code.includes(part))){
                    output.write(code);
                }
            });
        });
    });
 });
});
//console.log('html work!!!');
}
createMarkupFile();

function copyStyles(){
    const output = fs.createWriteStream(path.join(dist, 'style.css'));
    fs.promises.readdir(stylesPath).then(async (files)=>{
        files.forEach(async (file)=>{
            const filePath = path.join(stylesPath,file);
            const fileName = path.basename(filePath);
            const fileExtName = path.extname(filePath);
            if (fileExtName === '.css'){
                const input = fs.createReadStream(path.join(stylesPath,fileName));
                input.on('data', data => {
                    output.write(data.toString()+'\n');
                });
            }
        });
    });
    //console.log('styles work!!!');
}
copyStyles();

function copyAssetsDir(){
    fs.mkdir(path.join(dist, 'assets'), {recursive:true}, err => {
            if (err) {throw new Error('You have problem!');}
    });
    async function copyFileFromDir(dir, dest){
        await fs.promises.readdir(dir, {withFileTypes:true}).then(files => {
            files.forEach(async (file)=>{
                if(file.isDirectory()){
                    const srcDirPath = path.join(dir, file.name);
                    const destPath = path.join(dest, file.name);
                    copyFileFromDir(srcDirPath, destPath);
                }else{
                    fs.mkdir(dest, {recursive:true}, err => {
                        if (err) {throw new Error('You have problem!');}
                });
                fs.promises.copyFile(path.join(dir, file.name), path.join(dest, file.name));
                }
            });
        });
    }
    copyFileFromDir(assetsPath, path.join(dist, 'assets'));
    //console.log('assets work!!!');
}
copyAssetsDir();