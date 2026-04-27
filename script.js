// Topbar hide on scroll
const topbar = document.getElementById('topbar');
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  // Scrolled class for navbar glass effect
  navbar.classList.toggle('scrolled', current > 10);

  // Hide topbar when scrolling down, show when near top
  if (current > 80) {
    topbar && topbar.classList.add('hidden');
    navbar.classList.add('topbar-gone');
  } else {
    topbar && topbar.classList.remove('hidden');
    navbar.classList.remove('topbar-gone');
  }

  lastScroll = current;
}, { passive: true });

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// Scroll to category
function scrollToCategory(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .contact-card, .cat-card, .stat').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// CSS for reveal + active link
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .nav-link.active { color: var(--white); background: rgba(255,255,255,0.06); }
  .nav-link.active::after { transform: scaleX(1); }
`;
document.head.appendChild(style);
