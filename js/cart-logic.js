let cart = JSON.parse(localStorage.getItem('BRO_STORE_CART')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

function displayCart() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-price');
    
    // 1. Reset totals to zero at the start
    let total = 0;

    // 2. Check if cart is empty
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5" data-aos="fade-up">
                <h3 class="fw-bold">Your bag is empty!</h3>
                <p class="text-muted">Looks like you haven't picked anything for the little ones yet.</p>
                <a href="shop.html" class="btn btn-primary rounded-pill px-5 mt-3">Start Shopping</a>
            </div>`;
        subtotalEl.innerText = `$0.00`;
        totalEl.innerText = `$0.00`;
        return;
    }

    // 3. If not empty, render items and calculate price
    container.innerHTML = cart.map((item, index) => {
        total += item.price * (item.quantity || 1);
        return `
            <div class="card border-0 shadow-sm mb-3 p-3 rounded-4" data-aos="fade-up">
                <div class="row align-items-center">
                    <div class="col-3 col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-3" alt="${item.name}">
                    </div>
                    <div class="col-6 col-md-7">
                        <h5 class="fw-bold mb-1">${item.name}</h5>
                        <p class="text-muted small mb-0">$${item.price.toFixed(2)} x ${item.quantity || 1}</p>
                    </div>
                    <div class="col-3 col-md-3 text-end">
                        <button onclick="removeItem(${index})" class="btn btn-link text-danger p-0 text-decoration-none fw-bold">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 4. Update the labels with the calculated total
    subtotalEl.innerText = `$${total.toFixed(2)}`;
    totalEl.innerText = `$${total.toFixed(2)}`;
}

function removeItem(index) {
    // Remove the specific item from the array
    cart.splice(index, 1); 
    
    // Save the new shorter list to the laptop's memory
    localStorage.setItem('BRO_STORE_CART', JSON.stringify(cart)); 
    
    // RE-RUN the display function so the $0.00 shows up correctly
    displayCart(); 
}