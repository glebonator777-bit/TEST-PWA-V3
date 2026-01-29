const DEEP_LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  
  if (!installBtn) return;

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    window.location.replace(DEEP_LINK);
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  });
});
