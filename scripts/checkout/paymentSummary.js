import {productInCart, getCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/product.js';
import {getDeliveryOption} from '../../data/deliveryOption.js';
import {formatCurrency} from '../utils/price.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let deliveryPriceCents = 0;

  productInCart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents + cartItem.quantity;

    const option = getDeliveryOption(cartItem.deliveryOptionId);
    deliveryPriceCents += option.priceCents * cartItem.quantity;
  });

  const beforeTaxTotalPriceCents = productPriceCents + deliveryPriceCents;
  const taxPriceCents = beforeTaxTotalPriceCents * 0.1;
  const totalPriceCents = beforeTaxTotalPriceCents + taxPriceCents;
  const itemsQuantity = getCartQuantity();

  const html = `
    <div class="order-summary-title">Order Summary</div>
    
    <div class="items-price">
      <div>Items (${itemsQuantity}):</div>
      <div>$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="shipping-price">
      <div>Shipping & handling:</div>
      <div>$${formatCurrency(deliveryPriceCents)}</div>
    </div>

    <hr class="line-one">

    <div class="before-tax-price">
      <div>Total before tax:</div>
      <div>$${formatCurrency(beforeTaxTotalPriceCents)}</div>
    </div>

    <div class="estimated-tax">
      <div>Estimated tax(10%)</div>
      <div>$${formatCurrency(taxPriceCents)}</div>
    </div>

    <hr class="line-two">

    <div class="total-price">
      <div>Order total:</div>
      <div>$${formatCurrency(totalPriceCents)}</div>
    </div>

    <div class="paypal-payment">
      <div>Use PayPal</div>
      <input class="checkbox" type="checkbox">
    </div>

    <button class="order-button">Place your order</button>
  `;

  document.querySelector('.js-order-summary').innerHTML = html;
}