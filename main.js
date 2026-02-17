/**
 * Moodful Loaders — Main JavaScript
 * Handles IntersectionObserver, scroll indicator, and loader triggers
 */

(function() {
    'use strict';

    // DOM Elements
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const moodSections = document.querySelectorAll('.mood-section');
    const hero = document.querySelector('.hero');

    // State
    let currentSection = -1;
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize the application
     */
    function init() {
        setupIntersectionObserver();
        setupScrollIndicator();
        setupReducedMotionListener();
        
        // Initial check for sections already in view
        checkInitialVisibility();
    }

    /**
     * Set up IntersectionObserver for mood sections
     */
    function setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0.3, 0.5, 0.7]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                const sectionIndex = parseInt(section.dataset.section, 10);

                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    // Add in-view class to trigger animations
                    section.classList.add('in-view');
                    
                    // Update scroll indicator
                    updateScrollIndicator(sectionIndex);
                }
            });
        }, options);

        // Observe all mood sections
        moodSections.forEach(section => {
            observer.observe(section);
        });

        // Also observe hero for scroll indicator visibility
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    scrollIndicator.classList.remove('visible');
                    currentSection = -1;
                    resetScrollDots();
                } else if (!entry.isIntersecting) {
                    scrollIndicator.classList.add('visible');
                }
            });
        }, { threshold: [0.5] });

        heroObserver.observe(hero);
    }

    /**
     * Set up scroll indicator functionality
     */
    function setupScrollIndicator() {
        // Click on dots to navigate to sections
        scrollDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetSection = moodSections[index];
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: isReducedMotion ? 'auto' : 'smooth' 
                    });
                }
            });

            // Keyboard accessibility
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to section ${index + 1}`);
            
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetSection = moodSections[index];
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: isReducedMotion ? 'auto' : 'smooth' 
                        });
                    }
                }
            });
        });
    }

    /**
     * Update scroll indicator dots
     */
    function updateScrollIndicator(sectionIndex) {
        if (sectionIndex === currentSection) return;
        
        currentSection = sectionIndex;
        
        scrollDots.forEach((dot, index) => {
            if (index <= sectionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Reset all scroll dots to inactive
     */
    function resetScrollDots() {
        scrollDots.forEach(dot => {
            dot.classList.remove('active');
        });
    }

    /**
     * Check initial visibility of sections on page load
     */
    function checkInitialVisibility() {
        moodSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If section is already visible on load
            if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                section.classList.add('in-view');
                const sectionIndex = parseInt(section.dataset.section, 10);
                updateScrollIndicator(sectionIndex);
            }
        });

        // Check if hero is not visible (page loaded scrolled down)
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom < window.innerHeight * 0.5) {
            scrollIndicator.classList.add('visible');
        }
    }

    /**
     * Listen for reduced motion preference changes
     */
    function setupReducedMotionListener() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        mediaQuery.addEventListener('change', (e) => {
            isReducedMotion = e.matches;
        });
    }

    /**
     * Debounce utility function
     */
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

    /**
     * Handle scroll events for additional effects
     */
    const handleScroll = debounce(() => {
        // Additional scroll-based effects can be added here
        // Currently handled by IntersectionObserver
    }, 16);

    // Add scroll listener for any additional effects
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle page visibility changes (pause/resume animations)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - animations will naturally pause
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible again
            document.body.classList.remove('page-hidden');
        }
    });

})();
