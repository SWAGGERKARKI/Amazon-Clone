import {getCartQuantity} from '../../data/cart.js';

export function renderCheckoutHeader() {
  const quantity = getCartQuantity();

  const html = `
    <div class="left-section">
      <img class="amazon-logo" src="icons/amazon-logo.png">
    </div>
    <div class="middle-section">
      <div class="checkout-text">Checkout(<span class="js-item-text" style="color: rgb(0, 167, 167)">${quantity} items</span>)</div>
    </div>
    <div class="right-section">
      <img src="icons/checkout-lock-icon.png">
    </div>
  `;
  
  document.querySelector('.js-header-content').innerHTML = html;
}