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

// Fade-in animation on scroll
function addFadeInClasses() {
  document.querySelectorAll('.stats-bar-item, .service-card, .fleet-duo-card, .feature-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
  });
}

addFadeInClasses();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Stagger animation delay for grid items
document.querySelectorAll('.stats-bar-grid, .services-grid, .fleet-duo, .features-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});
