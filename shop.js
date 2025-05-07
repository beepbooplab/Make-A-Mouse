// ========================
// Utility Functions
// ========================

// Retrieve the cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the cart count in the navbar
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// ========================
// Cart Management
// ========================

// Add a product to the cart
function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // If the product already exists in the cart, increase its quantity
    existingProduct.quantity++;
  } else {
    // Otherwise, add the product to the cart with a quantity of 1
    product.quantity = 1;
    cart.push(product);
  }

  saveCart(cart); // Save the updated cart to localStorage
  updateCartCount(); // Update the cart count in the navbar
}

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total'); // Select the total price container

  if (!cartContainer) return; // Exit if the cart container doesn't exist

  cartContainer.innerHTML = ''; // Clear the container
  let totalPrice = 0; // Initialize total price

  if (cart.length === 0) {
    // If the cart is empty, display a message
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = 'Total: $0.00'; // Reset total price
    return;
  }

  // Loop through the cart and create HTML for each item
  cart.forEach(item => {
    totalPrice += item.price * item.quantity; // Add to total price

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <div class="cart-item-content">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 100px; height: 100px; object-fit: contain;">
        <div>
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  // Update the total price at the end of the page
  cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Attach event listeners to "Remove" buttons
  setupRemoveButtons();
}

// Remove an item from the cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId); // Remove the item with the matching ID
  saveCart(cart); // Save the updated cart to localStorage
  renderCart(); // Re-render the cart
  updateCartCount(); // Update the cart count in the navbar
}

// ========================
// Event Listeners
// ========================

// Attach event listeners to all "Add to Cart" buttons
function setupAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
    
      // Create a product object from the button's data attributes
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: parseFloat(this.dataset.price),
        image: this.dataset.image // Include the image URL
      };
    
      addToCart(product); // Add the product to the cart
    });
  });
}

// Attach event listeners to "Remove" buttons
function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.dataset.id;
      removeFromCart(productId);
    });
  });
}

// ========================
// Initialization
// ========================

// Initialize the cart count on page load
updateCartCount();

// Render the cart items if the cart container exists
if (document.getElementById('cart-items')) {
  renderCart();
}

// Set up "Add to Cart" button event listeners
setupAddToCartButtons();