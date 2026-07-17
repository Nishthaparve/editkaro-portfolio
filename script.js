// ===== PRELOADER =====
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progressBar');
const percentText = document.getElementById('percentText');
let progress = 0;
const interval = setInterval(() => {
  progress += Math.floor(Math.random() * 12) + 3;
  if (progress >= 100) { progress = 100; clearInterval(interval); }
  progressBar.style.width = progress + '%';
  percentText.textContent = progress + '%';
  if (progress === 100) {
    setTimeout(() => { preloader.classList.add('hide'); }, 400);
  }
}, 120);

// ===== CURSOR =====
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => { ring.style.width = '30px'; ring.style.height = '30px'; });
document.addEventListener('mouseup', () => { ring.style.width = '42px'; ring.style.height = '42px'; });

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = progress + '%';
});

// ===== NAVBAR SCROLL & ACTIVE LINK =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinksContainer.classList.contains('open'));
});
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ===== EASTER EGG (logo click) =====
let logoClickCount = 0;
document.getElementById('logoEasterEgg').addEventListener('click', () => {
  logoClickCount++;
  if (logoClickCount >= 5) {
    alert('🎬 Editkaro — You found the Easter egg! "Creativity is intelligence having fun."');
    logoClickCount = 0;
  }
});

// ===== STATS ANIMATION (Intersection Observer) =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + (target === 98 ? '%' : target === 10 ? 'M+' : '');
      }, 25);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
statNumbers.forEach(el => statsObserver.observe(el));

// ===== SERVICES DATA =====
const services = [
  { icon: 'fa-film', name: 'Short-form Videos' },
  { icon: 'fa-video', name: 'Long-form Videos' },
  { icon: 'fa-gamepad', name: 'Gaming Videos' },
  { icon: 'fa-futbol', name: 'Football Edits' },
  { icon: 'fa-palette', name: 'Anime Videos' },
  { icon: 'fa-file-video', name: 'Documentary Editing' },
  { icon: 'fa-paint-brush', name: 'Color Grading' },
  { icon: 'fa-ad', name: 'Commercial Ads' },
  { icon: 'fa-youtube', name: 'YouTube Editing' },
  { icon: 'fa-instagram', name: 'Instagram Reels' },
  { icon: 'fa-microphone', name: 'Podcast Editing' },
  { icon: 'fa-chart-line', name: 'Social Media Marketing' }
];
const servicesGrid = document.getElementById('servicesGrid');
services.forEach(s => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `<i class="fas ${s.icon}"></i><h3>${s.name}</h3>`;
  servicesGrid.appendChild(card);
});

// ===== PORTFOLIO DATA (with images from assets folder) =====
const portfolioItems = [
  { id: 1, title: 'Viral Reel Compilation', desc: 'Instagram content creator in a neon studio', category: 'short', image: 'assets/i1.jpg' },
  { id: 2, title: 'Cinematic Documentary', desc: 'Cinematic mountain landscape captured by drone', category: 'long', image: 'assets/i2.jpg' },
  { id: 3, title: 'Gaming Montage', desc: 'Professional RGB gaming setup', category: 'gaming', image: 'assets/i3.jpg' },
  { id: 4, title: 'Football Highlights', desc: 'Football player celebrating a goal in a stadium', category: 'football', image: 'assets/i4.jpg' },
  { id: 5, title: 'Anime Opening', desc: 'Anime-style neon city wallpaper', category: 'anime', image: 'assets/i5.jpg' },
  { id: 6, title: 'Documentary Short', desc: 'Professional filmmaker using a cinema camera', category: 'doc', image: 'assets/i6.jpg' },
  { id: 7, title: 'eCommerce Ad', desc: 'Luxury perfume/product photography on a black background', category: 'ads', image: 'assets/i7.jpg' },
  { id: 8, title: 'Color Grading Showcase', desc: 'Before-and-after cinematic color grading comparison', category: 'color', image: 'assets/i8.jpg' }
];
const portfolioGrid = document.getElementById('portfolioGrid');
let currentFilter = 'all';

function renderPortfolio(filter) {
  portfolioGrid.innerHTML = '';
  const filtered = filter === 'all' ? portfolioItems : portfolioItems.filter(p => p.category === filter);
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-category', item.category);
    card.innerHTML = `
      <div class="thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="play-icon"><i class="fas fa-play-circle"></i></div>
      </div>
      <div class="info">
        <span class="badge">${item.category}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    portfolioGrid.appendChild(card);
  });
}
renderPortfolio('all');

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderPortfolio(currentFilter);
  });
});

// ===== VIDEO MODAL =====
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalInfo = document.getElementById('modalInfo');
const closeModalBtn = document.getElementById('closeModal');

function openModal(item) {
  modal.classList.add('open');
  modalVideo.src = 'https://cdn.pixabay.com/video/2022/03/14/110466-687331015_large.mp4';
  modalVideo.load();
  modalVideo.play();
  modalInfo.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p><p><small>Client: Brand X · Software: Premiere Pro · Duration: 2 weeks</small></p>`;
}
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
function closeModal() {
  modal.classList.remove('open');
  modalVideo.pause();
  modalVideo.src = '';
}

// ===== WHY CHOOSE =====
const whyData = [
  { icon: 'fa-bolt', text: 'Fast Delivery' },
  { icon: 'fa-lightbulb', text: 'Creative Experts' },
  { icon: 'fa-tag', text: 'Affordable Pricing' },
  { icon: 'fa-sync', text: 'Unlimited Revisions' },
  { icon: 'fa-star', text: 'Professional Quality' },
  { icon: 'fa-handshake', text: 'Trusted by Brands' }
];
const whyGrid = document.getElementById('whyGrid');
whyData.forEach(w => {
  const div = document.createElement('div');
  div.className = 'why-card';
  div.innerHTML = `<i class="fas ${w.icon}"></i><p>${w.text}</p>`;
  whyGrid.appendChild(div);
});

// ===== PROCESS =====
const processSteps = [
  { icon: 'fa-comment', label: 'Consultation' },
  { icon: 'fa-pencil-alt', label: 'Planning' },
  { icon: 'fa-cut', label: 'Editing' },
  { icon: 'fa-check-circle', label: 'Review' },
  { icon: 'fa-rocket', label: 'Delivery' }
];
const timeline = document.getElementById('processTimeline');
processSteps.forEach((step, idx) => {
  const div = document.createElement('div');
  div.className = 'process-step';
  div.innerHTML = `<div class="step-icon"><i class="fas ${step.icon}"></i></div><span>${idx+1}. ${step.label}</span>`;
  timeline.appendChild(div);
});

// ===== TESTIMONIALS =====
const testimonials = [
  { name: 'Aarav Singh', role: 'Founder, BrandX', text: 'Editkaro transformed our social media presence. Incredible quality!', stars: 5 },
  { name: 'Priya Sharma', role: 'Content Lead, YT Studio', text: 'The color grading and storytelling is top-tier. Highly recommend.', stars: 5 },
  { name: 'Rahul Verma', role: 'Marketing Head, GameOn', text: 'They delivered viral gaming edits that boosted our engagement 3x.', stars: 5 }
];
const slider = document.getElementById('testimonialSlider');
testimonials.forEach(t => {
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  const stars = '★'.repeat(t.stars) + '☆'.repeat(5-t.stars);
  card.innerHTML = `<p>"${t.text}"</p><div class="stars">${stars}</div><h4>${t.name}</h4><div class="role">${t.role}</div>`;
  slider.appendChild(card);
});

// ===== COOKIE CONSENT =====
const cookieConsent = document.getElementById('cookieConsent');
document.getElementById('cookieAccept').addEventListener('click', () => {
  cookieConsent.style.display = 'none';
  document.cookie = "cookieConsent=true; max-age=31536000";
});
if (document.cookie.includes('cookieConsent=true')) cookieConsent.style.display = 'none';

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM SUBMIT =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('🎉 Thank you! We will get back to you within 24 hours.');
  e.target.reset();
});

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(el);
});

// ===== TYPING EFFECT (hero) =====
const heroTitle = document.getElementById('heroTitle');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;
function typeEffect() {
  if (charIndex < originalText.length) {
    heroTitle.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 50);
  }
}
setTimeout(typeEffect, 800);