require('dotenv').config();
const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const indexRouter = require('./routes/indexRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const productRouter = require('./routes/productRouter')

app.set('view engine','ejs')
app.set('views',path.join( __dirname, 'views'))

app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/categories', categoriesRouter)
app.use('/products', productRouter)

app.listen(PORT, (error)=>{
    if (error){
        throw error;
    }
    console.log('server is running')
}
)


