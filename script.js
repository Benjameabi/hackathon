/* ===========================
   JavaScript Boilerplate
   Modern ES6+ Best Practices
   =========================== */

// Strict mode for better error handling
'use strict';

/* ===========================
   Utility Functions
   =========================== */

/**
 * Utility object containing common helper functions
 */
const Utils = {
    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately
     * @returns {Function} Debounced function
     */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    /**
     * Throttle function to limit function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    /**
     * Generate a random ID
     * @param {number} length - Length of the ID
     * @returns {string} Random ID
     */
    generateId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code (default: USD)
     * @param {string} locale - Locale (default: en-US)
     * @returns {string} Formatted currency
     */
    formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    /**
     * Format date
     * @param {Date|string} date - Date to format
     * @param {Object} options - Formatting options
     * @param {string} locale - Locale (default: en-US)
     * @returns {string} Formatted date
     */
    formatDate(date, options = {}, locale = 'en-US') {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formatOptions = { ...defaultOptions, ...options };
        return new Intl.DateFormat(locale, formatOptions).format(new Date(date));
    },

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Sanitize HTML string
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Get element by selector with error handling
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {Element|null} Found element or null
     */
    $(selector, parent = document) {
        try {
            return parent.querySelector(selector);
        } catch (error) {
            console.error('Invalid selector:', selector, error);
            return null;
        }
    },

    /**
     * Get all elements by selector with error handling
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {NodeList|Array} Found elements
     */
    $$(selector, parent = document) {
        try {
            return parent.querySelectorAll(selector);
        } catch (error) {
            console.error('Invalid selector:', selector, error);
            return [];
        }
    }
};

/* ===========================
   DOM Helper Functions
   =========================== */

/**
 * DOM manipulation utilities
 */
const DOM = {
    /**
     * Add event listener with automatic cleanup
     * @param {Element|string} element - Element or selector
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    on(element, event, handler, options = {}) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            el.addEventListener(event, handler, options);
            // Store for potential cleanup
            if (!el._eventListeners) el._eventListeners = [];
            el._eventListeners.push({ event, handler, options });
        }
    },

    /**
     * Remove event listener
     * @param {Element|string} element - Element or selector
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    off(element, event, handler) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            el.removeEventListener(event, handler);
        }
    },

    /**
     * Add CSS class
     * @param {Element|string} element - Element or selector
     * @param {string} className - Class name to add
     */
    addClass(element, className) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            el.classList.add(className);
        }
    },

    /**
     * Remove CSS class
     * @param {Element|string} element - Element or selector
     * @param {string} className - Class name to remove
     */
    removeClass(element, className) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            el.classList.remove(className);
        }
    },

    /**
     * Toggle CSS class
     * @param {Element|string} element - Element or selector
     * @param {string} className - Class name to toggle
     */
    toggleClass(element, className) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            el.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     * @param {Element|string} element - Element or selector
     * @param {string} className - Class name to check
     * @returns {boolean} Has class
     */
    hasClass(element, className) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        return el ? el.classList.contains(className) : false;
    },

    /**
     * Set CSS styles
     * @param {Element|string} element - Element or selector
     * @param {Object} styles - Styles object
     */
    setStyles(element, styles) {
        const el = typeof element === 'string' ? Utils.$(element) : element;
        if (el) {
            Object.assign(el.style, styles);
        }
    },

    /**
     * Create element with attributes
     * @param {string} tag - HTML tag
     * @param {Object} attributes - Attributes object
     * @param {string} content - Inner content
     * @returns {Element} Created element
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });

        if (content) {
            element.innerHTML = content;
        }

        return element;
    }
};

/* ===========================
   API Helper Functions
   =========================== */

/**
 * API utilities for HTTP requests
 */
const API = {
    /**
     * Base fetch wrapper with error handling
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise} Fetch promise
     */
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },

    /**
     * GET request
     * @param {string} url - Request URL
     * @param {Object} options - Additional options
     * @returns {Promise} Response data
     */
    get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    },

    /**
     * POST request
     * @param {string} url - Request URL
     * @param {Object} data - Request body data
     * @param {Object} options - Additional options
     * @returns {Promise} Response data
     */
    post(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * PUT request
     * @param {string} url - Request URL
     * @param {Object} data - Request body data
     * @param {Object} options - Additional options
     * @returns {Promise} Response data
     */
    put(url, data, options = {}) {
        return this.request(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * DELETE request
     * @param {string} url - Request URL
     * @param {Object} options - Additional options
     * @returns {Promise} Response data
     */
    delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }
};

/* ===========================
   Form Handling
   =========================== */

/**
 * Form utilities
 */
const Form = {
    /**
     * Serialize form data to object
     * @param {HTMLFormElement} form - Form element
     * @returns {Object} Form data object
     */
    serialize(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes, etc.)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        return data;
    },

    /**
     * Validate form with custom rules
     * @param {HTMLFormElement} form - Form element
     * @param {Object} rules - Validation rules
     * @returns {Object} Validation result
     */
    validate(form, rules = {}) {
        const errors = {};
        const data = this.serialize(form);

        Object.entries(rules).forEach(([field, validators]) => {
            const value = data[field];
            const fieldErrors = [];

            validators.forEach(validator => {
                if (typeof validator === 'function') {
                    const result = validator(value, data);
                    if (result !== true) {
                        fieldErrors.push(result);
                    }
                }
            });

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
            data
        };
    },

    /**
     * Common validation rules
     */
    rules: {
        required: (value) => value && value.trim() !== '' || 'This field is required',
        email: (value) => !value || Utils.isValidEmail(value) || 'Please enter a valid email',
        minLength: (min) => (value) => !value || value.length >= min || `Minimum ${min} characters required`,
        maxLength: (max) => (value) => !value || value.length <= max || `Maximum ${max} characters allowed`,
        pattern: (regex, message) => (value) => !value || regex.test(value) || message
    }
};

/* ===========================
   App Initialization
   =========================== */

/**
 * Main application object
 */
const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('🚀 App initialized');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    },

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Contact form handling
        this.setupContactForm();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Set up team-specific features
        this.setupTeamFeatures();
        
        console.log('✅ Event listeners set up');
    },

    /**
     * Set up mobile menu functionality
     */
    setupMobileMenu() {
        const mobileMenu = Utils.$('#mobile-menu');
        const navMenu = Utils.$('.nav-menu');

        if (mobileMenu && navMenu) {
            DOM.on(mobileMenu, 'click', () => {
                DOM.toggleClass(mobileMenu, 'active');
                DOM.toggleClass(navMenu, 'active');
            });

            // Close menu when clicking on a link
            Utils.$$('.nav-link').forEach(link => {
                DOM.on(link, 'click', () => {
                    DOM.removeClass(mobileMenu, 'active');
                    DOM.removeClass(navMenu, 'active');
                });
            });
        }
    },

    /**
     * Set up smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        Utils.$$('a[href^="#"]').forEach(link => {
            DOM.on(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = Utils.$(`#${targetId}`);
                
                if (targetElement) {
                    const headerHeight = Utils.$('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * Set up contact form handling
     */
    setupContactForm() {
        const contactForm = Utils.$('#contactForm');
        
        if (contactForm) {
            DOM.on(contactForm, 'submit', async (e) => {
                e.preventDefault();
                
                const validation = Form.validate(contactForm, {
                    name: [Form.rules.required],
                    email: [Form.rules.required, Form.rules.email],
                    message: [Form.rules.required, Form.rules.minLength(10)]
                });

                if (validation.isValid) {
                    try {
                        // Replace with your actual form submission logic
                        console.log('Form data:', validation.data);
                        
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } catch (error) {
                        console.error('Form submission error:', error);
                        alert('Sorry, there was an error sending your message. Please try again.');
                    }
                } else {
                    console.log('Validation errors:', validation.errors);
                    // Display validation errors to user
                    Object.entries(validation.errors).forEach(([field, errors]) => {
                        console.warn(`${field}: ${errors.join(', ')}`);
                    });
                }
            });
        }
    },

    /**
     * Set up scroll effects
     */
    setupScrollEffects() {
        // Header background on scroll
        const header = Utils.$('.header');
        if (header) {
            const handleScroll = Utils.throttle(() => {
                if (window.scrollY > 50) {
                    DOM.addClass(header, 'scrolled');
                } else {
                    DOM.removeClass(header, 'scrolled');
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);
        }

        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        DOM.addClass(entry.target, 'animate-in');
                    }
                });
            }, observerOptions);

            // Observe elements that should animate in
            Utils.$$('.team-card, .stat-item, .section-content').forEach(el => {
                observer.observe(el);
            });
        }

        // Add team card interactions
        this.setupTeamInteractions();
    },

    /**
     * Set up team member card interactions
     */
    setupTeamInteractions() {
        const teamCards = Utils.$$('.team-card');
        
        teamCards.forEach(card => {
            // Add hover effect for accessibility
            DOM.on(card, 'mouseenter', () => {
                DOM.addClass(card, 'hovered');
            });

            DOM.on(card, 'mouseleave', () => {
                DOM.removeClass(card, 'hovered');
            });

            // Add click interaction for mobile
            DOM.on(card, 'click', () => {
                const isActive = DOM.hasClass(card, 'active');
                
                // Remove active class from all cards
                teamCards.forEach(otherCard => {
                    DOM.removeClass(otherCard, 'active');
                });

                // Toggle active class on clicked card
                if (!isActive) {
                    DOM.addClass(card, 'active');
                }
            });
        });
    },

    /**
     * Add team-specific functionality
     */
    setupTeamFeatures() {
        // Add LinkedIn sharing functionality
        const createLinkedInPost = () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Kolla in vårt fantastiska utvecklingsteam från Chas Academy! 🚀 #chasacademy #webbutveckling #teamwork');
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;
            window.open(linkedinUrl, '_blank', 'width=600,height=400');
        };

        // Add LinkedIn share button if it exists
        const linkedinBtn = Utils.$('#linkedin-share');
        if (linkedinBtn) {
            DOM.on(linkedinBtn, 'click', createLinkedInPost);
        }

        // Add GitHub Pages deployment check
        this.checkDeploymentStatus();
    },

    /**
     * Check if we're running on GitHub Pages
     */
    checkDeploymentStatus() {
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
            console.log('🎉 Successfully deployed on GitHub Pages!');
            
            // Add deployment success indicator
            const deploymentBadge = DOM.createElement('div', {
                className: 'deployment-badge',
                style: 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; z-index: 1001;'
            }, '✅ Live on GitHub Pages');
            
            document.body.appendChild(deploymentBadge);
            
            // Remove badge after 5 seconds
            setTimeout(() => {
                deploymentBadge.remove();
            }, 5000);
        }
    }
    }
};

/* ===========================
   Error Handling
   =========================== */

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send errors to a logging service here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault(); // Prevent the default browser behavior
});

/* ===========================
   Performance Monitoring
   =========================== */

// Simple performance monitoring
const Performance = {
    /**
     * Measure function execution time
     * @param {Function} fn - Function to measure
     * @param {string} label - Label for the measurement
     * @returns {*} Function result
     */
    measure(fn, label = 'Function') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${label} execution time: ${(end - start).toFixed(2)}ms`);
        return result;
    },

    /**
     * Log page load metrics
     */
    logPageMetrics() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    console.log('📊 Page Performance Metrics:');
                    console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
                    console.log(`Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
                    console.log(`Total Load Time: ${navigation.loadEventEnd - navigation.navigationStart}ms`);
                }
            }, 0);
        });
    }
};

/* ===========================
   Initialize Application
   =========================== */

// Initialize the application
App.init();

// Log performance metrics in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    Performance.logPageMetrics();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, DOM, API, Form, App, Performance };
}
