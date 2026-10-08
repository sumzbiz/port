/* ── PORTFOLIO JS — SUMAN N ── */

/* ───── CURSOR ───── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-category, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

/* ───── NAVBAR SCROLL ───── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ───── HAMBURGER ───── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ───── INTERSECTION OBSERVER (fade-in) ───── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // stagger children in grids
      entry.target.querySelectorAll('[data-aos]').forEach((child, i) => {
        child.style.transitionDelay = (i * 0.1) + 's';
        child.classList.add('in-view');
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

/* Also observe section children containers */
document.querySelectorAll('.skills-grid, .projects-grid, .certs-grid, .contact-links, .timeline').forEach(container => {
  observer.observe(container);
});

/* ───── COUNTER ANIMATION ───── */
function animateCounter(el, target) {
  let current = 0;
  const step  = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 35);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.about-stats');
if (statsGrid) statsObs.observe(statsGrid);

/* ───── TERMINAL TYPER ───── */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text) {
  el.textContent = '';
  for (const char of text) {
    el.textContent += char;
    await sleep(38 + Math.random() * 30);
  }
}

async function runTerminal() {
  await sleep(1200);
  const body   = document.getElementById('terminalBody');
  if (!body) return;

  const lines   = body.querySelectorAll('.t-line');
  const outputs = body.querySelectorAll('.t-output');
  const cursorEl = body.querySelector('.t-cursor');

  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.remove('hidden');
    const cmd = lines[i].querySelector('.t-cmd');
    const text = cmd.getAttribute('data-text');
    await typeText(cmd, text);
    await sleep(280);
    outputs[i].classList.remove('hidden');
    await sleep(420);
  }
  cursorEl.classList.remove('hidden');
}

const terminalObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    runTerminal();
    terminalObserver.disconnect();
  }
}, { threshold: 0.3 });

const termCard = document.querySelector('.terminal-card');
if (termCard) terminalObserver.observe(termCard);

/* ───── ACTIVE NAV LINK ───── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

/* ───── PARALLAX on hero photo ───── */
const heroPhoto = document.querySelector('.photo-frame');
if (heroPhoto) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroPhoto.style.transform = `translateY(${scrollY * 0.08}px)`;
  }, { passive: true });
}

/* ───── HERO GRID MOUSE PARALLAX ───── */
const heroGrid = document.querySelector('.hero-grid-lines');
if (heroGrid) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroGrid.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ───── TECH TAG hover ───── */
document.querySelectorAll('.tech-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.borderColor = 'var(--accent)';
    tag.style.color = 'var(--accent)';
    tag.style.background = 'rgba(0,212,255,0.08)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.borderColor = '';
    tag.style.color = '';
    tag.style.background = '';
  });
});

/* ───── SMOOTH SCROLL polyfill for older safari ───── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ───── REVEAL stagger for timeline ───── */
const timelineObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.timeline-item').forEach((item, i) => {
        item.style.opacity    = '0';
        item.style.transform  = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ${i * 0.12}s ease, transform 0.5s ${i * 0.12}s ease`;
        requestAnimationFrame(() => {
          item.style.opacity   = '1';
          item.style.transform = 'translateX(0)';
        });
      });
      timelineObs.disconnect();
    }
  });
}, { threshold: 0.1 });

const timeline = document.querySelector('.timeline');
if (timeline) timelineObs.observe(timeline);

/* ───── PAGE LOAD ───── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

console.log('%c🚀 Built by Suman N — Cloud Engineer', 'color:#00d4ff;font-family:monospace;font-size:14px');
