<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  // ── Cotizar Drawer ──────────────────────────────────────────────────────
  let showCotizarDrawer = $state(false)
  type DrawerTab = 'cotizacion' | 'prueba' | 'cita'
  let drawerTab = $state<DrawerTab>('cotizacion')

  const A = '/adistem2026/jeep-demo'
  const L = '/adistem2026/jeep-lineup'
  let { modelSlug = '1500-rho' }: { modelSlug?: string | null } = $props()
  let progress = $state(0)
  let videoReady = $state(false)
  let zoomedImage = $state<string | null>(null)
  let pinVideoActive = $state(false)

  type ModelDetail = {
    name: string
    kicker: string
    title: string
    subtitle: string
    heroImage: string
    mobileHeroImage?: string
    spotlightImage: string
    quote: string
    specs: { value: string; label: string }[]
    motionTitle: string
    motionCopy: string
    cockpitImages?: string[]
    storyImages?: string[]
    motionImages?: string[]
    capabilityImage?: string
    price: string
  }

  const modelDetails: Record<string, ModelDetail> = {
    'renegade': {
      name: 'Jeep Renegade',
      kicker: 'RENEGADE 2026',
      title: 'Redefine la aventura urbana.',
      subtitle: 'Motor 1.3L Turbo GSE de 173 hp, el más potente de su categoría. Diseño icónico Jeep con tecnología de vanguardia y sistemas ADAS para la ciudad.',
      heroImage: '/adistem2026/jeep/renegade-2026-hero.jpg',
      mobileHeroImage: '/adistem2026/jeep/renegade-2026-mob.jpg',
      spotlightImage: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/vlp/desktop/jeep-renegade-2026-inicio-equipamiento-exterior-dk.jpg.img.2880.jpg',
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Jeep%20Renegade',
      price: 'Desde $456,900',
      specs: [
        { value: '173 hp', label: 'Motor 1.3L Turbo GSE' },
        { value: '8.4"', label: 'Pantalla Táctil Uconnect' },
        { value: '7"', label: 'Clúster digital TFT a color' },
        { value: 'ADAS', label: 'Sistemas de asistencia' },
      ],
      motionTitle: 'Diseño inconfundible. Desempeño moderno.',
      motionCopy: 'Su parrilla de 7 ranuras rinde homenaje al legado Jeep, mientras su volante con paletas de cambio y frenos de disco en las 4 ruedas te dan el control que necesitas.',
      cockpitImages: [
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/interior/full/jeep-renegade-2026-equipamiento-interior-highlights-08-full.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/jeep-renegade-2026-galeria-10-interior-full.jpg.img.2880.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-08-full.jpg'
      ],
      storyImages: [
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-08-full.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-02-dk.jpg.image.2880.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-10-dk.jpg'
      ],
      motionImages: [
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/desktop/my26-jeep-renegade-galeriaexterior-03-dk-mx.jpg.img.2880.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/my26-jeep-renegade-galeriaexterior-02-allbreakingpoints-mx-v2.jpg.img.2880.jpg',
        'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/jeep-renegade-2026-galeria-10-interior-full.jpg.img.2880.jpg'
      ],
      capabilityImage: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/capacidad/desktop/jeep-renegade-2026-capacidad-desempeno-motor-01-dk.jpg.img.2880.jpg'
    },
    '700': {
      name: 'JEEP 700',
      kicker: 'JEEP 700 2026',
      title: 'Agilidad compacta con actitud de pickup.',
      subtitle: 'Una JEEP pensada para ciudad, negocio y recorridos diarios: práctica, visual y lista para moverse sin sentirse pesada.',
      heroImage: `${L}/jeep-700.jpg`,
      spotlightImage: `${L}/jeep-700.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP%20700',
      price: 'Desde $394,900',
      specs: [
        { value: '700', label: 'Pickup compacta JEEP' },
        { value: 'Ágil', label: 'Formato práctico para ciudad' },
        { value: 'Carga', label: 'Caja útil para negocio diario' },
        { value: 'Daily', label: 'Lista para trabajo y movilidad' },
      ],
      motionTitle: 'Se mueve ligera, se ve decidida.',
      motionCopy: 'La JEEP 700 funciona como herramienta diaria: entra fácil, carga cuando toca y mantiene una presencia clara en cada trayecto.',
    },
    '1500-rho': {
      name: 'JEEP 1500 RHO',
      kicker: 'JEEP 1500 RHO 2026',
      title: 'Fuerza que se siente antes de arrancar.',
      subtitle: 'Performance off-road con presencia JEEP: una pickup para abrir camino, cargar intención y llegar con autoridad.',
      heroImage: `${L}/jeep-1500-rho.jpg`,
      spotlightImage: `${L}/jeep-1500-rho.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP%201500%20RHO',
      price: 'Desde $1,169,900',
      specs: [
        { value: 'RHO', label: 'Desempeño off-road' },
        { value: '4x4', label: 'Tracción para terrenos abiertos' },
        { value: 'Wide', label: 'Postura ancha y dominante' },
        { value: 'Sport', label: 'Respuesta para aventura' },
      ],
      motionTitle: 'Movimiento hecho para terreno abierto.',
      motionCopy: 'La 1500 RHO está pensada para que la ruta se sienta viva: más presencia, más respuesta y una lectura visual inmediata.',
    },
  }

  const fallbackModel: ModelDetail = {
    name: 'JEEP 2026',
    kicker: 'JEEP 2026',
    title: 'Fuerza que se siente antes de arrancar.',
    subtitle: 'Capacidad, presencia y tecnología útil para trabajo, viaje y aventura.',
    heroImage: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/vlp/desktop/jeep-renegade-2026-inicio-equipamiento-exterior-dk.jpg.img.2880.jpg',
    spotlightImage: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/vlp/desktop/jeep-renegade-2026-inicio-equipamiento-exterior-dk.jpg.img.2880.jpg',
    quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP',
    price: 'Desde $456,900',
    specs: [
      { value: '6.7L', label: 'Turbodiesel disponible' },
      { value: '4x4', label: 'Tracción para trabajo pesado' },
      { value: '12"', label: 'Pantalla vertical central' },
      { value: 'AWD', label: 'Tracción integral disponible' },
    ],
    motionTitle: 'Más que una pickup: una herramienta premium.',
    motionCopy: 'Diseñada para cargar, remolcar y llegar con autoridad.',
  }

  const model = $derived(modelDetails[modelSlug ?? ''] ?? fallbackModel)
  const specs = $derived(model.specs)
  const pinVideoSrc = $derived(
    pinVideoActive
      ? 'https://www.youtube.com/embed/va4e9sjZZGg?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=va4e9sjZZGg'
      : ''
  )

  const JEEP_CDN = 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade'

  const renegadeVersions = [
    {
      id: 'latitude',
      name: 'Latitude',
      price: 'Desde $456,900',
      thumb: `${JEEP_CDN}/vlp/desktop/my26-jeep-renegade-latitude-modelizer-configurator-granito-cristal-mx-v2.png.img.600.png`,
      features: [
        ['Motor 1.3L Turbo GSE de 173 hp', 'Rines de aluminio de 18"', 'Neumáticos 225/55 R18', 'Aire acondicionado automático de doble zona', 'Cluster premium de 7" con pantalla TFT a color', 'Tomacorriente auxiliar de 12V', 'Alarma de seguridad', 'Control de estabilidad para remolques (TSD)'],
        ['Sistema de anclaje ISOFIX para sillas infantiles', 'Controles de audio y teléfono al volante', 'Desempañador trasero', 'Luces proyectoras LED bifuncionales', 'Frenos de disco en las 4 ruedas', 'Sistemas de asistencia ADAS']
      ],
      colors: [
        { name: 'Granito Cristal', hex: '#a8a8a8', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/latitude/jelly-my26-jeep-renegade-sport-modelizer-configurator-granito-cristal-mx-v2.jpg.img.2880.jpg' },
        { name: 'Negro Carbón',   hex: '#1a1a1a', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/latitude/jeep-color-renegade-latitud-2026-inicio-modelizer-negro-carbon.jpg.img.2880.jpg' },
        { name: 'Gris Mantarraya', hex: '#5a5a5a', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/latitude/jeep-color-renegade-latitud-2026-inicio-modelizer-gris-mantarraya-Gris-Mantarraya-Roof-V1.png.img.2880.png' }
      ]
    },
    {
      id: 'limited-s',
      name: 'Limited S',
      price: 'Desde $506,900',
      thumb: `${JEEP_CDN}/vlp/desktop/jeep-renegade-limited-2026-inicio-modelizer-negro-carbon-mx.jpg.img.600.jpg`,
      features: [
        ['Motor 1.3L Turbo GSE de 173 hp', 'Rines de aluminio de 19" únicos en su segmento', 'Neumáticos 235/45 R19', 'Luces proyectoras LED, faros de niebla y luces diurnas', 'Quemacocos panorámico y toldo bi-tono', 'Alarma de seguridad', 'Alerta contra colisiones frontales plus'],
        ['Alerta de cambio involuntario de carril plus', 'Sistema de detección de fatiga del conductor', 'Espejo retrovisor electrocrómico', 'Parabrisas con sensor de lluvia', 'Volante rediseñado con paletas de cambio', 'Pantalla Uconnect táctil de 8.4"']
      ],
      colors: [
        { name: 'Gris Mantarraya', hex: '#5a5a5a', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/limited/jeep-renegade-limited-2026-inicio-modelizer-gris-mantarraya.jpg.img.2880.jpg' },
        { name: 'Granito Cristal', hex: '#a8a8a8', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/limited/jelly-my26-jeep-renegade-sport-modelizer-configurator-granito-cristal-mx-v2.jpg.img.2880.jpg' },
        { name: 'Blanco Polar',    hex: '#f5f5f0', img: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/modelizer/limited/jeep-renegade-limited-2026-inicio-modelizer-blanco-polar.jpg.img.2880.jpg' }
      ]
    }
  ]

  let activeVersionId = $state('latitude')
  let activeColorIndex = $state(0)
  let activePanel = $state('colors')
  
  const activeVersion = $derived(renegadeVersions.find(v => v.id === activeVersionId)!)
  const activeColor = $derived(activeVersion.colors[activeColorIndex] || activeVersion.colors[0])

  const story = $derived([
    {
      kicker: 'Exterior',
      title: 'Inigualable por fuera.',
      copy: 'Un Jeep® es inconfundible en cualquier lugar. Con Jeep® Renegade, además de superar cualquier camino, brillarás con luz propia gracias a su increíble silueta y accesorios.',
      image: model.storyImages?.[0] || model.heroImage,
    },
    {
      kicker: 'Iluminación',
      title: 'Luces Full LED en todas las versiones.',
      copy: 'Haz de la noche tu mejor aliada. Las luces traseras LED rinden homenaje al icono Jeep® Willys, con luces de niebla en las versiones Latitude y Limited.',
      image: model.storyImages?.[1] || `${A}/interior-3.jpg`,
    },
    {
      kicker: 'Versión Limited',
      title: 'Quemacocos panorámico y rines de 19".',
      copy: 'Siente la libertad y transforma cada viaje con el quemacocos panorámico bi-tono y los rines de aluminio de 19" — únicos en su segmento.',
      image: model.storyImages?.[2] || `${A}/interior-1.jpg`,
    },
  ])

  const motionCards = $derived([
    {
      title: 'Diseñado para sobresalir',
      copy: 'Haz tuyo cualquier camino, desafía la naturaleza y descubre un mundo lleno de emoción con las increíbles capacidades que hacen de Jeep® Renegade tu mejor opción.',
      image: model.motionImages?.[0] || model.heroImage,
    },
    {
      title: 'Luces Full LED',
      copy: 'Parrilla de 7 ranuras que rinde homenaje al legado Jeep, con luces Full LED que iluminan cada aventura con estilo y precisión.',
      image: model.motionImages?.[1] || 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriainterior-01-allbreakingpoints-mx.jpg.img.2880.jpg',
    },
    {
      title: 'Diseño inconfundible',
      copy: 'Luces traseras LED icono del Jeep® Willys, luces de niebla y detalles únicos que hacen del Renegade un SUV que llama la atención en cualquier lugar.',
      image: model.motionImages?.[2] || 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriacapacidad-01-allbreakingpoints-mx.jpg.img.2880.jpg',
    },
  ])

  const cockpitImages = $derived(model.cockpitImages || [
    'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriainterior-01-allbreakingpoints-mx.jpg.img.2880.jpg',
    'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriainterior-02-allbreakingpoints-mx.jpg.img.2880.jpg',
    'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriainterior-01-allbreakingpoints-mx.jpg.img.2880.jpg',
  ])

  const capabilityImage = $derived(model.capabilityImage || 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/inicio/galeria/full/my26-jeep-renegade-galeriacapacidad-01-allbreakingpoints-mx.jpg.img.2880.jpg')

  let pinMediaEl: HTMLElement | undefined = $state()

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
    drawerTab = 'cotizacion'
    showCotizarDrawer = true
  }

  function goToTestDrive() {
    drawerTab = 'prueba'
    showCotizarDrawer = true
  }

  function goBackToJeep() {
    history.pushState({ brand: 'Jeep' }, '', '/adistem2026/jeep/')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { brand: 'Jeep' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── ADAS Carousel Logic ──
  const adasItems = [
    { id: 0, label: 'Asistencia Estacionamiento', video: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/video/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-01.mp4', poster: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-01.jpg' },
    { id: 1, label: 'Reconocimiento Señales (TSR)', video: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/video/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-02.mp4', poster: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-02.jpg' },
    { id: 2, label: 'Alerta Colisión Frontal (FCW)', video: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/video/jeep-renegade-2026-sistemas-de-asistencia-fcw-desktop-v02.mp4', poster: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/jeep-renegade-2026-sistemas-de-asistencia-fcw-desktop-v02.jpeg' },
    { id: 3, label: 'Abandono de Carril (LDP)', video: 'https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/sistemas-de-asistencia/video/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-04.mp4', poster: '' }
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

  // ── Baja prioridad: Ver más equipamiento + cockpit carousel ──
  let showAllFeatures = $state(false)
  let cockpitIndex = $state(0)

  $effect(() => {
    activeVersionId
    showAllFeatures = false
  })

  const showFloating = $derived(progress > 0.08)
</script>

<svelte:head>
  <title>{model.name} | VAPSA</title>
</svelte:head>

<main class="jeep-premium" style={`--scroll:${progress}`}>
  <!-- Progress rail is a direct child of main to avoid stacking context trapping -->
  <div class="progress-rail" aria-hidden="true"><span></span></div>

  <!-- Global Lightbox -->
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
  <section id="inicio" class="jeep-hero">
    <img class="hero-fallback hero-desktop-img" src={model.heroImage} alt={model.name} />
    {#if model.mobileHeroImage}
      <img class="hero-fallback hero-mobile-img" src={model.mobileHeroImage} alt={model.name} />
    {/if}
    <div class="hero-shade"></div>
    
    <div class="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 lg:pt-24 pb-4 lg:pb-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 lg:gap-10 min-h-0 lg:min-h-screen">
      <div class="hero-copy flex-1 max-w-lg">
        <h1>{model.kicker}</h1>
        <p class="hero-slogan">{model.title}</p>
        <span class="price-badge">{model.price}</span>
        <div class="hero-actions">
          <button class="primary" onclick={goToQuote}>Cotiza ahora <GoogleIcon name="arrow_forward" size={18} /></button>
          <button class="ghost" onclick={goToTestDrive}>Prueba de manejo</button>
        </div>
      </div>

      <!-- Formulario de Cotización Desktop -->
      <div class="hidden lg:block flex-shrink-0 w-full max-w-[380px] xl:max-w-[410px] z-10 mb-12">
        <ContactFormCard accent="#424D07" initialBrand="Jeep" initialModel="Renegade 2027" />
      </div>
    </div>

    <div class="scroll-cue">Desliza</div>
  </section>

  <nav class="product-nav hidden md:flex s-mteEPoerD6_z" aria-label="Navegación de producto JEEP">
    <strong class="s-mteEPoerD6_z">{model.name} <span class="nav-year">2026</span></strong>
    <a href="#inicio" class="s-mteEPoerD6_z">Inicio</a>
    <a href="#versiones" class="s-mteEPoerD6_z">Versiones</a>
    <a href="#galeria" class="s-mteEPoerD6_z">Galería</a>
    <a href="#equipamiento-exterior" class="s-mteEPoerD6_z nav-link-short" data-short="Exterior">Equipamiento exterior</a>
    <a href="#equipamiento-interior" class="s-mteEPoerD6_z nav-link-short" data-short="Interior">Equipamiento interior</a>
    <a href="#capacidad" class="s-mteEPoerD6_z">Capacidad</a>
    <a href="#seguridad" class="s-mteEPoerD6_z">Seguridad</a>
    <span class="nav-divider"></span>
    <button onclick={goToTestDrive} class="s-mteEPoerD6_z ghost-nav nav-btn-short" data-short="Prueba">Prueba de manejo</button>
    <button onclick={goToQuote} class="s-mteEPoerD6_z">Cotizar</button>
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

  {#if modelSlug === 'renegade'}
    <section id="versiones" class="vs">
      <div class="vs-hero-zone">
        <!-- Version pill toggle -->
        <div class="vs-pill-bar">
          {#each renegadeVersions as version}
            <button
              class="vs-pill"
              class:active={activeVersionId === version.id}
              onclick={() => { activeVersionId = version.id; activeColorIndex = 0; }}
            >{version.name}</button>
          {/each}
        </div>

        <div class="vs-title-row">
          <h2>{activeVersion.name}</h2>
          <span class="vs-price">{activeVersion.price}</span>
        </div>

        <!-- Car showcase -->
        <div class="vs-showcase">
          <div class="vs-glow"></div>
          {#key activeColor.img}
            <img src={activeColor.img} alt={`Renegade ${activeColor.name}`} class="vs-hero-car" />
          {/key}
        </div>

        <!-- Color swatches centered below car -->
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

      <!-- Panel toggle -->
      <div class="vs-panel-toggle">
        <button class:active={activePanel === 'colors'} onclick={() => activePanel = 'colors'}>
          <GoogleIcon name="palette" size={16} /> Exterior
        </button>
        <button class:active={activePanel === 'features'} onclick={() => activePanel = 'features'}>
          <GoogleIcon name="checklist" size={16} /> Equipamiento
        </button>
      </div>

      <!-- Features grid -->
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
          <button class="vs-ext-card" onclick={() => toggleZoom('https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/my26-jeep-renegade-galeriaexterior-05-allbreakingpoints-mx.jpg.img.2880.jpg')}>
            <img src="https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/my26-jeep-renegade-galeriaexterior-05-allbreakingpoints-mx.jpg.img.2880.jpg" alt="Lateral" />
            <span>Vista lateral <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom('https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-07-full.jpg')}>
            <img src="https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/exterior/desktop/jeep-renegade-2026-exterior-highlights-07-full.jpg" alt="Frontal" />
            <span>Vista frontal <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
          <button class="vs-ext-card" onclick={() => toggleZoom('https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/my26-jeep-renegade-galeriaexterior-02-allbreakingpoints-mx-v2.jpg.img.2880.jpg')}>
            <img src="https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/gallery/full/my26-jeep-renegade-galeriaexterior-02-allbreakingpoints-mx-v2.jpg.img.2880.jpg" alt="Trasera" />
            <span>Vista trasera <GoogleIcon name="zoom_in" size={14} /></span>
          </button>
        </div>
      {/if}

      <div class="vs-actions">
        <button onclick={() => showCotizarDrawer = true} class="vs-action primary">Cotizar ahora <GoogleIcon name="arrow_forward" size={16} /></button>
        <button onclick={() => { showCotizarDrawer = true; drawerTab = 'prueba' }} class="vs-action ghost">Prueba de manejo</button>
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
      <h2>Diseñado para sobresalir.</h2>
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

  <section id="equipamiento-exterior" class="story-stack">
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

  <section id="equipamiento-interior" class="cockpit">
    <div class="cockpit-copy">
      <p>Único por dentro</p>
      <h2>La mayor comodidad.</h2>
      <span>Pantalla táctil Uconnect® de 8.4" con Apple CarPlay® y Android Auto™ inalámbrico, clúster digital TFT a color de 7", cargador inalámbrico y controles al volante para mantenerte conectado sin distracciones.</span>
    </div>
    <div class="cockpit-carousel">
      <div class="cockpit-track" style={`transform: translateX(calc(-${cockpitIndex} * 100%))`}>
        {#each cockpitImages as img, i}
          <img src={img} alt={`Interior JEEP ${i + 1}`} class="cockpit-slide" />
        {/each}
      </div>
      <!-- Prev / Next -->
      <button
        class="cockpit-nav prev"
        onclick={() => cockpitIndex = (cockpitIndex - 1 + cockpitImages.length) % cockpitImages.length}
        aria-label="Imagen anterior"
      ><GoogleIcon name="chevron_left" size={22} /></button>
      <button
        class="cockpit-nav next"
        onclick={() => cockpitIndex = (cockpitIndex + 1) % cockpitImages.length}
        aria-label="Imagen siguiente"
      ><GoogleIcon name="chevron_right" size={22} /></button>
      <!-- Dots -->
      <div class="cockpit-dots">
        {#each cockpitImages as _, i}
          <button
            class="cockpit-dot"
            class:active={cockpitIndex === i}
            onclick={() => cockpitIndex = i}
            aria-label={`Imagen ${i + 1}`}
          ></button>
        {/each}
      </div>
    </div>
  </section>

  <section id="capacidad" class="capability">
    <img src={capabilityImage} alt="JEEP exterior de trabajo" />
    <div class="capability-card">
      <p>Capacidad y Desempeño</p>
      <h2>Siempre listo para romper la rutina.</h2>
      <div class="cap-list">
        <span><GoogleIcon name="speed" size={18} /> 173 hp — motor más potente de su categoría</span>
        <span><GoogleIcon name="local_gas_station" size={18} /> Motor 1.3L Turbo GSE</span>
        <span><GoogleIcon name="sync_alt" size={18} /> Transmisión automática de 9 velocidades</span>
        <span><GoogleIcon name="verified_user" size={18} /> Frenos de disco en las 4 ruedas</span>
      </div>
    </div>
  </section>

  <section id="seguridad" class="safety-section">
    <div class="safety-content">
      <p>Confianza y Seguridad</p>
      <h2>Seguridad a donde quiera que vayas.</h2>
      <span>Sus avanzados sistemas de seguridad te ofrecen a ti y a tus acompañantes una protección integral de 360°. Frenos ABS en las 4 ruedas, control electrónico de estabilidad y 7 bolsas de aire para mantenerte a salvo en cada rodada.</span>

      <!-- ── ADAS Slider ── -->
      <p class="safety-sub-label">Sistemas de Asistencia ADAS</p>
      
      <div class="adas-carousel-container" style={`--adas-idx: ${adasIndex}`}>
        <div class="adas-track" style={`transform: translateX(calc(-${adasIndex} * (100% / 3)));`}>
          {#each adasItems as item, i}
            <div class="safety-vid-card adas-slide" class:active={i === adasIndex}>
              <video src={item.video} poster={item.poster} autoplay muted loop playsinline></video>
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
            <span class="material-symbols-outlined inline-flex select-none items-center justify-center align-middle" aria-hidden="true" style="font-size: 16px; line-height: 1;">{adasAutoplay ? 'pause' : 'play_arrow'}</span>
          </button>
        </div>
      </div>


      <!-- ── Seguridad 360° — hidden ── -->
      {#if false}
      <p class="safety-sub-label">Seguridad Completa 360°</p>
      <div class="safety-360-wrap">
        <img class="s360-hero" src="https://www.jeep.com.mx/content/dam/cross-regional/nafta/jeep/es_mx/2026/renegade/safety/desktop/jeep-renegade-2026-seguridad-01-dk.jpg" alt="Renegade seguridad completa" />
        <div class="s360-cards">
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 01</span>
              <strong>Seguridad Completa</strong>
              <p>Equipado con siete bolsas de aire: 2 frontales, 2 laterales, una de rodillas para el conductor y 2 de cortina que protegen a los pasajeros combinando su despliegue con la gravedad del impacto.</p>
            </div>
          </div>
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 02</span>
              <strong>Detección de Fatiga</strong>
              <p>Sistema de detección de fatiga del conductor para garantizar tu seguridad en tramos largos, alertándote cuando detecta señales de cansancio al volante.</p>
            </div>
          </div>
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 03</span>
              <strong>Ajuste de Intensidad de Luces</strong>
              <p>Control de ajuste automático de intensidad de luces para mayor comodidad en el camino, perfecto para conducción nocturna en carretera.</p>
            </div>
          </div>
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 04</span>
              <strong>Control de Velocidad</strong>
              <p>Mantén fija la velocidad sin necesidad de seguir presionando el acelerador, con el control de velocidad de crucero integrado del Jeep® Renegade.</p>
            </div>
          </div>
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 05</span>
              <strong>Arranque en Subidas (HSA)</strong>
              <p>No tendrás que preocuparte al reanudar la marcha en una pendiente — la asistencia de arranque en subidas mantiene el vehículo firme mientras cambias de freno a acelerador.</p>
            </div>
          </div>
          <div class="s360-item">
            <div class="s360-body">
              <span class="s360-num">— 06</span>
              <strong>Encendido Automático de Luces</strong>
              <p>Tendrás siempre la mejor iluminación sin importar el clima o el entorno, gracias al sistema de encendido automático de luces que detecta las condiciones de visibilidad.</p>
            </div>
          </div>
        </div>
      </div>
      {/if}

    </div>
  </section>

  <section id="jeep-quote" class="quote-section">
    <p>VAPSA JEEP</p>
    <h2>Agenda una prueba de manejo o recibe una cotización.</h2>
    <p class="quote-sub">Elige la opción que mejor se ajuste a lo que necesitas. Nuestro equipo está listo para atenderte.</p>

    <div class="quote-cta-grid">
      <button class="quote-cta-card" onclick={() => { drawerTab = 'prueba'; showCotizarDrawer = true }}>
        <span class="qcc-icon"><GoogleIcon name="speed" size={28} /></span>
        <strong>Prueba de manejo</strong>
        <span class="qcc-desc">Agenda una cita para manejar el {model.name}</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
      <button class="quote-cta-card" onclick={() => { drawerTab = 'cotizacion'; showCotizarDrawer = true }}>
        <span class="qcc-icon"><GoogleIcon name="description" size={28} /></span>
        <strong>Solicitar cotización</strong>
        <span class="qcc-desc">Recibe precios, versiones y financiamiento</span>
        <span class="qcc-arrow"><GoogleIcon name="arrow_forward" size={18} /></span>
      </button>
    </div>
  </section>
</main>

<!-- ── Floating CTA bar (desktop only, visible after scroll past hero) ── -->
{#if showFloating}
  <div
    class="floating-cta flex md:hidden"
    transition:fade={{ duration: 260 }}
  >
    <span class="floating-cta-name">{model.name}</span>
    <button class="floating-cta-ghost" onclick={goToTestDrive}>Prueba de manejo</button>
    <button class="floating-cta-primary" onclick={goToQuote}>Cotizar <GoogleIcon name="arrow_forward" size={15} /></button>
  </div>
{/if}

<!-- ── Cotizar Drawer ─────────────────────────────────────────────────── -->
{#if showCotizarDrawer}
  <!-- Scrim -->
  <div
    class="fixed inset-0 z-[60]"
    style="background:rgba(0,0,0,0.54);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);"
    onclick={() => showCotizarDrawer = false}
    role="presentation"
  ></div>

  <!-- Panel lateral -->
  <div
    class="fixed right-0 top-0 bottom-0 z-[61] flex flex-col overflow-y-auto"
    style="width:min(480px,100vw);background:#08091a;border-left:1px solid rgba(255,255,255,0.10);box-shadow:-8px 0 48px rgba(0,0,0,0.60);animation:drawer-in 0.38s cubic-bezier(0.22,1,0.36,1) both;"
  >
    <!-- Header del drawer -->
    <div class="flex items-center justify-between px-5 py-4 flex-shrink-0" style="border-bottom:1px solid rgba(255,255,255,0.08);">
      <div class="flex items-center gap-2.5">
        <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span class="text-sm font-black text-white tracking-tight">Jeep Renegade 2026</span>
      </div>
      <button
        onclick={() => showCotizarDrawer = false}
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10 cursor-pointer"
        style="color:rgba(255,255,255,0.60);"
      >
        <GoogleIcon name="close" size={18} />
      </button>
    </div>

    <!-- ContactFormCard -->
    <div class="flex-1 flex flex-col p-4 overflow-y-auto">
      <ContactFormCard
        initialTab={drawerTab}
        accent="#424D07"
      />
    </div>
  </div>
{/if}

<style>
  @keyframes drawer-in {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }
  :global(html) {
    scroll-behavior: smooth;
  }

  .jeep-premium {
    min-height: 100vh;
    background: #030305;
    color: white;
    overflow: clip;
    font-family: Inter, Roboto, sans-serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --jeep-default: #424D07;
    --jeep-hover: #5A690A;
  }

  .jeep-premium * {
    box-sizing: border-box;
  }

  .jeep-hero {
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
    display: block;
  }
  .hero-mobile-img {
    display: none;
  }

  @media (max-width: 767px) {
    .hero-desktop-img {
      display: none !important;
    }
    .hero-mobile-img {
      display: block !important;
      object-position: center center;
    }
  }

  .hero-shade {
    z-index: 2;
    background:
      radial-gradient(circle at 72% 46%, rgba(136, 13, 0, 0.18), transparent 32%),
      linear-gradient(90deg, rgba(3, 3, 5, 0.50) 0%, rgba(3, 3, 5, 0.20) 40%, rgba(3, 3, 5, 0.05) 100%),
      linear-gradient(0deg, #030305 0%, transparent 42%);
  }

  .jeep-hero::after {
    content: '';
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(140px, 22vh, 260px);
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(3, 3, 5, 0.45) 50%,
      rgba(3, 3, 5, 0.85) 78%,
      #030305 100%);
    pointer-events: none;
  }

  .hero-copy {
    position: relative;
    z-index: 10;
    align-self: end;
    width: min(500px, calc(100vw - 48px));
    margin: 0 0 clamp(40px, 8vh, 80px) clamp(24px, 8vw, 128px);
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
    color: var(--jeep-hover);
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

  .hero-copy .subtitle-text {
    display: block;
    max-width: 380px;
    margin: 0;
    color: rgba(255, 255, 255, 0.70);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
    text-transform: none;
    letter-spacing: normal;
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
    background: var(--jeep-default);
    color: white;
    border: 1px solid transparent;
    box-shadow: 0 4px 16px rgba(66, 77, 7, 0.4);
  }

  .hero-copy .hero-actions button.primary:hover {
    background: var(--jeep-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 77, 7, 0.6);
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

  .quote-actions a {
    min-height: 48px;
    padding: 0 22px;
    font-size: 14px;
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
    background: linear-gradient(180deg, var(--jeep-hover), rgba(255,255,255,0.72));
    box-shadow: 0 0 16px rgba(186, 0, 0, 0.72);
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

  /* Separador visual antes de los botones CTA */
  .nav-divider {
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
    margin: 0 4px;
  }

  /* Labels cortos en pantallas medianas (md → lg) */
  @media (min-width: 768px) and (max-width: 1199px) {
    .nav-link-short,
    .nav-btn-short {
      font-size: 0;
    }
    .nav-link-short::after {
      content: attr(data-short);
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .nav-btn-short::after {
      content: attr(data-short);
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  }

  .product-nav button {
    padding: 0 12px;
    color: white;
    background: var(--jeep-hover);
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
    min-height: 140vh;
    position: relative;
    background:
      radial-gradient(circle at 52% 25%, rgba(136, 13, 0, 0.28), transparent 34%),
      linear-gradient(180deg, #030305 0%, #09090d 48%, #030305 100%);
  }

  .pin-visual {
    min-height: 80svh;
    position: sticky;
    top: 10svh;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(310px, 0.42fr);
    align-items: center;
    gap: clamp(26px, 4vw, 64px);
    width: min(1520px, calc(100% - clamp(32px, 7vw, 112px)));
    margin: 0 auto;
    padding: clamp(40px, 5vw, 60px) 0;
    overflow: visible;
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
    filter: drop-shadow(0 48px 70px rgba(0, 0, 0, 0.72));
    transform: translateX(calc((var(--scroll) - 0.18) * -115px)) scale(calc(0.94 + var(--scroll) * 0.16));
    transition:
      transform 900ms var(--ease-out),
      filter 900ms var(--ease-out),
      border-color 420ms var(--ease-out),
      box-shadow 420ms var(--ease-out);
  }

  .pin-media:hover,
  .pin-media:focus-visible {
    border-color: rgba(66, 77, 7, 0.72);
    box-shadow: 0 46px 110px rgba(0, 0, 0, 0.66), 0 0 0 1px rgba(66, 77, 7, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
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
    background: #030305;
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

  .pin-readout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    width: min(360px, 100%);
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.075);
    backdrop-filter: blur(24px);
    animation: soft-float 5200ms ease-in-out infinite;
  }

  .pin-readout span {
    display: block;
    color: rgba(255, 255, 255, 0.48);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .pin-readout strong {
    font-size: clamp(24px, 3vw, 38px);
    line-height: 1;
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
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 12% cover 42%;
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
    color: var(--jeep-hover);
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
    max-width: 480px;
    margin-top: 16px;
    color: rgba(255, 255, 255, 0.70);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
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

  .safety-section {
    padding: clamp(70px, 9vw, 130px) 0;
    background: radial-gradient(circle at 50% 0%, rgba(127, 127, 127, 0.08), transparent 40%), #030305;
    position: relative;
    z-index: 1;
  }

  .safety-content {
    width: min(1380px, calc(100% - 32px));
    margin: 0 auto;
  }

  .safety-content p {
    margin: 0 0 14px;
    color: var(--jeep-hover);
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
    color: var(--jeep-hover);
  }

  /* ── Video cards grid ── */
  .safety-videos-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .safety-vid-card {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    transition: transform 350ms var(--ease-out), border-color 350ms var(--ease-out);
  }

  .safety-vid-card:hover {
    transform: translateY(-4px);
    border-color: var(--jeep-hover);
  }

  /* ADAS Carousel Styles */
  .adas-carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-bottom: 80px;
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

  .carousel-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
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
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 28px rgba(0,0,0,0.15);
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
    flex-shrink: 0;
    transition: background 300ms ease, transform 200ms ease;
  }

  .play-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }

  .safety-vid-card video {
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
    color: rgba(255,255,255,0.75);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .svc-label :global(.material-symbols-outlined) {
    color: var(--jeep-hover);
    flex-shrink: 0;
  }

  /* ── 360 wrap: image left + tiles right ── */
  .safety-360-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  .s360-hero {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    display: block;
    border: 1px solid rgba(255,255,255,0.10);
  }

  /* ── 360° rich feature list ── */
  .s360-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 520px;
    overflow-y: auto;
    padding-right: 6px;
    scrollbar-width: thin;
    scrollbar-color: rgba(90,105,10,0.35) transparent;
  }

  .s360-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 18px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    border-left: 3px solid rgba(90,105,10,0.35);
    background: rgba(255,255,255,0.03);
    transition: transform 260ms var(--ease-out), border-color 260ms var(--ease-out), border-left-color 260ms var(--ease-out), background 260ms var(--ease-out);
    cursor: default;
  }

  .s360-item:hover {
    transform: translateX(4px);
    border-color: rgba(255,255,255,0.12);
    border-left-color: var(--jeep-hover);
    background: rgba(90,105,10,0.07);
  }

  .s360-num {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--jeep-hover);
    line-height: 1;
  }

  .s360-body {
    flex: 1;
    min-width: 0;
  }

  .s360-body strong {
    display: block;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.92);
    margin-bottom: 5px;
  }

  .s360-body p {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(255,255,255,0.50);
    font-weight: 400;
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
    border-color: var(--jeep-hover);
  }

  .safety-feat :global(.material-symbols-outlined) {
    color: var(--jeep-hover);
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
    .safety-features,
    .safety-videos-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .safety-360-wrap {
      grid-template-columns: 1fr;
    }
    .s360-cards {
      max-height: none;
      overflow-y: visible;
    }
  }

  @media (max-width: 560px) {
    .safety-features {
      grid-template-columns: repeat(2, 1fr);
    }
    .safety-videos-grid,
    .safety-360-wrap,
    .safety-360-grid {
      grid-template-columns: 1fr;
    }
    .s360-cards {
      max-height: none;
      overflow-y: visible;
    }
    .safety-vid-card video {
      aspect-ratio: 16 / 9;
    }
    .svc-label {
      padding: 10px 12px;
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
  .vs-glow { position: absolute; inset: 10% 15%; border-radius: 50%; background: radial-gradient(circle, rgba(90,105,10,0.18) 0%, transparent 70%); filter: blur(60px); z-index: 0; pointer-events: none; animation: glow-breathe 4s ease-in-out infinite alternate; }
  @keyframes glow-breathe { from { opacity: .5; transform: scale(.95); } to { opacity: 1; transform: scale(1.08); } }
  .vs-hero-car { position: relative; z-index: 1; width: 100%; max-height: 400px; object-fit: contain; border-radius: 30px; filter: drop-shadow(0 40px 60px rgba(0,0,0,.55)); animation: car-reveal .6s cubic-bezier(.16,1,.3,1); }
  @keyframes car-reveal { from { opacity: 0; transform: scale(.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .vs-color-bar { margin-top: 6px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .vs-color-label { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.55); letter-spacing: .04em; text-transform: uppercase; min-height: 20px; transition: color .3s; }
  .vs-dots { display: flex; gap: 18px; }
  .vs-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--dot-color); border: 2px solid rgba(255,255,255,0.15); cursor: pointer; position: relative; transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; outline: none; }
  .vs-dot::after { content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 2px solid transparent; transition: border-color .3s; }
  .vs-dot.active { transform: scale(1.22); }
  .vs-dot.active::after { border-color: var(--jeep-hover); }
  .vs-dot:hover { transform: scale(1.15); }

  .vs-panel-toggle { display: flex; justify-content: center; gap: 10px; margin: 44px 0 32px; }
  .vs-panel-toggle button { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 24px; border-radius: 16px; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 700; cursor: pointer; transition: all .3s; font-family: inherit; }
  .vs-panel-toggle button.active { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.22); color: white; }

  .vs-feat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; max-width: 1100px; margin: 0 auto; padding: 0 20px; text-align: left; }
  .vs-feat-card { display: flex; align-items: flex-start; gap: 12px; padding: 16px 20px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.5; animation: feat-in .4s ease-out both; animation-delay: var(--d); }
  .vs-feat-card :global(span.google-icon) { color: var(--jeep-hover); flex-shrink: 0; margin-top: 2px; }
  @keyframes feat-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .vs-exterior-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 20px; }
  .vs-ext-card { width: 100%; border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: transform .3s, border-color .3s, background .3s; cursor: pointer; font-family: inherit; }
  .vs-ext-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); }
  .vs-ext-card img { width: 100%; height: 180px; object-fit: contain; }
  .vs-ext-card span { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: .08em; }
  .vs-ext-card span :global(.material-symbols-outlined) { color: var(--jeep-hover); opacity: 0.7; }

  .vs-actions { display: flex; justify-content: center; gap: 14px; margin-top: 48px; flex-wrap: wrap; }
  .vs-action { display: inline-flex; align-items: center; gap: 8px; height: 52px; padding: 0 32px; border-radius: 999px; font-size: 14px; font-weight: 800; cursor: pointer; text-decoration: none; border: none; font-family: inherit; transition: all .3s cubic-bezier(.16,1,.3,1); }
  .vs-action.primary { background: var(--jeep-hover); color: white; box-shadow: 0 4px 24px rgba(90,105,10,0.35); }
  .vs-action.primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 32px rgba(90,105,10,0.5); }
  .vs-action.ghost { background: transparent; border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.75); }
  .vs-action.ghost:hover { border-color: rgba(255,255,255,0.35); color: white; transform: translateY(-2px); }

  @media (max-width: 900px) {
    .vs-exterior-row { grid-template-columns: 1fr; }
    .vs-feat-grid { grid-template-columns: 1fr; }
    .vs-hero-car { max-height: 280px; }
    .vs-pill { padding: 8px 20px; font-size: 12px; }

    /* ── 16px de separación lateral en mobile ── */
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

  @media (max-width: 900px) {
    .hero-copy {
      margin-left: 20px;
      margin-bottom: 110px;
      width: calc(100% - 40px);
    }

    .video-wash {
      display: none;
    }

    .pin-stage {
      min-height: auto;
      padding: 82px 0;
    }

    .pin-visual {
      position: relative;
      min-height: auto;
      grid-template-columns: 1fr;
      width: min(720px, calc(100% - 28px));
      padding: 0;
      gap: 24px;
    }

    .pin-media {
      transform: none;
    }

    .pin-copy {
      padding: 24px;
    }

    .pin-readout {
      width: 100%;
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

    .spec-band,
    .story-panel,
    .cockpit {
      grid-template-columns: 1fr;
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

    .product-nav strong {
      max-width: 48vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pin-stage {
      padding: 0px 0;
    }

    .pin-media {
      aspect-ratio: 4 / 3;
      border-radius: 24px;
    }

    .pin-copy h2 {
      font-size: 38px;
    }

    .pin-play-cue {
      left: 14px;
      bottom: 14px;
      padding: 9px 12px;
    }

    .cap-list,
    .cockpit-grid,
    .safety-grid,
    .versions-layout,
    .features-columns {
      grid-template-columns: 1fr;
    }

    /* spec-band mantiene 2 columnas en mobile (2x2) */
    .spec-band {
      grid-template-columns: 1fr 1fr;
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
    .jeep-premium *,
    .jeep-premium *::before,
    .jeep-premium *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }

  /* ─ Quote CTA grid ─────────────────────────────────────────── */
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

  .quote-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  /* ── #22 Year badge in product-nav ── */
  .nav-year {
    display: inline-block;
    padding: 1px 7px;
    margin-left: 4px;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 999px;
    background: rgba(90, 105, 10, 0.28);
    border: 1px solid rgba(90, 105, 10, 0.45);
    color: var(--jeep-hover);
    vertical-align: middle;
  }

  /* ── Ver más equipamiento ── */
  .vs-feat-more {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .vs-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 24px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.65);
    font-size: 13px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 300ms ease, border-color 300ms ease, color 300ms ease;
  }

  .vs-more-btn:hover {
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.28);
    color: white;
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

  /* ── Floating CTA bar ── */
  .floating-cta {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 36;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(8, 8, 14, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.10);
  }

  .floating-cta-name {
    font-size: 12px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.03em;
    padding-right: 4px;
    border-right: 1px solid rgba(255, 255, 255, 0.14);
    margin-right: 2px;
    white-space: nowrap;
  }

  .floating-cta-ghost,
  .floating-cta-primary {
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0 16px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
    transition: all 280ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .floating-cta-ghost {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.80);
  }

  .floating-cta-ghost:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.32);
    color: white;
  }

  .floating-cta-primary {
    background: var(--jeep-default);
    border: 1px solid transparent;
    color: white;
    box-shadow: 0 4px 16px rgba(66, 77, 7, 0.40);
  }

  .floating-cta-primary:hover {
    background: var(--jeep-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(66, 77, 7, 0.60);
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
  /* ── Lightbox Zoom Overlay ── */
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
    animation: lb-fade .3s ease-out;
  }

  @keyframes lb-fade { from { opacity: 0; } to { opacity: 1; } }

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    animation: lb-zoom .4s cubic-bezier(.16, 1, .3, 1);
  }

  @keyframes lb-zoom { from { opacity: 0; transform: scale(.92); } to { opacity: 1; transform: scale(1); } }

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

  @media (max-width: 560px) {
    .lightbox-close { top: -40px; right: 0; }
  }

  /* MOBILE HERO SPLIT LAYOUT */
  @media (max-width: 768px) {
    .jeep-premium {
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
    .jeep-hero {
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
      display: block;
      margin: 0;
      /* Animación heredada del desktop */
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
