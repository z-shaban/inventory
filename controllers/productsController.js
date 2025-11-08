const db = require('../db/queries')

async function getAllProducts(req,res) {
    res.render('products')
}

async function getAddProduct(req,res){
const categories = await db.getAllCategories()
  res.render('addProduct',{categories})
}

module.exports = {
   getAllProducts,
    getAddProduct
}