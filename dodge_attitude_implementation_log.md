# Dodge Attitude — Implementation Log

## Resumen
Se habilitó la sección de marca Dodge en el sitio VAPSA, siguiendo el mismo patrón de Hub + Landing premium que ya existía para Jeep, Ram y Fiat. El modelo insignia con landing completamente construido es el **Dodge Attitude 2026**.

## Por qué Attitude como modelo insignia
Dodge vende en México tres líneas: **Attitude** (sedán, desde $379,900 en el catálogo del sitio / $364,900 en dodge.com.mx), **Charger** (muscle car icónico, desde $1,489,900) y **Durango** (SUV, desde $2,179,900, con edición Hellcat Black Demon). Se eligió Attitude como modelo insignia porque es el vehículo de volumen/accesible de la marca, análogo al rol que cumplen Jeep Renegade y Fiat Pulse 2026 en sus respectivas marcas (el vehículo de entrada que atrae al mayor número de clientes). Charger y Durango se muestran en el carrusel del Hub y en el mega-menú de navegación, pero usan `fallbackModel` en el Landing si no tienen ficha propia — Charger y Durango sí tienen ficha propia completa en `DodgePremiumLanding.svelte` (además de Journey), por lo que las 4 variantes del catálogo (Attitude, Charger, Durango, Journey) tienen contenido dedicado.

## Archivos creados
- `src/lib/components/DodgeBrandHub.svelte` — Hub de marca con hero, carrusel de modelos (Attitude, Charger, Durango, Journey), sección "elige por necesidad" y lineup completo. Paleta Dodge: `#D50000` (default) / `#BA0000` (hover).
- `src/lib/components/DodgePremiumLanding.svelte` — Landing premium con scroll-driven animations, specs, galería, secciones de historia y CTA de cotización/prueba de manejo/cita de servicio. Contiene fichas completas para los 4 slugs: `attitude`, `charger`, `durango`, `journey`.

## Archivos modificados
- `src/App.svelte` — imports de los nuevos componentes, estado `dodgeModelSlug`, handler `handleDodgeModelSelect`, routing en `syncBrandFromUrl` (`/adistem2026/dodge/:slug/`), reseteo del slug en `handleHomeClick`/`handleBrandSelect`/`scrollToPromociones`, bloques condicionales de render, extensión de `onModelSelect` del mega-menú y del modo de `MobileBottomNav`.
- `src/lib/components/GlassSidebar.svelte` — `enabled: false → true` para Dodge (y también para Ram y Peugeot, ver log de Peugeot).
- `src/lib/components/GlassTopNav.svelte` — el mega-menú de vehículos ahora enruta las tarjetas de Dodge al slug correcto (`durango`/`journey`/`attitude`) en vez de solo filtrar.

## Imágenes
Se reutilizaron las imágenes ya alojadas en el bucket `storage.googleapis.com/.../prd-storytodesign.appspot.com/...` que el propio proyecto ya usa en `GlassTopNav.svelte` para Durango, Attitude y Journey (mismo dominio ya usado en producción, no son placeholders inventados). **Pendiente:** el usuario mencionó que faltan imágenes definitivas — cuando las proporcione, reemplazar las constantes `DURANGO_IMG`, `ATTITUDE_IMG`, `JOURNEY_IMG` en ambos componentes.

## Verificación
- `npm run build` → compiló sin errores (solo warnings de accesibilidad preexistentes en `ContactFormCard.svelte`, no relacionados).
- `npm run check` (svelte-check) → **0 errores**, 238 warnings (todos preexistentes salvo 2 warnings menores de "unused CSS selector" en `DodgePremiumLanding.svelte`, idénticos a los que ya tiene `RamPremiumLanding.svelte`).

## Pendiente
- Reemplazar imágenes hotlinked por assets oficiales definitivos cuando el usuario los proporcione.
- Charger usa temporalmente la misma imagen que Durango (`DURANGO_IMG`) como hero/spotlight porque no había una imagen de Charger disponible en el bucket existente; reemplazar cuando haya asset propio.

## Corrección de estilo (2026-08-17)
El usuario reportó que el diseño de Dodge (y Ram/Peugeot) no coincidía con el patrón visual "revamp" de Jeep/Fiat. La primera versión de `DodgeBrandHub.svelte`/`DodgePremiumLanding.svelte` había clonado accidentalmente el patrón VIEJO (hero estático de una sola imagen, sin carrusel autoplay, sin `story-reel`, sin `pin-stage`). Se reescribieron ambos componentes desde cero usando `FiatBrandHub.svelte`/`FiatPremiumLanding.svelte` como plantilla estructural literal (mismas clases CSS: `hub-hero`, `hero-copy-new`, `promo-card`/`pc-*`, `story-reel`, `stat-strip`, `cotizar-band` en el Hub; `pin-stage`, `spec-band`, `motion-gallery`, `story-stack`, `cockpit`, `capability`, `safety-section`, `quote-section` en el Landing), solo cambiando paleta (`#D50000`/`#8C0000`), copy y modelos. Se omitió la sección de "versiones/colores" (selector de colores de carrocería) porque no hay swatches reales de Dodge disponibles; el `pin-stage` usa una imagen fija en vez de video pineado por el mismo motivo (no hay video oficial de Dodge disponible). El resto de la estructura es fiel al patrón Jeep/Fiat. Verificado con `npm run check` (0 errores) y `npm run build` (compila sin errores).

## Sección de versiones/colores reales (2026-08-17, corrección 2)
El usuario corrigió que sí existen datos reales de versiones/colores para Attitude 2026 — pegó el HTML del configurador de dodge.com.mx que muestra 3 versiones (SXT, SPORT, GT, todas "Desde $364,900") cada una con su propio set de colores de carrocería. Se agregó la sección `<section id="versiones" class="vs">` en `DodgePremiumLanding.svelte` (visible solo cuando `modelSlug === 'attitude'`), clonando literalmente el markup/CSS de la sección `vs` de `FiatPremiumLanding.svelte` (mismo componente: `vs-pill-bar` para elegir versión, `vs-showcase`/`vs-color-bar`/`vs-dots` para el selector de color con imagen grande, `vs-panel-toggle` para alternar Exterior/Equipamiento, `vs-feat-grid` con "ver más equipamiento", `vs-exterior-row` con 3 ángulos, `vs-actions` con Cotizar/Prueba de manejo), solo adaptando la paleta a `var(--dodge-hover)` (`#8C0000`).

Datos reales usados (todos con imágenes reales bajo `https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/...`, mismo dominio ya usado en el resto del componente):
- **SXT** — Desde $364,900 — colores Blanco, Granito, Plata Estelar — equipamiento: motor 1.5L Turbo 168HP, transmisión automática 7 vel. clutch dual, pantalla 10.25", 6 bolsas de aire, EPB con Autohold, etc.
- **SPORT** — Desde $364,900 — colores Blanco, Granito, Negro Brillante, Plata Estelar — equipamiento adicional: escape performance, panel LCD 10.25", 9 asistencias ADAS nivel 2, asientos ventilados, quemacocos eléctrico, rines 18".
- **GT** — Desde $364,900 — colores Blanco, Granito, Negro Brillante, Plata Estelar — equipamiento adicional: detección de punto ciego, interior deportivo negro/rojo, rines 18" negro satinado, alerón trasero deportivo.

Se agregó también el link `Versiones` al nav sticky del producto (solo para el slug `attitude`). Verificado con `npm run check` (0 errores) y `npm run build` (compila sin errores). **Pendiente:** el mismo tratamiento (sección de versiones reales) no se aplicó a Charger/Durango ni a Ram/Peugeot — solo se hizo para Attitude porque es el único dato real que el usuario proporcionó; se puede replicar el mismo patrón para las demás si se consigue la data de sus configuradores oficiales.
