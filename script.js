// CART ENGINE STORAGE STATE
let cart = [];

// DOM ELEMENTS
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const drawerCountSpan = document.getElementById('drawer-count');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('whatsapp-checkout');

// OPEN AND CLOSE DRAWER INTERACTION
cartToggle.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
});

const closeDrawer = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
};
cartClose.addEventListener('click', closeDrawer);
cartOverlay.addEventListener('click', closeDrawer);

// ADD PRODUCT CAPTURE INTERACTION
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
    cartDrawer.classList.add('open'); 
    cartOverlay.classList.add('open');
}

// UPDATE CART CALCULATIONS AND INTERFACE
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your shopping bag is empty.</p>';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += (item.price * item.quantity);

            const itemRow = document.createElement('div');
            itemRow.classList.add('cart-item');
            itemRow.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>GH₵${item.price.toFixed(2)}</p>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                    <button class="remove-item-btn" onclick="removeItem('${item.id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemRow);
        });
    }

    cartCountBadge.innerText = totalItems;
    drawerCountSpan.innerText = totalItems;
    cartTotalSpan.innerText = `GH₵${totalPrice.toFixed(2)}`;
}

// QUANTITY AND REMOVAL FUNCTIONS
window.changeQty = function(id, amount) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeItem(id);
            return;
        }
    }
    updateCartUI();
};

window.removeItem = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// FIXED FORM SUBMISSION & WHATSAPP CHAT ROUTING
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Please add products to your cart before checking out.');
        return;
    }

    // Grab field input data cleanly without aggressive character requirements
    const name = document.getElementById('customer-name').value || 'Customer';
    const location = document.getElementById('customer-location').value || 'Not Specified';
    const payment = document.getElementById('payment-method').value;

    let orderText = '✨ NEW ORDER - SAMPANA SENSATIONS ✨\n\n';
    orderText += '👤 Customer Details: \n';
    orderText += '• Name: ' + name + '\n';
    orderText += '• Location: ' + location + '\n';
    orderText += '• Payment: ' + payment + '\n\n';
    orderText += '🛍️ Items Ordered: \n';

    let total = 0;
    cart.forEach(item => {
        const lineTotal = item.price * item.quantity;
        total += lineTotal;
        orderText += '• ' + item.name + ' (x' + item.quantity + ') - GH₵' + lineTotal.toFixed(2) + '\n';
    });

    orderText += '\n💰 Total Order Cost: GH₵' + total.toFixed(2);

    // Hardcoded destination phone link setup 
    const baseLink = "https://wa.me";
    const finalCleanURL = baseLink + encodeURIComponent(orderText);
    
    window.open(finalCleanURL, '_blank');
});
