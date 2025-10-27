// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
}

// Smooth scrolling for navigation links
function initializeScrolling() {
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    var scrollTopBtn = document.getElementById('scrollToTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Navbar behavior
function initializeNavbar() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.padding = '1rem 0';
            }
        });
    }
}

// Show form message helper function
function showFormMessage(element, type, message) {
    element.className = 'alert alert-' + type + ' mt-3';
    element.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check' : 'exclamation') + '-circle me-2"></i>' + message;
    element.classList.remove('d-none');

    if (type === 'success') {
        setTimeout(function() {
            element.classList.add('d-none');
        }, 5000);
    }
}

// Contact form handling
function initializeContactForm() {
    var contactForm = document.getElementById('contactForm');
    var formStatus = document.getElementById('form-status');
    var submitButton = document.getElementById('submitButton');
    
    if (!contactForm || !formStatus || !submitButton) {
        console.error('Required form elements not found');
        return;
    }

    // Cache button elements and text
    var buttonText = submitButton.querySelector('.button-text');
    var spinner = submitButton.querySelector('.spinner-border');
    var defaultText = submitButton.dataset.submitText || 'Send Message';
    var sendingText = submitButton.dataset.sendingText || 'Sending...';

    // Reset all form elements to initial state
    function resetForm() {
        // Reset form fields
        contactForm.reset();
        
        // Reset all inputs manually
        document.querySelectorAll('.contact-input').forEach(function(input) {
            input.value = '';
        });

        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = defaultText;
        spinner.classList.add('d-none');
        
        // Clear any status messages
        formStatus.className = 'alert d-none';
        formStatus.textContent = '';
    }

    function handleFormState(state, message) {
        if (state === 'success') {
            resetForm();
            showFormMessage(formStatus, 'success', message);
            // Remove URL parameters but keep the hash for scrolling
            var hash = window.location.hash;
            window.history.replaceState({}, document.title, window.location.pathname + hash);
        } else if (state === 'error') {
            submitButton.disabled = false;
            buttonText.textContent = defaultText;
            spinner.classList.add('d-none');
            showFormMessage(formStatus, 'danger', message);
            // Keep form data in case user wants to try again
        } else {
            resetForm();
        }
    }

    // Check URL parameters on page load
    function checkFormStatus() {
        var urlParams = new URLSearchParams(window.location.search);
        var message = urlParams.get('message');
        
        if (message === 'success') {
            handleFormState('success', 'Thank you! Your message has been sent successfully.');
        } else if (message === 'error') {
            handleFormState('error', 'Sorry, there was a problem sending your message. Please try again.');
        } else {
            handleFormState('reset');
        }
    }

    // Handle form submission
    function handleFormSubmission(e) {
        submitButton.disabled = true;
        buttonText.textContent = sendingText;
        spinner.classList.remove('d-none');
    }

    // Initialize form
    resetForm();
    checkFormStatus();

    // Add event listeners
    contactForm.addEventListener('submit', handleFormSubmission);

    // Add reset handler for when user navigates back
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            resetForm();
        }
    });
}
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeScrolling();
    initializeNavbar();
    initializeContactForm();
});
