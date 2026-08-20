# AGENTS.md — Guía para agentes de IA (Claude, Gemini, Cursor, etc.)

> Este archivo es la bitácora maestra y el estándar a seguir para trabajar en las
> páginas de marca (Jeep, Fiat, Ram, Dodge, Peugeot) del sitio VAPSA. Si eres un
> agente de IA (Gemini, Claude, o cualquier otro) y te piden tocar `*BrandHub.svelte`
> o `*PremiumLanding.svelte`, **lee esto primero**. Evita repetir errores que ya
> pasaron aquí (dos veces).

## 1. El patrón obligatorio (Hub + Premium Landing)

Cada marca tiene dos componentes en `src/lib/components/`:

- **`<Marca>BrandHub.svelte`** — página de aterrizaje de la marca. Hero full-bleed con
  carrusel autoplay de varios modelos, tarjetas de vidrio con los modelos secundarios,
  y una sección cinematográfica tipo "story".
- **`<Marca>PremiumLanding.svelte`** — ficha detallada de UN modelo (`modelSlug` como prop).

La plantilla estructural de referencia es **`FiatBrandHub.svelte` /
`FiatPremiumLanding.svelte`** (idéntica a `JeepBrandHub.svelte` / `JeepPremiumLanding.svelte`,
que fue el rediseño original — rama `jeep-hub-renegade-revamp`). **Cualquier marca nueva
o corregida debe clonar esta estructura literalmente**, no reinventar un layout más simple.

Clases/secciones que SIEMPRE deben existir (cópialas del Fiat, no las aproximes):

**BrandHub:**
`hub-hero` (hero con carrusel autoplay de modelos, `hero-copy-new`, `carousel-pill`
con play/pause), `model-carousel` con tarjetas `promo-card`/`pc-glass-bg`/`pc-img-wrap`/
`pc-badge-promo`, `story-reel` (paneles alternados tipo "Aventura Urbana" / "Familia &
Espacio"), `stat-strip`, `cotizar-band` con selector de modelo.

**PremiumLanding:**
hero con `hero-copy`, `pin-stage` (visual grande, video pineado al hacer scroll si hay
uno oficial disponible — si no, imagen fija, pero **no borres la sección**), **`versiones`
(`vs-*`) — ver punto 2, es obligatoria si hay datos reales**, `spec-band`, `motion-gallery`,
`story-stack`, `cockpit` (carrusel de interiores), `capability`, `safety-section`
(carrusel ADAS si hay videos reales), `quote-section` final.

Contrato de props/IDs que **no se debe romper** porque `App.svelte` depende de ellos:
- Landing recibe `modelSlug: string | null`.
- Hub recibe `onModelSelect?: (slug: string) => void`.
- IDs de formulario: `brandhub-desktop-form`, `brandhub-mobile-form`, `mobile-hero-form`
  (usados por `handleCotizarMobile`/`handlePruebaMobile` en `App.svelte` vía
  `document.getElementById`).
- `ContactFormCard` con `accent` (hex de marca) e `initialBrand` correctos.

## 2. La sección "versiones" (`vs-*`) — selector de colores/trims — **es obligatoria cuando hay datos reales**

**Error que ya se cometió dos veces:** un agente asumió "no hay datos reales de
versiones/colores para Dodge/Ram/Peugeot" y omitió la sección por completo. Era falso —
el configurador real de dodge.com.mx (y previsiblemente ram.com/mx, peugeot.com.mx)
sí publica trims y swatches de color reales, con imágenes en su CDN. **No asumas que no
existen: ve a buscarlos antes de omitir la sección.**

Estructura exacta a clonar (de `FiatPremiumLanding.svelte`, sección `id="versiones"`,
clase `vs`): `vs-pill-bar` (botones para elegir versión/trim), `vs-title-row` con precio,
`vs-showcase` + `vs-color-bar` + `vs-dots` (imagen grande que cambia según el color
elegido, con `--dot-color` aproximado al color real), `vs-panel-toggle` (alternar
"Exterior" / "Equipamiento"), `vs-feat-grid` con botón "ver más equipamiento" (agrupa
el equipamiento real en 2 arrays), `vs-exterior-row` (3 fotos: lateral/frontal/trasera,
no repitas la misma), `vs-actions` (Cotizar / Prueba de manejo).

**Cómo conseguir los datos reales sin inventar nada:**
1. Navega (con las herramientas de browser, no adivines URLs) a la página del modelo en
   el sitio oficial de la marca (ej. `dodge.com/mx`, `jeep.com.mx`, `fiat.com.mx`,
   `ram.com/mx`, `peugeot.com.mx`).
2. Estos sitios (todos AEM/Stellantis) suelen tener un componente `ModelWalk` /
   configurador embebido con un `data-props` que trae un JSON completo: trims, precios,
   colores (`label`, `image` del swatch chico, y la imagen grande por breakpoint
   `xs/sm/md/lg`), y bullets de equipamiento por trim. Extrae ese JSON en vez de adivinar.
3. Las imágenes son rutas `/content/dam/cross-regional/nafta/<marca>/es_mx/...` —
   **verifica el dominio real navegando directamente a la URL de la imagen antes de
   usarla** (algunos sitios usan `https://www.<marca>.com/content/dam/...` sin prefijo
   de país en la ruta, aunque el sitio se navegue bajo `/mx/`; no asumas, confirma con un
   200 real). Para Dodge, el dominio correcto resultó ser `https://www.dodge.com` **sin**
   `/mx`.
4. Si genuinamente no hay swatches/trims publicados para un modelo (verificado, no
   asumido), es aceptable omitir la sección `vs-*` temporalmente — pero dejar una nota
   explícita en el log de esa marca diciendo qué se intentó y por qué no se encontró.

## 3. Cómo se sourcean las imágenes en general

- Prioridad 1: imágenes reales hotlinked del sitio oficial de la marca (mismo patrón que
  ya usa Fiat con `fiat.com.mx` y Jeep con `jeep.com.mx`). Verifica que carguen antes de
  usarlas.
- Prioridad 2: el bucket `storage.googleapis.com/.../prd-storytodesign.appspot.com/...`
  que el propio proyecto ya usa en `GlassTopNav.svelte` para varios modelos — no son
  placeholders inventados, es contenido real ya en producción del sitio.
- **Variedad por sección:** no repitas la misma imagen en hero + story-reel + cockpit.
  Cada sección tiene una intención temática (hero = exterior dinámico, cockpit = interior
  real, story-reel = lifestyle/detalle) y necesita una foto distinta que la respalde.
- Nunca inventes una URL de imagen sin haberla confirmado (navegación directa o petición
  que responda 200). Una URL rota es peor que reusar una imagen ya validada.

## 4. Estado actual por marca (última actualización: 2026-08-17)

**Modelo insignia = ÚNICO modelo por marca. Es la fuente de verdad, no la cambies sin que el usuario lo pida explícitamente:**

| Marca | Modelo insignia | Hub/Landing con patrón Fiat/Jeep | Sección `versiones` real | Pendiente |
|---|---|---|---|---|
| Jeep | Renegade | ✅ (original) | ✅ | — |
| Fiat | Pulse 2026 | ✅ (original) | ✅ | — |
| Ram | 1500 RHO 2026 | ✅ | ✅ (trim único, 5 colores reales, verificado 2026-08-17) | — |
| Dodge | Attitude 2026 | ✅ | ✅ (SXT/SPORT/GT, colores y equipamiento reales) | Charger y Durango siguen sin `versiones` real |
| Peugeot | **5008** (⚠️ cambió de 2008 a 5008 el 2026-08-17 por instrucción explícita del usuario) | ✅ | ✅ (GT / GT Black Edition, colores y equipamiento reales, verificado 2026-08-17) | 2008 y 3008 ya no son insignia, pero siguen visibles en el carrusel del Hub |

**Nota importante sobre Peugeot:** la página de producto (`/gama/nuevo-5008.html`) dice "una sola versión" pero eso es solo copy de marketing — el catálogo real (`/adquiere-tu-peugeot/lista-de-precios.html`) reveló que sí hay 2 trims (GT y GT Black Edition) con precios distintos. **Siempre cruza la página de producto con la lista de precios antes de asumir cuántas versiones tiene un modelo.**

### 4.1 Regla: un solo modelo insignia por marca, y TODOS los CTA deben forzar ese modelo

El usuario fue explícito (2026-08-17): cada marca muestra varios modelos de forma visual
(carrusel del Hub, `story-reel`, mega-menú de navegación) pero **todo CTA de "Explorar" /
"Ver modelo" / tarjeta de vehículo, sin importar cuál se haya clickeado, debe navegar
SIEMPRE al modelo insignia único de esa marca**. Nunca dejes pasar el `slug` clickeado
tal cual a `onModelSelect` — fuerza el insignia dentro de la función `selectModel()` del
Hub (mira `JeepBrandHub.svelte` como referencia correcta: `onModelSelect?.('renegade')`
sin importar el argumento). Esto aplica igual al mega-menú de vehículos en
`GlassTopNav.svelte` (línea ~594 en adelante) — cada marca ahí también debe forzar su
slug insignia, no bifurcar por `vehicle.model`.

**Se encontraron y corrigieron estos bugs el 2026-08-17** (no los repitas si reescribes
estos archivos desde cero):
- `FiatBrandHub.svelte` — el comentario decía "todo va a Pulse" pero el código dejaba
  pasar `fastback`/`argo`/`pulse-abarth` tal cual. Corregido para forzar `'pulse2026'`.
- `RamBrandHub.svelte` / `DodgeBrandHub.svelte` / `PeugeotBrandHub.svelte` — `selectModel()`
  no forzaba nada, pasaba el slug clickeado directo. Corregido para forzar
  `'1500-rho'` / `'attitude'` / `'5008'` respectivamente.
- `GlassTopNav.svelte` (mega-menú) — Dodge y Peugeot bifurcaban por `vehicle.model` a
  slugs distintos (`durango`/`journey`/`attitude`, `2008`/`3008`/`5008`/`partner`); Ram y
  Fiat ni siquiera navegaban a una ficha (solo filtraban). Corregido: las 5 marcas ahora
  navegan directo a su modelo insignia sin importar la tarjeta.
- `FiatBrandHub.svelte` tenía `selectedQuoteModel = $state('renegade')` (residuo de
  copiar Jeep, no era ni siquiera un modelo Fiat válido) y `PeugeotBrandHub.svelte` seguía
  en `'2008'` — corregidos a `'pulse'` y `'5008'`.
- `Fiat`: El modelo **Argo 2026** fue eliminado de la gama FIAT (2026-08-19) a petición del usuario. La gama activa de Fiat 2026 incluye Pulse, Pulse Abarth y Fastback.
- **Imágenes de Promociones y Brand Hubs (2026-08-19):** Todas las tarjetas del carrusel de modelos de los Brand Hubs (`*BrandHub.svelte`), la sección `#promociones` (`PromoBentoGrid.svelte`) y el mega-menú (`GlassTopNav.svelte`) fueron actualizadas para consumir las imágenes locales en `public/promociones/` con ruta `/adistem2026/promociones/<archivo>.jpg`.
- **Textos de Promociones en Brand Hubs (2026-08-19):** Todos los carruseles de modelos en `*BrandHub.svelte` consumen ahora el campo dinámico `promo` coincidente con las ofertas oficiales reflejadas en `PromoBentoGrid.svelte`.
- **Dodge Journey 2026:** El modelo **Journey** fue desactivado y eliminado por completo de la gama nueva de Dodge (Brand Hub, Landing, Mega-menú, Bento Grid de Promociones) el 2026-08-19 por instrucción del usuario.
- **Precios Actualizados (2026-08-19):** Se sincronizaron los nuevos precios de lista para Wrangler ($1,103,900), Compass ($546,900), Commander ($720,900), Renegade ($461,900), Pulse ($349,500), Fastback ($463,500), Durango ($2,179,900), Attitude ($364,900), Peugeot 2008 ($458,900), Peugeot 5008 ($754,900), Peugeot 3008 ($629,900), Peugeot Partner ($439,900), RAM 1500 ($1,293,700) y RAM 1200 ($409,900).

Logs detallados por marca (qué se hizo, por qué, qué falta): `dodge_attitude_implementation_log.md`,
`peugeot_2008_implementation_log.md`, `ram_1500rho_implementation_log.md`.

## 5. Errores ya cometidos (no los repitas)

1. **Clonar el patrón viejo en vez del nuevo.** Ram tenía un diseño simple (hero estático,
   sin `story-reel`, sin `pin-stage`) y un agente clonó ESE patrón para Dodge/Peugeot en
   vez de usar Fiat/Jeep como referencia. Siempre compara contra `FiatBrandHub.svelte`
   antes de dar por terminado un Hub nuevo.
2. **Asumir que no hay datos reales de versiones/colores sin verificar.** Pasó con Dodge
   Attitude — sí existían, solo había que navegar al configurador real del sitio oficial.
3. **Un fork que "termina" en segundos sin ejecutar ninguna herramienta.** Si delegas
   trabajo a un sub-agente y su resultado llega sin `tool_uses` reales, no confíes en el
   resumen — verifica con `git status` que los archivos realmente cambiaron antes de
   reportarle al usuario que algo se hizo.

## 6. Verificación antes de reportar terminado

Siempre, antes de decir "listo":
```
npm run check   # svelte-check, debe dar 0 errores
npm run build   # debe compilar sin errores
```
Y confirmar con `git status --short` que los archivos que dices haber tocado realmente
cambiaron en disco. No reportes trabajo hecho sin esta verificación.

## 7. Manejo de assets locales (imágenes) y Vite

Cuando se requiera reemplazar imágenes en el sitio por versiones locales (`.jpg`, `.png`, etc.), sigue estrictamente este flujo:

1. **Ubicación obligatoria:** Las imágenes **NUNCA** deben guardarse manualmente en la carpeta `dist/`. Vite borra y reconstruye la carpeta `dist/` en cada `npm run build`, por lo que cualquier archivo ahí se perderá. Las imágenes estáticas locales deben colocarse dentro de la carpeta `public/` (ej. `public/jeep-toolkit/nombre-imagen.jpg`).
2. **Rutas en el código:** Dado que Vite está configurado con un `base` de `/adistem2026/` (nombre del repo), la URL que escribas en el componente Svelte debe incluir esta base como ruta absoluta y omitir la palabra `public` (ej. `src="/adistem2026/jeep-toolkit/nombre-imagen.jpg"`). Esto garantiza que la imagen cargue correctamente tanto en modo local (dev) como en producción (GitHub Pages).
3. **Múltiples breakpoints:** En el componente `BrandHub` (sección `story-reel`), recuerda reemplazar la imagen tanto en la etiqueta `<img class="story-mobile-img" src="...">` (para la vista móvil) como en el inline style `style="background-image: url(...)"` del contenedor (para escritorio).
4. **Galerías dinámicas:** En `PremiumLanding` (ej. `motionCards`), las imágenes suelen dictarse por arrays en la etiqueta `<script>` (como `motionImages`, `storyImages`). Para actualizar una imagen de la galería, reemplaza la URL directamente en la posición correspondiente del array.

### 7.1 Estructura estándar de carpetas locales por modelo (`public/<marca>/<modelo-slug>/`)

Para cualquier modelo (Renegade, Attitude, Pulse, 1500 RHO, 5008, etc.), los assets locales se organizan y mapean a los componentes de la siguiente manera estandarizada:

1. **`hero/`** -> Hero de Landing (`*PremiumLanding.svelte`) y Brand Hub (`*BrandHub.svelte`)
   - `<modelo>.jpg` -> Hero Desktop (`heroImage` / `img.hero-desktop-img`)
   - `<modelo>-mob.jpg` -> Hero Mobile (`mobileHeroImage` / `img.hero-mobile-img`)
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/hero/<archivo>.jpg`

2. **`galeria/`** -> Selector de Vistas Exteriores en la sección `vs-exterior-row` (con modal zoom)
   - `vista-lateral.jpg` -> Botón "Vista lateral"
   - `vista-frontal.jpg` -> Botón "Vista frontal"
   - `vista-trasera.jpg` -> Botón "Vista trasera"
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/galeria/<archivo>.jpg`

3. **`exterior/`** -> Sección de diseño exterior (`#galeria` / `motion-gallery` / `motionImages` / `motionCards`)
   - `exterior-1.jpg`, `exterior-2.jpg`, `exterior-3.jpg`
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/exterior/<archivo>.jpg`

4. **`equipamiento/`** -> Sección de paneles apilados (`#equipamiento-exterior` / `story-stack` / `storyImages` / `story`)
   - `equipamiento-1.jpg`, `equipamiento-2.jpg`, `equipamiento-3.jpg`
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/equipamiento/<archivo>.jpg`

5. **`versiones/`** -> Selector interactivo de versiones y colores (`#versiones` / `vs-showcase` / `vs-color-bar`)
   - Subcarpetas por trim/versión: ej. `versiones/<trim-nombre>/<color>.avif` o `.png`
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/versiones/<trim>/<archivo>`

6. **`interior/`** -> Carrusel de Interiores (`.cockpit-carousel` / `cockpitImages`)
   - `interior-1.jpg`, `interior-2.jpg`, `interior-3.jpg`
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/interior/<archivo>.jpg`

7. **`capacidad/`** -> Sección de Capacidad y Desempeño (`#capacidad` / `.capability`)
   - `capacidad.jpg` -> Desktop (motor a la izquierda, espacio libre a la derecha para la tarjeta flotante)
   - `capacidad-mob.jpg` -> Mobile (`.cap-mobile-img` con `display: flex; flex-direction: column;` arriba de la tarjeta para evitar que la tarjeta tape la imagen)
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/capacidad/<archivo>.jpg`

8. **`seguridad/`** -> Carrusel de Sistemas de Asistencia ADAS (`#seguridad` / `adasItems`)
   - `seguridad-1.mp4` a `seguridad-4.mp4` (o videos/posters de ADAS)
   - *Ruta Vite:* `/adistem2026/<marca>/<modelo-slug>/seguridad/<archivo>.mp4`

