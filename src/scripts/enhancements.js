/**
 * JB Cloud Docs - UI Enhancements
 * - Reading progress bar
 * - Keyboard navigation
 * - TOC progress highlighting
 * - Feedback widget
 */

(function() {
  'use strict';

  // ===========================================
  // READING PROGRESS BAR
  // ===========================================
  function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ===========================================
  // TOC PROGRESS HIGHLIGHT
  // ===========================================
  function initTocHighlight() {
    const tocLinks = document.querySelectorAll('.right-sidebar a[href^="#"]');
    if (tocLinks.length === 0) return;

    const headings = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const heading = document.getElementById(id);
      if (heading) {
        headings.push({ id, element: heading, link });
      }
    });

    function updateActiveHeading() {
      const scrollPos = window.scrollY + 100;
      let activeHeading = null;

      for (const heading of headings) {
        if (heading.element.offsetTop <= scrollPos) {
          activeHeading = heading;
        }
      }

      tocLinks.forEach(link => link.classList.remove('toc-active'));
      if (activeHeading) {
        activeHeading.link.classList.add('toc-active');
      }
    }

    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    updateActiveHeading();
  }

  // ===========================================
  // KEYBOARD NAVIGATION
  // ===========================================
  function initKeyboardNav() {
    const hint = document.createElement('div');
    hint.className = 'keyboard-hint';
    hint.innerHTML = '<kbd>j</kbd>/<kbd>k</kbd> scroll &nbsp; <kbd>/</kbd> search &nbsp; <kbd>g</kbd><kbd>h</kbd> home';
    document.body.appendChild(hint);

    let hintTimeout;
    let gPressed = false;

    function showHint() {
      hint.classList.add('visible');
      clearTimeout(hintTimeout);
      hintTimeout = setTimeout(() => hint.classList.remove('visible'), 2000);
    }

    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'j':
          window.scrollBy({ top: 100, behavior: 'smooth' });
          showHint();
          break;
        case 'k':
          window.scrollBy({ top: -100, behavior: 'smooth' });
          showHint();
          break;
        case '/':
          e.preventDefault();
          const searchButton = document.querySelector('[data-open-modal]');
          if (searchButton) searchButton.click();
          break;
        case 'g':
          gPressed = true;
          setTimeout(() => gPressed = false, 500);
          break;
        case 'h':
          if (gPressed) {
            window.location.href = '/';
            gPressed = false;
          }
          break;
        case '?':
          showHint();
          break;
      }
    });
  }

  // ===========================================
  // FEEDBACK WIDGET
  // ===========================================
  function initFeedbackWidget() {
    const content = document.querySelector('.sl-markdown-content');
    if (!content) return;

    // Don't add on index pages
    if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
      return;
    }

    const widget = document.createElement('div');
    widget.className = 'feedback-widget';
    widget.innerHTML = `
      <p>Was this page helpful?</p>
      <div class="feedback-buttons">
        <button class="feedback-btn" data-value="yes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          Yes
        </button>
        <button class="feedback-btn" data-value="no">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
          </svg>
          No
        </button>
      </div>
      <p class="feedback-thanks">Thanks for your feedback!</p>
    `;

    content.appendChild(widget);

    widget.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        // Store feedback (could be sent to analytics)
        localStorage.setItem('feedback-' + window.location.pathname, value);
        widget.classList.add('submitted');
      });
    });

    // Check if already submitted
    if (localStorage.getItem('feedback-' + window.location.pathname)) {
      widget.classList.add('submitted');
    }
  }

  // ===========================================
  // INIT ALL
  // ===========================================
  function init() {
    initProgressBar();
    initTocHighlight();
    initKeyboardNav();
    initFeedbackWidget();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
