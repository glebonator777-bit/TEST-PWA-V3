const DEEP_LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    window.location.href = DEEP_LINK;
    return;
  }

  const installBtn = document.querySelector('.install-btn');
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker зареєстровано:', registration);
    }).catch((error) => {
      console.error('Помилка реєстрації Service Worker:', error);
    });
  }

  installBtn.addEventListener('click', async () => {
    if ('beforeinstallprompt' in window) {
      installBtn.textContent = 'Встановлення...';
      installBtn.disabled = true;
    } else {
      alert('Встановлення PWA недоступне в цьому браузері');
    }
  });

  if ('beforeinstallprompt' in window) {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.textContent = 'Встановити';
      installBtn.disabled = false;

      installBtn.addEventListener('click', async () => {
        installBtn.textContent = 'Встановлення...';
        installBtn.disabled = true;
        
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          
          if (outcome === 'accepted') {
            installBtn.textContent = 'Встановлено';
            installBtn.disabled = true;
          } else {
            installBtn.textContent = 'Встановити';
            installBtn.disabled = false;
          }
          deferredPrompt = null;
        }
      });
    });

    window.addEventListener('appinstalled', () => {
      installBtn.textContent = 'Встановлено';
      installBtn.disabled = true;
    });
  }
});
