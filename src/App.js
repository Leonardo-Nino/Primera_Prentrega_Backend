import express from 'express'
import multer from 'multer'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import { __dirname } from './path.js'

// Configuration express
const app = express()
const port = 4000
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname} `)
  },
})

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const upLoad = multer({ storage: storage })

//Configuration routes

app.post('/upload', upLoad.single('product'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.send('Image Uploaded successfully')
})
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
