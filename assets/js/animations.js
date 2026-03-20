// assets/js/animations.js

document.addEventListener("DOMContentLoaded", () => {

    console.log("animations.js loaded");

    /* ========================= */
    /* HERO ANIMATION SYSTEM */
    /* ========================= */

    // This function is called by main.js after the page loader fades out
    window.initHeroAnimations = function(){

        anime.timeline({
            targets:'.hero-left > *', // Targets h1, p, and div.hero-buttons
            easing:'easeOutExpo',
            duration:1200,
            delay:anime.stagger(150) // Stagger delay for each element
        })
        .add({
            opacity:[0,1],
            translateY:[20,0]
        })
        .add({
            // Animate magnetic buttons after initial text appears
            targets:'.hero-buttons .magnetic',
            scale:[0.9,1],
            opacity:[0,1],
            duration:800,
            easing:'easeOutBack',
            delay:anime.stagger(100),
        },'-=800'); // Start 800ms before the previous timeline ends for overlap


        // Animate hero-right video container (fade-in)
        anime({
            targets:'.hero-right',
            opacity:[0,1],
            duration:1500,
            easing:'easeOutQuad',
            delay:800 // Delay after hero-left starts
        });

        // Animate the span inside h1 for a subtle effect
        anime({
            targets:'.hero-left h1 span',
            opacity:[0,1],
            translateY:[10,0],
            duration:1000,
            easing:'easeOutExpo',
            delay:1000 // After h1 itself has started
        });

    };


    /* ========================= */
    /* SCROLL REVEAL SYSTEM */
    /* ========================= */

window.initScrollReveal = function(){

    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const el = entry.target;

                // Check if it's a framework step within its container
                if (el.classList.contains('framework-step') && el.closest('.framework-steps-container')) {
                    anime({
                        targets: el,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 900,
                        easing: "easeOutExpo",
                        delay: el.dataset.delay || 0 // Use data-delay for staggered effect
                    });
                } else {
                    // Default animation for other reveal-on-scroll elements
                    anime({
                        targets: el,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 900,
                        easing: "easeOutExpo"
                    });
                }

                observer.unobserve(el);

            }

        });

    },{threshold:0.2});

    elements.forEach((el, index) => {
        // Add a data-delay attribute for staggered animation of framework steps
        if (el.classList.contains('framework-step')) {
            el.dataset.delay = index * 100; // Stagger by 100ms for each step
        }
        observer.observe(el);
    });

};

    // Initialize scroll reveal for elements present on initial DOM load
    initScrollReveal();


    /* ========================= */
    /* NAVBAR LINK HOVER */
    /* ========================= */

    document.querySelectorAll('.navbar nav a:not(.btn-nav)').forEach(link=>{

        link.addEventListener('mouseenter',()=>{

            anime({
                targets:link,
                translateY:-3,
                duration:250,
                easing:'easeOutQuad'
            });

        });

        link.addEventListener('mouseleave',()=>{

            anime({
                targets:link,
                translateY:0,
                duration:250,
                easing:'easeOutQuad'
            });

        });

    });


    /* ========================= */
    /* BUTTON MICRO INTERACTIONS */
    /* ========================= */

    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav').forEach(button=>{

        button.addEventListener('mouseenter',()=>{

            anime({
                targets:button,
                scale:1.03,
                duration:200,
                easing:'easeOutQuad'
            });

        });

        button.addEventListener('mouseleave',()=>{

            anime({
                targets:button,
                scale:1,
                duration:200,
                easing:'easeOutQuad'
            });

        });

    });


    /* ========================= */
    /* VIDEO AUTOPLAY WHEN VISIBLE */
    /* ========================= */

    // Targets videos with the class 'problem-video'
    const videos = document.querySelectorAll(".problem-video");

    const videoObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            const video = entry.target;

            if(entry.isIntersecting){
                // Play video if it's in the viewport
                video.play().catch(()=>{}); // Catch potential play() errors (e.g., user gesture required)
            }else{
                // Pause video if it leaves the viewport
                video.pause();
            }

        });

    },{threshold:0.4}); // Trigger when 40% of the video is visible

    videos.forEach(video=>{
        videoObserver.observe(video);
    });


    /* ========================= */
    /* SCROLL PROGRESS BAR */
    /* ========================= */

    // This function is called by main.js and also directly here for initial setup
    window.initScrollProgressBar = function(){

        const bar = document.getElementById("scroll-progress");

        if(!bar) return; // Exit if the progress bar element doesn't exist

        window.addEventListener("scroll",()=>{

            const totalHeight =
                document.documentElement.scrollHeight -
                window.innerHeight; // Total scrollable height

            const progress =
                (window.scrollY / totalHeight) * 100; // Calculate scroll percentage

            bar.style.width = progress + "%"; // Update width of the progress bar

        });

    };

    // Initialize scroll progress bar for initial setup
    initScrollProgressBar();

});