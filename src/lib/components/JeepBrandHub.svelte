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

  const A = '/adistem2026/jeep-lineup'
  const JEEP_DEFAULT = '#424D07'
  const JEEP_HOVER = '#5A690A'
  let activeModelIndex = $state(0)

  const models: JeepModel[] = [
    {
      slug: '1500-rho',
      name: 'JEEP 1500 RHO',
      role: 'Alto desempeño off-road',
      image: `${A}/jeep-1500-rho.jpg`,
      accent: JEEP_HOVER,
      use: 'Para quien quiere velocidad, presencia y terracería.',
      stat: 'Performance',
      metric: 'Off-road',
      detail: 'Suspensión y respuesta para terrenos abiertos',
    },
    {
      slug: '1500-tungsten',
      name: 'JEEP 1500 Tungsten',
      role: 'Lujo y capacidad premium',
      image: `${A}/jeep-1500-tungsten.jpg`,
      accent: JEEP_DEFAULT,
      use: 'Para viajes, negocio y confort ejecutivo.',
      stat: 'Premium',
      metric: 'Lujo',
      detail: 'Cabina elevada, materiales premium y gran presencia',
    },
    {
      slug: '700',
      name: 'JEEP 700',
      role: 'Compacta, ágil, urbana',
      image: `${A}/jeep-700.jpg`,
      accent: JEEP_HOVER,
      use: 'Para ciudad, reparto y emprendimientos.',
      stat: 'Ciudad',
      metric: 'Ágil',
      detail: 'Formato compacto para moverse y cargar todos los días',
    },
    {
      slug: 'renegade',
      name: 'Jeep Renegade',
      role: 'SUV compacto y versátil',
      image: `/adistem2026/jeep/hero.avif`,
      accent: JEEP_DEFAULT,
      use: 'Para la ciudad, carretera y la aventura espontánea.',
      stat: 'Aventura Urbana',
      metric: '1.3L Turbo 173 HP',
      detail: 'Eficiencia y tecnología de clase mundial con diseño icónico',
    },
    {
      slug: '1500',
      name: 'JEEP 1500',
      role: 'Potencia diaria',
      image: `${A}/jeep-1500.jpg`,
      accent: JEEP_DEFAULT,
      use: 'Para remolque, familia y aventura.',
      stat: 'Versátil',
      metric: 'Remolque',
      detail: 'Balance entre fuerza, confort y capacidad diaria',
    },
    {
      slug: '1200',
      name: 'JEEP 1200',
      role: 'Trabajo inteligente',
      image: `${A}/jeep-1200.jpg`,
      accent: '#7f7f7f',
      use: 'Para flotillas, campo y carga productiva.',
      stat: 'Trabajo',
      metric: 'Carga',
      detail: 'Configuración práctica para jornadas productivas',
    },
  ]

  function selectModel(slug: string) {
    onModelSelect?.(slug)
  }

  function goToModel(index: number) {
    activeModelIndex = (index + models.length) % models.length
  }
</script>

<svelte:head>
  <title>JEEP | Gama 2026 en VAPSA</title>
</svelte:head>

<main class="jeep-hub">
  <section class="hub-hero">
    <img src={`${A}/jeep-1500-rho.jpg`} alt="JEEP 1500 RHO en movimiento" />
    <div class="hero-overlay"></div>
    <div class="hero-inner">
      <p>Gama JEEP 2026</p>
      <h1>Una familia para cada forma de avanzar.</h1>
      <span>Desde la agilidad urbana de JEEP 700 hasta el carácter premium de JEEP 1500, encuentra la pickup que encaja con tu trabajo, tu ruta y tu estilo.</span>
      <button onclick={() => selectModel('1500-rho')}>Ver detalle destacado <GoogleIcon name="arrow_forward" size={18} /></button>
    </div>
  </section>

  <section class="model-carousel" aria-label="Modelos JEEP">
    <div class="carousel-head">
      <div>
        <p>Explora la gama</p>
        <h2>Modelos JEEP 2026</h2>
      </div>
    </div>

    <div class="carousel-window">
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
              <button onclick={() => selectModel(model.slug)}>Ver modelo <GoogleIcon name="arrow_forward" size={16} /></button>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <div class="carousel-controls">
      <div class="carousel-dots" aria-label="Seleccionar modelo">
        {#each models as model, i (model.slug)}
          <button
            class:active={i === activeModelIndex}
            aria-label={`Ver ${model.name}`}
            onclick={() => goToModel(i)}
            style={`--accent:${model.accent}`}>
          </button>
        {/each}
      </div>
      <div class="carousel-arrows">
        <button aria-label="Modelo anterior" onclick={() => goToModel(activeModelIndex - 1)}><GoogleIcon name="arrow_back" size={18} /></button>
        <button aria-label="Modelo siguiente" onclick={() => goToModel(activeModelIndex + 1)}><GoogleIcon name="arrow_forward" size={18} /></button>
      </div>
    </div>
  </section>

  <section class="chooser">
    <div class="chooser-copy">
      <p>Elige por necesidad</p>
      <h2>No todas las JEEP hacen lo mismo. Esa es la idea.</h2>
    </div>
    <div class="use-grid">
      <article>
        <GoogleIcon name="business_center" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Aventura Urbana</strong>
        <span>Jeep Renegade, con motor 1.3L Turbo y 173 HP, para dominar la ciudad y las escapadas de fin de semana con actitud.</span>
      </article>
      <article>
        <GoogleIcon name="local_shipping" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Carga y remolque</strong>
        <span>JEEP 1500 para combinar fuerza, espacio y comodidad.</span>
      </article>
      <article>
        <GoogleIcon name="terrain" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Terracería y aventura</strong>
        <span>JEEP 1500 RHO cuando el camino también es parte del plan.</span>
      </article>
      <article>
        <GoogleIcon name="explore" size={22} style="margin-bottom:24px;color:{JEEP_HOVER}" />
        <strong>Viaje premium</strong>
        <span>JEEP 1500 Tungsten para quien quiere capacidad con cabina de alto nivel.</span>
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
            <button onclick={() => selectModel(model.slug)}>Explorar modelo <GoogleIcon name="arrow_forward" size={16} /></button>
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
    min-height: 100svh;
    position: relative;
    display: grid;
    align-items: end;
    overflow: hidden;
  }

  .hub-hero::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 78px clamp(16px, 4vw, 54px) clamp(18px, 4vw, 54px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    pointer-events: none;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      inset 0 -1px 0 rgba(255,255,255,0.05),
      0 0 80px rgba(136,13,0,0.18);
    opacity: 0;
    animation: border-bloom 1300ms var(--ease) both 350ms;
  }

  .hub-hero::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 78px;
    left: clamp(22px, 8vw, 140px);
    width: min(360px, 46vw);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent);
    opacity: 0;
    animation: line-scan 1600ms var(--ease) both 550ms;
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
    transform: scale(1.02);
    animation: hero-drift 9s var(--ease) both;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5, 5, 7, 0.94) 0%, rgba(5, 5, 7, 0.48) 46%, rgba(5, 5, 7, 0.18) 100%),
      linear-gradient(0deg, #050507 0%, transparent 40%);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(820px, calc(100% - 40px));
    margin: 0 0 clamp(78px, 10vw, 126px) clamp(24px, 8vw, 122px);
    animation: hero-copy-in 1100ms var(--ease) both 120ms;
  }

  .hero-inner::before {
    content: '';
    display: block;
    width: 72px;
    height: 1px;
    margin-bottom: 24px;
    background: linear-gradient(90deg, var(--jeep-hover), transparent);
  }

  .hero-inner p,
  .chooser-copy p,
  .lineup-head p,
  .hub-cta p {
    margin: 0 0 14px;
    color: var(--jeep-hover);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero-inner h1,
  .chooser-copy h2,
  .lineup-head h2,
  .hub-cta h2 {
    margin: 0;
    font-size: clamp(44px, 7vw, 104px);
    line-height: 0.94;
    font-weight: 950;
    letter-spacing: 0;
  }

  .hero-inner > span {
    display: block;
    max-width: 640px;
    margin-top: 24px;
    color: rgba(255, 255, 255, 0.68);
    font-size: clamp(16px, 1.5vw, 21px);
    line-height: 1.55;
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

  .model-carousel {
    position: relative;
    z-index: 1;
    --card-w: clamp(390px, 43vw, 680px);
    --gap: 22px;
    padding: clamp(34px, 5vw, 72px) clamp(18px, 6vw, 90px);
    background:
      radial-gradient(circle at 78% 16%, rgba(136, 13, 0, 0.16), transparent 28%),
      linear-gradient(180deg, #050507 0%, #09090d 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.10);
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    animation: reveal-up both;
    animation-timeline: view();
    animation-range: entry 0% cover 26%;
  }

  .carousel-head {
    display: flex;
    align-items: end;
    gap: 20px;
    margin-bottom: 22px;
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
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
    font-size: clamp(30px, 4vw, 58px);
    line-height: 1;
    letter-spacing: 0;
  }

  .carousel-arrows {
    display: flex;
    gap: 10px;
  }

  .carousel-arrows button {
    width: 46px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.86);
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.20);
    cursor: pointer;
    transition: transform 420ms var(--ease), background 420ms var(--ease), border-color 420ms var(--ease);
  }

  .carousel-arrows button:hover {
    transform: translateY(-2px);
    border-color: rgba(186, 0, 0, 0.48);
    background: rgba(136, 13, 0, 0.28);
  }

  .carousel-window {
    overflow: hidden;
    border-radius: 30px;
    padding: 8px 0 4px;
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
    background: transparent;
    isolation: isolate;
    transform: translateZ(0);
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .model-track article::before {
    content: '';
    position: absolute;
    z-index: 2;
    inset: 0 0 auto;
    height: clamp(320px, 34vw, 520px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 30px;
    pointer-events: none;
    transition: border-color 620ms var(--ease), box-shadow 620ms var(--ease), transform 620ms var(--ease);
  }

  .model-track img {
    position: relative;
    width: 100%;
    height: clamp(320px, 34vw, 520px);
    object-fit: cover;
    opacity: 0.92;
    transform: scale(1.045);
    border-radius: 30px;
    transition: transform 1200ms var(--ease), opacity 1200ms var(--ease), filter 1200ms var(--ease);
  }

  .model-track article::after {
    content: none;
  }

  .model-track article.active img {
    transform: scale(1);
    opacity: 0.96;
  }

  .model-track article.active::before {
    border-color: color-mix(in srgb, var(--accent) 55%, rgba(255,255,255,0.22));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      0 0 46px color-mix(in srgb, var(--accent) 20%, transparent);
    transform: scale(0.996);
  }

  .slide-glass {
    position: relative;
    z-index: 3;
    width: 100%;
    min-height: auto;
    margin: 0;
    padding: 22px 14px 0;
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
    font-size: clamp(28px, 3.4vw, 46px);
    line-height: 1;
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
    line-height: 1.5;
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

  .carousel-dots {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 9px;
    min-height: 46px;
  }

  .carousel-dots button {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.26);
    cursor: pointer;
    transition: width 460ms var(--ease), background 460ms var(--ease), box-shadow 460ms var(--ease);
  }

  .carousel-dots button.active {
    width: 34px;
    background: var(--accent);
    box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 48%, transparent);
  }

  .chooser,
  .lineup {
    padding: clamp(62px, 9vw, 126px) clamp(20px, 6vw, 90px);
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
    gap: 14px;
  }

  .use-grid article {
    min-height: 190px;
    padding: 24px;
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
    max-width: 760px;
    margin-bottom: 36px;
  }

  .lineup-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: clamp(22px, 3vw, 34px);
  }

  .lineup-grid article {
    grid-column: span 3;
    position: relative;
    display: grid;
    grid-template-rows: minmax(300px, 1fr) auto;
    align-items: stretch;
    overflow: hidden;
    background: #111116;
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 28px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
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
    grid-column: span 2;
  }

  .lineup-grid img {
    position: relative;
    width: 100%;
    height: clamp(300px, 32vw, 430px);
    object-fit: cover;
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
    padding: clamp(22px, 3vw, 36px);
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
    font-size: clamp(32px, 4vw, 58px);
    line-height: 0.95;
  }

  .lineup-grid span {
    display: block;
    max-width: 440px;
    margin-top: 14px;
    color: rgba(255, 255, 255, 0.64);
    font-size: 15px;
    line-height: 1.5;
  }

  .lineup-grid em {
    display: block;
    max-width: 480px;
    margin-top: 16px;
    padding-left: 14px;
    border-left: 1px solid color-mix(in srgb, var(--accent) 58%, rgba(255,255,255,0.18));
    color: rgba(255, 255, 255, 0.50);
    font-size: 13px;
    font-style: normal;
    line-height: 1.45;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 620ms var(--ease), transform 620ms var(--ease);
  }

  .lineup-grid article:hover em {
    opacity: 1;
    transform: translateY(0);
  }

  .hub-cta {
    min-height: 72svh;
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

  @keyfjeepes hero-drift {
    from {
      transform: scale(1.08) translateX(-18px);
    }
    to {
      transform: scale(1.02) translateX(0);
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

  @keyfjeepes border-bloom {
    from {
      opacity: 0;
      transform: scale(0.985);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyfjeepes line-scan {
    from {
      opacity: 0;
      transform: translateX(-42px) scaleX(0.45);
    }
    to {
      opacity: 0.72;
      transform: translateX(0) scaleX(1);
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

  @keyfjeepes card-rise {
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

  @keyfjeepes tile-rise {
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
      height: clamp(280px, 56vw, 460px);
      border-radius: 22px;
    }

    .model-track article::before {
      height: clamp(280px, 56vw, 460px);
      border-radius: 22px;
    }

    .slide-glass {
      width: 100%;
      min-height: auto;
      margin: 0;
      border-left: 0;
      border-top: 0;
      padding-left: 6px;
      padding-right: 6px;
    }

    .chooser,
    .lineup-grid {
      grid-template-columns: 1fr;
    }

    .lineup-grid article,
    .lineup-grid article:nth-child(n + 3) {
      grid-column: auto;
      min-height: auto;
    }
  }

  @media (max-width: 620px) {
    .model-carousel {
      --card-w: min(86vw, 390px);
      --gap: 16px;
    }

    .hero-inner {
      margin-left: 20px;
      margin-bottom: 80px;
    }

    .hero-inner h1 {
      font-size: 48px;
    }

    .use-grid {
      grid-template-columns: 1fr;
    }

    .carousel-head {
      align-items: start;
      flex-direction: column;
    }

    .carousel-controls {
      gap: 14px;
    }

    .carousel-dots {
      flex: 1;
      min-width: 0;
      gap: 8px;
    }

    .carousel-arrows {
      flex-shrink: 0;
    }

    .carousel-arrows button {
      width: 42px;
      height: 42px;
    }

    .slide-glass h3 {
      font-size: 32px;
    }
  }
</style>
