/**
 * CAROL DETWEILER AUTHOR WEBSITE - PRODUCTION JAVASCRIPT
 * Handles navigation, mobile accordion drawers, YouTube IFrame seek triggers, and accessible modal lightboxes.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordions();
  initLightbox();
  initKeyboardAccess();
});

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function initNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  }

  // Mobile Dropdown Toggle Handler
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 968) {
        e.preventDefault();
        const parent = toggle.closest('.dropdown');
        parent.classList.toggle('active');
      }
    });
  });
}

/* ==========================================================================
   YOUTUBE IFRAME API & VERIFIED JUMP POINTS
   ========================================================================== */
let player;

function onYouTubeIframeAPIReady() {
  const playerContainer = document.getElementById('player');
  if (playerContainer) {
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: 'UgVMq9b5Pu4',
      playerVars: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1
      }
    });
  }
}

function seekTo(seconds) {
  if (player && typeof player.seekTo === 'function') {
    player.seekTo(seconds, true);
    player.playVideo();
    const playerWrapper = document.querySelector('.video-player-wrapper');
    if (playerWrapper) {
      playerWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } else {
    // Fallback if direct iframe replacement is active
    const iframe = document.querySelector('#player');
    if (iframe && iframe.tagName === 'IFRAME') {
      iframe.src = `https://www.youtube.com/embed/UgVMq9b5Pu4?start=${seconds}&autoplay=1`;
      iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/* ==========================================================================
   ACCORDIONS (Book Club Discussion Questions)
   ========================================================================== */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
}

/* ==========================================================================
   LIGHTBOX MODAL (Photo Gallery)
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!modal) return;

  window.openLightbox = function(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.classList.add('active');
  };

  function closeModal() {
    modal.classList.remove('active');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   KEYBOARD ACCESSIBILITY
   ========================================================================== */
function initKeyboardAccess() {
  document.querySelectorAll('.timestamp-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}