<script lang="ts">
  import { onMount } from 'svelte'
  import GoogleIcon from './GoogleIcon.svelte'

  const A = '/adistem2026/ram-demo'
  const L = '/adistem2026/ram-lineup'
  let { modelSlug = '1500-rho' }: { modelSlug?: string | null } = $props()
  let progress = $state(0)
  let videoReady = $state(false)

  type ModelDetail = {
    name: string
    kicker: string
    title: string
    subtitle: string
    heroImage: string
    spotlightImage: string
    quote: string
    price?: string
    specs: { value: string; label: string }[]
    motionTitle: string
    motionCopy: string
  }

  const modelDetails: Record<string, ModelDetail> = {
    '700': {
      name: 'RAM 700',
      kicker: 'RAM 700 2026',
      title: 'Agilidad compacta con actitud de pickup.',
      subtitle: 'Una RAM pensada para ciudad, negocio y recorridos diarios: práctica, visual y lista para moverse sin sentirse pesada.',
      heroImage: `${L}/ram-700.jpg`,
      spotlightImage: `${L}/ram-700.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20RAM%20700',
      specs: [
        { value: '700', label: 'Pickup compacta RAM' },
        { value: 'Ágil', label: 'Formato práctico para ciudad' },
        { value: 'Carga', label: 'Caja útil para negocio diario' },
        { value: 'Daily', label: 'Lista para trabajo y movilidad' },
      ],
      motionTitle: 'Se mueve ligera, se ve decidida.',
      motionCopy: 'La RAM 700 funciona como herramienta diaria: entra fácil, carga cuando toca y mantiene una presencia clara en cada trayecto.',
    },
    '1500-rho': {
      name: 'RAM 1500 RHO',
      kicker: 'RAM 1500 RHO 2026',
      title: 'Fuerza que se siente antes de arrancar.',
      subtitle: 'Performance off-road con presencia RAM: una pickup para abrir camino, cargar intención y llegar con autoridad.',
      heroImage: `${L}/ram-1500-rho.jpg`,
      spotlightImage: `${L}/ram-1500-rho.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20RAM%201500%20RHO',
      price: 'Desde $1,290,000',
      specs: [
        { value: 'RHO', label: 'Desempeño off-road' },
        { value: '4x4', label: 'Tracción para terrenos abiertos' },
        { value: 'Wide', label: 'Postura ancha y dominante' },
        { value: 'Sport', label: 'Respuesta para aventura' },
      ],
      motionTitle: 'Movimiento hecho para terreno abierto.',
      motionCopy: 'La 1500 RHO está pensada para que la ruta se sienta viva: más presencia, más respuesta y una lectura visual inmediata.',
    },
    '1500': {
      name: 'RAM 1500',
      kicker: 'RAM 1500 2026',
      title: 'Potencia diaria con presencia premium.',
      subtitle: 'Una pickup para remolque, familia y aventura con equilibrio entre fuerza, confort y capacidad diaria.',
      heroImage: `${L}/ram-1500.jpg`,
      spotlightImage: `${L}/ram-1500.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20RAM%201500',
      price: 'Desde $1,290,000',
      specs: [
        { value: '1500', label: 'Pickup RAM 2026' },
        { value: '4x4', label: 'Capacidad para aventura' },
        { value: 'Remolque', label: 'Lista para carga y ruta' },
        { value: 'Confort', label: 'Cabina amplia y equipada' },
      ],
      motionTitle: 'Fuerza amplia para todos los días.',
      motionCopy: 'La RAM 1500 combina capacidad, presencia y comodidad para trabajar, viajar y moverse con autoridad.',
    },
    '1200': {
      name: 'RAM 1200',
      kicker: 'RAM 1200 2026',
      title: 'Trabajo inteligente, listo para producir.',
      subtitle: 'Una pickup práctica para flotillas, campo y carga productiva con una lectura visual fuerte y funcional.',
      heroImage: `${L}/ram-1200.jpg`,
      spotlightImage: `${L}/ram-1200.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20RAM%201200',
      price: 'Desde $408,400',
      specs: [
        { value: '1200', label: 'Pickup RAM 2026' },
        { value: 'Trabajo', label: 'Configuración productiva' },
        { value: 'Carga', label: 'Caja útil para jornadas reales' },
        { value: 'Negocio', label: 'Pensada para operación diaria' },
      ],
      motionTitle: 'Capacidad práctica para avanzar más.',
      motionCopy: 'La RAM 1200 está enfocada en resolver: cargar, moverse y acompañar jornadas productivas sin exceso.',
    },
  }

  const fallbackModel: ModelDetail = {
    name: 'RAM 2026',
    kicker: 'RAM 2026',
    title: 'Fuerza que se siente antes de arrancar.',
    subtitle: 'Capacidad, presencia y tecnología útil para trabajo, viaje y aventura.',
    heroImage: `${A}/hero.jpg`,
    spotlightImage: `${A}/modelo-solo.jpg`,
    quote: 'Hola,%20me%20interesa%20cotizar%20una%20RAM',
    specs: [
      { value: '6.7L', label: 'Turbodiesel disponible' },
      { value: '4x4', label: 'Tracción para trabajo pesado' },
      { value: '12"', label: 'Pantalla vertical central' },
      { value: '360°', label: 'Visión para maniobras' },
    ],
    motionTitle: 'Más que una pickup: una herramienta premium.',
    motionCopy: 'Diseñada para cargar, remolcar y llegar con autoridad.',
  }

  const model = $derived(modelDetails[modelSlug ?? ''] ?? fallbackModel)
  const specs = $derived(model.specs)

  const story = $derived([
    {
      kicker: 'Presencia',
      title: model.motionTitle,
      copy: model.motionCopy,
      image: model.heroImage,
    },
    {
      kicker: 'Tecnología',
      title: 'Control total desde el centro.',
      copy: 'Pantalla vertical, navegación, cámaras y comandos clave en una cabina pensada para decidir rápido y manejar mejor.',
      image: `${A}/interior-3.jpg`,
    },
    {
      kicker: 'Utilidad',
      title: 'Espacio inteligente para lo que sigue.',
      copy: 'Soluciones de carga, organización y acceso que convierten la caja en una extensión real de tu trabajo.',
      image: `${A}/interior-1.jpg`,
    },
  ])

  const motionCards = $derived([
    {
      title: model.name,
      copy: model.motionCopy,
      image: model.heroImage,
    },
    {
      title: 'Cabina clara',
      copy: 'Controles visibles, sensación ordenada y una experiencia pensada para el uso real.',
      image: `${A}/interior-3.jpg`,
    },
    {
      title: 'Trabajo diario',
      copy: 'Espacio útil y soluciones prácticas para moverse con intención todos los días.',
      image: `${A}/vehiculo-aislado.jpg`,
    },
  ])

  onMount(() => {
    let targetProgress = 0
    let raf = 0

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    const animate = () => {
      progress += (targetProgress - progress) * 0.085
      if (Math.abs(targetProgress - progress) < 0.0005) progress = targetProgress
      raf = requestAnimationFrame(animate)
    }

    update()
    animate()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  })

  function goToQuote() {
    history.pushState({ view: 'Contacto', tab: 'cotizacion' }, '', '/adistem2026/contacto/')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Contacto', tab: 'cotizacion' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToTestDrive() {
    history.pushState({ view: 'Contacto', tab: 'prueba' }, '', '/adistem2026/contacto/')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Contacto', tab: 'prueba' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBackToRam() {
    history.pushState({ brand: 'Ram' }, '', '/adistem2026/ram/')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { brand: 'Ram' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<svelte:head>
  <title>{model.name} | VAPSA</title>
</svelte:head>

<main class="ram-premium" style={`--scroll:${progress}`}>
  <section class="ram-hero">
    <div class:ready={videoReady} class="video-wash">
      <iframe
        src="https://www.youtube.com/embed/OaZSEoMmedw?autoplay=1&mute=1&loop=1&playlist=OaZSEoMmedw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=2&vq=hd1080"
        title="RAM video"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        loading="eager"
        onload={() => videoReady = true}>
      </iframe>
    </div>
    <img class:video-loaded={videoReady} class="hero-fallback" src={model.heroImage} alt={model.name} />
    <div class="hero-shade"></div>
    <div class="model-spotlight" aria-hidden="true">
      <span></span>
      <img src={model.spotlightImage} alt="" />
    </div>
    <button class="back-button" onclick={goBackToRam}><GoogleIcon name="arrow_back" size={17} /> RAM</button>
    <div class="hero-copy">
      <p>{model.kicker}</p>
      <h1>{model.title}</h1>
      {#if model.price}<strong class="model-price">{model.price}</strong>{/if}
      <span>{model.subtitle}</span>
      <button onclick={goToQuote}>Cotizar {model.name} <GoogleIcon name="arrow_forward" size={18} /></button>
    </div>
    <div class="progress-rail" aria-hidden="true"><span></span></div>
    <div class="scroll-cue">Desliza</div>
  </section>

  <nav class="product-nav" aria-label="Navegación de producto RAM">
    <strong>{model.name}</strong>
    <a href="#ram-motion">Movimiento</a>
    <a href="#ram-story">Detalles</a>
    <button onclick={goToTestDrive} class="ghost-nav">Prueba de manejo</button>
    <button onclick={goToQuote}>Cotizar</button>
  </nav>

  <section class="pin-stage">
    <div class="pin-visual">
      <img class="truck-main" src={model.spotlightImage} alt={model.name} />

    </div>
    <div class="pin-copy">
      <p>{model.motionCopy}</p>
      <h2>{model.motionTitle}</h2>
    </div>
  </section>

  <section class="spec-band">
    {#each specs as item, i (item.label)}
      <article style={`--i:${i}`}>
        <strong>{item.value}</strong>
        <span>{item.label}</span>
      </article>
    {/each}
  </section>

  <section id="ram-motion" class="motion-gallery">
    <div class="motion-head">
      <p>Movimiento</p>
      <h2>Cards limpias, producto limpio.</h2>
    </div>
    <div class="motion-cards">
      {#each motionCards as card, i (card.title)}
        <article style={`--i:${i}`}>
          <img src={card.image} alt={card.title} />
          <div>
            <strong>{card.title}</strong>
            <span>{card.copy}</span>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section id="ram-story" class="story-stack">
    {#each story as panel, i (panel.title)}
      <article class="story-panel" style={`--i:${i}`}>
        <img src={panel.image} alt={panel.title} />
        <div>
          <p>{panel.kicker}</p>
          <h2>{panel.title}</h2>
          <span>{panel.copy}</span>
        </div>
      </article>
    {/each}
  </section>

  <section class="cockpit">
    <div class="cockpit-copy">
      <p>Cabina RAM</p>
      <h2>Oscura, silenciosa, lista.</h2>
      <span>Materiales sobrios, displays claros y espacio real para que cada viaje se sienta bajo control.</span>
    </div>
    <div class="cockpit-grid">
      <img src={`${A}/interior-2.jpg`} alt="Pantalla RAM" />
      <img src={`${A}/interior-4.jpg`} alt="Cluster RAM" />
      <img src={`${A}/interior-5.jpg`} alt="Cabina RAM" />
    </div>
  </section>

  <section class="capability">
    <img src={`${A}/vehiculo-aislado.jpg`} alt="RAM exterior de trabajo" />
    <div class="capability-card">
      <p>Capacidad</p>
      <h2>Hecha para días pesados.</h2>
      <div class="cap-list">
        <span><GoogleIcon name="local_shipping" size={18} /> Remolque y carga</span>
        <span><GoogleIcon name="speed" size={18} /> Respuesta inmediata</span>
        <span><GoogleIcon name="verified_user" size={18} /> Seguridad avanzada</span>
        <span><GoogleIcon name="bolt" size={18} /> Tecnología útil</span>
      </div>
    </div>
  </section>

  <section id="ram-quote" class="quote-section">
    <p>VAPSA RAM</p>
    <h2>Agenda una prueba de manejo o recibe una cotización.</h2>
    <p class="quote-sub">Elige la opción que mejor se ajuste a lo que necesitas. Nuestro equipo está listo para atenderte.</p>

    <div class="quote-cta-grid">
      <button class="quote-cta-card" onclick={() => { history.pushState({ view: 'Contacto', tab: 'prueba' }, '', '/adistem2026/contacto/'); window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Contacto', tab: 'prueba' } })); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <span class="qcc-icon"><GoogleIcon name="speed" size={28} /></span>
        <strong>Prueba de Manejo</strong>
        <span class="qcc-desc">Agenda una cita para manejar el {model.name}</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
      <button class="quote-cta-card" onclick={() => { history.pushState({ view: 'Contacto', tab: 'cita' }, '', '/adistem2026/contacto/'); window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Contacto', tab: 'cita' } })); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <span class="qcc-icon"><GoogleIcon name="build" size={28} /></span>
        <strong>Cita de Servicio</strong>
        <span class="qcc-desc">Programa el mantenimiento de tu vehículo</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
      <button class="quote-cta-card" onclick={() => { history.pushState({ view: 'Contacto', tab: 'cotizacion' }, '', '/adistem2026/contacto/'); window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Contacto', tab: 'cotizacion' } })); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <span class="qcc-icon"><GoogleIcon name="description" size={28} /></span>
        <strong>Solicitar Cotización</strong>
        <span class="qcc-desc">Recibe precios, versiones y financiamiento</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
    </div>
  </section>
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .ram-premium {
    min-height: 100vh;
    background: #030305;
    color: white;
    overflow: clip;
    font-family: Inter, Roboto, sans-serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ram-default: #880D00;
    --ram-hover: #BA0000;
  }

  .ram-premium * {
    box-sizing: border-box;
  }

  .ram-hero {
    position: relative;
    min-height: 100svh;
    display: grid;
    align-items: end;
    isolation: isolate;
    overflow: hidden;
  }

  .video-wash,
  .hero-fallback,
  .hero-shade {
    position: absolute;
    inset: 0;
  }

  .video-wash {
    z-index: -2;
    opacity: 0;
    transform: scale(1.08);
    filter: saturate(0.8) contrast(1.2);
    transition: opacity 1600ms var(--ease-out), transform 2200ms var(--ease-out);
  }

  .video-wash.ready {
    opacity: 0.74;
    transform: scale(1.03);
  }

  .video-wash iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100vw, 177.78vh);
    height: max(56.25vw, 100vh);
    transform: translate(-50%, -50%);
    border: 0;
    pointer-events: none;
  }

  .hero-fallback {
    z-index: -3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.62;
    transform: scale(calc(1.025 + var(--scroll) * 0.045));
    transition: opacity 1200ms var(--ease-out), transform 1600ms var(--ease-out);
  }

  .hero-fallback.video-loaded {
    opacity: 0;
  }

  .hero-shade {
    z-index: -1;
    background:
      radial-gradient(circle at 72% 46%, rgba(136, 13, 0, 0.30), transparent 28%),
      linear-gradient(90deg, rgba(3, 3, 5, 0.92) 0%, rgba(3, 3, 5, 0.54) 44%, rgba(3, 3, 5, 0.18) 100%),
      linear-gradient(0deg, #030305 0%, transparent 38%);
  }

  .model-spotlight {
    position: absolute;
    z-index: 1;
    right: clamp(-140px, -6vw, -48px);
    bottom: clamp(86px, 9vw, 132px);
    width: min(58vw, 880px);
    pointer-events: none;
    transform:
      translate3d(calc(var(--scroll) * -8vw), calc(var(--scroll) * 9vh), 0)
      scale(calc(0.96 + var(--scroll) * 0.08));
    animation: spotlight-in 1400ms var(--ease-out) both 260ms;
  }

  .model-spotlight span {
    position: absolute;
    inset: 12% 4% 2%;
    background: radial-gradient(ellipse, rgba(186, 0, 0, 0.36), transparent 64%);
    filter: blur(34px);
    opacity: 0.75;
    transform: translateY(18%);
  }

  .model-spotlight img {
    position: relative;
    width: 100%;
    display: block;
    border-radius: 32px;
    filter: drop-shadow(0 44px 70px rgba(0, 0, 0, 0.70));
    transform: perspective(1200px) rotateY(calc((var(--scroll) - 0.35) * -8deg));
  }

  .hero-copy {
    position: relative;
    z-index: 2;
    width: min(720px, calc(100% - 40px));
    margin: 0 0 clamp(70px, 10vw, 120px) clamp(24px, 9vw, 128px);
    transform: translateY(calc(var(--scroll) * -52px));
    animation: hero-copy-in 1200ms var(--ease-out) both 180ms;
  }

  .back-button {
    position: absolute;
    z-index: 2;
    top: clamp(88px, 9vw, 118px);
    left: clamp(22px, 8vw, 124px);
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 0 16px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.86);
    background: rgba(8, 8, 12, 0.34);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 34px rgba(0,0,0,0.28);
    font-size: 13px;
    font-weight: 850;
    cursor: pointer;
    animation: hero-copy-in 900ms var(--ease-out) both;
    transition: transform 420ms var(--ease-out), background 420ms var(--ease-out), border-color 420ms var(--ease-out);
  }

  .back-button:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.30);
    background: rgba(255, 255, 255, 0.12);
  }

  .hero-copy p,
  .cockpit-copy p,
  .quote-section p,
  .capability-card p,
  .story-panel p {
    margin: 0 0 14px;
    color: var(--ram-hover);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero-copy h1 {
    margin: 0;
    max-width: 680px;
    font-size: clamp(48px, 8vw, 118px);
    line-height: 0.92;
    letter-spacing: 0;
    font-weight: 900;
  }

  .model-price {
    display: block;
    width: fit-content;
    margin-top: 18px;
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    color: white;
    background: rgba(136, 13, 0, 0.34);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.14);
    font-size: clamp(13px, 1.2vw, 16px);
    font-weight: 900;
    letter-spacing: 0;
  }

  .hero-copy > span {
    display: block;
    max-width: 560px;
    margin-top: 22px;
    color: rgba(255, 255, 255, 0.64);
    font-size: clamp(16px, 1.55vw, 21px);
    line-height: 1.55;
  }

  .hero-copy button,
  .quote-actions a {
    margin-top: 30px;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    padding: 0 22px;
    color: white;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(20px);
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 420ms var(--ease-out), background 420ms var(--ease-out), border-color 420ms var(--ease-out);
  }

  .hero-copy button:hover,
  .quote-actions a:hover {
    transform: translateY(-2px);
    background: rgba(186, 0, 0, 0.30);
  }

  .scroll-cue {
    position: absolute;
    right: clamp(20px, 5vw, 70px);
    bottom: 34px;
    color: rgba(255, 255, 255, 0.42);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    animation: cue-pulse 2200ms ease-in-out infinite;
  }

  .progress-rail {
    position: fixed;
    z-index: 40;
    right: 22px;
    top: 22vh;
    width: 2px;
    height: 24vh;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.10);
    overflow: hidden;
  }

  .progress-rail span {
    display: block;
    width: 100%;
    height: calc(var(--scroll) * 100%);
    border-radius: inherit;
    background: linear-gradient(180deg, var(--ram-hover), rgba(255,255,255,0.72));
    box-shadow: 0 0 16px rgba(186, 0, 0, 0.72);
  }

  .product-nav {
    position: sticky;
    top: 74px;
    z-index: 35;
    width: min(760px, calc(100% - 32px));
    min-height: 54px;
    margin: -27px auto 0;
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 0 12px 0 22px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    background: rgba(12, 12, 16, 0.76);
    backdrop-filter: blur(26px) saturate(160%);
    -webkit-backdrop-filter: blur(26px) saturate(160%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 50px rgba(0,0,0,0.28);
  }

  .product-nav strong {
    margin-right: auto;
    font-size: 15px;
  }

  .product-nav a,
  .product-nav button {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    border: 0;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.72);
    background: transparent;
    font-size: 12px;
    font-weight: 850;
    text-decoration: none;
    cursor: pointer;
    transition: color 320ms var(--ease-out), background 320ms var(--ease-out), transform 320ms var(--ease-out);
  }

  .product-nav button {
    padding: 0 14px;
    color: white;
    background: var(--ram-hover);
  }

  .product-nav button.ghost-nav {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.86);
  }

  .product-nav button.ghost-nav:hover {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.04);
  }

  .product-nav a:hover,
  .product-nav button:hover {
    color: white;
    transform: translateY(-1px);
  }

  .pin-stage {
    min-height: 205vh;
    position: relative;
    background:
      radial-gradient(circle at 52% 25%, rgba(136, 13, 0, 0.28), transparent 34%),
      linear-gradient(180deg, #030305 0%, #09090d 48%, #030305 100%);
  }

  .pin-visual {
    min-height: 100svh;
    position: sticky;
    top: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .truck-main {
    width: min(1180px, 105vw);
    max-height: 78vh;
    object-fit: contain;
    filter: drop-shadow(0 48px 70px rgba(0, 0, 0, 0.72));
    transform: translateX(calc((var(--scroll) - 0.18) * -115px)) scale(calc(0.94 + var(--scroll) * 0.16));
    transition: filter 900ms var(--ease-out);
  }

  .pin-readout {
    position: absolute;
    right: clamp(18px, 7vw, 112px);
    bottom: clamp(40px, 10vw, 118px);
    padding: 18px 20px;
    min-width: 190px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.075);
    backdrop-filter: blur(24px);
    animation: soft-float 5200ms ease-in-out infinite;
  }

  .pin-readout span {
    display: block;
    margin-bottom: 6px;
    color: rgba(255, 255, 255, 0.48);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .pin-readout strong {
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1;
  }

  .pin-copy {
    width: min(760px, calc(100% - 40px));
    margin: -78vh auto 0;
    position: relative;
    z-index: 2;
    padding-top: 42vh;
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 12% cover 42%;
  }

  .pin-copy p {
    margin: 0 0 18px;
    color: rgba(255, 255, 255, 0.62);
    font-size: clamp(18px, 2vw, 26px);
  }

  .pin-copy h2,
  .cockpit-copy h2,
  .quote-section h2,
  .capability-card h2,
  .story-panel h2 {
    margin: 0;
    font-size: clamp(38px, 6vw, 86px);
    line-height: 0.96;
    letter-spacing: 0;
    font-weight: 900;
  }

  .spec-band {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.10);
    border-top: 1px solid rgba(255, 255, 255, 0.10);
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  }

  .spec-band article {
    min-height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(22px, 4vw, 52px);
    background: #07070a;
    transition: background 650ms var(--ease-out), transform 650ms var(--ease-out);
    animation: spec-rise both;
    animation-timeline: view();
    animation-range: entry 0% cover 28%;
    animation-delay: calc(var(--i) * 80ms);
  }

  .spec-band article:hover {
    background: #101016;
    transform: translateY(-4px);
  }

  .spec-band strong {
    font-size: clamp(42px, 7vw, 92px);
    line-height: 1;
  }

  .spec-band span {
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.56);
    font-size: 14px;
    line-height: 1.35;
  }

  .story-stack {
    background: #030305;
  }

  .motion-gallery {
    padding: clamp(70px, 9vw, 130px) 0 clamp(60px, 8vw, 112px);
    background:
      radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.16), transparent 30%),
      #030305;
    overflow: hidden;
  }

  .motion-head {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto 34px;
  }

  .motion-head p {
    margin: 0 0 14px;
    color: var(--ram-hover);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .motion-head h2 {
    max-width: 820px;
    margin: 0;
    font-size: clamp(40px, 6vw, 84px);
    line-height: 0.96;
    font-weight: 950;
    letter-spacing: 0;
  }

  .motion-cards {
    width: min(1380px, calc(100% - 32px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.05fr 1.28fr 0.92fr;
    gap: clamp(16px, 2vw, 24px);
    align-items: start;
  }

  .motion-cards article {
    animation: card-flow both;
    animation-timeline: view();
    animation-range: entry 0% cover 38%;
    animation-delay: calc(var(--i) * 120ms);
  }

  .motion-cards article:nth-child(2) {
    margin-top: clamp(34px, 5vw, 84px);
  }

  .motion-cards article:nth-child(3) {
    margin-top: clamp(10px, 3vw, 42px);
  }

  .motion-cards img {
    width: 100%;
    height: clamp(340px, 34vw, 560px);
    display: block;
    object-fit: cover;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 34px 90px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.10);
    transform: translateY(calc((var(--scroll) - 0.45) * -24px)) scale(1);
    transition: transform 900ms var(--ease-out), border-color 900ms var(--ease-out);
  }

  .motion-cards article:hover img {
    transform: translateY(-8px) scale(1.018);
    border-color: rgba(255,255,255,0.24);
  }

  .motion-cards div {
    padding: 18px 14px 0;
  }

  .motion-cards strong {
    display: block;
    font-size: clamp(18px, 2vw, 27px);
    line-height: 1.08;
  }

  .motion-cards span {
    display: block;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.54);
    font-size: 14px;
    line-height: 1.45;
  }

  .story-panel {
    min-height: 100svh;
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: clamp(28px, 6vw, 84px);
    padding: clamp(24px, 6vw, 92px);
    background: #030305;
    transform: translateY(calc(var(--i) * 6px));
  }

  .story-panel img {
    width: 100%;
    height: min(72vh, 720px);
    object-fit: cover;
    border-radius: 0;
    filter: saturate(0.95) contrast(1.08);
    transform: scale(1.01);
    transition: transform 1200ms var(--ease-out), filter 1200ms var(--ease-out);
    animation: image-unmask both;
    animation-timeline: view();
    animation-range: entry 0% cover 44%;
  }

  .story-panel > div {
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 12% cover 42%;
  }

  .story-panel:hover img {
    transform: scale(1.035);
    filter: saturate(1.02) contrast(1.12);
  }

  .story-panel span,
  .cockpit-copy span {
    display: block;
    max-width: 560px;
    margin-top: 22px;
    color: rgba(255, 255, 255, 0.62);
    font-size: clamp(16px, 1.6vw, 21px);
    line-height: 1.55;
  }

  .cockpit {
    min-height: 120vh;
    display: grid;
    grid-template-columns: minmax(280px, 0.72fr) 1.28fr;
    align-items: center;
    gap: clamp(28px, 6vw, 90px);
    padding: clamp(28px, 6vw, 100px);
    background:
      radial-gradient(circle at 72% 34%, rgba(35, 86, 150, 0.20), transparent 30%),
      linear-gradient(180deg, #030305 0%, #08090d 100%);
  }

  .cockpit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .cockpit-grid img {
    width: 100%;
    min-height: 260px;
    height: 35vh;
    object-fit: cover;
    transform: translateY(0) scale(1);
    transition: transform 1100ms var(--ease-out), opacity 1100ms var(--ease-out);
  }

  .cockpit-grid img:hover {
    transform: translateY(-6px) scale(1.018);
  }

  .cockpit-grid img:first-child {
    grid-row: span 2;
    height: calc(70vh + 14px);
  }

  .capability {
    position: relative;
    min-height: 100svh;
    display: grid;
    align-items: end;
    padding: clamp(24px, 6vw, 86px);
    overflow: hidden;
    background: #030305;
  }

  .capability > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.85) contrast(1.08);
    opacity: 0.82;
    transform: scale(1.02);
    transition: transform 1400ms var(--ease-out);
  }

  .capability:hover > img {
    transform: scale(1.055);
  }

  .capability::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(3, 3, 5, 0.88), rgba(3, 3, 5, 0.32) 58%, rgba(3, 3, 5, 0.9));
  }

  .capability-card {
    position: relative;
    z-index: 1;
    width: min(620px, 100%);
    padding: clamp(24px, 4vw, 44px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(5, 5, 8, 0.64);
    backdrop-filter: blur(24px);
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 15% cover 42%;
  }

  .cap-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 28px;
  }

  .cap-list span {
    min-height: 46px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.76);
    font-size: 13px;
    font-weight: 800;
    transition: transform 420ms var(--ease-out), background 420ms var(--ease-out);
  }

  .cap-list span:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.12);
  }

  .quote-section {
    min-height: 80svh;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 50px 22px;
    background:
      radial-gradient(circle at 50% 40%, rgba(136, 13, 0, 0.28), transparent 30%),
      #030305;
  }

  .quote-section h2 {
    max-width: 920px;
  }

  .quote-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .hero-copy {
      margin-left: 22px;
      margin-bottom: 92px;
    }

    .video-wash {
      display: none;
    }

    .model-spotlight {
      width: min(88vw, 620px);
      right: -18vw;
      bottom: 38vh;
      opacity: 0.62;
    }

    .progress-rail {
      display: none;
    }

    .product-nav {
      top: 70px;
      width: calc(100% - 24px);
      gap: 10px;
      padding-left: 16px;
    }

    .product-nav a {
      display: none;
    }

    .spec-band,
    .story-panel,
    .cockpit {
      grid-template-columns: 1fr;
    }

    .spec-band {
      grid-template-columns: 1fr 1fr;
    }

    .story-panel {
      position: relative;
      min-height: auto;
      padding: 62px 20px;
    }

    .story-panel img {
      height: 46vh;
    }

    .motion-cards {
      grid-template-columns: 1fr;
    }

    .motion-cards article,
    .motion-cards article:nth-child(2),
    .motion-cards article:nth-child(3) {
      margin-top: 0;
    }

    .motion-cards img {
      height: clamp(300px, 62vw, 460px);
    }

    .cockpit {
      min-height: auto;
      padding: 70px 20px;
    }
  }

  @media (max-width: 560px) {
    .hero-copy h1 {
      font-size: 48px;
    }

    .model-spotlight {
      width: 104vw;
      right: -36vw;
      bottom: 44vh;
      opacity: 0.48;
    }

    .product-nav strong {
      max-width: 48vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pin-stage {
      min-height: 145vh;
    }

    .truck-main {
      width: 150vw;
    }

    .pin-readout {
      left: 18px;
      right: 18px;
      bottom: 96px;
    }

    .pin-copy {
      margin-top: -68vh;
    }

    .spec-band,
    .cap-list,
    .cockpit-grid {
      grid-template-columns: 1fr;
    }

    .cockpit-grid img,
    .cockpit-grid img:first-child {
      height: 280px;
      min-height: 280px;
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

  @keyframes cue-pulse {
    0%, 100% {
      opacity: 0.38;
      transform: translateY(0);
    }
    50% {
      opacity: 0.76;
      transform: translateY(8px);
    }
  }

  @keyframes soft-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes spotlight-in {
    from {
      opacity: 0;
      transform: translate3d(60px, 28px, 0) scale(0.92);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  @keyframes spec-rise {
    from {
      opacity: 0;
      transform: translateY(42px);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @keyframes card-flow {
    from {
      opacity: 0;
      transform: translateX(72px) scale(0.97);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes image-unmask {
    from {
      clip-path: inset(12% round 0);
      transform: translateY(34px) scale(1.04);
      opacity: 0.58;
    }
    to {
      clip-path: inset(0 round 0);
      transform: translateY(0) scale(1.01);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ram-premium *,
    .ram-premium *::before,
    .ram-premium *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }

  /* ─ Quote CTA grid ─────────────────────────────────────────────── */
  .quote-sub {
    margin: 0 auto 32px;
    max-width: 560px;
    font-size: 15px;
    color: rgba(255,255,255,0.52);
    line-height: 1.6;
  }

  .quote-cta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    max-width: 740px;
    margin: 0 auto 28px;
  }

  .quote-cta-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 22px 20px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(24px);
    color: white;
    text-align: left;
    cursor: pointer;
    transition: background 350ms ease, border-color 350ms ease, transform 350ms cubic-bezier(0.22,1,0.36,1);
  }

  .quote-cta-card:hover {
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.22);
    transform: translateY(-3px);
  }

  .qcc-icon { font-size: 24px; line-height: 1; }

  .quote-cta-card strong {
    display: block;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .qcc-desc {
    font-size: 12px;
    color: rgba(255,255,255,0.50);
    line-height: 1.4;
    flex: 1;
  }

  .qcc-arrow {
    display: flex;
    align-items: center;
    color: rgba(255,255,255,0.40);
    margin-top: auto;
    transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease;
  }

  .quote-cta-card:hover .qcc-arrow {
    transform: translateX(6px);
    color: rgba(255,255,255,0.90);
  }

  .quote-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .quote-secondary-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 18px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    color: rgba(255,255,255,0.72);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: background 300ms ease, border-color 300ms ease, color 300ms ease;
  }

  .quote-secondary-btn:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.26);
    color: white;
  }
</style>
