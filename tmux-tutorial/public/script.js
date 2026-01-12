// Interactive resize demo
function resizePane(direction) {
  const pane = document.getElementById('resize-demo-pane');
  const currentWidth = parseInt(getComputedStyle(pane).width);
  const currentHeight = parseInt(getComputedStyle(pane).height);

  switch (direction) {
    case 'left':
      pane.style.width = Math.max(100, currentWidth - 20) + 'px';
      break;
    case 'right':
      pane.style.width = Math.min(400, currentWidth + 20) + 'px';
      break;
    case 'up':
      pane.style.height = Math.max(50, currentHeight - 10) + 'px';
      break;
    case 'down':
      pane.style.height = Math.min(200, currentHeight + 10) + 'px';
      break;
  }
}

// Add keyboard hints animation
document.querySelectorAll('kbd').forEach((kbd) => {
  kbd.addEventListener('mouseenter', () => {
    kbd.style.transform = 'translateY(-2px)';
    kbd.style.boxShadow = '0 4px 0 var(--kbd-border)';
  });

  kbd.addEventListener('mouseleave', () => {
    kbd.style.transform = '';
    kbd.style.boxShadow = '';
  });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Keyboard shortcut practice mode
let practiceMode = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'p' && e.ctrlKey) {
    e.preventDefault();
    practiceMode = !practiceMode;

    if (practiceMode) {
      showPracticeOverlay();
    } else {
      hidePracticeOverlay();
    }
  }
});

function showPracticeOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'practice-overlay';
  overlay.innerHTML = `
    <div class="practice-modal">
      <h2>Practice Mode</h2>
      <p>Press the key combinations shown below:</p>
      <div id="practice-challenge"></div>
      <p class="hint">Press Ctrl+P to exit</p>
    </div>
  `;
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 17, 23, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  const modal = overlay.querySelector('.practice-modal');
  modal.style.cssText = `
    background: var(--bg-secondary);
    padding: 2rem 3rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    text-align: center;
    color: var(--text-primary);
  `;

  document.body.appendChild(overlay);
  showNextChallenge();
}

function hidePracticeOverlay() {
  const overlay = document.getElementById('practice-overlay');
  if (overlay) {
    overlay.remove();
  }
}

const challenges = [
  { keys: 'Ctrl+h', description: 'Move left' },
  { keys: 'Ctrl+j', description: 'Move down' },
  { keys: 'Ctrl+k', description: 'Move up' },
  { keys: 'Ctrl+l', description: 'Move right' },
];

let currentChallengeIndex = 0;

function showNextChallenge() {
  const container = document.getElementById('practice-challenge');
  if (!container) return;

  const challenge = challenges[currentChallengeIndex];
  container.innerHTML = `
    <div style="font-size: 2rem; margin: 1rem 0;">
      <kbd style="font-size: 1.5rem; padding: 0.5rem 1rem;">${challenge.keys}</kbd>
    </div>
    <p style="color: var(--text-secondary);">${challenge.description}</p>
  `;
}

// Add active section highlighting in TOC
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc a');

const observerOptions = {
  rootMargin: '-20% 0px -70% 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      tocLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent-cyan)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Console welcome message
console.log(`
%c tmux Tutorial %c

Welcome! This tutorial is based on the config at:
~/Developer/.dotfiles/.tmux.conf

Key bindings you'll learn:
- Ctrl+h/j/k/l: Navigate panes (vim-style)
- Prefix + |: Split vertical
- Prefix + -: Split horizontal
- Prefix + m: Zoom pane

Have fun learning tmux!
`, 'background: #3fb950; color: #0d1117; padding: 4px 8px; font-weight: bold;', '');
