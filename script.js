// Topbar hide on scroll
const topbar = document.getElementById('topbar');
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  navbar.classList.toggle('scrolled', current > 10);
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
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
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
}, { threshold: 0.08 });

document.querySelectorAll('.pcard, .contact-card, .cat-card, .stat').forEach(el => {
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

// ══════════════════════════════════════════════════════
// MODAL DE PRODUCTO → WHATSAPP
// ══════════════════════════════════════════════════════
const modal        = document.getElementById('productModal');
const modalImg     = document.getElementById('modalImg');
const modalBrand   = document.getElementById('modalBrand');
const modalName    = document.getElementById('modalName');
const modalPrice   = document.getElementById('modalPrice');
const modalWaBtn   = document.getElementById('modalWaBtn');
const modalClose   = document.getElementById('modalClose');
const WA_NUMBER    = '56912345678';

function openModal(card) {
  const img   = card.dataset.img   || '';
  const brand = card.dataset.brand || '';
  const name  = card.dataset.name  || '';
  const price = card.dataset.price || '';
  const waMsg = card.dataset.wa    || `Hola! Me interesa: ${name} (${brand}) - ${price}`;

  // Populate modal
  modalImg.src           = img;
  modalImg.alt           = name;
  modalBrand.textContent = brand;
  modalName.textContent  = name;

  // Price with IVA support
  modalPrice.innerHTML = price.includes('+IVA')
    ? price.replace('+IVA', '<small> +IVA</small>')
    : price;

  // WhatsApp link
  const encoded = encodeURIComponent(waMsg);
  modalWaBtn.href = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  // Close only if clicking overlay (not the card itself) or called directly
  if (e && e.target !== modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Reset image after animation
  setTimeout(() => { modalImg.src = ''; }, 350);
}

// Close button
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { modalImg.src = ''; }, 350);
});

// Click outside card
modal.addEventListener('click', closeModal);

// ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 350);
  }
});
