const sanitizeHTML = require('sanitize-html')

function validateAddToCart(req, res, next){
    if(typeof req.body.product_id != "string") req.body.product_id = ""
    
    req.cleanData = {
        product_id: sanitizeHTML(req.body.product_id.trim(), {allowedTags: [], allowedAttributes: {}}),
    }

    req.body = {}
    
    next()
}

function validateUpdateCart(req, res, next){
    if(typeof req.body.product_id != "string") req.body.product_id = ""
    if(typeof req.body.action != "string") req.body.action = ""

    req.cleanData = {
        product_id: sanitizeHTML(req.body.product_id.trim(), {allowedTags: [], allowedAttributes: {}}),
        action: sanitizeHTML(req.body.action.trim(), {allowedTags: [], allowedAttributes: {}}),
    }

    req.body = {}
    next()
}

module.exports.addToCart = validateAddToCart
module.exports.updateCart = validateUpdateCart