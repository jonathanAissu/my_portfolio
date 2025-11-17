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
                
                // Collapse navbar on mobile after clicking
                var navbarCollapse = document.querySelector('.navbar-collapse');
                var navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
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
                navbar.classList.add('scrolled');
            } else {
                navbar.style.padding = '1rem 0';
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Animated Skill Bars
function initializeSkillBars() {
    var skillItems = document.querySelectorAll('.skill-item');
    
    var observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(function(item) {
        observer.observe(item);
    });
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
            createConfetti(); // Trigger confetti animation
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

// Review Form Handler
function initializeReviewForm() {
    var reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;
    
    reviewForm.addEventListener('submit', function(e) {
        var submitBtn = reviewForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
        
        // Store form data before submission
        setTimeout(function() {
            // Clear form after a short delay to allow Formspree to process
            reviewForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Review';
        }, 1000);
    });
    
    // Check for success message in URL
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('review') === 'success') {
        var successAlert = document.getElementById('reviewSuccess');
        if (successAlert) {
            successAlert.classList.remove('d-none');
            reviewForm.reset();
            // Clear the URL parameter
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(function() {
                successAlert.classList.add('d-none');
            }, 5000);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeScrollProgress();
    initializeAOS();
    initializeScrolling();
    initializeNavbar();
    initializeSkillBars();
    initializeStatsCounter();
    initializeContactForm();
    initializeFormValidation();
    initializeReviewForm();
});

// 1. Preloader
function initializePreloader() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 3000);
        });
    }
}

// 2. Scroll Progress Indicator
function initializeScrollProgress() {
    var progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 4. Statistics Counter Animation
function initializeStatsCounter() {
    var statNumbers = document.querySelectorAll('.stat-number');
    var hasAnimated = false;
    
    var observerOptions = {
        threshold: 0.5
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(function(stat) {
                    var target = parseInt(stat.getAttribute('data-target'));
                    var current = 0;
                    var increment = target / 50;
                    
                    var counter = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + '+';
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                });
            }
        });
    }, observerOptions);
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats'));
    }
}

// 5. Form Validation
function initializeFormValidation() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    
    var inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(input);
        });
        
        input.addEventListener('input', function() {
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    if (field.value.trim() === '') {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        return false;
    } else if (field.type === 'email') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        }
    }
    
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    return true;
}

// 6. Success Confetti Animation
function createConfetti() {
    var colors = ['#0A1F44', '#1A3A5F', '#2C5F8D', '#4A7BA7'];
    
    for (var i = 0; i < 50; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(function() {
            confetti.remove();
        }, 3000);
    }
}