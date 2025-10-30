const {Router} = require('express')
const productRouter = Router()

productRouter.get('/', (req,res)=>{
    res.render('products')
})

module.exports = productRouter