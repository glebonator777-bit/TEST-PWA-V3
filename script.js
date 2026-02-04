function getUrlParams() {
  const params = {};
  const urlParams = new URLSearchParams(window.location.search);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

const params = getUrlParams();
const DEEP_LINK = params.deeplink || params.dl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const SUBID = params.subid || params.sub || params.clickid || '';

window.keitaro_subid = SUBID;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('pwa-install-button');
  
  if (!installBtn) return;

  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isWebView = /wv/i.test(userAgent) || /Version\/[\d.]+.*Chrome/i.test(userAgent) || window.TelegramWebviewProxy !== undefined || /Telegram/i.test(userAgent);
  const isChromeMobile = /Chrome\/.*Mobile/i.test(userAgent) && !isWebView && !/SamsungBrowser/i.test(userAgent) && !/Edg/i.test(userAgent) && !/OPR/i.test(userAgent);
  
  if (isAndroid && !isChromeMobile) {
    const openInChromeBtn = document.createElement('a');
    openInChromeBtn.href = window.location.href;
    openInChromeBtn.textContent = 'Відкрити в Chrome';
    openInChromeBtn.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px;background:#174EA6;color:white;text-decoration:none;border-radius:10px;font-size:18px;z-index:9999;';
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9998;';
    overlay.appendChild(openInChromeBtn);
    document.body.appendChild(overlay);
    
    return;
  }

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
    
    if (SUBID && typeof window.keitaro_subid !== 'undefined') {
      const postbackUrl = `https://YOUR_KEITARO_DOMAIN.com/postback?subid=${SUBID}&status=install&device_type=mobile`;
      fetch(postbackUrl, { mode: 'no-cors' }).catch(() => {});
    }
  });
});
