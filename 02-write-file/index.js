const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

fs.open('02-write-file/testFile.txt', 'w', (err) => {
    if(err) throw err;
    console.log('File created');
});


const rl = readline.createInterface({ input, output });

rl.question('you can write text ', (answer) => {
    if (answer==='exit'){
        console.log('nice');
        process.exit(0);
    }else if (!(answer==='exit')){
        fs.appendFile('02-write-file/testFile.txt', `${answer}`, function(error){
            if(error) throw error;
    }
    )};
    
    rl.on('pause',()=>{
        console.log('nice');
    });


    rl.on('line', (line) => {
        if (line==='exit'){
        console.log('nice');
        process.exit(0);
    }
    else if (!(line==='exit')){
        fs.appendFile('02-write-file/testFile.txt', `${line}`, function(error){
            if(error) throw error;
    }
    )}
    });
});