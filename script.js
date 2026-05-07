/* ============================================================
   FRL — site interactions
   ============================================================ */

(function () {
  'use strict';

  // ---- Sticky nav: add class on scroll
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  function handleScroll() {
    const y = window.scrollY;
    if (y > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastScroll = y;
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });
    // Close menu on link click
    document.querySelectorAll('.nav__links a, .nav__cta').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('menu-open');
      });
    });
  }

  // ---- Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger reveals within a group by their DOM index inside the parent
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.08) + 's';
          }
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ---- Count-up animation for stat numbers
  // Reads data-count, data-prefix, data-suffix; preserves the visible text
  // until the element is in view, then animates.
  const formatNumber = (n) => {
    // Keep small numbers as integers, no thousands separator under 1000
    if (n < 1000) return String(Math.round(n));
    return Math.round(n).toLocaleString('en-US');
  };

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      el.textContent = prefix + formatNumber(current) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + formatNumber(target) + suffix;
    };
    requestAnimationFrame(tick);
  };

  const statNums = document.querySelectorAll('.stat__num[data-count]');
  if ('IntersectionObserver' in window) {
    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => ioCount.observe(el));
  }

  // ---- Active section highlight in nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  if ('IntersectionObserver' in window && sections.length) {
    const ioActive = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            if (a.getAttribute('href') === '#' + id) a.classList.add('is-active');
            else a.classList.remove('is-active');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => ioActive.observe(s));
  }
})();
