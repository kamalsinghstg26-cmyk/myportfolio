// Modern Portfolio JavaScript - Advanced Animations & Interactions
// Enhanced with modern web APIs and smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeThemeToggle();
    initializeMobileNav();
    initializeSmoothScrolling();
    initializeActiveNavLinks();
    initializeContactForm();
    initializeHeaderScrollEffect();
    initializeAdvancedScrollAnimations();
    initializeParticleEffect();
    initializeCursorEffect();
    initializeTypingEffect();
    initializeProjectCardEffects();
    initializeSkillProgressBars();
    initializeThemeTransitions();
});

/**
 * Theme Toggle Functionality
 */
function initializeThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update icon based on current theme
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Smooth theme transition
      document.documentElement.style.transition = 'all 0.3s ease';
      document.documentElement.setAttribute('data-theme', newTheme);

      // Save preference
      localStorage.setItem('theme', newTheme);

      // Update icon
      updateThemeIcon(newTheme);

      // Click animation
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);

      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    });
  }
}

function updateThemeIcon(theme) {
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');

  if (theme === 'light') {
    // show moon to allow switching back to dark
    iconMoon.style.display = 'inline-block';
    iconSun.style.display = 'none';
  } else {
    // show sun to allow switching to light
    iconMoon.style.display = 'none';
    iconSun.style.display = 'inline-block';
  }
}


/**
 * Enhanced Mobile Navigation with smooth animations
 */
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on a link with stagger effect
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }, index * 50); // Stagger the closing animation
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

/**
 * Enhanced Smooth Scrolling with easing
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Smooth scroll with custom easing
                    smoothScrollTo(targetPosition, 800);
                }
            }
        });
    });
}

/**
 * Custom smooth scroll function with easing
 */
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = performance.now();
    
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeInOutCubic)
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

/**
 * Enhanced Active Navigation Links with smooth transitions
 */
function initializeActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let ticking = false;
    
    function updateActiveLink() {
        if (!ticking) {
            requestAnimationFrame(() => {
                let currentSection = '';
                const scrollPosition = window.pageYOffset + 150;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                // Update active class with smooth transition
                navLinks.forEach(link => {
                    const wasActive = link.classList.contains('active');
                    const shouldBeActive = link.getAttribute('href') === '#' + currentSection;
                    
                    if (wasActive !== shouldBeActive) {
                        if (shouldBeActive) {
                            link.classList.add('active');
                            animateNavLink(link);
                        } else {
                            link.classList.remove('active');
                        }
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

/**
 * Animate navigation link activation
 */
function animateNavLink(link) {
    link.style.transform = 'scale(1.1)';
    setTimeout(() => {
        link.style.transform = '';
    }, 200);
}

/**
 * Enhanced Contact Form with better validation and animations
 */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm?.querySelectorAll('input, textarea');
    
    if (contactForm) {
        // Add floating label effect
        inputs?.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                animateInput(this, 'focus');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                animateInput(this, 'blur');
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                subject: document.getElementById('subject')?.value,
                message: document.getElementById('message')?.value
            };
            
            if (validateFormWithAnimation(formData)) {
                showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
                animateFormSubmission(contactForm);
                setTimeout(() => contactForm.reset(), 1000);
            } else {
                showFormMessage('Please fill in all fields correctly.', 'error');
                shakeForm(contactForm);
            }
        });
    }
}

/**
 * Animate input fields
 */
function animateInput(input, type) {
    if (type === 'focus') {
        input.style.transform = 'scale(1.02)';
        input.style.filter = 'brightness(1.1)';
    } else {
        input.style.transform = '';
        input.style.filter = '';
    }
}

/**
 * Enhanced form validation with visual feedback
 */
function validateFormWithAnimation(data) {
    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const value = data[field];
        
        if (!value || (field === 'email' && !isValidEmail(value))) {
            if (input) {
                input.style.borderColor = '#ef4444';
                input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }, 2000);
            }
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Animate form submission
 */
function animateFormSubmission(form) {
    form.style.transform = 'scale(0.98)';
    form.style.opacity = '0.8';
    setTimeout(() => {
        form.style.transform = '';
        form.style.opacity = '';
    }, 300);
}

/**
 * Shake form on error
 */
function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

/**
 * Enhanced form message display
 */
function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    existingMessage?.remove();
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="message-text">${message}</span>
        </div>
    `;
    
    messageElement.style.cssText = `
        margin-top: 1.5rem;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 500;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
        color: ${type === 'success' ? '#10b981' : '#ef4444'};
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    const form = document.querySelector('.contact-form');
    form.appendChild(messageElement);
    
    // Animate in
    requestAnimationFrame(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    });
    
    // Auto remove with fade out
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

/**
 * Enhanced Header Scroll Effect with dynamic blur
 */
function initializeHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let ticking = false;
    
    if (header) {
        function updateHeader() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const scrollProgress = Math.min(scrollY / 100, 1);
                    
                    header.classList.toggle('scrolled', scrollY > 50);
                    
                    // Dynamic background opacity
                    const opacity = 0.8 + (scrollProgress * 0.15);
                    const blur = 10 + (scrollProgress * 10);
                    
                    header.style.background = `rgba(10, 11, 15, ${opacity})`;
                    header.style.backdropFilter = `blur(${blur}px)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }
}

/**
 * Advanced Scroll Animations with Intersection Observer
 */
function initializeAdvancedScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .about-content p, .contact-details p');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = Array.from(entry.target.parentElement?.children || []).indexOf(element) * 100;
                
                setTimeout(() => {
                    element.classList.add('animate');
                    animateElementEntry(element);
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
}

/**
 * Animate element entry with custom effects
 */
function animateElementEntry(element) {
    if (element.classList.contains('skill-item')) {
        const icon = element.querySelector('.skill-icon');
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease 0.3s both';
        }
    }
    
    if (element.classList.contains('project-card')) {
        const placeholder = element.querySelector('.project-placeholder');
        if (placeholder) {
            placeholder.style.animation = 'pulse 1s ease 0.5s both';
        }
    }
}

/**
 * Particle Effect for Hero Section
 */
function initializeParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    resizeCanvas();
    initParticles();
    updateParticles();
    
    window.addEventListener('resize', resizeCanvas);
}

/**
 * Custom Cursor Effect
 */
function initializeCursorEffect() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactives.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.6)';
        });
    });
}

/**
 * Typing Effect for Hero Subtitle
 */
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const texts = [
        'BCA Student | Developer',
        'Full Stack Developer',
        'AI Enthusiast',
        'Creative Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

/**
 * Enhanced Project Card Effects
 */
function initializeProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        card.addEventListener('mouseenter', function() {
            // Tilt effect
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            this.style.transformStyle = 'preserve-3d';
            
            // Image zoom
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            
            // Content slide up
            if (content) {
                content.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transformStyle = '';
            
            if (image) {
                image.style.transform = '';
            }
            
            if (content) {
                content.style.transform = '';
            }
        });
        
        // 3D mouse tracking
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

/**
 * Skill Progress Bars Animation
 */
function initializeSkillProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((skill, index) => {
        // Add a subtle progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 0 0 16px 16px;
            width: 0;
            transition: width 1s ease 0.${index}s;
        `;
        
        skill.style.position = 'relative';
        skill.appendChild(progressBar);
        
        // Animate progress bar on hover
        skill.addEventListener('mouseenter', function() {
            const randomProgress = 70 + Math.random() * 30; // 70-100%
            progressBar.style.width = randomProgress + '%';
        });
        
        skill.addEventListener('mouseleave', function() {
            progressBar.style.width = '0%';
        });
    });
}

/**
 * Theme Transitions and Visual Effects
 */
function initializeThemeTransitions() {
    // Add CSS animations keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .message-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .message-icon {
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        .custom-cursor {
            mix-blend-mode: difference;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Performance optimized scroll handler
 */
function throttle(func, limit) {
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

/**
 * Utility function for smooth animations
 */
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Add loading animation
window.addEventListener('load', function () {
  document.body.classList.add('loaded');

  const elementsToAnimate = document.querySelectorAll(
    '.nav-item, .hero-title, .hero-subtitle, .hero-button'
  );

  elementsToAnimate.forEach((element, index) => {
    // wait for a browser repaint so initial style is visible
    setTimeout(() => {
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.add('fade-in-up');
    }, 50);
  });
});


// Optimize performance for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Add reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}
