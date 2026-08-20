<script lang="ts">
  import { onMount } from 'svelte'
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  let showCotizarDrawer = $state(false)
  type DrawerTab = 'cotizacion' | 'prueba' | 'cita'
  let drawerTab = $state<DrawerTab>('cotizacion')

  let { modelSlug = '5008' }: { modelSlug?: string | null } = $props()
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
    cockpitImages?: string[]
    storyImages?: string[]
    motionImages?: string[]
    capabilityImage?: string
    mobileCapabilityImage?: string
  }

  const modelDetails: Record<string, ModelDetail> = {
    '5008': {
      name: 'Peugeot 5008',
      kicker: 'Peugeot 5008 2026',
      title: 'Más espacio para vivir sin dejar atrás quien eres.',
      subtitle: 'La SUV de 7 plazas de Peugeot: espacio para toda la familia, motor turbo, i-Cockpit® Panorámico de 21" y elegancia francesa en cada detalle.',
      heroImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026.jpg',
      mobileHeroImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026-mob.jpg',
      spotlightImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026.jpg',
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Peugeot%205008',
      price: 'Desde $754,900',
      specs: [
        { value: '7', label: 'Plazas en 3 filas de asientos' },
        { value: '180 hp', label: 'Motor 1.6L Turbo eficiente' },
        { value: '21"', label: 'Pantalla curva i-Cockpit® HD' },
        { value: 'ADAS', label: '10 asistencias de seguridad activa' },
      ],
      motionTitle: 'Espacio familiar sin renunciar al estilo.',
      motionCopy: 'El Peugeot 5008 combina la practicidad de 7 plazas modulables con la elegancia, confort y tecnología de última generación.',
      cockpitImages: [
        '/adistem2026/peugeot/5008-2026/interior/interior-1.jpg',
        '/adistem2026/peugeot/5008-2026/interior/interior-2.jpg',
        '/adistem2026/peugeot/5008-2026/interior/interior-3.jpg'
      ],
      storyImages: [
        '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-1.jpg',
        '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-2.jpg',
        '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-3.jpg'
      ],
      motionImages: [
        '/adistem2026/peugeot/5008-2026/exterior/exterior-1.jpg',
        '/adistem2026/peugeot/5008-2026/exterior/exterior-2.jpg',
        '/adistem2026/peugeot/5008-2026/exterior/exterior-3.jpg'
      ],
      capabilityImage: '/adistem2026/peugeot/5008-2026/capacidad/capacidad.jpg',
      mobileCapabilityImage: '/adistem2026/peugeot/5008-2026/capacidad/capacidad-mob.jpg'
    },
    '2008': {
      name: 'Peugeot 2008',
      kicker: 'Peugeot 2008 2026',
      title: 'No llegaste para pasar desapercibido.',
      subtitle: 'Una SUV con la actitud, tecnología y presencia que acompañan todo lo que estás construyendo. Con el i-Cockpit® de última generación.',
      heroImage: '/adistem2026/peugeot/story-panels/2008-2026.jpg',
      mobileHeroImage: '/adistem2026/peugeot/story-panels/2008-2026-mobile.jpg',
      spotlightImage: '/adistem2026/peugeot/story-panels/2008-2026.jpg',
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Peugeot%202008',
      price: 'Desde $458,900',
      specs: [
        { value: 'i-Cockpit', label: 'Puesto de conducción de última generación' },
        { value: 'GT', label: 'Versión tope de gama' },
        { value: '7.99%', label: 'Tasa preferencial de financiamiento' },
        { value: 'ADAS', label: 'Sistemas de asistencia al conductor' },
      ],
      motionTitle: 'El placer de una conducción instintiva.',
      motionCopy: 'El i-Cockpit® con volante compacto y comandos integrados te da ergonomía y tecnología de calidad, para que solo te concentres en lo esencial.',
    },
    '3008': {
      name: 'Peugeot 3008',
      kicker: 'Peugeot 3008 2026',
      title: 'La sofisticación no necesita presumir.',
      subtitle: 'La SUV donde cada detalle fue pensado para quienes entienden que el verdadero lujo está en cómo se vive.',
      heroImage: '/adistem2026/peugeot/story-panels/3008-2026.jpg',
      mobileHeroImage: '/adistem2026/peugeot/story-panels/3008-2026-mobile.jpg',
      spotlightImage: '/adistem2026/peugeot/story-panels/3008-2026.jpg',
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Peugeot%203008',
      price: 'Desde $629,900',
      specs: [
        { value: 'Allure', label: 'Paquete de equipamiento premium' },
        { value: '3D', label: 'Clúster digital i-Cockpit 3D' },
        { value: '7.99%', label: 'Tasa desde, sin comisión por apertura' },
        { value: '3 años', label: 'Mantenimiento gratis incluido' },
      ],
      motionTitle: 'Cada detalle pensado para vivir mejor.',
      motionCopy: 'El 3008 combina diseño, tecnología y materiales premium para una experiencia de manejo superior, sin necesidad de presumir.',
    },
    'partner': {
      name: 'Peugeot Partner',
      kicker: 'Peugeot Partner 2026',
      title: 'Versatilidad para tu negocio.',
      subtitle: 'Espacio, practicidad y la confiabilidad Peugeot para acompañar tu negocio y tu movilidad diaria.',
      heroImage: '/adistem2026/promociones/peugeot-partner-2026.jpg',
      mobileHeroImage: '/adistem2026/promociones/peugeot-partner-2026.jpg',
      spotlightImage: '/adistem2026/promociones/peugeot-partner-2026.jpg',
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20Peugeot%20Partner',
      price: 'Desde $439,900',
      specs: [
        { value: 'Active', label: 'Versión de entrada equipada' },
        { value: 'Cargo', label: 'Amplio espacio de carga' },
        { value: '11.99%', label: 'Tasa desde, sin comisión por apertura' },
        { value: '2 años', label: 'Mantenimiento gratis incluido' },
      ],
      motionTitle: 'Hecha para trabajar todos los días.',
      motionCopy: 'La Partner está diseñada para resolver: cargar, moverse y acompañar tu operación diaria con la confiabilidad Peugeot.',
    },
  }

  const fallbackModel: ModelDetail = {
    name: 'Peugeot 5008',
    kicker: 'Peugeot 5008 2026',
    title: 'Más espacio para vivir sin dejar atrás quien eres.',
    subtitle: 'La SUV de 7 plazas de Peugeot: espacio para toda la familia, motor turbo y elegancia francesa en cada detalle.',
    heroImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026.jpg',
    mobileHeroImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026-mob.jpg',
    spotlightImage: '/adistem2026/peugeot/5008-2026/hero/5008-2026.jpg',
    quote: 'Hola,%20me%20interesa%20cotizar%20un%20Peugeot 5008',
    price: 'Desde $754,900',
    specs: [
      { value: '7', label: 'Plazas en 3 filas de asientos' },
      { value: '180 hp', label: 'Motor 1.6L Turbo' },
      { value: '21"', label: 'i-Cockpit® Panorámico' },
      { value: 'ADAS', label: 'Sistemas de asistencia' },
    ],
    motionTitle: 'Espacio familiar sin renunciar al estilo.',
    motionCopy: 'Diseñado para destacar, con la tecnología y el estilo que identifican a cada Peugeot.',
  }

  const model = $derived(modelDetails[modelSlug ?? ''] ?? fallbackModel)
  const specs = $derived(model.specs)

  const story = $derived([
    { kicker: 'Diseño', title: 'Allure francés que se impone.', copy: 'Silueta aerodinámica, firma lumínica con garras LED de 3 líneas y parrilla sin marco con el nuevo emblema Peugeot.', image: model.storyImages?.[0] || '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-1.jpg' },
    { kicker: 'Tecnología', title: 'i-Cockpit® Panorámico de 21".', copy: 'Pantalla curva panorámica flotante de 21 pulgadas en alta definición que fusiona clúster y pantalla táctil central.', image: model.storyImages?.[1] || '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-2.jpg' },
    { kicker: 'Confort', title: '3 filas para 7 personas.', copy: 'Espacio modular amplio y flexible con asientos de piel sintética y alcántara, climatización tri-zona y techo panorámico.', image: model.storyImages?.[2] || '/adistem2026/peugeot/5008-2026/equipamiento/equipamiento-3.jpg' },
  ])

  const motionCards = $derived([
    { title: 'Presencia distinguida', copy: 'Líneas fluidas y proporciones equilibradas que transmiten refinamiento en cualquier entorno.', image: model.motionImages?.[0] || '/adistem2026/peugeot/5008-2026/exterior/exterior-1.jpg' },
    { title: 'Iluminación Pixel LED', copy: 'Faros delanteros adaptativos Pixel LED con tecnología antideslumbramiento y diseño felino inconfundible.', image: model.motionImages?.[1] || '/adistem2026/peugeot/5008-2026/exterior/exterior-2.jpg' },
    { title: 'Rines bitono diamantados', copy: 'Rines de aluminio de 19 pulgadas con diseño geométrico y acabado diamantado en contraste negro.', image: model.motionImages?.[2] || '/adistem2026/peugeot/5008-2026/exterior/exterior-3.jpg' },
  ])

  const cockpitImages = $derived(model.cockpitImages || [
    '/adistem2026/peugeot/5008-2026/interior/interior-1.jpg',
    '/adistem2026/peugeot/5008-2026/interior/interior-2.jpg',
    '/adistem2026/peugeot/5008-2026/interior/interior-3.jpg'
  ])

  const capabilityImage = $derived(model.capabilityImage || '/adistem2026/peugeot/5008-2026/capacidad/capacidad.jpg')
  const mobileCapabilityImage = $derived(model.mobileCapabilityImage || capabilityImage)

  // Datos reales verificados Peugeot 5008 2026
  const PEUGEOT_5008_COLORS = [
    { name: 'AZUL INGARO', hex: '#5b7fa6', img: '/adistem2026/peugeot/5008-2026/versiones/gt/azul-ingaro.jpg' },
    { name: 'BLANCO OKENITE', hex: '#eef2f5', img: '/adistem2026/peugeot/5008-2026/versiones/gt/blanco-okenite.jpg' },
    { name: 'GRIS ARTENSE', hex: '#999cad', img: '/adistem2026/peugeot/5008-2026/versiones/gt/gris-artense.jpg' },
    { name: 'GRIS TITANIUM', hex: '#5b5d5e', img: '/adistem2026/peugeot/5008-2026/versiones/gt/gris-titanium.jpg' }
  ]
  const PEUGEOT_5008_LATERAL = '/adistem2026/peugeot/5008-2026/galeria/vista-lateral.jpg'
  const PEUGEOT_5008_FRONTAL = '/adistem2026/peugeot/5008-2026/galeria/vista-frontal.jpg'
  const PEUGEOT_5008_TRASERA = '/adistem2026/peugeot/5008-2026/galeria/vista-trasera.jpg'

  const PeugeotVersions = [
    {
      id: '5008-gt',
      name: '5008 GT',
      price: 'Desde $754,900',
      colors: PEUGEOT_5008_COLORS,
      features: [
        [
          'Motor 1.6L Turbo de 180 hp con 250 Nm de torque',
          'Transmisión automática de 6 velocidades',
          'Capacidad para 7 pasajeros en 3 filas de asientos modulables',
          'Nuevo i-Cockpit® Panorámico: pantalla curva HD de 21"',
          'Asientos Dynamic con ajuste eléctrico, calefacción y función de masaje'
        ],
        [
          'Aire acondicionado automático Tri-zona con salidas en 2.ª y 3.ª fila',
          'Cabin Clean: sensor y filtrado activo de partículas',
          'Cajuela eléctrica con sensor de pie "Manos Libres"',
          'Cargador inalámbrico por inducción para smartphone',
          'Faros adaptativos Pixel LED con encendido automático',
          'Rines de aluminio bitono diamantados de 19"',
          'Techo panorámico eléctrico "Black Diamond"',
          '10 asistencias ADAS: frenado autónomo de emergencia, control crucero adaptativo Stop&Go y mantenimiento de carril',
          'Cámara de visión 360° con sensores delanteros y traseros',
          '6 bolsas de aire (frontales, laterales y de cortina para las 3 filas)'
        ]
      ]
    },
    {
      id: '5008-gt-black',
      name: '5008 GT Black Edition',
      price: 'Desde $795,900',
      colors: PEUGEOT_5008_COLORS,
      features: [
        [
          'Mismo equipamiento que 5008 GT, más:',
          'Paquete estético Black Edition (parrilla, molduras y emblemas en negro brillante)',
          'Motor 1.6L Turbo de 180 hp',
          'Transmisión automática de 6 velocidades',
          'Capacidad para 7 pasajeros'
        ],
        [
          'Nuevo i-Cockpit® Panorámico: pantalla curva HD de 21"',
          'Asientos Dynamic con ajuste eléctrico, calefacción y masaje',
          'Rines de aluminio de 19" en acabado negro brillante satinado',
          'Techo panorámico eléctrico "Black Diamond"',
          '10 asistencias ADAS y cámara de reversa 360°',
          '6 bolsas de aire para protección integral de las 3 filas'
        ]
      ]
    }
  ]

  let activeVersionId = $state(PeugeotVersions[0].id)
  let activeColorIndex = $state(0)
  let activePanel = $state('colors')
  let showAllFeatures = $state(false)

  const activeVersion = $derived(PeugeotVersions.find(v => v.id === activeVersionId)!)
  const activeColor = $derived(activeVersion.colors[activeColorIndex] || activeVersion.colors[0])

  $effect(() => {
    activeVersionId
    showAllFeatures = false
  })

  // ── ADAS Carousel Logic ──
  type AdasItem = {
    id: number
    label: string
    video?: string
    poster?: string
    image?: string
  }

  const adasItems: AdasItem[] = [
    { id: 0, label: 'CONTROL ELECTRÓNICO DE ESTABILIDAD (ESP)', image: '/adistem2026/peugeot/5008-2026/seguridad/seguridad-1.jpg' },
    { id: 1, label: 'SISTEMA DE FRENADO DE EMERGENCIA', image: '/adistem2026/peugeot/5008-2026/seguridad/seguridad-2.jpg' }
  ]

  let adasIndex = $state(0)
  let adasAutoplay = $state(true)

  $effect(() => {
    if (!adasAutoplay) return
    const interval = setInterval(() => {
      adasIndex = (adasIndex + 1) % adasItems.length
    }, 6000)
    return () => clearInterval(interval)
  })

  let cockpitIndex = $state(0)
  let pinVideoActive = $state(false)
  let pinMediaEl = $state<HTMLDivElement>()

  const pinVideoSrc = $derived(
    pinVideoActive
      ? 'https://www.youtube.com/embed/2kY99v9l6I4?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=2kY99v9l6I4'
      : ''
  )

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

    let observer: IntersectionObserver | undefined
    if (pinMediaEl) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
              pinVideoActive = true
            } else if (entry.intersectionRatio < 0.15) {
              pinVideoActive = false
            }
          }
        },
        { threshold: [0, 0.15, 0.45, 0.7, 1] }
      )
      observer.observe(pinMediaEl)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer?.disconnect()
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

<main class="peugeot-premium" style={`--scroll:${progress}`}>
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

  <section id="inicio" class="peugeot-hero">
    <img class="hero-fallback hero-desktop-img" src={model.heroImage} alt={model.name} />
    <img class="hero-fallback hero-mobile-img" src={model.mobileHeroImage || model.heroImage} alt={model.name} />
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
        <ContactFormCard accent="#0074E8" initialBrand="Peugeot" initialModel={model.name.replace('Peugeot ', '') + ' 2026'} hideBrandSelect={true} />
      </div>
    </div>

    <div class="scroll-cue">Desliza</div>
  </section>

  <div id="mobile-hero-form" class="w-full max-w-lg mx-auto px-4 py-6 xl:hidden relative z-10">
    <ContactFormCard accent="#0074E8" initialBrand="Peugeot" initialModel={model.name.replace('Peugeot ', '') + ' 2026'} hideBrandSelect={true} />
  </div>

  <nav class="product-nav hidden md:flex" aria-label="Navegación de producto Peugeot">
    <strong>{model.name} <span class="nav-year">2026</span></strong>
    <a href="#inicio">Inicio</a>
    {#if modelSlug === '5008'}
      <a href="#versiones">Versiones</a>
    {/if}
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
        <div
          bind:this={pinMediaEl}
          role="button"
          tabindex="0"
          class="pin-media"
          class:video-active={pinVideoActive}
          aria-label={`Reproducir video de ${model.name}`}
          onclick={() => pinVideoActive = !pinVideoActive}
          onkeydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              pinVideoActive = !pinVideoActive
            }
          }}
        >
          <img class:video-active={pinVideoActive} class="truck-main" src={model.spotlightImage} alt={model.name} />
          {#if pinVideoSrc}
            <iframe
              class="pin-video"
              src={pinVideoSrc}
              title={`Video ${model.name}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            ></iframe>
          {/if}
          <span class="pin-play-cue">
            <GoogleIcon name="play_arrow" size={22} />
            Ver video
          </span>
        </div>
      </div>
      <div class="pin-copy">
        <p>{model.motionCopy}</p>
        <h2>{model.motionTitle}</h2>
      </div>
    </div>
  </section>

  {#if modelSlug === '5008'}
    <section id="versiones" class="vs">
      <div class="vs-hero-zone">
        <div class="vs-pill-bar">
          {#each PeugeotVersions as version}
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
            <img src={activeColor.img} alt={`Peugeot ${activeColor.name}`} class="vs-hero-car" />
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
          <button class="vs-ext-card" onclick={() => toggleZoom(PEUGEOT_5008_LATERAL)}>
            <img src={PEUGEOT_5008_LATERAL} alt="Lateral" />
            <span>Vista lateral <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom(PEUGEOT_5008_FRONTAL)}>
            <img src={PEUGEOT_5008_FRONTAL} alt="Frontal" />
            <span>Vista frontal <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom(PEUGEOT_5008_TRASERA)}>
            <img src={PEUGEOT_5008_TRASERA} alt="Trasera" />
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
      <h2>No llegaste para pasar desapercibido.</h2>
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
      <h2>La conducción instintiva.</h2>
      <span>El i-Cockpit® de última generación con volante compacto y comandos integrados te ofrece ergonomía y tecnología de calidad, para concentrarte solo en lo esencial.</span>
    </div>
    <div class="cockpit-carousel">
      <div class="cockpit-track" style={`transform: translateX(calc(-${cockpitIndex} * 100%))`}>
        {#each cockpitImages as img, i (i)}
          <img src={img} alt={`Interior Peugeot ${i + 1}`} class="cockpit-slide" />
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
    <img class="cap-desktop-img" src={capabilityImage} alt="Peugeot capacidad y desempeño" />
    {#if mobileCapabilityImage}
      <img class="cap-mobile-img" src={mobileCapabilityImage} alt="Peugeot capacidad y desempeño" />
    {/if}
    <div class="capability-card">
      <p>Capacidad y Desempeño</p>
      <h2>Espacio, confort y potencia para 7 pasajeros.</h2>
      <div class="cap-list">
        <span><GoogleIcon name="speed" size={18} /> Motor 1.6L Turbo 180 hp y 250 Nm</span>
        <span><GoogleIcon name="sync_alt" size={18} /> Transmisión automática 6 velocidades</span>
        <span><GoogleIcon name="group" size={18} /> 3 filas de asientos para 7 pasajeros</span>
        <span><GoogleIcon name="verified_user" size={18} /> i-Cockpit® Panorámico HD de 21"</span>
      </div>
    </div>
  </section>

  <section id="seguridad" class="safety-section">
    <div class="safety-content">
      <p>Confianza y Seguridad</p>
      <h2>Seguridad a donde quiera que vayas.</h2>
      <span>Sus avanzados sistemas de seguridad te ofrecen a ti y a tus acompañantes una protección integral. Frenos ABS, control electrónico de estabilidad y bolsas de aire para mantenerte a salvo en cada rodada.</span>

      <!-- ── ADAS Slider ── -->
      <p class="safety-sub-label">Sistemas de Asistencia ADAS</p>
      
      <div class="adas-carousel-container" style={`--adas-idx: ${adasIndex}`}>
        <div class="adas-track" style={`transform: translateX(calc(-${adasIndex} * (100% / ${Math.max(adasItems.length, 1)})));`}>
          {#each adasItems as item, i}
            <div class="safety-vid-card adas-slide" class:active={i === adasIndex}>
              {#if item.video}
                <video src={item.video} poster={item.poster || ''} autoplay muted loop playsinline></video>
              {:else if item.image}
                <img src={item.image} alt={item.label} />
              {/if}
              <div class="svc-label"><span>{item.label}</span></div>
            </div>
          {/each}
        </div>

        <div class="carousel-controls adas-controls">
          <div class="carousel-pill" aria-label="Sistemas ADAS">
            {#each adasItems as _, i}
              <button 
                class:active={i === adasIndex} 
                onclick={() => { adasIndex = i; adasAutoplay = false; }}
                aria-label={`Ver asistente ${i + 1}`}
              ></button>
            {/each}
          </div>
          <button class="play-btn" onclick={() => adasAutoplay = !adasAutoplay} aria-label={adasAutoplay ? 'Pausar carrusel' : 'Reproducir carrusel'}>
            <GoogleIcon name={adasAutoplay ? 'pause' : 'play_arrow'} size={18} />
          </button>
        </div>
      </div>

      <div class="safety-features">
        <div class="safety-feat"><GoogleIcon name="report" size={26} /><span>Frenos ABS</span></div>
        <div class="safety-feat"><GoogleIcon name="verified_user" size={26} /><span>Control de estabilidad</span></div>
        <div class="safety-feat"><GoogleIcon name="airline_seat_recline_normal" size={26} /><span>6 Bolsas de aire</span></div>
        <div class="safety-feat"><GoogleIcon name="visibility" size={26} /><span>Cámara y sensores 360°</span></div>
      </div>
    </div>
  </section>

  <section id="peugeot-quote" class="quote-section">
    <p>VAPSA Peugeot</p>
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

  .peugeot-premium {
    min-height: 100vh;
    background: #03050a;
    color: white;
    overflow: clip;
    font-family: Inter, Roboto, sans-serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --peugeot-default: #0074E8;
    --peugeot-hover: #0057AD;
  }

  .peugeot-premium * {
    box-sizing: border-box;
  }

  .peugeot-hero {
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

  .hero-desktop-img {
    display: block !important;
  }
  .hero-mobile-img {
    display: none !important;
  }

  @media (max-width: 1024px) {
    .hero-desktop-img {
      display: none !important;
    }
    .hero-mobile-img {
      display: block !important;
      object-position: center center;
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  .hero-shade {
    z-index: 2;
    background:
      radial-gradient(circle at 72% 46%, rgba(0, 87, 173, 0.22), transparent 32%),
      linear-gradient(90deg, rgba(3, 5, 10, 0.50) 0%, rgba(3, 5, 10, 0.20) 40%, rgba(3, 5, 10, 0.05) 100%),
      linear-gradient(0deg, #03050a 0%, transparent 42%);
  }

  .peugeot-hero::after {
    content: '';
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(140px, 22vh, 260px);
    background: linear-gradient(180deg, transparent 0%, rgba(3, 5, 10, 0.45) 50%, rgba(3, 5, 10, 0.85) 78%, #03050a 100%);
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
    color: var(--peugeot-hover);
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
    background: var(--peugeot-default);
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 4px 16px rgba(0, 116, 232, 0.4);
  }

  .hero-copy .hero-actions button.primary:hover {
    background: var(--peugeot-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 116, 232, 0.6);
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
    background: linear-gradient(180deg, var(--peugeot-hover), rgba(255,255,255,0.72));
    box-shadow: 0 0 16px rgba(0, 87, 173, 0.72);
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
    background: rgba(10, 12, 18, 0.76);
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
    background: var(--peugeot-hover);
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
      radial-gradient(circle at 52% 25%, rgba(0, 87, 173, 0.26), transparent 34%),
      linear-gradient(180deg, #03050a 0%, #080b12 48%, #03050a 100%);
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
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.045);
    box-shadow: 0 38px 90px rgba(0, 0, 0, 0.56), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .pin-media:hover,
  .pin-media:focus-visible {
    border-color: rgba(0, 116, 232, 0.72);
    box-shadow: 0 46px 110px rgba(0, 0, 0, 0.66), 0 0 0 1px rgba(0, 116, 232, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .truck-main,
  .pin-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
  }

  .truck-main {
    object-fit: cover;
    transform: scale(1.025);
    transition: opacity 520ms var(--ease-out), transform 900ms var(--ease-out), filter 520ms var(--ease-out);
  }

  .truck-main.video-active {
    opacity: 0;
    transform: scale(1.055);
    filter: blur(8px);
  }

  .pin-video {
    z-index: 2;
    background: #03050a;
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

  .pin-media:hover .pin-play-cue,
  .pin-media:focus-visible .pin-play-cue,
  .pin-media.video-active .pin-play-cue {
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

  /* ── VERSIONES ── */
  .vs { padding: clamp(80px,10vw,140px) 0; text-align: center; background: #06060a; overflow: hidden; }

  .vs-hero-zone { max-width: 1100px; margin: 0 auto; }

  .vs-pill-bar { display: inline-flex; gap: 4px; background: rgba(255,255,255,0.06); border-radius: 999px; padding: 4px; margin-bottom: 36px; }
  .vs-pill { background: none; border: none; padding: 9px 28px; border-radius: 999px; font-size: 13px; font-weight: 800; color: rgba(255,255,255,0.5); cursor: pointer; transition: all .3s; font-family: inherit; letter-spacing: .03em; }
  .vs-pill.active { background: white; color: #06060a; box-shadow: 0 2px 12px rgba(0,0,0,.25); }

  .vs-title-row { margin-bottom: 10px; }
  .vs-title-row h2 { font-size: clamp(28px,3.4vw,44px); font-weight: 900; margin: 0; letter-spacing: -.02em; line-height: 1.08; }
  .vs-price { font-size: 17px; color: #fff; font-weight: 700; display: block; margin-top: 4px; }

  .vs-showcase { position: relative; max-width: 720px; margin: 10px auto 0; padding: 20px 0; }
  .vs-glow { position: absolute; inset: 10% 15%; border-radius: 50%; background: radial-gradient(circle, rgba(0,116,232,0.18) 0%, transparent 70%); filter: blur(60px); z-index: 0; pointer-events: none; animation: glow-breathe 4s ease-in-out infinite alternate; }
  @keyframes glow-breathe { from { opacity: .5; transform: scale(.95); } to { opacity: 1; transform: scale(1.08); } }
  .vs-hero-car { position: relative; z-index: 1; width: 100%; max-height: 400px; object-fit: contain; border-radius: 40px; background: #ffffff; padding: 20px; filter: drop-shadow(0 40px 60px rgba(0,0,0,.55)); animation: car-reveal .6s cubic-bezier(.16,1,.3,1); }
  @keyframes car-reveal { from { opacity: 0; transform: scale(.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .vs-color-bar { margin-top: 6px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .vs-color-label { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.55); letter-spacing: .04em; text-transform: uppercase; min-height: 20px; transition: color .3s; }
  .vs-dots { display: flex; gap: 18px; }
  .vs-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--dot-color); border: 2px solid rgba(255,255,255,0.15); cursor: pointer; position: relative; transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; outline: none; }
  .vs-dot::after { content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 2px solid transparent; transition: border-color .3s; }
  .vs-dot.active { transform: scale(1.22); }
  .vs-dot.active::after { border-color: var(--peugeot-hover); }
  .vs-dot:hover { transform: scale(1.15); }

  .vs-panel-toggle { display: flex; justify-content: center; gap: 10px; margin: 44px 0 32px; }
  .vs-panel-toggle button { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 24px; border-radius: 16px; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 700; cursor: pointer; transition: all .3s; font-family: inherit; }
  .vs-panel-toggle button.active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); color: white; }

  .vs-feat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; max-width: 1100px; margin: 0 auto; padding: 0 20px; text-align: left; }
  .vs-feat-card { display: flex; align-items: flex-start; gap: 12px; padding: 16px 20px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.5; animation: feat-in .4s ease-out both; animation-delay: var(--d); }
  .vs-feat-card :global(span.google-icon) { color: var(--peugeot-hover); flex-shrink: 0; margin-top: 2px; }
  @keyframes feat-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .vs-feat-more { display: flex; justify-content: center; margin-top: 20px; }
  .vs-more-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.14); background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.65); font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; transition: all .3s; }
  .vs-more-btn:hover { background: rgba(255, 255, 255, 0.10); color: white; }

  .vs-exterior-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 20px; }
  .vs-ext-card { width: 100%; border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: transform .3s, border-color .3s, background .3s; cursor: pointer; font-family: inherit; }
  .vs-ext-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }
  .vs-ext-card img { width: 100%; height: 180px; object-fit: contain; }
  .vs-ext-card span { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: .08em; }
  .vs-ext-card span :global(.material-symbols-outlined) { color: var(--peugeot-hover); opacity: 0.7; }

  .vs-actions { display: flex; justify-content: center; gap: 14px; margin-top: 48px; flex-wrap: wrap; }
  .vs-action { display: inline-flex; align-items: center; gap: 8px; height: 52px; padding: 0 32px; border-radius: 999px; font-size: 14px; font-weight: 800; cursor: pointer; text-decoration: none; border: none; font-family: inherit; transition: all .3s cubic-bezier(.16,1,.3,1); }
  .vs-action.primary { background: var(--peugeot-hover); color: white; box-shadow: 0 4px 24px rgba(0,87,173,0.35); }
  .vs-action.primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 32px rgba(0,87,173,0.5); }
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
    background: #06070a;
    transition: background 650ms var(--ease-out), transform 650ms var(--ease-out);
  }

  .spec-band article:hover {
    background: #0e1016;
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
    background: #03050a;
  }

  .motion-gallery {
    padding: clamp(70px, 9vw, 130px) 0 clamp(60px, 8vw, 112px);
    background:
      radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.16), transparent 30%),
      #03050a;
    overflow: hidden;
  }

  .motion-head {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto 34px;
  }

  .motion-head p {
    margin: 0 0 14px;
    color: var(--peugeot-hover);
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
    background: #03050a;
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
      radial-gradient(circle at 72% 34%, rgba(0, 87, 173, 0.20), transparent 30%),
      linear-gradient(180deg, #03050a 0%, #070a10 100%);
  }

  .capability {
    position: relative;
    min-height: 100svh;
    display: grid;
    align-items: end;
    padding: clamp(24px, 6vw, 86px);
    overflow: hidden;
    background: #03050a;
  }

  .cap-desktop-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
    filter: saturate(0.85) contrast(1.08);
    opacity: 0.82;
    transform: scale(1.02);
    transition: transform 1400ms var(--ease-out);
    display: block !important;
  }

  .cap-mobile-img {
    display: none !important;
  }

  .capability:hover .cap-desktop-img {
    transform: scale(1.055);
  }

  .capability::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(3, 5, 10, 0.88), rgba(3, 5, 10, 0.32) 58%, rgba(3, 5, 10, 0.9));
  }

  .capability-card {
    position: relative;
    z-index: 1;
    width: min(620px, 100%);
    margin-left: auto;
    padding: clamp(24px, 4vw, 44px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(5, 8, 14, 0.64);
    backdrop-filter: blur(24px);
  }

  @media (max-width: 900px) {
    .capability {
      display: flex;
      flex-direction: column;
      padding: 0;
      min-height: auto;
      background: #050507;
    }
    .capability::after {
      display: none;
    }
    .cap-desktop-img {
      display: none !important;
    }
    .cap-mobile-img {
      display: block !important;
      position: relative;
      width: 100%;
      height: auto;
      max-height: 48vh;
      object-fit: cover;
      object-position: center;
      opacity: 0.9;
    }
    .capability-card {
      width: 100%;
      margin: 0;
      border-radius: 0;
      border-left: none;
      border-right: none;
      padding: 24px 20px;
    }
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
      radial-gradient(circle at 50% 40%, rgba(0, 87, 173, 0.28), transparent 30%),
      #03050a;
  }

  .quote-section h2 {
    max-width: 920px;
  }

  .safety-section {
    padding: clamp(70px, 9vw, 130px) 0;
    background: radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.08), transparent 40%), #03050a;
    position: relative;
    z-index: 1;
  }

  .safety-content {
    width: min(1380px, calc(100% - 32px));
    margin: 0 auto;
  }

  .safety-content p {
    margin: 0 0 14px;
    color: var(--peugeot-hover);
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

  /* ── Safety sub-label ── */
  .safety-content .safety-sub-label {
    margin: 0 0 14px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--peugeot-hover);
  }

  .safety-vid-card {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    transition: transform 350ms var(--ease-out), border-color 350ms var(--ease-out);
  }

  .safety-vid-card:hover {
    transform: translateY(-4px);
    border-color: var(--peugeot-hover);
  }

  /* ADAS Carousel Styles */
  .adas-carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-bottom: 20px;
  }

  .adas-track {
    display: flex;
    gap: 16px;
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    width: 100%;
  }

  .adas-slide {
    flex: 0 0 calc((100% - 32px) / 3); /* Show 3 cards */
    min-width: 0;
  }

  @media (max-width: 1024px) {
    .adas-slide {
      flex: 0 0 calc((100% - 16px) / 2);
    }
    .adas-track {
      transform: translateX(calc(-var(--adas-idx, 0) * (100% / 2))) !important;
    }
  }

  @media (max-width: 640px) {
    .adas-slide {
      flex: 0 0 100%;
    }
    .adas-track {
      transform: translateX(calc(-var(--adas-idx, 0) * 100%)) !important;
    }
  }

  .carousel-controls.adas-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
    justify-content: center;
  }

  .carousel-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 18px 16px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 999px;
    backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 28px rgba(0, 0, 0, 0.15);
  }

  .carousel-pill button {
    width: 6px;
    height: 6px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .carousel-pill button.active {
    width: 22px;
    background: rgba(255, 255, 255, 0.95);
  }

  .play-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: white;
    cursor: pointer;
    padding: 0;
    margin: 0;
    flex-shrink: 0;
    overflow: hidden;
    box-sizing: border-box;
    transition: background 300ms ease, transform 200ms ease;
  }

  .play-btn * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    margin: 0;
  }

  .play-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }

  .safety-vid-card video,
  .safety-vid-card img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    display: block;
  }

  .svc-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.75);
    text-transform: uppercase;
    letter-spacing: 0.04em;
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
    border-color: var(--peugeot-hover);
  }

  .safety-feat :global(.material-symbols-outlined) {
    color: var(--peugeot-hover);
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
    background: rgba(0, 116, 232, 0.28);
    border: 1px solid rgba(0, 116, 232, 0.45);
    color: var(--peugeot-hover);
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
    .peugeot-premium *,
    .peugeot-premium *::before,
    .peugeot-premium *::after {
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

  /* MOBILE HERO SPLIT LAYOUT */
  @media (max-width: 768px) {
    .peugeot-premium {
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
    .peugeot-hero {
      order: 0;
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: auto;
      background: #000;
      padding-top: 0;
      margin-bottom: 16px;
    }
    .hero-fallback.hero-desktop-img {
      display: none !important;
    }
    .hero-fallback.hero-mobile-img {
      display: block !important;
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
