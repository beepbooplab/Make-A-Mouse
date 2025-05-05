/*handle adding to cart and removing from cart*/
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
  
    if (existing) {
      existing.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
  
    saveCart(cart);
    updateCartCount();
  }
  
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productElement = this.closest('.product');
      const product = {
        id: productElement.dataset.id,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price)
      };
  
      addToCart(product);
    });
  });
  
  updateCartCount();

  /*display cart items*/
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
  
    if (cart.length === 0) {
      cartContainer.textContent = 'Your cart is empty.';
      return;
    }
  
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartContainer.appendChild(div);
    });
  }
  
  renderCart();
  