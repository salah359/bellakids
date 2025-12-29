// 1. Initialize Cart
let cart = JSON.parse(localStorage.getItem('BELLA_KIDS_CART')) || [];
let selectedSize = null; // Track size choice globally

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// 2. Render Products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    // Use a filtered list if you are on boys.html or girls.html
    const category = document.body.classList.contains('category-page') ? getCategoryFromURL() : null;
    const productsToDisplay = category ? products.filter(p => p.category === category) : products;

    productGrid.innerHTML = productsToDisplay.map(product => `
        <div class="col-md-4 col-6 mb-5" data-aos="fade-up">
            <div class="card product-card h-100 shadow-sm border-0 overflow-hidden" onclick="openProductDetails(${product.id})">
                <img src="${product.image}" class="card-img-top img-hover-zoom" alt="${product.name}">
                <div class="card-body text-center p-3">
                    <h5 class="fw-bold mb-1">${product.name}</h5>
                    <p class="fw-bold text-primary mb-3">$${product.price.toFixed(2)}</p>
                    <button onclick="event.stopPropagation(); openProductDetails(${product.id})" class="btn btn-primary w-100 rounded-pill py-2">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Popup & Size Logic
function selectSize(element, size) {
    // Remove active styles from all buttons
    document.querySelectorAll('#sizeSelector .btn').forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline-secondary');
    });
    
    // Add active style to clicked button
    element.classList.remove('btn-outline-secondary');
    element.classList.add('btn-primary', 'text-white');
    
    selectedSize = size;
}

function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedSize = null; // Reset size selection when opening
    
    // Reset size buttons visual state in modal
    document.querySelectorAll('#sizeSelector .btn').forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline-secondary');
    });

    document.getElementById('popupName').innerText = product.name;
    document.getElementById('popupPrice').innerText = "$" + product.price.toFixed(2);
    document.getElementById('popupDesc').innerText = product.description;
    document.getElementById('popupImage').src = product.image;

    // Update the Add button in the Modal
    const modalBtn = document.getElementById('modalAddToCart');
    modalBtn.onclick = () => {
        if (!selectedSize) {
            alert("Please select a size first! 🌸");
            return;
        }
        addToCart(product.id, selectedSize);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    const myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();
}

// 4. Cart Logic (Updated to support sizes)
function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    
    // Find item with SAME ID and SAME SIZE
    const existing = cart.find(item => item.id === productId && item.selectedSize === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, selectedSize: size, quantity: 1 });
    }

    saveAndUpdate();
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
    saveAndUpdate();
}

function saveAndUpdate() {
    localStorage.setItem('BELLA_KIDS_CART', JSON.stringify(cart));
    updateCartUI();
}

// 5. UI Updates
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = count);

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="text-center py-5 text-muted">Your bag is empty 🦁</div>';
            if (cartTotal) cartTotal.innerText = "$0.00";
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img src="${item.image}" width="60" class="rounded shadow-sm">
                    <div class="ms-3 flex-grow-1">
                        <h6 class="mb-0 fw-bold small">${item.name}</h6>
                        <div class="d-flex gap-2 align-items-center">
                            <small class="badge bg-light text-dark border">${item.selectedSize}</small>
                            <small class="text-primary fw-bold">$${item.price.toFixed(2)} x ${item.quantity}</small>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id}, '${item.selectedSize}')">✕</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotal) cartTotal.innerText = "$" + total.toFixed(2);
        }
    }
}

// 6. WhatsApp Order (Updated to include sizes in message)
function sendToWhatsApp() {
    if (cart.length === 0) return alert("Your bag is empty!");
    
    const message = "Hi Bella Kids! I want to order:\n" + 
                    cart.map(i => `- ${i.name} (Size: ${i.selectedSize}) [$${i.price} x ${i.quantity}]`).join('\n') +
                    `\n\nTotal: $${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}`;
    
    // Replace YOUR_PHONE_NUMBER with your actual number like 97059XXXXXXX
    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`);
}
