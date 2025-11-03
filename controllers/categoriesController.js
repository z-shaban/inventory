const db = require('../db/queries')
const upload = require('../utils/multerConfig')

async function getAllCategories(req,res) {
    const categories = await db.getAllCategories()
    res.render('categories', {categories})
}

async function getCreateCategory(req, res) {
    res.render('createCategory')
}

async function postCreateCategory(req,res){
    const {category_name} = req.body
    const {filename} = req.file
    const category_image = `/images/${filename}`

    await db.createCategory(category_name, category_image)
    res.redirect('/categories')
}

module.exports = {
    getAllCategories,
    getCreateCategory,
   postCreateCategory
}