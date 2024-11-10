const products = [{
  image: 'images/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090
},
{
  image: 'images/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
},
{
  image: 'images/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
}];

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-preview">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-rating-container">
          <img class="product-rating-image" src="rating-images/rating-${product.rating.stars * 10}.png">
          <p class="product-rating-count">${product.rating.count}</p>
        </div>
        <div class="product-price">$${product.priceCents / 100}</div>
    
        <div>
          <select name="product-quantity" id="product-quantity">
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
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = productsHTML;