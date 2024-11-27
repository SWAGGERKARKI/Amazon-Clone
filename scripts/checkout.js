import {productInCart, removeFromCart} from '../data/cart.js';
import {products} from '../data/product.js';
import {formatCurrency} from './utils/price.js';

let checkoutHTML = '';

productInCart.forEach((cartItem) => {
  let matchingItem;

  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      matchingItem = product;
    }
  });

  checkoutHTML += `
    <div class="cart-product-container js-cart-product-container-${matchingItem.id}">
      <div class="delivery-date-title">Delivery date: Tuesday, December 3</div>
  
      <div class="cart-product">
        <img class="product-image" src="${matchingItem.image}">
  
        <div class="product-info">
          <div class="product-title">${matchingItem.title}</div>
          <div class="product-price">$${formatCurrency(matchingItem.priceCents)}</div>
          <div class="quantity-updation">
            <div>Quantity: ${cartItem.quantity}</div>
            <div class="update-link">Update</div>
            <div class="delete-link js-delete-link" data-product-id=${matchingItem.id}>Delete</div>
          </div>
        </div>
  
        <div class="delivery-info">
          <div class="delivery-option-title">Choose a delivery option:</div>
          <div class="delivery-option-container">
            <div class="delivery-option-button-container">
              <input class="delivery-option-button" type="radio" name="delivery-option-${matchingItem.id}">
            </div>
            <div>
              <div class="delivery-option-date">Tuesday, December 3</div>
              <div class="delivery-shipping-fee">FREE Shipping</div>
            </div>
          </div>
        
          <div class="delivery-option-container">
            <div>
              <input class="delivery-option-button" type="radio" name="delivery-option-${matchingItem.id}">
            </div>
            <div>
              <div class="delivery-option-date">Wednesday, November 27</div>
              <div class="delivery-shipping-fee">$4.99 &ndash; Shipping</div>
            </div>
          </div>
  
          <div class="delivery-option-container">
            <div>
              <input class="delivery-option-button" type="radio" name="delivery-option-${matchingItem.id}">
            </div>
            <div>
              <div class="delivery-option-date">Monday, November 25</div>
              <div class="delivery-shipping-fee">$9.99 &ndash; Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-container-row').innerHTML = checkoutHTML;

function updateCheckoutItems() {
  let cartQuantity = 0;

  productInCart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-item-text').innerHTML = `${cartQuantity} items`;
}

updateCheckoutItems();

document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;

    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-product-container-${productId}`);
    container.remove();

    updateCheckoutItems();
  });
});
