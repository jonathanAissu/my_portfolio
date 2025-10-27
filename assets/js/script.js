// Main JavaScript File
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize components
    initializeScrolling();
    initializeNavbar();
    initializeContactForm();
});

// Smooth scrolling for navigation links
function initializeScrolling() {
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollToTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Navbar behavior
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.padding = '1rem 0';
            }
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !formStatus) return;

    // Check URL parameters for form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    
    if (message === 'success') {
        showFormMessage(formStatus, 'success', 'Thank you! Your message has been sent successfully.');
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (message === 'error') {
        showFormMessage(formStatus, 'danger', 'Sorry, there was a problem sending your message. Please try again.');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner-border');
        
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
    });
}

// Helper function to show form messages
function showFormMessage(element, type, message) {
    element.className = `alert alert-${type} mt-3`;
    element.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle me-2"></i>${message}`;
    element.classList.remove('d-none');

    if (type === 'success') {
        setTimeout(() => {
            element.classList.add('d-none');
        }, 5000);
    }
}