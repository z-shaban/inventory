const { request } = require('express')
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

async function getUpdateCategory(req,res) {
    console.log(req.params.id)
    const id = req.params.id;
    const category = await db.getCategory(id)
    res.render('updateCategory', {category})
}

async function postUpdateCategory(req,res) {
    const {category_name} = req.body
    const {filename} = req.file
    const category_image = `/images/${filename}`
    const id = req.params.id
    await db.updateCategory(category_name, category_image, id)
     res.redirect('/categories')
}

module.exports = {
    getAllCategories,
    getCreateCategory,
   postCreateCategory,
   getUpdateCategory,
   postUpdateCategory
}