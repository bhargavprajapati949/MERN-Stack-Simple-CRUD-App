function updateProducts(){
    $.ajax({
        url: "http://localhost:8000/product",
        success: (res) => {
            
            const product_temp = $('#product_temp');
            $('#product_list').empty();
            res.forEach(product => {
                let newProduct = product_temp.clone();
    
                $(newProduct).removeAttr('id');
    
                $(newProduct).css('display', 'block');
                
                $(newProduct).attr('id', product["_id"]);
                if(product["product_image"]){
                    $(newProduct).children('.img').attr('src', '/media/product_image/'+product["product_image"]);
                }
                $(newProduct).children('.name').append(product["product_name"]);
                $(newProduct).children('.desc').append(product["description"]);
                $(newProduct).children('div').children('.stock_left').append(product["quantity"]);
                $(newProduct).children('div').children('.price').append(product["unit_price"]);
                $(newProduct).children('div').children('.addProduct').data('p_id', product["_id"]);
                
                
                $('#product_list').append(newProduct);
            });
        }
    });
}
updateProducts();

function updateCart(){
    $.ajax({
        url: "http://localhost:8000/cart",
        success: (res) => {
            
            const cart_item_temp = $('#cart_temp');
            const total_amount = $('#totalAmount').clone();

            total_amount.removeAttr('id');
            total_amount.css('display', 'block');
            total_amount.children('.amt').text(res['totalAmount'])

            $('#cart').empty();

            res['cart'].forEach(cart_item => {
                let newCartItem = cart_item_temp.clone();
    
                $(newCartItem).removeAttr('id');
    
                $(newCartItem).css('display', 'flex');
    
                $(newCartItem).attr('id', cart_item["_id"]);
                if(cart_item["product_id"]["product_image"]){
                    $(newCartItem).children('.img').attr('src', '/media/product_image/'+cart_item["product_id"]["product_image"]);
                }
                $(newCartItem).children('.info').children('.name').append(cart_item["product_id"]["product_name"]);
                $(newCartItem).children('.info').children('.price').append(cart_item["product_id"]["unit_price"]);
                $(newCartItem).children('.quantity_control').children('.units').append(cart_item["quantity"]);
                $(newCartItem).children('.quantity_control').children('.qty_plus').data('p_id', cart_item["product_id"]["_id"]);
                $(newCartItem).children('.quantity_control').children('.qty_minus').data('p_id', cart_item["product_id"]["_id"]);

                $('#cart').append(newCartItem);
                $('#cart').append(total_amount)
            });
        }
    });
}
updateCart();

$('#add_product').submit(function(e){
    e.preventDefault();

    var form = $(this)[0]; 
    var actionUrl = 'http://localhost:8000/product';
    
    var data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: actionUrl,
        data: data,
        success: function (data) {
            updateProducts();
            form.reset();
        }
    });
});

function addToCart(btn){
    const product_id = $(btn).data('p_id');
    
    let url = 'http://localhost:8000/cart';
    let data = {
        'product_id' : product_id
    }

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function(res){
            updateCart();
        }
    });
}

function updateInc(btn){
    const product_id = $(btn).data('p_id');

    let url = 'http://localhost:8000/cart/update';
    let data = {
        'product_id' : product_id,
        'action': 'increase'
    }
    
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function(){
            updateCart();
        }
    });
}

function updateDec(btn){
    const product_id = $(btn).data('p_id');

    let url = 'http://localhost:8000/cart/update';
    let data = {
        'product_id' : product_id,
        'action': 'decrease'
    }


    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function(){
            updateCart();
        }
    });
}