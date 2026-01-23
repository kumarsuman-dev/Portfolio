document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle sidebar
            navLinks.classList.toggle('active');
            
            // Hamburger animation transform (optional, can be added in CSS)
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Hide/Show on Scroll (Optional Polish) ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll Down - Hide Navbar
            header.style.top = '-80px';
        } else {
            // Scroll Up - Show Navbar
            header.style.top = '0';
        }
        
        // Add shadow when scrolled
        if (scrollTop > 0) {
            header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // --- Reveal Elements on Scroll (Simple Fade In) ---
    const srConfig = (delay = 200) => ({
        distance: '20px',
        duration: 500,
        delay: delay,
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        scale: 1,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        mobile: true,
        reset: false,
        useDelay: 'always',
        viewFactor: 0.25,
        viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    
    // Note: To use ScrollReveal properly we would need to import the library.
    // For now, we will use a simple IntersectionObserver for a similar effect if needed
    // or keep it simple with CSS transitions.
    
    // Simple Intersection Observer implementation for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.hero-title, .hero-description, .hero-text, .section-title, .project-card, .skill-category, .about-text');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
        observer.observe(el);
    });

    // Add class for the CSS transition to take effect
    document.addEventListener('scroll', function() {
        const inViewElements = document.querySelectorAll('.in-view');
        inViewElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Auto-trigger for hero elements on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-text');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200); 
        });
    }, 100);

});
