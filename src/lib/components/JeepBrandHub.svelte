<script lang="ts">
  import GoogleIcon from './GoogleIcon.svelte'

  type JeepModel = {
    slug: string
    name: string
    role: string
    image: string
    accent: string
    use: string
    stat: string
    metric: string
    detail: string
  }

  let { onModelSelect }: { onModelSelect?: (slug: string) => void } = $props()

  const A = '/adistem2026/jeep'
  const JEEP_DEFAULT = '#424D07'
  const JEEP_HOVER = '#5A690A'
  let activeModelIndex = $state(0)

  const CDN = 'https://www.jeep.com.mx/content/dam/cross-regional'

  const models: JeepModel[] = [
    {
      slug: 'renegade',
      name: 'Jeep Renegade',
      role: 'SUV compacto con espíritu aventurero',
      image: `${CDN}/nafta/jeep/es_mx/2026/renegade/vlp/desktop/my26-jeep-renegade-vlp-dk-mx.jpg.img.2880.jpg`,
      accent: JEEP_HOVER,
      use: 'Para la ciudad, carretera y escapadas de fin de semana.',
      stat: 'Aventura Urbana',
      metric: '1.3L Turbo 173 HP',
      detail: 'El SUV con más actitud: eficiente, tecnológico y con espíritu 4x4.',
    },
    {
      slug: 'compass',
      name: 'Jeep Compass',
      role: 'Estilo y tecnología en cada ruta',
      image: `${CDN}/nafta/jeep/es_mx/2026/compass/vlp/desktop/my26-jeep-compass-hero-vlp-inicio-mx-dk-v4.jpg.img.2880.jpg`,
      accent: JEEP_DEFAULT,
      use: 'Para familias jóvenes, ciudad y carretera con confort.',
      stat: 'Diseño & Confort',
      metric: 'AWD Disponible',
      detail: 'Diseñado para conquistarte: tecnología, espacio y presencia.',
    },
    {
      slug: 'commander',
      name: 'Jeep Commander',
      role: '7 plazas para todo lo que importa',
      image: `${CDN}/nafta/jeep/es_mx/2026/commander/vlp/desktop/my26-jeep-commander-inicio-hero-mx-dk-v1.jpg.img.2880.jpg`,
      accent: JEEP_HOVER,
      use: 'Para familia completa, viajes largos y versatilidad total.',
      stat: '7 Pasajeros',
      metric: 'Familia & Espacio',
      detail: 'Tres filas de asientos con confort y capacidad sin concesiones.',
    },
    {
      slug: 'cherokee',
      name: 'Jeep Cherokee',
      role: 'El SUV icónico reinventado',
      image: `${CDN}/global/jeep/2026/cherokee/vlp/desktop/my26-jeep-cherokee-overview-hero-main-inc-v2-desktop.jpg.img.2880.jpg`,
      accent: JEEP_DEFAULT,
      use: 'Para la ciudad cómoda, carretera diaria y fines de semana.',
      stat: 'Icónico',
      metric: '2.0T 270 HP',
      detail: 'Un clásico reinventado con potencia turbo y carácter Jeep.',
    },
    {
      slug: 'grand-cherokee',
      name: 'Grand Cherokee',
      role: 'Poder, lujo y presencia premium',
      image: `${CDN}/nafta/jeep/es_mx/2026/grand-cherokee/vlp/desktop/my26-jeep-grand-cherokee-inicio-hero-mx-dk.jpg.img.2880.jpg`,
      accent: '#7A5C3A',
      use: 'Para ejecutivos, familia premium y carretera de lujo.',
      stat: 'Premium',
      metric: 'V6 3.6L / 4xe',
      detail: 'El SUV más premiado: lujo real con capacidad off-road legendaria.',
    },
    {
      slug: 'wrangler',
      name: 'Jeep Wrangler',
      role: 'El todoterreno original y eterno',
      image: `${CDN}/nafta/jeep/es_mx/2026/wrangler/vlp/desktop/my26-jeep-wrangler-inicio-vlp-mx-dk.jpg.img.2880.jpg`,
      accent: JEEP_HOVER,
      use: 'Para aventura extrema, off-road y espíritu libre.',
      stat: 'Off-Road Total',
      metric: '4x4 con reducida',
      detail: 'Icónico, irreducible y sin límites. El Jeep definitivo.',
    },
    {
      slug: 'jt',
      name: 'Jeep JT Gladiator',
      role: 'La única pickup Jeep todoterreno',
      image: `${CDN}/nafta/jeep/es_mx/2026/jt-gladiator/vlp/desktop/my26-jeep-mojave-inicio-vlp-mx-dk.jpg.img.2880.jpg`,
      accent: '#8C6420',
      use: 'Para trabajo, aventura extrema y carga con tracción total.',
      stat: 'Pickup 4x4',
      metric: 'Cama + Off-Road',
      detail: 'La única pickup todoterreno con raíces Wrangler y cama abierta.',
    },
    {
      slug: 'grand-wagoneer-l',
      name: 'Grand Wagoneer L',
      role: 'El SUV de lujo más imponente',
      image: `${CDN}/nafta/jeep/es_mx/2026/grand-wagoneer-l/vlp/desktop/my26-jeep-grandwagoneerl-inicio-mainhero-dk-mx.jpg.img.2880.jpg`,
      accent: '#2C2C2C',
      use: 'Para ejecutivos, familia grande y viajes de primer nivel.',
      stat: 'Ultra Premium',
      metric: 'V8 6.4L 471 HP',
      detail: 'La cúspide del lujo americano: 8 plazas, V8 y tecnología de clase mundial.',
    },
  ]

  function selectModel(slug: string) {
    onModelSelect?.(slug)
  }

  function goToModel(index: number) {
    activeModelIndex = (index + models.length) % models.length
  }

  let isPlaying = $state(true)

  function togglePlay() {
    isPlaying = !isPlaying
  }

  $effect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      activeModelIndex = (activeModelIndex + 1) % models.length
    }, 4500)
    return () => clearInterval(id)
  })

  // Swipe táctil
  let touchStartX = 0
  let touchStartY = 0

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }

  function onTouchEnd(e: TouchEvent) {
    const dx = touchStartX - e.changedTouches[0].clientX
    const dy = touchStartY - e.changedTouches[0].clientY
    // Solo swipe horizontal claro (más dx que dy)
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    goToModel(dx > 0 ? activeModelIndex + 1 : activeModelIndex - 1)
  }

  // Pausar autoplay al hover del carrusel
  function onCarouselEnter() { isPlaying = false }
  function onCarouselLeave() { isPlaying = true }
</script>

<svelte:head>
  <title>JEEP | Gama 2026 en VAPSA</title>
</svelte:head>

<main class="jeep-hub">
  <section class="hub-hero">
    <img src={`${A}/hero.avif`} alt="JEEP Renegade en movimiento" />
    <div class="hero-inner">
      <p>Gama JEEP 2026</p>
      <h1>8 modelos. Una sola forma de vivir la aventura.</h1>
      <span>Desde la actitud urbana del Renegade hasta el lujo extremo del Grand Wagoneer L, encuentra el Jeep que encaja con tu ruta, tu familia y tu estilo.</span>
      <button onclick={() => selectModel('renegade')}>Ver modelos <GoogleIcon name="arrow_forward" size={18} /></button>
    </div>
  </section>

  <section
    class="model-carousel"
    aria-label="Modelos JEEP"
    onmouseenter={onCarouselEnter}
    onmouseleave={onCarouselLeave}>
    <div class="carousel-head">
      <div>
        <p>Explora la gama</p>
        <h2>8 Modelos Jeep 2026</h2>
      </div>
    </div>

    <div
      class="carousel-window"
      ontouchstart={onTouchStart}
      ontouchend={onTouchEnd}>
      <div class="model-track" style={`--active:${activeModelIndex};`}>
        {#each models as model, i (model.slug)}
          <article class:active={i === activeModelIndex} style={`--accent:${model.accent}`}>
            <img src={model.image} alt={model.name} />
            <div class="slide-glass">
              <small>{model.stat}</small>
              <h3>{model.name}</h3>
              <span>{model.role}</span>
              <i>{model.metric}</i>
              <p>{model.detail}</p>
              <button onclick={() => selectModel('renegade')}>Ver modelo <GoogleIcon name="arrow_forward" size={16} /></button>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <div class="carousel-controls">
      <div class="carousel-pill" aria-label="Seleccionar modelo">
        {#each models as model, i (model.slug)}
          <button
            class:active={i === activeModelIndex}
            aria-label={`Ver ${model.name}`}
            onclick={() => goToModel(i)}>
          </button>
        {/each}
      </div>
      <button
        class="play-btn"
        aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
        onclick={togglePlay}>
        <GoogleIcon name={isPlaying ? 'pause' : 'play_arrow'} size={16} />
      </button>
    </div>
  </section>

  <section class="chooser">
    <div class="chooser-copy">
      <p>Elige por necesidad</p>
      <h2>No todos los Jeep hacen lo mismo. Esa es la idea.</h2>
    </div>
    <div class="use-grid">
      <article>
        <GoogleIcon name="directions_car" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Aventura urbana</strong>
        <span>Renegade y Compass, con motor turbo y AWD disponible, para dominar la ciudad y las escapadas de fin de semana.</span>
      </article>
      <article>
        <GoogleIcon name="family_restroom" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Familia y espacio</strong>
        <span>Commander con 7 plazas y Grand Wagoneer L con 8 para viajes, colegio y todo lo que la familia necesita.</span>
      </article>
      <article>
        <GoogleIcon name="terrain" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Terracería y extremo</strong>
        <span>Wrangler y JT Gladiator cuando el camino sin pavimentar es parte del destino.</span>
      </article>
      <article>
        <GoogleIcon name="workspace_premium" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Lujo y presencia</strong>
        <span>Grand Cherokee y Grand Wagoneer L para quien exige potencia, confort y tecnología de clase mundial.</span>
      </article>
    </div>
  </section>

  <section class="lineup">
    <div class="lineup-head">
      <p>Modelos disponibles</p>
      <h2>La gama completa, en una sola vista.</h2>
    </div>
    <div class="lineup-grid">
      {#each models as model (model.slug)}
        <article style={`--accent:${model.accent}`}>
          <img src={model.image} alt={model.name} />
          <div>
            <small>{model.metric}</small>
            <p>{model.role}</p>
            <h3>{model.name}</h3>
            <span>{model.use}</span>
            <em>{model.detail}</em>
            <button onclick={() => selectModel('renegade')}>Explorar modelo <GoogleIcon name="arrow_forward" size={16} /></button>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="hub-cta">
    <GoogleIcon name="route" size={24} style="margin-bottom:20px;color:{JEEP_HOVER}" />
    <p>¿No sabes cuál te conviene?</p>
    <h2>Te ayudamos a elegir por uso, presupuesto y disponibilidad.</h2>
    <a href="https://wa.me/524871108899?text=Hola,%20quiero%20comparar%20modelos%20JEEP" target="_blank" rel="noopener noreferrer">Comparar por WhatsApp</a>
  </section>
</main>

<style>
  .jeep-hub {
    min-height: 100vh;
    background: #050507;
    color: white;
    font-family: Inter, Roboto, sans-serif;
    overflow: clip;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --hairline: rgba(255, 255, 255, 0.14);
    --jeep-default: #424D07;
    --jeep-hover: #5A690A;
    --brand-bg: #7f7f7f;
  }

  .jeep-hub * {
    box-sizing: border-box;
  }

  .hub-hero {
    min-height: clamp(620px, 92svh, 860px);
    position: relative;
    display: grid;
    align-items: center;
    overflow: hidden;
  }

  .jeep-hub::before {
    content: 'JEEP';
    position: fixed;
    z-index: 0;
    right: -0.06em;
    top: 38vh;
    color: rgba(255, 255, 255, 0.028);
    font-size: clamp(170px, 24vw, 430px);
    font-weight: 950;
    letter-spacing: 0;
    line-height: 1;
    pointer-events: none;
  }

  .hub-hero > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 66% center;
    filter: saturate(1.06) contrast(1.04) brightness(1.02);
    transform: scale(1.015);
    animation: hero-drift 9s var(--ease) both;
  }

  .hub-hero::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(140px, 22vh, 260px);
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(5, 5, 7, 0.45) 50%,
      rgba(5, 5, 7, 0.85) 78%,
      #050507 100%);
    pointer-events: none;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    width: min(360px, calc(36vw - 20px));
    margin: 0 0 0 clamp(22px, 5vw, 78px);
    padding: clamp(18px, 1.6vw, 24px) clamp(20px, 1.8vw, 26px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    background: rgba(5, 7, 18, 0.30);
    box-shadow:
      rgba(0, 0, 0, 0.55) 0 30px 80px,
      rgba(0, 0, 0, 0.20) 0 4px 16px,
      rgba(255, 255, 255, 0.05) 0 1px 0 inset;
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    animation: hero-copy-in 1100ms var(--ease) both 120ms;
  }

  .hero-inner::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    margin-bottom: 12px;
    background: linear-gradient(90deg, var(--jeep-hover), transparent);
  }

  .hero-inner p,
  .chooser-copy p,
  .lineup-head p,
  .hub-cta p {
    margin: 0 0 10px;
    color: var(--jeep-hover);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero-inner p {
    margin: 0 0 8px;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: color-mix(in srgb, var(--jeep-hover) 28%, rgba(255, 255, 255, 0.94));
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.50);
  }

  .hero-inner h1,
  .chooser-copy h2,
  .lineup-head h2,
  .hub-cta h2 {
    margin: 0;
    font-weight: 950;
    letter-spacing: -0.02em;
  }

  .hero-inner h1 {
    max-width: 320px;
    font-size: clamp(26px, 3vw, 38px);
    line-height: 1.05;
    font-weight: 900;
    letter-spacing: -0.025em;
  }

  .chooser-copy h2 {
    font-size: clamp(34px, 3.8vw, 52px);
    line-height: 1.08;
  }

  .lineup-head h2 {
    font-size: clamp(20px, 2.2vw, 28px);
    line-height: 1.15;
  }

  .hub-cta h2 {
    font-size: clamp(34px, 3.8vw, 52px);
    line-height: 1.08;
  }

  .hero-inner > span {
    display: block;
    max-width: 320px;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.70);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
  }

  .hero-inner button,
  .lineup-grid button,
  .hub-cta a {
    min-height: 48px;
    margin-top: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 22px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    color: white;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(18px);
    font-size: 14px;
    font-weight: 850;
    text-decoration: none;
    cursor: pointer;
    transition: transform 420ms var(--ease), background 420ms var(--ease);
  }

  .hero-inner button:hover,
  .lineup-grid button:hover,
  .hub-cta a:hover {
    transform: translateY(-2px);
    background: color-mix(in srgb, var(--accent, var(--jeep-hover)) 28%, rgba(255, 255, 255, 0.10));
  }

  .hero-inner button {
    min-height: 36px;
    margin-top: 18px;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .model-carousel {
    position: relative;
    z-index: 1;
    --card-w: clamp(370px, 39vw, 630px);
    --gap: clamp(18px, 2vw, 28px);
    padding: clamp(56px, 7vw, 98px) clamp(18px, 6vw, 90px);
    background:
      radial-gradient(circle at 78% 22%, rgba(136, 13, 0, 0.14), transparent 32%),
      linear-gradient(180deg, #050507 0%, #09090d 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 0% cover 26%;
  }

  .carousel-head {
    display: flex;
    align-items: end;
    gap: 20px;
    margin-bottom: clamp(24px, 3vw, 36px);
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: clamp(18px, 2.4vw, 30px);
  }

  .carousel-head p {
    margin: 0 0 8px;
    color: var(--jeep-hover);
    font-size: 11px;
    font-weight: 950;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .carousel-head h2 {
    margin: 0;
    font-size: clamp(30px, 3.5vw, 48px);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .play-btn {
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.86);
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 28px rgba(0,0,0,0.22);
    cursor: pointer;
    transition: transform 340ms var(--ease), background 340ms var(--ease), box-shadow 340ms var(--ease);
  }

  .play-btn:hover {
    transform: scale(1.08);
    background: rgba(255, 255, 255, 0.14);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 36px rgba(0,0,0,0.28);
  }

  .play-btn:active {
    transform: scale(0.95);
  }

  .carousel-window {
    overflow: hidden;
    border-radius: 30px;
    padding: 10px 0 14px;
  }

  .model-track {
    display: flex;
    gap: var(--gap);
    transform: translateX(calc(var(--active) * -1 * (var(--card-w) + var(--gap))));
    transition: transform 820ms var(--ease);
    will-change: transform;
  }

  .model-track article {
    flex: 0 0 var(--card-w);
    min-height: auto;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: stretch;
    overflow: hidden;
    text-align: left;
    color: white;
    padding: 12px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 34px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 70px rgba(0, 0, 0, 0.24);
    isolation: isolate;
    transform: translateZ(0);
    transition: transform 620ms var(--ease), border-color 620ms var(--ease), background 620ms var(--ease), box-shadow 620ms var(--ease);
  }

  .model-track article::before {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 12px 12px auto;
    height: clamp(240px, 28vw, 400px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    pointer-events: none;
    transition: border-color 620ms var(--ease), box-shadow 620ms var(--ease), transform 620ms var(--ease);
  }

  .model-track img {
    position: relative;
    width: 100%;
    height: clamp(240px, 28vw, 400px);
    object-fit: cover;
    object-position: top;
    background: #07070e;
    opacity: 0.94;
    transform: scale(1);
    border-radius: 24px;
    transition: transform 1200ms var(--ease), opacity 1200ms var(--ease), filter 1200ms var(--ease);
  }

  .model-track article::after {
    content: none;
  }

  .model-track article.active img {
    transform: scale(1);
    opacity: 1;
  }

  .model-track article.active::before {
    border-color: color-mix(in srgb, var(--accent) 55%, rgba(255,255,255,0.22));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      0 0 46px color-mix(in srgb, var(--accent) 20%, transparent);
    transform: scale(0.996);
  }

  .model-track article.active {
    background: rgba(255, 255, 255, 0.060);
    border-color: color-mix(in srgb, var(--accent) 34%, rgba(255,255,255,0.12));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 86px rgba(0, 0, 0, 0.32);
  }

  .slide-glass {
    position: relative;
    z-index: 3;
    width: 100%;
    min-height: auto;
    margin: 0;
    padding: 24px 10px 8px;
    display: flex;
    flex-direction: column;
    opacity: 1;
    transform: translateY(0);
    background: transparent;
    border: 0;
    box-shadow: none;
    transition: opacity 680ms var(--ease) 160ms, transform 680ms var(--ease) 160ms;
  }

  .slide-glass small {
    color: var(--accent);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .slide-glass h3 {
    margin: 10px 0 0;
    font-size: clamp(24px, 2.6vw, 36px);
    line-height: 1.05;
    letter-spacing: 0;
  }

  .slide-glass span {
    display: block;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.72);
    font-size: clamp(15px, 1.5vw, 19px);
  }

  .slide-glass i {
    position: relative;
    display: block;
    width: 100%;
    margin-top: 18px;
    padding-top: 13px;
    color: rgba(255, 255, 255, 0.74);
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    font-size: 11px;
    font-style: normal;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .slide-glass i::before {
    content: '';
    position: absolute;
    left: 0;
    top: -1px;
    width: 34%;
    height: 1px;
    background: var(--accent);
    box-shadow: 0 0 18px var(--accent);
    transform-origin: left;
    transform: scaleX(0.35);
    transition: transform 720ms var(--ease);
  }

  .model-track article.active i::before {
    transform: scaleX(1);
  }

  .slide-glass p {
    margin: 14px 0 0;
    color: rgba(255, 255, 255, 0.56);
    font-size: 14px;
    line-height: 1.55;
  }

  .slide-glass button {
    min-height: 44px;
    margin-top: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 18px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 999px;
    color: white;
    background: color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.08));
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
    transition: transform 420ms var(--ease), background 420ms var(--ease), border-color 420ms var(--ease);
  }

  .slide-glass button:hover {
    transform: translateY(-2px);
    background: color-mix(in srgb, var(--accent) 42%, rgba(255,255,255,0.10));
    border-color: color-mix(in srgb, var(--accent) 46%, rgba(255,255,255,0.22));
  }

  .carousel-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 19px 22px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 999px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 28px rgba(0,0,0,0.20);
  }

  .carousel-pill button {
    width: 7px;
    height: 7px;
    min-height: unset;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.28);
    cursor: pointer;
    transition: width 500ms var(--ease), background 500ms var(--ease);
    /* tap area generoso para mobile */
    position: relative;
  }

  .carousel-pill button::after {
    content: '';
    position: absolute;
    inset: -10px;
  }

  .carousel-pill button.active {
    width: 26px;
    background: rgba(255, 255, 255, 0.92);
  }

  .chooser,
  .lineup {
    padding: clamp(52px, 6.5vw, 96px) clamp(20px, 6vw, 90px);
  }

  .chooser {
    display: grid;
    grid-template-columns: minmax(280px, 0.8fr) 1.2fr;
    gap: clamp(34px, 7vw, 90px);
    align-items: start;
    background:
      radial-gradient(circle at 22% 10%, rgba(136, 13, 0, 0.24), transparent 28%),
      #050507;
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 8% cover 34%;
    position: relative;
    z-index: 1;
  }

  .chooser::before,
  .lineup::before {
    content: '';
    position: absolute;
    left: clamp(20px, 6vw, 90px);
    right: clamp(20px, 6vw, 90px);
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent);
  }

  .use-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(14px, 1.8vw, 22px);
  }

  .use-grid article {
    min-height: 180px;
    padding: clamp(18px, 2.2vw, 26px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.055);
    backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
    transition: transform 620ms var(--ease), background 620ms var(--ease), border-color 620ms var(--ease), box-shadow 620ms var(--ease);
    animation: tile-rise both;
    animation-timeline: view();
    animation-range: entry 12% cover 34%;
  }

  .use-grid article:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(186, 0, 0, 0.42);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 20px 70px rgba(0,0,0,0.26);
  }

  .use-grid strong {
    display: block;
    font-size: 22px;
    margin-bottom: 10px;
  }

  .use-grid span {
    color: rgba(255, 255, 255, 0.58);
    font-size: 14px;
    line-height: 1.5;
  }

  .lineup {
    background: linear-gradient(180deg, #050507 0%, #0a0a0e 100%);
    position: relative;
    z-index: 1;
  }

  .lineup-head {
    max-width: 560px;
    margin-bottom: clamp(28px, 3.2vw, 44px);
  }

  .lineup-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: clamp(20px, 2.4vw, 32px);
  }

  .lineup-grid article {
    grid-column: span 6;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: stretch;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 30px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0, 0, 0, 0.22);
    animation: card-rise both;
    animation-timeline: view();
    animation-range: entry 8% cover 36%;
    transform-style: preserve-3d;
  }

  .lineup-grid article::before {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 14px;
    border: 1px solid rgba(255, 255, 255, 0.0);
    border-radius: 20px;
    pointer-events: none;
    transition: border-color 700ms var(--ease), box-shadow 700ms var(--ease);
  }

  .lineup-grid article::marker {
    content: '';
  }

  .lineup-grid article > div::before {
    content: '';
    position: absolute;
    left: clamp(22px, 3vw, 36px);
    right: clamp(22px, 3vw, 36px);
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--accent), transparent);
    opacity: 0.78;
    transform: scaleX(0.18);
    transform-origin: left;
    transition: transform 760ms var(--ease), opacity 760ms var(--ease);
  }

  .lineup-grid article:nth-child(n + 3) {
    grid-column: span 4;
  }

  .lineup-grid img {
    position: relative;
    width: 100%;
    height: clamp(242px, 11vw, 358px);
    object-fit: cover;
    object-position: top;
    opacity: 0.94;
    transform: scale(1.02);
    transition: transform 1000ms var(--ease), opacity 1000ms var(--ease);
  }

  .lineup-grid article:hover img {
    transform: scale(1.075) translateY(-8px);
    opacity: 0.98;
  }

  .lineup-grid article:hover > div::before {
    transform: scaleX(1);
    opacity: 1;
  }

  .lineup-grid article:hover::before {
    border-color: color-mix(in srgb, var(--accent) 45%, rgba(255,255,255,0.22));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 0 46px color-mix(in srgb, var(--accent) 22%, transparent);
  }

  .lineup-grid article::after {
    content: none;
  }

  .lineup-grid article:hover::after {
    content: none;
  }

  .lineup-grid article > div {
    position: relative;
    z-index: 1;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: clamp(22px, 2.8vw, 34px);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 32%),
      linear-gradient(180deg, #15151b, #09090d);
    transform: translateY(0);
    transition: transform 760ms var(--ease);
  }

  .lineup-grid article:hover > div {
    transform: translateY(0);
  }

  .lineup-grid small {
    position: static;
    width: fit-content;
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.80);
    background: rgba(10, 10, 14, 0.36);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
    font-size: 10px;
    font-weight: 950;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .lineup-grid p {
    margin: 0 0 10px;
    color: var(--accent);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .lineup-grid h3 {
    margin: 0;
    font-size: clamp(17px, 1.7vw, 22px);
    line-height: 1.15;
  }

  .lineup-grid span {
    display: block;
    max-width: 440px;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 14px;
    line-height: 1.5;
  }

  .lineup-grid em {
    display: block;
    max-width: 480px;
    margin-top: 12px;
    padding-left: 12px;
    border-left: 1px solid color-mix(in srgb, var(--accent) 58%, rgba(255,255,255,0.18));
    color: rgba(255, 255, 255, 0.50);
    font-size: 12px;
    font-style: normal;
    line-height: 1.45;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 620ms var(--ease), transform 620ms var(--ease);
  }

  .lineup-grid button {
    margin-top: auto;
  }

  .lineup-grid article:hover em {
    opacity: 1;
    transform: translateY(0);
  }

  .hub-cta {
    min-height: 52svh;
    display: grid;
    place-items: center;
    align-content: center;
    text-align: center;
    padding: 60px 20px;
    background:
      radial-gradient(circle at 50% 40%, rgba(136, 13, 0, 0.24), transparent 30%),
      #050507;
    border-top: 1px solid rgba(255,255,255,0.10);
  }

  .hub-cta h2 {
    max-width: 880px;
  }

  @keyframes hero-drift {
    from {
      transform: scale(1.045) translateX(-18px);
    }
    to {
      transform: scale(1.015) translateX(0);
    }
  }

  @keyframes hero-copy-in {
    from {
      opacity: 0;
      transform: translateY(34px);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @keyframes reveal-up {
    from {
      opacity: 0;
      transform: translateY(54px);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @keyframes card-rise {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.985);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes tile-rise {
    from {
      opacity: 0;
      transform: translateY(32px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @supports not (animation-timeline: view()) {
    .model-carousel,
    .chooser,
    .lineup-grid article,
    .use-grid article {
      animation: none;
    }
  }

  @media (max-width: 980px) {
    .hub-hero {
      min-height: 720px;
    }

    .hub-hero > img {
      object-position: 68% center;
    }

    .hub-hero {
      align-items: start;
    }

    .hero-inner {
      width: min(360px, calc(40vw - 18px));
      margin-top: 108px;
      margin-left: 18px;
      margin-bottom: 0;
      padding: 18px 20px;
    }

    .model-carousel {
      --card-w: min(82vw, 520px);
      --gap: 18px;
      padding-left: 18px;
      padding-right: 18px;
    }

    .carousel-window {
      border-radius: 22px;
    }

    .model-track img {
      height: clamp(220px, 52vw, 380px);
      border-radius: 22px;
    }

    .model-track article::before {
      height: clamp(220px, 52vw, 380px);
      border-radius: 22px;
    }

    .slide-glass {
      width: 100%;
      min-height: auto;
      margin: 0;
      border-left: 0;
      border-top: 0;
      padding-left: 14px;
      padding-right: 14px;
    }

    .chooser,
    .lineup-grid {
      grid-template-columns: 1fr;
    }

    .chooser {
      gap: 30px;
    }

    .lineup-grid article,
    .lineup-grid article:nth-child(n + 3) {
      grid-column: auto;
      min-height: auto;
    }

    .lineup-grid img {
      height: clamp(220px, 46vw, 320px);
      object-position: top;
    }
  }

  @media (max-width: 620px) {
    .hub-hero {
      min-height: 660px;
    }

    .hub-hero > img {
      object-position: 70% center;
    }

    .model-carousel {
      --card-w: min(86vw, 390px);
      --gap: 16px;
      padding-top: 46px;
      padding-bottom: 54px;
    }

    .hero-inner {
      width: min(300px, calc(100% - 28px));
      margin: 92px 14px 0;
      padding: 16px 18px;
      border-radius: 16px;
    }

    .hero-inner h1 {
      font-size: 24px;
      line-height: 1.08;
    }

    .hero-inner > span {
      margin-top: 10px;
      font-size: 12px;
      line-height: 1.45;
    }

    .lineup-grid button,
    .hub-cta a {
      width: 100%;
    }

    .hero-inner button {
      width: auto;
      min-height: 40px;
      margin-top: 14px;
      padding: 0 15px;
      font-size: 12px;
    }

    .use-grid {
      grid-template-columns: 1fr;
    }

    .carousel-head {
      align-items: start;
      flex-direction: column;
    }

    .carousel-controls {
      gap: 12px;
      justify-content: flex-start;
    }

    .carousel-pill {
      gap: 6px;
      padding: 15px 18px;
    }

    .carousel-pill button {
      width: 6px;
      height: 6px;
    }

    .carousel-pill button.active {
      width: 22px;
    }

    .play-btn {
      width: 42px;
      height: 42px;
    }

    .slide-glass h3 {
      font-size: 26px;
    }

    .lineup-grid img {
      height: 242px;
      object-position: top;
    }

    .lineup-grid article {
      border-radius: 24px;
    }

    .lineup-grid article > div {
      padding: 20px;
    }

    .lineup-grid h3 {
      font-size: 20px;
      line-height: 1.15;
    }

    .hub-cta h2 {
      font-size: clamp(28px, 7vw, 40px);
    }

    .chooser-copy h2 {
      font-size: clamp(28px, 7.5vw, 40px);
    }
  }
</style>
