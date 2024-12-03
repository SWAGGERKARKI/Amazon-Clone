import {productInCart, removeFromCart, updateCartQuantity, updateDeliveryOptions, getCartQuantity} from '../../data/cart.js';
import {products, getProduct} from '../../data/product.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOption.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
import {formatCurrency} from './../utils/price.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';



export function renderOrderSummary() {
  let checkoutHTML = '';
  
  productInCart.forEach((cartItem) => {
    const matchingItem = getProduct(cartItem.productId);
  
    const option = getDeliveryOption(cartItem.deliveryOptionId);
  
    const currentDate = new dayjs();
    const deliveryDate = currentDate.add(option.deliveryDay, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
  
    checkoutHTML += `
      <div class="cart-product-container js-cart-product-container-${matchingItem.id}">
        <div class="delivery-date-title">Delivery date: ${dateString}</div>
    
        <div class="cart-product">
          <img class="product-image" src="${matchingItem.image}">
    
          <div class="product-info">
            <div class="product-title">${matchingItem.name}</div>
            <div class="product-price">$${formatCurrency(matchingItem.priceCents)}</div>
            <div class="quantity-updation">
              <div>Quantity: <span class="quantity js-quantity-${matchingItem.id}">${cartItem.quantity}<span></div>
              <input class="quantity-input js-quantity-input-${matchingItem.id}" type="number">
              <span class="quantity-save-link js-quantity-save-link" data-product-id="${matchingItem.id}">Save</span>
              <div class="update-link js-update-link" data-product-id="${matchingItem.id}">Update</div>
              <div class="delete-link js-delete-link" data-product-id=${matchingItem.id}>Delete</div>
            </div>
          </div>
    
          <div class="delivery-info">
            <div class="delivery-option-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingItem, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  
  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = '';
  
    deliveryOptions.forEach((deliveryOption) => {
      const currentDate = new dayjs();
      const deliveryDate = currentDate.add(deliveryOption.deliveryDay, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} &minus;`;
      const isChecked = (cartItem.deliveryOptionId === deliveryOption.id)
  
      html += `
        <div class="delivery-option-container js-delivery-option-container" data-product-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}">
          <div class="delivery-option-button-container">
            <input class="delivery-option-button" type="radio" name="delivery-option-${matchingItem.id}" ${isChecked ? 'checked' : ''}>
          </div>
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-shipping-fee">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });
    return html;
  }
  
  document.querySelector('.js-product-container-row').innerHTML = checkoutHTML;
  
  /*
  function updateCheckoutItems() {
    let cartQuantity = getCartQuantity();
  
    document.querySelector('.js-item-text').innerHTML = `${cartQuantity} items`;
  }
  */
  
  function updateNewQuantity(productId) {
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  
    const container = document.querySelector(`.js-cart-product-container-${productId}`);
    container.classList.remove('is-editing-quantity');
  
    updateCartQuantity(productId, newQuantity);
    // updateCheckoutItems();
  
    if (newQuantity >= 0 && newQuantity < 100) {
      document.querySelector(`.js-quantity-${productId}`).innerHTML = newQuantity;
    }
  }
  
  // updateCheckoutItems();
  
  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
  
      removeFromCart(productId);
  
      const container = document.querySelector(`.js-cart-product-container-${productId}`);
      container.remove();
  
      // updateCheckoutItems();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });
  
  document.querySelectorAll('.js-update-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;
  
      const container = document.querySelector(`.js-cart-product-container-${productId}`);
      container.classList.add('is-editing-quantity');
  
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          updateNewQuantity(productId);
        }
      });
    });
  });
  
  document.querySelectorAll('.js-quantity-save-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;
      
      updateNewQuantity(productId);
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });
  
  document.querySelectorAll('.js-delivery-option-container').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}