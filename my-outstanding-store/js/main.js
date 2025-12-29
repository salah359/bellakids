// 1. Initialize Cart
let cart = JSON.parse(localStorage.getItem('BELLA_KIDS_CART')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// 2. Render Products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="col-md-4 col-6 mb-5" data-aos="fade-up">
            <div class="card product-card h-100 shadow-sm border-0 overflow-hidden" onclick="openProductDetails(${product.id})">
                <img src="${product.image}" class="card-img-top img-hover-zoom" alt="${product.name}">
                <div class="card-body text-center p-3">
                    <h5 class="fw-bold mb-1">${product.name}</h5>
                    <p class="fw-bold text-primary mb-3">$${product.price.toFixed(2)}</p>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="btn btn-primary w-100 rounded-pill py-2">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Popup Logic
function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('popupName').innerText = product.name;
    document.getElementById('popupPrice').innerText = "$" + product.price.toFixed(2);
    document.getElementById('popupDesc').innerText = product.description;
    document.getElementById('popupImage').src = product.image;

    // Update the Add button in the Modal
    const modalBtn = document.getElementById('modalAddToCart');
    modalBtn.onclick = () => {
        addToCart(product.id);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    const myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();
}

// 4. Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndUpdate();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveAndUpdate();
}

function saveAndUpdate() {
    localStorage.setItem('BELLA_KIDS_CART', JSON.stringify(cart));
    updateCartUI();
}

// 5. UI Updates (The "Bag" list)
function updateCartUI() {
    // Update Badge
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = count);

    // Update Sidebar List
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="text-center py-5 text-muted">Your bag is empty 🦁</div>';
            if (cartTotal) cartTotal.innerText = "$0.00";
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img src="${item.image}" width="60" class="rounded">
                    <div class="ms-3 flex-grow-1">
                        <h6 class="mb-0 fw-bold small">${item.name}</h6>
                        <small class="text-primary fw-bold">$${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotal) cartTotal.innerText = "$" + total.toFixed(2);
        }
    }
}

// 6. WhatsApp Order
function sendToWhatsApp() {
    if (cart.length === 0) return alert("Your bag is empty!");
    const message = "Hi Bella Kids! I want to order:\n" + 
                    cart.map(i => `- ${i.name} ($${i.price} x ${i.quantity})`).join('\n') +
                    `\nTotal: $${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}`;
    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`);
}