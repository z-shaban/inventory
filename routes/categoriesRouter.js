const {Router} = require('express')
const categoriesRouter = Router()
const categoriesController = require('../controllers/categoriesController')
const upload = require('../utils/multerConfig')

categoriesRouter.get('/', categoriesController.getAllCategories)
categoriesRouter.get('/createCategory', categoriesController.getCreateCategory)
categoriesRouter.post('/createCategory',upload.single('category_image'), categoriesController.postCreateCategory)

module.exports = categoriesRouter