# RAM 1500 RHO — Implementation Log

## Resumen
`RamBrandHub.svelte` y `RamPremiumLanding.svelte` ya existían y estaban conectados en `App.svelte`, pero usaban el patrón visual VIEJO (hero estático de una sola imagen con overlay fijo, tarjetas simples `slide-glass`, sin carrusel autoplay, sin `story-reel`, sin `pin-stage`), inconsistente con el diseño "revamp" cinematográfico ya aplicado a Jeep y Fiat. El usuario señaló esta inconsistencia (mismo comentario que ya le había hecho antes a Gemini).

## Cambio realizado
Se reescribieron ambos componentes usando `FiatBrandHub.svelte`/`FiatPremiumLanding.svelte` como plantilla estructural literal: mismas clases CSS del Hub (`hub-hero`, `hero-copy-new`, carrusel autoplay con `carousel-pill`, `promo-card`/`pc-*`, `story-reel`, `stat-strip`, `cotizar-band`) y del Landing (`pin-stage`, `spec-band`, `motion-gallery`, `story-stack`, `cockpit`, `capability`, `safety-section`, `quote-section`), solo cambiando paleta Ram (`#880D00` / `#BA0000`), copy y modelos. Se conservaron los datos/precios/imágenes ya existentes (rutas locales `/adistem2026/ram-lineup/*.jpg`, pendientes de assets definitivos).

Modelo insignia (landing completo): **RAM 1500 RHO** — ya era el modelo con más protagonismo en la versión anterior. Secundarios en el carrusel del Hub: 1500 Tungsten, 700, 1500, 1200 — todos con ficha propia en el Landing (no solo fallback).

Se omitió la sección de "versiones/colores" (no hay swatches reales de Ram) y el `pin-stage` usa imagen fija en vez de video pineado (no hay video oficial disponible).

## Archivos modificados
- `src/lib/components/RamBrandHub.svelte`
- `src/lib/components/RamPremiumLanding.svelte`

No se tocó `src/App.svelte`, `GlassSidebar.svelte` ni `GlassTopNav.svelte` — el wiring ya era correcto.

## Verificación
- `npm run check` (svelte-check) → 0 errores.
- `npm run build` → compila sin errores.

## Pendiente
- Reemplazar las imágenes locales `/adistem2026/ram-lineup/*.jpg` por assets oficiales definitivos cuando el usuario los proporcione (mismo pendiente que Dodge y Peugeot).

## Sección de versiones/colores reales (2026-08-17, corrección 2)

El usuario pegó el HTML real del `StaticConfigurator` de `ram.com/mx/rho.html` (RAM 1500 RHO 2026,
trim único `rho_i6_turbo_ho_4x4`) con 5 colores reales: Billet Silver, Bright White, Diamond Black,
Flame Red, Hydro Blue. Se agregó la sección `<section id="versiones" class="vs">` en
`RamPremiumLanding.svelte` (visible solo cuando `modelSlug === '1500-rho'`), clonando literalmente
markup/CSS de la sección `vs` de `DodgePremiumLanding.svelte` (mismo componente: `vs-showcase`/
`vs-color-bar`/`vs-dots` para el selector de color con imagen grande real, `vs-panel-toggle` para
alternar Exterior/Equipamiento, `vs-feat-grid` con equipamiento real y "ver más", `vs-exterior-row`
con 3 fotos, `vs-actions`). A diferencia de Dodge Attitude (3 trims), RHO es un **trim único**, así
que `vs-pill-bar` quedó con un solo botón "RHO" fijo (sin lógica de selección de versión, solo el
selector de color).

Todas las imágenes verificadas con `fetch(url, {method:'HEAD'})` → 200 antes de usarlas, bajo el
dominio `https://www.ram.com` (sin `/mx`), mismo patrón que Dodge.

**Corrección importante de datos:** al navegar `ram.com/mx/rho.html` se encontró que el precio real
de RHO es **Desde $2,333,700** (vigente agosto 2026) — muy distinto del `$1,290,000` que tenía el
archivo (ese precio genérico aplicaba a otros RAM 1500, no a RHO, que es el trim de alto desempeño
más caro de la gama). También se reemplazaron los specs vagos (`RHO`/`4x4`/`Wide`/`Sport`) por datos
reales: motor dual turbo Hurricane 3.0L I6 (540 hp / 521 lb-pie), 9 modos de manejo, remolque 3,800 kg.
Equipamiento real agregado: asientos de piel 12 posiciones con masaje, pantalla 14.5" Uconnect 5,
pantalla 10.25" para pasajero, clúster 12", audio Harman Kardon 19 bocinas, cargador inalámbrico dual,
espejo retrovisor digital, 100+ funciones de seguridad.

Se agregaron 3 imágenes reales adicionales (`featurepanel-01`, `featurepanel-04-radiobutton-01`,
`tabcontainer-01`, todas verificadas 200) para el `vs-exterior-row`, sin tocar los arrays compartidos
`story`/`motionCards`/`cockpitImages` (esos aplican a los 5 modelos de Ram, no solo RHO — fuera de
scope de esta corrección puntual).

Verificado con `npm run check` (0 errores) y `npm run build` (compila sin errores). Tabla de estado
en `AGENTS.md` actualizada.
