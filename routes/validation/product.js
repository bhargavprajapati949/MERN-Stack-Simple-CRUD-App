const sanitizeHTML = require('sanitize-html')


function validateAddProduct(req, res, next){
    if(typeof req.body.product_name != "string") req.body.product_name = ""
    if(typeof req.body.description != "string") req.body.description = ""
    if(typeof req.body.quantity != "string") req.body.quantity = ""
    if(typeof req.body.unit_price != "string") req.body.unit_price = ""

    req.cleanData = {
        product_name: sanitizeHTML(req.body.product_name.trim(), {allowedTags: [], allowedAttributes: {}}),
        description: sanitizeHTML(req.body.description.trim(), {allowedTags: [], allowedAttributes: {}}),
        quantity: sanitizeHTML(req.body.quantity.trim(), {allowedTags: [], allowedAttributes: {}}),
        unit_price: sanitizeHTML(req.body.unit_price.trim(), {allowedTags: [], allowedAttributes: {}}),
    }
    
    if(req.file){
        console.log("Adding Image")
        const product_image_name = `${req.cleanData.product_name}_${Date.now()}.jpg`;
        req.cleanData.product_image = product_image_name
    }

    next();
}

module.exports.addProduct = validateAddProduct