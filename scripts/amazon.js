let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-preview">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-info">
        <div class="product-title limit-to-2-line">${product.name}</div>
        <div class="product-rating-container">
          <img class="product-rating-image" src="rating-images/rating-${product.rating.stars * 10}.png">
          <p class="product-rating-count">${product.rating.count}</p>
        </div>
        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
    
        <div>
          <select name="product-quantity" id="product-quantity" class="js-product-quantity-${product.id}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          <img class="js-checkmark-icon-${product.id} checkmark-icon" src="icons/checkmark.png">
          <div class="added-text js-added-text-${product.id}">Added</div>
        </div>
        <div>
          <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button').forEach((addButton) => {
  addButton.addEventListener('click', () => {
    // const productId = addButton.dataset.productId;
    const { productId } = addButton.dataset;

    let quantity = 1;

    quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);

    let matchingItem;

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

    let cartQuantity = 0;

    productInCart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-items').innerHTML = cartQuantity;

    const checkMarkElement = document.querySelector(`.js-checkmark-icon-${productId}`);
    const addedTextElement = document.querySelector(`.js-added-text-${productId}`);
    checkMarkElement.classList.add('add-opacity');
    addedTextElement.classList.add('add-opacity');

    let timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      checkMarkElement.classList.remove('add-opacity');
      addedTextElement.classList.remove('add-opacity');
    }, 2000);
  });
});