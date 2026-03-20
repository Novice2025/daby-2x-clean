// assets/js/particles.js

document.addEventListener("DOMContentLoaded", () => {

  console.log("particles.js loaded");

  // 🚫 Disable on mobile BEFORE doing anything heavy
  if (window.innerWidth < 768) {
    console.log("Particles disabled on mobile");
    return;
  }

  // ✅ Check if library exists
  if (typeof tsParticles === "undefined") {
    console.error("tsParticles library not found. Check CDN in index.html");
    return;
  }

  // ✅ Init particles
  tsParticles.load("tsparticles", {

    background: {
      color: { value: "transparent" }
    },

    fpsLimit: 60,

    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 60,
            smooth: 10
          }
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: { opacity: 0.2 }
        },
        push: { quantity: 4 },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },

    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.08,
        width: 1
      },
      collisions: { enable: false },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        speed: 0.5
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80
      },
      opacity: { value: 0.1 },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 }
      }
    },

    detectRetina: true

  })
  .then(container => {
    console.log("tsParticles initialized", container);
  })
  .catch(error => {
    console.error("tsParticles error:", error);
  });

});