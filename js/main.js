// 1. Initialize Cart
let cart = JSON.parse(localStorage.getItem('BELLA_KIDS_CART')) || [];
let selectedSize = null; 

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Helper: Get category from page title or body class
function getCurrentCategory() {
    if (document.title.includes("Boys")) return 'boys';
    if (document.title.includes("Girls")) return 'girls';
    return null; // For Home Page
}

// 2. Render Products Logic
function renderProducts() {
    const currentCat = getCurrentCategory();
    // Start with correct category items
    const productsToDisplay = currentCat ? products.filter(p => p.category === currentCat) : products;
    renderProductsToGrid(productsToDisplay);
}

// Unified function to display items (used by initial load and search)
function renderProductsToGrid(productsToDisplay) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-muted">No items found matching your search 🧸</h3>
            </div>`;
        return;
    }

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

// Search Filter Logic
function filterSearch() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const currentCat = getCurrentCategory();

    // First filter by category, then by search term
    const categoryProducts = currentCat ? products.filter(p => p.category === currentCat) : products;

    const filtered = categoryProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );

    renderProductsToGrid(filtered);
}

// 3. Popup & Size Logic
function selectSize(element, size) {
    document.querySelectorAll('#sizeSelector .btn').forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline-secondary');
    });
    
    element.classList.remove('btn-outline-secondary');
    element.classList.add('btn-primary', 'text-white');
    
    selectedSize = size;
}

function openProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedSize = null; 
    
    // Reset buttons visual state
    document.querySelectorAll('#sizeSelector .btn').forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline-secondary');
    });

    document.getElementById('popupName').innerText = product.name;
    document.getElementById('popupPrice').innerText = "$" + product.price.toFixed(2);
    document.getElementById('popupDesc').innerText = product.description;
    document.getElementById('popupImage').src = product.image;

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

// 4. Cart Logic
function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
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
                    <img src="${item.image}" width="60" height="60" class="rounded shadow-sm object-fit-cover">
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

// 6. WhatsApp Order (Formatted for Clarity)
function sendToWhatsApp() {
    if (cart.length === 0) return alert("Your bag is empty! 🛍️");
    
    // Header
    let message = "🌟 *New Order from Bella Kids* 🌟\n\n";
    message += "I'd like to order the following items:\n\n";

    // Item List
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Size: ${item.selectedSize}\n`;
        message += `   Price: $${item.price.toFixed(2)} x ${item.quantity}\n\n`;
    });

    // Total Calculation
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `--------------------------\n`;
    message += `💰 *Total Amount: $${total.toFixed(2)}*\n\n`;
    message += "Please let me know the delivery details! ✨";
    
    // Note: Change 'YOUR_PHONE_NUMBER' to your actual WhatsApp number (e.g., 970599000000)
    const phoneNumber = "07444450936"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}


