const DEEP_LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1';

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  
  if (!installBtn) return;

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    window.location.href = DEEP_LINK;
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  installBtn.addEventListener('click', () => {
    if ('beforeinstallprompt' in window) {
      installBtn.textContent = 'Встановлення...';
      installBtn.disabled = true;
    } else {
      alert('Для установки используйте Chrome на Android');
    }
  });
});
