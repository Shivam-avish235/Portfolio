// Portfolio JavaScript Functionality

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupLoader();
            this.setupNavigation();
            this.setupTypingAnimation();
            this.setupParticles();
            this.setupScrollAnimations();
            this.setupSkillBars();
            this.setupStatCounters();
            this.setupScrollToTop();
            this.setupContactForm();
            this.setupMobileMenu();
            this.setupSmoothScrolling();
            this.setupMouseEffects();
            this.setupKeyboardNavigation();
        });
    }

    // Loading Screen
    setupLoader() {
        const loader = document.getElementById('loader');
        
        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 1500);
        });
    }

    // Navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        const texts = [
            'C++ • MERN Stack • Machine Learning',
            'Problem Solver • Quick Learner',
            'Full-Stack Developer • ML Enthusiast',
            'Blockchain • AI • Web Development'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        };

        typeWriter();
    }

    // Particle Animation
    setupParticles() {
        const particleContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;

        const resetParticle = () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.opacity = Math.random() * 0.8 + 0.2;
        };

        resetParticle();
        
        particle.style.animation = `floatUp ${particle.style.animationDuration} linear infinite`;
        
        container.appendChild(particle);

        // Add CSS animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        particle.addEventListener('animationend', resetParticle);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe sections and cards
        const animatedElements = document.querySelectorAll(`
            .about-content,
            .skill-category,
            .project-card,
            .timeline-item,
            .achievement-card,
            .contact-content
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });

        // Side animations
        const leftElements = document.querySelectorAll('.about-text');
        const rightElements = document.querySelectorAll('.about-stats');

        leftElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
            observer.observe(el);
        });

        rightElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            observer.observe(el);
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Statistics Counter Animation
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                    }, 40);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            countObserver.observe(stat);
        });
    }

    // Scroll to Top Button - Fixed implementation
    setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        
        // Show/hide scroll button based on scroll position
        const toggleScrollButton = () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        };

        // Add scroll event listener with throttling for performance
        window.addEventListener('scroll', this.throttle(toggleScrollButton, 100));

        // Scroll to top with smooth animation
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Smooth scroll to top
            const scrollToTop = () => {
                const currentScroll = window.scrollY;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(scrollToTop);
                    window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 8)));
                }
            };
            
            scrollToTop();
        });
    }

    // Contact Form - Enhanced with proper notification
    setupContactForm() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                this.showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                this.showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button temporarily
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission with delay
            setTimeout(() => {
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
                // Re-enable submit button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--color-card-bg);
                    border: 1px solid var(--color-card-border);
                    border-radius: var(--radius-base);
                    padding: 16px 20px;
                    color: var(--color-white);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-lg);
                    backdrop-filter: blur(10px);
                    max-width: 350px;
                    min-width: 280px;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification--success {
                    border-left: 4px solid var(--color-accent-secondary);
                }
                
                .notification--error {
                    border-left: 4px solid #ff4757;
                }
                
                .notification--info {
                    border-left: 4px solid var(--color-accent);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .notification-content i {
                    font-size: 18px;
                    flex-shrink: 0;
                }
                
                .notification--success .notification-content i {
                    color: var(--color-accent-secondary);
                }
                
                .notification--error .notification-content i {
                    color: #ff4757;
                }
                
                .notification--info .notification-content i {
                    color: var(--color-accent);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    padding: 4px;
                    margin-left: auto;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--color-white);
                }
                
                @media (max-width: 480px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-hide notification
        setTimeout(() => {
            if (notification && notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification && notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add mouse movement effects
    setupMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }
            });
        });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'visible';
                }
                
                // Also close notifications
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notif => notif.remove());
            }
        });
    }

    // Performance optimization utilities
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize Portfolio
const portfolio = new Portfolio();

// Add additional event listeners for enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 2000);

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-accent);
        color: var(--color-white);
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.setAttribute('id', 'main');
        mainContent.setAttribute('role', 'main');
    }

    // Enhanced error handling for images and external resources
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });

    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Lazy load functionality can be added here
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(el => lazyObserver.observe(el));
    }
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', portfolio.debounce(() => {
        // Handle responsive adjustments
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    }, 250));

    // Demo notification on load (optional - can be removed)
    setTimeout(() => {
        portfolio.showNotification('Welcome to my portfolio! Feel free to explore and get in touch.', 'info');
    }, 3000);
});

// Add CSS animations and transitions
const style = document.createElement('style');
style.textContent = `
    .loading {
        overflow: hidden;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    .project-card,
    .skill-category,
    .achievement-card {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);