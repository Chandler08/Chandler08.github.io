// ==========================================
// NAVIGATION
// ==========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (navMenu) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(`
    .about-card,
    .offer-card,
    .why-card,
    .testimonial-card,
    .contact-card
`);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Wysyłanie...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message
                alert(result.message || 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                contactForm.reset();
            } else {
                // Show error message from server
                throw new Error(result.message || 'Wystąpił błąd podczas wysyłania.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Wystąpił błąd: ' + error.message);
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ==========================================
// FORM VALIDATION
// ==========================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();

    // Remove previous error
    input.classList.remove('error');
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
        showError(input, 'To pole jest wymagane');
        return false;
    }

    // Validate email
    if (input.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Wprowadź poprawny adres email');
            return false;
        }
    }

    // Validate phone
    if (input.type === 'tel' && value !== '') {
        const phoneRegex = /^[0-9\s\-\+\(\)]{9,}$/;
        if (!phoneRegex.test(value)) {
            showError(input, 'Wprowadź poprawny numer telefonu');
            return false;
        }
    }

    return true;
}

function showError(input, message) {
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentElement.appendChild(errorDiv);
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavLink, 100);
window.removeEventListener('scroll', highlightNavLink);
window.addEventListener('scroll', debouncedHighlight);

// ==========================================
// LAZY LOADING FOR IFRAME (MAP)
// ==========================================

const mapIframe = document.querySelector('.map-container iframe');

if (mapIframe) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Map is already loaded with src, but we can add loading animation
                entry.target.style.opacity = '0';
                entry.target.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, 100);

                mapObserver.unobserve(entry.target);
            }
        });
    });

    mapObserver.observe(mapIframe);
}

// ==========================================
// STATISTICS COUNTER ANIMATION
// ==========================================

const stats = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = element.textContent;
    const isNumber = /^\d+/.test(target);

    if (!isNumber) return;

    const number = parseInt(target);
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + target.replace(/^\d+/, '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Add keyboard navigation for mobile menu
mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
    }
});

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;

    if (e.key === 'Escape') {
        mobileMenuToggle.click();
    }

    if (e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🏢 Ambito Plus Sp. z o.o.', 'font-size: 20px; font-weight: bold; color: #2D5F3F;');
console.log('%cProfesjonalne dodatki meblowe dla stolarzy i producentów', 'font-size: 14px; color: #4CAF50;');
console.log('%c📞 Kontakt: 504 228 296', 'font-size: 12px; color: #666;');

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');

    // Add initial animation class to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
