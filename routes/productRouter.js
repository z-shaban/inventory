const {Router} = require('express')
const productRouter = Router()
const productsController = require('../controllers/productsController')


productRouter.get('/', productsController.getAllProducts)
productRouter.get('/addProduct', productsController.getAddProduct)
productRouter.post('/addProduct', productsController.postAddProduct)
productRouter.get('/:id/updateProduct', productsController.getUpdateProduct)
productRouter.post('/:id/updateProduct', productsController.postUpdateProduct)
productRouter.get('/:id/deleteProduct', productsController.deleteProduct)

module.exports = productRouter