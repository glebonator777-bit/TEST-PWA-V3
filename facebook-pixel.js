(function() {
  'use strict';

  window.fbq = window.fbq || function() {
    (window.fbq.q = window.fbq.q || []).push(arguments);
  };

  window._fbq = window._fbq || [];
  window.fbq.loaded = true;

  window.fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');

  fbq('track', 'PageView');

  function trackClick(element, eventName) {
    if (element) {
      element.addEventListener('click', function() {
        fbq('track', eventName);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    trackClick(document.getElementById('pwa-install-button'), 'Lead');
    
    const subButtons = document.querySelectorAll('.sub-btn');
    subButtons.forEach(function(btn) {
      trackClick(btn, 'InitiateCheckout');
    });
  });
})();