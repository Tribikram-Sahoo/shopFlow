// Products Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },
    {
        id: 3,
        name: "Leather Jacket",
        category: "fashion",
        price: 149.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "sports",
        price: 89.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "home",
        price: 59.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop"
    },
    {
        id: 6,
        name: "Laptop Backpack",
        category: "electronics",
        price: 45.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
    },
    {
        id: 7,
        name: "Sunglasses",
        category: "fashion",
        price: 129.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
    },
    {
        id: 8,
        name: "Yoga Mat",
        category: "sports",
        price: 29.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop"
    },
    {
        id: 9,
        name: "Table Lamp",
        category: "home",
        price: 39.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop"
    },
    {
        id: 10,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 69.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
    },
    {
        id: 11,
        name: "Denim Jeans",
        category: "fashion",
        price: 79.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
    },
    {
        id: 12,
        name: "Tennis Racket",
        category: "sports",
        price: 119.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1617882685817-1128b8e8c1d9?w=500&h=500&fit=crop"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartUI();
    setupEventListeners();
});

// Display Products
function displayProducts(productList) {
    productsGrid.innerHTML = '';
    
    if (productList.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #6b7280; font-size: 1.2rem;">No products found</p>';
        return;
    }
    
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Generate Star Rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    saveCart();
    updateCartUI();
    
    // Show feedback
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'scaleIn 0.3s';
    }, 10);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Filter and Search
function filterProducts() {
    let filtered = [...products];
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Category filter
    const category = categoryFilter.value;
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Price filter
    const priceRange = priceFilter.value;
    if (priceRange !== 'all') {
        if (priceRange === '200+') {
            filtered = filtered.filter(product => product.price >= 200);
        } else {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }
    }
    
    // Sort filter
    const sortBy = sortFilter.value;
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    displayProducts(filtered);
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Click outside to close cart
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
    
    // Checkout modal
    checkoutBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        checkoutModal.classList.add('active');
        updateCheckoutSummary();
    });
    
    closeModal.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // Checkout form
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Filters
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
    
    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Expiry date formatting
    document.getElementById('expiry').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV validation
    document.getElementById('cvv').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Update Checkout Summary
function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10;
    const total = subtotal + shipping;
    
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
}

// Handle Checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate payment processing
    checkoutModal.classList.remove('active');
    
    setTimeout(() => {
        successModal.classList.add('active');
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Reset form
        checkoutForm.reset();
    }, 500);
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
