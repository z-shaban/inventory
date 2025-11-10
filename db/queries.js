const pool = require('./pool')

async function getAllCategories(){
   const {rows} = await pool.query('SELECT * FROM categories ORDER BY category_name')
   console.log(rows)
   return rows
}

async function getCategory(id){
    const {rows} = await pool.query('SELECT * FROM categories WHERE id = ($1)', [id])
    console.log(rows[0])
    return rows[0]
}

async function createCategory(category_name, category_image){
    await pool.query('INSERT INTO categories (category_name, category_image) VALUES ($1 , $2)' , [category_name, category_image])
}

async function updateCategory(category_name, category_image, id){
    await pool.query('UPDATE categories SET category_name = $1, category_image = $2 WHERE id = $3', [category_name, category_image, id] )
}

async function deleteCategory(id){
    await pool.query('DELETE FROM categories WHERE id = $1', [id])
}

//Queries for products//
async function getAllProducts(){
    const {rows}= await pool.query('SELECT * FROM products ORDER BY product_name')
    console.log(rows)
    return rows
}

async function getProduct(id){
    const {rows} = await pool.query('SELECT * FROM products WHERE id = $1',[id])
    return rows[0]
}

async function addProduct(product_name, product_price, category_id) {
    await pool.query("INSERT INTO products (product_name, product_price, category_id) VALUES ($1, $2, $3)", [product_name, product_price, category_id])
}

async function updateProduct(product_name, product_price, category_id, id){
      await pool.query('UPDATE products SET product_name = $1, product_price = $2, category_id = $3  WHERE id = $4', [product_name, product_price, category_id, id])
}

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct
}