# Mariachis Los Peruchos — Landing

Landing page estática optimizada para conversiones desde Google Ads hacia WhatsApp.

## Estructura
- `index.html`: contenido y SEO
- `styles.css`: estilos responsivos
- `script.js`: enlace dinámico a WhatsApp con UTM y mejoras UX

## Cómo usar
1. Abre `index.html` con tu navegador (doble clic).
2. Verifica que los botones "WhatsApp" abren el chat con texto precargado.
3. Sube estos archivos a tu hosting o a GitHub Pages.

## Personalización
- Teléfono: en `script.js` modifica `PHONE` si cambia.
- OG Image: reemplaza el `og:image` por una imagen propia 1200x630.
- Precios: ajusta la sección "Paquetes referenciales" según tus tarifas.
- Google Ads conversion: si usas `gtag`, reemplaza `AW-CONVERSION_ID/label` por tu valor real.

## Buenas prácticas aplicadas
- HTML semántico y accesible (landmarks, `details/summary`).
- Velocidad: uso moderado de CSS/JS, videos con `preload=none` fuera del hero.
- Copy orientado a acción, prueba social y CTAs visibles.
- WhatsApp con UTM para seguimiento de campañas.

## Archivos de video
Los videos referenciados usan los nombres presentes en la carpeta. Si cambias los nombres, actualiza las rutas en `index.html`.