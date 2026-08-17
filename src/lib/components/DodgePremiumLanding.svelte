<script lang="ts">
  import { onMount } from 'svelte'
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  let showCotizarDrawer = $state(false)
  type DrawerTab = 'cotizacion' | 'prueba' | 'cita'
  let drawerTab = $state<DrawerTab>('cotizacion')

  let { modelSlug = 'attitude' }: { modelSlug?: string | null } = $props()
  let progress = $state(0)
  let zoomedImage = $state<string | null>(null)

  type ModelDetail = {
    name: string
    kicker: string
    title: string
    subtitle: string
    heroImage: string
    mobileHeroImage?: string
    spotlightImage: string
    quote: string
    price: string
    specs: { value: string; label: string }[]
    motionTitle: string
    motionCopy: string
    storyImages?: string[]
    motionImages?: string[]
    capabilityImage?: string
  }

  const ATTITUDE_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/desktop/my26-dodge-attitude-vlp-stills-dk.jpg'
  const ATTITUDE_TECH_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/desktop/2026-dodge-attitude-mx-tecnologia-confort-dk-v2.jpg.img.2880.jpg'
  const ATTITUDE_COLOR_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/01-SXT/2026-dodge-attitude-mx-color-stx-02-dk.jpg.img.2880.jpg'
  const CHARGER_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/charger/vlp/desktop/my26-dodge-charger-mainhero-dk-pr.jpg.img.2880.jpg'
  const CHARGER_MEDIA_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/charger/vlp/desktop/my26-dodge-charger-mediablock-dk-pr.jpg.img.2880.jpg'
  const CHARGER_MEDIA2_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/charger/vlp/desktop/my26-dodge-charger-mediablock2-dk-pr.jpg.img.2880.jpg'
  const CHARGER_OCTANE_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/charger/vlp/desktop/my26-dodge-charger-vlp-octane-ready-sticky-container-1-v2-desktop.jpg'
  const CHARGER_SANCTUM_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/charger/vlp/desktop/My26-dodge-charger-vlp-innersanctum-stickycontainer-2-desktop.jpg'
  const DURANGO_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/buzz-model/durango/hellcat/desktop/my26-dodge-hellcat-hero-dk-mx.jpg.img.2880.jpg'
  const DURANGO_HEMI_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/buzz-model/durango/hellcat/desktop/my26-dodge-hellcat-hemi-dk-mx.jpg.img.2880.jpg'
  const DURANGO_CONFIANZA_IMG = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/buzz-model/durango/hellcat/desktop/my26-dodge-hellcat-confianza-dk-mx.jpg.img.2880.jpg'
  const JOURNEY_IMG = 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc8f39b8a62ba049430811aa128ea21a793615787.jpg?generation=1777350234748118&alt=media'

  // ── Attitude 2026: versiones/colores reales (dodge.com.mx) ──
  const ATTITUDE_SXT_JELLY = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/desktop/my26-dodge-attitude-sxt-jellybean-mx.jpg.img.600.jpg'
  const ATTITUDE_SPORT_JELLY = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/desktop/my26-dodge-attitude-sport-jellybean-mx.jpg.img.600.jpg'
  const ATTITUDE_GT_JELLY = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/desktop/my26-dodge-attitude-gt-jellybean-mx.jpg.img.600.jpg'
  const ATTITUDE_SXT_BLANCO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/01-SXT/2026-dodge-attitude-mx-color-stx-02-dk.jpg.img.2880.jpg'
  const ATTITUDE_SXT_GRANITO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/01-SXT/2026-dodge-attitude-mx-color-stx-03-dk.jpg.img.2880.jpg'
  const ATTITUDE_SXT_PLATA = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/01-SXT/my26-dodge-attitude-overview-modelizer-alldevices-mx-v1.jpg.img.2880.jpg'
  const ATTITUDE_SPORT_BLANCO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/02-SPORT/2026-dodge-attitude-mx-color-sport-02-dk.jpg.img.2880.jpg'
  const ATTITUDE_SPORT_GRANITO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/02-SPORT/2026-dodge-attitude-mx-color-sport-03-dk.jpg.img.2880.jpg'
  const ATTITUDE_SPORT_NEGRO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/02-SPORT/2026-dodge-attitude-mx-color-sport-01-dk.jpg.img.2880.jpg'
  const ATTITUDE_SPORT_PLATA = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/02-SPORT/2026-dodge-attitude-mx-color-sport-04-dk.jpg.img.2880.jpg'
  const ATTITUDE_GT_BLANCO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/03-GT/2026-dodge-attitude-mx-color-gt-02-dk.jpg.img.2880.jpg'
  const ATTITUDE_GT_GRANITO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/03-GT/2026-dodge-attitude-mx-color-gt-03-dk.jpg.img.2880.jpg'
  const ATTITUDE_GT_NEGRO = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/03-GT/2026-dodge-attitude-mx-color-gt-01-dk.jpg.img.2880.jpg'
  const ATTITUDE_GT_PLATA = 'https://www.dodge.com/content/dam/cross-regional/nafta/dodge/es_mx/2026/attitude/colores/03-GT/2026-dodge-attitude-mx-color-gt-04-dk.jpg.img.2880.jpg'

  type AttitudeVersion = {
    id: string
    name: string
    price: string
    thumb: string
    features: [string[], string[]]
    colors: { name: string; hex: string; img: string }[]
  }

  const AttitudeVersions: AttitudeVersion[] = [
    {
      id: 'sxt',
      name: 'SXT',
      price: 'Desde $364,900',
      thumb: ATTITUDE_SXT_JELLY,
      features: [
        ['Motor 1.5L Turbo con 168HP y 184 lb-pie inyección directa', 'Transmisión automática de 7 velocidades con clutch dual', 'Sistema de infoentretenimiento con pantalla LCD en color de 10.25"', 'Panel de instrumentos LCD de 7"', 'Faros automáticos y DRL LED'],
        ['6 bolsas de aire', 'Control de velocidad crucero', 'Freno de estacionamiento electrónico (EPB) con Autohold', 'Cámara y sensores traseros de estacionamiento', 'Entrada pasiva y encendido por botón Keyless Enter & Go', 'Cristales delanteros y traseros eléctricos (antipellizco)', 'Parabrisas con sensor de lluvia', 'Rines de aluminio de 17"']
      ],
      colors: [
        { name: 'Blanco', hex: '#f2f2f2', img: ATTITUDE_SXT_BLANCO },
        { name: 'Granito', hex: '#4a4a4a', img: ATTITUDE_SXT_GRANITO },
        { name: 'Plata Estelar', hex: '#b9babc', img: ATTITUDE_SXT_PLATA },
      ]
    },
    {
      id: 'sport',
      name: 'SPORT',
      price: 'Desde $364,900',
      thumb: ATTITUDE_SPORT_JELLY,
      features: [
        ['Mismo equipo que versión SXT más:', 'Escape performance con sistema de sonido', 'Panel de instrumentos LCD de 10.25"', '9 asistencias de seguridad autónomas de 2.º nivel', 'Sensores delanteros de asistencia de estacionamiento'],
        ['Espejos plegables eléctricamente, calefactables', 'A/C automático de doble zona', 'Volante deportivo de fondo plano forrado con piel', 'Paletas de cambio al volante', 'Asientos con vestiduras con piel sintética', 'Asiento del conductor ajustable eléctricamente en 6 direcciones', 'Asientos ventilados para conductor y pasajero', 'Quemacocos eléctrico', 'Rines de aluminio de 18"']
      ],
      colors: [
        { name: 'Blanco', hex: '#f2f2f2', img: ATTITUDE_SPORT_BLANCO },
        { name: 'Granito', hex: '#4a4a4a', img: ATTITUDE_SPORT_GRANITO },
        { name: 'Negro Brillante', hex: '#0d0d0d', img: ATTITUDE_SPORT_NEGRO },
        { name: 'Plata Estelar', hex: '#b9babc', img: ATTITUDE_SPORT_PLATA },
      ]
    },
    {
      id: 'gt',
      name: 'GT',
      price: 'Desde $364,900',
      thumb: ATTITUDE_GT_JELLY,
      features: [
        ['Mismo equipo que la versión SPORT y más', 'Sistema de detección de punto ciego', 'Cargador inalámbrico de teléfono móvil', 'Interior deportivo en color negro o negro/rojo', 'Soporte lumbar neumático para asiento del conductor (de 4 vías)'],
        ['Asiento del pasajero delantero ajustable eléctricamente en 4 direcciones', 'Espejo retrovisor electrocrómico', 'Rines de aluminio de 18” con acabado negro satinado y llantas performance', 'Alerón trasero deportivo']
      ],
      colors: [
        { name: 'Blanco', hex: '#f2f2f2', img: ATTITUDE_GT_BLANCO },
        { name: 'Granito', hex: '#4a4a4a', img: ATTITUDE_GT_GRANITO },
        { name: 'Negro Brillante', hex: '#0d0d0d', img: ATTITUDE_GT_NEGRO },
        { name: 'Plata Estelar', hex: '#b9babc', img: ATTITUDE_GT_PLATA },
      ]
    },
  ]

  let activeVersionId = $state('sxt')
  let activeColorIndex = $state(0)
  let activePanel = $state('colors')
  let showAllFeatures = $state(false)

  const activeVersion = $derived(AttitudeVersions.find(v => v.id === activeVersionId)!)
  const activeColor = $derived(activeVersion.colors[activeColorIndex] || activeVersion.colors[0])

  $effect(() => {
    activeVersionId
    showAllFeatures = false
  })

  const modelDetails: Record<string, ModelDetail> = {
    'attitude': {
      name: 'Dodge Attitude',
      kicker: 'Dodge Attitude 2026',
      title: 'Actitud que se nota desde el arranque.',
      subtitle: 'El sedán accesible de Dodge: ágil en la ciudad, con el carácter de la marca y el equipamiento que necesitas para el día a día.',
      heroImage: ATTITUDE_IMG,
      spotlightImage: ATTITUDE_COLOR_IMG,
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Dodge%20Attitude',
      price: 'Desde $379,900',
      specs: [
        { value: 'SXT', label: 'Versión de entrada equipada' },
        { value: 'CVT', label: 'Transmisión automática' },
        { value: '7"', label: 'Pantalla multimedia central' },
        { value: 'ABS', label: 'Frenos con control de estabilidad' },
      ],
      motionTitle: 'Se mueve ágil, se ve decidido.',
      motionCopy: 'El Dodge Attitude está pensado para tu día a día: entra fácil a cualquier calle, se estaciona sin drama y mantiene la actitud Dodge en cada trayecto.',
    },
    'charger': {
      name: 'Dodge Charger',
      kicker: 'Dodge Charger 2026',
      title: 'El músculo americano, sin disculpas.',
      subtitle: 'Más de 100 años de historia condensados en el ícono de Dodge: potencia, presencia y un rugido que se reconoce a la distancia.',
      heroImage: CHARGER_IMG,
      spotlightImage: CHARGER_MEDIA_IMG,
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Dodge%20Charger',
      price: 'Desde $1,489,900',
      specs: [
        { value: 'V8/V6', label: 'Motores de alto desempeño' },
        { value: 'RWD', label: 'Tracción trasera deportiva' },
        { value: 'Track', label: 'Modos de manejo en pista' },
        { value: 'Legend', label: 'Herencia Dodge desde 1966' },
      ],
      motionTitle: 'Movimiento que se siente antes de arrancar.',
      motionCopy: 'El Charger no pasa desapercibido: cada línea está diseñada para transmitir potencia y cada arranque confirma por qué es una leyenda.',
    },
    'durango': {
      name: 'Dodge Durango',
      kicker: 'Dodge Durango 2026',
      title: 'Dominio total en cualquier terreno.',
      subtitle: 'La SUV con más carácter de Dodge: espacio para tres filas, fuerza de sobra y versiones que llegan hasta la brutal Hellcat Black Demon.',
      heroImage: DURANGO_IMG,
      spotlightImage: DURANGO_HEMI_IMG,
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Dodge%20Durango',
      price: 'Desde $2,179,900',
      specs: [
        { value: '3', label: 'Filas de asientos' },
        { value: 'R/T', label: 'Versión de alto desempeño' },
        { value: 'AWD', label: 'Tracción integral disponible' },
        { value: 'Hellcat', label: 'Edición Black Demon 2026' },
      ],
      motionTitle: 'Espacio familiar con actitud de muscle car.',
      motionCopy: 'El Durango combina la practicidad de una SUV de tres filas con el carácter y la potencia que solo Dodge sabe imprimir.',
    },
    'journey': {
      name: 'Dodge Journey',
      kicker: 'Dodge Journey 2026',
      title: 'Versatilidad familiar sin concesiones.',
      subtitle: 'Espacio, confort y tecnología para acompañar cada viaje en familia, con el respaldo y la presencia de la marca Dodge.',
      heroImage: JOURNEY_IMG,
      spotlightImage: JOURNEY_IMG,
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Dodge%20Journey',
      price: 'Desde $603,900',
      specs: [
        { value: 'GT', label: 'Versión tope de gama' },
        { value: '5/7', label: 'Configuración de asientos' },
        { value: 'Cargo', label: 'Espacio de carga flexible' },
        { value: 'Safety', label: 'Sistemas de seguridad activa' },
      ],
      motionTitle: 'Hecho para acompañar cada trayecto.',
      motionCopy: 'El Journey está diseñado para que cada viaje familiar se sienta cómodo, seguro y con el espacio que necesitas.',
    },
  }

  const fallbackModel: ModelDetail = {
    name: 'Dodge 2026',
    kicker: 'Dodge 2026',
    title: 'Actitud que se nota desde el arranque.',
    subtitle: 'Presencia, tecnología y el carácter Dodge en cada versión de la gama.',
    heroImage: ATTITUDE_IMG,
    spotlightImage: ATTITUDE_IMG,
    quote: 'Hola,%20me%20interesa%20cotizar%20un%20Dodge',
    price: 'Desde $379,900',
    specs: [
      { value: '2026', label: 'Gama del año modelo' },
      { value: 'Dodge', label: 'Actitud americana' },
      { value: 'ADAS', label: 'Sistemas de asistencia' },
      { value: 'VAPSA', label: 'Distribuidor autorizado' },
    ],
    motionTitle: 'Más que un auto: una actitud.',
    motionCopy: 'Diseñado para destacar, con la fuerza y presencia que identifican a cada Dodge.',
  }

  const model = $derived(modelDetails[modelSlug ?? ''] ?? fallbackModel)
  const specs = $derived(model.specs)

  const story = $derived([
    { kicker: 'Presencia', title: model.motionTitle, copy: model.motionCopy, image: model.heroImage },
    { kicker: 'Tecnología', title: 'Control total desde el centro.', copy: 'Pantalla multimedia, conectividad inalámbrica y comandos al volante para mantenerte enfocado en el camino.', image: ATTITUDE_TECH_IMG },
    { kicker: 'Seguridad', title: 'Confianza en cada kilómetro.', copy: 'Frenos ABS, control electrónico de estabilidad y bolsas de aire para proteger a todos los ocupantes.', image: DURANGO_CONFIANZA_IMG },
  ])

  const motionCards = $derived([
    { title: 'Presencia que se impone', copy: 'Cada línea del diseño Dodge está pensada para transmitir carácter, dentro y fuera de la ciudad.', image: model.heroImage },
    { title: 'Tecnología a bordo', copy: 'Pantalla multimedia y conectividad para mantenerte enfocado en el camino sin perder el control.', image: CHARGER_OCTANE_IMG },
    { title: 'Hecho para durar', copy: 'Construcción robusta y el respaldo de más de 100 años de historia Dodge.', image: CHARGER_SANCTUM_IMG },
  ])

  const cockpitImages = $derived([model.spotlightImage, ATTITUDE_TECH_IMG, DURANGO_CONFIANZA_IMG])
  const capabilityImage = $derived(model.spotlightImage)

  let cockpitIndex = $state(0)

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

  function toggleZoom(url: string | null) {
    zoomedImage = url
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') zoomedImage = null
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })

  function goToQuote() {
    const el = document.getElementById('mobile-hero-form') || document.querySelector('.quote-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goToTestDrive() {
    const el = document.getElementById('mobile-hero-form') || document.querySelector('.quote-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
</script>

<svelte:head>
  <title>{model.name} | VAPSA</title>
</svelte:head>

<main class="dodge-premium" style={`--scroll:${progress}`}>
  <div class="progress-rail" aria-hidden="true"><span></span></div>

  {#if zoomedImage}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="lightbox-overlay" onclick={() => toggleZoom(null)}>
      <div class="lightbox-content">
        <img src={zoomedImage} alt="Zoom view" />
        <button class="lightbox-close" onclick={() => toggleZoom(null)}>
          <GoogleIcon name="close" size={24} />
        </button>
      </div>
    </div>
  {/if}

  <section id="inicio" class="dodge-hero">
    <img class="hero-fallback hero-desktop-img" src={model.heroImage} alt={model.name} />
    <div class="hero-shade"></div>

    <div class="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-8 xl:px-12 pt-4 xl:pt-24 pb-3 xl:pb-4 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-6 xl:gap-10 min-h-0 xl:min-h-screen">
      <div class="hero-copy flex-1 max-w-lg">
        <h1>{model.kicker}</h1>
        <p class="hero-slogan">{model.title}</p>
        <span class="price-badge">{model.price}</span>
        <div class="hero-actions">
          <button class="primary" onclick={goToQuote}>Cotiza ahora <GoogleIcon name="arrow_forward" size={18} /></button>
          <button class="ghost" onclick={goToTestDrive}>Prueba de manejo</button>
        </div>
      </div>

      <div class="hidden xl:block flex-shrink-0 w-full max-w-[380px] xl:max-w-[410px] z-10 self-center mb-12">
        <ContactFormCard accent="#D50000" initialBrand="Dodge" initialModel={model.name.replace('Dodge ', '') + ' 2026'} hideBrandSelect={true} />
      </div>
    </div>

    <div class="scroll-cue">Desliza</div>
  </section>

  <div id="mobile-hero-form" class="w-full max-w-lg mx-auto px-4 py-6 xl:hidden relative z-10">
    <ContactFormCard accent="#D50000" initialBrand="Dodge" initialModel={model.name.replace('Dodge ', '') + ' 2026'} hideBrandSelect={true} />
  </div>

  <nav class="product-nav hidden md:flex" aria-label="Navegación de producto Dodge">
    <strong>{model.name} <span class="nav-year">2026</span></strong>
    <a href="#inicio">Inicio</a>
    {#if modelSlug === 'attitude'}<a href="#versiones">Versiones</a>{/if}
    <a href="#galeria">Galería</a>
    <a href="#historia">Historia</a>
    <a href="#interior">Interior</a>
    <a href="#capacidad">Capacidad</a>
    <a href="#seguridad">Seguridad</a>
    <span class="nav-divider"></span>
    <button onclick={goToTestDrive} class="ghost-nav">Prueba de manejo</button>
    <button onclick={goToQuote}>Cotizar</button>
  </nav>

  <section class="pin-stage">
    <div class="pin-visual">
      <div class="pin-media-stack">
        <button type="button" class="pin-media" aria-label={`Ampliar imagen de ${model.name}`} onclick={() => toggleZoom(model.spotlightImage)}>
          <img class="truck-main" src={model.spotlightImage} alt={model.name} />
          <span class="pin-play-cue">
            <GoogleIcon name="zoom_in" size={22} />
            Ampliar
          </span>
        </button>
      </div>
      <div class="pin-copy">
        <p>{model.motionCopy}</p>
        <h2>{model.motionTitle}</h2>
      </div>
    </div>
  </section>

  {#if modelSlug === 'attitude'}
    <section id="versiones" class="vs">
      <div class="vs-hero-zone">
        <div class="vs-pill-bar">
          {#each AttitudeVersions as version}
            <button
              class="vs-pill"
              class:active={activeVersionId === version.id}
              onclick={() => { activeVersionId = version.id; activeColorIndex = 0; }}
            >{version.name}</button>
          {/each}
        </div>

        <div class="vs-title-row">
          <h2>{activeVersion.name} 2026</h2>
          <span class="vs-price">{activeVersion.price}</span>
        </div>

        <div class="vs-showcase">
          <div class="vs-glow"></div>
          {#key activeColor.img}
            <img src={activeColor.img} alt={`Attitude ${activeColor.name}`} class="vs-hero-car" />
          {/key}
        </div>

        <div class="vs-color-bar">
          <span class="vs-color-label">{activeColor.name}</span>
          <div class="vs-dots">
            {#each activeVersion.colors as color, i}
              <button
                class="vs-dot"
                class:active={activeColorIndex === i}
                style={`--dot-color: ${color.hex}`}
                onclick={() => activeColorIndex = i}
                aria-label={color.name}
              ></button>
            {/each}
          </div>
        </div>
      </div>

      <div class="vs-panel-toggle">
        <button class:active={activePanel === 'colors'} onclick={() => activePanel = 'colors'}>
          <GoogleIcon name="palette" size={16} /> Exterior
        </button>
        <button class:active={activePanel === 'features'} onclick={() => activePanel = 'features'}>
          <GoogleIcon name="checklist" size={16} /> Equipamiento
        </button>
      </div>

      {#if activePanel === 'features'}
        <div class="vs-feat-grid">
          {#each showAllFeatures ? [...activeVersion.features[0], ...activeVersion.features[1]] : activeVersion.features[0] as feat, i}
            <div class="vs-feat-card" style={`--d:${i * 40}ms`}>
              <GoogleIcon name="check_circle" size={18} />
              <span>{feat}</span>
            </div>
          {/each}
        </div>
        <div class="vs-feat-more">
          <button class="vs-more-btn" onclick={() => showAllFeatures = !showAllFeatures}>
            {#if showAllFeatures}
              <GoogleIcon name="expand_less" size={16} /> Ver menos
            {:else}
              <GoogleIcon name="expand_more" size={16} /> Ver más equipamiento ({activeVersion.features[1].length} más)
            {/if}
          </button>
        </div>
      {:else}
        <div class="vs-exterior-row">
          <button class="vs-ext-card" onclick={() => toggleZoom(ATTITUDE_SXT_BLANCO)}>
            <img src={ATTITUDE_SXT_BLANCO} alt="Lateral" />
            <span>Vista lateral <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom(ATTITUDE_IMG)}>
            <img src={ATTITUDE_IMG} alt="Frontal" />
            <span>Vista frontal <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom(ATTITUDE_SXT_GRANITO)}>
            <img src={ATTITUDE_SXT_GRANITO} alt="Trasera" />
            <span>Vista trasera <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
        </div>
      {/if}

      <div class="vs-actions">
        <button onclick={goToQuote} class="vs-action primary">Cotizar ahora <GoogleIcon name="arrow_forward" size={16} /></button>
        <button onclick={goToTestDrive} class="vs-action ghost">Prueba de manejo</button>
      </div>
    </section>
  {/if}

  <section class="spec-band">
    {#each specs as item, i (item.label)}
      <article style={`--i:${i}`}>
        <strong>{item.value}</strong>
        <span>{item.label}</span>
      </article>
    {/each}
  </section>

  <section id="galeria" class="motion-gallery">
    <div class="motion-head">
      <p>Diseño Exterior</p>
      <h2>Diseñado para imponer presencia.</h2>
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

  <section id="historia" class="story-stack">
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

  <section id="interior" class="cockpit">
    <div class="cockpit-copy">
      <p>Único por dentro</p>
      <h2>La mayor comodidad.</h2>
      <span>Pantalla multimedia central, conectividad inalámbrica y comandos al volante para mantenerte enfocado en el camino sin distracciones.</span>
    </div>
    <div class="cockpit-carousel">
      <div class="cockpit-track" style={`transform: translateX(calc(-${cockpitIndex} * 100%))`}>
        {#each cockpitImages as img, i (i)}
          <img src={img} alt={`Interior Dodge ${i + 1}`} class="cockpit-slide" />
        {/each}
      </div>
      <button class="cockpit-nav prev" onclick={() => cockpitIndex = (cockpitIndex - 1 + cockpitImages.length) % cockpitImages.length} aria-label="Imagen anterior"><GoogleIcon name="chevron_left" size={22} /></button>
      <button class="cockpit-nav next" onclick={() => cockpitIndex = (cockpitIndex + 1) % cockpitImages.length} aria-label="Imagen siguiente"><GoogleIcon name="chevron_right" size={22} /></button>
      <div class="cockpit-dots">
        {#each cockpitImages as _, i (i)}
          <button class="cockpit-dot" class:active={cockpitIndex === i} onclick={() => cockpitIndex = i} aria-label={`Imagen ${i + 1}`}></button>
        {/each}
      </div>
    </div>
  </section>

  <section id="capacidad" class="capability">
    <img src={capabilityImage} alt="Dodge exterior de trabajo" />
    <div class="capability-card">
      <p>Capacidad y Desempeño</p>
      <h2>Siempre listo para romper la rutina.</h2>
      <div class="cap-list">
        {#each specs as item (item.label)}
          <span><GoogleIcon name="check_circle" size={18} /> {item.label}</span>
        {/each}
      </div>
    </div>
  </section>

  <section id="seguridad" class="safety-section">
    <div class="safety-content">
      <p>Confianza y Seguridad</p>
      <h2>Seguridad a donde quiera que vayas.</h2>
      <span>Sus avanzados sistemas de seguridad te ofrecen a ti y a tus acompañantes una protección integral. Frenos ABS en las 4 ruedas, control electrónico de estabilidad y bolsas de aire para mantenerte a salvo en cada rodada.</span>

      <div class="safety-features">
        <div class="safety-feat"><GoogleIcon name="report" size={26} /><span>Frenos ABS 4 ruedas</span></div>
        <div class="safety-feat"><GoogleIcon name="verified_user" size={26} /><span>Control de estabilidad</span></div>
        <div class="safety-feat"><GoogleIcon name="airline_seat_recline_normal" size={26} /><span>Bolsas de aire múltiples</span></div>
        <div class="safety-feat"><GoogleIcon name="visibility" size={26} /><span>Cámara de reversa</span></div>
      </div>
    </div>
  </section>

  <section id="dodge-quote" class="quote-section">
    <p>VAPSA Dodge</p>
    <h2>Agenda una prueba de manejo o recibe una cotización.</h2>
    <p class="quote-sub">Elige la opción que mejor se ajuste a lo que necesitas. Nuestro equipo está listo para atenderte.</p>

    <div class="quote-cta-grid">
      <button class="quote-cta-card" onclick={() => { drawerTab = 'prueba'; showCotizarDrawer = true; goToTestDrive() }}>
        <span class="qcc-icon"><GoogleIcon name="speed" size={28} /></span>
        <strong>Prueba de manejo</strong>
        <span class="qcc-desc">Agenda una cita para manejar el {model.name}</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
      <button class="quote-cta-card" onclick={() => { drawerTab = 'cotizacion'; showCotizarDrawer = true; goToQuote() }}>
        <span class="qcc-icon"><GoogleIcon name="description" size={28} /></span>
        <strong>Solicitar cotización</strong>
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

  .dodge-premium {
    min-height: 100vh;
    background: #050507;
    color: white;
    overflow: clip;
    font-family: Inter, Roboto, sans-serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --dodge-default: #D50000;
    --dodge-hover: #8C0000;
  }

  .dodge-premium * {
    box-sizing: border-box;
  }

  .dodge-hero {
    position: relative;
    min-height: 100svh;
    height: 100svh;
    display: grid;
    align-items: center;
    overflow: hidden;
  }

  .hero-fallback,
  .hero-shade {
    position: absolute;
    inset: 0;
  }

  @keyframes hero-zoom-out {
    0% { transform: scale(1.15); opacity: 0; }
    3% { opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  .hero-fallback {
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 35% center;
    opacity: 0;
    animation: hero-zoom-out 16s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .hero-shade {
    z-index: 2;
    background:
      radial-gradient(circle at 72% 46%, rgba(140, 0, 0, 0.20), transparent 32%),
      linear-gradient(90deg, rgba(5, 5, 7, 0.50) 0%, rgba(5, 5, 7, 0.20) 40%, rgba(5, 5, 7, 0.05) 100%),
      linear-gradient(0deg, #050507 0%, transparent 42%);
  }

  .dodge-hero::after {
    content: '';
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(140px, 22vh, 260px);
    background: linear-gradient(180deg, transparent 0%, rgba(5, 5, 7, 0.45) 50%, rgba(5, 5, 7, 0.85) 78%, #050507 100%);
    pointer-events: none;
  }

  .hero-copy {
    position: relative;
    z-index: 10;
    align-self: end;
    width: min(500px, calc(100vw - 48px));
    margin: 0 0 clamp(65px, 10vh, 85px) clamp(24px, 8vw, 128px);
    padding: 0;
    transform: translateY(calc(var(--scroll) * -52px));
    animation: hero-copy-in 1200ms var(--ease-out) both 180ms;
  }

  .hero-copy p,
  .cockpit-copy p,
  .quote-section p,
  .capability-card p,
  .story-panel p {
    margin: 0 0 10px;
    color: var(--dodge-hover);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero-copy h1 {
    margin: 0 0 12px;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .hero-copy .price-badge {
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

  .hero-copy .hero-slogan {
    display: none;
    margin: 0 0 16px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    text-transform: none;
    letter-spacing: normal;
  }

  .hero-copy .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 32px;
  }

  .hero-copy .hero-actions button {
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
    transition: all 300ms var(--ease-out);
  }

  .hero-copy .hero-actions button.primary {
    background: var(--dodge-default);
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 4px 16px rgba(213, 0, 0, 0.4);
  }

  .hero-copy .hero-actions button.primary:hover {
    background: var(--dodge-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(213, 0, 0, 0.6);
  }

  .hero-copy .hero-actions button.ghost {
    background: rgba(255, 255, 255, 0.10);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(10px);
  }

  .hero-copy .hero-actions button.ghost:hover {
    background: rgba(255, 255, 255, 0.20);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
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
    background: linear-gradient(180deg, var(--dodge-hover), rgba(255,255,255,0.72));
    box-shadow: 0 0 16px rgba(140, 0, 0, 0.72);
  }

  .product-nav {
    position: sticky;
    top: 74px;
    z-index: 35;
    width: min(1160px, calc(100% - 24px));
    min-height: 46px;
    margin: -23px auto 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px 0 16px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    background: rgba(12, 12, 16, 0.76);
    backdrop-filter: blur(26px) saturate(160%);
    -webkit-backdrop-filter: blur(26px) saturate(160%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 50px rgba(0,0,0,0.28);
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .product-nav::-webkit-scrollbar {
    display: none;
  }

  .product-nav strong {
    margin-right: 6px;
    font-size: 13px;
    flex-shrink: 0;
    white-space: nowrap;
    padding-right: 10px;
    border-right: 1px solid rgba(255,255,255,0.12);
  }

  .product-nav a,
  .product-nav button {
    min-height: 30px;
    display: inline-flex;
    align-items: center;
    border: 0;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.65);
    background: transparent;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0 8px;
    transition: color 320ms var(--ease-out), background 320ms var(--ease-out), transform 320ms var(--ease-out);
  }

  .nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
    margin: 0 4px;
  }

  .product-nav button {
    padding: 0 12px;
    color: white;
    background: var(--dodge-hover);
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
    min-height: 100vh;
    position: relative;
    background:
      radial-gradient(circle at 52% 25%, rgba(140, 0, 0, 0.24), transparent 34%),
      linear-gradient(180deg, #050507 0%, #09090d 48%, #050507 100%);
    display: flex;
    align-items: center;
  }

  .pin-visual {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(310px, 0.42fr);
    align-items: center;
    gap: clamp(26px, 4vw, 64px);
    width: min(1520px, calc(100% - clamp(32px, 7vw, 112px)));
    margin: 0 auto;
    padding: clamp(60px, 8vw, 100px) 0;
  }

  .pin-media-stack {
    display: grid;
    gap: 18px;
    min-width: 0;
  }

  .pin-media {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    padding: 0;
    overflow: hidden;
    cursor: zoom-in;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.045);
    box-shadow: 0 38px 90px rgba(0, 0, 0, 0.56), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .pin-media:hover,
  .pin-media:focus-visible {
    border-color: rgba(213, 0, 0, 0.72);
    box-shadow: 0 46px 110px rgba(0, 0, 0, 0.66), 0 0 0 1px rgba(213, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .truck-main {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
    object-fit: cover;
    transform: scale(1.025);
    transition: opacity 520ms var(--ease-out), transform 900ms var(--ease-out);
  }

  .pin-play-cue {
    position: absolute;
    z-index: 3;
    left: 20px;
    bottom: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    color: white;
    font-size: 12px;
    font-weight: 850;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: 999px;
    background: rgba(5, 7, 18, 0.44);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px) saturate(170%);
    transition: opacity 340ms var(--ease-out), transform 340ms var(--ease-out);
  }

  .pin-media:hover .pin-play-cue {
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
  }

  .pin-copy {
    position: relative;
    z-index: 3;
    align-self: center;
    width: 100%;
    padding: clamp(22px, 3.2vw, 42px);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(5, 7, 18, 0.40);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(28px) saturate(180%);
  }

  .pin-copy p {
    margin: 0 0 14px;
    color: rgba(255, 255, 255, 0.70);
    font-size: 14px;
    line-height: 1.5;
  }

  .pin-copy h2,
  .cockpit-copy h2,
  .quote-section h2,
  .capability-card h2,
  .story-panel h2 {
    margin: 0;
    font-size: clamp(30px, 3.6vw, 48px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    font-weight: 900;
  }

  .pin-copy h2 {
    font-size: clamp(26px, 3vw, 38px);
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
  }

  .spec-band article:hover {
    background: #101016;
    transform: translateY(-4px);
  }

  .spec-band strong {
    font-size: clamp(32px, 4.2vw, 56px);
    line-height: 1.02;
    letter-spacing: -0.02em;
  }

  .spec-band span {
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.56);
    font-size: 14px;
    line-height: 1.35;
  }

  .story-stack {
    background: #050507;
  }

  .motion-gallery {
    padding: clamp(70px, 9vw, 130px) 0 clamp(60px, 8vw, 112px);
    background:
      radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.16), transparent 30%),
      #050507;
    overflow: hidden;
  }

  .motion-head {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto 34px;
  }

  .motion-head p {
    margin: 0 0 14px;
    color: var(--dodge-hover);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .motion-head h2 {
    max-width: 720px;
    margin: 0;
    font-size: clamp(30px, 3.6vw, 48px);
    line-height: 1.08;
    font-weight: 950;
    letter-spacing: -0.02em;
  }

  .motion-cards {
    width: min(1380px, calc(100% - 32px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.05fr 1.28fr 0.92fr;
    gap: clamp(16px, 2vw, 24px);
    align-items: start;
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
    font-size: clamp(17px, 1.7vw, 22px);
    line-height: 1.15;
    letter-spacing: -0.01em;
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
    background: #050507;
  }

  .story-panel img {
    width: 100%;
    height: min(72vh, 720px);
    object-fit: cover;
    filter: saturate(0.95) contrast(1.08);
    transform: scale(1.01);
    transition: transform 1200ms var(--ease-out), filter 1200ms var(--ease-out);
  }

  .story-panel:hover img {
    transform: scale(1.035);
    filter: saturate(1.02) contrast(1.12);
  }

  .story-panel span,
  .cockpit-copy span {
    display: block;
    max-width: 480px;
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.70);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  .cockpit {
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(280px, 0.72fr) 1.28fr;
    align-items: center;
    gap: clamp(28px, 6vw, 90px);
    padding: clamp(28px, 6vw, 100px);
    background:
      radial-gradient(circle at 72% 34%, rgba(140, 0, 0, 0.20), transparent 30%),
      linear-gradient(180deg, #050507 0%, #08090d 100%);
  }

  .capability {
    position: relative;
    min-height: 100svh;
    display: grid;
    align-items: end;
    padding: clamp(24px, 6vw, 86px);
    overflow: hidden;
    background: #050507;
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
    background: linear-gradient(90deg, rgba(5, 5, 7, 0.88), rgba(5, 5, 7, 0.32) 58%, rgba(5, 5, 7, 0.9));
  }

  .capability-card {
    position: relative;
    z-index: 1;
    width: min(620px, 100%);
    margin-left: auto;
    padding: clamp(24px, 4vw, 44px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(8, 5, 5, 0.64);
    backdrop-filter: blur(24px);
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
      radial-gradient(circle at 50% 40%, rgba(140, 0, 0, 0.28), transparent 30%),
      #050507;
  }

  .quote-section h2 {
    max-width: 920px;
  }

  .safety-section {
    padding: clamp(70px, 9vw, 130px) 0;
    background: radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.08), transparent 40%), #050507;
    position: relative;
    z-index: 1;
  }

  .safety-content {
    width: min(1380px, calc(100% - 32px));
    margin: 0 auto;
  }

  .safety-content p {
    margin: 0 0 14px;
    color: var(--dodge-hover);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .safety-content h2 {
    max-width: 720px;
    margin: 0 0 20px;
    font-size: clamp(30px, 3.6vw, 48px);
    line-height: 1.08;
    font-weight: 950;
    letter-spacing: -0.02em;
  }

  .safety-content span {
    display: block;
    margin: 0 0 44px;
    color: rgba(255, 255, 255, 0.70);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.65;
    max-width: 540px;
  }

  .safety-features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: clamp(32px, 4vw, 56px);
  }

  .safety-feat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;
    padding: 24px 18px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(18px);
    transition: transform 420ms var(--ease-out), background 420ms var(--ease-out), border-color 420ms var(--ease-out);
  }

  .safety-feat:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.07);
    border-color: var(--dodge-hover);
  }

  .safety-feat :global(.material-symbols-outlined) {
    color: var(--dodge-hover);
    flex-shrink: 0;
  }

  .safety-feat span {
    font-size: 11px;
    font-weight: 700;
    line-height: 1.4;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 980px) {
    .safety-features {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    .safety-features {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* ── Cockpit carousel ── */
  .cockpit-carousel {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.10);
  }

  .cockpit-track {
    display: flex;
    transition: transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .cockpit-slide {
    flex: 0 0 100%;
    width: 100%;
    height: clamp(300px, 46vh, 560px);
    object-fit: cover;
    display: block;
  }

  .cockpit-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(8, 8, 14, 0.60);
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: white;
    cursor: pointer;
    backdrop-filter: blur(14px);
    transition: background 250ms ease, transform 250ms ease;
    padding: 0;
    z-index: 2;
  }

  .cockpit-nav:hover {
    background: rgba(8, 8, 14, 0.88);
    transform: translateY(-50%) scale(1.06);
  }

  .cockpit-nav.prev { left: 12px; }
  .cockpit-nav.next { right: 12px; }

  .cockpit-dots {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 2;
  }

  .cockpit-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.30);
    border: 0;
    padding: 0;
    cursor: pointer;
    transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1), background 400ms ease;
  }

  .cockpit-dot.active {
    width: 20px;
    background: rgba(255, 255, 255, 0.92);
  }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: zoom-out;
  }

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }

  .lightbox-content img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
  }

  .lightbox-close {
    position: absolute;
    top: -48px;
    right: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity .3s, transform .3s;
  }

  .lightbox-close:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  /* ── Quote CTA grid ── */
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

  .qcc-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255,255,255,0.10);
    color: rgba(255,255,255,0.85);
    flex-shrink: 0;
  }

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
    color: rgba(255,255,255,0.45);
    margin-top: auto;
    transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease;
  }

  .quote-cta-card:hover .qcc-arrow {
    transform: translateX(6px);
    color: rgba(255,255,255,0.90);
  }

  .nav-year {
    display: inline-block;
    padding: 1px 7px;
    margin-left: 4px;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 999px;
    background: rgba(213, 0, 0, 0.28);
    border: 1px solid rgba(213, 0, 0, 0.45);
    color: var(--dodge-hover);
    vertical-align: middle;
  }

  @keyframes hero-copy-in {
    from { opacity: 0; transform: translateY(34px); filter: blur(8px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes cue-pulse {
    0%, 100% { opacity: 0.38; transform: translateY(0); }
    50% { opacity: 0.76; transform: translateY(8px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .dodge-premium *,
    .dodge-premium *::before,
    .dodge-premium *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }

  @media (max-width: 900px) {
    .hero-copy {
      margin-left: 20px;
      margin-bottom: 110px;
      width: calc(100% - 40px);
    }

    .pin-stage {
      min-height: auto;
      padding: 82px 0;
    }

    .pin-visual {
      grid-template-columns: 1fr;
      width: min(720px, calc(100% - 28px));
      padding: 0;
      gap: 24px;
    }

    .pin-copy {
      padding: 24px;
    }

    .progress-rail {
      display: none;
    }

    .product-nav {
      top: 70px;
      width: calc(100% - 24px);
      gap: 16px;
      padding: 0 16px;
      border-radius: 20px;
    }

    .spec-band {
      grid-template-columns: 1fr 1fr;
    }

    .spec-band article {
      min-height: 140px;
      padding: 24px 20px;
    }

    .spec-band strong {
      font-size: clamp(28px, 8vw, 40px);
    }

    .spec-band span {
      font-size: 12px;
      margin-top: 8px;
    }

    .story-panel {
      position: relative;
      min-height: auto;
      padding: 62px 20px;
      grid-template-columns: 1fr;
    }

    .story-panel img {
      height: 46vh;
    }

    .motion-cards {
      grid-template-columns: 1fr;
    }

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
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .product-nav strong {
      max-width: 48vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pin-media {
      aspect-ratio: 4 / 3;
      border-radius: 24px;
    }

    .pin-copy h2 {
      font-size: 38px;
    }

    .cap-list,
    .cockpit-grid {
      grid-template-columns: 1fr;
    }

    .spec-band {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* ── VERSIONES · Apple-style ── */
  .vs { padding: clamp(80px,10vw,140px) 0; text-align: center; background: #06060a; overflow: hidden; }

  .vs-hero-zone { max-width: 1100px; margin: 0 auto; }

  .vs-pill-bar { display: inline-flex; gap: 4px; background: rgba(255,255,255,0.06); border-radius: 999px; padding: 4px; margin-bottom: 36px; }
  .vs-pill { background: none; border: none; padding: 9px 28px; border-radius: 999px; font-size: 13px; font-weight: 800; color: rgba(255,255,255,0.5); cursor: pointer; transition: all .3s; font-family: inherit; letter-spacing: .03em; }
  .vs-pill.active { background: white; color: #06060a; box-shadow: 0 2px 12px rgba(0,0,0,.25); }

  .vs-title-row { margin-bottom: 10px; }
  .vs-title-row h2 { font-size: clamp(28px,3.4vw,44px); font-weight: 900; margin: 0; letter-spacing: -.02em; line-height: 1.08; }
  .vs-price { font-size: 17px; color: #fff; font-weight: 700; display: block; margin-top: 4px; }

  .vs-showcase { position: relative; max-width: 720px; margin: 10px auto 0; padding: 20px 0; }
  .vs-glow { position: absolute; inset: 10% 15%; border-radius: 50%; background: radial-gradient(circle, rgba(213,0,0,0.20) 0%, transparent 70%); filter: blur(60px); z-index: 0; pointer-events: none; animation: glow-breathe 4s ease-in-out infinite alternate; }
  @keyframes glow-breathe { from { opacity: .5; transform: scale(.95); } to { opacity: 1; transform: scale(1.08); } }
  .vs-hero-car { position: relative; z-index: 1; width: 100%; max-height: 400px; object-fit: contain; border-radius: 40px; background: #ffffff; padding: 20px; filter: drop-shadow(0 40px 60px rgba(0,0,0,.55)); animation: car-reveal .6s cubic-bezier(.16,1,.3,1); }
  @keyframes car-reveal { from { opacity: 0; transform: scale(.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .vs-color-bar { margin-top: 6px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .vs-color-label { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.55); letter-spacing: .04em; text-transform: uppercase; min-height: 20px; transition: color .3s; }
  .vs-dots { display: flex; gap: 18px; }
  .vs-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--dot-color); border: 2px solid rgba(255,255,255,0.15); cursor: pointer; position: relative; transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; outline: none; }
  .vs-dot::after { content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 2px solid transparent; transition: border-color .3s; }
  .vs-dot.active { transform: scale(1.22); }
  .vs-dot.active::after { border-color: var(--dodge-hover); }
  .vs-dot:hover { transform: scale(1.15); }

  .vs-panel-toggle { display: flex; justify-content: center; gap: 10px; margin: 44px 0 32px; }
  .vs-panel-toggle button { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 24px; border-radius: 16px; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 700; cursor: pointer; transition: all .3s; font-family: inherit; }
  .vs-panel-toggle button.active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); color: white; }

  .vs-feat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; max-width: 1100px; margin: 0 auto; padding: 0 20px; text-align: left; }
  .vs-feat-card { display: flex; align-items: flex-start; gap: 12px; padding: 16px 20px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.5; animation: feat-in .4s ease-out both; animation-delay: var(--d); }
  .vs-feat-card :global(span.google-icon) { color: var(--dodge-hover); flex-shrink: 0; margin-top: 2px; }
  @keyframes feat-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .vs-feat-more { display: flex; justify-content: center; margin-top: 20px; }
  .vs-more-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.65); font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; transition: all .3s; }
  .vs-more-btn:hover { background: rgba(255, 255, 255, 0.10); color: white; }

  .vs-exterior-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 20px; }
  .vs-ext-card { width: 100%; border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: transform .3s, border-color .3s, background .3s; cursor: pointer; font-family: inherit; }
  .vs-ext-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }
  .vs-ext-card img { width: 100%; height: 180px; object-fit: contain; }
  .vs-ext-card span { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: .08em; }
  .vs-ext-card span :global(.material-symbols-outlined) { color: var(--dodge-hover); opacity: 0.7; }

  .vs-actions { display: flex; justify-content: center; gap: 14px; margin-top: 48px; flex-wrap: wrap; }
  .vs-action { display: inline-flex; align-items: center; gap: 8px; height: 52px; padding: 0 32px; border-radius: 999px; font-size: 14px; font-weight: 800; cursor: pointer; text-decoration: none; border: none; font-family: inherit; transition: all .3s cubic-bezier(.16,1,.3,1); }
  .vs-action.primary { background: var(--dodge-hover); color: white; box-shadow: 0 4px 24px rgba(140,0,0,0.35); }
  .vs-action.primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 32px rgba(140,0,0,0.5); }
  .vs-action.ghost { background: transparent; border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.75); }
  .vs-action.ghost:hover { border-color: rgba(255,255,255,0.35); color: white; transform: translateY(-2px); }

  @media (max-width: 900px) {
    .vs-exterior-row { grid-template-columns: 1fr; }
    .vs-feat-grid { grid-template-columns: 1fr; }
    .vs-hero-car { max-height: 280px; }
    .vs-pill { padding: 8px 20px; font-size: 12px; }

    .vs-pill-bar,
    .vs-title-row,
    .vs-showcase,
    .vs-color-bar,
    .vs-panel-toggle,
    .vs-actions {
      padding-left: 16px;
      padding-right: 16px;
      box-sizing: border-box;
    }

    .vs-feat-grid,
    .vs-exterior-row {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  /* MOBILE HERO SPLIT LAYOUT */
  @media (max-width: 768px) {
    .dodge-premium {
      display: flex;
      flex-direction: column;
    }
    .product-nav {
      order: -1;
      margin: 64px 0 0 0;
      top: 64px;
      width: 100%;
      border-radius: 0;
      border-left: none;
      border-right: none;
      z-index: 38;
      padding: 0 16px;
    }
    .dodge-hero {
      order: 0;
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: auto;
      background: #000;
      padding-top: 0;
      margin-bottom: 16px;
    }
    .hero-fallback {
      position: relative;
      width: 100%;
      height: auto;
      max-height: 50vh;
      object-fit: contain;
      object-position: center bottom;
      margin: 0;
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .hero-shade {
      display: none;
    }
    .hero-copy {
      position: relative;
      width: 100%;
      margin: 0;
      padding: 12px 16px 16px;
      transform: none !important;
      align-self: flex-start;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: none;
    }
    .hero-copy h1 {
      font-size: 32px;
      margin-bottom: 8px;
    }
    .hero-copy .hero-slogan {
      display: block;
    }
    .hero-copy .hero-actions {
      width: 100%;
      flex-direction: column;
      gap: 14px;
      margin-top: 16px;
      margin-bottom: 32px;
    }
    .hero-copy .hero-actions button {
      width: 100%;
      min-height: 48px;
    }
    .scroll-cue {
      display: none;
    }
  }
</style>
