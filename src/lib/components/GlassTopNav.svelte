<script lang="ts">
  import { onMount } from 'svelte'
  import { Calculator, Gauge, Wrench, Phone, Menu, ChevronDown, MapPin, LayoutGrid, Car, Mountain, Zap, Truck } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import type { VehicleType } from '$lib/types'

  interface Props {
    onCotizarClick?:    () => void
    onTypeSelect?:      (type: VehicleType) => void
    activeType?:        VehicleType
    onMenuToggle?:      () => void
    onMapClick?:        () => void
    onHomeClick?:       () => void
    onSeminuevosClick?: () => void
  }

  let {
    onCotizarClick,
    onTypeSelect,
    activeType = 'Todos',
    onMenuToggle,
    onMapClick,
    onHomeClick,
    onSeminuevosClick,
  }: Props = $props()

  const VEHICLE_TYPES = [
    { name: 'Todos',      icon: 'grid_view',          desc: 'Toda nuestra gama disponible' },
    { name: 'Sedán',      icon: 'directions_car',     desc: 'Elegancia y confort urbano' },
    { name: 'SUV',        icon: 'airport_shuttle',    desc: 'Versatilidad para tu familia' },
    { name: 'Deportivos', icon: 'sports_motorsports', desc: 'Adrenalina y diseño puro' },
    { name: 'Pick-ups',   icon: 'local_shipping',     desc: 'Fuerza bruta para el trabajo' },
  ] as const

  let scrolled = $state(false)

  onMount(() => {
    const onScroll = () => scrolled = window.scrollY > 20
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })

  const logoFilter = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const divColor   = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)')

  const navBg = $derived(
    scrolled
      ? ($isDark ? 'rgba(5,7,18,0.22)' : 'rgba(255,255,255,0.25)')
      : ($isDark ? 'rgba(5,7,18,0.84)' : 'rgba(255,255,255,0.60)')
  )
  const navBd = $derived(
    scrolled
      ? 'blur(20px) saturate(180%)'
      : ($isDark ? 'blur(52px) saturate(200%)' : 'blur(40px) saturate(180%)')
  )
  const navBorderB = $derived(
    scrolled
      ? '1px solid rgba(0,0,0,0.06)'
      : ($isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.12)')
  )
  const navShadow  = $derived(
    scrolled
      ? ($isDark
          ? '0 4px 24px rgba(0,0,0,0.35)'
          : '0 4px 24px rgba(20,40,120,0.06)')
      : ($isDark
          ? '0 0 0 0.5px rgba(255,255,255,0.12),0 8px 32px rgba(0,0,0,0.55)'
          : '0 0 0 0.5px rgba(255,255,255,1),0 2px 16px rgba(0,0,0,0.08)')
  )
  const specularBg = $derived($isDark
    ? 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)'
    : 'linear-gradient(90deg,transparent,rgba(255,255,255,1),transparent)'
  )
  const menuBtnStyle = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.70);'
    : 'background:rgba(51,78,139,0.07);border:1px solid rgba(51,78,139,0.14);color:#1a2040;'
  )
</script>

<nav
  class="fixed top-0 left-0 md:left-20 right-0 z-40 flex items-center h-16 px-4 md:px-6 gap-3 transition-all duration-500"
  style="background:{navBg};backdrop-filter:{navBd};-webkit-backdrop-filter:{navBd};border-bottom:{navBorderB};box-shadow:{navShadow};animation:nav-drop-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both;"
>
  <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background:{specularBg}"></div>

  <button
    class="flex md:hidden items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-all"
    style={menuBtnStyle}
    onclick={onMenuToggle}
  >
    <Menu size={17} />
  </button>

  <a href="#" class="flex-shrink-0 md:mr-2">
    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
      alt="VAPSA" class="h-7 w-auto object-contain" style="filter:{logoFilter}" />
  </a>

  <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

  <div class="hidden md:flex items-center gap-6 flex-1 px-4">
    <button 
      onclick={(e) => { e.preventDefault(); onHomeClick?.() }} 
      class="flex items-center gap-1.5 text-sm font-medium transition-all hover:opacity-80 cursor-pointer" 
      style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
      Inicio
    </button>
    <div class="relative group h-full flex items-center">
      <button class="flex items-center gap-1.5 text-sm font-medium transition-all cursor-pointer" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        Modelos <ChevronDown size={14} class="opacity-70 transition-transform group-hover:rotate-180" />
      </button>
      <div class="absolute top-12 left-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-2xl overflow-hidden p-2"
        style="background:{$isDark ? 'rgba(10,15,35,0.92)' : 'rgba(255,255,255,0.95)'};backdrop-filter:blur(24px);border:1px solid {$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};box-shadow:0 20px 40px rgba(0,0,0,0.2);">
        <div class="flex flex-col gap-1">
          {#each VEHICLE_TYPES as item}
            <button 
              onclick={() => onTypeSelect?.(item.name as VehicleType)} 
              class="group/item flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-white/5 dark:hover:bg-white/5 cursor-pointer text-left w-full"
            >
              <div class="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
                style="background:{activeType === item.name ? 'rgba(59,130,246,0.15)' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)')};color:{activeType === item.name ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,80,0.6)')}">
                <span class="material-symbols-outlined" style="font-size:24px;">{item.icon}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold tracking-tight" style="color:{activeType === item.name ? ($isDark ? '#60a5fa' : '#3b82f6') : ($isDark ? 'rgba(255,255,255,0.9)' : '#1a2040')}">
                  {item.name}
                </span>
                <span class="text-[10px] opacity-50 font-medium" style="color:{$isDark ? 'white' : '#1a2040'}">
                  {item.desc}
                </span>
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
    <a href="/adistem2026/seminuevos/" onclick={(e) => { e.preventDefault(); onSeminuevosClick?.() }} class="text-sm font-medium transition-all hover:opacity-80" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
      Seminuevos
    </a>
  </div>

  <div class="flex items-center gap-5 flex-shrink-0">
    <div class="hidden md:flex items-center gap-5 mr-1">
      <a href="#" class="flex items-center gap-2 text-[13px] font-semibold transition-all hover:opacity-80" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        <Gauge size={14} class="opacity-70" />
        Test Drive
      </a>
      <a href="#" class="flex items-center gap-2 text-[13px] font-semibold transition-all hover:opacity-80" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        <Wrench size={14} class="opacity-70" />
        Servicio
      </a>
      <a href="#" class="flex items-center gap-2 text-[13px] font-semibold transition-all hover:opacity-80" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        <Phone size={14} class="opacity-70" />
        Contacto
      </a>
      <button onclick={onMapClick} class="flex items-center gap-2 text-[13px] font-semibold transition-all hover:opacity-80 cursor-pointer" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        <MapPin size={14} class="opacity-70" />
        Ubicación
      </button>
    </div>

    <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

    <button
      onclick={onCotizarClick}
      class="hidden md:flex items-center gap-2 px-5 h-9 text-xs font-bold btn-glow-border tracking-wide"
    >
      <Calculator size={13} />
      <span>Cotizar</span>
    </button>
  </div>
</nav>
