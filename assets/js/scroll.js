// assets/js/scroll.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("scroll.js loaded.");

    // --- 1. Smooth Scrolling for Anchor Links ---
    // This function enables smooth scrolling when clicking on internal navigation links.
    function enableSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default jump behavior

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Get the height of the fixed navbar to offset the scroll position
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;

                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                    console.log(`Smooth scrolling to: ${targetId}`);
                }
            });
        });
    }

    // --- 2. Scroll-Triggered Animations (Reveal on Scroll) ---
    // This function uses Intersection Observer to detect when elements enter the viewport
    // and applies an animation class.
    function setupScrollRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target); // Stop observing once revealed
                    console.log(`Element revealed: ${entry.target.id || entry.target.className}`);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
        console.log("Scroll reveal animations set up.");
    }

    // --- 3. Scroll-to-Top Button (Blueprint Feature) ---
    // This creates a subtle scroll-to-top button that appears after scrolling down.
    function setupScrollToTopButton() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '&#x2191;'; // Up arrow character
        document.body.appendChild(scrollToTopBtn);

        // Add basic styling (you'll want to refine this in style.css)
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--electric-blue);
            color: var(--white-color);
            border: none;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            font-size: 1.5em;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            z-index: 1000;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        `;

        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show after scrolling 300px
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log("Scrolled to top.");
        });
        console.log("Scroll-to-top button set up.");
    }

    // --- 4. Navbar Shrink/Expand on Scroll (Blueprint Feature) ---
    // Makes the navbar smaller when scrolling down and larger when at the top.
    function setupNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.warn("Navbar element not found for scroll effect.");
            return;
        }

        const scrollThreshold = 50; // Pixels scrolled before shrinking

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        console.log("Navbar scroll effect set up.");
    }


    // Initialize all scroll-related functionalities
    enableSmoothScrolling();
    setupScrollRevealAnimations();
    setupScrollToTopButton();
    setupNavbarScrollEffect();
});