const path = require('path')

multerConfigOpt = {
    dest: 'uploads/',
    fileFilter:  function(req, file, cb) {
        var ext = path.extname(file.originalname)
        console.log(ext);
        if (ext === '.pdf' || ext === '.doc' || ext === '.docx' || ext === '.txt') {
            console.log("true!");
            cb(null,true)
        } else {
            cb(null, false)
        }
    }
}
module.exports = multerConfigOpt