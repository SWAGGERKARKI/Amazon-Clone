export let productInCart = JSON.parse(localStorage.getItem('cart'));

if (!productInCart) {
  productInCart = [{
    productId: '3831-7d60-3d2a-c731-efd6-3403',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '9860-e7eb-b6b6-fe47-6129-d4d7',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(productInCart));
}

export function addToCart (productId) {
  let matchingItem;
  let quantity;

  quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);

  productInCart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    productInCart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];

  productInCart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        deliveryOptionId: cartItem.deliveryOptionId
      });
    }
  });
  productInCart = newCart;

  saveToStorage();
}

export function updateCartQuantity(productId, newQuantity) {
  if (newQuantity >= 0 && newQuantity < 100) {
    productInCart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
    });
  } else {
    alert('Enter valid quantity');
  }

  saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
  let matchingItem;

  productInCart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function getCartQuantity() {
  let cartQuantity = 0;
  
  productInCart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}