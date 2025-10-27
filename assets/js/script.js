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
    
    if (!contactForm || !formStatus || !submitButton) return;
    
    var buttonText = submitButton.querySelector('.button-text');
    var spinner = submitButton.querySelector('.spinner-border');

    function setSubmitState(isSubmitting) {
        if (isSubmitting) {
            submitButton.disabled = true;
            buttonText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
        } else {
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
            spinner.classList.add('d-none');
        }
    }

    function handleFormSubmission(e) {
        setSubmitState(true);
    }

    function checkFormStatus() {
        var urlParams = new URLSearchParams(window.location.search);
        var message = urlParams.get('message');
        
        if (message === 'success') {
            showFormMessage(formStatus, 'success', 'Thank you! Your message has been sent successfully.');
            contactForm.reset();
            setSubmitState(false);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (message === 'error') {
            showFormMessage(formStatus, 'danger', 'Sorry, there was a problem sending your message. Please try again.');
            setSubmitState(false);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            setSubmitState(false);
        }
    }

    // Initialize form state
    setSubmitState(false);
    
    // Check status on page load
    checkFormStatus();

    // Add form submission handler
    contactForm.addEventListener('submit', handleFormSubmission);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeScrolling();
    initializeNavbar();
    initializeContactForm();
});
