<script lang="ts">
  import { onMount } from 'svelte'
  import GoogleIcon from './GoogleIcon.svelte'

  const A = '/adistem2026/jeep-demo'
  const L = '/adistem2026/jeep-lineup'
  let { modelSlug = '1500-rho' }: { modelSlug?: string | null } = $props()
  let progress = $state(0)
  let videoReady = $state(false)
  let pinVideoActive = $state(false)

  type ModelDetail = {
    name: string
    kicker: string
    title: string
    subtitle: string
    heroImage: string
    spotlightImage: string
    quote: string
    specs: { value: string; label: string }[]
    motionTitle: string
    motionCopy: string
    cockpitImages?: string[]
    storyImages?: string[]
    motionImages?: string[]
    capabilityImage?: string
  }

  const modelDetails: Record<string, ModelDetail> = {
    'renegade': {
      name: 'Jeep Renegade',
      kicker: 'RENEGADE 2026',
      title: 'Redefine la aventura urbana.',
      subtitle: 'Con motor 1.3L Turbo de 173 hp, el Jeep Renegade combina nuestro icónico diseño 4x4 con tecnología de vanguardia para la ciudad.',
      heroImage: `/adistem2026/jeep/hero.avif`,
      spotlightImage: `/adistem2026/jeep/jeep-renegade-2025-inicio-galeria-03-all-breakpoints.avif`,
      quote: 'Hola,%20me%20interesa%20cotizar%20un%20Jeep%20Renegade',
      specs: [
        { value: '173 hp', label: 'Motor 1.3L Turbo' },
        { value: '8.4"', label: 'Pantalla Táctil Uconnect' },
        { value: '7"', label: 'Clúster digital TFT' },
        { value: 'ADAS', label: 'Asistencia avanzada' },
      ],
      motionTitle: 'Diseño inconfundible. Desempeño moderno.',
      motionCopy: 'Su parrilla de 7 ranuras rinde homenaje al legado Jeep, mientras que su interior te envuelve en tecnología moderna y comodidad premium.',
      cockpitImages: [
        '/adistem2026/jeep/int 1.avif',
        '/adistem2026/jeep/int 2.avif',
        '/adistem2026/jeep/jeep-renegade-2026-inicio-equipamiento-interior-dk.jpg.img.2880.avif'
      ],
      storyImages: [
        '/adistem2026/jeep/exteriro 2.avif',
        '/adistem2026/jeep/exterior 4.avif',
        '/adistem2026/jeep/motor.avif'
      ],
      motionImages: [
        '/adistem2026/jeep/jeep-renegade-2025-inicio-galeria-01-all-breakpoints.avif',
        '/adistem2026/jeep/luces de niebal.avif',
        '/adistem2026/jeep/exterior 3.avif'
      ],
      capabilityImage: '/adistem2026/jeep/jeep-renegade-2026-inicio-galeria-02-full.avif'
    },
    '700': {
      name: 'JEEP 700',
      kicker: 'JEEP 700 2026',
      title: 'Agilidad compacta con actitud de pickup.',
      subtitle: 'Una JEEP pensada para ciudad, negocio y recorridos diarios: práctica, visual y lista para moverse sin sentirse pesada.',
      heroImage: `${L}/jeep-700.jpg`,
      spotlightImage: `${L}/jeep-700.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP%20700',
      specs: [
        { value: '700', label: 'Pickup compacta JEEP' },
        { value: 'Ágil', label: 'Formato práctico para ciudad' },
        { value: 'Carga', label: 'Caja útil para negocio diario' },
        { value: 'Daily', label: 'Lista para trabajo y movilidad' },
      ],
      motionTitle: 'Se mueve ligera, se ve decidida.',
      motionCopy: 'La JEEP 700 funciona como herjeepienta diaria: entra fácil, carga cuando toca y mantiene una presencia clara en cada trayecto.',
    },
    '1500-rho': {
      name: 'JEEP 1500 RHO',
      kicker: 'JEEP 1500 RHO 2026',
      title: 'Fuerza que se siente antes de arrancar.',
      subtitle: 'Performance off-road con presencia JEEP: una pickup para abrir camino, cargar intención y llegar con autoridad.',
      heroImage: `${L}/jeep-1500-rho.jpg`,
      spotlightImage: `${L}/jeep-1500-rho.jpg`,
      quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP%201500%20RHO',
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
    heroImage: `${A}/hero.jpg`,
    spotlightImage: `${A}/modelo-solo.jpg`,
    quote: 'Hola,%20me%20interesa%20cotizar%20una%20JEEP',
    specs: [
      { value: '6.7L', label: 'Turbodiesel disponible' },
      { value: '4x4', label: 'Tracción para trabajo pesado' },
      { value: '12"', label: 'Pantalla vertical central' },
      { value: '360°', label: 'Visión para maniobras' },
    ],
    motionTitle: 'Más que una pickup: una herjeepienta premium.',
    motionCopy: 'Diseñada para cargar, remolcar y llegar con autoridad.',
  }

  const model = $derived(modelDetails[modelSlug ?? ''] ?? fallbackModel)
  const specs = $derived(model.specs)
  const pinVideoSrc = $derived(
    pinVideoActive
      ? 'https://www.youtube.com/embed/va4e9sjZZGg?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=va4e9sjZZGg'
      : ''
  )

  const renegadeVersions = [
    {
      id: 'latitude',
      name: 'Latitude',
      thumb: '/adistem2026/jeep/grey.png',
      features: [
        ['Rines de aluminio de 18”', 'Neumáticos 225 / 55 R18', 'Aire acondicionado automático de doble zona', 'Cluster premium de 7” con pantalla TFT a color', 'Tomacorriente auxiliar de 12V', 'Alarma de seguridad', 'Control de estabilidad para remolques (TSD)'],
        ['Sistema de anclaje de sillas para niños ISOFIX', 'Controles de audio y teléfono al volante', 'Desempañador trasero', 'Luces proyectoras LED bifuncionales']
      ],
      colors: [
        { name: 'Mantarraya', hex: '#9a9da2', img: '/adistem2026/jeep/grey.png' },
        { name: 'Gris Negro', hex: '#2e2e2e', img: '/adistem2026/jeep/grey black.png' },
        { name: 'Blanco Polar', hex: '#ffffff', img: '/adistem2026/jeep/whute s.png' }
      ]
    },
    {
      id: 'limited-s',
      name: 'Limited S',
      thumb: '/adistem2026/jeep/grey s.png',
      features: [
        ['Motor de 1.3 L Turbo GSE', 'Rines de aluminio de 19" únicos en su segmento', 'Neumáticos 235/45 R19', 'Luces frontales, faros de niebla y luces diurnas', 'Quemacocos panorámico y toldo bi-tono', 'Alarma de seguridad', 'Alerta contra colisiones frontales plus'],
        ['Alerta de cambio involuntario de carril plus', 'Sistema de detección de fatiga del conductor', 'Espejo retrovisor electrocrómico', 'Parabrisas con sensor de lluvia']
      ],
      colors: [
        { name: 'Gris Mantarraya', hex: '#2e2e2e', img: '/adistem2026/jeep/grey s.png' },
        { name: 'Negro Carbón', hex: '#0e0e0e', img: '/adistem2026/jeep/black.png' },
        { name: 'Gris Bajo', hex: '#9a9da2', img: '/adistem2026/jeep/grey low s.png' }
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
      kicker: 'Presencia',
      title: model.motionTitle,
      copy: model.motionCopy,
      image: model.storyImages?.[0] || model.heroImage,
    },
    {
      kicker: 'Tecnología',
      title: 'Control total desde el centro.',
      copy: 'Pantalla táctil y sistema avanzado en una cabina pensada para decidir rápido y manejar mejor.',
      image: model.storyImages?.[1] || `${A}/interior-3.jpg`,
    },
    {
      kicker: 'Desempeño',
      title: 'Potencia inteligente para lo que sigue.',
      copy: 'Eficiencia y respuesta dinámica que convierten cada trayecto en una extensión real de tu libertad.',
      image: model.storyImages?.[2] || `${A}/interior-1.jpg`,
    },
  ])

  const motionCards = $derived([
    {
      title: model.name,
      copy: model.motionCopy,
      image: model.motionImages?.[0] || model.heroImage,
    },
    {
      title: 'Iluminación y diseño',
      copy: 'Detalles visuales modernos, iluminación eficiente y una experiencia pensada para destacar.',
      image: model.motionImages?.[1] || `${A}/interior-3.jpg`,
    },
    {
      title: 'Actitud en movimiento',
      copy: 'Postura dominante y soluciones prácticas para moverse con intención todos los días.',
      image: model.motionImages?.[2] || `${A}/vehiculo-aislado.jpg`,
    },
  ])

  const cockpitImages = $derived(model.cockpitImages || [
    `${A}/interior-2.jpg`,
    `${A}/interior-4.jpg`,
    `${A}/interior-5.jpg`,
  ])

  const capabilityImage = $derived(model.capabilityImage || `${A}/vehiculo-aislado.jpg`)

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
      raf = requestAnimationFjeepe(animate)
    }

    update()
    animate()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFjeepe(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  })

  function openQuote() {
    const target = document.getElementById('jeep-quote')
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function goBackToJeep() {
    history.pushState({ brand: 'Jeep' }, '', '/adistem2026/jeep/')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { brand: 'Jeep' } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<svelte:head>
  <title>{model.name} | VAPSA</title>
</svelte:head>

<main class="jeep-premium" style={`--scroll:${progress}`}>
  <section id="inicio" class="jeep-hero">
    <div class:ready={videoReady} class="video-wash">
      <ifjeepe
        src="https://www.youtube.com/embed/OaZSEoMmedw?autoplay=1&mute=1&loop=1&playlist=OaZSEoMmedw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=2&vq=hd1080"
        title="JEEP video"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        loading="eager"
        onload={() => videoReady = true}>
      </ifjeepe>
    </div>
    <img class:video-loaded={videoReady} class="hero-fallback" src={model.heroImage} alt={model.name} />
    <div class="hero-shade"></div>
    <button class="back-button" onclick={goBackToJeep}><GoogleIcon name="arrow_back" size={17} /> JEEP</button>
    <div class="hero-copy">
      <p>{model.kicker}</p>
      <h1>{model.title}</h1>
      <span>{model.subtitle}</span>
      <button onclick={openQuote}>Cotizar {model.name} <GoogleIcon name="arrow_forward" size={18} /></button>
    </div>
    <div class="progress-rail" aria-hidden="true"><span></span></div>
    <div class="scroll-cue">Desliza</div>
  </section>

  <nav class="product-nav s-mteEPoerD6_z" aria-label="Navegación de producto JEEP">
    <strong class="s-mteEPoerD6_z">{model.name}</strong>
    <a href="#inicio" class="s-mteEPoerD6_z">Inicio</a>
    <a href="#galeria" class="s-mteEPoerD6_z">Galería</a>
    <a href="#equipamiento-interior" class="s-mteEPoerD6_z">Equipamiento interior</a>
    <a href="#capacidad" class="s-mteEPoerD6_z">Capacidad y desempeño</a>
    <a href="#equipamiento-exterior" class="s-mteEPoerD6_z">Equipamiento exterior</a>
    <a href="#seguridad" class="s-mteEPoerD6_z">Seguridad</a>
    <button onclick={openQuote} class="s-mteEPoerD6_z">Cotizar</button>
  </nav>

  <section class="pin-stage">
    <div class="pin-visual">
      <div class="pin-media-stack">
        <button
          type="button"
          class="pin-media"
          aria-label={`Reproducir video de ${model.name}`}
          onmouseenter={() => pinVideoActive = true}
          onmouseleave={() => pinVideoActive = false}
          onfocus={() => pinVideoActive = true}
          onblur={() => pinVideoActive = false}
          onclick={() => pinVideoActive = !pinVideoActive}
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
        </button>

        <div class="pin-readout">
          <span>Momentum visual</span>
          <strong>{Math.round(progress * 100)}%</strong>
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
          <span class="vs-price">{activeVersion.id === 'latitude' ? 'Desde $456,900' : 'Desde $506,900'}</span>
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
          {#each [...activeVersion.features[0], ...activeVersion.features[1]] as feat, i}
            <div class="vs-feat-card" style={`--d:${i * 40}ms`}>
              <GoogleIcon name="check_circle" size={18} />
              <span>{feat}</span>
            </div>
          {/each}
        </div>
      {:else}
        <div class="vs-exterior-row">
          <div class="vs-ext-card">
            <img src={activeVersion.thumb} alt={activeVersion.name} />
            <span>Vista lateral</span>
          </div>
          <div class="vs-ext-card">
            <img src="/adistem2026/jeep/exterior 1.avif" alt="Frontal" />
            <span>Vista frontal</span>
          </div>
          <div class="vs-ext-card">
            <img src="/adistem2026/jeep/exterior 3.avif" alt="Trasera" />
            <span>Vista trasera</span>
          </div>
        </div>
      {/if}

      <!-- CTA -->
      <div class="vs-actions">
        <button onclick={openQuote} class="vs-action primary">Cotizar ahora <GoogleIcon name="arrow_forward" size={16} /></button>
        <a href="https://wa.me/524871108899?text=Hola%2C%20me%20interesa%20el%20Jeep%20Renegade" target="_blank" rel="noopener noreferrer" class="vs-action ghost">Prueba de manejo</a>
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
      <p>Cabina JEEP</p>
      <h2>Oscura, silenciosa, lista.</h2>
      <span>Materiales sobrios, displays claros y espacio real para que cada viaje se sienta bajo control.</span>
    </div>
    <div class="cockpit-grid">
      <img src={cockpitImages[0]} alt="Pantalla JEEP" />
      <img src={cockpitImages[1]} alt="Cluster JEEP" />
      <img src={cockpitImages[2]} alt="Cabina JEEP" />
    </div>
  </section>

  <section id="capacidad" class="capability">
    <img src={capabilityImage} alt="JEEP exterior de trabajo" />
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

  <section id="seguridad" class="safety-section">
    <div class="safety-content">
      <p>Sistemas de Asistencia</p>
      <h2>Seguridad que te acompaña.</h2>
      <span>Equipamiento de primer nivel para protegerte a ti y a los tuyos en cada aventura.</span>
      <div class="safety-grid">
        <div class="safety-video-wrapper">
          <video 
            src="/adistem2026/jeep/jeep-totalmente-nueva-renegade-2026-highlights-sistemas-de-asistencia-04.mp4" 
            autoplay muted loop playsinline>
          </video>
        </div>
        <div class="safety-images">
          <img src="/adistem2026/jeep/jeep-renegade-2026-inicio-galeria-04-full.avif" alt="Seguridad 1" />
          <img src="/adistem2026/jeep/jeep-renegade-2026-inicio-galeria-06-full.avif" alt="Seguridad 2" />
        </div>
      </div>
    </div>
  </section>

  <section id="jeep-quote" class="quote-section">
    <p>VAPSA JEEP</p>
    <h2>Agenda una prueba de manejo o recibe una cotización.</h2>
    <div class="quote-actions">
      <a href={`https://wa.me/524871108899?text=${model.quote}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a href="tel:+524871108899">Llamar ahora</a>
    </div>
  </section>
</main>

<style>
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

  .video-wash ifjeepe {
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
    color: var(--jeep-hover);
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
    background: linear-gradient(180deg, var(--jeep-hover), rgba(255,255,255,0.72));
    box-shadow: 0 0 16px rgba(186, 0, 0, 0.72);
  }

  .product-nav {
    position: sticky;
    top: 74px;
    z-index: 35;
    width: min(1080px, calc(100% - 32px));
    min-height: 54px;
    margin: -27px auto 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px 0 22px;
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
    margin-right: auto;
    font-size: 14px;
    flex-shrink: 0;
    white-space: nowrap;
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
    font-size: 11px;
    font-weight: 850;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    transition: color 320ms var(--ease-out), background 320ms var(--ease-out), transform 320ms var(--ease-out);
  }

  .product-nav button {
    padding: 0 14px;
    color: white;
    background: var(--jeep-hover);
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
    grid-template-columns: minmax(0, 1fr) minmax(310px, 0.42fr);
    align-items: center;
    gap: clamp(26px, 4vw, 64px);
    width: min(1520px, calc(100% - clamp(32px, 7vw, 112px)));
    margin: 0 auto;
    padding: clamp(88px, 9vw, 132px) 0 clamp(44px, 5vw, 80px);
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
  .pin-media:focus-visible .pin-play-cue {
    opacity: 0;
    transform: translateY(8px);
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

  .pin-copy h2 {
    font-size: clamp(34px, 4.5vw, 62px);
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
    color: var(--jeep-hover);
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
    max-width: 820px;
    margin: 0;
    font-size: clamp(40px, 6vw, 84px);
    line-height: 0.96;
    font-weight: 950;
    letter-spacing: 0;
  }

  .safety-content span {
    display: block;
    margin: 18px 0 42px;
    color: rgba(255, 255, 255, 0.64);
    font-size: clamp(16px, 1.8vw, 22px);
    max-width: 600px;
  }

  .safety-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 24px;
    align-items: stretch;
  }

  .safety-video-wrapper {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 34px 90px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.10);
  }

  .safety-video-wrapper video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .safety-images {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
  }

  .safety-images img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 34px 90px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.10);
  }

  /* ── VERSIONES · Apple-style ── */
  .vs { padding: clamp(80px,10vw,140px) 0; text-align: center; background: #06060a; overflow: hidden; }

  .vs-hero-zone { max-width: 1100px; margin: 0 auto; }

  .vs-pill-bar { display: inline-flex; gap: 4px; background: rgba(255,255,255,0.06); border-radius: 999px; padding: 4px; margin-bottom: 36px; }
  .vs-pill { background: none; border: none; padding: 9px 28px; border-radius: 999px; font-size: 13px; font-weight: 800; color: rgba(255,255,255,0.5); cursor: pointer; transition: all .3s; font-family: inherit; letter-spacing: .03em; }
  .vs-pill.active { background: white; color: #06060a; box-shadow: 0 2px 12px rgba(0,0,0,.25); }

  .vs-title-row { margin-bottom: 10px; }
  .vs-title-row h2 { font-size: clamp(36px,5vw,58px); font-weight: 900; margin: 0; letter-spacing: -.02em; }
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
  .vs-ext-card { border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; transition: transform .3s, border-color .3s; }
  .vs-ext-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.14); }
  .vs-ext-card img { width: 100%; height: 180px; object-fit: contain; }
  .vs-ext-card span { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: .08em; }

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
  }

  @media (max-width: 900px) {
    .hero-copy {
      margin-left: 22px;
      margin-bottom: 92px;
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
      padding: 72px 0;
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

    .spec-band,
    .cap-list,
    .cockpit-grid,
    .safety-grid,
    .versions-layout,
    .features-columns {
      grid-template-columns: 1fr;
    }

    .cockpit-grid img,
    .cockpit-grid img:first-child {
      height: 280px;
      min-height: 280px;
    }
  }

  @keyfjeepes hero-copy-in {
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

  @keyfjeepes reveal-up {
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

  @keyfjeepes cue-pulse {
    0%, 100% {
      opacity: 0.38;
      transform: translateY(0);
    }
    50% {
      opacity: 0.76;
      transform: translateY(8px);
    }
  }

  @keyfjeepes soft-float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyfjeepes spec-rise {
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

  @keyfjeepes card-flow {
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

  @keyfjeepes image-unmask {
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
</style>
