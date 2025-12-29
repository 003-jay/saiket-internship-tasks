// ==================== Mobile Menu Toggle ==================== 
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// ==================== Theme Toggle (Dark Mode) ====================
const themeSwitch = document.getElementById('themeSwitch');

// Load saved theme preference from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// ==================== Form Validation & Signup ====================
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear error message on input
nameInput.addEventListener('input', () => {
    nameError.classList.remove('show');
});

emailInput.addEventListener('input', () => {
    emailError.classList.remove('show');
});

// Enable/disable submit button based on input
function updateSubmitButton() {
    const isNameValid = nameInput.value.trim().length >= 2;
    const isEmailValid = isValidEmail(emailInput.value);
    submitBtn.disabled = !(isNameValid && isEmailValid);
}

nameInput.addEventListener('input', updateSubmitButton);
emailInput.addEventListener('input', updateSubmitButton);

// Initialize button state
updateSubmitButton();

// Form submission with validation
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error messages
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    successMessage.style.display = 'none';

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long';
        nameError.classList.add('show');
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form
        signupForm.reset();
        updateSubmitButton();

        // Log the subscription (in real app, send to server)
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            timestamp: new Date().toLocaleString()
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});

// ==================== CTA Button Alert ====================
const ctaButton = document.getElementById('ctaButton');

ctaButton.addEventListener('click', () => {
    // Create a modal-like alert
    showCustomAlert('🚀 Success!', 'Welcome to TechFlow! Redirecting to signup...');
    
    // Simulate redirect
    setTimeout(() => {
        // In a real app, this would redirect to a signup page
        console.log('Redirecting to signup page...');
    }, 1500);
});

// Custom alert function
function showCustomAlert(title, message) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background-color: ${document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff'};
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;

    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: ${document.body.classList.contains('dark-mode') ? '#ffffff' : '#1e293b'};
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;

    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        color: ${document.body.classList.contains('dark-mode') ? '#cbd5e1' : '#64748b'};
        margin-bottom: 1.5rem;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        background-color: #6366f1;
        color: white;
        border: none;
        padding: 10px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.3s ease;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.backgroundColor = '#4f46e5';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.backgroundColor = '#6366f1';
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });

    modal.appendChild(titleEl);
    modal.appendChild(messageEl);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Scroll Animation for Elements ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== Console Logging ====================
console.log('%cTechFlow Landing Page', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cJavaScript functionality enabled ✓', 'color: #10b981; font-size: 14px;');
console.log('Features:', {
    'Mobile Menu': 'Click hamburger to toggle menu',
    'Dark Mode': 'Toggle dark mode in the contact section',
    'Form Validation': 'Subscribe with valid name and email',
    'CTA Button': 'Click "Get Started Today" for alert',
    'Smooth Scrolling': 'Navigation links scroll smoothly',
    'Animations': 'Cards animate on scroll'
});
