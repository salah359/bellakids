// 1. Initialize Cart & Language
let cart = JSON.parse(localStorage.getItem('BELLA_KIDS_CART')) || [];
let selectedSize = null; 

/**
 * Default to 'ar' (Arabic) for new visitors
 */
let currentLanguage = localStorage.getItem('BELLA_LANGUAGE') || 'ar';

// Translation Dictionary
const translations = {
    "en": {
        "delivery-bar": "✨ Fast Delivery within Ramallah & Surrounding Areas! ✨",
        "boys-delivery-bar": "💙 Awesome Gear for Brave Boys - Fast Delivery in Ramallah! 💙",
        "girls-delivery-bar": "🌸 Magical Outfits for Little Princesses - Shop the Collection! 🌸",
        "newborn-delivery-bar": "🍼 Gentle Care for Your New Arrivals - Fast Delivery in Ramallah! 🍼",
        // Navbar
        "nav-home": "Home",
        "nav-boys": "Boys",
        "nav-girls": "Girls",
        "nav-newborn": "Newborn",
        "nav-about": "About Us",
        // Hero & Categories
        "hero-title": "Stylish Outfits for Your Little Stars.",
        "hero-subtitle": "Premium quality clothing for boys and girls in Ramallah. Discover the magic of childhood fashion.",
        "newborn-title": "Softest Touch for Newborns.",
        "newborn-subtitle": "Organic cotton and gentle designs for your baby's first months.",
        "shop-now": "Shop Now",
        "boys-cat-title": "Cool Boys",
        "boys-cat-desc": "Durable and stylish sets.",
        "girls-cat-title": "Pretty Girls",
        "girls-cat-desc": "Dresses for every occasion.",
        "explore": "Explore",
        "new-arrivals": "New Arrivals",
        // Shopping UI
        "bag-btn": "Bag",
        "search-placeholder": "Search the collection...",
        "empty-bag": "Your bag is empty",
        "total": "Total:",
        "whatsapp-btn": "ORDER ON WHATSAPP",
        "select-size": "Select Size",
        "add-to-bag": "Add to Bag",
        "no-search": "No items found matching your search",
        "alert-size": "Please select a size first!",
        "currency": "₪",
        // Footer Keys
        "footer-desc": "Premium quality clothing for your little stars. Discover the magic of childhood fashion in Ramallah.",
        "footer-visit": "Visit Our Store",
        "footer-directions": "📍 Get Directions",
        "footer-location": "Ramallah, Palestine",
        "footer-connect": "Connect With Us",
        "footer-copy": "© 2025 Bella Kids. All rights reserved.",
        // About Us Page
        "about-title": "Our Story.",
        "about-text-1": "Bella Kids was born in the heart of Ramallah with a simple mission: to provide children with clothes as magical as their imagination.",
        "about-text-2": "We believe that high-quality fashion should be accessible, comfortable, and durable enough for every adventure.",
        "value-1-title": "Quality First",
        "value-1-desc": "We use only the softest organic cotton and premium fabrics safe for your child's skin.",
        "value-2-title": "Local Heart",
        "value-2-desc": "Proudly serving the families of Ramallah with fast local delivery and friendly service.",
        "value-3-title": "Magic Designs",
        "value-3-desc": "Our collections are hand-picked to ensure your little ones feel like stars every day.",
        "gallery-title": "Visit Our Boutique"
    },
    "ar": {
        "delivery-bar": "✨ خدمة توصيل سريعة لرام الله والمناطق المجاورة! ✨",
        "boys-delivery-bar": "💙 ملابس رائعة للأولاد الشجعان - توصيل سريع في رام الله! 💙",
        "girls-delivery-bar": "🌸 أزياء ساحرة لأميراتنا الصغيرات - تسوقي التشكيلة الآن! 🌸",
        "newborn-delivery-bar": "🍼 عناية لطيفة لحديثي الولادة - توصيل سريع في رام الله! 🍼",
        // Navbar
        "nav-home": "الرئيسية",
        "nav-boys": "الأولاد",
        "nav-girls": "البنات",
        "nav-newborn": "حديثي الولادة",
        "nav-about": "من نحن",
        // Hero & Categories
        "hero-title": "أزياء أنيقة لنجومكم الصغار.",
        "hero-subtitle": "ملابس ذات جودة عالية للأولاد والبنات في رام الله. اكتشفوا سحر موضة الطفولة.",
        "newborn-title": "أنعم لمسة لحديثي الولادة.",
        "newborn-subtitle": "قطن عضوي وتصاميم لطيفة لأشهر طفلك الأولى.",
        "shop-now": "تسوق الآن",
        "boys-cat-title": "أولاد كول",
        "boys-cat-desc": "أطقم متينة وأنيقة.",
        "girls-cat-title": "بنات جميلات",
        "girls-cat-desc": "فساتين لكل المناسبات.",
        "explore": "اكتشف",
        "new-arrivals": "وصلنا حديثاً",
        // Shopping UI
        "bag-btn": "الحقيبة",
        "search-placeholder": "ابحث في التشكيلة...",
        "empty-bag": "حقيبتك فارغة",
        "total": "المجموع:",
        "whatsapp-btn": "اطلب عبر واتساب",
        "select-size": "اختر المقاس",
        "add-to-bag": "أضف إلى الحقيبة",
        "no-search": "لم يتم العثور على نتائج للبحث",
        "alert-size": "يرجى اختيار المقاس أولاً!",
        "currency": "₪",
        // Footer Keys
        "footer-desc": "ملابس ذات جودة عالية لنجومكم الصغار. اكتشفوا سحر موضة الطفولة في قلب رام الله.",
        "footer-visit": "تفضلوا بزيارة متجرنا",
        "footer-directions": "📍 الحصول على الاتجاهات",
        "footer-location": "رام الله، فلسطين",
        "footer-connect": "تواصلوا معنا",
        "footer-copy": "© 2025 بيلا كيدز. جميع الحقوق محفوظة.",
        // About Us Page
        "about-title": "قصتنا.",
        "about-text-1": "ولدت بيلا كيدز في قلب رام الله بمهمة بسيطة: تزويد الأطفال بملابس ساحرة مثل خيالهم تماماً.",
        "about-text-2": "نحن نؤمن بأن الموضة عالية الجودة يجب أن تكون متاحة، مريحة، ومتينة بما يكفي لكل مغامرة.",
        "value-1-title": "الجودة أولاً",
        "value-1-desc": "نستخدم فقط أنعم الأقطان العضوية والأقمشة الفاخرة الآمنة لبشرة طفلك.",
        "value-2-title": "قلب محلي",
        "value-2-desc": "فخورون بخدمة عائلات رام الله مع توصيل محلي سريع وخدمة ودودة.",
        "value-3-title": "تصاميم ساحرة",
        "value-3-desc": "يتم اختيار مجموعاتنا يدوياً لضمان أن يشعر صغارك وكأنهم نجوم كل يوم.",
        "gallery-title": "تفضلوا بزيارة متجرنا"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    if (page === "index.html" || page === "" || page === "/") {
        createBalloons();
    }

    applyTranslations();
    renderProducts();
    updateCartUI();
});

// --- UPDATED Translation Logic ---
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('BELLA_LANGUAGE', currentLanguage);
    applyTranslations();
}

function applyTranslations() {
    // 1. Loop through all elements that need translation
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        if (translations[currentLanguage][key]) {
            element.innerText = translations[currentLanguage][key];
        }
    });

    // 2. Handle Search Placeholder separately
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.placeholder = translations[currentLanguage]['search-placeholder'];
    }

    // 3. Update Document Attributes for Layout (RTL/LTR)
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;

    // 4. Refresh dynamic UI elements
    renderProducts();
    updateCartUI();
}

// Helper: Get category from page title
function getCurrentCategory() {
    const title = document.title.toLowerCase();
    if (title.includes("boys")) return 'boys';
    if (title.includes("girls")) return 'girls';
    if (title.includes("newborn")) return 'newborn';
    return null;
}

// 2. Render Products Logic
function renderProducts() {
    const currentCat = getCurrentCategory();
    const productsToDisplay = currentCat ? 
        products.filter(p => p.category.includes(currentCat)) : 
        products;
    renderProductsToGrid(productsToDisplay);
}

function renderProductsToGrid(productsToDisplay) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-muted">${translations[currentLanguage]['no-search']}</h3>
            </div>`;
        return;
    }

    const currency = translations[currentLanguage]['currency'];

    productGrid.innerHTML = productsToDisplay.map(product => {
        const name = currentLanguage === 'ar' ? product.name_ar : product.name_en;

        return `
        <div class="col-md-4 col-6 mb-5" data-aos="fade-up">
            <div class="card product-card h-100 shadow-sm border-0 overflow-hidden" onclick="openProductDetails(${product.id})">
                <img src="${product.image}" class="card-img-top img-hover-zoom" alt="${name}">
                <div class="card-body text-center p-3">
                    <h5 class="fw-bold mb-1">${name}</h5>
                    <p class="fw-bold text-primary mb-3">${currency}${product.price.toFixed(2)}</p>
                    <button onclick="event.stopPropagation(); openProductDetails(${product.id})" class="btn btn-primary w-100 rounded-pill py-2">
                        ${translations[currentLanguage]['bag-btn']}
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// Search Filter Logic
function filterSearch() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const currentCat = getCurrentCategory();
    
    const categoryProducts = currentCat ? 
        products.filter(p => p.category.includes(currentCat)) : 
        products;

    const filtered = categoryProducts.filter(product => 
        (product.name_en && product.name_en.toLowerCase().includes(searchTerm)) || 
        (product.name_ar && product.name_ar.toLowerCase().includes(searchTerm)) ||
        (product.description_en && product.description_en.toLowerCase().includes(searchTerm)) ||
        (product.description_ar && product.description_ar.toLowerCase().includes(searchTerm))
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
    document.querySelectorAll('#sizeSelector .btn').forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline-secondary');
    });

    const currency = translations[currentLanguage]['currency'];
    const name = currentLanguage === 'ar' ? product.name_ar : product.name_en;
    const desc = currentLanguage === 'ar' ? product.description_ar : product.description_en;

    document.getElementById('popupName').innerText = name;
    document.getElementById('popupPrice').innerText = currency + product.price.toFixed(2);
    document.getElementById('popupDesc').innerText = desc;
    document.getElementById('popupImage').src = product.image;

    const sizeLabel = document.querySelector('[data-i18n-key="select-size"]');
    if(sizeLabel) sizeLabel.innerText = translations[currentLanguage]['select-size'];
    document.getElementById('modalAddToCart').innerText = translations[currentLanguage]['add-to-bag'];

    const modalBtn = document.getElementById('modalAddToCart');
    modalBtn.onclick = () => {
        if (!selectedSize) {
            alert(translations[currentLanguage]['alert-size']);
            return;
        }
        addToCart(product.id, selectedSize);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    const myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();
}

// 4. Cart Logic & FLYING ITEM ANIMATION
function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId && item.selectedSize === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, selectedSize: size, quantity: 1 });
    }

    runFlyToCartAnimation(product.image);
    saveAndUpdate();
}

function runFlyToCartAnimation(itemImageUrl) {
    const cartBubble = document.querySelector('.cart-float');
    if (!cartBubble) return;

    const flyingImg = document.createElement('img');
    flyingImg.src = itemImageUrl;
    flyingImg.style.position = 'fixed';
    flyingImg.style.top = '50%'; 
    flyingImg.style.left = '50%';
    flyingImg.style.width = '100px';
    flyingImg.style.height = '100px';
    flyingImg.style.objectFit = 'contain';
    flyingImg.style.borderRadius = '15px';
    flyingImg.style.zIndex = '100000';
    flyingImg.style.transition = 'all 0.8s cubic-bezier(0.1, 0.8, 0.3, 1)';
    flyingImg.style.pointerEvents = 'none';
    flyingImg.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(flyingImg);

    const cartRect = cartBubble.getBoundingClientRect();

    setTimeout(() => {
        flyingImg.style.top = (cartRect.top + cartRect.height / 2) + 'px';
        flyingImg.style.left = (cartRect.left + cartRect.width / 2) + 'px';
        flyingImg.style.width = '20px';
        flyingImg.style.height = '20px';
        flyingImg.style.opacity = '0.5';
        flyingImg.style.transform = 'translate(-50%, -50%) rotate(360deg)';
    }, 100);

    setTimeout(() => {
        flyingImg.remove();
        cartBubble.style.transform = 'scale(1.4)';
        setTimeout(() => cartBubble.style.transform = 'scale(1)', 200);
    }, 900);
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
    const currency = translations[currentLanguage]['currency'];

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `<div class="text-center py-5 text-muted">${translations[currentLanguage]['empty-bag']}</div>`;
            if (cartTotal) cartTotal.innerText = `${currency}0.00`;
        } else {
            cartItems.innerHTML = cart.map(item => {
                const name = currentLanguage === 'ar' ? item.name_ar : item.name_en;
                return `
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img src="${item.image}" width="60" height="60" class="rounded shadow-sm object-fit-cover">
                    <div class="${currentLanguage === 'ar' ? 'me-3' : 'ms-3'} flex-grow-1">
                        <h6 class="mb-0 fw-bold small">${name}</h6>
                        <div class="d-flex gap-2 align-items-center">
                            <small class="badge bg-light text-dark border">${item.selectedSize}</small>
                            <small class="text-primary fw-bold">${currency}${item.price.toFixed(2)} x ${item.quantity}</small>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id}, '${item.selectedSize}')">✕</button>
                </div>
            `}).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotal) cartTotal.innerText = currency + total.toFixed(2);
        }
    }
}

// 6. WhatsApp Order
function sendToWhatsApp() {
    const isEn = currentLanguage === 'en';
    if (cart.length === 0) return alert(translations[currentLanguage]['empty-bag']);
    
    let message = isEn ? "*New Order from Bella Kids*\n\n" : "*طلب جديد من بيلا كيدز*\n\n";
    message += isEn ? "I would like to order the following items:\n\n" : "أود طلب القطع التالية:\n\n";

    const currency = translations[currentLanguage]['currency'];

    cart.forEach((item, index) => {
        const name = isEn ? item.name_en : item.name_ar;
        message += `${index + 1}. *${name}*\n`;
        message += `   ${isEn ? 'Size' : 'المقاس'}: ${item.selectedSize}\n`;
        message += `   ${isEn ? 'Price' : 'السعر'}: ${currency}${item.price.toFixed(2)} x ${item.quantity}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `--------------------------\n`;
    message += `*${translations[currentLanguage]['total']} ${currency}${total.toFixed(2)}*\n\n`;
    message += isEn ? "Please let me know the delivery details." : "يرجى إعلامي بتفاصيل التوصيل.";
    
    const phoneNumber = "972598439251"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// 7. Homepage Balloons
function createBalloons() {
    const container = document.createElement('div');
    container.id = 'balloon-container';
    document.body.appendChild(container);

    const colors = ['#A2D2FF', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#CDB4DB'];

    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.floor(Math.random() * 90); 
        const duration = (5 + Math.random() * 5);     
        const delay = Math.random() * 3;            

        balloon.style.backgroundColor = color;
        balloon.style.left = left + '%';
        balloon.style.animationDuration = duration + 's';
        balloon.style.animationDelay = delay + 's';

        container.appendChild(balloon);
    }

    setTimeout(() => {
        if (container) container.remove();
    }, 15000);
}
