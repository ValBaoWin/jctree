// Floating WhatsApp button (desktop) + sticky call bar (mobile)
document.body.insertAdjacentHTML('beforeend', `
  <a href="https://wa.me/14088586123" target="_blank" rel="noopener" class="float-wa" aria-label="Message on WhatsApp">
    <div class="float-wa-pulse"></div>
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.852L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.376l-.36-.214-3.727.976.994-3.634-.235-.374A9.784 9.784 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/></svg>
  </a>
  <div class="mobile-cta-bar">
    <a href="tel:4088586123" class="mobile-cta-call">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 010 2.19 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
      Call 408-858-6123
    </a>
    <a href="https://wa.me/14088586123" target="_blank" rel="noopener" class="mobile-cta-wa" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.852L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.376l-.36-.214-3.727.976.994-3.634-.235-.374A9.784 9.784 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/></svg>
    </a>
  </div>
`);

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

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

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
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const required = ['f-name','f-phone','f-email','f-svc'].map(id => document.getElementById(id)).filter(Boolean);
    const allOk = required.map(validateField).every(Boolean);
    if (!allOk) return;

    const submitBtn = form.querySelector('.fsub');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        fSuccess.classList.add('show');
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Request';
        alert('Something went wrong. Please call us at 408-858-6123.');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Request';
      alert('Something went wrong. Please call us at 408-858-6123.');
    }
  });
}
