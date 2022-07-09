const sanitizeHTML = require('sanitize-html')


function validateAddProduct(req, res, next){
    if(typeof req.body.product_name != "string") req.body.product_name = ""
    if(typeof req.body.description != "string") req.body.description = ""
    if(typeof req.body.quantity != "string") req.body.quantity = ""
    if(typeof req.body.unit_price != "string") req.body.unit_price = ""

    req.cleanData = {
        product_name: sanitizeHTML(req.body.product_name.trim(), {allowedTags: [], allowedAttributes: {}}),
        description: sanitizeHTML(req.body.description.trim(), {allowedTags: [], allowedAttributes: {}}),
        quantity: parseInt(sanitizeHTML(req.body.quantity.trim() || -1, {allowedTags: [], allowedAttributes: {}})),
        unit_price: parseInt(sanitizeHTML(req.body.unit_price.trim() || -1, {allowedTags: [], allowedAttributes: {}})),
    }

    if(req.file){
        console.log("Adding Image")
        const product_image_name = `${req.cleanData.product_name}_${Date.now()}.jpg`;
        req.cleanData.product_image = product_image_name
    }

    if(req.cleanData.product_name == ""){
        res.send({
            "msg": "Product name cannot be empty"
        });
        return;
    }
    if(req.cleanData.quantity < 1){
        res.send({
            "msg": "Quantity should be greater than 1"
        });
        return;
    }
    if(req.cleanData.unit_price < 1){
        res.send({
            "msg": "Price should be greater than 1"
        })
        return;
    }

    next();
}

module.exports.addProduct = validateAddProduct