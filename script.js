/**
 * SafeSphere - Global JavaScript Utility Module
 * Handles Theme Toggling (Dark/Light), Mobile Navigation,
 * Web Audio SOS Siren / Whistle, Toast Alerts, Tip of the Day, and Stats Animation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollTop();
  initTipOfTheDay();
  initStatsCounter();
  initNewsletter();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('safesphere_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('safesphere_theme', theme);
  
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }
}

/* ==========================================================================
   3. Scroll to Top Button
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   4. Daily Rotating Safety Tips
   ========================================================================== */
function initTipOfTheDay() {
  const tipTextEl = document.getElementById('dailyTipText');
  const tipCategoryEl = document.getElementById('dailyTipCategory');
  const tipRefreshBtn = document.getElementById('refreshTipBtn');
  const tipSpeakBtn = document.getElementById('speakTipBtn');

  if (!tipTextEl || !window.SafeSphereData || !window.SafeSphereData.safetyTips) return;

  const tips = window.SafeSphereData.safetyTips;
  let currentTipIndex = Math.floor(Math.random() * tips.length);

  function renderTip(index) {
    const tip = tips[index];
    tipTextEl.textContent = `"${tip.tip}"`;
    if (tipCategoryEl) tipCategoryEl.textContent = `${tip.category} • ${tip.author}`;
  }

  renderTip(currentTipIndex);

  if (tipRefreshBtn) {
    tipRefreshBtn.addEventListener('click', () => {
      currentTipIndex = (currentTipIndex + 1) % tips.length;
      renderTip(currentTipIndex);
      showToast('New Safety Tip Loaded!', 'info');
    });
  }

  if (tipSpeakBtn) {
    tipSpeakBtn.addEventListener('click', () => {
      speakText(tips[currentTipIndex].tip);
    });
  }
}

/* ==========================================================================
   5. Text-to-Speech Accessibility Helper
   ========================================================================== */
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-Speech is not supported in this browser.', 'danger');
    return;
  }
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
  showToast('Reading out loud...', 'info');
}

/* ==========================================================================
   6. Live Stats Counter with IntersectionObserver
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-count');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'), 10);
        animateCount(target, targetValue);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCount(element, target) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
    const current = Math.floor(easeProgress * target);

    element.textContent = current.toLocaleString() + '+';

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString() + '+';
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   7. Newsletter Subscription with Validation
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) {
        showToast('Please enter a valid email address.', 'danger');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        showToast('Please provide a legitimate email format.', 'danger');
        return;
      }

      // Simulate API call and LocalStorage storage
      const subscribers = JSON.parse(localStorage.getItem('safesphere_subscribers') || '[]');
      subscribers.push({ email: input.value.trim(), date: new Date().toISOString() });
      localStorage.setItem('safesphere_subscribers', JSON.stringify(subscribers));

      input.value = '';
      showToast('🎉 Thank you for subscribing to SafeSphere Weekly Safety Brief!', 'success');
    });
  });
}

/* ==========================================================================
   8. Web Audio SOS Siren & Emergency Alarm Generator
   ========================================================================== */
let audioCtx = null;
let sirenOscillator = null;
let sirenGain = null;
let sirenInterval = null;
let isSirenPlaying = false;

function toggleSiren() {
  if (isSirenPlaying) {
    stopSiren();
  } else {
    startSiren();
  }
}

function startSiren() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    sirenOscillator = audioCtx.createOscillator();
    sirenGain = audioCtx.createGain();

    sirenOscillator.type = 'sawtooth';
    sirenGain.gain.setValueAtTime(0.3, audioCtx.currentTime);

    sirenOscillator.connect(sirenGain);
    sirenGain.connect(audioCtx.destination);

    sirenOscillator.start();
    isSirenPlaying = true;

    // Pitch sweep between 500Hz and 1200Hz
    let high = false;
    sirenInterval = setInterval(() => {
      if (!sirenOscillator) return;
      const targetFreq = high ? 650 : 1200;
      sirenOscillator.frequency.exponentialRampToValueAtTime(targetFreq, audioCtx.currentTime + 0.35);
      high = !high;
    }, 400);

    document.body.classList.add('siren-active-body');
    showToast('🚨 SOS Emergency Siren ACTIVATED at high volume!', 'danger');

    const btn = document.getElementById('sirenToggleBtn');
    if (btn) btn.innerHTML = '<span>🛑 STOP SIREN ALARM</span>';
  } catch (err) {
    console.error('Audio Context Error:', err);
    showToast('Unable to initialize Web Audio in this browser.', 'danger');
  }
}

function stopSiren() {
  if (sirenInterval) clearInterval(sirenInterval);
  if (sirenOscillator) {
    try { sirenOscillator.stop(); } catch(e) {}
    sirenOscillator.disconnect();
    sirenOscillator = null;
  }
  isSirenPlaying = false;
  document.body.classList.remove('siren-active-body');
  showToast('SOS Siren Stopped.', 'info');

  const btn = document.getElementById('sirenToggleBtn');
  if (btn) btn.innerHTML = '<span>🚨 ACTIVATE SOS SIREN ALARM</span>';
}

/* ==========================================================================
   9. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Global expose for helper functions
window.SafeSphereUtils = {
  showToast,
  speakText,
  toggleSiren,
  startSiren,
  stopSiren
};
