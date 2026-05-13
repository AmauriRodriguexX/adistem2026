<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import GoogleIcon from './GoogleIcon.svelte'
  import type { BrandFilter } from '$lib/types'

  interface Props {
    activeBrand?:  BrandFilter
    onBrandSelect?: (brand: BrandFilter) => void
    mobileOpen?:   boolean
    onMobileClose?: () => void
    onMapClick?:     () => void
  }

  let {
    activeBrand   = 'Todas',
    onBrandSelect,
    mobileOpen    = false,
    onMobileClose,
    onMapClick,
  }: Props = $props()

  const brands: { name: BrandFilter; logo: string }[] = [
    { name: 'Jeep',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd4f306b104bdd75ff3d333df0fcf76cd286af873.svg?generation=1777350234231685&alt=media' },
    { name: 'Fiat',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9f59be0aa7edf3c4d1f6c53691839c04ea231b0d.svg?generation=1777350234233315&alt=media' },
    { name: 'Dodge',   logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7e91e187f7a58ac6058b1dd656f1f471917cfb80.svg%3Fv=1?generation=1777350234237830&alt=media' },
    { name: 'Ram',     logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b16b10ba0ffe4cccb07ddeb8fed199a72541048.svg?generation=1777350234223482&alt=media' },
    { name: 'Peugeot', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1aa0b8e902c45f89e937310760192244925939e5.svg?generation=1777350234239082&alt=media' },
  ]

  const brandColors: Record<string, { default: string; hover: string }> = {
    Todas:  { default: '#334E8B', hover: '#2E6CCF' },
    Jeep:   { default: '#424D07', hover: '#303804' },
    Fiat:   { default: '#FF1530', hover: '#c70606' },
    Dodge:  { default: '#D50000', hover: '#BA0000' },
    Ram:    { default: '#7f7f7f', hover: '#7f7f7f' },
    Peugeot:{ default: '#0074E8', hover: '#0057AD' },
  }

  let hoveredBrand = $state<string | null>(null)

  const logoFilter  = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const sidebarStyle = $derived($isDark
    ? 'background:rgba(5,7,18,0.22);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(255,255,255,0.08);box-shadow:4px 0 24px rgba(0,0,0,0.35);'
    : 'background:rgba(255,255,255,0.80);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(0,0,0,0.06);box-shadow:4px 0 24px rgba(20,40,120,0.06);'
  )
  const mobileStyle = $derived($isDark
    ? 'background:rgba(5,7,18,0.22);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(255,255,255,0.08);box-shadow:4px 0 24px rgba(0,0,0,0.35);'
    : 'background:rgba(255,255,255,0.85);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(0,0,0,0.06);box-shadow:4px 0 24px rgba(20,40,120,0.06);'
  )
  const hdrBorder = $derived($isDark ? 'border-bottom:1px solid rgba(255,255,255,0.08);' : 'border-bottom:1px solid rgba(100,130,220,0.12);')
  const closeBtn  = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.70);'
    : 'background:rgba(51,78,139,0.07);border:1px solid rgba(51,78,139,0.14);color:#1a2040;'
  )

  function brandTone(brand: BrandFilter | 'Todas', isHovered = false) {
    return brandColors[brand]?.[isHovered ? 'hover' : 'default'] ?? brandColors.Todas.default
  }

  function brandActiveBg(isActive: boolean, brand: BrandFilter | 'Todas' = 'Todas') {
    const tone = brandTone(brand)
    return isActive
      ? ($isDark ? `color-mix(in srgb, ${tone} 36%, transparent)` : `color-mix(in srgb, ${tone} 13%, white)`)
      : ($isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.60)')
  }
  function brandActiveBorder(isActive: boolean, brand: BrandFilter | 'Todas' = 'Todas') {
    const tone = brandTone(brand)
    return isActive
      ? `1px solid color-mix(in srgb, ${tone} ${$isDark ? '64%' : '46%'}, rgba(255,255,255,0.22))`
      : ($isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(100,130,220,0.14)')
  }
</script>

<!-- ── Desktop sidebar ── -->
<aside
  class="hidden md:flex fixed left-0 top-0 h-full w-20 z-50 flex-col items-center py-4"
  style={sidebarStyle}
>
  <!-- Left specular edge -->
  <div class="absolute inset-y-0 left-0 w-px pointer-events-none"
    style="background:{$isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,1)'}"></div>

  <!-- top spacer -->
  <div class="mt-3 mb-1"></div>

  <!-- Brand buttons -->
  <nav class="flex flex-col items-center gap-4 flex-1 w-full">
    {#each brands as brand (brand.name)}
      {@const isActive  = activeBrand === brand.name}
      {@const isHovered = hoveredBrand === brand.name}
      {@const tone = brandTone(brand.name, isHovered)}
      <div class="relative w-full flex justify-center">
        <LiquidGlass
          tag="button"
          variant="pill"
          noRefract
          onclick={() => onBrandSelect?.(brand.name === activeBrand ? 'Todas' : brand.name)}
          onmouseenter={() => hoveredBrand = brand.name}
          onmouseleave={() => hoveredBrand = null}
          class="flex items-center justify-center transition-all duration-250"
          style="width:52px;height:52px;border-radius:14px;outline:none;cursor:pointer;transform:{(isActive || isHovered) ? 'scale(1.08)' : 'scale(1)'};background:{(isActive || isHovered) ? `color-mix(in srgb, ${tone} ${isActive ? 38 : 22}%, transparent)` : 'transparent'};border:{(isActive || isHovered) ? `1px solid color-mix(in srgb, ${tone} 62%, rgba(255,255,255,0.16))` : '1px solid transparent'};box-shadow:{isActive ? `0 4px 22px color-mix(in srgb, ${tone} 55%, transparent),inset 0 1px 0 rgba(255,255,255,0.25)` : isHovered ? `0 4px 18px color-mix(in srgb, ${tone} 34%, transparent),inset 0 1px 0 rgba(255,255,255,0.16)` : 'none'};"
        >
          <img src={brand.logo} alt={brand.name} class="w-8 h-8 object-contain"
            style="filter:{logoFilter};opacity:{isActive ? 1 : isHovered ? 0.88 : ($isDark ? 0.55 : 0.48)}" />
          {#if isActive}
            <span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style="background:{tone};box-shadow:0 0 12px {tone}"></span>
          {/if}
        </LiquidGlass>
        <!-- Tooltip -->
        <span class="absolute left-[86px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50"
          style="background:color-mix(in srgb, {tone} 88%, rgba(0,0,0,0.28));border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px color-mix(in srgb, {tone} 42%, transparent);opacity:{isHovered ? 1 : 0};transform:translateY(-50%) translateX({isHovered ? 0 : -8}px);">
          {brand.name}
        </span>
      </div>
    {/each}
  </nav>

</aside>

<!-- ── Mobile backdrop ── -->
{#if mobileOpen}
  <div class="fixed inset-0 z-40 md:hidden"
    style="background:rgba(0,0,0,0.50);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);"
    onclick={onMobileClose}></div>
{/if}

<!-- ── Mobile drawer ── -->
<aside
  class="fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300"
  style="width:280px;{mobileStyle}transform:{mobileOpen ? 'translateX(0)' : 'translateX(-100%)'}"
>
  <div class="flex flex-col h-full w-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4" style={hdrBorder}>
      <a href="#">
        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
          alt="VAPSA" class="h-9 w-auto" style="filter:{logoFilter}" />
      </a>
      <button onclick={onMobileClose}
        class="flex items-center justify-center w-9 h-9 rounded-xl transition-all" style={closeBtn}>
        <GoogleIcon name="close" size={18} />
      </button>
    </div>

    <p class="px-5 pt-5 pb-3 text-xs uppercase tracking-widest"
      style="color:{$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.40)'}">Selecciona una marca</p>

    <nav class="flex flex-col gap-3 px-3 flex-1 overflow-y-auto pb-6">
      <!-- Todas -->
      <button onclick={() => { onBrandSelect?.('Todas'); onMobileClose?.() }}
        class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98]"
        style="background:{brandActiveBg(activeBrand === 'Todas', 'Todas')};border:{brandActiveBorder(activeBrand === 'Todas', 'Todas')}">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style="background:{activeBrand === 'Todas' ? 'color-mix(in srgb, #334E8B 24%, transparent)' : ($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)')};border:{activeBrand === 'Todas' ? '1px solid color-mix(in srgb, #334E8B 55%, rgba(255,255,255,0.18))' : '1px solid transparent'}">
          <GoogleIcon name="layers" size={20} style="color:{activeBrand === 'Todas' ? '#2E6CCF' : ($isDark ? 'rgba(255,255,255,0.8)' : 'rgba(51,78,139,0.8)')}" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-bold tracking-tight" style="color:{$isDark ? 'white' : '#1a2040'}">Todas las marcas</p>
        </div>
        {#if activeBrand === 'Todas'}
          <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#334E8B;box-shadow:0 0 10px #334E8B"></div>
        {/if}
      </button>

      <!-- Grid of logos -->
      <div class="grid grid-cols-2 gap-2">
        {#each brands as brand (brand.name)}
          {@const isActive = activeBrand === brand.name}
          {@const tone = brandTone(brand.name)}
          <button onclick={() => { onBrandSelect?.(brand.name); onMobileClose?.() }}
            class="relative aspect-[1.1/1] flex flex-col items-center justify-center rounded-2xl transition-all active:scale-[0.95]"
            style="background:{brandActiveBg(isActive, brand.name)};border:{brandActiveBorder(isActive, brand.name)};box-shadow:{isActive ? `0 8px 24px color-mix(in srgb, ${tone} 25%, transparent)` : 'none'}">
            
            <div class="w-14 h-14 rounded-xl flex items-center justify-center p-2.5 transition-all"
              style="background:{isActive ? `color-mix(in srgb, ${tone} ${$isDark ? 32 : 14}%, transparent)` : ($isDark ? 'rgba(255,255,255,0.04)' : `rgba(255,255,255,0.40)`)};border:{isActive ? `1px solid color-mix(in srgb, ${tone} 54%, rgba(255,255,255,0.18))` : ($isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(100,130,220,0.10)')};transform:{isActive ? 'scale(1.05)' : 'scale(1)'}">
              <img src={brand.logo} alt={brand.name} class="w-full h-full object-contain"
                style="filter:{logoFilter};opacity:{isActive ? 1 : ($isDark ? 0.45 : 0.40)}" />
            </div>

            {#if isActive}
              <div class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style="background:{tone};box-shadow:0 0 10px {tone}"></div>
            {/if}
            
            <span class="mt-2 text-[10px] font-black uppercase tracking-widest opacity-40" style="color:{$isDark ? 'white' : '#1a2040'}">{brand.name}</span>
          </button>
        {/each}
      </div>
    </nav>
    
    <div class="px-5 py-4 mt-auto" style="border-top:1px solid {$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(100,130,220,0.12)'}">
      <nav class="flex flex-col gap-1">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
          <GoogleIcon name="speed" size={20} class="opacity-70" /> Prueba de manejo
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
          <GoogleIcon name="build" size={20} class="opacity-70" /> Servicio
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}" onclick={(e) => { e.preventDefault(); onMobileClose?.(); onMapClick?.() }}>
          <GoogleIcon name="location_on" size={20} class="opacity-70" /> Ubicación
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all" style="color:{$isDark ? 'rgba(255,255,255,0.85)' : '#1a2040'}">
          <GoogleIcon name="call" size={20} class="opacity-70" /> Contacto
        </a>
      </nav>
    </div>
  </div>
</aside>
