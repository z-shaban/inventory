const db = require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')

const alphaErr = 'product name should only contain letters'
const lengthErr = 'product name should be between 5 and 20 characters'
const priceErr = 'Price cant be less than 1'

const validateAddProduct = [
    
    body('category_id')
    .notEmpty().withMessage('you must select a category'),

    body('product_name')
    .trim()
    .isAlpha().withMessage(alphaErr)
    .isLength({min:5, max:20}).withMessage(lengthErr),

    body('product_price')
    .trim()
    .isFloat({min:1}).withMessage(priceErr)

]

const validateUpdateProduct = [
    
    body('product_name')
    .optional({values: 'falsy'})
    .trim()
    .isAlpha().withMessage(alphaErr)
    .isLength({min:5, max:20}).withMessage(lengthErr),

    body('product_price')
    .optional({values: 'falsy'})
    .trim()
    .isFloat({min:1}).withMessage(priceErr)

]

async function getAllProducts(req,res) {
    const products = await db.getAllProducts()
    const categories = await db.getAllCategories()
    res.render('products', {products, categories})
}

async function getAddProduct(req,res){
const categories = await db.getAllCategories()
  res.render('addProduct',{categories})
}

const postAddProduct = [
    validateAddProduct,

    async (req,res) => {
       const errors = validationResult(req)
       const categories = await db.getAllCategories()
       if(!errors.isEmpty()){
        return res.status(400).render('addProduct',{categories, errors: errors.array()})
       }

       const{product_name, product_price, category_id} = matchedData(req)
       await db.addProduct(product_name, product_price, category_id)
       res.redirect('/products')
    }
]


async function getUpdateProduct(req,res){
   const categories = await db.getAllCategories();
   const {id} = req.params
   const product = await db.getProduct(id)
   res.render('updateProduct', {categories, product})
}

const postUpdateProduct = [
    validateUpdateProduct,

    async (req,res)=>{
        const errors  = validationResult(req)
        const categories = await db.getAllCategories();
        const {id} = req.params
         const product = await db.getProduct(id)
        if(!errors.isEmpty()){
            return res.status(400).render('updateProduct',{categories,product, errors: errors.array()})
        }

        let {product_name, product_price} = matchedData(req)
        let category_id = req.body.category_id

        if(!product_name || !product_price || !category_id){
        product_name = product.product_name
         product_price = product.product_price
        category_id = product.category_id
       }

       await db.updateProduct(product_name, product_price, category_id, id)
   res.redirect('/products')
    }
]

async function deleteProduct(req,res){
 const id = req.params.id
 await db.deleteProduct(id)
 res.redirect('/products')
}
module.exports = {
   getAllProducts,
    getAddProduct,
    postAddProduct,
   getUpdateProduct,
   postUpdateProduct,
   deleteProduct
}