import {productInCart, addToCart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds existing product to the cart', () => {
    
  });

  it('adds new product to the cart', () => {
    // we can not call the function directly if we dont want to interfere the actual program
    // we make a function call fake so it does not affect the original program
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart('6022-3467-cb45-3f0a-7a3f-1e5f', 1);

    expect(productInCart.length).toEqual(1);
    expect(productInCart[0].quantity).toEqual(1);
    expect(productInCart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem.calls.count()).toBe(1);
  });
});