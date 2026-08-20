<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { isDark, initSystemListener } from '$lib/stores/theme'
  import LiquidGlassFilters from '$lib/components/LiquidGlassFilters.svelte'
  import GlassSidebar       from '$lib/components/GlassSidebar.svelte'
  import GlassTopNav        from '$lib/components/GlassTopNav.svelte'
  import HeroSection        from '$lib/components/HeroSection.svelte'
  import PromoBentoGrid     from '$lib/components/PromoBentoGrid.svelte'
  import BrandBenefitsSection from '$lib/components/BrandBenefitsSection.svelte'
  import LeadFormSection     from '$lib/components/LeadFormSection.svelte'
  import RamBrandHub        from '$lib/components/RamBrandHub.svelte'
  import FiatBrandHub       from '$lib/components/FiatBrandHub.svelte'
  import FiatPremiumLanding from '$lib/components/FiatPremiumLanding.svelte'
  import RamPremiumLanding  from '$lib/components/RamPremiumLanding.svelte'
  import JeepBrandHub       from '$lib/components/JeepBrandHub.svelte'
  import JeepPremiumLanding from '$lib/components/JeepPremiumLanding.svelte'
  import DodgeBrandHub        from '$lib/components/DodgeBrandHub.svelte'
  import DodgePremiumLanding  from '$lib/components/DodgePremiumLanding.svelte'
  import PeugeotBrandHub      from '$lib/components/PeugeotBrandHub.svelte'
  import PeugeotPremiumLanding from '$lib/components/PeugeotPremiumLanding.svelte'
  import SeminuevosView     from '$lib/components/SeminuevosView.svelte'
  import PostventaView      from '$lib/components/PostventaView.svelte'
  import ContactView        from '$lib/components/ContactView.svelte'
  import CotizacionLanding  from '$lib/components/CotizacionLanding.svelte'
  import CitaServicioLanding from '$lib/components/CitaServicioLanding.svelte'
  import PruebaManejoLanding from '$lib/components/PruebaManejoLanding.svelte'
  import RecallTakataModal  from '$lib/components/RecallTakataModal.svelte'
  import UbicacionLanding   from '$lib/components/UbicacionLanding.svelte'
  import FloatingContact    from '$lib/components/FloatingContact.svelte'
  import MobileBottomNav    from '$lib/components/MobileBottomNav.svelte'
  import GoogleIcon         from '$lib/components/GoogleIcon.svelte'
  import type { BrandFilter, VehicleType } from '$lib/types'

  let heroEl:  HTMLDivElement | null = $state(null)
  let promoEl: HTMLDivElement | null = $state(null)
  let formEl:  any = $state(null)
  let brandStripEl:   HTMLElement | null = $state(null)
  let benefitsEl:     HTMLElement | null = $state(null)
  let serviceBannerEl: HTMLElement | null = $state(null)
  let mapEl:           HTMLElement | null = $state(null)
  let footerEl:        HTMLElement | null = $state(null)

  let brandFilter: BrandFilter = $state('Todas')
  let typeFilter:  VehicleType = $state('Todos')
  let currentView: 'Portal' | 'Seminuevos' | 'Contacto' | 'Cotizacion' | 'CitaServicio' | 'PruebaManejo' | 'Ubicacion' | 'Postventa' | 'FichasTecnicas' = $state('Portal')
  let postventaInitialTab = $state<'cita' | 'fichas'>('cita')
  let initialContactTab: 'cotizacion' | 'cita' | 'prueba' = $state('cotizacion')
  let ramModelSlug: string | null = $state(null)
  let jeepModelSlug: string | null = $state(null)
  let fiatModelSlug: string | null = $state(null)
  let dodgeModelSlug: string | null = $state(null)
  let peugeotModelSlug: string | null = $state(null)
  let mobileMenuOpen = $state(false)
  let brandStripVisible   = $state(false)
  let benefitsVisible     = $state(false)
  let serviceBannerVisible = $state(false)
  let footerVisible        = $state(false)
  let showTakataModal      = $state(false)

  const BRAND_CONFIGS: Record<BrandFilter, { video: string; image?: string; accent: string; title: string; subtitle: string; hideForm?: boolean }> = {
    'Todas': {
      video: 'FzFoLRs7ZIs',
      accent: '#334E8B',
      title: 'Tu próximo vehículo ideal te espera.',
      subtitle: 'Jeep®, FIAT, Dodge, Ram y Peugeot. Financiamiento desde 7.99% y bonos de hasta $200,000.'
    },
    'Jeep': {
      video: 'm0A2E2v0wF8', 
      image: '/adistem2026/jeep-banner.png',
      accent: '#424D07',
      title: 'Aventura sin límites. Línea Jeep® 2026.',
      subtitle: 'Descubre la libertad de ir a cualquier lugar con la tecnología y confort de Jeep®.',
      hideForm: true
    },
    'Ram': {
      video: 'q8E3E6kR_hY',
      image: '/adistem2026/ram-banner.jpg',
      accent: '#880D00',
      title: 'Poder y lujo sin compromiso. RAM 2026.',
      subtitle: 'La Pick-up más premiada, diseñada para los trabajos más exigentes.',
      hideForm: true
    },
    'Fiat': {
      video: 'CqL-XjM-v5Y',
      image: '/adistem2026/fiat-banner.jpg',
      accent: '#FF1530',
      title: 'Estilo italiano para tu día a día. FIAT 2026.',
      subtitle: 'Diseño, eficiencia y diversión en cada kilómetro.',
      hideForm: true
    },
    'Dodge': {
      video: 'p5U3W6XkXoI',
      image: '/adistem2026/dodge-banner.jpg',
      accent: '#D50000',
      title: 'Dominio absoluto. Línea Dodge 2026.',
      subtitle: 'Desempeño legendario y músculo americano en su máxima expresión.',
      hideForm: true
    },
    'Peugeot': {
      video: '2kY99v9l6I4',
      image: '/adistem2026/peugeot-banner.jpg',
      accent: '#0074E8',
      title: 'Allure y excelencia. Peugeot 2026.',
      subtitle: 'La combinación perfecta de innovación, tecnología y diseño francés.',
      hideForm: true
    }
  }

  const currentBrandConfig = $derived(BRAND_CONFIGS[brandFilter])
  const brandAccent = $derived(currentBrandConfig.accent)

  function hexToRgb(hex: string): string {
    const h = hex.replace('#', '')
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return `${r},${g},${b}`
  }
  const brandAccentRgb = $derived(hexToRgb(brandAccent))

  onMount(() => {
    initSystemListener()
    
    // Automatically show Takata recall modal on first load in this session
    if (!sessionStorage.getItem('takata_modal_shown')) {
      setTimeout(() => {
        showTakataModal = true
        sessionStorage.setItem('takata_modal_shown', 'true')
      }, 1500)
    }
  })

  $effect(() => {
    if (!brandStripEl) return
    brandStripVisible = false
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { brandStripVisible = true; obs.disconnect() } }, { threshold: 0.14 })
    obs.observe(brandStripEl)
    return () => obs.disconnect()
  })

  $effect(() => {
    if (!benefitsEl) return
    benefitsVisible = false
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { benefitsVisible = true; obs.disconnect() } }, { threshold: 0.10 })
    obs.observe(benefitsEl)
    return () => obs.disconnect()
  })

  $effect(() => {
    if (!serviceBannerEl) return
    serviceBannerVisible = false
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { serviceBannerVisible = true; obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(serviceBannerEl)
    return () => obs.disconnect()
  })

  $effect(() => {
    if (!footerEl) return
    footerVisible = false
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { footerVisible = true; obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(footerEl)
    return () => obs.disconnect()
  })

  const BRANDS_STRIP: { name: string; filter: BrandFilter; logo: string }[] = [
    { name: 'Jeep',        filter: 'Jeep',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F11828b62efcb84234673f32671bb041347d1808b.svg%3Fv=1?generation=1777350234486069&alt=media' },
    { name: 'Fiat',        filter: 'Fiat',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb60daf40e8df838d4b8b5068609584621fe2e8e7.svg%3Fv=1?generation=1777350234458223&alt=media' },
    { name: 'Dodge',       filter: 'Dodge',   logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9b5fe7b48812d11073f5aae5e8c95473bf89680f.svg%3Fv=1?generation=1777350234457792&alt=media' },
    { name: 'Peugeot',     filter: 'Peugeot', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1aa0b8e902c45f89e937310760192244925939e5.svg?generation=1777350234239082&alt=media' },
    { name: 'Ram',         filter: 'Ram',     logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0431177bb0013c7c3ed8b1fff99c0502dcd0f04c.svg%3Fv=1?generation=1777350234486854&alt=media' },
  ]


  const SERVICE_IMG = 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbd8508bc699e5f308774822640426d6c72892e95.jpg?generation=1777350235000404&alt=media'

  const benefits = [
    { icon: 'bolt',              title: 'Rapidez en el Servicio',  desc: 'Porque entendemos que el tiempo es de gran valor para nuestros clientes.',   color: '#334E8B' },
    { icon: 'verified_user',     title: 'Atención de Calidad',     desc: 'Nuestra prioridad es que nuestros clientes estén 100% satisfechos.',         color: '#2E6CCF' },
    { icon: 'workspace_premium', title: 'Profesionales Expertos',  desc: 'Servicios de alta calidad con expertos en el cuidado de tu vehículo.',       color: '#4C8EF0' },
  ]

  let heroComponent: any = $state()

  function scrollToHero()  { heroEl?.scrollIntoView({ behavior: 'smooth' }) }
  async function handleHomeClick() {
    brandFilter = 'Todas'
    typeFilter = 'Todos'
    currentView = 'Portal'
    jeepModelSlug = null
    ramModelSlug = null
    fiatModelSlug = null
    dodgeModelSlug = null
    peugeotModelSlug = null
    history.pushState({ brand: 'Todas' }, '', '/adistem2026/')
    await tick()
    scrollToHero()
  }
  function scrollToForm() {
    if (!currentBrandConfig.hideForm && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      scrollToHero()
      setTimeout(() => heroComponent?.highlight(), 400)
    } else {
      formEl?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => formEl?.highlight(), 400)
    }
  }
  function handleNavCotizarClick() {
    handleContactClick('cotizacion')
  }

  function handleMobileContactoClick() {
    currentView = 'Contacto'
    history.pushState({ view: 'Contacto' }, '', '/adistem2026/contacto/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    mobileMenuOpen = false
  }

  function scrollToMap()       { mapEl?.scrollIntoView({ behavior: 'smooth' }) }
  async function scrollToPromociones() {
    if (currentView !== 'Portal' || brandFilter !== 'Todas') {
      brandFilter = 'Todas'
      currentView = 'Portal'
      jeepModelSlug = null
      ramModelSlug = null
      fiatModelSlug = null
      dodgeModelSlug = null
      peugeotModelSlug = null
      history.pushState({ brand: 'Todas' }, '', '/adistem2026/')
      await tick()
    }
    promoEl?.scrollIntoView({ behavior: 'smooth' })
  }

  function syncBrandFromUrl() {
    const path = window.location.pathname
    const base = '/adistem2026/'
    
    if (path.toLowerCase().startsWith(base + 'seminuevos')) {
      currentView = 'Seminuevos'
      ramModelSlug = null
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'cotizacion')) {
      currentView = 'Cotizacion'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'cita-servicio')) {
      currentView = 'CitaServicio'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'prueba-manejo')) {
      currentView = 'PruebaManejo'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'ubicacion')) {
      currentView = 'Ubicacion'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'contacto')) {
      currentView = 'Contacto'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'postventa')) {
      currentView = 'Postventa'
      window.scrollTo(0, 0)
      return
    }

    if (path.toLowerCase().startsWith(base + 'fichas-tecnicas')) {
      postventaInitialTab = 'fichas'
      currentView = 'FichasTecnicas'
      window.scrollTo(0, 0)
      return
    }

    currentView = 'Portal'
    ramModelSlug = null
    if (path.startsWith(base)) {
      const routeParts = path.replace(base, '').split('/').filter(Boolean)
      const brandPath = routeParts[0] || ''
      const brands: BrandFilter[] = ['Jeep', 'Fiat', 'Dodge', 'Ram', 'Peugeot']
      const found = brands.find(b => b.toLowerCase() === brandPath.toLowerCase())
      if (found) {
        brandFilter = found
        if (found === 'Jeep') jeepModelSlug = routeParts[1] || null
        if (found === 'Ram') ramModelSlug = routeParts[1] || null
        if (found === 'Fiat') fiatModelSlug = routeParts[1] || null
        if (found === 'Dodge') dodgeModelSlug = routeParts[1] || null
        if (found === 'Peugeot') peugeotModelSlug = routeParts[1] || null
        return
      }
    }
    brandFilter = 'Todas'
  }

  $effect(() => {
    syncBrandFromUrl()
    window.addEventListener('popstate', syncBrandFromUrl)
    return () => window.removeEventListener('popstate', syncBrandFromUrl)
  })

  function handleBrandSelect(brand: BrandFilter) { 
    if (brandFilter === brand && currentView === 'Portal') return
    brandFilter = brand
    currentView = 'Portal'
    ramModelSlug = null
    jeepModelSlug = null
    fiatModelSlug = null
    dodgeModelSlug = null
    peugeotModelSlug = null

    // Update URL without reload
    const base = '/adistem2026/'
    const newPath = brand === 'Todas' ? base : `${base}${brand.toLowerCase()}/`
    history.pushState({ brand }, '', newPath)

    // Always scroll to top to show the brand landing
    scrollToHero()
  }

  function handleRamModelSelect(slug: string) {
    brandFilter = 'Ram'
    currentView = 'Portal'
    ramModelSlug = slug
    history.pushState({ brand: 'Ram', model: slug }, '', `/adistem2026/ram/${slug}/`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleJeepModelSelect(slug: string) {
    brandFilter = 'Jeep'
    currentView = 'Portal'
    jeepModelSlug = slug
    history.pushState({ brand: 'Jeep', model: slug }, '', `/adistem2026/jeep/${slug}/`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleFiatModelSelect(slug: string) {
    brandFilter = 'Fiat'
    currentView = 'Portal'
    fiatModelSlug = slug
    history.pushState({ brand: 'Fiat', model: slug }, '', `/adistem2026/fiat/${slug}/`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDodgeModelSelect(slug: string) {
    brandFilter = 'Dodge'
    currentView = 'Portal'
    dodgeModelSlug = slug
    history.pushState({ brand: 'Dodge', model: slug }, '', `/adistem2026/dodge/${slug}/`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handlePeugeotModelSelect(slug: string) {
    brandFilter = 'Peugeot'
    currentView = 'Portal'
    peugeotModelSlug = slug
    history.pushState({ brand: 'Peugeot', model: slug }, '', `/adistem2026/peugeot/${slug}/`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSeminuevosClick() {
    currentView = 'Seminuevos'
    ramModelSlug = null
    jeepModelSlug = null
    history.pushState({ view: 'Seminuevos' }, '', '/adistem2026/seminuevos/')
    window.scrollTo(0, 0)
  }

  function handleContactClick(tab: 'cotizacion' | 'cita' | 'prueba' = 'cotizacion') {
    if (tab === 'cotizacion') {
      currentView = 'Cotizacion'
      history.pushState({ view: 'Cotizacion' }, '', '/adistem2026/cotizacion/')
    } else if (tab === 'cita') {
      currentView = 'CitaServicio'
      history.pushState({ view: 'CitaServicio' }, '', '/adistem2026/cita-servicio/')
    } else {
      currentView = 'PruebaManejo'
      history.pushState({ view: 'PruebaManejo' }, '', '/adistem2026/prueba-manejo/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCotizarMobile() {
    window.dispatchEvent(new CustomEvent('switch-form-tab', { detail: { tab: 'cotizacion' } }))
    const formEl = document.getElementById('mobile-hero-form') ||
                   document.getElementById('brandhub-mobile-form') ||
                   document.getElementById('mobile-landing-form') ||
                   document.getElementById('hero-quote-form') ||
                   document.getElementById('brandhub-desktop-form') ||
                   document.querySelector('.quote-section')

    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      handleContactClick('cotizacion')
    }
  }

  function handlePruebaMobile() {
    window.dispatchEvent(new CustomEvent('switch-form-tab', { detail: { tab: 'prueba' } }))
    const formEl = document.getElementById('mobile-hero-form') ||
                   document.getElementById('brandhub-mobile-form') ||
                   document.getElementById('mobile-landing-form') ||
                   document.getElementById('hero-quote-form') ||
                   document.getElementById('brandhub-desktop-form') ||
                   document.querySelector('.quote-section')

    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      handleContactClick('prueba')
    }
  }

  let ubicacionContext = $state<'servicio' | 'ventas'>('ventas')

  function handlePostventaClick(tab: 'cita' | 'fichas' = 'cita') {
    if (tab === 'fichas') {
      handleFichasTecnicasClick()
      return
    }
    handleContactClick('cita')
  }

  function handleFichasTecnicasClick() {
    postventaInitialTab = 'fichas'
    currentView = 'FichasTecnicas'
    history.pushState({ view: 'FichasTecnicas' }, '', '/adistem2026/fichas-tecnicas/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    mobileMenuOpen = false
  }

  function handleUbicacionClick(ctx: 'servicio' | 'ventas' = 'ventas') {
    ubicacionContext = ctx
    currentView = 'Ubicacion'
    history.pushState({ view: 'Ubicacion' }, '', '/adistem2026/ubicacion/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleTypeSelect(type: VehicleType)   { typeFilter  = type;  scrollToForm() }

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )
  const T = $derived({
    primary:   $isDark ? 'white'                      : '#1a2040',
    secondary: $isDark ? 'rgba(255,255,255,0.58)'     : 'rgba(20,30,80,0.58)',
    muted:     $isDark ? 'rgba(255,255,255,0.35)'     : 'rgba(20,30,80,0.38)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(100,130,220,0.14)',
    logoF:     $isDark ? 'brightness(0) invert(1)'    : 'brightness(0)',
  })
  const bsBase = $derived({
    bg:         $isDark ? 'rgba(8,12,24,0.92)'      : 'rgba(248,251,255,0.96)',
    border:     $isDark ? 'rgba(255,255,255,0.07)'  : 'rgba(100,130,220,0.14)',
    cardBg:     $isDark ? 'rgba(255,255,255,0.05)'  : 'rgba(255,255,255,0.70)',
    cardBorder: $isDark ? 'rgba(255,255,255,0.08)'  : 'rgba(100,130,220,0.18)',
  })
  const serviceBg   = $derived($isDark ? 'rgba(5,8,20,1)' : 'linear-gradient(135deg,rgba(232,240,255,1) 0%,rgba(240,245,255,1) 100%)')
  const serviceGrad = $derived($isDark
    ? 'linear-gradient(to right,transparent 60%,rgba(5,8,20,1) 100%)'
    : 'linear-gradient(to right,transparent 60%,rgba(240,245,255,1) 100%)'
  )
  const benefitsBg  = $derived($isDark
    ? 'linear-gradient(135deg,rgba(18,28,60,0.96) 0%,rgba(10,15,35,0.98) 100%)'
    : 'linear-gradient(135deg,rgba(224,234,255,1) 0%,rgba(240,245,255,1) 100%)'
  )
  const footerBg    = $derived($isDark ? 'rgba(3,5,10,1)' : 'rgba(232,240,255,1)')
  const glassCard   = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(255,255,255,0.10);box-shadow:0 8px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.14),inset 0 -1px 0 rgba(0,0,0,0.20);'
    : 'background:rgba(255,255,255,0.68);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(100,140,220,0.20);box-shadow:0 8px 40px rgba(30,60,120,0.10),inset 0 1px 0 rgba(255,255,255,0.95),inset 0 -1px 0 rgba(100,130,220,0.08);'
  )
  const ratingCard  = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.10);border-radius:14px;'
    : 'background:rgba(255,255,255,0.68);backdrop-filter:blur(40px);border:1px solid rgba(100,140,220,0.18);border-radius:14px;'
  )
  const footLinks = [
    { title: 'Marcas', links: [
      { label:'Jeep®',   href:'#' },
      { label:'Fiat',    href:'#' },
      { label:'Dodge',   href:'#' },
      { label:'Ram',     href:'#' },
      { label:'Peugeot', href:'#' },
    ]},
    { title: 'Compra', links: [
      { label:'Cotización',       action: () => handleContactClick('cotizacion') },
      { label:'Prueba de manejo', action: () => handleContactClick('prueba') },
      { label:'Promociones',      action: scrollToPromociones },
      { label:'Seminuevos',       action: handleSeminuevosClick },
    ]},
    { title: 'Postventa', links: [
      { label:'Cita de Servicio', action: () => handlePostventaClick('cita') },
      { label:'Fichas Técnicas',   action: () => undefined },
      { label:'Recall Takata',   action: () => { showTakataModal = true } },
    ]},
    { title: 'Contacto', links: [
      { label:'Soporte',              action: () => {
        currentView = 'Contacto'
        history.pushState({ view: 'Contacto' }, '', '/adistem2026/contacto/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } },
      { label:'Horarios y ubicación', action: () => handleUbicacionClick('ventas') },
    ]},
  ]
</script>

<div class="min-h-screen transition-colors duration-300"
  style="background:{pageBg};font-family:'Inter',Roboto,sans-serif;">

  <!-- SVG filter defs -->
  <LiquidGlassFilters />

  <!-- Fixed sidebar -->
  <GlassSidebar
    activeBrand={brandFilter}
    onBrandSelect={handleBrandSelect}
    mobileOpen={mobileMenuOpen}
    onMobileClose={() => mobileMenuOpen = false}
    onMapClick={scrollToMap}
    onSeminuevosClick={handleSeminuevosClick}
    onPromocionesClick={scrollToPromociones}
    onCotizarClick={() => handleContactClick('cotizacion')}
    onPruebaManejoClick={() => handleContactClick('prueba')}
    onContactoClick={() => {
      currentView = 'Contacto'
      history.pushState({ view: 'Contacto' }, '', '/adistem2026/contacto/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      mobileMenuOpen = false
    }}
    onUbicacionClick={() => { handleUbicacionClick('ventas'); mobileMenuOpen = false }}
    onPostventaClick={handlePostventaClick}
  />

  <!-- Fixed top nav -->
  <GlassTopNav
    activeType={typeFilter}
    activeBrand={brandFilter}
    activeView={currentView}
    onTypeSelect={handleTypeSelect}
    onCotizarClick={handleNavCotizarClick}
    onMenuToggle={() => mobileMenuOpen = !mobileMenuOpen}
    onMapClick={scrollToMap}
    onHomeClick={handleHomeClick}
    onSeminuevosClick={handleSeminuevosClick}
    onPruebaManejoClick={() => handleContactClick('prueba')}
    onServicioClick={() => handleContactClick('cita')}
    onContactoClick={() => {
      currentView = 'Contacto'
      history.pushState({ view: 'Contacto' }, '', '/adistem2026/contacto/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }}
    onUbicacionClick={handleUbicacionClick}
    onPostventaClick={handlePostventaClick}
    onPromocionesClick={scrollToPromociones}
    onModelSelect={(brand, slug) => {
      if (brand === 'Jeep') handleJeepModelSelect(slug)
      else if (brand === 'Ram') handleRamModelSelect(slug)
      else if (brand === 'Fiat') handleFiatModelSelect(slug)
      else if (brand === 'Dodge') handleDodgeModelSelect(slug)
      else if (brand === 'Peugeot') handlePeugeotModelSelect(slug)
    }}
  />

  <!-- Mobile bottom nav -->
  <MobileBottomNav
    onCotizarClick={handleCotizarMobile}
    onPruebaManejoClick={handlePruebaMobile}
    onServicioClick={() => handleContactClick('cita')}
    onContactoClick={handleMobileContactoClick}
    mode={(currentView === 'Portal' && (jeepModelSlug || ramModelSlug || fiatModelSlug || dodgeModelSlug || peugeotModelSlug)) ? 'model-detail' : 'default'}
    accentColor={BRAND_CONFIGS[brandFilter]?.accent ?? '#334E8B'}
  />

  <!-- Main content -->
  <div class="ml-0 md:ml-20 pb-32 md:pb-0">

    {#if currentView === 'Portal' && brandFilter === 'Ram' && ramModelSlug}
      <RamPremiumLanding modelSlug={ramModelSlug} />
    {:else if currentView === 'Portal' && brandFilter === 'Ram'}
      <RamBrandHub onModelSelect={handleRamModelSelect} />
    {:else if currentView === 'Portal' && brandFilter === 'Jeep' && jeepModelSlug}
      <JeepPremiumLanding modelSlug={jeepModelSlug} />
    {:else if currentView === 'Portal' && brandFilter === 'Jeep'}
      <JeepBrandHub onModelSelect={handleJeepModelSelect} />
    {:else if currentView === 'Portal' && brandFilter === 'Fiat' && fiatModelSlug}
      <FiatPremiumLanding modelSlug={fiatModelSlug} />
    {:else if currentView === 'Portal' && brandFilter === 'Fiat'}
      <FiatBrandHub onModelSelect={handleFiatModelSelect} />
    {:else if currentView === 'Portal' && brandFilter === 'Dodge' && dodgeModelSlug}
      <DodgePremiumLanding modelSlug={dodgeModelSlug} />
    {:else if currentView === 'Portal' && brandFilter === 'Dodge'}
      <DodgeBrandHub onModelSelect={handleDodgeModelSelect} />
    {:else if currentView === 'Portal' && brandFilter === 'Peugeot' && peugeotModelSlug}
      <PeugeotPremiumLanding modelSlug={peugeotModelSlug} />
    {:else if currentView === 'Portal' && brandFilter === 'Peugeot'}
      <PeugeotBrandHub onModelSelect={handlePeugeotModelSelect} />
    {:else if currentView === 'Portal'}
      <!-- HERO -->
      <div bind:this={heroEl}>
      <HeroSection
        id="hero"
        bind:this={heroComponent}
        onMapClick={scrollToMap}
        onCotizarClick={scrollToForm}
        onPruebaManejoClick={() => handleContactClick('prueba')}
        brand={brandFilter}
        config={currentBrandConfig}
      />
    </div>

    <!-- BRAND STRIP -->
    <section bind:this={brandStripEl} class="py-8 md:py-10 px-4 md:px-8"
      style="background:{bsBase.bg};border-top:1px solid {bsBase.border};border-bottom:1px solid {bsBase.border};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);">
      <div class="max-w-7xl mx-auto">
        <p class="text-left md:text-center text-xs uppercase tracking-widest mb-5"
          style="color:{T.muted};{brandStripVisible ? 'animation:section-title-in 0.50s cubic-bezier(0.22,1,0.36,1) both' : 'opacity:0'}">
          Elige una marca — o usa la barra lateral
        </p>
        <div class="flex gap-3 md:flex-wrap md:justify-center overflow-x-auto scrollbar-none pb-2 pt-2 px-1"
          style="mask-image: linear-gradient(to right, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);">
          {#each BRANDS_STRIP as brand, i (brand.name)}
            <button
              onclick={() => handleBrandSelect(brand.filter)}
              class="group flex-shrink-0 flex flex-col items-center gap-2 px-6 py-4 md:px-8 md:py-6 rounded-2xl transition-all duration-250 cursor-pointer"
              style="background:{brandFilter === brand.filter ? `${brandAccent}22` : bsBase.cardBg};border:1px solid {brandFilter === brand.filter ? `${brandAccent}88` : bsBase.cardBorder};backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);box-shadow:{$isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.90)'};{brandStripVisible ? `animation:brand-card-in 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 85}ms both` : 'opacity:0;transform:translateY(20px) scale(0.94)'};will-change:transform,opacity;"
              onmouseenter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = $isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.92)'
                el.style.transform = 'translateY(-3px)'
              }}
              onmouseleave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = brandFilter === brand.filter
                  ? `${brandAccent}22`
                  : bsBase.cardBg
                el.style.transform = 'translateY(0)'
              }}>
              <img src={brand.logo} alt={brand.name} class="w-20 md:w-32 h-14 md:h-20 object-contain"
                style="filter:{T.logoF};opacity:{$isDark ? 0.68 : 0.62}" />
            </button>
          {/each}
        </div>
      </div>
    </section>

    <!-- PROMO BENTO -->
    <div bind:this={promoEl}>
      <PromoBentoGrid initialBrand={brandFilter} initialType={typeFilter} onRecallClick={() => showTakataModal = true} />
    </div>

    <!-- BRAND BENEFITS -->
    {#if brandFilter !== 'Todas'}
      <BrandBenefitsSection 
        brand={brandFilter} 
        accent={currentBrandConfig.accent} 
      />
    {/if}

    <!-- SERVICE BANNER -->
    <section bind:this={serviceBannerEl} class="py-10 md:py-14 px-4 md:px-8" style="background:{serviceBg}">
      <div class="max-w-7xl mx-auto flex flex-col gap-5">

        <!-- Section header -->
        <div style="{serviceBannerVisible ? 'animation:section-title-in 0.50s cubic-bezier(0.22,1,0.36,1) both' : 'opacity:0'}">
          <p class="text-xs uppercase tracking-widest mb-1" style="color:{T.muted}">Taller certificado</p>
          <h3 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:800;line-height:1.15;color:{T.primary};">
            Servicio de <span style="background:linear-gradient(135deg,#334E8B,#6B8ED4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Mantenimiento</span>
          </h3>
        </div>

        <!-- Promo banner -->
        <div class="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row items-center gap-4 px-5 py-4"
          style="background:linear-gradient(135deg,rgba(51,78,139,0.18) 0%,rgba(46,108,207,0.12) 100%);border:1px solid rgba(51,78,139,0.30);backdrop-filter:blur(16px);{serviceBannerVisible ? 'animation:slide-in-left 0.60s cubic-bezier(0.22,1,0.36,1) 0.10s both' : 'opacity:0;transform:translateX(-24px)'}">
          <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 0% 50%,rgba(51,78,139,0.18) 0%,transparent 60%)"></div>
          <div class="flex items-center gap-3 flex-1 z-10">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style="background:linear-gradient(135deg,#334E8B,#2E6CCF);box-shadow:0 4px 18px rgba(51,78,139,0.40);">
              <GoogleIcon name="local_offer" size={18} style="color:white" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style="background:rgba(76,142,240,0.18);color:#4C8EF0;border:1px solid rgba(76,142,240,0.28);">Promo del mes</span>
              </div>
              <p class="text-sm font-bold" style="color:{T.primary}">Afinación completa + revisión de 30 puntos</p>
              <p class="text-xs" style="color:{T.secondary}">Solo con cita previa · Válido hasta fin de mes</p>
            </div>
          </div>
          <button onclick={() => handleContactClick('cita')}
            class="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-xs font-bold btn-glow-border tracking-wide cursor-pointer z-10 whitespace-nowrap">
            Aprovechar oferta <GoogleIcon name="arrow_forward" size={14} />
          </button>
        </div>

        <!-- Service cards grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {#each [
            { icon: 'settings',        name: 'Afinación',          desc: 'Bujías, filtros y ajuste de motor',        price: 'Desde $1,200' },
            { icon: 'oil_barrel',      name: 'Cambio de Aceite',   desc: 'Aceite sintético + filtro original',       price: 'Desde $650'   },
            { icon: 'tire_repair',     name: 'Revisión de Frenos', desc: 'Pastillas, discos y líquido de frenos',    price: 'Desde $800'   },
            { icon: 'build_circle',    name: 'Mant. Preventivo',   desc: 'Revisión de 30 puntos certificada',        price: 'Desde $2,500' },
          ] as svc, i}
            <button onclick={() => handleContactClick('cita')}
              class="group flex flex-col gap-3 p-4 md:p-5 rounded-2xl text-left transition-all duration-250 cursor-pointer hover:-translate-y-0.5"
              style="{glassCard};{serviceBannerVisible ? `animation:benefit-card-in 0.55s cubic-bezier(0.22,1,0.36,1) ${0.20 + i * 0.08}s both` : 'opacity:0;transform:translateY(24px) scale(0.95)'}">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                style="background:rgba(51,78,139,0.14);border:1px solid rgba(51,78,139,0.22);">
                <GoogleIcon name={svc.icon} size={18} style="color:#4C8EF0" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold mb-0.5" style="color:{T.primary}">{svc.name}</p>
                <p class="text-[11px] leading-relaxed" style="color:{T.secondary}">{svc.desc}</p>
              </div>
              <p class="text-xs font-black" style="color:#4C8EF0">{svc.price}</p>
            </button>
          {/each}
        </div>

        <!-- Bottom CTA -->
        <div class="flex justify-center" style="{serviceBannerVisible ? 'animation:hero-fade-up 0.50s cubic-bezier(0.22,1,0.36,1) 0.55s both' : 'opacity:0'}">
          <button onclick={() => handleContactClick('cita')}
            class="flex items-center gap-2 px-7 py-3 text-sm font-bold btn-glow-border tracking-wide cursor-pointer">
            <GoogleIcon name="calendar_month" size={16} />
            Programa tu cita de servicio
          </button>
        </div>

      </div>
    </section>

    <!-- BENEFITS -->
    <section bind:this={benefitsEl} class="py-12 md:py-16 px-4 md:px-8 relative overflow-hidden"
      style="background:{benefitsBg};border-top:1px solid {T.divider};">
      <div class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse at 50% 50%,{$isDark ? `rgba(${brandAccentRgb},0.18)` : `rgba(${brandAccentRgb},0.07)`} 0%,transparent 70%)"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-8 md:mb-0 md:hidden"
          style="{benefitsVisible ? 'animation:section-title-in 0.55s cubic-bezier(0.22,1,0.36,1) both' : 'opacity:0'}">
          <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Por qué elegirnos</p>
          <h3 style="font-size:1.6rem;font-weight:800;line-height:1.2;color:{T.primary};">Descubre todos los beneficios para ti</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
          <div class="hidden md:block"
            style="{benefitsVisible ? 'animation:section-title-in 0.55s cubic-bezier(0.22,1,0.36,1) both' : 'opacity:0'}">
            <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Por qué elegirnos</p>
            <h3 style="font-size:1.8rem;font-weight:800;line-height:1.2;color:{T.primary};">Descubre todos los beneficios para ti</h3>
          </div>
          {#each benefits as b, i (b.title)}
            <div class="p-5 md:p-6 rounded-2xl transition-all duration-300 cursor-default"
              style="{glassCard};{benefitsVisible ? `animation:benefit-card-in 0.60s cubic-bezier(0.22,1,0.36,1) ${80 + i * 120}ms both` : 'opacity:0;transform:translateY(32px) scale(0.93)'};will-change:transform,opacity;">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg"
                style="background:{b.color}22;border:1px solid {b.color}44;{benefitsVisible ? `animation:icon-float 3.6s ease-in-out ${i * 1.1}s infinite` : ''}">
                <GoogleIcon name={b.icon} size={23} style="color:{b.color}" />
              </div>
              <p class="font-semibold mb-1.5 text-sm" style="color:{T.primary}">{b.title}</p>
              <p class="text-xs leading-relaxed" style="color:{T.secondary}">{b.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <div class={!currentBrandConfig.hideForm ? 'lg:hidden' : ''}>
      <LeadFormSection id="contacto" bind:this={formEl} accent={currentBrandConfig.accent} />
    </div>

    <!-- LOCATION MAP -->
    <section bind:this={mapEl} class="py-8 md:py-12 px-4 md:px-8 relative overflow-hidden"
      style="background:{benefitsBg};border-top:1px solid {T.divider};">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-6 md:mb-8 text-left md:text-center"
          style="{footerVisible ? 'animation:section-title-in 0.55s cubic-bezier(0.22,1,0.36,1) both' : 'opacity:0'}">
          <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Visítanos</p>
          <h3 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:800;line-height:1.2;color:{T.primary};">Nuestra Ubicación</h3>
        </div>
        <div class="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500" 
          style="{glassCard}; padding: 6px; {footerVisible ? 'animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'opacity:0;transform:translateY(30px)'}">
          <div class="relative w-full h-[400px] md:h-[500px] rounded-[14px] md:rounded-[22px] overflow-hidden">

            <!-- Mapa con filtro neutro cercano al modo oscuro de Google Maps. -->
            <iframe
              src="https://maps.google.com/maps?q=BLVD%20SAN%20LUIS%201158,%20San%20Luis%20Potos%C3%AD,%20San%20Luis%20Potos%C3%AD&t=&z=16&ie=UTF8&iwloc=&output=embed"
              class="w-full h-full border-0 block"
              style="filter:{$isDark
                ? 'invert(92%) hue-rotate(180deg) saturate(0.72) brightness(0.82) contrast(0.95)'
                : 'none'};"
              allowfullscreen={false}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación VAPSA">
            </iframe>

            <!-- Overlay transparente para conservar la paleta nativa del mapa. -->
            <div class="absolute inset-0 pointer-events-none"
              style="background:transparent;
              mix-blend-mode:normal;
              border-radius:inherit;">
            </div>

            <!-- Viñeta de borde con glow de marca -->
            <div class="absolute inset-0 pointer-events-none" style="
              box-shadow:inset 0 0 70px {$isDark ? 'rgba(5,8,20,0.70)' : 'rgba(51,78,139,0.14)'},
                         inset 0 0 20px {$isDark ? 'rgba(51,78,139,0.25)' : 'rgba(107,142,212,0.12)'};
              border-radius:inherit;">
            </div>

            <!-- Pin animado de la ubicación (decorativo) -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none" style="z-index:2;">
              <div class="relative flex flex-col items-center">
                <div class="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                  style="background:linear-gradient(135deg,#334E8B,#2E6CCF);box-shadow:0 0 0 4px rgba(51,78,139,0.35),0 4px 16px rgba(51,78,139,0.60);animation:badge-glow 2.2s ease-in-out infinite;">
                </div>
                <div class="w-0.5 h-4 mt-0.5" style="background:linear-gradient(to bottom,rgba(51,78,139,0.80),transparent);"></div>
              </div>
            </div>

            <!-- Floating Address & 'Llévame' Badge -->
            <div class="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-80 rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
              style="background:{$isDark ? 'rgba(5,8,22,0.88)' : 'rgba(248,251,255,0.94)'};
                border:1px solid {$isDark ? 'rgba(51,78,139,0.40)' : 'rgba(51,78,139,0.18)'};
                backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);
                box-shadow:{$isDark ? '0 8px 32px rgba(0,0,0,0.60),inset 0 1px 0 rgba(255,255,255,0.08)' : '0 8px 32px rgba(51,78,139,0.14),inset 0 1px 0 rgba(255,255,255,0.95)'};
                z-index:3;">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                  style="background:linear-gradient(135deg,rgba(51,78,139,0.30),rgba(46,108,207,0.20));border:1px solid rgba(51,78,139,0.35);">
                  <GoogleIcon name="location_on" size={16} style="color:#4C8EF0" />
                </div>
                <div>
                  <p class="text-sm font-bold mb-0.5" style="color:{T.primary}">VAPSA San Luis Potosí</p>
                  <p class="text-xs leading-relaxed" style="color:{T.secondary}">
                    BLVD SAN LUIS 1158,<br/>San Luis Potosí, S.L.P.
                  </p>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=BLVD+SAN+LUIS+1158,+San+Luis+Potosí,+San+Luis+Potosí" target="_blank" rel="noopener noreferrer"
                class="w-full py-3 text-xs font-bold tracking-wide flex items-center justify-center gap-2 btn-glow-border">
                <GoogleIcon name="location_on" size={16} />
                Llévame ahí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {:else if currentView === 'Postventa'}
      <PostventaView initialTab={postventaInitialTab} />
    {:else if currentView === 'FichasTecnicas'}
      <PostventaView initialTab="fichas" hideTabs={true} />
    {:else if currentView === 'Seminuevos'}
      <SeminuevosView />
    {:else if currentView === 'Contacto'}
      <ContactView initialTab={initialContactTab} />
    {:else if currentView === 'Cotizacion'}
      <CotizacionLanding />
    {:else if currentView === 'CitaServicio'}
      <CitaServicioLanding />
    {:else if currentView === 'PruebaManejo'}
      <PruebaManejoLanding />
    {:else if currentView === 'Ubicacion'}
      <UbicacionLanding context={ubicacionContext} />
    {/if}

    <!-- FOOTER -->
    <footer bind:this={footerEl} class="py-10 md:py-12 px-4 md:px-8" style="background:{footerBg};border-top:1px solid {T.divider};">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-10">
          <div class="col-span-2 md:col-span-1 justify-self-start text-left"
            style="margin-left:0;{footerVisible ? 'animation:hero-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both' : 'opacity:0;transform:translateY(20px)'}">
            <button type="button" onclick={handleHomeClick}
              class="mb-4 cursor-pointer bg-transparent border-0 p-0 transition-opacity hover:opacity-80 block"
              style="margin-left:0;display:block;width:max-content;"
              aria-label="Ir al inicio">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
                alt="VAPSA" class="h-9 w-auto" style="filter:{T.logoF}" />
            </button>
            <p class="text-xs leading-relaxed mb-3" style="color:{T.muted}">
              Concesionaria autorizada de Jeep®, FIAT, Dodge, Ram y Peugeot en Rioverde, SLP.
            </p>
            <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.26)' : 'rgba(20,30,80,0.30)'}">
              BLVD SAN LUIS 1158,<br />San Luis Potosí, San Luis Potosí
            </p>
          </div>
          {#each footLinks as col, i (col.title)}
            <div style="{footerVisible ? `animation:hero-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * 90}ms both` : 'opacity:0;transform:translateY(20px)'}">
              <p class="text-xs uppercase tracking-widest mb-3 font-semibold" style="color:{T.secondary}">{col.title}</p>
              <ul class="space-y-2">
                {#each col.links as link (link.label)}
                  <li>
                    {#if 'action' in link}
                      <button type="button" onclick={link.action}
                        class="text-xs transition-colors hover:text-blue-500 cursor-pointer text-left"
                        style="color:{T.muted}">
                        {link.label}
                      </button>
                    {:else}
                      <a href={link.href} class="text-xs transition-colors hover:text-blue-500" style="color:{T.muted}">{link.label}</a>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>

        <!-- Rating strip -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 px-5 mb-6"
          style="{ratingCard};{footerVisible ? 'animation:hero-fade-up 0.50s cubic-bezier(0.22,1,0.36,1) 360ms both' : 'opacity:0;transform:translateY(20px)'}">
          <div class="flex items-center gap-3">
            <div class="flex">
              {#each [1,2,3,4] as s (s)}<GoogleIcon name="star" size={15} class="text-yellow-400" fill={1} />{/each}
              <GoogleIcon name="star" size={15} class="text-yellow-300/40" fill={1} />
            </div>
            <span class="text-xs" style="color:{T.secondary}">4.2 estrellas · 53 reseñas en Google</span>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=BLVD+SAN+LUIS+1158,+San+Luis+Potosí,+San+Luis+Potosí" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-xs transition-all hover:scale-[1.02]" style="color:{T.secondary}">
            <GoogleIcon name="location_on" size={15} /> Ver Ubicación en Mapa <GoogleIcon name="chevron_right" size={15} />
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
          style="border-top:1px solid {T.divider};{footerVisible ? 'animation:hero-fade-up 0.50s cubic-bezier(0.22,1,0.36,1) 440ms both' : 'opacity:0'}">
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.22)' : 'rgba(20,30,80,0.28)'}">
            © {new Date().getFullYear()} VAPSA Rioverde. Todos los derechos reservados.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <button type="button" class="text-xs transition-colors hover:text-blue-500 cursor-pointer"
              style="color:{$isDark ? 'rgba(255,255,255,0.28)' : 'rgba(20,30,80,0.34)'}">
              Términos y condiciones
            </button>
            <span class="text-xs" aria-hidden="true"
              style="color:{$isDark ? 'rgba(255,255,255,0.16)' : 'rgba(20,30,80,0.22)'}">
              |
            </span>
            <button type="button" class="text-xs transition-colors hover:text-blue-500 cursor-pointer"
              style="color:{$isDark ? 'rgba(255,255,255,0.28)' : 'rgba(20,30,80,0.34)'}">
              Aviso de Privacidad
            </button>
            <span class="text-xs" aria-hidden="true"
              style="color:{$isDark ? 'rgba(255,255,255,0.16)' : 'rgba(20,30,80,0.22)'}">
              |
            </span>
            <button type="button" onclick={() => showTakataModal = true}
              class="text-xs transition-colors hover:text-red-500 cursor-pointer font-bold"
              style="color: #ef4444;">
              Recall Takata
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <!-- FloatingContact desktop only -->
  <div class="hidden md:block">
    <FloatingContact />
  </div>

  {#if showTakataModal}
    <RecallTakataModal
      onClose={() => showTakataModal = false}
      onScheduleService={() => {
        showTakataModal = false
        handlePostventaClick('cita')
      }}
    />
  {/if}
</div>
