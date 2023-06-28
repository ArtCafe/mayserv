const multer = require("multer");
const path = require("path");
const {v4: uuidv4} = require ("uuid")



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, "../../uploads" ))
    },
    filename: (req, file, cb)=> {
        cb(null, uniqueId + file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else {
        cb(null, false)
    }
}
const upload = multer({ storage, fileFilter })

module.exports = upload