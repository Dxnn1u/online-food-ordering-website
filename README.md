# Online Food Ordering Website Development
One of my dreams is to open a pub. As both practice and a step toward that goal, I am developing a test-version web application for the pub I hope to run in the future. Since I am less experienced with backend development, this system currently focuses mainly on the frontend.

## Table of Contents
- [Reference Websites](#reference-website)
- [Structure](#structure)
- [Features](#features)
- [Design Approach](#design-approach)

## Reference Websites: 
### Balenciaga
I drew inspiration from their minimalist design style, which is based on a black-and-white color scheme combined with simple straight lines and variations in text weight.  

### Some Bars & Restaurants' Websites
The overall structure of the **Menu Page** was inspired by several bars and restaurants I have visited in the past, including the way images are arranged and how prices are displayed.

## Structure
### Homepage
#### Title
    The bar is called "THE Bar 01"
#### Order Button
    By clicking the button, and the user will be directed to the **Menu Page**

### Menu Page
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
    By clicking the cart button, the customer will be directed to the **Checkout Page**.

### Checkout Page
#### Back Button
    The back button navigates the customer back to **Menu Page** to continue ordering.
#### Submit Button
    When the submit button is clicked, an alerting message saying *"Your Cart has been Submitted"* will appear, and the customer will be redirected to the **Homepage**.
#### Clear All Button.
    This button was actually mainly created for development and testing purposes. When clicked, it clears both the page content and the data stored in `localStorage`.


## Features
### Anchor + Page Scrolling
On the **Menu Page**, subtitles at the top represent different types of food. When the user clicks on a specific type, the page will smoothly scroll to the corresponding section, providing a more natural and user-friendly navigation experience.


### Quantity Adjust
Customers can easily adjust the quantity of products already added to the cart using the "+" or "−" buttons. This convenient feature allows them to modify quantities without returning to the **Menu Page** or deleting items each time they want to make a change.

### Accumulate Order
This feature, while not strictly essential, is commonly found in many online ordering systems for restaurants. It allows customers to view their past orders when preparing to create a new one. Those past orders are locked and cannot be modified, ensuring that only the current cart—before submission—can be edited.

### Local Storage
Since customers frequently switch between pages while using this site, the `localStorage` API is used to temporarily store data in JSON format before navigation. When the user moves to a new page, the necessary data is retrieved from `localStorage` and converted back into a usable format.


## Design Approach
### Images and Descriptions
Since my main focus is on web design rather than content, for the introduction of each dish in this bar, I selected a few iconic items, used ChatGPT to help write the descriptions, and generated images with Gemini so that they all share a consistent style.
### Overall Web Design
Likewise, the primary goal of this side project is to practice my HTML, CSS, and JavaScript skills. Design is not the main focus, so I aimed to keep the website as simple as possible while still maintaining some visual structure and ensuring that all functionality remains complete.
