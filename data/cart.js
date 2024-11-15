export const productInCart = [];

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
      quantity
    });
  }
}