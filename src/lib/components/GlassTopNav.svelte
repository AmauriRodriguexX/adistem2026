<script lang="ts">
  import { onMount } from 'svelte'
  import { Calculator, Gauge, Wrench, Phone, Menu, ChevronDown, MapPin } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import type { VehicleType } from '$lib/types'

  interface Props {
    onCotizarClick?: () => void
    onTypeSelect?:   (type: VehicleType) => void
    activeType?:     VehicleType
    onMenuToggle?:   () => void
  }

  let {
    onCotizarClick,
    onTypeSelect,
    activeType = 'Todos',
    onMenuToggle,
  }: Props = $props()

  const VEHICLE_TYPES: VehicleType[] = ['Todos', 'Sedán', 'SUV', 'Deportivos', 'Pick-ups']

  let scrolled = $state(false)

  onMount(() => {
    const onScroll = () => scrolled = window.scrollY > 20
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })



  const logoFilter = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const divColor   = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)')

  // ── Nav glass styles ──────────────────────────────────────────────────────
  // Scrolled → true glassmorphism (low opacity + blur/saturate)
  // At top   → more opaque for readability
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

  function chipStyle(isActive: boolean) {
    return isActive
      ? ($isDark
          ? 'background:rgba(51,78,139,0.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(51,78,139,0.80);color:rgba(255,255,255,0.95);box-shadow:0 2px 12px rgba(51,78,139,0.45),inset 0 1px 0 rgba(255,255,255,0.22);'
          : 'background:rgba(51,78,139,0.45);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(51,78,139,0.60);color:white;box-shadow:0 2px 12px rgba(51,78,139,0.24),inset 0 1px 0 rgba(255,255,255,0.55);')
      : ($isDark
          ? 'background:rgba(255,255,255,0.06);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.50);box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);'
          : 'background:rgba(255,255,255,0.30);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(100,130,220,0.20);color:rgba(20,30,80,0.65);box-shadow:inset 0 1px 0 rgba(255,255,255,0.90);')
  }
</script>

<nav
  class="fixed top-0 left-0 md:left-20 right-0 z-40 flex items-center h-16 px-4 md:px-6 gap-3 transition-all duration-500"
  style="background:{navBg};backdrop-filter:{navBd};-webkit-backdrop-filter:{navBd};border-bottom:{navBorderB};box-shadow:{navShadow};animation:nav-drop-in 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both;"
>
  <!-- Specular top line -->
  <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background:{specularBg}"></div>

  <!-- Mobile hamburger -->
  <button
    class="flex md:hidden items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-all"
    style={menuBtnStyle}
    onclick={onMenuToggle}
  >
    <Menu size={17} />
  </button>

  <!-- Logo -->
  <a href="#" class="flex-shrink-0 md:mr-2">
    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
      alt="VAPSA" class="h-7 w-auto object-contain" style="filter:{logoFilter}" />
  </a>

  <!-- Divider desktop -->
  <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

  <!-- Navigation Links -->
  <div class="hidden md:flex items-center gap-6 flex-1 px-4">
    <div class="relative group h-full flex items-center">
      <button class="flex items-center gap-1.5 text-sm font-medium transition-all" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
        Modelos <ChevronDown size={14} class="opacity-70 transition-transform group-hover:rotate-180" />
      </button>
      <!-- Dropdown -->
      <div class="absolute top-12 left-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-xl"
        style="background:{$isDark ? 'rgba(15,22,45,0.95)' : 'rgba(255,255,255,0.95)'};backdrop-filter:blur(20px);border:1px solid {$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};box-shadow:0 10px 30px rgba(0,0,0,0.1);">
        <div class="flex flex-col py-2">
          {#each VEHICLE_TYPES as type}
            <button onclick={() => onTypeSelect?.(type)} class="px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10 text-left w-full"
              style="color:{activeType === type ? ($isDark ? '#60a5fa' : '#3b82f6') : ($isDark ? 'rgba(255,255,255,0.85)' : '#1a2040')}">
              {type}
            </button>
          {/each}
        </div>
      </div>
    </div>
    <a href="/seminuevos" class="text-sm font-medium transition-all hover:opacity-80" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
      Seminuevos
    </a>
  </div>

  <div class="flex-1 md:hidden"></div>
  <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

  <!-- Right: quick links + CTA -->
  <div class="flex items-center gap-2 flex-shrink-0">
    <!-- MapPin (Visible en Mobile y Desktop) -->
    <LiquidGlass
      tag="a"
      href="https://www.google.com/maps/search/?api=1&query=BLVD+SAN+LUIS+1158,+San+Luis+Potosí,+San+Luis+Potosí"
      target="_blank"
      rel="noopener noreferrer"
      variant="pill"
      noRefract
      title="Cómo llegar"
      class="flex items-center justify-center transition-all duration-200 hover:scale-105 group relative cursor-pointer"
      style="width:36px;height:36px;border-radius:50%;color:var(--color-brand-1);text-decoration:none;"
    >
      <span style="position:relative;z-index:7;display:flex;">
        <MapPin size={16} />
      </span>
      <span class="absolute top-[46px] right-0 md:left-1/2 md:-translate-x-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        style="background:rgba(51,78,139,0.90);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px rgba(51,78,139,0.40);">
        Cómo llegar
      </span>
    </LiquidGlass>

    {#each [
      {icon: Gauge, label: 'Test Drive', href: '#'},
      {icon: Wrench, label: 'Servicio', href: '#'},
      {icon: Phone, label: 'Contacto', href: '#'}
    ] as link}
      <LiquidGlass
        tag="a"
        href={link.href}
        variant="pill"
        noRefract
        title={link.label}
        class="hidden md:flex items-center justify-center transition-all duration-200 hover:scale-105 group relative cursor-pointer"
        style="width:36px;height:36px;border-radius:50%;color:{$isDark ? 'rgba(255,255,255,0.70)' : 'rgba(30,50,120,0.75)'};text-decoration:none;"
      >
        <span style="position:relative;z-index:7;display:flex;">
          <link.icon size={14} />
        </span>
        <span class="absolute top-[46px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          style="background:rgba(51,78,139,0.90);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px rgba(51,78,139,0.40);">
          {link.label}
        </span>
      </LiquidGlass>
    {/each}

    <button
      onclick={onCotizarClick}
      class="hidden md:flex items-center gap-2 px-5 h-9 text-xs font-bold btn-glow-border tracking-wide"
    >
      <Calculator size={13} />
      <span>Cotizar</span>
    </button>
  </div>
</nav>
