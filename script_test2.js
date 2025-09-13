function addToCart(productName, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || []; //將Json轉換回可用data，並通通存在cart裡
    let existingProduct = cart.find(item => item.name === productName) //這個existingProduct其實就是現在加入的product
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
        //記得Json裡只能放字串，所以要用stringfy轉換，上面那步就是再存回去localStorage，並給他一個key叫做cart   
    renderCart()
}   

function renderCart(){ //渲染preview
    let cart =JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById('cart-list');
    const preview = document.getElementById('cart-preview');

    if (!cartList || !preview) return; //cartList只在checkout.html中存在，所以只能在checkout頁面執行

    preview.innerHTML = ''; 
    cart.forEach(item => { //forEach可以歷遍cart
        let li = document.createElement('li'); //<li>這個標籤可以用來持續往下生成cart

        let nameSpan = document.createElement("span");
        nameSpan.textContent = item.name; //在li下面(根據html裡的設定)，先生成產品名稱

        //數量容器
        let qtyContainer = document.createElement("span");
        let minusBtn = document.createElement("button");
        minusBtn.textContent = '-';
        let qtyDisplay = document.createElement("span");
        qtyDisplay.textContent = item.quantity;
        let plusBtn = document.createElement("button");
        plusBtn.textContent = "+";

        qtyContainer.appendChild(minusBtn); //這邊把數量及調整的按鈕全部包成一個set比較好排版
        qtyContainer.appendChild(qtyDisplay);
        qtyContainer.appendChild(plusBtn);

        let priceSpan = document.createElement("span");
        priceSpan.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

        li.appendChild(nameSpan);
        li.appendChild(qtyContainer);
        li.appendChild(priceSpan);
        preview.appendChild(li); //把上面的名稱、數量set、價格都加進li裡（這樣算一種商品的資訊），再把li加進preview中

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
    updateTotal(); //切記每渲染一次購物車就要重新算一次總額
}

function renderSubmittedOrders(){ /*這邊跟上面的renderCart類似，主要差別在於已送出的訂單設定上無法再進行數量的調整，
    所以不會有數量調控的set加運作程式碼，嚴格來說其實可以再用function把中間部分內容帶換掉但我覺得會太繁瑣效益也普通就沒做了*/
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

function addPricesFrom(selector, currentTotal){ //這是為了簡化下面的updateTotal所生的
    let total = currentTotal;
    document.querySelectorAll(selector).forEach(li=>{ 
        //找id=cart-list的區塊中class=order的元素底下的清單項目，所以會抓到每一種商品的訂單，全部歷遍並放進變數li
        const priceNode = li.querySelector('span:last-child');//從這個變數li中找出最後一個span的元素（就會是price)
        if(priceNode){
            total += parseFloat(priceNode.textContent.replace('$','')) || 0;
            //如果priceNode(即價格)存在，就去掉$並轉成數字加到totalPrice裡
        }
    });
    return total;
}

function updateTotal(){
    let totalPrice = 0;
   
    //已送出訂單
    totalPrice = addPricesFrom('#cart-list .order li', totalPrice);//這兩個中間計算過程相同，直接用addPricesFrom取代

    //Preview
    totalPrice = addPricesFrom('#cart-preview li',totalPrice);

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);//最後記得把totalPrice印出來
}

document.getElementById('submit-button').addEventListener('click',async ()=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //讀取已送出訂單
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length > 0){ //如果已經有訂單
        let lastOrder = orders[orders.length -1];//lastOrder其實就是正在進行的那筆

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
    else{//如果是第一次點
        orders.push(cart);
    }
    localStorage.setItem('orders', JSON.stringify(orders));

    //送到Flask
    try{ //下面那串即為後端API
        let response = await fetch("http://127.0.0.1:5000/submit-order",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},//後端的python檔設定好了
            body: JSON.stringify(cart)
        });

        let result = await response.json();
        console.log(result.message); //把後端的回傳值印在console上
        
        //清空 preview cart
        localStorage.setItem('cart', JSON.stringify([]));

        window.location.href = 'homepage.html';
        
        /*alert('Your Cart has been Submited') ; 
        alert本身會阻塞JS的執行流程，特別是搭配非同步的fetch，所以會導致無法順暢跳頁*/
        }
    catch(err){
        console.error("送訂單失敗", err);
    }

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
