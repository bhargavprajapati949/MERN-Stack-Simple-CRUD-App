# MERN Stack Simple CURD App

## Table of Contents

- [Setup Guide](#setup-guide)
- [Homepage](#homepage)
- [API Reference](#api-reference)


## [Setup Guide](#setup-guide)

- Clone the Project in local PC
- install dependencies
    <pre>npm install</pre>
- Run development server
    <pre>npm run dev</pre>

## [Homepage](#homepage)

I have developed Homepage where you can see working of all api end points.

Just Open endpoint "/"

If you are running development server from localhost then open [localhost:8000](http://localhost:8000/)

![Homepage Preview](/public/assets/homepage.png)

## [API Reference](#api-reference)

- [List Products](#list-products)
- [Add Product](#add-product)
- [List Cart Items](#list-cart-items)
- [Add To Cart](#add-to-cart)
- [Update Cart](#update-cart)

## [List Products](#list-products)

### HTTP Request

<pre>GET /product</pre>

### Response

List of Product information

Definitions

<pre>
_id             : Product Id
product_name    : Product Name
product_image"  : Product Image
description     : Product Description
quantity        : Stock Available
unit_price      : Price of single product
</pre>

Sample
<pre>
[
  {
    "_id": "62c8795e49b15ab1506d64b0",
    "product_name": "Pencil",
    "product_image": "Pencil_1657305438191.jpg",
    "description": "Very Great Pencil",
    "quantity": 7,
    "unit_price": 15,
    "__v": 0
  },
  {
    "_id": "62c91503cffddea81137e42b",
    "product_name": "Pencil 2",
    "product_image": "Pencil 2_1657345282598.jpg",
    "description": "not good",
    "quantity": 10,
    "unit_price": 55,
    "__v": 0
  }
]
</pre>


## [Add Product](#add-product)

### HTTP Request

<pre>POST /product</pre>

content type : multipart/form-data

Parameters
<pre>
product_name    : Product Name              : String : Required
description     : Product Description       : String :
quantity        : Stock Available           : Int    : Required
unit_price      : Price of single product   : Int    : Required
product_image   : Product Image             : Image  :
</pre>

### Response

Definitions

<pre>
"msg"   : Status
"item"  : New Product
</pre>

Sample
<pre>
{
    "msg" : "Product Added",
    "item" : {
        "product_name" : "Product Name",
        "product_image" : "product image name.jpg",
        "description" : "product description",
        "quantity" : 57,
        "unit_price" : 18,
        "_id" : "62c9217b2bbc237530f357c8",
        "__v" : 0
    }
}
</pre>


## [List Cart Items](#list-cart-items)

### HTTP Request

<pre>GET /cart</pre>

### Response

List of Cart items and total amount

Definitions

<pre>

cart        : List Of cart Items
totalAmount : total Cart Amount

</pre>
Cart Item Definitions
<pre>

product_id : Json object containing product information
quantity : Units of that product items added in cart
 
</pre>
More about product information can be found in  List product Endpoint

Sample
<pre>
{
    "cart":[
        {
            "_id":"62c916b200304c377631761e",
            "product_id":{
                "_id":"62c8795e49b15ab1506d64b0",
                "product_name":"Pencil",
                "product_image":"Pencil_1657305438191.jpg",
                "description":"Very Great Pencil",
                "quantity":7,
                "unit_price":15,
                "__v":0
            },
            "quantity":4,
            "__v":0
        }
    ],
    "totalAmount":60
}
</pre>


## [Add To Cart](#add-to-cart)

### HTTP Request

<pre>POST /cart</pre>

content type : json

Parameters
<pre>
product_id : Product ID : String : Required
</pre>

### Response

Definitions

<pre>
"msg"   : Status
"item"  : Item added to cart
</pre>

Different Status Messages
- Added to Cart
- Product does not exist
- Already in Cart


Sample
<pre>
{
    "msg" : "Added to Cart",
    "item" : {
        "product_id" : "62c879bb0a3c22b963129bcd",
        "quantity" : 1,
    }
}
</pre>

## [Update Cart](#update-cart)

### HTTP Request

<pre>POST /cart/update</pre>

content type : json

Parameters
<pre>
product_id : Product ID         : String : Required
action     : increase/decrease  : String : Required 
</pre>

### Response

Definitions

<pre>
"msg"   : Status
"item"  : Updated Cart Item
</pre>

Different Status Messages
- Cart updated
- We do not have enough stock to add one more item
- Item Deleted


Sample
<pre>
{
    "msg" : "Cart updated",
    "item" : {
        "product_id" : "62c879bb0a3c22b963129bcd",
        "quantity" : 2
    }
}
</pre>