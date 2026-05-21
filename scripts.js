// NAV scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60), {passive:true});
}

// Hamburger
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mobMenu');
if (hbg && mob) {
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
    hbg.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Active nav link based on current page
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mob-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === 'index.html' && href === 'index.html') || (page === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Fade-up on scroll
const fuObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); fuObs.unobserve(e.target); } });
}, {threshold:.08, rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.fu').forEach(el => fuObs.observe(el));

// Counter animation
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.t, dur = 1800;
    let cur = 0;
    const step = target / (dur / 16);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur).toLocaleString();
      if (cur >= target) clearInterval(timer);
    }, 16);
    cntObs.unobserve(el);
  });
}, {threshold:.5});
document.querySelectorAll('.cnt').forEach(el => cntObs.observe(el));

// Reviews carousel drag-to-scroll + buttons
const track = document.querySelector('.reviews-track');
if (track) {
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => {
    isDown = true; track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mousemove', e => {
    if (!isDown) return; e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
  document.getElementById('revPrev')?.addEventListener('click', () => {
    track.scrollBy({left: -360, behavior:'smooth'});
  });
  document.getElementById('revNext')?.addEventListener('click', () => {
    track.scrollBy({left: 360, behavior:'smooth'});
  });
}

// Contact form
const form = document.getElementById('cform');
const fSuccess = document.getElementById('fSuccess');
if (form && fSuccess) {
  function validateField(f) {
    const g = f.closest('.fg');
    let ok = true;
    if (f.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
    else if (f.type === 'tel') ok = f.value.replace(/\D/g,'').length >= 10;
    else if (f.tagName === 'SELECT') ok = f.value !== '';
    else ok = f.value.trim().length > 1;
    g.classList.toggle('err', !ok);
    return ok;
  }
  ['f-name','f-phone','f-email','f-svc'].forEach(id => {
    const f = document.getElementById(id);
    if (!f) return;
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => { if (f.closest('.fg').classList.contains('err')) validateField(f); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const required = ['f-name','f-phone','f-email','f-svc'].map(id => document.getElementById(id)).filter(Boolean);
    const allOk = required.map(validateField).every(Boolean);
    if (!allOk) return;
    const name  = document.getElementById('f-name')?.value.trim();
    const phone = document.getElementById('f-phone')?.value.trim();
    const email = document.getElementById('f-email')?.value.trim();
    const svcEl = document.getElementById('f-svc');
    const svc   = svcEl?.options[svcEl.selectedIndex]?.text;
    const msg   = document.getElementById('f-msg')?.value.trim();
    const subject = encodeURIComponent('Website Inquiry — ' + svc);
    const body = encodeURIComponent(
      'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\nService: ' + svc +
      (msg ? '\n\nMessage:\n' + msg : '')
    );
    window.location.href = 'mailto:Jctree1990@yahoo.com?subject=' + subject + '&body=' + body;
    form.style.display = 'none';
    fSuccess.classList.add('show');
  });
}
