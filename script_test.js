function addToCart(productName, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === productName)
    /*等價於function(item){
        return(item.name === productName)
    } */
    if (existingProduct){
        existingProduct.quantity +=1;
    }
    else{
        cart.push({name: productName, price:price, quantity:1});
        //可以類比成Python中的dict
    }
    localStorage.setItem("cart", JSON.stringify(cart))
        //記得Json裡只能放字串，所以要用stringfy轉換   
    renderCart()
}   

function renderCart(){
    let cart =JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById('cart-list');
    const preview = document.getElementById('cart-preview')

    //生成訂單
    let orderDiv = document.createElement("div");
    orderDiv.classList.add('order');
    
    if (!cartList || !preview) return;

    cart.forEach(item=>{
        preview.innerHTML = ''
        let li = document.createElement('li');

        let nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;

        //數量容器
        let qtyContainer = document.createElement("span");
        let minusBtn = document.createElement("button");
        minusBtn.textContent = '-';
        let qtyDisplay = document.createElement("span");
        qtyDisplay.textContent = item.quantity;
        let plusBtn = document.createElement("button");
        plusBtn.textContent = "+";

        qtyContainer.appendChild(minusBtn);
        qtyContainer.appendChild(qtyDisplay);
        qtyContainer.appendChild(plusBtn);
        
        /*let quantitySpan = document.createElement("span");
        quantitySpan.textContent = `x${item.quantity}`;*/

        let priceSpan = document.createElement("span");
        priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        li.appendChild(nameSpan);
        li.appendChild(qtyContainer);
        li.appendChild(priceSpan);
        orderDiv.appendChild(li);

        //按鈕事件
        minusBtn.addEventListener('click', ()=>{
            if (item.quantity > 0){
                item.quantity -=1;
                qtyDisplay.textContent = item.quantity;
                priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
                updateTotal(cart);
            }
        })

        plusBtn.addEventListener('click', ()=>{
            item.quantity +=1;
            qtyDisplay.textContent = item.quantity;
            priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            updateTotal();
        })  
    })
    cartList.appendChild(orderDiv);
}

function updateTotal(){
    const orderDivs = document.querySelectorAll('#cart-list .order');
    let totalPrice = 0;

    orderDivs.forEach(order=>{
        order.querySelectorAll('li').forEach(li =>{
            const priceText = li.querySelector('span:last-child').textContent;
            totalPrice += parseFloat(priceText.replace('$','')) || 0;
        })
    })

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    //localStorage.setItem("cart", JSON.stringify(cart));
    //let totalPrice = cart.reduce((sum,item) => sum+ item.price*item.quantity, 0);
    //reduce是js陣列的一個內建函數，用來將陣列歸納成單一數值，0則是totalPrice的預設值
    //document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

document.getElementById('submit-button').addEventListener('click', ()=>{
    alert('Your Cart has been Submited') ; 
    localStorage.setItem('cart', JSON.stringify([]));
    window.location.href = 'homepage.html';
});
window.onload = ()=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length >0) {
        renderCart();
        updateTotal();    
}}