// assets/js/carousel.js

document.addEventListener("DOMContentLoaded", function(){

  const track = document.getElementById("testimonialTrack");
  const cards = document.querySelectorAll(".testimonial-card");

  if(!track || cards.length === 0){
    console.warn("Carousel not found.");
    return;
  }

  let scrollAmount = 0;
  const speed = 0.4;
  const cardWidth = 370;

  let isPaused = false;

  // 👉 AUTO SLIDE
  function autoSlide(){

    if(!isPaused){

      scrollAmount += speed;

      if(scrollAmount >= cardWidth){
        scrollAmount = 0;
        track.appendChild(track.firstElementChild);
      }

      track.style.transform = `translateX(-${scrollAmount}px)`;
    }

    requestAnimationFrame(autoSlide);
  }

  // 👉 CLICK = STOP + FOCUS
  cards.forEach(card => {

    card.addEventListener("click", () => {

      isPaused = true;

      // remove previous active
      document.querySelectorAll(".testimonial-card").forEach(c => {
        c.classList.remove("active");
      });

      // add active to clicked
      card.classList.add("active");

    });

  });

  // 👉 RESUME WHEN LEAVING SECTION
  track.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  autoSlide();

});