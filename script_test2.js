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
    const preview = document.getElementById('cart-preview');

    //生成訂單
    //let orderDiv = document.createElement("div");
    //orderDiv.classList.add('order');

    //渲染preview
    if (!cartList || !preview) return;

    preview.innerHTML = '';
    cart.forEach(item => {
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
        preview.appendChild(li);

        //按鈕事件
        minusBtn.addEventListener('click', ()=>{
            if (item.quantity > 0){
                item.quantity -=1;
                qtyDisplay.textContent = item.quantity;
                priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        })

        plusBtn.addEventListener('click', ()=>{
            item.quantity +=1;
            qtyDisplay.textContent = item.quantity;
            priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        })  
    })
    updateTotal();
}

function renderSubmittedOrders(){
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const cartList = document.getElementById('cart-list');

    if (!cartList) return;

    cartList.innerHTML = '';
    orders.forEach(order =>{
        let orderDiv = document.createElement('div');
        orderDiv.classList.add("order");

        order.forEach(item =>{
            let li = document.createElement('li');

            let nameSpan = document.createElement('span');
            nameSpan.textContent = item.name;

            let qtySpan = document.createElement('span');
            qtySpan.textContent = item.quantity;

            let priceSpan = document.createElement('span');
            priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            li.appendChild(nameSpan);
            li.appendChild(qtySpan);
            li.appendChild(priceSpan);
            orderDiv.appendChild(li);
        });
        cartList.appendChild(orderDiv);
    });
    
}

function updateTotal(){
    let totalPrice = 0;
   
    //已送出訂單
    document.querySelectorAll('#cart-list .order li').forEach(li=>{
        const priceNode = li.querySelector('span:last-child');
        if(priceNode){
            totalPrice += parseFloat(priceNode.textContent.replace('$','')) || 0;
        }
    });

    //Preview
    document.querySelectorAll('#cart-preview li').forEach(li =>{
        const priceNode = li.querySelector('span:last-child');
        if(priceNode){
            totalPrice += parseFloat(priceNode.textContent.replace('$','')) || 0;
        }
    });

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);

    /*orderDivs.forEach(order=>{
        order.querySelectorAll('li').forEach(li =>{
            const priceText = li.querySelector('span:last-child').textContent;
            totalPrice += parseFloat(priceText.replace('$','')) || 0;
        })
    })

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);*/
    //localStorage.setItem("cart", JSON.stringify(cart));
    //let totalPrice = cart.reduce((sum,item) => sum+ item.price*item.quantity, 0);
    //reduce是js陣列的一個內建函數，用來將陣列歸納成單一數值，0則是totalPrice的預設值
    //document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

document.getElementById('submit-button').addEventListener('click', ()=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //讀取已送出訂單
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length > 0){
        let lastOrder = orders[orders.length -1];
        
        cart.forEach(item => {
            let existing = lastOrder.find(o => o.name === item.name);
            if (existing){
                existing.quantity += item.quantity;
            }
            else{
                lastOrder.push(item);
            }
        });
        orders[orders.length - 1] = lastOrder;
    }
    else{
        orders.push(cart);
    }
    localStorage.setItem('orders', JSON.stringify(orders));

    //清空 preview cart
    localStorage.setItem('cart', JSON.stringify([]));

    //重新渲染
    renderSubmittedOrders();
    renderCart();
    updateTotal();

    alert('Your Cart has been Submited') ; 
    window.location.href = 'homepage.html';
});

document.getElementById('clear-all-button').addEventListener('click', ()=>{
    //清空購物車
    localStorage.setItem('orders', JSON.stringify([]));
    localStorage.setItem('cart', JSON.stringify([]));

    //清空畫面
    document.getElementById('cart-list').innerHTML ='';
    document.getElementById('cart-preview').innerHTML ='';
    document.getElementById('totalPrice').textContent ='0';
    alert('All orders have been cleared');
});

window.onload = ()=>{
    renderSubmittedOrders();    
    renderCart();
    updateTotal();
    //先選染已送出訂單，再渲染preview，total的計算會比較保險
}