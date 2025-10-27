// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
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

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scrollToTop');

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

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    // Check URL parameters for form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    
    if (message === 'success') {
        formStatus.className = 'alert alert-success mt-3';
        formStatus.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully.';
        formStatus.classList.remove('d-none');
        // Clear success parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (message === 'error') {
        formStatus.className = 'alert alert-danger mt-3';
        formStatus.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Sorry, there was a problem sending your message. Please try again.';
        formStatus.classList.remove('d-none');
        // Clear error parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const spinner = submitButton.querySelector('.spinner-border');
            
            // Show loading state
            submitButton.disabled = true;
            buttonText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
        });
    }
});
            buttonText.textContent = 'Send Message';
            spinner.classList.add('d-none');
            formStatus.classList.remove('d-none');
            
            // Smooth scroll to status message
            const yOffset = -100; // Offset to account for fixed header
            const y = formStatus.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
            
            // Hide status message after 5 seconds if it's a success message
            if (formStatus.classList.contains('alert-success')) {
                setTimeout(() => {
                    formStatus.classList.add('d-none');
                }, 5000);
            }
        }
    });
}

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
});

// Initialize Bootstrap tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Project modal image gallery (if needed)
document.querySelectorAll('.project-gallery-img').forEach(img => {
    img.addEventListener('click', function() {
        const modalImg = this.getAttribute('data-full-img');
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        document.getElementById('modalImage').src = modalImg;
        modal.show();
    });
});