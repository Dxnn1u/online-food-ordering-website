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
    let cartList = document.getElementById('cart-list')


    if (!cartList) return;

    cartList.innerHTML ="";
    cart.forEach(item=>{
        let li = document.createElement('li');

        let nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;

        //數量容器
        let qtyContainer = document.createElement("span");
        let minusBtn = document.createElement("button");
        minusBtn.textContent = '-';
        let qtyDisplay = document.createElement("span");
        qtyDisplay.textContent = item.quantity
        let plusBtn = document.createElement("button")
        plusBtn.textContent = "+"

        qtyContainer.appendChild(minusBtn)
        qtyContainer.appendChild(qtyDisplay)
        qtyContainer.appendChild(plusBtn)
        
        /*let quantitySpan = document.createElement("span");
        quantitySpan.textContent = `x${item.quantity}`;*/

        let priceSpan = document.createElement("span");
        priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        li.appendChild(nameSpan);
        li.appendChild(qtyContainer);
        li.appendChild(priceSpan);
        cartList.appendChild(li);

        //按鈕事件
        minusBtn.addEventListener('click', ()=>{
            if (item.quantity > 0){
                item.quantity -=1;
                qtyDisplay.textContent = item.quantity;
                priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
                updateCart(cart);
            }
        })

        plusBtn.addEventListener('click', ()=>{
            item.quantity +=1;
            qtyDisplay.textContent = item.quantity;
            priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            updateCart(cart);
        })  
    })
}

function updateCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalPrice = cart.reduce((sum,item) => sum+ item.price*item.quantity, 0);
    //reduce是js陣列的一個內建函數，用來將陣列歸納成單一數值，0則是totalPrice的預設值
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}
window.onload = renderCart;    

/*function click_add(){
    totalPrice+=5.99;
    console.log(totalPrice);
    
}

function clear_cart(){
    totalPrice = 0;
    console.log('The Cart Has Been CLEARED');
}

function show_total(){
    console.log(totalPrice);
}

localStorage.setItem("totalPrice", 1000)*/
