/* DABY COUNT-UP  v1  (2026-09-24)
   ONE job: the three numbers in the hero of /metodo/ count up from 0.
       14        anos de experiência
       1.500     profissionais atendidos
       7.000     seguidores no LinkedIn

   - Uses Motion (https://motion.dev, MIT) when it is loaded; if Motion is missing
     it uses a small built-in fallback, so the counters still work.
   - The text ALWAYS ends exactly as written in the HTML (same numbers, same dots).
   - Visitors who ask their system for "reduced motion" just see the final numbers.
   - Open the browser console (F12): you should see "[daby-count] ... ready".

   ---- SETTINGS (change here) ------------------------------------------- */
var DABY_COUNT = {
  selector: '.detail-hero-stat strong', // which elements count
  duration: 2.2,                        // seconds each number takes
  stagger: 0.18,                        // seconds between one number and the next
  startDelay: 0.35,                     // seconds before the first number starts
  visibleAmount: 0.6                    // 0.6 = start when 60% of the block is on screen
};
/* ---------------------------------------------------------------------- */
(function () {
  'use strict';
  var C = window.DABY_COUNT || DABY_COUNT;
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function release() { root.classList.remove('dc'); }

  var els = Array.prototype.slice.call(document.querySelectorAll(C.selector));
  if (!els.length || reduced) { release(); return; }

  // "1.500" -> 1500   |   prefix/suffix (e.g. "+", "%") are kept
  var items = els.map(function (el) {
    var text = el.textContent.trim();
    var m = text.match(/^(\D*)([\d.,]+)(\D*)$/);
    if (!m) return null;
    var value = parseInt(m[2].replace(/[.,]/g, ''), 10);
    if (!isFinite(value)) return null;
    return { el: el, text: text, pre: m[1], suf: m[3], value: value };
  }).filter(Boolean);
  if (!items.length) { release(); return; }

  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); } // pt-BR dots

  // keep the layout still while counting: reserve the final width, equal-width digits
  items.forEach(function (it) {
    var w = it.el.getBoundingClientRect().width;
    it.el.style.display = 'inline-block';
    it.el.style.minWidth = Math.ceil(w) + 'px';
    it.el.style.fontVariantNumeric = 'tabular-nums';
    it.el.style.textAlign = 'left';
    it.el.textContent = it.pre + '0' + it.suf;
  });
  release(); // numbers now show 0 -> the head guard can step aside

  function setValue(it, n) { it.el.textContent = it.pre + fmt(n) + it.suf; }
  function finish(it) {
    it.el.textContent = it.text; // exactly the original text
    ['display', 'min-width', 'font-variant-numeric', 'text-align'].forEach(function (p) { it.el.style.removeProperty(p); });
  }

  function countWithMotion(it, delay) {
    window.Motion.animate(0, it.value, {
      duration: C.duration, delay: delay, ease: [0.22, 1, 0.36, 1],
      onUpdate: function (v) { setValue(it, v); },
      onComplete: function () { finish(it); }
    });
  }
  function countFallback(it, delay) {           // no Motion? plain JavaScript version
    setTimeout(function () {
      var t0 = null;
      (function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / (C.duration * 1000), 1);
        setValue(it, it.value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step); else finish(it);
      })(performance.now());
    }, delay * 1000);
  }
  var useMotion = !!(window.Motion && window.Motion.animate);

  function start() {
    items.forEach(function (it, i) {
      var delay = C.startDelay + i * C.stagger;
      if (useMotion) countWithMotion(it, delay); else countFallback(it, delay);
    });
  }

  var started = false, box = els[0].closest('.detail-hero-stats') || els[0];
  function go() { if (started) return; started = true; start(); }
  if (useMotion && window.Motion.inView) window.Motion.inView(box, go, { amount: C.visibleAmount });
  else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { o.disconnect(); go(); } }, { threshold: C.visibleAmount }).observe(box);
  } else go();

  if (window.console) console.log('[daby-count] ' + items.length + ' counters ready (' + (useMotion ? 'Motion' : 'fallback') + ')');
})();
