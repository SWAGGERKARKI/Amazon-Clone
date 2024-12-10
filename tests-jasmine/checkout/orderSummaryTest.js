import { loadFromStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe('test suite: renderOrderSummary', () => {
  document.querySelector('.js-test-container').innerHTML = `
    <div class="js-product-container-row"></div>
  `;

  it('display cart items', () => {
    const productId1 = '3831-7d60-3d2a-c731-efd6-3403';
    const productId2 = '9860-e7eb-b6b6-fe47-6129-d4d7';

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-product-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-quantity-updation-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-quantity-updation-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });
});