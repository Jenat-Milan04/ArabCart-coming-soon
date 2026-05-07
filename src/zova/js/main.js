/* ============================================================
   ZOVA E-COMMERCE — main.js
   ============================================================ */

/* ---------- NAV scroll effect ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- Particles ---------- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    Object.assign(p.style, {
      width: size + 'px', height: size + 'px',
      left: Math.random() * 100 + '%',
      animationDuration: (Math.random() * 14 + 10) + 's',
      animationDelay: -(Math.random() * 14) + 's'
    });
    container.appendChild(p);
  }
}

/* ---------- Countdown timer ---------- */
function initCountdown() {
  const launch = new Date();
  launch.setDate(launch.getDate() + 47);
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = launch - new Date();
    if (diff <= 0) return;
    if (els.d) els.d.textContent = pad(Math.floor(diff / 86400000));
    if (els.h) els.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    if (els.m) els.m.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (els.s) els.s.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick(); setInterval(tick, 1000);
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}
window.showToast = showToast; // expose globally

/* ---------- Notify form ---------- */
function initNotify() {
  const btn = document.getElementById('notify-btn');
  const inp = document.getElementById('email-input');
  if (!btn || !inp) return;
  btn.addEventListener('click', () => {
    const v = inp.value.trim();
    if (!v || !v.includes('@') || !v.includes('.')) {
      showToast('⚠️ Please enter a valid email address!'); return;
    }
    inp.value = '';
    showToast('🎉 You\'re on the list! Exclusive launch deal incoming.');
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 75);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(el => obs.observe(el));
}

/* ---------- Hero mouse parallax ---------- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const visual = document.querySelector('.hero-visual');
  if (!hero || !visual) return;
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    visual.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 4}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    visual.style.transform = '';
  });
}

/* ---------- 3-D Bottle drag rotation (viewer section) ---------- */
function initBottleDrag() {
  const bottle = document.getElementById('viewer-bottle');
  if (!bottle) return;

  let dragging = false, startX = 0, startY = 0, rotY = 0, rotX = 0;

  bottle.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX; startY = e.clientY;
    bottle.style.animationPlayState = 'paused';
    bottle.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotY += dx * 0.6; rotX -= dy * 0.3;
    rotX = Math.max(-35, Math.min(35, rotX));
    bottle.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    startX = e.clientX; startY = e.clientY;
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    bottle.style.cursor = 'grab';
  });

  // Touch
  bottle.addEventListener('touchstart', e => {
    dragging = true; startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    bottle.style.animationPlayState = 'paused';
  });
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    rotY += dx * 0.6; rotX -= dy * 0.3;
    rotX = Math.max(-35, Math.min(35, rotX));
    bottle.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
  });
  window.addEventListener('touchend', () => { dragging = false; });
}

/* ---------- Scent selector (viewer) ---------- */
const scentData = {
  noir:  { label: 'NOIR — Deep & Mysterious', src: 'images/perfume-noir.png',  glow: 'rgba(80,50,20,.45)' },
  rose:  { label: 'ROSE — Floral & Elegant',  src: 'images/perfume-rose.png',  glow: 'rgba(180,60,80,.4)' },
  ocean: { label: 'OCEAN — Fresh & Bold',     src: 'images/perfume-ocean.png', glow: 'rgba(30,90,150,.45)' },
  gold:  { label: 'GOLD — Warm & Luxurious',  src: 'images/perfume-gold.png',  glow: 'rgba(169,111,68,.55)' },
  oud:   { label: 'OUD — Rich & Smoky',       src: 'images/perfume-oud.png',   glow: 'rgba(100,50,10,.5)' }
};

function initScentSelector() {
  const btns = document.querySelectorAll('.scent-btn');
  const img   = document.getElementById('viewer-img');
  const lbl   = document.getElementById('viewer-label-text');
  const glow  = document.getElementById('viewer-glow');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.scent;
      const d = scentData[key]; if (!d) return;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (img)  { img.style.opacity = 0; setTimeout(() => { img.src = d.src; img.style.opacity = 1; }, 300); }
      if (lbl)  lbl.textContent = d.label;
      if (glow) glow.style.background = `radial-gradient(circle, ${d.glow}, transparent 70%)`;
    });
  });
}

/* ---------- Smooth scroll nav links ---------- */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ---------- "Coming soon" button handler ---------- */
window.comingSoon = function(name) {
  showToast(`🚀 "${name}" — available at launch! Sign up to be first.`);
};

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCountdown();
  initNotify();
  initReveal();
  initHeroParallax();
  initBottleDrag();
  initScentSelector();
  initSmoothLinks();
});
