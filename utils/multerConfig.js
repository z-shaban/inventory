const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname, '../public/images'))
    },

    filename: (req, file,cb)=>{
        const name = req.body.category_name.replace(/\s+/g, '_')
        cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'))
    }
})

const upload = multer({storage})

module.exports = upload