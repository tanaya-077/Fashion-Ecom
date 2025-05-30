// Fashion Store - Main JavaScript File
// =====================================

// Sample product data
const products = [
    {
        id: 1,
        name: "Elegant Silk Blouse",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Luxurious silk blouse with delicate detailing. Perfect for both professional and casual occasions.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Classic Midi Dress",
        price: 149.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Timeless midi dress crafted from premium materials. A versatile piece for any wardrobe.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Cashmere Cardigan",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Soft cashmere cardigan for ultimate comfort and style. A must-have for cooler seasons.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 4,
        name: "Tailored Blazer",
        price: 189.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Perfectly tailored blazer for the modern professional woman. Combines style with sophistication.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 5,
        name: "Flowing Maxi Skirt",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Flowing maxi skirt that moves beautifully. Perfect for both day and evening wear.",
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Satin Camisole",
        price: 59.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D",
        description: "Luxurious satin camisole with adjustable straps. A wardrobe essential for layering.",
        sizes: ["XS", "S", "M", "L", "XL"]
    }
];

// Global state variables
let cart = [];
let wishlist = [];
let selectedProduct = null;
let selectedSize = null;

// DOM elements cache
const DOM = {
    mobileMenuToggle: null,
    navMenu: null,
    productsGrid: null,
    modal: null,
    modalClose: null,
    cartCount: null,
    notification: null,
    newsletterForm: null,
    
    // Initialize DOM elements
    init() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.productsGrid = document.getElementById('products-grid');
        this.modal = document.getElementById('productModal');
        this.modalClose = document.querySelector('.modal-close');
        this.cartCount = document.querySelector('.cart-count');
        this.notification = document.getElementById('notification');
        this.newsletterForm = document.getElementById('newsletter-form');
    }
};

// App initialization
class FashionStore {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        DOM.init();
        this.loadProducts();
        this.setupEventListeners();
        this.setupProductCardAddToCart();
        this.updateCartUI();
        this.addScrollEffects();
        this.initializeSearch();
    }

    // Event listeners setup
    setupEventListeners() {
        // Mobile menu functionality
        this.setupMobileMenu();
        
        // Modal functionality
        this.setupModal();
        
        // Product interaction
        this.setupProductInteraction();
        
        // Cart functionality
        this.setupCart();
        
        // Newsletter
        this.setupNewsletter();
        
        // Navigation and scroll effects
        this.setupNavigation();
        
        // Wishlist
        this.setupWishlist();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    // Mobile menu setup
    setupMobileMenu() {
        if (!DOM.mobileMenuToggle || !DOM.navMenu) return;

        DOM.mobileMenuToggle.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
            const icon = DOM.mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                DOM.navMenu.classList.remove('active');
                const icon = DOM.mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Modal setup
    setupModal() {
        if (!DOM.modal || !DOM.modalClose) return;

        DOM.modalClose.addEventListener('click', () => this.closeModal());
        
        DOM.modal.addEventListener('click', (e) => {
            if (e.target === DOM.modal) {
                this.closeModal();
            }
        });
    }

    // Product interaction setup
    setupProductInteraction() {
        // Size selection
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(opt => 
                    opt.classList.remove('selected')
                );
                option.classList.add('selected');
                selectedSize = option.dataset.size;
            });
        });

        // Quantity controls
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const qtyInput = document.getElementById('quantity');

        if (decreaseBtn && increaseBtn && qtyInput) {
            decreaseBtn.addEventListener('click', () => {
                if (parseInt(qtyInput.value) > 1) {
                    qtyInput.value = parseInt(qtyInput.value) - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                if (parseInt(qtyInput.value) < 10) {
                    qtyInput.value = parseInt(qtyInput.value) + 1;
                }
            });
        }

        // Add to cart button
        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.addToCart());
        }
    }

    // Setup product card add to cart buttons
    setupProductCardAddToCart() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const button = e.target.closest('.add-to-cart-btn');
                const productId = parseInt(button.dataset.productId);
                this.addProductToCartDirectly(productId);
            }
        });
    }

    // Add product directly from product card
    addProductToCartDirectly(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Default to first size if none selected
        const defaultSize = product.sizes[0];
        
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: defaultSize,
            quantity: 1,
            image: product.image
        };

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => 
            item.id === cartItem.id && item.size === cartItem.size
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(cartItem);
        }

        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`, 'success');
        
        // Add visual feedback
        const button = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
        if (button) {
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            button.style.background = '#28a745';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
                button.style.background = 'var(--accent-color)';
            }, 2000);
        }
    }

    // Cart setup
    setupCart() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartPreview();
            });
        }
    }

    // Newsletter setup
    setupNewsletter() {
        if (!DOM.newsletterForm) return;
        
        DOM.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    // Navigation setup
    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Wishlist setup
    setupWishlist() {
        const wishlistIcon = document.querySelector('.nav-icons .fa-heart')?.parentElement;
        if (wishlistIcon) {
            wishlistIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Wishlist feature coming soon!', 'info');
            });
        }
    }

    // Keyboard navigation setup
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    // Load products into the grid
    loadProducts() {
        if (!DOM.productsGrid) return;
        
        DOM.productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            DOM.productsGrid.appendChild(productCard);
        });
    }

    // Create product card element
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view-btn" data-product-id="${product.id}">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    ${product.originalPrice ? `<span class="original">$${product.originalPrice}</span>` : ''}
                    <span class="current">$${product.price}</span>
                </div>
                <button class="btn add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
            </div>
        `;

        // Add click events
        const quickViewBtn = card.querySelector('.quick-view-btn');
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openProductModal(product.id);
        });

        card.addEventListener('click', () => {
            this.openProductModal(product.id);
        });

        return card;
    }

    // Open product modal
    openProductModal(productId) {
        selectedProduct = products.find(p => p.id === productId);
        if (!selectedProduct) return;

        // Update modal content
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        const quantityInput = document.getElementById('quantity');

        if (modalTitle) modalTitle.textContent = selectedProduct.name;
        if (modalPrice) modalPrice.textContent = `$${selectedProduct.price}`;
        if (modalDescription) modalDescription.textContent = selectedProduct.description;
        if (modalImage) {
            modalImage.innerHTML = `<img src="${selectedProduct.image}" alt="${selectedProduct.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
        
        // Reset selections
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        selectedSize = null;
        
        if (quantityInput) quantityInput.value = 1;

        // Show modal
        DOM.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    closeModal() {
        DOM.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        selectedProduct = null;
        selectedSize = null;
    }

    // Add to cart functionality
    addToCart() {
        if (!selectedProduct) {
            this.showNotification('Please select a product first!', 'error');
            return;
        }

        if (!selectedSize) {
            this.showNotification('Please select a size!', 'error');
            return;
        }

        const quantityInput = document.getElementById('quantity');
        const quantity = parseInt(quantityInput?.value || 1);
        
        const cartItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            size: selectedSize,
            quantity: quantity,
            image: selectedProduct.image
        };

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => 
            item.id === cartItem.id && item.size === cartItem.size
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        this.updateCartUI();
        this.showNotification('Item added to cart!', 'success');
        this.closeModal();
    }

    // Update cart UI
    updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (DOM.cartCount) {
            DOM.cartCount.textContent = totalItems;
        }
    }

    // Show cart preview
    showCartPreview() {
        if (cart.length === 0) {
            this.showNotification('Your cart is empty', 'info');
            return;
        }

        const cartItems = cart.map(item => 
            `${item.name} (${item.size}) - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Cart Items:\n${cartItems}\n\nTotal: $${total.toFixed(2)}`);
    }

    // Show notification
    showNotification(message, type = 'success') {
        if (!DOM.notification) return;
        
        DOM.notification.textContent = message;
        DOM.notification.className = `notification ${type}`;
        DOM.notification.classList.add('show');
        
        setTimeout(() => {
            DOM.notification.classList.remove('show');
        }, 3000);
    }

    // Handle newsletter form submission
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        // Validate email
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Show loading state
        button.innerHTML = '<div class="loading"></div>';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = '#28a745';
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'var(--accent-color)';
                button.disabled = false;
            }, 2000);
        }, 1500);
    }

    // Email validation utility
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add scroll effects and animations
    addScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-item, .product-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize search functionality
    initializeSearch() {
        const searchIcon = document.querySelector('.nav-icons a i.fa-search')?.parentElement;
        if (searchIcon) {
            searchIcon.addEventListener('click', (e) => {
                e.preventDefault();
                const searchTerm = prompt('Search for products:');
                if (searchTerm) {
                    this.searchProducts(searchTerm);
                }
            });
        }
    }

    // Search products functionality
    searchProducts(term) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase())
        );
        
        DOM.productsGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            DOM.productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">No products found matching your search.</p>';
        } else {
            filteredProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                DOM.productsGrid.appendChild(productCard);
            });
        }
        
        this.showNotification(`Found ${filteredProducts.length} product(s)`, 'info');
    }
}

// Initialize the application
const fashionStore = new FashionStore();

const contactForm = () =>{
    // Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show the custom popup
    document.getElementById('custom-popup').style.display = 'block';

    // Reset form
    this.reset();
});

// Close popup when 'x' is clicked
document.getElementById('popup-close').addEventListener('click', function() {
    document.getElementById('custom-popup').style.display = 'none';
});

// Optional: close when clicking outside the popup
window.addEventListener('click', function(e) {
    const popup = document.getElementById('custom-popup');
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
    
}
// Initialize the contact form functionality
    contactForm();