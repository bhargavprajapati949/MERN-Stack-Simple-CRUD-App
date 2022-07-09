const express = require('express')
const mongoose = require('mongoose')

const fse = require('fs-extra')
const path = require('path')

const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8000
const DB_URL = process.env.DB_URL || "Not Found";
if(DB_URL == "Not Found"){
    throw new Error("Database URL not Found")
}
const MEDIA_ROOT = process.env.MEDIA_ROOT || "public/media"

//Check if product_images dir exists
const product_image_dir_path = path.join(MEDIA_ROOT, "product_image")
fse.ensureDirSync(product_image_dir_path)

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'));

mongoose.connect(DB_URL, ()=>{
    console.log("Connected to DB...");
});

const productRouter = require("./routes/product")
app.use('/product', productRouter)

const cartRouter = require("./routes/cart")
app.use('/cart', cartRouter)

app.listen(PORT, () => {
    console.log("Server is Running...");
});
