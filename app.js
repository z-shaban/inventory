require('dotenv').config();
const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const indexRouter = require('./routes/indexRouter')
const categoryRouter = require('./routes/categoryRouter')
const productRouter = require('./routes/productRouter')

app.set('view engine','ejs')
app.set('views',path.join( __dirname, 'views'))

app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(PORT, (error)=>{
    if (error){
        throw error;
    }
    console.log('server is running')
}
)