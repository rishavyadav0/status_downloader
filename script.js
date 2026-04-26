document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Phone mockup scroll tilt effect for mobile
        if (phoneMockup) {
            if (window.innerWidth <= 768) {
                // Calculate tilt: starts at 5deg at top, rotates towards -5deg as user scrolls down
                let tilt = 5 - (window.scrollY / 60);
                tilt = Math.max(-5, Math.min(5, tilt)); // Clamp between -5 and 5 degrees
                phoneMockup.style.transform = `rotate(${tilt}deg) scale(1)`;
            } else {
                // On desktop, rely on CSS hover instead of scroll
                phoneMockup.style.transform = '';
            }
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after it becomes visible once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
