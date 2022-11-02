import { menuArray } from '/data.js'

// Global Variables

const orderContainer = document.getElementById('order-container')
const orderItems = document.getElementById('order-items')
const totalPrice = document.getElementById('total-price')
const completeOrderBtn = document.getElementById('complete-order-btn')
const checkoutForm = document.getElementById('checkout-form')
const payBtn = document.getElementById('pay-btn')
const thanksText = document.getElementById('thanks-text')
const closeBtn = document.getElementById('close-btn')
let orderArray = []

// Event Listeners

document.addEventListener('click', function(e){
  if(e.target.dataset.add){
    showOrderDiv(e.target.dataset.add)
    pushToOrder(e.target.dataset.add)
  }
  else if(e.target.dataset.remove){
    handleRemoveBtn(e.target.dataset.remove)
  }
})

completeOrderBtn.addEventListener('click', function(){
  checkoutForm.classList.remove('hidden')
})

payBtn.addEventListener('click', function(){
  orderContainer.classList.add('hidden')
  checkoutForm.classList.add('hidden')
  thanksText.classList.remove('hidden')
  showThanksMsg()
  orderArray = []
  document.querySelector('input[type="text"]').value = ''
  document.querySelector('input[type="number"]').value = ''
  document.querySelector('input[type="password"]').value = ''
})

closeBtn.addEventListener('click', function(){
  checkoutForm.classList.add('hidden')
})

// Functions

// RENDER THE "THANKS MESSAGE"

  function showThanksMsg(){
  const clientName = document.querySelector('input[name="name-input"]').value
  thanksText.innerText =`
  Thanks, ${clientName}! Your order is on its way!`
}

// ADD TO ORDER ARRAY

function pushToOrder(added){
  const addedItem = menuArray.filter(function(item){
    return item.name === added
  })[0]
  orderArray.push(addedItem)
  thanksText.classList.add('hidden')
  getHtmlOrder()
  getTotalPrice() 
  return orderArray
  }


  
// RENDER THE ORDER

function getHtmlOrder(){
  orderItems.innerHTML = ''
  let i = 0
  orderArray.forEach(function(product){
    orderItems.innerHTML += `
            <div class="added-product">
              <div class="name-remove-product">
                <h2 class="product-name">${product.name}</h2>
                <button class="remove-btn" data-remove="${i}">remove</button>
              </div> 
             <p class="product-price price">$${product.price}</p> 
            </div>     
            `
            i++
  })
}

// HIDE "YOUR ORDER" SECTION

function showOrderDiv(){
  orderContainer.classList.remove('hidden')
}

// CALCULATE TOTAL PRICE

function getTotalPrice(){
  let total = 0
  if(orderArray.length === 0){
    totalPrice.innerText = `$0`
  }
  else{
    for(let i = 0; i < orderArray.length; i++){
      total += orderArray[i].price
      totalPrice.innerText = `$${total}`
    }
  }
}

// HANDLE THE REMOVE BUTTON

function handleRemoveBtn(removed) {
  orderArray.splice(removed, 1)

  if(orderArray.length === 0){
    orderContainer.classList.add('hidden')
}
  getHtmlOrder()
  getTotalPrice()
}

// GET THE MENU

function getHtmlMenu(){
  let feedHtml = ``  
    menuArray.forEach(function(item){
      feedHtml+= `
      <div class="menu-item-container">
        <p class="emoji">${item.emoji}</p>
        <div class="item-info-wrapper">
          <h2>${item.name}</h2>
          <p class="ingredients">${item.ingredients}</p>
          <p class="price">$${item.price}</p>
        </div>
          <div clas="add-btn-wrapper">
            <button class="add-btn" data-add="${item.name}">+</button>
          </div>
      </div>
      `
  })
  return feedHtml
  
}

// RENDER THE MENU

function render(){
  document.getElementById('menu-container').innerHTML = getHtmlMenu()
}
render()


