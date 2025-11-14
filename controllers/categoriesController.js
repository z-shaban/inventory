
const db = require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')

const alphaErr = 'category name should only contain letters'
const lengthErr = 'category name should be between 5 and 50 characters'


const validateCreateCategory = [
     body('category_name')
     .trim()
     .isAlpha('en-US', { ignore: ' ' }).withMessage(alphaErr)
     .isLength({ min: 5, max: 50 }).withMessage(lengthErr),

     body('category_image').custom((value, {req})=>{
        const imageErr = 'An image file is required'
        const typeErr = 'Only jpeg or png is alllowed'

         if(!req.file){
            throw new Error(imageErr)
         }
         const allowedTypes = ['image/jpeg', 'image/png']
         if (!allowedTypes.includes(req.file.mimetype)){
            throw new Error(typeErr)
         }
         return true;
     })
]

const validateUpdateCategory = [
     body('category_name')
     .optional({ values: "falsy" })
     .trim()
     .isAlpha('en-US', { ignore: ' ' }).withMessage(alphaErr)
     .isLength({ min: 5, max: 50 }).withMessage(lengthErr),

     body('category_image') 
    .custom((value, {req})=>{
        const typeErr = 'Only jpeg or png is alllowed'
        
        if(!req.file){
            return true;
        }
         const allowedTypes = ['image/jpeg', 'image/png']
         if (!allowedTypes.includes(req.file.mimetype)){
            throw new Error(typeErr)
         }
         return true;
     })
]

async function getAllCategories(req,res) {
    const categories = await db.getAllCategories()
    res.render('categories', {categories})
}

async function getCreateCategory(req, res) {
    res.render('createCategory')
}

const postCreateCategory = [
    validateCreateCategory,

    async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).render('createCategory', {errors: errors.array()})
    }


    const {category_name} = matchedData(req)
    const {filename} = req.file
    const category_image = `/images/${filename}`

    await db.createCategory(category_name, category_image)
    res.redirect('/categories')
}
]


async function getUpdateCategory(req,res) {
    console.log(req.params.id)
    const id = req.params.id;
    const category = await db.getCategory(id)
    res.render('updateCategory', {category})
}

const postUpdateCategory = [
    validateUpdateCategory,

    async (req,res)=> {
    const errors = validationResult(req)
    const id = req.params.id;
     const existingCategory = await db.getCategory(id)
    if(!errors.isEmpty()){
        const category = await db.getCategory(id)
        return res.status(400).render('updateCategory',{category, errors: errors.array()})
    }

    
    let {category_name} = matchedData(req)

    if(!category_name){
         category_name = existingCategory.category_name
    }
    
    
    let category_image
    if(req.file){
         category_image = `/images/${req.file.filename}`
    }else{
         category_image = existingCategory.category_image
    }

    await db.updateCategory(category_name, category_image , id)
     res.redirect('/categories')
}
]

async function deleteCategory(req,res){
    const id = req.params.id
    await db.deleteCategory(id)
     res.redirect('/categories')
}


module.exports = {
    getAllCategories,
    getCreateCategory,
   postCreateCategory,
   getUpdateCategory,
   postUpdateCategory,
   deleteCategory
}