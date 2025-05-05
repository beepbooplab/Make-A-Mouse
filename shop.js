// Utility functions for cart management
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
  
  // Add a product to the cart
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
  
  // Render cart items in the cart container
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
  
  // Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
  
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: parseFloat(this.dataset.price)
      };
  
      addToCart(product);
    });
  });
  
  // Initialize cart count on page load
  updateCartCount();
  
  // Render cart items if a cart container exists
  if (document.getElementById('cart-items')) {
    renderCart();
  }