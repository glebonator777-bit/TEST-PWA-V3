const DEEP_LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  
  if (!installBtn) return;

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    window.location.href = DEEP_LINK;
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker зареєстровано');
    }).catch((err) => {
      console.log('Service Worker не зареєстровано:', err);
    });
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.textContent = 'Встановити';
    installBtn.disabled = false;
  });

  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          installBtn.textContent = 'Встановлено';
          installBtn.disabled = true;
        } else {
          installBtn.textContent = 'Встановити';
        }
        deferredPrompt = null;
      });
    } else {
      alert('Для установки PWA откройте сайт в Chrome на Android и нажмите "Добавить на главный экран" в меню браузера');
    }
  });

  window.addEventListener('appinstalled', () => {
    installBtn.textContent = 'Встановлено';
    installBtn.disabled = true;
  });
});
