const {Router} = require('express')
const categoriesRouter = Router()
const categoriesController = require('../controllers/categoriesController')
const upload = require('../utils/multerConfig')

categoriesRouter.get('/', categoriesController.getAllCategories)
categoriesRouter.get('/createCategory', categoriesController.getCreateCategory)
categoriesRouter.post('/createCategory',upload.single('category_image'), categoriesController.postCreateCategory)
categoriesRouter.get('/:id/updateCategory', categoriesController.getUpdateCategory)
categoriesRouter.post('/:id/updateCategory', upload.single('category_image'), categoriesController.postUpdateCategory)

module.exports = categoriesRouter