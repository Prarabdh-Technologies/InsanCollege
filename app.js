/* Local enhancements only. Enquiry details never leave this page automatically. */
(() => {
  'use strict';
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let savedTheme = null;
  try {
    const stored = localStorage.getItem('insan-theme');
    if (stored === 'light' || stored === 'dark') savedTheme = stored;
  } catch { /* System preference remains available when storage is blocked. */ }
  root.dataset.theme = savedTheme || (systemTheme.matches ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-toggle');
    function updateThemeButton() {
      const dark = root.dataset.theme === 'dark';
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Use light mode' : 'Use dark mode');
      themeButton.querySelector('span').textContent = dark ? 'Light mode' : 'Dark mode';
      document.querySelector('meta[name="theme-color"]').content = dark ? '#0f1b26' : '#173954';
    }
    themeButton.hidden = false;
    updateThemeButton();
    themeButton.addEventListener('click', () => {
      savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = savedTheme;
      try { localStorage.setItem('insan-theme', savedTheme); } catch { /* Not required. */ }
      updateThemeButton();
    });
    systemTheme.addEventListener('change', () => {
      if (!savedTheme) {
        root.dataset.theme = systemTheme.matches ? 'dark' : 'light';
        updateThemeButton();
      }
    });

    document.querySelectorAll('[data-published]').forEach(badge => {
      const age = (Date.now() - Date.parse(badge.dataset.published + 'T00:00:00+05:30')) / 86400000;
      if (age < 0 || age > 14) {
        badge.textContent = 'Earlier';
        badge.classList.replace('badge-new', 'badge-archived');
      }
    });
    const slides = document.getElementById('notice-slides');
    const board = slides.closest('.notice-board');
    const pauseButton = document.getElementById('notice-pause');
    const position = document.getElementById('notice-position');
    const count = slides.children.length;
    let current = 0;
    let paused = reducedMotion.matches;
    let hovered = false;
    let focused = false;
    let timer;
    document.getElementById('notice-controls').hidden = false;
    function syncPause() {
      pauseButton.textContent = paused ? 'Play' : 'Pause';
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', paused ? 'Play automatic notifications' : 'Pause automatic notifications');
    }
    function goTo(index) {
      current = (index + count) % count;
      slides.scrollTo({ left: current * slides.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      position.textContent = `${current + 1} / ${count}`;
    }
    function schedule() {
      clearInterval(timer);
      if (!paused && !hovered && !focused && !document.hidden) {
        timer = setInterval(() => goTo(current + 1), 8000);
      }
    }
    document.getElementById('notice-prev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('notice-next').addEventListener('click', () => goTo(current + 1));
    pauseButton.addEventListener('click', () => { paused = !paused; syncPause(); schedule(); });
    slides.addEventListener('scroll', () => {
      current = Math.min(count - 1, Math.max(0, Math.round(slides.scrollLeft / slides.clientWidth)));
      position.textContent = `${current + 1} / ${count}`;
    }, { passive: true });
    board.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    board.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    board.addEventListener('focusin', () => { focused = true; schedule(); });
    board.addEventListener('focusout', () => {
      setTimeout(() => { focused = board.contains(document.activeElement); schedule(); }, 0);
    });
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) paused = true;
      syncPause(); schedule();
    });
    syncPause(); schedule();

    const form = document.getElementById('enquiry-form');
    const result = document.getElementById('enquiry-result');
    const emailLink = document.getElementById('enquiry-email-link');
    form.addEventListener('input', event => {
      if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
      result.hidden = true;
      emailLink.href = 'mailto:contact@insandegreecollege.co.in';
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      for (const id of ['enquiry-name', 'enquiry-message']) {
        const field = document.getElementById(id);
        field.setCustomValidity(field.value.trim() ? '' : 'Please enter a response, not only spaces.');
      }
      if (!form.reportValidity()) return;
      const value = id => document.getElementById(id).value.trim();
      const subject = `College enquiry: ${value('enquiry-course')}`;
      const message = [
        'Dear Admissions Office,', '', value('enquiry-message'), '',
        `Name: ${value('enquiry-name')}`, `Email: ${value('enquiry-email')}`,
        `Phone: ${value('enquiry-phone') || 'Not provided'}`,
        `Course: ${value('enquiry-course')}`
      ].join('\n');
      // Encode each mailto value; render submitted content exclusively as text.
      emailLink.href = `mailto:contact@insandegreecollege.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      document.getElementById('enquiry-preview').textContent = message;
      result.hidden = false;
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
    });
    document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
  });
})();
