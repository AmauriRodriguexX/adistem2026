<script lang="ts">
  import { onMount } from 'svelte'
  import { Calculator, Sun, Moon, Monitor, Menu } from 'lucide-svelte'
  import { isDark, themeMode, setTheme, THEME_CYCLE } from '$lib/stores/theme'
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

  function cycleTheme() {
    const idx = THEME_CYCLE.indexOf($themeMode)
    setTheme(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length])
  }

  const logoFilter = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const divColor   = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(30,60,120,0.12)')

  const navBg = $derived($isDark
    ? (scrolled ? 'rgba(5,7,18,0.94)' : 'rgba(5,7,18,0.84)')
    : 'rgba(255,255,255,0.97)'
  )
  const navBd = $derived($isDark
    ? 'url(#lg-frosted-light) blur(52px) saturate(200%)'
    : 'url(#lg-frosted-light) blur(32px) saturate(140%)'
  )
  const navBorderB = $derived($isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(100,130,220,0.14)')
  const navShadow  = $derived($isDark
    ? '0 0 0 0.5px rgba(255,255,255,0.12),0 8px 32px rgba(0,0,0,0.55)'
    : '0 0 0 0.5px rgba(255,255,255,1),0 2px 16px rgba(20,40,120,0.07)'
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
          ? 'background:rgba(51,78,139,0.55);border:1px solid rgba(51,78,139,0.80);color:rgba(255,255,255,0.95);box-shadow:0 2px 12px rgba(51,78,139,0.45),inset 0 1px 0 rgba(255,255,255,0.22);'
          : 'background:rgba(51,78,139,0.12);border:1px solid rgba(51,78,139,0.32);color:#2a3f8b;box-shadow:0 2px 12px rgba(51,78,139,0.14),inset 0 1px 0 rgba(255,255,255,0.85);')
      : ($isDark
          ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.50);box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);'
          : 'background:rgba(255,255,255,0.72);border:1px solid rgba(100,130,220,0.20);color:rgba(20,30,80,0.50);box-shadow:inset 0 1px 0 rgba(255,255,255,0.90);')
  }
</script>

<nav
  class="fixed top-0 left-0 md:left-20 right-0 z-40 flex items-center h-16 px-4 md:px-6 gap-3 transition-all duration-300"
  style="background:{navBg};backdrop-filter:{navBd};-webkit-backdrop-filter:{navBd};border-bottom:{navBorderB};box-shadow:{navShadow};"
>
  <!-- Specular top line -->
  <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background:{specularBg}"></div>

  <!-- Mobile hamburger -->
  <button
    class="flex md:hidden items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all"
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

  <!-- Type chips desktop -->
  <div class="hidden md:flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none">
    {#each VEHICLE_TYPES as type (type)}
      <button
        onclick={() => onTypeSelect?.(type)}
        class="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
        style={chipStyle(activeType === type)}
      >{type}</button>
    {/each}
  </div>

  <div class="flex-1 md:hidden"></div>
  <div class="hidden md:block h-6 w-px flex-shrink-0" style="background:{divColor}"></div>

  <!-- Right: theme toggle + CTA -->
  <div class="flex items-center gap-2 flex-shrink-0">
    <LiquidGlass
      tag="button"
      variant="pill"
      noRefract
      onclick={cycleTheme}
      title="Cambiar tema: {$themeMode}"
      class="flex items-center justify-center transition-all duration-200 hover:scale-105"
      style="width:36px;height:36px;border-radius:10px;color:{$isDark ? 'rgba(255,255,255,0.70)' : 'rgba(30,50,120,0.75)'};cursor:pointer;outline:none;"
    >
      <span style="position:relative;z-index:7;display:flex;">
        {#if $themeMode === 'light'}
          <Sun size={14} />
        {:else if $themeMode === 'dark'}
          <Moon size={14} />
        {:else}
          <Monitor size={14} />
        {/if}
      </span>
    </LiquidGlass>

    <button
      onclick={onCotizarClick}
      class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95"
      style="background:linear-gradient(135deg,#334E8B,#2E6CCF);border:1px solid rgba(255,255,255,0.30);box-shadow:0 4px 20px rgba(51,78,139,0.50),inset 0 1px 0 rgba(255,255,255,0.35);"
    >
      <Calculator size={13} />
      <span>Cotizar</span>
    </button>
  </div>
</nav>
