const fs = require('fs')

function writeDataToFile(filename,Content){
    fs.writeFileSync(filename,JSON.stringify(Content),'utf-8',(err)=>{
        if(err){
            console.log(err);
        }
    })
}

module.exports = {
    writeDataToFile
}