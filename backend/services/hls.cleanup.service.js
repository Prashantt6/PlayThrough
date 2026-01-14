const fs = require('fs')
const path = require('path')

const deleteFolderRecursive = (folderPath) =>{
    if(fs.existsSync(folderPath)){
        fs.rmSync(folderPath, {recursive: true, force: true})
    }
}

module.exports = {deleteFolderRecursive}