// assets/js/diagram.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("diagram.js loaded.");

    // Function to initialize diagram interactions
    function initDiagramInteractions() {
        const diagramSteps = document.querySelectorAll('.diagram .step');

        if (diagramSteps.length === 0) {
            console.warn("No diagram steps found. Diagram interactions will not initialize.");
            return;
        }

        diagramSteps.forEach(step => {
            // Add a subtle animation on hover using Anime.js
            step.addEventListener('mouseenter', () => {
                anime({
                    targets: step,
                    translateY: -8, // Lift the step slightly
                    boxShadow: '0 15px 40px rgba(0,0,0,0.25)', // Deeper shadow
                    scale: 1.02, // Slightly enlarge
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            step.addEventListener('mouseleave', () => {
                anime({
                    targets: step,
                    translateY: 0, // Return to original position
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Original shadow
                    scale: 1, // Return to original size
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
        console.log("Diagram interactions initialized.");
    }

    // Call the initialization function when the DOM is ready
    initDiagramInteractions();
});