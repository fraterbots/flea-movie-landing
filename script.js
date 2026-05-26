// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.card, .step, .portfolio-item, .testimonial, .diff-stat-card, .diff-list li'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Contact form ──
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mensagem enviada!';
  btn.style.background = '#16a34a';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 4000);
});

// ── Portfolio play button ripple ──
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const play = item.querySelector('.portfolio-play');
    play.style.transform = 'scale(0.9)';
    setTimeout(() => play.style.transform = '', 150);
  });
});

// ── Smooth counter animation for hero stats ──
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const nums = entry.target.querySelectorAll('.stat-num');
    nums.forEach(num => {
      const text = num.textContent;
      if (text.startsWith('+')) animateCounter(num, parseInt(text.slice(1)), '+');
      else if (text.endsWith('%')) animateCounter(num, parseInt(text), '%');
      else if (text.endsWith('h')) animateCounter(num, parseInt(text), 'h');
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
