<script lang="ts">
  import { onMount } from 'svelte'
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'
  import type { VehicleType, BrandFilter } from '$lib/types'

  interface Props {
    onCotizarClick?:         () => void
    onTypeSelect?:           (type: VehicleType) => void
    activeType?:             VehicleType
    activeBrand?:            BrandFilter
    onMenuToggle?:           () => void
    onMapClick?:             () => void
    onHomeClick?:            () => void
    onSeminuevosClick?:      () => void
    onPruebaManejoClick?:    () => void
    onServicioClick?:        () => void
    onContactoClick?:        () => void
    onUbicacionClick?:       (ctx?: 'servicio' | 'ventas') => void
    onPostventaClick?:       (tab?: 'cita' | 'fichas') => void
    onPromocionesClick?:     () => void
    activeView?:             string
    onModelSelect?:          (brand: BrandFilter, slug: string) => void
  }

  let {
    onCotizarClick,
    onTypeSelect,
    activeType = 'Todos',
    activeBrand = 'Todas',
    onMenuToggle,
    onMapClick,
    onHomeClick,
    onSeminuevosClick,
    onPruebaManejoClick,
    onServicioClick,
    onContactoClick,
    onUbicacionClick,
    onPostventaClick,
    onPromocionesClick,
    activeView,
    onModelSelect,
  }: Props = $props()

  const VEHICLE_TYPES = [
    { name: 'Todos',      label: 'Todas',             desc: 'Sin filtro de carrocería' },
    { name: 'Sedán',      label: 'Sedán',             desc: 'Confort ejecutivo y manejo suave' },
    { name: 'SUV',        label: 'SUV',               desc: 'Espacio familiar y presencia' },
    { name: 'Pick-ups',   label: 'Pick-ups',          desc: 'Capacidad para trabajo y aventura' },
    { name: 'Van',        label: 'Van',               desc: 'Volumen, negocio y movilidad' },
  ] as const

  const BRAND_ALLOWED_TYPES: Record<BrandFilter, VehicleType[]> = {
    Todas:   ['SUV', 'Sedán', 'Pick-ups', 'Van'],
    Ram:     ['Pick-ups'],
    Fiat:    ['SUV'],
    Dodge:   ['SUV', 'Sedán'],
    Jeep:    ['SUV', 'Pick-ups'],
    Peugeot: ['SUV', 'Van'],
  }

  const BRAND_TABS: { name: BrandFilter; label: string; accent: string; hover: string }[] = [
    { name: 'Todas',   label: 'Todas',             accent: '#334E8B', hover: '#2E6CCF' },
    { name: 'Ram',     label: 'RAM',               accent: '#880D00', hover: '#BA0000' },
    { name: 'Peugeot', label: 'Peugeot',           accent: '#0074E8', hover: '#0057AD' },
    { name: 'Fiat',    label: 'Fiat',              accent: '#FF1530', hover: '#c70606' },
    { name: 'Jeep',    label: 'Jeep',              accent: '#424D07', hover: '#303804' },
    { name: 'Dodge',   label: 'Dodge',             accent: '#D50000', hover: '#BA0000' },
  ]

  const MENU_VEHICLES: {
    id: number; brand: Exclude<BrandFilter, 'Todas'>; type: VehicleType; model: string
    year: string; version: string; fuel: string; price: string; img: string; accent: string
  }[] = [
    { id:1,  brand:'Jeep',    type:'SUV',        model:'Wrangler',      year:'2026', version:'Willys Unlimited', fuel:'Gasolina', price:'Desde $1,098,900', img:'/adistem2026/jeep/wrangler-2026.jpg', accent:'#424D07' },
    { id:2,  brand:'Jeep',    type:'SUV',        model:'Compass',       year:'2026', version:'Limited Premium',  fuel:'Gasolina', price:'Desde $541,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0d3d7a1dc7e07f0e64c4fb84601cc8fa871c5acc.jpg?generation=1777350234540448&alt=media', accent:'#424D07' },
    { id:3,  brand:'Jeep',    type:'SUV',        model:'Commander',     year:'2026', version:'Overland FWD',     fuel:'Gasolina', price:'Desde $766,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0c31e45701627ca72a88b646087445172fc4a302.jpg?generation=1777350234492066&alt=media', accent:'#424D07' },
    { id:4,  brand:'Jeep',    type:'SUV',        model:'Renegade',      year:'2026', version:'Latitude',         fuel:'Gasolina', price:'Desde $456,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F03eb70622ac5b618a05ca4b50608ada9e5f36dff.jpg?generation=1777350234483821&alt=media', accent:'#424D07' },
    { id:5,  brand:'Fiat',    type:'SUV',        model:'Pulse',         year:'2026', version:'Drive',            fuel:'Gasolina', price:'Desde $368,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F12af6dc13f44f29033d673c803a50f637af22da0.jpg?generation=1777350234700225&alt=media', accent:'#FF1530' },
    { id:6,  brand:'Fiat',    type:'Deportivos', model:'Pulse Abarth',  year:'2026', version:'Abarth',           fuel:'Gasolina', price:'Desde $529,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcab9193a2663f242fe2c565e771d2cb7acb3bdfd.jpg?generation=1777350234690980&alt=media', accent:'#FF1530' },
    { id:7,  brand:'Fiat',    type:'SUV',        model:'Fastback',      year:'2026', version:'Limited',          fuel:'Gasolina', price:'Desde $482,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F73305e43e64c51813013640443da7b7c6dbe392e.jpg?generation=1777350234711531&alt=media', accent:'#FF1530' },
    { id:8,  brand:'Fiat',    type:'Hatchback',  model:'Argo',          year:'2026', version:'Drive',            fuel:'Gasolina', price:'Desde $289,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F35bd343876d4e41f21a86499747f1af99d5fe2b2.jpg?generation=1777350234727796&alt=media', accent:'#FF1530' },
    { id:9,  brand:'Dodge',   type:'SUV',        model:'Durango',       year:'2026', version:'R/T Plus',         fuel:'Gasolina', price:'Desde $2,174,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1d6f3f42a55407817e0572a9323b9aa10c891633.jpg?generation=1777350234722595&alt=media', accent:'#D50000' },
    { id:10, brand:'Dodge',   type:'Sedán',      model:'Attitude',      year:'2026', version:'SXT',              fuel:'Gasolina', price:'Desde $379,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffd24ea9b590e1057b2b5aece02f0924645f557d3.jpg?generation=1777350234728971&alt=media', accent:'#D50000' },
    { id:11, brand:'Dodge',   type:'SUV',        model:'Journey',       year:'2026', version:'GT',               fuel:'Gasolina', price:'Desde $603,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc8f39b8a62ba049430811aa128ea21a793615787.jpg?generation=1777350234748118&alt=media', accent:'#D50000' },
    { id:12, brand:'Peugeot', type:'SUV',        model:'Nueva 2008',    year:'2026', version:'GT',               fuel:'Gasolina', price:'Desde $448,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7ac848efe89adde5660e4d2956b4983e1775ce00.jpg?generation=1777350234794617&alt=media', accent:'#0074E8' },
    { id:13, brand:'Peugeot', type:'SUV',        model:'Nueva 5008',    year:'2026', version:'GT',               fuel:'Gasolina', price:'Desde $779,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa324072dc54a25de50940520db820b447f976fdd.jpg?generation=1777350234728825&alt=media', accent:'#0074E8' },
    { id:14, brand:'Peugeot', type:'SUV',        model:'Nueva 3008',    year:'2026', version:'Allure Pack',      fuel:'Gasolina', price:'Desde $639,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F97992cfc1a6ba95676e9baa2cff5b4fe94dd63c7.jpg?generation=1777350234796103&alt=media', accent:'#0074E8' },
    { id:15, brand:'Peugeot', type:'Van',        model:'Nueva Partner', year:'2026', version:'Active',           fuel:'Gasolina', price:'Desde $439,900', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb1d61b52adc2aa72f9170a07361f38035b5794a8.jpg?generation=1777350234922828&alt=media', accent:'#0074E8' },
    { id:16, brand:'Ram',     type:'Pick-ups',   model:'1500',          year:'2026', version:'Laramie 4x4',      fuel:'Híbridos', price:'Desde $1,290,000', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F366059fdfc8601cb267c2dfe66bce5eff26e9802.jpg?generation=1777350234982606&alt=media', accent:'#880D00' },
    { id:17, brand:'Ram',     type:'Pick-ups',   model:'1200',          year:'2026', version:'Limited',          fuel:'Gasolina', price:'Desde $408,400', img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd77a3a9cf0b124b56b0ca97a272a05d66cdb4f9b.jpg?generation=1777350234972552&alt=media', accent:'#880D00' },
  ]

  let megaBrand = $state<BrandFilter>('Todas')
  let megaType  = $state<VehicleType>('Todos')
  let megaOpen  = $state(false)

  // ── Micro-dropdowns ──
  let compraOpen     = $state(false)
  let postventaOpen  = $state(false)
  let contactoOpen   = $state(false)

  function closeDropdowns()  { compraOpen = false; postventaOpen = false; contactoOpen = false }
  function toggleCompra()    { compraOpen = !compraOpen; postventaOpen = false; contactoOpen = false }
  function togglePostventa() { postventaOpen = !postventaOpen; compraOpen = false; contactoOpen = false }
  function toggleContacto()  { contactoOpen = !contactoOpen; compraOpen = false; postventaOpen = false }

  $effect(() => {
    megaBrand = activeBrand
  })

  $effect(() => {
    megaType = activeType
  })

  $effect(() => {
    if (megaType !== 'Todos' && !BRAND_ALLOWED_TYPES[megaBrand].includes(megaType)) {
      megaType = 'Todos'
    }
  })

  const megaAccent = $derived(BRAND_TABS.find(b => b.name === megaBrand)?.accent ?? '#334E8B')
  const visibleMegaTypes = $derived(
    VEHICLE_TYPES.filter(type => type.name === 'Todos' || BRAND_ALLOWED_TYPES[megaBrand].includes(type.name as VehicleType))
  )
  const megaVehicles = $derived(MENU_VEHICLES.filter(vehicle => {
    const brandOk = megaBrand === 'Todas' || vehicle.brand === megaBrand
    const typeOk = megaType === 'Todos' || vehicle.type === megaType
    const allowedTypeOk = BRAND_ALLOWED_TYPES[megaBrand].includes(vehicle.type)
    return brandOk && typeOk && allowedTypeOk
  }))

  function selectMegaBrand(brand: BrandFilter) {
    megaBrand = brand
    megaType = 'Todos'
  }

  // ── Active nav indicators ──
  const isHomeActive       = $derived(activeView === 'Portal')
  const isSeminuevosActive = $derived(activeView === 'Seminuevos')
  const isCompraActive     = $derived(activeView === 'Cotizacion' || activeView === 'PruebaManejo')
  const isPostventaActive  = $derived(activeView === 'Postventa')
  const isContactoActive   = $derived(activeView === 'Ubicacion' || activeView === 'Contacto')

  function selectMegaType(type: VehicleType) {
    if (type !== 'Todos' && !BRAND_ALLOWED_TYPES[megaBrand].includes(type)) return
    megaType = type
  }



  function openMega() {
    megaOpen = true
  }

  function closeMega() {
    megaOpen = false
  }

  function toggleMega() {
    megaOpen = !megaOpen
  }

  function applyMegaSelection() {
    onTypeSelect?.(megaType)
    closeMega()
  }

  $effect(() => {
    if (!megaOpen || typeof document === 'undefined') return
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  })

  let scrolled = $state(false)

  onMount(() => {
    const onScroll = () => scrolled = window.scrollY > 20
    onScroll()
    window.addEventListener('scroll', onScroll)
    const onClickOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('[data-dropdown]')) closeDropdowns()
    }
    document.addEventListener('click', onClickOutside)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClickOutside)
    }
  })

  const logoFilter = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const divColor   = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)')

  const navBg = $derived(
    (scrolled || megaOpen)
      ? ($isDark ? 'rgba(5,7,18,0.78)' : 'rgba(255,255,255,0.82)')
      : 'transparent'
  )
  const navBd = $derived(
    (scrolled || megaOpen)
      ? 'blur(20px) saturate(180%)'
      : 'none'
  )
  const navBorderB = $derived(
    (scrolled || megaOpen)
      ? ($isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)')
      : '1px solid transparent'
  )
  const navShadow  = $derived(
    (scrolled || megaOpen)
      ? ($isDark
          ? '0 4px 24px rgba(0,0,0,0.35)'
          : '0 4px 24px rgba(20,40,120,0.06)')
      : 'none'
  )
  const specularBg = $derived((scrolled || megaOpen)
    ? ($isDark
        ? 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)'
        : 'linear-gradient(90deg,transparent,rgba(255,255,255,1),transparent)')
    : 'transparent'
  )
  const menuBtnStyle = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.70);'
    : 'background:rgba(51,78,139,0.07);border:1px solid rgba(51,78,139,0.14);color:#1a2040;'
  )
  const megaPanelStyle = $derived($isDark
    ? 'background:rgba(5,7,18,0.78);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(255,255,255,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.35);animation:nav-drop-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both;'
    : 'background:rgba(255,255,255,0.82);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(0,0,0,0.06);box-shadow:0 4px 24px rgba(20,40,120,0.06);animation:nav-drop-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both;'
  )
</script>

{#snippet TypeGlyph(type: VehicleType)}
  {#if type === 'Todos'}
    <GoogleIcon name="grid_view" size={18} />
  {:else if type === 'Hatchback'}
    <GoogleIcon name="directions_car" size={18} />
  {:else if type === 'Sedán'}
    <GoogleIcon name="directions_car" size={18} />
  {:else if type === 'SUV'}
    <GoogleIcon name="airport_shuttle" size={18} />
  {:else if type === 'Deportivos'}
    <GoogleIcon name="sports_motorsports" size={18} />
  {:else if type === 'Van'}
    <GoogleIcon name="airport_shuttle" size={18} />
  {:else}
    <GoogleIcon name="local_shipping" size={18} />
  {/if}
{/snippet}

<nav
  class="fixed top-0 left-0 md:left-20 right-0 z-40 flex items-center h-16 px-4 md:px-6 gap-3 transition-all duration-500"
  style="background:{navBg};backdrop-filter:{navBd};-webkit-backdrop-filter:{navBd};border-bottom:{navBorderB};box-shadow:{navShadow};animation:nav-drop-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both;"
>
  <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background:{specularBg}"></div>

  <button
    class="flex md:hidden items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-all cursor-pointer"
    style={menuBtnStyle}
    onclick={onMenuToggle}
  >
    <GoogleIcon name="menu" size={18} />
  </button>

  <button
    class="flex-shrink-0 md:mr-2 cursor-pointer bg-transparent border-0 p-0"
    onclick={(e) => { e.preventDefault(); onHomeClick?.() }}
    aria-label="Inicio"
  >
    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
      alt="VAPSA" class="h-7 w-auto object-contain" style="filter:{logoFilter}" />
  </button>

  <button
    class="ml-auto flex md:hidden items-center gap-1.5 rounded-full px-3 h-9 text-xs font-black tracking-tight transition-all cursor-pointer"
    style="background:{megaOpen ? `${megaAccent}22` : ($isDark ? 'rgba(255,255,255,0.07)' : 'rgba(51,78,139,0.07)')};border:1px solid {megaOpen ? `${megaAccent}70` : ($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(51,78,139,0.14)')};color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};"
    onclick={toggleMega}
    aria-expanded={megaOpen}
  >
    Modelos
    <GoogleIcon name="keyboard_arrow_down" size={18} class="opacity-70 transition-transform {megaOpen ? 'rotate-180' : ''}" />
  </button>

  <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

  <div class="hidden md:flex items-center gap-6 flex-1 px-4">
    <button
      onclick={(e) => { e.preventDefault(); onHomeClick?.() }}
      class="flex items-center gap-1.5 text-sm transition-all hover:opacity-80 cursor-pointer relative pb-0.5"
      style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'};font-weight:{isHomeActive ? 700 : 500};">
      Inicio
      {#if isHomeActive}
        <span class="absolute bottom-0 inset-x-0 h-0.5 rounded-full" style="background:{$isDark ? 'rgba(255,255,255,0.7)' : '#334E8B'}"></span>
      {/if}
    </button>
    <div class="relative h-full flex items-center" role="presentation">
      <button
        class="flex items-center gap-1.5 text-sm font-medium transition-all cursor-pointer"
        style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}"
        aria-haspopup="true"
        aria-expanded={megaOpen}
        onclick={toggleMega}
      >
        Modelos <GoogleIcon name="keyboard_arrow_down" size={18} class="opacity-70 transition-transform {megaOpen ? 'rotate-180' : ''}" />
      </button>
    </div>
    <a href="/adistem2026/seminuevos/" onclick={(e) => { e.preventDefault(); onSeminuevosClick?.() }}
      class="text-sm transition-all hover:opacity-80 cursor-pointer relative pb-0.5"
      style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'};font-weight:{isSeminuevosActive ? 700 : 500};">
      Seminuevos
      {#if isSeminuevosActive}
        <span class="absolute bottom-0 inset-x-0 h-0.5 rounded-full" style="background:{$isDark ? 'rgba(255,255,255,0.7)' : '#334E8B'}"></span>
      {/if}
    </a>
  </div>

  <div class="flex items-center gap-5 flex-shrink-0">
    <div class="hidden lg:flex items-center gap-1 mr-1">

      <!-- ── Dropdown: Compra ── -->
      <div class="relative" data-dropdown>
        <button
          onclick={toggleCompra}
          class="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[13px] transition-all cursor-pointer"
          style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'};background:{compraOpen || isCompraActive ? ($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.07)') : 'transparent'};font-weight:{isCompraActive ? 700 : 600};"
        >
          Compra
          <GoogleIcon name="keyboard_arrow_down" size={16} class="opacity-60 transition-transform {compraOpen ? 'rotate-180' : ''}" />
        </button>
        {#if compraOpen}
          <div
            class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl z-50"
            style="background:{$isDark ? 'rgba(8,11,24,0.96)' : 'rgba(255,255,255,0.97)'};backdrop-filter:blur(24px);border:1px solid {$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(51,78,139,0.12)'};"
          >
            <div class="py-1.5">
              <button onclick={() => { onCotizarClick?.(); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="calculate" size={16} class="opacity-60 flex-shrink-0" />
                Cotización
              </button>
              <button onclick={() => { onPruebaManejoClick?.(); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="speed" size={16} class="opacity-60 flex-shrink-0" />
                Prueba de manejo
              </button>
              <button onclick={() => { onPromocionesClick?.(); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="local_offer" size={16} class="opacity-60 flex-shrink-0" />
                Promociones
              </button>
            </div>
          </div>
        {/if}
      </div>

      <!-- ── Dropdown: Postventa ── -->
      <div class="relative" data-dropdown>
        <button
          onclick={togglePostventa}
          class="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[13px] transition-all cursor-pointer"
          style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'};background:{postventaOpen || isPostventaActive ? ($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.07)') : 'transparent'};font-weight:{isPostventaActive ? 700 : 600};"
        >
          Postventa
          <GoogleIcon name="keyboard_arrow_down" size={16} class="opacity-60 transition-transform {postventaOpen ? 'rotate-180' : ''}" />
        </button>
        {#if postventaOpen}
          <div
            class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl z-50"
            style="background:{$isDark ? 'rgba(8,11,24,0.96)' : 'rgba(255,255,255,0.97)'};backdrop-filter:blur(24px);border:1px solid {$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(51,78,139,0.12)'};"
          >
            <div class="py-1.5">
              <button onclick={() => { onPostventaClick?.('cita'); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="build" size={16} class="opacity-60 flex-shrink-0" />
                Cita de Servicio
              </button>
              <button onclick={() => undefined}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.42)' : 'rgba(26,32,64,0.45)'};">
                <GoogleIcon name="description" size={16} class="opacity-60 flex-shrink-0" />
                Fichas Técnicas
              </button>
            </div>
          </div>
        {/if}
      </div>

      <!-- ── Dropdown: Contacto ── -->
      <div class="relative" data-dropdown>
        <button
          onclick={toggleContacto}
          class="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[13px] transition-all cursor-pointer"
          style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'};background:{contactoOpen || isContactoActive ? ($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.07)') : 'transparent'};font-weight:{isContactoActive ? 700 : 600};"
        >
          Contacto
          <GoogleIcon name="keyboard_arrow_down" size={16} class="opacity-60 transition-transform {contactoOpen ? 'rotate-180' : ''}" />
        </button>
        {#if contactoOpen}
          <div
            class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl z-50"
            style="background:{$isDark ? 'rgba(8,11,24,0.96)' : 'rgba(255,255,255,0.97)'};backdrop-filter:blur(24px);border:1px solid {$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(51,78,139,0.12)'};"
          >
            <div class="py-1.5">
              <button onclick={() => { onContactoClick?.(); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="support_agent" size={16} class="opacity-60 flex-shrink-0" />
                Soporte
              </button>
              <button onclick={() => { onUbicacionClick?.('ventas'); closeDropdowns() }}
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer text-left"
                style="color:{$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};">
                <GoogleIcon name="location_on" size={16} class="opacity-60 flex-shrink-0" />
                Horarios y ubicación
              </button>
            </div>
          </div>
        {/if}
      </div>

    </div>

    <div class="hidden lg:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

    <button
      onclick={onCotizarClick}
      class="flex items-center justify-center gap-2 h-9 w-9 md:w-auto md:px-5 text-xs font-bold btn-glow-border tracking-wide cursor-pointer flex-shrink-0"
    >
      <GoogleIcon name="calculate" size={16} />
      <span class="hidden md:inline">Cotizar</span>
    </button>
  </div>
</nav>

{#if megaOpen}
  <div
    class="fixed top-16 left-0 md:left-20 right-0 bottom-0 z-[9999] overflow-hidden overscroll-contain"
    role="presentation"
  >
    <div class="h-full overflow-hidden overscroll-contain" style="{megaPanelStyle}border-radius:0;">
      <div class="flex flex-col md:grid h-[calc(100dvh-4rem)] md:grid-cols-[292px_minmax(0,1fr)] overflow-hidden overscroll-contain">
        
        <!-- ======================= -->
        <!-- MOBILE TOP BAR (Brands) -->
        <!-- ======================= -->
        <div class="md:hidden flex-shrink-0 border-b pt-3 pb-3" style="border-color:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,60,120,0.10)'};">
          <div class="flex items-center justify-between px-4 mb-3">
            <span class="text-[11px] font-black uppercase tracking-[0.16em]" style="color:{$isDark ? 'rgba(255,255,255,0.5)' : 'rgba(17,24,39,0.5)'}">Marcas</span>
            <button
              onclick={closeMega}
              class="h-7 px-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all"
              style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'};color:{$isDark ? 'rgba(255,255,255,0.8)' : '#1a2040'};"
            >
              Cerrar
            </button>
          </div>
          <div class="flex overflow-x-auto gap-2.5 px-4 pb-1 snap-x hide-scrollbar" style="scrollbar-width: none;">
            {#each BRAND_TABS as brand}
              {@const isActive = megaBrand === brand.name}
              <button
                onclick={() => selectMegaBrand(brand.name)}
                class="snap-start shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
                style="background:{isActive ? brand.accent : ($isDark ? 'rgba(255,255,255,0.04)' : 'rgba(51,78,139,0.04)')}; color:{isActive ? 'white' : ($isDark ? 'rgba(255,255,255,0.7)' : '#333')}; border: 1px solid {isActive ? brand.accent : ($isDark ? 'rgba(255,255,255,0.1)' : 'rgba(51,78,139,0.1)')}; box-shadow:{isActive ? `0 4px 12px ${brand.accent}40` : 'none'};"
              >
                {brand.label}
              </button>
            {/each}
          </div>
        </div>

        <!-- ======================= -->
        <!-- MOBILE PILLS (Types)    -->
        <!-- ======================= -->
        <div class="md:hidden flex-shrink-0 border-b py-2.5 shadow-sm relative z-10" style="border-color:{$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(30,60,120,0.05)'}; background:{$isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.4)'};">
          <div class="flex overflow-x-auto gap-2 px-4 snap-x hide-scrollbar" style="scrollbar-width: none;">
            {#each visibleMegaTypes as type}
              {@const isActive = megaType === type.name}
              <button
                onclick={() => selectMegaType(type.name as VehicleType)}
                class="snap-start shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5"
                style="background:{isActive ? ($isDark ? 'rgba(255,255,255,0.12)' : 'rgba(51,78,139,0.08)') : 'transparent'}; color:{isActive ? ($isDark ? 'white' : '#111827') : ($isDark ? 'rgba(255,255,255,0.5)' : 'rgba(17,24,39,0.6)')}; border-color:{isActive ? ($isDark ? 'rgba(255,255,255,0.2)' : 'rgba(51,78,139,0.2)') : 'transparent'};"
              >
                <span class="opacity-70">{@render TypeGlyph(type.name as VehicleType)}</span> {type.label}
              </button>
            {/each}
          </div>
        </div>

        <!-- ======================= -->
        <!-- DESKTOP ASIDE (Filters) -->
        <!-- ======================= -->
        <aside
          class="hidden md:block max-h-none overflow-y-auto overscroll-contain border-r px-6 py-6"
          style="border-color:{$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.10)'};"
        >
          <p class="text-[10px] font-black uppercase tracking-[0.14em]" style="color:{$isDark ? 'rgba(255,255,255,0.42)' : 'rgba(17,24,39,0.42)'}">Carrocería</p>
          <div class="mt-2 grid grid-cols-2 gap-2 md:flex md:flex-col">
            {#each visibleMegaTypes as item}
              {@const isTypeActive = megaType === item.name}
              <button
                onclick={() => selectMegaType(item.name as VehicleType)}
                class="flex min-h-[70px] w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-0.5 md:min-h-0 md:gap-3 md:px-3.5 md:py-3"
                style="background:{isTypeActive ? `${megaAccent}1f` : 'transparent'};border:1px solid {isTypeActive ? `${megaAccent}80` : ($isDark ? 'rgba(255,255,255,0.06)' : 'rgba(30,60,120,0.08)')};color:{isTypeActive ? ($isDark ? 'white' : '#111827') : ($isDark ? 'rgba(255,255,255,0.66)' : 'rgba(17,24,39,0.72)')};box-shadow:{isTypeActive ? `0 12px 30px ${megaAccent}24` : 'none'};"
              >
                <span
                  class="grid h-8 w-8 shrink-0 place-items-center rounded-lg md:h-9 md:w-9"
                  style="background:{isTypeActive ? megaAccent : ($isDark ? 'rgba(255,255,255,0.07)' : 'rgba(51,78,139,0.07)')};color:{isTypeActive ? 'white' : ($isDark ? 'rgba(255,255,255,0.62)' : '#334E8B')};"
                >
                  {@render TypeGlyph(item.name as VehicleType)}
                </span>
                <span class="min-w-0">
                  <span class="block text-xs font-extrabold leading-tight md:text-sm">{item.label}</span>
                  <span class="hidden text-[11px] font-medium leading-tight opacity-55 md:mt-1 md:block">{item.desc}</span>
                </span>
              </button>
            {/each}
          </div>

        </aside>

        <!-- ======================= -->
        <!-- MAIN CONTENT (Vehicles) -->
        <!-- ======================= -->
        <div class="flex-1 min-h-0 flex flex-col overflow-hidden">
          
          <!-- Desktop Header (Brands) -->
          <div class="hidden md:flex items-end justify-between gap-4 border-b px-7 pt-4 pb-0 flex-shrink-0" style="border-color:{$isDark ? 'rgba(255,255,255,0.12)' : 'rgba(30,60,120,0.14)'}">
            <div class="flex items-end gap-2 overflow-x-auto">
              {#each BRAND_TABS as brand}
                {@const isBrandActive = megaBrand === brand.name}
                <button
                  onclick={() => selectMegaBrand(brand.name)}
                  class="cursor-pointer whitespace-nowrap border-b-2 px-5 py-3 text-xs font-black uppercase tracking-[0.08em] transition-all duration-300"
                  style="border-color:{isBrandActive ? brand.accent : 'transparent'};color:{isBrandActive ? ($isDark ? 'white' : '#111827') : ($isDark ? 'rgba(255,255,255,0.46)' : 'rgba(17,24,39,0.54)')};"
                  onmouseenter={(e) => { if (!isBrandActive) (e.currentTarget as HTMLButtonElement).style.color = brand.hover }}
                  onmouseleave={(e) => { if (!isBrandActive) (e.currentTarget as HTMLButtonElement).style.color = $isDark ? 'rgba(255,255,255,0.46)' : 'rgba(17,24,39,0.54)' }}
                >
                  {brand.label}
                </button>
              {/each}
            </div>

            <div class="mb-2 flex items-center gap-2">
              <span class="rounded-full px-3 py-1.5 text-xs font-bold"
                style="background:{megaAccent}18;color:{megaAccent};border:1px solid {megaAccent}40;">
                {megaVehicles.length} modelo{megaVehicles.length !== 1 ? 's' : ''}
              </span>
              <button
                onclick={closeMega}
                class="h-9 cursor-pointer items-center justify-center rounded-full px-4 text-xs font-black tracking-tight inline-flex"
                style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'};border:1px solid {$isDark ? 'rgba(255,255,255,0.14)' : 'rgba(51,78,139,0.16)'};color:{$isDark ? 'rgba(255,255,255,0.78)' : '#1a2040'};"
              >
                Cerrar
              </button>
            </div>
          </div>

          <!-- Scrollable Grid Area -->
          <div class="flex-1 overflow-y-auto px-4 py-4 md:px-7 md:py-6 overscroll-contain pb-24">
            
            <div class="flex flex-col gap-2 pb-4 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-6">
              <div>
                <p class="hidden md:block text-xs font-black uppercase tracking-[0.18em]" style="color:{megaAccent}">
                  {megaBrand === 'Todas' ? 'Panorama general' : `Línea ${megaBrand}`}
                </p>
                <h3 class="text-xl font-black tracking-tight md:text-3xl md:mt-2 flex items-center justify-between" style="color:{$isDark ? 'white' : '#111827'}">
                  <span class="md:hidden">{megaBrand === 'Todas' ? 'Todos los modelos' : `Línea ${megaBrand}`}</span>
                  <span class="hidden md:inline">Modelos para comparar sin salir del menú.</span>
                  
                  <!-- Mobile Count Badge -->
                  <span class="md:hidden rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style="background:{megaAccent}18;color:{megaAccent};border:1px solid {megaAccent}40;">
                    {megaVehicles.length}
                  </span>
                </h3>
              </div>

            </div>

            {#if megaVehicles.length}
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {#each megaVehicles as vehicle, i (vehicle.id)}
                  <button
                    onclick={() => { 
                      if (vehicle.brand === 'Jeep') {
                        onModelSelect?.('Jeep', 'renegade')
                        closeMega()
                      } else {
                        selectMegaBrand(vehicle.brand); 
                        selectMegaType(vehicle.type); 
                        applyMegaSelection() 
                      }
                    }}
                    class="group/card cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 hover:-translate-y-1"
                    style="background:{$isDark ? 'rgba(255,255,255,0.055)' : '#ffffff'};border:1px solid {$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)'};box-shadow:0 18px 42px rgba(0,0,0,{$isDark ? 0.28 : 0.08});animation:mega-card-in 0.55s cubic-bezier(0.22,1,0.36,1) {i * 45}ms both;"
                  >
                    <div class="aspect-[1.62] overflow-hidden" style="background:{$isDark ? 'rgba(255,255,255,0.035)' : 'rgba(245,247,252,0.92)'};">
                      <img
                        src={vehicle.img}
                        alt="{vehicle.brand} {vehicle.model} {vehicle.year}"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.045]"
                      />
                    </div>
                    <div class="border-t p-4" style="border-color:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,60,120,0.10)'}; background:{$isDark ? 'transparent' : '#ffffff'};">
                      <div class="flex items-center justify-between gap-3">
                        <p class="text-[11px] font-black uppercase tracking-[0.14em]" style="color:{vehicle.accent}">{vehicle.brand}</p>
                        <p class="text-[11px] font-bold" style="color:{$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(17,24,39,0.46)'}">{vehicle.type}</p>
                      </div>
                      <h4 class="mt-2 text-lg font-black leading-none" style="color:{$isDark ? 'white' : '#111827'}">
                        {vehicle.model} <span class="opacity-45">{vehicle.year}</span>
                      </h4>

                      <div class="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p class="text-[10px] font-black uppercase tracking-[0.12em]" style="color:{$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(17,24,39,0.42)'}">Precio</p>
                          <p class="mt-1 text-base font-black leading-none" style="color:{$isDark ? 'white' : '#111827'}">{vehicle.price}</p>
                        </div>

                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            {:else}
              <div class="grid min-h-[260px] place-items-center rounded-2xl md:min-h-[320px]"
                style="background:{$isDark ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.68)'};border:1px solid {$isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)'};">
                <div class="text-center">
                  <p class="text-lg font-black" style="color:{$isDark ? 'white' : '#111827'}">Sin modelos en esta combinación</p>
                  <p class="mt-2 text-sm" style="color:{$isDark ? 'rgba(255,255,255,0.50)' : 'rgba(17,24,39,0.52)'}">Prueba otra marca o categoría.</p>
                </div>
              </div>
            {/if}


          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes mega-card-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.98);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
</style>
