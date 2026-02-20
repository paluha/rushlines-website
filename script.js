// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Stat counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (target >= 1000) {
        counter.textContent = current.toLocaleString() + '+';
      } else if (counter.closest('.stat-card') && counter.dataset.target === '98') {
        counter.textContent = current + '%';
      } else {
        counter.textContent = current + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.dataset.animated = 'true';
      }
    }

    requestAnimationFrame(update);
  });
}

// Fade-in animation on scroll
function addFadeInClasses() {
  document.querySelectorAll('.stat-card, .service-card, .fleet-card, .feature-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
  });
}

addFadeInClasses();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains('stat-card')) {
        animateCounters();
      }
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Stagger animation delay for grid items
document.querySelectorAll('.stats-grid, .services-grid, .fleet-grid, .features-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});
