const db = require('../db/queries')

async function getAllProducts(req,res) {
    const products = await db.getAllProducts()
    res.render('products', {products})
}

async function getAddProduct(req,res){
const categories = await db.getAllCategories()
  res.render('addProduct',{categories})
}

async function postAddProduct(req,res){
    const{product_name, product_price, category_id} = req.body
   await db.addProduct(product_name, product_price, category_id)
   res.redirect('/products')
}

async function getUpdateProduct(req,res){
   const categories = await db.getAllCategories();
   const {id} = req.params
   const product = await db.getProduct(id)
   res.render('updateProduct', {categories, product})
}

async function postUpdateProduct(req,res) {
   const id = req.params.id
   const product = await db.getProduct(id)
   let {product_name, product_price, category_id} = req.body

   if(!product_name || !product_price || !category_id){
    product_name = product.product_name
    product_price = product.product_price
    category_id = product.category_id
   }

   await db.updateProduct(product_name, product_price, category_id, id)
   res.redirect('/products')
}
module.exports = {
   getAllProducts,
    getAddProduct,
    postAddProduct,
   getUpdateProduct,
   postUpdateProduct
}