# Peugeot 2008 — Implementation Log

> ⚠️ **Actualización 2026-08-17: el modelo insignia cambió de 2008 a 5008** por
> instrucción explícita del usuario ("la de peugeot la 5008"). El nombre de este archivo
> quedó desactualizado a propósito para no perder el historial — el insignia actual es
> **Peugeot 5008**, con `PeugeotPremiumLanding.svelte` (`modelSlug` default `'5008'`) y
> `PeugeotBrandHub.svelte` (`selectModel()` forzando `'5008'` siempre) ya corregidos.
> 2008 y 3008 siguen visibles en el carrusel del Hub pero ya no son el destino de ningún
> CTA. Ver `AGENTS.md` sección 4 y 4.1 para el detalle completo de esta corrección.

## Resumen
Se habilitó la sección de marca Peugeot en el sitio VAPSA, siguiendo el mismo patrón de Hub + Landing premium que ya existía para Jeep, Ram y Fiat. El modelo insignia con landing completamente construido era originalmente **Peugeot 2008 2026** — desde 2026-08-17 es **Peugeot 5008**, ver nota arriba.

## Por qué 2008 como modelo insignia
Peugeot México vende 2008, 3008, 5008, Rifter, Partner Rapid, Partner, Expert y Manager. Se eligió el **2008** porque es la SUV compacta que Peugeot destaca como protagonista en el hero de peugeot.com.mx ("NUEVA PEUGEOT 2008 — Una SUV con la actitud, tecnología y presencia que acompañan todo lo que estás construyendo", con el bono más agresivo del sitio: $52,000 + tasa 7.99%). Es el rol equivalente al de Jeep Renegade y Fiat Pulse 2026: la SUV compacta de entrada que define la marca. 3008, 5008 y Partner se muestran en el carrusel del Hub y en el mega-menú, y también tienen ficha propia completa en el Landing (no solo fallback).

Nota: el usuario mencionó "renegade.html" en la URL de Peugeot que compartió, pero Peugeot no comercializa un modelo llamado Renegade en México (ese nombre es de Jeep) — se asume que fue un error de copiado/concatenación de URLs en el mensaje original. Se verificó navegando peugeot.com.mx que el catálogo real es 2008/3008/5008/Rifter/Partner Rapid/Partner/Expert/Manager.

## Archivos creados
- `src/lib/components/PeugeotBrandHub.svelte` — Hub de marca con hero, carrusel de modelos (2008, 3008, 5008, Partner), sección "elige por necesidad" y lineup completo. Paleta Peugeot: `#0074E8` (default) / `#0057AD` (hover).
- `src/lib/components/PeugeotPremiumLanding.svelte` — Landing premium con scroll-driven animations, specs, galería, secciones de historia y CTA de cotización/prueba de manejo/cita de servicio. Contiene fichas completas para los 4 slugs: `2008`, `3008`, `5008`, `partner`.

## Archivos modificados
- `src/App.svelte` — imports de los nuevos componentes, estado `peugeotModelSlug`, handler `handlePeugeotModelSelect`, routing en `syncBrandFromUrl` (`/adistem2026/peugeot/:slug/`), reseteo del slug en `handleHomeClick`/`handleBrandSelect`/`scrollToPromociones`, bloques condicionales de render, extensión de `onModelSelect` del mega-menú y del modo de `MobileBottomNav`.
- `src/lib/components/GlassSidebar.svelte` — `enabled: false → true` para Peugeot (y también para Dodge y Ram — Ram ya tenía su Hub/Landing completamente funcional en `App.svelte` pero seguía deshabilitado en el sidebar; se corrigió como parte de esta tarea de "habilitar las demás secciones").
- `src/lib/components/GlassTopNav.svelte` — el mega-menú de vehículos ahora enruta las tarjetas de Peugeot al slug correcto (`2008`/`3008`/`5008`/`partner`) en vez de solo filtrar.

## Imágenes
Se reutilizaron las imágenes ya alojadas en el bucket `storage.googleapis.com/.../prd-storytodesign.appspot.com/...` que el propio proyecto ya usa en `GlassTopNav.svelte` para Nueva 2008, Nueva 3008, Nueva 5008 y Nueva Partner (mismo dominio ya usado en producción, no son placeholders inventados).

## Verificación
- `npm run build` → compiló sin errores (solo warnings de accesibilidad preexistentes en `ContactFormCard.svelte`, no relacionados).
- `npm run check` (svelte-check) → **0 errores**, 238 warnings (todos preexistentes salvo 2 warnings menores de "unused CSS selector" en `PeugeotPremiumLanding.svelte`, idénticos a los que ya tiene `RamPremiumLanding.svelte`).

## Pendiente
- Reemplazar imágenes hotlinked por assets oficiales definitivos cuando el usuario los proporcione.
- Confirmar con el usuario si "renegade.html" en su mensaje original se refería a otra cosa (posible error de copiado); de ser así, ajustar el modelo insignia.

## Corrección de estilo (2026-08-17)
El usuario reportó que el diseño de Peugeot (y Ram/Dodge) no coincidía con el patrón visual "revamp" de Jeep/Fiat. La primera versión de `PeugeotBrandHub.svelte`/`PeugeotPremiumLanding.svelte` había clonado accidentalmente el patrón VIEJO (hero estático, sin carrusel autoplay, sin `story-reel`, sin `pin-stage`). Se reescribieron ambos componentes usando `FiatBrandHub.svelte`/`FiatPremiumLanding.svelte` como plantilla estructural literal (mismas clases CSS del sistema Hub: `hub-hero`, `hero-copy-new`, `promo-card`/`pc-*`, `story-reel`, `stat-strip`, `cotizar-band`; y del Landing: `pin-stage`, `spec-band`, `motion-gallery`, `story-stack`, `cockpit`, `capability`, `safety-section`, `quote-section`), solo cambiando paleta (`#0074E8`/`#0057AD`), copy y modelos. Se omitió la sección de "versiones/colores" (selector de colores de carrocería) por no contar con swatches reales de Peugeot; el `pin-stage` usa imagen fija en vez de video pineado por no haber video oficial disponible. Verificado con `npm run check` (0 errores) y `npm run build` (compila sin errores).

## Sección de versiones/colores real del 5008, completa (2026-08-17, corrección 2)
El usuario detectó en `/adistem2026/peugeot/5008/` que la sección `#versiones` ya existía (un intento anterior, probablemente de otra sesión de Gemini, había agregado `PeugeotVersions` con 1 sola versión "5008 GT" y 4 colores) pero estaba **incompleta** respecto al patrón completo de Fiat/Jeep/Dodge Attitude: le faltaban `vs-panel-toggle` (Exterior/Equipamiento), `vs-feat-grid` con equipamiento real, `vs-exterior-row` con 3 ángulos, y `vs-actions`. Además el precio (`$779,900`) no coincidía con el precio oficial.

Se navegó `https://www.peugeot.com.mx/gama/nuevo-5008.html` y `https://www.peugeot.com.mx/adquiere-tu-peugeot/lista-de-precios.html` (agosto 2026) para obtener los datos reales:
- El 5008 en realidad tiene **2 versiones** publicadas en la lista de precios (la página de producto solo muestra "GT" como historia de marketing, pero el catálogo de precios revela ambas): **5008 GT** — Desde $754,900 — y **5008 GT Black Edition** — Desde $795,900.
- Los 4 colores ya existentes (Azul Ingaro, Gris Titane, Gris Artense, Blanco Okenite) resultaron ser **correctos** — se verificaron sus URLs `frente` navegando/cargando cada imagen directamente (`Image().onload`), las 4 cargan con 200. Se agregaron también sus variantes `atras` (ej. `5008-blanco-okenite-atras.jpg`, patrón `-atras` no `-trasera`) para completar `vs-exterior-row` con foto real de frontal + trasera + lateral (esta última usando el hero general `5008-dk.jpg`).
- Equipamiento real agrupado en 2 listas por versión (motor 1.6L Turbo 180hp, transmisión automática 6 vel., i-Cockpit® Panorámico 21", asientos Dynamic con masaje, 10 ADAS, cámara 360°, 6 bolsas de aire, etc.), extraído del texto real de la página de producto — no se inventó ningún dato.

Se completó `PeugeotVersions` en `PeugeotPremiumLanding.svelte` con estos 2 trims reales, y se agregó el markup+CSS faltante (`vs-panel-toggle`, `vs-feat-grid`/`vs-feat-card`/`vs-feat-more`/`vs-more-btn`, `vs-exterior-row`/`vs-ext-card`, `vs-actions`/`vs-action`) clonado literal de `DodgePremiumLanding.svelte` (mismo componente, solo cambia `var(--peugeot-hover)` en vez de `var(--dodge-hover)`). Verificado con `npm run check` (0 errores) y `npm run build` (compila sin errores).
