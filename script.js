const DEEP_LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('pwa-install-button');
  
  if (!installBtn) return;

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    window.location.replace(DEEP_LINK);
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker registered');
    }).catch((err) => {
      console.log('Service Worker error:', err);
    });
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt triggered');
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    console.log('Install button clicked, deferredPrompt:', !!deferredPrompt);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log('User choice:', choiceResult.outcome);
        if (choiceResult.outcome === 'accepted') {
          installBtn.textContent = 'Встановлено';
        }
        deferredPrompt = null;
      });
    } else {
      alert('Відкрийте це посилання в Google Chrome на Android');
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('App installed');
    installBtn.textContent = 'Встановлено';
  });
});
