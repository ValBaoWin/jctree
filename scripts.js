
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60), {passive:true});
}

const hamburgerBtn = document.getElementById('hbg');
const mobileMenu = document.getElementById('mobMenu');
if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(link => link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mob-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); fadeObserver.unobserve(e.target); } });
}, {threshold:.08, rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.fu').forEach(el => fadeObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.t, duration = 1800;
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
    counterObserver.unobserve(el);
  });
}, {threshold:.5});
document.querySelectorAll('.cnt').forEach(el => counterObserver.observe(el));

const reviewsTrack = document.querySelector('.reviews-track');
if (reviewsTrack) {
  let isDragging = false, startX, scrollLeft;
  const stopDrag = () => { isDragging = false; reviewsTrack.classList.remove('grabbing'); };
  reviewsTrack.addEventListener('mousedown', e => {
    isDragging = true; reviewsTrack.classList.add('grabbing');
    startX = e.pageX - reviewsTrack.offsetLeft; scrollLeft = reviewsTrack.scrollLeft;
  });
  reviewsTrack.addEventListener('mouseleave', stopDrag);
  reviewsTrack.addEventListener('mouseup', stopDrag);
  reviewsTrack.addEventListener('mousemove', e => {
    if (!isDragging) return; e.preventDefault();
    reviewsTrack.scrollLeft = scrollLeft - (e.pageX - reviewsTrack.offsetLeft - startX) * 1.5;
  });
  document.getElementById('revPrev')?.addEventListener('click', () => reviewsTrack.scrollBy({left:-360, behavior:'smooth'}));
  document.getElementById('revNext')?.addEventListener('click', () => reviewsTrack.scrollBy({left:360, behavior:'smooth'}));
}

// Hero reviews auto-advance
const heroRevItems = document.querySelectorAll('#heroRevViewport .hero-rev-item');
const heroRevBar = document.getElementById('heroRevBar');
const heroRevCount = document.getElementById('heroRevCount');
if (heroRevItems.length && heroRevBar) {
  let current = 0;
  let timeoutId;
  const DURATION = 5000;

  function goTo(idx) {
    heroRevItems[current].classList.remove('active');
    current = ((idx % heroRevItems.length) + heroRevItems.length) % heroRevItems.length;
    heroRevItems[current].classList.add('active');
    if (heroRevCount) heroRevCount.textContent = (current + 1) + ' / ' + heroRevItems.length;
    resetBar();
    scheduleNext();
  }

  function resetBar() {
    heroRevBar.style.transition = 'none';
    heroRevBar.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroRevBar.style.transition = 'width ' + DURATION + 'ms linear';
      heroRevBar.style.width = '100%';
    }));
  }

  function scheduleNext() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => goTo(current + 1), DURATION);
  }

  document.getElementById('heroRevPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('heroRevNext')?.addEventListener('click', () => goTo(current + 1));

  const panel = document.querySelector('.hero-rev-panel');
  panel?.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    heroRevBar.style.transition = 'none';
  });
  panel?.addEventListener('mouseleave', () => { resetBar(); scheduleNext(); });

  resetBar();
  scheduleNext();
}

document.querySelectorAll('.faq-q').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-649319874/Wh7ACLPB8fAaEMKrz7UC',
    'event_callback': callback
  });
  return false;
}

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    gtag_report_conversion(this.href);
  });
});

const contactForm = document.getElementById('cform');
const successMessage = document.getElementById('fSuccess');
if (contactForm && successMessage) {
  function validateField(field) {
    const group = field.closest('.fg');
    let isValid;
    if (field.type === 'email') isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    else if (field.type === 'tel') isValid = field.value.replace(/\D/g,'').length >= 10;
    else if (field.tagName === 'SELECT') isValid = field.value !== '';
    else isValid = field.value.trim().length > 1;
    group.classList.toggle('err', !isValid);
    return isValid;
  }
  ['f-name','f-phone','f-email','f-svc'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.closest('.fg').classList.contains('err')) validateField(field); });
  });
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = ['f-name','f-phone','f-email','f-svc'].map(id => document.getElementById(id)).filter(Boolean);
    if (!fields.map(validateField).every(Boolean)) return;
    const submitBtn = contactForm.querySelector('.fsub');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    const resetButton = () => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Request';
      alert('Something went wrong. Please call us at 408-858-6123.');
    };
    try {
      const res = await fetch(contactForm.action, {method:'POST', body:new FormData(contactForm), headers:{'Accept':'application/json'}});
      if (res.ok) {
        contactForm.style.display = 'none';
        successMessage.classList.add('show');
      } else {
        resetButton();
      }
    } catch {
      resetButton();
    }
  });
}
