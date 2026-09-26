/* DABY SITE RUNTIME v2026.09.21
   Dependency-free. Restores every interactive control of the static pages
   (mobile menu, WhatsApp form, FAQ, recommendations carousel, splash, progress bar)
   without changing any wording. Safe to load with `defer` on every page. */
(function () {
  'use strict';
  if (window.__DABY_SITE__) return;
  window.__DABY_SITE__ = true;

  var WA = '5511986108003';
  var doc = document;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var path = location.pathname.replace(/\/+$/, '') || '/';

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function wa(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function track(name, data) { try { if (window.umami && window.umami.track) window.umami.track(name, data || {}); } catch (e) {} }

  var ICON = {
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    chev: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
    chat: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  /* ---------- 1. Mobile menu ---------- */
  function initMenu() {
    var header = $('header.topbar');
    var btn = header && $('.menu-toggle', header);
    if (!header || !btn || btn.__dabyBound) return;
    btn.__dabyBound = true;
    btn.innerHTML = ICON.menu;
    var links = $$('.desktop-nav a', header).map(function (a) { return { href: a.getAttribute('href'), label: a.textContent.trim() }; });
    var nav = null;
    function close() {
      if (nav && nav.parentNode) nav.parentNode.removeChild(nav);
      nav = null;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menu');
      btn.innerHTML = ICON.menu;
      header.classList.remove('menu-open');
    }
    function open() {
      nav = doc.createElement('nav');
      nav.className = 'mobile-nav';
      nav.setAttribute('aria-label', 'Navegação mobile');
      nav.innerHTML = links.map(function (l) { return '<a href="' + l.href + '">' + l.label + ICON.chev + '</a>'; }).join('') +
        '<a class="mobile-contact" href="' + wa('Olá, vim pelo site da Daby e gostaria de conversar sobre inglês estratégico.') + '" target="_blank" rel="noopener noreferrer">Falar no WhatsApp ' + ICON.chat + '</a>';
      header.appendChild(nav);
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Fechar menu');
      btn.innerHTML = ICON.close;
      header.classList.add('menu-open');
      $$('a', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          if (a.classList.contains('mobile-contact')) track('whatsapp_cta_click', { placement: 'mobile_menu', journey: 'general' });
          close();
        });
      });
    }
    btn.addEventListener('click', function () { nav ? close() : open(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav) { close(); btn.focus(); } });
    window.addEventListener('resize', function () { if (nav && window.innerWidth > 900) close(); });
  }

  /* ---------- 2. WhatsApp contact form ---------- */
  function initForms() {
    $$('form.contact-form').forEach(function (form) {
      if (form.__dabyBound) return;
      form.__dabyBound = true;
      var fields = $$('input, textarea', form);
      fields.forEach(function (f, i) { if (!f.name) f.name = ['nome', 'cargo', 'contexto'][i] || 'campo' + i; });
      var corporate = path.indexOf('/corporate') === 0;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (fields[0] && fields[0].value || '').trim();
        var role = (fields[1] && fields[1].value || '').trim();
        var ctx = (fields[2] && fields[2].value || '').trim();
        var goal = corporate ? 'uma solução corporativa' : 'a formação individual';
        var msg = 'Olá, sou ' + name + '. ' + (role ? 'Atuo como ' + role + '. ' : '') +
          'Vim pelo site da Daby e gostaria de conversar sobre ' + goal + '.' + (ctx ? ' Meu principal contexto é: ' + ctx + '.' : '');
        track('whatsapp_cta_click', { placement: 'contact_form', journey: corporate ? 'corporate' : 'individual' });
        track('whatsapp_form_submit', { context: corporate ? 'corporate' : 'individual', has_role: !!role, has_context: !!ctx });
        if (corporate) track('corporate_inquiry_submit', { form: 'contact_form' });
        var w = window.open(wa(msg), '_blank', 'noopener,noreferrer');
        if (!w) location.href = wa(msg);
        if (!$('.form-success', form)) {
          var p = doc.createElement('p');
          p.className = 'form-success';
          p.setAttribute('role', 'status');
          p.innerHTML = ICON.check + ' Abrimos uma conversa com o seu contexto preenchido.';
          form.appendChild(p);
        }
      });
    });
    // analytics for plain WhatsApp links
    doc.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
      if (!a || a.classList.contains('mobile-contact')) return;
      var place = a.closest('header') ? 'header' : (a.closest('.floating-contacts') ? 'floating' : (a.closest('footer') ? 'footer' : 'page'));
      track('whatsapp_cta_click', { placement: place, journey: path.indexOf('/corporate') === 0 ? 'corporate' : 'general' });
    });
  }

  /* ---------- 3. FAQ accordion ---------- */
  function initFaq() {
    $$('.faq-item').forEach(function (item, i) {
      var btn = $('button', item), ans = $('p', item);
      if (!btn || !ans || btn.__dabyBound) return;
      btn.__dabyBound = true;
      var id = 'faq-a-' + (i + 1);
      ans.id = ans.id || id;
      btn.setAttribute('aria-controls', ans.id);
      function sync(open) {
        item.classList.toggle('faq-open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (open) ans.removeAttribute('hidden'); else ans.setAttribute('hidden', '');
      }
      sync(item.classList.contains('faq-open'));
      btn.addEventListener('click', function () { sync(btn.getAttribute('aria-expanded') !== 'true'); });
    });
  }

  /* ---------- 4. Recommendations carousel ---------- */
  function initCarousel() {
    $$('.recommendation-carousel').forEach(function (root) {
      if (root.__dabyBound) return;
      var track_ = $('.recommendation-track', root);
      var slides = $$('.recommendation-slide', root);
      if (!track_ || slides.length < 2) return;
      root.__dabyBound = true;
      var section = root.closest('section') || root.parentNode;
      var dots = $$('button[aria-label^="Mostrar recomendação"]', section);
      var prev = $('button[aria-label="Recomendação anterior"]', section);
      var next = $('button[aria-label="Próxima recomendação"]', section);
      var idx = 0, timer = null;
      track_.style.transition = reduced ? 'none' : 'transform .55s cubic-bezier(.22,1,.36,1)';
      track_.style.willChange = 'transform';
      function go(n) {
        idx = (n + slides.length) % slides.length;
        track_.style.transform = 'translate3d(' + (-slides[idx].offsetLeft) + 'px,0,0)';
        slides.forEach(function (s, i) { s.setAttribute('aria-hidden', String(i !== idx)); s.setAttribute('aria-label', (i + 1) + ' / ' + slides.length); });
        dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === idx)); });
      }
      function restart() {
        if (reduced) return;
        clearInterval(timer);
        timer = setInterval(function () { if (!doc.hidden) go(idx + 1); }, 9000);
      }
      if (prev) prev.addEventListener('click', function () { go(idx - 1); restart(); });
      if (next) next.addEventListener('click', function () { go(idx + 1); restart(); });
      dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); restart(); }); });
      var x0 = null;
      root.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
      root.addEventListener('pointerup', function (e) {
        if (x0 === null) return; var dx = e.clientX - x0; x0 = null;
        if (Math.abs(dx) > 48) { go(idx + (dx < 0 ? 1 : -1)); restart(); }
      });
      root.addEventListener('mouseenter', function () { clearInterval(timer); });
      root.addEventListener('mouseleave', restart);
      root.addEventListener('focusin', function () { clearInterval(timer); });
      window.addEventListener('resize', function () { track_.style.transition = 'none'; go(idx); requestAnimationFrame(function () { track_.style.transition = reduced ? 'none' : 'transform .55s cubic-bezier(.22,1,.36,1)'; }); });
      go(0);
      restart();
    });
  }

  /* ---------- 5. Signature splash (home, first visit of the session only) ---------- */
  function initSplash() {
    var p = $('#daby-signature-preloader');
    if (!p) return;
    var hide = function () {
      p.classList.add('is-hidden');
      setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 700);
    };
    if (doc.documentElement.classList.contains('vdaby-returning') || reduced) { if (p.parentNode) p.parentNode.removeChild(p); return; }
    setTimeout(hide, 1500);
    window.addEventListener('pageshow', function (e) { if (e.persisted) hide(); });
  }

  /* ---------- 6. Reading progress + header state ---------- */
  function initProgress() {
    if ($('.vdaby-progress')) return;
    var bar = doc.createElement('div');
    bar.className = 'vdaby-progress';
    bar.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(bar);
    var ticking = false;
    function update() {
      var d = doc.documentElement, max = d.scrollHeight - d.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (window.pageYOffset / max) * 100) : 0) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function init() {
    initMenu(); initForms(); initFaq(); initCarousel(); initSplash(); initProgress();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('load', function () { initCarousel(); });
})();
