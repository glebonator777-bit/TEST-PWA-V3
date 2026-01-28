document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.querySelector('.install-btn');
  
  installBtn.addEventListener('click', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker зареєстровано:', registration);
      } catch (error) {
        console.error('Помилка реєстрації Service Worker:', error);
      }
    }

    if ('beforeinstallprompt' in window) {
      installBtn.textContent = 'Встановлення...';
      installBtn.disabled = true;
    } else {
      alert('Встановлення PWA недоступне в цьому браузері');
    }
  });

  if ('beforeinstallprompt' in window) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      installBtn.textContent = 'Встановити';
      installBtn.disabled = false;

      installBtn.addEventListener('click', async () => {
        installBtn.textContent = 'Встановлення...';
        installBtn.disabled = true;
        e.prompt();
        const { outcome } = await e.userChoice;
        
        if (outcome === 'accepted') {
          installBtn.textContent = 'Встановлено';
        } else {
          installBtn.textContent = 'Встановити';
          installBtn.disabled = false;
        }
      });
    });
  }
});
