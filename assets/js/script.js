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

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner-border');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        formStatus.classList.add('d-none');
        
        // Prepare form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        try {
            const response = await fetch('https://formspree.io/f/xgvpvada', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                },
                mode: 'cors',
                credentials: 'omit'
            });
            
            let result;
            try {
                result = await response.json();
            } catch (e) {
                console.error('Error parsing response:', e);
                result = {};
            }
            
            if (response.ok) {
                // Success message
                formStatus.className = 'alert alert-success mt-3';
                formStatus.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                // Error from server
                throw new Error(result.error || 'Form submission failed');
            }
        } catch (error) {
            // Network or other error
            formStatus.className = 'alert alert-danger mt-3';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>' + 
                                 (error.message || 'An error occurred. Please try again later.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
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