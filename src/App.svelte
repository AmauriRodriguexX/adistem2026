<script lang="ts">
  import { onMount } from 'svelte'
  import { isDark, initSystemListener } from '$lib/stores/theme'
  import LiquidGlassFilters from '$lib/components/LiquidGlassFilters.svelte'
  import GlassSidebar       from '$lib/components/GlassSidebar.svelte'
  import GlassTopNav        from '$lib/components/GlassTopNav.svelte'
  import HeroSection        from '$lib/components/HeroSection.svelte'
  import PromoBentoGrid     from '$lib/components/PromoBentoGrid.svelte'
  import FloatingContact    from '$lib/components/FloatingContact.svelte'
  import MobileBottomNav    from '$lib/components/MobileBottomNav.svelte'
  import type { BrandFilter, VehicleType } from '$lib/types'

  let heroEl:  HTMLDivElement | null = $state(null)
  let promoEl: HTMLDivElement | null = $state(null)

  let brandFilter: BrandFilter = $state('Todas')
  let typeFilter:  VehicleType = $state('Todos')
  let mobileMenuOpen = $state(false)

  onMount(() => {
    const cleanup = initSystemListener()
    return cleanup
  })

  const BRANDS_STRIP = [
    { name: 'Jeep',        href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F11828b62efcb84234673f32671bb041347d1808b.svg%3Fv=1?generation=1777350234486069&alt=media' },
    { name: 'Fiat',        href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb60daf40e8df838d4b8b5068609584621fe2e8e7.svg%3Fv=1?generation=1777350234458223&alt=media' },
    { name: 'Dodge',       href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9b5fe7b48812d11073f5aae5e8c95473bf89680f.svg%3Fv=1?generation=1777350234457792&alt=media' },
    { name: 'Peugeot',     href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F66d0da430295ddebb88e02567eae03c7073ad003.svg%3Fv=1?generation=1777350234506470&alt=media' },
    { name: 'Peugeot Pro', href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1d3a40b9a3f261283ca757b06246cd3d7e3ebe2d.svg%3Fv=1?generation=1777350234485236&alt=media' },
    { name: 'Ram',         href: '#', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0431177bb0013c7c3ed8b1fff99c0502dcd0f04c.svg%3Fv=1?generation=1777350234486854&alt=media' },
  ]


  const SERVICE_IMG = 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbd8508bc699e5f308774822640426d6c72892e95.jpg?generation=1777350235000404&alt=media'

  const benefits = [
    { emoji: '⚡', title: 'Rapidez en el Servicio',  desc: 'Porque entendemos que el tiempo es de gran valor para nuestros clientes.',   color: '#334E8B' },
    { emoji: '🛡',  title: 'Atención de Calidad',     desc: 'Nuestra prioridad es que nuestros clientes estén 100% satisfechos.',         color: '#2E6CCF' },
    { emoji: '⭐',  title: 'Profesionales Expertos',  desc: 'Servicios de alta calidad con expertos en el cuidado de tu vehículo.',       color: '#4C8EF0' },
  ]

  function scrollToHero()  { heroEl?.scrollIntoView({ behavior: 'smooth' }) }
  function scrollToPromo() { setTimeout(() => promoEl?.scrollIntoView({ behavior: 'smooth' }), 30) }

  function handleBrandSelect(brand: BrandFilter) { brandFilter = brand; scrollToPromo() }
  function handleTypeSelect(type: VehicleType)   { typeFilter  = type;  scrollToPromo() }

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
  const primaryBtn  = 'background:linear-gradient(135deg,#334E8B,#2E6CCF);border:1px solid rgba(255,255,255,0.30);box-shadow:0 6px 24px rgba(51,78,139,0.55),inset 0 1px 0 rgba(255,255,255,0.35);'
  const ratingCard  = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.10);border-radius:14px;'
    : 'background:rgba(255,255,255,0.68);backdrop-filter:blur(40px);border:1px solid rgba(100,140,220,0.18);border-radius:14px;'
  )
  const footLinks = [
    { title: 'Marcas', links: [
      { label:'Jeep',    href:'#' },
      { label:'Fiat',    href:'#' },
      { label:'Dodge',   href:'#' },
      { label:'Ram',     href:'#' },
      { label:'Peugeot', href:'#' },
    ]},
    { title: 'Servicios', links: [
      { label:'Cotización',       href:'#' },
      { label:'Cita de Servicio', href:'#' },
      { label:'Test Drive',       href:'#' },
      { label:'Contáctanos',      href:'#' },
    ]},
    { title: 'Empresa', links: [
      { label:'Aviso de Privacidad', href:'#' },
      { label:'Ubicación',           href:'https://maps.google.com/' },
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
  />

  <!-- Fixed top nav -->
  <GlassTopNav
    onCotizarClick={scrollToHero}
    onTypeSelect={handleTypeSelect}
    activeType={typeFilter}
    onMenuToggle={() => mobileMenuOpen = true}
  />

  <!-- Mobile bottom nav -->
  <MobileBottomNav />

  <!-- Main content -->
  <div class="ml-0 md:ml-20 pb-32 md:pb-0">

    <!-- HERO -->
    <div bind:this={heroEl}>
      <HeroSection id="hero" />
    </div>

    <!-- BRAND STRIP -->
    <section class="py-8 md:py-10 px-4 md:px-8"
      style="background:{bsBase.bg};border-top:1px solid {bsBase.border};border-bottom:1px solid {bsBase.border};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);">
      <div class="max-w-7xl mx-auto">
        <p class="text-center text-xs uppercase tracking-widest mb-5" style="color:{T.muted}">
          Elige una marca — o usa la barra lateral
        </p>
        <div class="flex gap-3 md:flex-wrap md:justify-center overflow-x-auto scrollbar-none pb-1">
          {#each BRANDS_STRIP as brand (brand.name)}
            <a href={brand.href}
              class="group flex-shrink-0 flex flex-col items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-2xl transition-all duration-250"
              style="background:{bsBase.cardBg};border:1px solid {bsBase.cardBorder};backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);box-shadow:{$isDark ? 'inset 0 1px 0 rgba(255,255,255,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.90)'};"
              onmouseenter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = $isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.92)'
                el.style.transform = 'translateY(-3px)'
              }}
              onmouseleave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = bsBase.cardBg
                el.style.transform = 'translateY(0)'
              }}>
              <img src={brand.logo} alt={brand.name} class="w-16 md:w-24 h-10 md:h-14 object-contain"
                style="filter:{T.logoF};opacity:{$isDark ? 0.68 : 0.62}" />
            </a>
          {/each}
        </div>
      </div>
    </section>

    <!-- PROMO BENTO -->
    <div bind:this={promoEl}>
      <PromoBentoGrid initialBrand={brandFilter} initialType={typeFilter} />
    </div>

    <!-- SERVICE BANNER -->
    <section class="py-8 md:py-12 px-4 md:px-8" style="background:{serviceBg}">
      <div class="max-w-7xl mx-auto">
        <div class="relative overflow-hidden rounded-2xl md:rounded-3xl flex flex-col md:flex-row" style={glassCard}>
          <div class="md:w-1/2 relative overflow-hidden" style="min-height:220px;">
            <img src={SERVICE_IMG} alt="Servicio de Mantenimiento" class="w-full h-full object-cover absolute inset-0" />
            <div class="absolute inset-0" style="background:{serviceGrad}"></div>
          </div>
          <div class="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <span class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Servicio</span>
            <h3 class="mb-3" style="font-size:clamp(1.5rem,4vw,2rem);font-weight:800;line-height:1.2;color:{T.primary};">
              Servicio de<br />
              <span style="background:linear-gradient(135deg,#334E8B,#6B8ED4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Mantenimiento</span>
            </h3>
            <p class="mb-5 leading-relaxed text-sm" style="color:{T.secondary}">
              Agenda tu cita de servicio en línea y asegura el mejor cuidado para tu vehículo.
            </p>
            <a href="#"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-medium w-fit transition-all duration-300 hover:scale-105 active:scale-95"
              style={primaryBtn}>Programa tu cita</a>
          </div>
          <div class="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style="background:radial-gradient(circle,rgba(51,78,139,0.22) 0%,transparent 70%)"></div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-12 md:py-16 px-4 md:px-8 relative overflow-hidden"
      style="background:{benefitsBg};border-top:1px solid {T.divider};">
      <div class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse at 50% 50%,{$isDark ? 'rgba(51,78,139,0.18)' : 'rgba(51,78,139,0.07)'} 0%,transparent 70%)"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-8 md:mb-0 md:hidden">
          <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Por qué elegirnos</p>
          <h3 style="font-size:1.6rem;font-weight:800;line-height:1.2;color:{T.primary};">Descubre todos los beneficios para ti</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
          <div class="hidden md:block">
            <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Por qué elegirnos</p>
            <h3 style="font-size:1.8rem;font-weight:800;line-height:1.2;color:{T.primary};">Descubre todos los beneficios para ti</h3>
          </div>
          {#each benefits as b (b.title)}
            <div class="p-5 md:p-6 rounded-2xl transition-all duration-300 cursor-default" style={glassCard}>
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-lg"
                style="background:{b.color}22;border:1px solid {b.color}44;">{b.emoji}</div>
              <p class="font-semibold mb-1.5 text-sm" style="color:{T.primary}">{b.title}</p>
              <p class="text-xs leading-relaxed" style="color:{T.secondary}">{b.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-10 md:py-12 px-4 md:px-8" style="background:{footerBg};border-top:1px solid {T.divider};">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          <div class="col-span-2 md:col-span-1">
            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
              alt="VAPSA" class="h-9 w-auto mb-4" style="filter:{T.logoF}" />
            <p class="text-xs leading-relaxed mb-3" style="color:{T.muted}">
              Concesionaria autorizada de Jeep, FIAT, Dodge, Ram y Peugeot en Rioverde, SLP.
            </p>
            <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.26)' : 'rgba(20,30,80,0.30)'}">
              Blvd. Carlos J. Barrios S/N,<br />Centro, 79610 Rioverde, S.L.P.
            </p>
          </div>
          {#each footLinks as col (col.title)}
            <div>
              <p class="text-xs uppercase tracking-widest mb-3 font-semibold" style="color:{T.secondary}">{col.title}</p>
              <ul class="space-y-2">
                {#each col.links as link (link.label)}
                  <li>
                    <a href={link.href} class="text-xs transition-colors hover:text-blue-500" style="color:{T.muted}">{link.label}</a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>

        <!-- Rating strip -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 px-5 mb-6" style={ratingCard}>
          <div class="flex items-center gap-3">
            <div class="flex">
              {#each [1,2,3,4] as s (s)}<span class="text-yellow-400 text-xs">★</span>{/each}
              <span class="text-yellow-300/40 text-xs">★</span>
            </div>
            <span class="text-xs" style="color:{T.secondary}">4.2 estrellas · 53 reseñas en Google</span>
          </div>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-xs transition-all hover:scale-[1.02]" style="color:{T.secondary}">
            📍 Vapsa Rioverde ›
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
          style="border-top:1px solid {T.divider};">
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.22)' : 'rgba(20,30,80,0.28)'}">
            © {new Date().getFullYear()} VAPSA Rioverde. Todos los derechos reservados.
          </p>
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.18)' : 'rgba(20,30,80,0.24)'}">
            Jeep · Fiat · Dodge · Ram · Peugeot
          </p>
        </div>
      </div>
    </footer>
  </div>

  <!-- FloatingContact desktop only -->
  <div class="hidden md:block">
    <FloatingContact />
  </div>
</div>
