/* DABY FLOW REVEAL  v1  (2026-09-24)
   ONE job: the 6 steps of the Professional Communication Journey
   (Contexto -> Objetivo -> Blocos -> Resposta -> Simulacao -> Performance)
   fade + slide up, one after another, when the section scrolls into view.

   - Uses Motion (https://motion.dev, MIT) when it is loaded; if Motion is
     missing it uses a small built-in fallback (CSS transition), so the
     reveal still works.
   - Visitors who ask their system for "reduced motion" just see the steps,
     already in place, no animation.
   - Open the browser console (F12): you should see "[daby-flow] ... ready".

   ---- SETTINGS (change here) ------------------------------------------- */
var DABY_FLOW = {
  selector: '.vdaby-flow-step',  // which elements reveal
  duration: 0.5,                 // seconds each step takes to fade/slide in
  stagger: 0.12,                 // seconds between one step and the next
  distance: 18,                  // px the step starts below its final position
  visibleAmount: 0.4              // 0.4 = start when 40% of the block is on screen
};
/* ---------------------------------------------------------------------- */
(function () {
  'use strict';
  var C = window.DABY_FLOW || DABY_FLOW;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var steps = Array.prototype.slice.call(document.querySelectorAll(C.selector));
  if (!steps.length || reduced) { return; }

  // start hidden + offset, final CSS (opacity/transform) is written by JS only
  steps.forEach(function (s) {
    s.style.opacity = '0';
    s.style.transform = 'translateY(' + C.distance + 'px)';
  });

  function clear(s) {
    s.style.removeProperty('opacity');
    s.style.removeProperty('transform');
  }

  function revealWithMotion() {
    steps.forEach(function (s, i) {
      window.Motion.animate(
        s,
        { opacity: [0, 1], y: [C.distance, 0] },
        { duration: C.duration, delay: i * C.stagger, ease: [0.22, 1, 0.36, 1] }
      ).finished.then(function () { clear(s); });
    });
  }

  function revealFallback() {          // no Motion? plain CSS transition version
    steps.forEach(function (s, i) {
      s.style.transition = 'opacity ' + C.duration + 's cubic-bezier(.22,1,.36,1) ' + (i * C.stagger) + 's, transform ' + C.duration + 's cubic-bezier(.22,1,.36,1) ' + (i * C.stagger) + 's';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          s.style.opacity = '1';
          s.style.transform = 'none';
        });
      });
      setTimeout(function () { s.style.removeProperty('transition'); }, (C.duration + i * C.stagger) * 1000 + 60);
    });
  }

  var useMotion = !!(window.Motion && window.Motion.animate);
  var started = false, box = steps[0].closest('.vdaby-flow') || steps[0];

  function go() {
    if (started) return;
    started = true;
    if (useMotion) revealWithMotion(); else revealFallback();
  }

  if (useMotion && window.Motion.inView) {
    window.Motion.inView(box, go, { amount: C.visibleAmount });
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { o.disconnect(); go(); } }, { threshold: C.visibleAmount }).observe(box);
  } else {
    go();
  }

  if (window.console) console.log('[daby-flow] ' + steps.length + ' steps ready (' + (useMotion ? 'Motion' : 'fallback') + ')');
})();
