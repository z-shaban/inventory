const pool = require('./pool')

async function getAllCategories(){
   const {rows} = await pool.query('SELECT * FROM categories')
   console.log(rows)
   return rows
}

async function createCategory(category_name, category_image){
    await pool.query('INSERT INTO categories (category_name, category_image) VALUES ($1 , $2)' , [category_name, category_image])
}

module.exports = {
    getAllCategories,
    createCategory
}