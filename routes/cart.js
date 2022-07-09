const {Router} = require('express')
const router = Router()

const Cart = require('../models/cart')
const Product = require('../models/product')

const validation = require('./validation/cart')


//List Cart Items
router.get('/', async (req, res) => {
    console.log("List Cart Items called");
    const cart = await Cart.find().populate('product_id');
    
    let ans = {
        "cart" : cart,
        "totalAmount" : await Cart.totalAmount(cart)
    };
    res.json(ans);
})

//Add Items to Cart
router.post('/', validation.addToCart, async (req, res)=>{
    console.log("Add to cart called")
    //Check if it is not already in cart
    let isAlreadyInCart = await Cart.find({product_id: req.cleanData.product_id})

    if(isAlreadyInCart.length == 0){

        //TODO: Check if product exists
        const isProductExist = await Product.find({product_id: req.cleanData.product_id})

        if(isProductExist.length != 0){
            const cartItem = new Cart({
                product_id : req.cleanData.product_id,
                quantity: 1
            })
        
            const insertId = await cartItem.save()
            res.json({
                "msg": "Added to Cart",
                item: insertId
            })
        }
        else{
            res.json({
                "msg": "Product does not exist"
            })
        }
    }
    else{
        res.json({
            "msg": "Already in Cart"
        })
    }   
})

// Update item quantity on cart
router.post('/update', validation.updateCart, async (req, res)=>{
    console.log("Update cart item quantity called")
    
    ans = {}
    
    //Check if Product  exist in cart before updating it
    if(await Cart.exists({product_id: req.cleanData.product_id})){
        if(req.cleanData.action == "increase"){
            //check if we have quantity of product to add into cart
            const p_q_left = await Product.findOne({_id: req.cleanData.product_id})
            const c_q = await Cart.findOne({product_id: req.cleanData.product_id})
            if(p_q_left['quantity'] > c_q['quantity']){
                item = await Cart.findOneAndUpdate(
                    {product_id: req.cleanData.product_id}, 
                    {$inc : {'quantity': 1}},
                    {new: true}
                    ).exec()
                ans['msg'] = "Cart updated"
                ans['item'] = item
            }
            else{
                ans['msg'] = "We do not have enough stock to add one more item"
            }
            
        }
        else if(req.cleanData.action == "decrease"){
            item = await Cart.findOneAndUpdate(
                {product_id: req.cleanData.product_id}, 
                {$inc : {'quantity': -1}},
                {new: true}
                ).exec()
            
            if(item.quantity == 0){
                ans['item'] = item.id
                await item.deleteOne()
                ans['msg'] = "Item Deleted"            
            }
            else{
                ans['msg'] = "Cart updated"
                ans['item'] = item
            }
        }
    }    
    else{
        ans['msg'] = "Invalid Request, Item does not exist in cart"
    }

    res.json(ans)
})

module.exports = router