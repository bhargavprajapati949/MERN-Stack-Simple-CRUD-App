const {Router} = require('express')
const router = Router()

const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const upload = multer()

const dotenv = require('dotenv')
dotenv.config()
const MEDIA_ROOT = process.env.MEDIA_ROOT || "public/media"

const Product = require('../models/product')

const validation = require('./validation/product')

// List Products
router.get('/', async (req, res)=>{
    console.log("List Products called")
    const products = await Product.find()
    res.json(products)
})

// Add Product
router.post('/', upload.single('product_image'), validation.addProduct, async (req, res)=>{
    console.log("Add Products called")
    
    if(req.file){
        const image_path = path.join(MEDIA_ROOT, "product_image", req.cleanData.product_image)
        await sharp(req.file.buffer).resize(500, 375).jpeg({quality: 70}).toFile(image_path)
    }
    
    const newProduct = new Product({
        product_name: req.cleanData.product_name,
        product_image: req.cleanData.product_image,
        quantity: req.cleanData.quantity,
        description: req.cleanData.description,
        unit_price: req.cleanData.unit_price
    })

    const insertId = await newProduct.save()
    res.json({
        "msg": "Product Added", 
        "item": insertId
    })
})

module.exports = router