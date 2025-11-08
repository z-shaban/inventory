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

module.exports = {
   getAllProducts,
    getAddProduct,
    postAddProduct
}