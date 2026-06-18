// ── Mobile nav ──────────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const nav    = document.getElementById('main-nav');

function closeNav() {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  toggle.classList.remove('is-open');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
    toggle.classList.toggle('is-open', !open);
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) closeNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// ── Sticky header shadow ─────────────────────────────────────
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Scroll reveal ────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}
