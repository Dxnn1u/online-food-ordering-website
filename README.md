# Online Food Ordering Website Development
One of my many dreams is to open a pub,as a practice and also a way to get me closer to this dream, I'm writting a web(test-ver) for the pub I'll open in the future

## Table of Contents
-[Reference Websites](#reference-website)
-[Structure](#structure)
-[Features](#features)
-[Design](#design)

## Reference Websites: 
### Balanciaga
    嘗試了他們那種簡潔並以黑白為基底，加上簡單直線及文字厚度的版面設計
    some bar's website(which I've visited before)
    整體menu頁面的架構是參考一些過去去過的餐酒館，包含圖片擺放的方式及價格標示的位置等
    some shopping website

## structure:
### Homepage
#### Title
    The bar is called "THE Bar 01"
#### Order Button
    press down the button, and the user will be directed to the Menu_Page
### Menu_Page
#### Menu
| Appetizer | Price |
|-----------|-------|
| Chill Cheese Fries | $12.99 |
| Nachos | $10.99 |

|  Drink  | Price |
|---------|-------|
| Negroni | $5.99 |
| Margarita | $5.99 |
| Long Island Iced Tea | $6.99 |
| Mojito | $5.49 |
| Bloody Mary | $5.49 |
| Manhattan | $6.49 |
| Martini | $6.49 |

|  Specials  | Price |
|------------|-------|
| Cocktail of the Day | $6.49 |
| House Shot | $2.99 |

#### Cart Button
    By pressing down the cart button, the customer will be directed to the checkout page.
### Checkout_Page




## Features
### Anchor+Page Scrolling
There will be subtitle on top of the Menu_Page, and when the use press the type of food they want to order, the page will scroll to the typical type of food the user just selected.

### Quantity Adjest
The customer can adjust the quantity of products they've already added into the cart by pressing the "+" or "-" buttons. It's a convenient function since the customers don't have to go back to the Menu_Page, or even delete the items everytime they want to change the quantity of a specific item.

### Accumulate Order
算是個非必要都在多數有點餐網頁的餐廳都會具備的功能，可以讓消費者在準備新增新的一單時看到過去的orders，同時這些過去的orders是不能再做數量上的修改的，只有當前正在編輯尚未submit的cart才行。

### Local Storage
Since the customers在使用這個網頁時會反覆切換頁面，因此會需要利用localStorage這個function去在切換頁面前將資料先以JSON格式存起來，到了新的頁面再從localStorage將所需的資料撈出來並轉換成可用的格式

## Design
### About the pics and the descriptions
Since my main focus is on the design in web not the content, so for the intro of every dishes in this bar, I just select few iconic items and then use Chatgpt to help me write the description, and use Gemini to generate picture such that they all have the same style.
### About the design of the whole web
Same reason, the main purpose I working on this side project is to practice my html,css,and javescripts skill, the design is not the main focus, so I try to make this web stays as simple as possible but also partly consider the arthemetic, and also maintain it's 功能的完整度