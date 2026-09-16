(function () {
  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav    = document.getElementById('site-nav');

  /* ── Mobile navigation ──────────────────────────────── */
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    /* Close on link tap */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ── Header scroll state ────────────────────────────── */
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal on scroll ───────────────────────────────── */
  var reveals = document.querySelectorAll(
    '.hero-text, .hero-visual, .intro, .section-head, ' +
    '.collection-block, .product-card, .lookbook-item, ' +
    '.spec-text, .spec-visual, .testimonial, ' +
    '.showroom-text, .showroom-visual, .contact-inner'
  );

  reveals.forEach(function (el) { el.classList.add('reveal'); });

  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          /* tiny stagger for grid items */
          var delay = Math.min(i * 60, 240);
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    /* no IntersectionObserver — just show everything */
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
