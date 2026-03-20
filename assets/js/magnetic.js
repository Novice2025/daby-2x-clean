// assets/js/magnetic.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("magnetic.js loaded.");

    // Function to initialize magnetic elements
    function initMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic');

        magneticElements.forEach(el => {
            // Get the bounding rectangle of the element
            const bounding = el.getBoundingClientRect();

            // Add event listeners for mousemove, mouseleave
            el.addEventListener('mousemove', e => {
                // Calculate the center of the element
                const centerX = bounding.left + bounding.width / 2;
                const centerY = bounding.top + bounding.height / 2;

                // Calculate the mouse position relative to the center of the element
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                // Define the strength of the magnetic effect
                // Adjust these values to make the effect stronger or weaker
                const strengthX = 0.2; // How much the element moves horizontally
                const strengthY = 0.2; // How much the element moves vertically

                // Apply the transform using Anime.js for smooth animation
                anime({
                    targets: el,
                    translateX: mouseX * strengthX,
                    translateY: mouseY * strengthY,
                    duration: 300, // Duration of the animation
                    easing: 'easeOutQuad' // Easing function for a smooth stop
                });
            });

            el.addEventListener('mouseleave', () => {
                // Reset the element's position when the mouse leaves
                anime({
                    targets: el,
                    translateX: 0,
                    translateY: 0,
                    duration: 500, // Duration of the reset animation
                    easing: 'elastic(1, .6)' // Elastic easing for a subtle bounce back
                });
            });
        });
        console.log("Magnetic elements initialized.");
    }

    // Call the initialization function when the DOM is ready
    initMagneticElements();

    // If you need to re-initialize magnetic elements after dynamic content loads,
    // you can call initMagneticElements() again from main.js or after new content is added.
    // For example, if main.js loads new buttons, you might call:
    // if (typeof initMagneticElements === 'function') {
    //     initMagneticElements();
    // }
});