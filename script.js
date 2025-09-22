// Mariachis Los Peruchos - JS
(function () {
  const PHONE = '51998693529';
  const BASE_WA = `https://wa.me/${PHONE}`;

  // Lee parámetros UTM si vienen desde Google Ads
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || 'google';
  const utmMedium = params.get('utm_medium') || 'cpc';
  const utmCampaign = params.get('utm_campaign') || 'mariachis_lima_serenatas';
  const utmTerm = params.get('utm_term') || '';

  const today = new Date();
  const hour = today.getHours();
  const quick = hour >= 21 || hour < 7 ? 'Atención 24/7' : 'Atención inmediata';

  const defaultMsg = `Hola, quisiera una cotización para una serenata con Mariachis Los Peruchos en Lima. ${quick}. Fecha: ____ , Distrito: ____ , Paquete: ____ .`;

  function buildWaLink(origin) {
    const text = defaultMsg + ` (Origen: ${origin})`;
    const url = new URL(BASE_WA);
    url.searchParams.set('text', text);
    url.searchParams.set('utm_source', utmSource);
    url.searchParams.set('utm_medium', utmMedium);
    url.searchParams.set('utm_campaign', utmCampaign);
    if (utmTerm) url.searchParams.set('utm_term', utmTerm);
    url.searchParams.set('utm_content', origin);
    return url.toString();
  }

  function wireCtas() {
    const ctas = document.querySelectorAll('[id^="cta-whatsapp-"]');
    ctas.forEach(a => {
      const origin = a.getAttribute('data-origin') || 'cta';
      a.href = buildWaLink(origin);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.addEventListener('click', () => {
        // gtag conversion si existe
        if (typeof gtag === 'function') {
          try { gtag('event', 'conversion', { send_to: 'AW-CONVERSION_ID/label' }); } catch (e) { }
        }
      });
    });
  }

  // Year in footer
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // Play teaser muted on hover in some browsers
  function enhanceTeaser() {
    const v = document.getElementById('teaser-video');
    if (!v) return;
    v.addEventListener('mouseenter', () => v.play().catch(() => { }));
    v.addEventListener('focus', () => v.play().catch(() => { }));
  }

  // Lazy start playing videos when visible (if not using controls)
  function lazyAutoplay() {
    const videos = document.querySelectorAll('#videos video');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const v = e.target;
          if (v.autoplay) v.play().catch(() => { });
          io.unobserve(v);
        }
      });
    }, { rootMargin: '100px' });
    videos.forEach(v => io.observe(v));
  }

  // Generar poster desde el primer frame para videos de la galería
  function generatePosters() {
    const videos = document.querySelectorAll('#videos video');
    videos.forEach((v, index) => {
      // Intentar generar poster real desde el video como mejora
      const attemptPosterGeneration = () => {
        try {
          if (!v.videoWidth || !v.videoHeight) return;
          const canvas = document.createElement('canvas');
          canvas.width = v.videoWidth;
          canvas.height = v.videoHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Ir al segundo 1 para mejor frame
          v.currentTime = 1;

          const generateFrame = () => {
            try {
              ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
              const dataURL = canvas.toDataURL('image/jpeg', 0.8);
              if (dataURL && dataURL !== 'data:,') {
                v.setAttribute('poster', dataURL);
                console.log(`Poster generado para video ${index + 1}`);
              }
            } catch (e) {
              console.log(`No se pudo generar poster para video ${index + 1}:`, e);
            }
            v.pause();
            v.currentTime = 0;
          };

          // Esperar a que llegue al segundo 1
          v.addEventListener('seeked', generateFrame, { once: true });

        } catch (e) {
          console.log(`Error generando poster para video ${index + 1}:`, e);
        }
      };

      // Intentar cuando carguen los metadatos
      v.addEventListener('loadedmetadata', attemptPosterGeneration, { once: true });

      // Forzar carga de metadatos
      if (v.readyState >= 1) {
        attemptPosterGeneration();
      } else {
        v.load();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireCtas();
    setYear();
    enhanceTeaser();
    lazyAutoplay();
    generatePosters();
    setupFabs();
    setupMobileNav();
  });
})();

// Control de FABs (WhatsApp y Volver arriba)
function setupFabs() {
  const fabWa = document.getElementById('cta-whatsapp-fab');
  const fabTop = document.getElementById('btn-top');
  const heroCta = document.getElementById('cta-whatsapp-hero');
  const headerCta = document.getElementById('cta-whatsapp-header');
  if (!fabWa || !fabTop || !heroCta) return;

  // Vincula enlace WA al FAB usando mismo origen "fab"
  try {
    const origin = fabWa.getAttribute('data-origin') || 'fab';
    // reutilizamos la función privada si existiera; si no, recomponemos rápido
    const phone = '51998693529';
    const BASE_WA = `https://wa.me/${phone}`;
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || 'google';
    const utmMedium = params.get('utm_medium') || 'cpc';
    const utmCampaign = params.get('utm_campaign') || 'mariachis_lima_serenatas';
    const utmTerm = params.get('utm_term') || '';
    const hour = new Date().getHours();
    const quick = hour >= 21 || hour < 7 ? 'Atención 24/7' : 'Atención inmediata';
    const defaultMsg = `Hola, quisiera una cotización para una serenata con Mariachis Los Peruchos en Lima. ${quick}. Fecha: ____ , Distrito: ____ , Paquete: ____ .`;
    const text = defaultMsg + ` (Origen: ${origin})`;
    const url = new URL(BASE_WA);
    url.searchParams.set('text', text);
    url.searchParams.set('utm_source', utmSource);
    url.searchParams.set('utm_medium', utmMedium);
    url.searchParams.set('utm_campaign', utmCampaign);
    if (utmTerm) url.searchParams.set('utm_term', utmTerm);
    url.searchParams.set('utm_content', origin);
    fabWa.href = url.toString();
    fabWa.target = '_blank'; fabWa.rel = 'noopener';
  } catch (e) { }

  // Observa solo el CTA del hero (más simple y robusto)
  let heroVisible = true;
  const updateFabs = () => {
    if (heroVisible) {
      fabWa.classList.remove('show');
      fabTop.classList.remove('show');
    } else {
      fabWa.classList.add('show');
      fabTop.classList.add('show');
    }
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === heroCta) {
        heroVisible = entry.isIntersecting && entry.intersectionRatio > 0;
        updateFabs();
      }
    });
  }, { threshold: [0, 0.01] });

  io.observe(heroCta);

  // Acción del botón Subir
  fabTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Menú hamburguesa en móviles
function setupMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  function open() { nav.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
  function close() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    if (nav.classList.contains('open')) close(); else open();
  });
  // Cerrar al elegir una sección
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close()));
  // Cerrar al hacer scroll suave al target
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    const clickedInsideNav = path.length ? path.includes(nav) : nav.contains(e.target);
    const clickedToggle = path.length ? path.includes(toggle) : toggle.contains(e.target);
    if (!clickedInsideNav && !clickedToggle) close();
  });
}
