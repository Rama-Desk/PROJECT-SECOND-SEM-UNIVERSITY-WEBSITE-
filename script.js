 /* ── SLIDER ── */
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
/* Translation to english to odia*/
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,or',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function changeSlide(dir) { goToSlide(current + dir); }
  setInterval(() => changeSlide(1), 5000);

  /* ── NEWS TABS ── */
  function switchTab(el, tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    ['news','events','circulars'].forEach(t => {
      const el2 = document.getElementById('tab-'+t);
      if(el2) el2.style.display = t === tab ? 'grid' : 'none';
    });
    const tabEl = document.getElementById('tab-'+tab);
    if(tabEl) tabEl.style.display = tab === 'news' ? 'grid' : 'block';
  }

  /* ── SEARCH ── */
  function toggleSearch() {
    const ov = document.getElementById('searchOverlay');
    ov.classList.toggle('open');
    if(ov.classList.contains('open')) document.getElementById('searchInput').focus();
  }
  document.getElementById('searchOverlay').addEventListener('click', function(e) {
    if(e.target === this) toggleSearch();
  });

  /* ── CHAT ── */
  function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('open');
  }

  const replies = {
    'admission': 'Admissions 2026-27 are open! Apply at outr.ac.in/admissions. Deadline: March 31, 2026.',
    'fee': 'Fee details vary by program. B.Tech fees start at ₹85,000/year. Check the fee structure at outr.ac.in/fees.',
    'hostel': 'OUTR has separate hostels for boys and girls with 5,000+ capacity. Apply through the Student Portal.',
    'exam': 'Exam schedules are published on the Exam Cell portal. Login to your student portal for your timetable.',
    'placement': 'Our placement rate is 95% for 2025 batch. Highest package: ₹42 LPA. Over 240 companies visited campus.',
    'scholarship': 'We offer merit, need-based, and state government scholarships. Apply before Feb 28, 2026.',
    'contact': 'Reach us at: info@outr.ac.in | Phone: +91-674-2565xxx | Campus: VSSUT, Burla, Odisha.',
    'default': 'Thank you for your question! For detailed information, please contact us at info@outr.ac.in or call our helpdesk at 1800-xxx-xxxx.'
  };

  function sendMsg() {
    const input = document.getElementById('chatIn');
    const msgs = document.getElementById('chatMsgs');
    const text = input.value.trim();
    if(!text) return;
    msgs.innerHTML += `<div class="chat-msg user">${text}</div>`;
    input.value = '';
    const lower = text.toLowerCase();
    let reply = replies.default;
    for(let k in replies) { if(lower.includes(k)) { reply = replies[k]; break; } }
    setTimeout(() => {
      msgs.innerHTML += `<div class="chat-msg">${reply}</div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 600);
    msgs.scrollTop = msgs.scrollHeight;
  }

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.news-item, .dept-card, .program-card, .event-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });