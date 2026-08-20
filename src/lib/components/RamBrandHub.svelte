<script lang="ts">
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  type RamModel = {
    slug: string
    name: string
    role: string
    image: string
    mobileImage?: string
    accent: string
    use: string
    stat: string
    metric: string
    detail: string
    price: string
    promo?: string
    hasPromo?: boolean
  }

  let { onModelSelect }: { onModelSelect?: (slug: string) => void } = $props()

  const A = '/adistem2026/ram-lineup'
  const RAM_DEFAULT = '#880D00'
  const RAM_HOVER = '#BA0000'
  let activeModelIndex = $state(0)

  const models: RamModel[] = [
    {
      slug: '1500-rho',
      name: 'RAM 1500 RHO',
      role: 'Alto desempeño off-road',
      image: '/adistem2026/promociones/ram-1500-rho-2026.jpg',
      mobileImage: '/adistem2026/promociones/ram-1500-rho-2026.jpg',
      accent: RAM_HOVER,
      use: 'Para quien quiere velocidad, presencia y terracería.',
      stat: 'Performance',
      metric: 'Off-Road',
      detail: 'Suspensión y respuesta de alto desempeño para terrenos abiertos.',
      price: '$1,290,000',
      promo: 'Tasa desde 14.50%'
    },
    {
      slug: '1500-tungsten',
      name: 'RAM 1500 Tungsten',
      role: 'Lujo y capacidad premium',
      image: '/adistem2026/promociones/ram-1500-tugnsten-2026.jpg',
      mobileImage: '/adistem2026/promociones/ram-1500-tugnsten-2026.jpg',
      accent: RAM_DEFAULT,
      use: 'Para viajes, negocio y confort ejecutivo.',
      stat: 'Premium',
      metric: 'Lujo Total',
      detail: 'Cabina elevada, materiales premium y gran presencia en cualquier camino.',
      price: '$1,290,000',
      promo: 'Tasa desde 14.50%'
    },
    {
      slug: '700',
      name: 'RAM 700',
      role: 'Compacta, ágil, urbana',
      image: '/adistem2026/promociones/ram-700-2026.jpg',
      mobileImage: '/adistem2026/promociones/ram-700-2026.jpg',
      accent: RAM_HOVER,
      use: 'Para ciudad, reparto y emprendimientos.',
      stat: 'Ciudad',
      metric: 'Ágil',
      detail: 'Formato compacto para moverse y cargar todos los días.',
      price: '$408,400',
      promo: 'Bono de hasta $30,000 + 0% de comisión por apertura'
    },
    {
      slug: '1500',
      name: 'RAM 1500',
      role: 'Potencia diaria',
      image: '/adistem2026/promociones/ram-1500-2026.jpg',
      mobileImage: '/adistem2026/promociones/ram-1500-2026.jpg',
      accent: RAM_DEFAULT,
      use: 'Para remolque, familia y aventura.',
      stat: 'Versátil',
      metric: 'Remolque',
      detail: 'Balance entre fuerza, confort y capacidad diaria.',
      price: '$1,293,700',
      promo: 'Tasa desde 14.50%'
    },
    {
      slug: '1200',
      name: 'RAM 1200',
      role: 'Trabajo inteligente',
      image: '/adistem2026/promociones/ram-1200-2026.jpg',
      mobileImage: '/adistem2026/promociones/ram-1200-2026.jpg',
      accent: '#7f7f7f',
      use: 'Para flotillas, campo y carga productiva.',
      stat: 'Trabajo',
      metric: 'Carga',
      detail: 'Configuración práctica para jornadas productivas.',
      price: '$409,900',
      promo: 'Desde $409,900 · Bono $47,000 · Tasa 14.50%'
    }
  ]

  function selectModel(_slug: string) {
    // All model explore CTAs route to 1500 RHO (only fully-built landing)
    onModelSelect?.('1500-rho')
  }

  const VISIBLE_SLUGS = ['1500-rho', '1500-tungsten', '700']

  function goToModel(index: number) {
    activeModelIndex = (index + 3) % 3
  }

  function scrollToForm() {
    const el = document.getElementById('brandhub-mobile-form') || document.getElementById('brandhub-desktop-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Cotización: navega al form con el modelo pre-seleccionado
  function goToCotizacion(modelSlug?: string) {
    const base = '/adistem2026/cotizacion/'
    const url = modelSlug ? `${base}?modelo=${encodeURIComponent(modelSlug)}` : base
    history.pushState({ view: 'Cotizacion' }, '', url)
    window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'Cotizacion' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToPrueba(modelSlug?: string) {
    const base = '/adistem2026/prueba-manejo/'
    const url = modelSlug ? `${base}?modelo=${encodeURIComponent(modelSlug)}` : base
    history.pushState({ view: 'PruebaManejo' }, '', url)
    window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'PruebaManejo' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Modelo seleccionado en el inline-form preview
  let selectedQuoteModel = $state('1500-rho')

  const heroModels: RamModel[] = [models[0]]
  let activeHeroIndex = $state(0)
  let isHeroPlaying = $state(true)

  function goToHeroModel(index: number) {
    activeHeroIndex = (index + heroModels.length) % heroModels.length
  }

  function toggleHeroPlay() {
    isHeroPlaying = !isHeroPlaying
  }

  $effect(() => {
    if (!isHeroPlaying || heroModels.length <= 1) return
    const id = setInterval(() => {
      activeHeroIndex = (activeHeroIndex + 1) % heroModels.length
    }, 7000)
    return () => clearInterval(id)
  })

  let isPlaying = $state(true)

  function togglePlay() {
    isPlaying = !isPlaying
  }

  $effect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      activeModelIndex = (activeModelIndex + 1) % 3
    }, 7000)
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
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    goToModel(dx > 0 ? activeModelIndex + 1 : activeModelIndex - 1)
  }

  function onCarouselEnter() { isPlaying = false }
  function onCarouselLeave() { isPlaying = true }
</script>

<svelte:head>
  <title>RAM | Gama 2026 en VAPSA</title>
</svelte:head>

<main class="ram-hub">
  <section class="hub-hero">
    {#each heroModels as model, i (model.slug)}
      <img class="hero-bg hero-desktop-img" class:active={i === activeHeroIndex} src={model.image} alt={model.name} />
      {#if model.mobileImage}
        <img class="hero-bg hero-mobile-img" class:active={i === activeHeroIndex} src={model.mobileImage} alt={model.name} />
      {/if}
    {/each}
    <div class="hero-shade-new"></div>
    <div class="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-8 xl:px-12 pt-4 xl:pt-24 pb-3 xl:pb-4 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-6 xl:gap-10 min-h-0 xl:min-h-screen">
      <div class="hero-copy-new flex-1 max-w-lg">
        {#key activeHeroIndex}
          <div class="hero-content-new">
            <h1>{heroModels[activeHeroIndex].name} 2026</h1>
            <p class="hero-slogan-new">{heroModels[activeHeroIndex].role}</p>
            <span class="price-badge-new">Desde {heroModels[activeHeroIndex].price}</span>
            <div class="hero-actions-new">
              <button class="primary" onclick={() => selectModel(heroModels[activeHeroIndex].slug)}>
                Explorar <GoogleIcon name="arrow_forward" size={18} />
              </button>
              <button class="ghost" onclick={scrollToForm}>
                Cotiza ahora <GoogleIcon name="arrow_downward" size={18} />
              </button>
            </div>
          </div>
        {/key}
      </div>

      <!-- Formulario de Cotización Desktop en Brand Hub -->
      <div id="brandhub-desktop-form" class="hidden xl:block flex-shrink-0 w-full max-w-[380px] xl:max-w-[410px] z-10 self-center mb-12">
        <ContactFormCard accent="#880D00" initialBrand="Ram" initialModel={heroModels[activeHeroIndex].name.replace('RAM ', '') + ' 2026'} />
      </div>
    </div>

    <!-- Mobile: fade bottom de imagen hacia el bloque de texto -->
    <div class="hub-mobile-fade" aria-hidden="true"></div>

    <div class="carousel-controls hero-controls-new">
      <div class="carousel-pill" aria-label="Seleccionar modelo">
        {#each heroModels as model, i (model.slug)}
          <button
            class:active={i === activeHeroIndex}
            aria-label={`Ver ${model.name}`}
            onclick={() => goToHeroModel(i)}>
          </button>
        {/each}
      </div>
      <button
        class="play-btn"
        aria-label={isHeroPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
        onclick={toggleHeroPlay}>
        <GoogleIcon name={isHeroPlaying ? 'pause' : 'play_arrow'} size={16} />
      </button>
    </div>
  </section>

  <!-- ── Mobile-only: texto + CTA debajo de la imagen ── -->
  <div class="hub-hero-mobile">
    {#key activeHeroIndex}
      <div class="hub-hero-mobile-inner">
        <h2>{heroModels[activeHeroIndex].name} <span class="hub-mobile-year">2026</span></h2>
        <p>{heroModels[activeHeroIndex].role}</p>
        <span class="hub-mobile-price">Desde {heroModels[activeHeroIndex].price}</span>
        <div class="flex flex-col gap-2 w-full mt-3">
          <button class="hub-mobile-cta" onclick={() => selectModel(heroModels[activeHeroIndex].slug)}>
            Explorar <GoogleIcon name="arrow_forward" size={16} />
          </button>
          <button class="hub-mobile-cta ghost" onclick={scrollToForm}>
            Cotiza ahora <GoogleIcon name="arrow_downward" size={16} />
          </button>
        </div>
      </div>
    {/key}
  </div>

  <!-- ── Formulario Mobile ── -->
  <div id="brandhub-mobile-form" class="w-full max-w-lg mx-auto px-4 py-6 xl:hidden relative z-10">
    <ContactFormCard
      accent="#880D00"
      initialBrand="Ram"
      initialModel={heroModels[activeHeroIndex].name.replace('RAM ', '') + ' 2026'}
    />
  </div>

  <section
    class="model-carousel"
    aria-label="Modelos RAM"
    onmouseenter={onCarouselEnter}
    onmouseleave={onCarouselLeave}>
    <div class="carousel-head">
      <div>
        <p>Promociones exclusivas</p>
        <h2>Estrena tu RAM con ofertas únicas.</h2>
      </div>
    </div>

    <div class="carousel-window" ontouchstart={onTouchStart} ontouchend={onTouchEnd}>
      <div class="model-track" style={`--active:${activeModelIndex};`}>
        {#each models as model, i (model.slug)}
          <article class="promo-card" class:active={i === activeModelIndex} class:hide={!VISIBLE_SLUGS.includes(model.slug)} style={`--accent:${model.accent}`}>
            <div class="pc-glass-bg"></div>
            <div class="pc-glass-shine"></div>
            <div class="pc-glass-border"></div>
            <div class="pc-img-wrap">
              <img src={model.image} alt={model.name} />
              <div class="pc-img-gradient"></div>
              <span class="pc-badge-stat">{model.stat}</span>
              {#if model.hasPromo !== false}
                <span class="pc-badge-promo">PROMO</span>
              {/if}
              <div class="pc-img-footer">
                <p>Ram</p>
                <h3>{model.name.replace('RAM ', '')} <span>2026</span></h3>
              </div>
            </div>
            <div class="pc-body">
              <p class="pc-metric">{model.metric}</p>
              <p class="pc-detail">
                <GoogleIcon name="sell" size={12} style="display:inline-flex;margin-right:4px;color:#D50000;vertical-align:-2px;" />
                {model.promo || `Bono especial · Desde ${model.price}`}
              </p>
              <button onclick={() => selectModel(model.slug)} class="pc-cta">
                Ver promoción <GoogleIcon name="chevron_right" size={14} />
              </button>
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
            class:hide={!VISIBLE_SLUGS.includes(model.slug)}
            aria-label={`Ver ${model.name}`}
            onclick={() => goToModel(i)}>
          </button>
        {/each}
      </div>
      <button class="play-btn" aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'} onclick={togglePlay}>
        <GoogleIcon name={isPlaying ? 'pause' : 'play_arrow'} size={16} />
      </button>
    </div>
  </section>

  <!-- ═══ Cinematic story panels ═══ -->
  <section class="story-reel">
    <div class="story-panel" style={`background-image: url('https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/rho/desktop/my26-rho-featurepanel-01-desktop.jpg.img.2880.jpg')`}>
      <img class="story-mobile-img" src="https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/rho/desktop/my26-rho-featurepanel-01-desktop.jpg.img.2880.jpg" alt="Alto desempeño" />
      <div class="story-overlay"></div>
      <div class="story-content">
        <p class="story-eyebrow">Alto Desempeño</p>
        <h2 class="story-title">Domina<br>el terreno.</h2>
        <p class="story-sub">RAM 1500 RHO. Suspensión off-road, presencia total y respuesta inmediata en cualquier terreno.</p>
        <div class="story-actions">
          <button class="story-btn primary" onclick={() => goToCotizacion('1500-rho')}><GoogleIcon name="description" size={15} /> Cotizar</button>
          <button class="story-btn ghost" onclick={() => selectModel('1500-rho')}>Explorar <GoogleIcon name="arrow_forward" size={15} /></button>
          <button class="story-btn link" onclick={() => goToPrueba('1500-rho')}><GoogleIcon name="speed" size={14} /> Prueba de manejo</button>
        </div>
      </div>
    </div>

    <div class="story-panel flip" style={`background-image: url('https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/ram-1500-tungsten/inicio/desktop/my26-ram-inicio-design-dk-mx.jpg.img.2880.jpg')`}>
      <img class="story-mobile-img" src="https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/ram-1500-tungsten/inicio/desktop/my26-ram-inicio-design-dk-mx.jpg.img.2880.jpg" alt="Lujo Premium" />
      <div class="story-overlay flip"></div>
      <div class="story-content flip">
        <p class="story-eyebrow">Lujo Premium</p>
        <h2 class="story-title">Confort que<br>impone.</h2>
        <p class="story-sub">RAM 1500 Tungsten: cabina elevada, materiales premium y la presencia de la pickup más premiada.</p>
        <div class="story-actions">
          <button class="story-btn primary" onclick={() => goToCotizacion('1500-tungsten')}><GoogleIcon name="description" size={15} /> Cotizar</button>
          <button class="story-btn ghost" onclick={() => selectModel('1500-tungsten')}>Explorar <GoogleIcon name="arrow_forward" size={15} /></button>
          <button class="story-btn link" onclick={() => goToPrueba('1500-tungsten')}><GoogleIcon name="speed" size={14} /> Prueba de manejo</button>
        </div>
      </div>
    </div>

    <div class="story-panel" style={`background-image: url('https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/ram-1200/inicio/desktop/my26-ram-1200-inicio2-seguraeficiente-mx-dk.jpg.img.2880.jpg')`}>
      <img class="story-mobile-img" src="https://www.ram.com/content/dam/cross-regional/nafta/ramtrucks/es_mx/2026/ram-1200/inicio/desktop/my26-ram-1200-inicio2-seguraeficiente-mx-dk.jpg.img.2880.jpg" alt="Trabajo inteligente" />
      <div class="story-overlay"></div>
      <div class="story-content">
        <p class="story-eyebrow">Trabajo Inteligente</p>
        <h2 class="story-title">Carga que<br>rinde.</h2>
        <p class="story-sub">RAM 1200. Configuración práctica y productiva para flotillas, campo y negocio diario.</p>
        <div class="story-actions">
          <button class="story-btn primary" onclick={() => goToCotizacion('1200')}><GoogleIcon name="description" size={15} /> Cotizar</button>
          <button class="story-btn ghost" onclick={() => selectModel('1200')}>Explorar <GoogleIcon name="arrow_forward" size={15} /></button>
          <button class="story-btn link" onclick={() => goToPrueba('1200')}><GoogleIcon name="speed" size={14} /> Prueba de manejo</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Stat strip ═══ -->
  <section class="stat-strip">
    <div class="stat-item">
      <strong>20+</strong>
      <span>años de experiencia</span>
    </div>
    <div class="stat-sep"></div>
    <div class="stat-item">
      <strong>3,500+</strong>
      <span>familias con su RAM</span>
    </div>
    <div class="stat-sep"></div>
    <div class="stat-item">
      <strong>5</strong>
      <span>modelos 2026</span>
    </div>
    <div class="stat-sep"></div>
    <div class="stat-item">
      <strong>24h</strong>
      <span>pre-aprobación</span>
    </div>
  </section>

  <section id="cotizar" class="cotizar-band" aria-label="Cotización RAM">
    <div class="cotizar-inner">
      <div class="cotizar-copy">
        <p>Cotización RAM</p>
        <h2>Tu próxima RAM, sin complicaciones.</h2>
        <span>Esquemas de financiamiento a tu medida, pre-aprobación en menos de 24 horas y asesoría personalizada con expertos VAPSA.</span>
        <ul class="cotizar-perks">
          <li><GoogleIcon name="payments" size={16} /> Enganche desde 10%</li>
          <li><GoogleIcon name="schedule" size={16} /> Respuesta en 24h</li>
          <li><GoogleIcon name="verified" size={16} /> Tasas preferenciales</li>
        </ul>
      </div>
      <div class="cotizar-form">
        <label class="cotizar-field">
          <span>Modelo de interés</span>
          <select bind:value={selectedQuoteModel}>
            {#each models as model (model.slug)}
              <option value={model.slug}>{model.name} · Desde {model.price}</option>
            {/each}
          </select>
        </label>
        <button class="cotizar-primary" onclick={() => goToCotizacion(selectedQuoteModel)}>
          Cotizar este modelo <GoogleIcon name="arrow_forward" size={18} />
        </button>
      </div>
    </div>
  </section>

  <section class="hub-cta">
    <GoogleIcon name="route" size={24} style="margin-bottom:20px;color:{RAM_HOVER}" />
    <p>¿No sabes cuál te conviene?</p>
    <h2>Te ayudamos a elegir por uso, presupuesto y disponibilidad.</h2>
    <div class="hub-cta-actions">
      <button onclick={() => goToCotizacion()}>Cotizar online <GoogleIcon name="arrow_forward" size={16} /></button>
    </div>
  </section>
</main>

<style>
  .ram-hub {
    min-height: 100vh;
    background: #050507;
    color: white;
    font-family: Inter, Roboto, sans-serif;
    overflow: clip;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --hairline: rgba(255, 255, 255, 0.14);
    --ram-default: #880D00;
    --ram-hover: #BA0000;
    --brand-bg: #7f7f7f;
  }

  .ram-hub * {
    box-sizing: border-box;
  }

  .hub-hero {
    min-height: clamp(620px, 100svh, 935px);
    position: relative;
    display: grid;
    align-items: center;
    overflow: hidden;
  }

  .ram-hub::before {
    content: 'RAM';
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

  @keyframes hero-zoom-in {
    0% { transform: scale(1.15); opacity: 0; filter: blur(4px); }
    15% { opacity: 1; filter: blur(0); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes badge-glow {
    0%, 100% { box-shadow: 0 0 8px rgba(186, 0, 0, 0.5), 0 0 0 rgba(186, 0, 0, 0); }
    50% { box-shadow: 0 0 18px rgba(186, 0, 0, 0.8), 0 0 32px rgba(186, 0, 0, 0.25); }
  }

  .hide {
    display: none !important;
  }

  .hub-hero > img.hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 60% center;
    opacity: 0;
    transition: opacity 1s var(--ease);
  }

  .hub-hero > img.hero-bg.active {
    opacity: 1;
    z-index: 1;
    animation: hero-zoom-in 10s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  @media (max-width: 767px) {
    .hub-hero > img.hero-desktop-img {
      display: block !important;
    }
  }

  .hero-shade-new {
    position: absolute;
    inset: 0;
    z-index: 2;
    background:
      radial-gradient(circle at 72% 46%, rgba(136, 13, 0, 0.24), transparent 32%),
      linear-gradient(90deg, rgba(5, 5, 7, 0.50) 0%, rgba(5, 5, 7, 0.20) 40%, rgba(5, 5, 7, 0.05) 100%),
      linear-gradient(0deg, #050507 0%, transparent 42%);
  }

  .hero-copy-new {
    position: relative;
    z-index: 10;
    align-self: end;
    width: min(600px, calc(100vw - 48px));
    margin: 0 0 clamp(65px, 10vh, 85px) clamp(24px, 6vw, 90px);
    padding: 0;
  }

  .hero-controls-new {
    position: absolute;
    bottom: clamp(16px, 2.5vh, 24px);
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    margin-top: 0;
    gap: 16px;
    z-index: 15;
  }

  .hero-content-new {
    animation: hero-copy-in 1200ms var(--ease) both 100ms;
  }

  @keyframes hero-copy-in {
    from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .hero-copy-new h1 {
    margin: 0 0 12px;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .hero-copy-new .price-badge-new {
    display: inline-block;
    padding: 6px 14px;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: white;
    backdrop-filter: blur(10px);
  }

  .hero-copy-new .hero-slogan-new {
    margin: 0 0 16px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    text-transform: none;
    letter-spacing: normal;
  }

  .hero-actions-new {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
  }

  .hero-actions-new button.primary {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    cursor: pointer;
    background: var(--ram-default);
    color: white;
    border: 1px solid transparent;
    transition: all 300ms var(--ease);
  }

  .hero-actions-new button.primary:hover {
    background: var(--ram-hover);
    transform: translateY(-2px);
  }

  .hero-actions-new button.ghost,
  .hub-mobile-cta.ghost {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.08) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.22) !important;
    backdrop-filter: blur(12px);
    box-shadow: none !important;
    transition: all 300ms var(--ease);
  }

  .hero-actions-new button.ghost:hover,
  .hub-mobile-cta.ghost:hover {
    background: rgba(255, 255, 255, 0.16) !important;
    border-color: rgba(255, 255, 255, 0.38) !important;
    transform: translateY(-2px);
  }

  .hub-cta p {
    margin: 0 0 10px;
    color: var(--ram-hover);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .model-carousel {
    position: relative;
    z-index: 1;
    --card-w: clamp(370px, 39vw, 630px);
    --gap: clamp(18px, 2vw, 28px);
    padding: clamp(56px, 7vw, 98px) clamp(18px, 6vw, 90px);
    background:
      radial-gradient(circle at 78% 22%, rgba(136, 13, 0, 0.18), transparent 32%),
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
    color: var(--ram-hover);
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

  .model-track article.active img {
    transform: scale(1);
    opacity: 1;
  }

  .model-track article.active {
    background: rgba(255, 255, 255, 0.060);
    border-color: color-mix(in srgb, var(--accent) 34%, rgba(255,255,255,0.12));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 86px rgba(0, 0, 0, 0.32);
  }

  .promo-card {
    display: flex !important;
    flex-direction: column !important;
    padding: 0 !important;
    overflow: hidden;
    position: relative;
    isolation: isolate;
  }

  .pc-glass-bg {
    position: absolute; inset: 0;
    backdrop-filter: blur(40px) saturate(175%);
    z-index: 0;
  }
  .pc-glass-shine {
    position: absolute; inset: 0;
    background: linear-gradient(175deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.07) 16%, transparent 40%);
    pointer-events: none; z-index: 3;
  }
  .pc-glass-border {
    position: absolute; inset: 0; border-radius: inherit;
    border: 1px solid rgba(255,255,255,0.14);
    pointer-events: none; z-index: 5;
  }

  .pc-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 2;
    flex-shrink: 0;
    overflow: hidden;
    z-index: 6;
  }

  .pc-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top;
    transform: scale(1.02);
    transition: transform 700ms cubic-bezier(0.16,1,0.3,1);
  }

  .promo-card:hover .pc-img-wrap img {
    transform: scale(1.08);
  }

  .pc-img-gradient {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(5,8,20,0.75) 70%, rgba(5,8,20,0.95) 100%);
  }

  .pc-badge-stat {
    position: absolute; top: 12px; right: 12px;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.85);
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.02em;
    backdrop-filter: blur(14px);
    box-shadow: rgba(255,255,255,0.14) 0 1px 0 inset, rgba(0,0,0,0.3) 0 2px 8px;
  }

  .pc-badge-promo {
    position: absolute; top: 12px; left: 12px;
    padding: 4px 10px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(213,0,0,0.95), rgba(136,13,0,0.90));
    border: 1px solid rgba(255,255,255,0.28);
    color: #ff9e9e;
    font-size: 10px; font-weight: 800; letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
    animation: badge-glow 2.8s ease-in-out infinite;
  }

  .pc-img-footer {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px 16px 14px;
    background: linear-gradient(to top, rgba(5,8,20,0.85) 0%, transparent 100%);
  }

  .pc-img-footer p {
    margin: 0 0 2px;
    color: rgba(255,255,255,0.55);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.18em;
  }

  .pc-img-footer h3 {
    margin: 0;
    font-size: clamp(18px, 1.8vw, 22px);
    font-weight: 800;
    line-height: 1.1;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }

  .pc-img-footer h3 span {
    font-weight: 300;
    opacity: 0.65;
    display: inline;
    font-size: inherit;
    margin: 0;
    color: inherit;
  }

  .pc-body {
    position: relative;
    z-index: 6;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 14px;
    border-top: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
  }

  .pc-metric {
    margin: 0 0 4px;
    color: #ff9e9e;
    font-size: 10px; font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.9;
  }

  .pc-detail {
    margin: 0 0 14px;
    color: rgba(255,255,255,0.65);
    font-size: 12px;
    line-height: 1.5;
  }

  .pc-cta {
    margin-top: auto;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 12px; font-weight: 700;
    background: linear-gradient(135deg, rgba(213,0,0,0.55), rgba(136,13,0,0.4));
    border: 1px solid rgba(136,13,0,0.45);
    color: #ff9e9e;
    box-shadow: rgba(213,0,0,0.3) 0 2px 12px, rgba(255,255,255,0.12) 0 1px 0 inset;
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: all 280ms cubic-bezier(0.16,1,0.3,1);
  }

  .pc-cta:hover {
    background: linear-gradient(135deg, rgba(136,13,0,0.75), rgba(213,0,0,0.6));
    border-color: rgba(255,158,158,0.5);
    transform: translateY(-1px);
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

  /* ═══ Story Panels (cinematic, Apple-style) ═══ */
  .story-reel {
    position: relative;
    z-index: 1;
  }

  .story-mobile-img {
    display: none;
  }

  .story-panel {
    position: relative;
    min-height: clamp(540px, 76svh, 960px);
    display: flex;
    align-items: center;
    overflow: hidden;
    background-size: cover;
    background-position: center 28%;
  }

  .story-panel.flip {
    background-position: 60% 28%;
  }

  .story-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(5, 5, 7, 0.88) 0%,
      rgba(5, 5, 7, 0.54) 46%,
      rgba(5, 5, 7, 0.08) 100%
    );
  }

  .story-overlay.flip {
    background: linear-gradient(
      270deg,
      rgba(5, 5, 7, 0.88) 0%,
      rgba(5, 5, 7, 0.54) 46%,
      rgba(5, 5, 7, 0.08) 100%
    );
  }

  .story-content {
    position: relative;
    z-index: 2;
    padding: clamp(48px, 8vw, 110px);
    max-width: clamp(360px, 54vw, 740px);
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 0% cover 26%;
  }

  .story-content.flip {
    margin-left: auto;
    text-align: right;
  }

  .story-eyebrow {
    margin: 0 0 18px;
    color: color-mix(in srgb, var(--ram-hover) 28%, rgba(255,255,255,0.94));
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.20em;
    text-transform: uppercase;
    text-shadow: 0 1px 10px rgba(0,0,0,0.7);
  }

  .story-title {
    margin: 0 0 22px;
    font-size: clamp(46px, 7.5vw, 104px);
    line-height: 0.95;
    font-weight: 950;
    letter-spacing: -0.035em;
    text-shadow: 0 4px 48px rgba(0, 0, 0, 0.60), 0 2px 12px rgba(0, 0, 0, 0.4);
  }

  .story-sub {
    margin: 0 0 30px;
    max-width: 460px;
    color: rgba(255, 255, 255, 0.80);
    font-size: clamp(14px, 1.35vw, 17px);
    line-height: 1.6;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
  }

  .story-content.flip .story-sub {
    margin-left: auto;
  }

  .story-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .story-content.flip .story-actions {
    justify-content: flex-end;
  }

  .story-btn {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 24px;
    border-radius: 999px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: transform 340ms var(--ease), background 340ms var(--ease), box-shadow 340ms var(--ease), filter 340ms var(--ease);
  }

  .story-btn.primary {
    background: linear-gradient(135deg, var(--ram-default) 0%, var(--ram-hover) 100%);
    color: white;
    border: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 32px rgba(136,13,0,0.40);
  }

  .story-btn.primary:hover {
    transform: translateY(-2px);
    filter: brightness(1.14);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.24), 0 16px 44px rgba(136,13,0,0.54);
  }

  .story-btn.ghost {
    background: rgba(255, 255, 255, 0.10);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .story-btn.ghost:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.44);
  }

  .story-btn.link {
    background: transparent;
    color: rgba(255, 255, 255, 0.72);
    border: none;
    padding: 0 8px;
    font-size: 12px;
    text-decoration: none;
    gap: 6px;
  }

  .story-btn.link:hover {
    color: white;
    transform: translateX(2px);
  }

  /* ═══ Stat strip ═══ */
  .stat-strip {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(24px, 3.6vw, 54px);
    padding: clamp(48px, 6.5vw, 80px) clamp(20px, 6vw, 90px);
    background: linear-gradient(180deg, #050507 0%, #07070c 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .stat-item {
    text-align: center;
    animation: tile-rise both;
    animation-timeline: view();
    animation-range: entry 12% cover 34%;
  }

  .stat-item strong {
    display: block;
    font-size: clamp(40px, 5.5vw, 72px);
    line-height: 1;
    font-weight: 950;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #fff 0%, color-mix(in srgb, var(--ram-hover) 56%, white) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }

  .stat-item span {
    display: block;
    color: rgba(255, 255, 255, 0.50);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .stat-sep {
    width: 1px;
    height: 52px;
    background: rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
  }

  /* ───── Cotización band ───── */
  .cotizar-band {
    position: relative;
    z-index: 1;
    padding: clamp(60px, 8vw, 110px) clamp(20px, 6vw, 90px);
    background:
      radial-gradient(circle at 12% 50%, rgba(136, 13, 0, 0.16), transparent 38%),
      radial-gradient(circle at 92% 8%, rgba(213, 0, 0, 0.10), transparent 30%),
      #050507;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .cotizar-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(28px, 4vw, 60px);
    align-items: center;
    padding: clamp(28px, 3.6vw, 48px);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.035);
    backdrop-filter: blur(26px) saturate(180%);
    -webkit-backdrop-filter: blur(26px) saturate(180%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px rgba(0,0,0,0.40);
  }

  .cotizar-copy p {
    margin: 0 0 10px;
    color: var(--ram-hover);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .cotizar-copy h2 {
    margin: 0;
    font-size: clamp(28px, 3.2vw, 44px);
    line-height: 1.08;
    font-weight: 950;
    letter-spacing: -0.025em;
  }

  .cotizar-copy > span {
    display: block;
    max-width: 460px;
    margin-top: 14px;
    color: rgba(255, 255, 255, 0.66);
    font-size: 14px;
    line-height: 1.5;
  }

  .cotizar-perks {
    list-style: none;
    margin: clamp(20px, 2.4vw, 30px) 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 14px 20px;
  }

  .cotizar-perks li {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.74);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .cotizar-perks li :global(.material-symbols-outlined) {
    color: var(--ram-hover);
  }

  .cotizar-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cotizar-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cotizar-field > span {
    color: rgba(255, 255, 255, 0.62);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .cotizar-field select {
    min-height: 52px;
    padding: 0 18px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 16px;
    background: rgba(8, 8, 14, 0.55);
    color: white;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 340ms var(--ease), background 340ms var(--ease);
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.5) 50%), linear-gradient(135deg, rgba(255,255,255,0.5) 50%, transparent 50%);
    background-position: calc(100% - 22px) 50%, calc(100% - 16px) 50%;
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat;
  }

  .cotizar-field select:hover {
    border-color: rgba(255, 255, 255, 0.28);
    background-color: rgba(12, 12, 20, 0.65);
  }

  .cotizar-field select option {
    background: #0c0c14;
    color: white;
  }

  .cotizar-primary {
    min-height: 54px;
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 22px;
    border: 0;
    border-radius: 16px;
    color: white;
    background: linear-gradient(135deg, var(--ram-default) 0%, var(--ram-hover) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 16px 40px rgba(136, 13, 0, 0.36);
    font-family: inherit;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: transform 380ms var(--ease), box-shadow 380ms var(--ease), filter 380ms var(--ease);
  }

  .cotizar-primary:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.24), 0 22px 56px rgba(136, 13, 0, 0.50);
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

  .hub-cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: clamp(20px, 2.4vw, 30px);
  }

  .hub-cta-actions button {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 28px;
    border-radius: 999px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
    border: 0;
    color: white;
    background: linear-gradient(135deg, var(--ram-default) 0%, var(--ram-hover) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 14px 36px rgba(136, 13, 0, 0.34);
    transition: transform 380ms var(--ease), filter 380ms var(--ease), box-shadow 380ms var(--ease);
  }

  .hub-cta-actions button:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.24), 0 20px 50px rgba(136, 13, 0, 0.48);
  }

  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(54px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes tile-rise {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @supports not (animation-timeline: view()) {
    .model-carousel {
      animation: none;
    }
  }

  /* ─── Tablet (≤ 980px) ─── */
  @media (max-width: 980px) {
    .cotizar-inner {
      grid-template-columns: 1fr;
      padding: clamp(22px, 4vw, 32px);
    }

    .hub-hero {
      min-height: 720px;
    }

    .hub-hero > img {
      object-position: 68% center;
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

    .story-panel {
      min-height: clamp(460px, 64svh, 760px);
      align-items: flex-end;
    }

    .story-content,
    .story-content.flip {
      margin-left: 0;
      text-align: left;
      padding: clamp(28px, 5vw, 52px);
      padding-bottom: clamp(48px, 7vw, 72px);
      max-width: 100%;
    }

    .story-content.flip .story-actions {
      justify-content: flex-start;
    }

    .story-content.flip .story-sub {
      margin-left: 0;
    }

    .story-overlay,
    .story-overlay.flip {
      background: linear-gradient(
        0deg,
        rgba(5, 5, 7, 0.92) 0%,
        rgba(5, 5, 7, 0.60) 40%,
        rgba(5, 5, 7, 0.10) 100%
      );
    }
  }

  .hub-mobile-fade { display: none; }
  .hub-hero-mobile { display: none; }

  /* ─── Mobile (≤ 768px): 2-block hero layout ─── */
  @media (max-width: 768px) {
    .hub-hero {
      height: 52svh !important;
      min-height: 200px !important;
      max-height: 400px;
    }

    .hero-shade-new,
    .hero-copy-new {
      display: none;
    }

    .hub-mobile-fade {
      display: block;
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 56px;
      background: linear-gradient(to bottom, transparent, #050507);
      pointer-events: none;
      z-index: 3;
    }

    .hero-controls-new {
      bottom: 10px;
    }

    .hub-hero-mobile {
      display: block;
      background: #050507;
    }

    .hub-hero-mobile-inner {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 18px 20px 20px;
      animation: hero-copy-in 480ms ease both;
    }

    .hub-hero-mobile h2 {
      margin: 0;
      font-size: clamp(26px, 7vw, 34px);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      color: white;
    }

    .hub-mobile-year {
      color: rgba(255, 255, 255, 0.40);
      font-weight: 700;
    }

    .hub-hero-mobile p {
      margin: 0;
      color: rgba(255, 255, 255, 0.62);
      font-size: 13.5px;
      line-height: 1.5;
    }

    .hub-mobile-price {
      display: inline-block;
      width: fit-content;
      padding: 5px 13px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: white;
    }

    .hub-mobile-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 46px;
      padding: 0 22px;
      border-radius: 999px;
      background: #880D00;
      color: white;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      font-family: inherit;
      width: 100%;
      margin-top: 4px;
      box-shadow: 0 4px 16px rgba(136, 13, 0, 0.36);
      transition: background 280ms ease, transform 280ms ease, box-shadow 280ms ease;
    }

    .hub-mobile-cta:hover {
      background: #BA0000;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(186, 0, 0, 0.52);
    }
  }

  /* ─── Mobile (≤ 620px) ─── */
  @media (max-width: 620px) {
    .hub-hero > img {
      object-position: 70% center;
    }

    .cotizar-perks {
      gap: 10px 16px;
    }

    .model-carousel {
      --card-w: min(86vw, 390px);
      --gap: 16px;
      padding-top: 46px;
      padding-bottom: 54px;
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

    .hub-cta h2 {
      font-size: clamp(28px, 7vw, 40px);
    }

    .story-mobile-img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      object-position: center 28%;
      flex-shrink: 0;
    }

    .story-panel {
      min-height: unset;
      flex-direction: column;
      align-items: stretch;
      background-image: none !important;
    }

    .story-overlay,
    .story-overlay.flip {
      display: none;
    }

    .story-content,
    .story-content.flip {
      position: static;
      max-width: 100%;
      padding: 24px 20px 32px;
      margin-left: 0;
      text-align: left;
      background: #07070c;
      animation: none;
    }

    .story-content.flip .story-actions {
      justify-content: flex-start;
    }

    .story-eyebrow {
      text-shadow: none;
    }

    .story-title {
      font-size: clamp(34px, 9vw, 52px);
      text-shadow: none;
    }

    .story-sub {
      text-shadow: none;
      color: rgba(255, 255, 255, 0.72);
    }

    .story-btn {
      min-height: 44px;
      font-size: 12px;
      padding: 0 18px;
    }

    .stat-sep {
      display: none;
    }

    .stat-strip {
      gap: 22px 32px;
    }

    .stat-item strong {
      font-size: clamp(32px, 9vw, 52px);
    }
  }
</style>
