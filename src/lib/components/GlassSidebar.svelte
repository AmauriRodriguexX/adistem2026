<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import GoogleIcon from './GoogleIcon.svelte'
  import type { BrandFilter } from '$lib/types'

  interface Props {
    activeBrand?:         BrandFilter
    onBrandSelect?:       (brand: BrandFilter) => void
    mobileOpen?:          boolean
    onMobileClose?:       () => void
    onMapClick?:          () => void
    onSeminuevosClick?:   () => void
    onPromocionesClick?:  () => void
    onCotizarClick?:      () => void
    onPruebaManejoClick?: () => void
    onContactoClick?:     () => void
    onUbicacionClick?:    () => void
    onPostventaClick?:    (tab?: 'cita' | 'fichas') => void
  }

  let {
    activeBrand         = 'Todas',
    onBrandSelect,
    mobileOpen          = false,
    onMobileClose,
    onMapClick,
    onSeminuevosClick,
    onPromocionesClick,
    onCotizarClick,
    onPruebaManejoClick,
    onContactoClick,
    onUbicacionClick,
    onPostventaClick,
  }: Props = $props()

  const brands: { name: BrandFilter; logo: string; enabled: boolean }[] = [
    { name: 'Jeep',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd4f306b104bdd75ff3d333df0fcf76cd286af873.svg?generation=1777350234231685&alt=media',    enabled: true  },
    { name: 'Fiat',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9f59be0aa7edf3c4d1f6c53691839c04ea231b0d.svg?generation=1777350234233315&alt=media',    enabled: false },
    { name: 'Dodge',   logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7e91e187f7a58ac6058b1dd656f1f471917cfb80.svg%3Fv=1?generation=1777350234237830&alt=media', enabled: false },
    { name: 'Ram',     logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b16b10ba0ffe4cccb07ddeb8fed199a72541048.svg?generation=1777350234223482&alt=media',    enabled: false },
    { name: 'Peugeot', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1aa0b8e902c45f89e937310760192244925939e5.svg?generation=1777350234239082&alt=media',    enabled: false },
  ]

  const brandColors: Record<string, { default: string; hover: string }> = {
    Todas:  { default: '#334E8B', hover: '#2E6CCF' },
    Jeep:   { default: '#424D07', hover: '#303804' },
    Fiat:   { default: '#FF1530', hover: '#c70606' },
    Dodge:  { default: '#D50000', hover: '#BA0000' },
    Ram:    { default: '#7f7f7f', hover: '#7f7f7f' },
    Peugeot:{ default: '#0074E8', hover: '#0057AD' },
  }

  let hoveredBrand  = $state<string | null>(null)
  let compraOpen    = $state(false)
  let contactoOpen  = $state(false)

  const logoFilter   = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const sidebarStyle = $derived($isDark
    ? 'background:rgba(5,7,18,0.22);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(255,255,255,0.08);box-shadow:4px 0 24px rgba(0,0,0,0.35);'
    : 'background:rgba(255,255,255,0.80);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(0,0,0,0.06);box-shadow:4px 0 24px rgba(20,40,120,0.06);'
  )
  const mobileStyle = $derived($isDark
    ? 'background:rgba(5,7,18,0.94);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(255,255,255,0.08);box-shadow:4px 0 24px rgba(0,0,0,0.35);'
    : 'background:rgba(255,255,255,0.97);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-right:1px solid rgba(0,0,0,0.06);box-shadow:4px 0 24px rgba(20,40,120,0.06);'
  )
  const hdrBorder   = $derived($isDark ? 'border-bottom:1px solid rgba(255,255,255,0.08);' : 'border-bottom:1px solid rgba(100,130,220,0.12);')
  const closeBtn    = $derived($isDark
    ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.70);'
    : 'background:rgba(51,78,139,0.07);border:1px solid rgba(51,78,139,0.14);color:#1a2040;'
  )
  const labelColor  = $derived($isDark ? 'rgba(255,255,255,0.32)' : 'rgba(20,30,80,0.38)')
  const textColor   = $derived($isDark ? 'rgba(255,255,255,0.88)' : '#1a2040')
  const textMuted   = $derived($isDark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,80,0.60)')
  const rowHoverBg  = $derived($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.05)')
  const dividerColor = $derived($isDark ? 'rgba(255,255,255,0.07)' : 'rgba(100,130,220,0.12)')
  const subItemBg   = $derived($isDark ? 'rgba(255,255,255,0.03)' : 'rgba(51,78,139,0.03)')

  function brandTone(brand: BrandFilter | 'Todas', isHovered = false) {
    return brandColors[brand]?.[isHovered ? 'hover' : 'default'] ?? brandColors.Todas.default
  }

  $effect(() => {
    if (typeof document === 'undefined') return
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  })

  function close() {
    onMobileClose?.()
  }

  function handleBrand(brand: BrandFilter, enabled: boolean) {
    if (!enabled) return
    onBrandSelect?.(brand === activeBrand ? 'Todas' : brand)
    close()
  }
</script>

<!-- ── Desktop sidebar ── -->
<aside
  class="hidden md:flex fixed left-0 top-0 h-full w-20 z-50 flex-col items-center py-4"
  style={sidebarStyle}
>
  <div class="absolute inset-y-0 left-0 w-px pointer-events-none"
    style="background:{$isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,1)'}"></div>

  <div class="mt-3 mb-1"></div>

  <nav class="flex flex-col items-center gap-4 flex-1 w-full">
    {#each brands as brand (brand.name)}
      {@const isActive  = activeBrand === brand.name}
      {@const isHovered = hoveredBrand === brand.name}
      {@const tone = brandTone(brand.name, isHovered)}
      <div class="relative w-full flex justify-center" style="opacity:{brand.enabled ? 1 : 0.4};filter:{brand.enabled ? 'none' : 'grayscale(1)'};pointer-events:{brand.enabled ? 'auto' : 'none'};">
        <LiquidGlass
          tag="button"
          variant="pill"
          noRefract
          onclick={() => brand.enabled ? onBrandSelect?.(brand.name === activeBrand ? 'Todas' : brand.name) : null}
          onmouseenter={() => brand.enabled && (hoveredBrand = brand.name)}
          onmouseleave={() => hoveredBrand = null}
          class="flex items-center justify-center transition-all duration-250"
          style="width:52px;height:52px;border-radius:14px;outline:none;cursor:{brand.enabled ? 'pointer' : 'default'};transform:{brand.enabled && (isActive || isHovered) ? 'scale(1.08)' : 'scale(1)'};background:{brand.enabled && (isActive || isHovered) ? `color-mix(in srgb, ${tone} ${isActive ? 38 : 22}%, transparent)` : 'transparent'};border:{isActive || isHovered ? `1px solid color-mix(in srgb, ${tone} 62%, rgba(255,255,255,0.16))` : '1px solid transparent'};box-shadow:{isActive ? `0 4px 22px color-mix(in srgb, ${tone} 55%, transparent),inset 0 1px 0 rgba(255,255,255,0.25)` : isHovered ? `0 4px 18px color-mix(in srgb, ${tone} 34%, transparent),inset 0 1px 0 rgba(255,255,255,0.16)` : 'none'};"
        >
          <img src={brand.logo} alt={brand.name} class="w-8 h-8 object-contain"
            style="filter:{logoFilter};opacity:{isActive ? 1 : isHovered ? 0.88 : ($isDark ? 0.55 : 0.48)}" />
          {#if isActive}
            <span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style="background:{tone};box-shadow:0 0 12px {tone}"></span>
          {/if}
        </LiquidGlass>
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
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-40 md:hidden"
    style="background:rgba(0,0,0,0.50);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);"
    onclick={close}></div>
{/if}

<!-- ── Mobile drawer ── -->
<aside
  class="fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300 flex flex-col"
  style="width:300px;{mobileStyle}transform:{mobileOpen ? 'translateX(0)' : 'translateX(-100%)'}"
>
  <!-- Header -->
  <div class="flex items-center justify-between px-5 py-4 flex-shrink-0" style={hdrBorder}>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#">
      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd523ee5a3e49270550e54e77aac5fd153b37f9cb.svg?generation=1777350234230312&alt=media"
        alt="VAPSA" class="h-9 w-auto" style="filter:{logoFilter}" />
    </a>
    <button onclick={close}
      class="flex items-center justify-center w-9 h-9 rounded-xl transition-all" style={closeBtn}>
      <GoogleIcon name="close" size={18} />
    </button>
  </div>

  <!-- Scrollable content -->
  <div class="flex-1 overflow-y-auto pb-6">

    <!-- ── MARCAS ── -->
    <div class="px-4 pt-5 pb-2">
      <p class="text-[10px] font-black uppercase tracking-widest mb-3" style="color:{labelColor}">Marcas</p>
      <div class="grid grid-cols-2 gap-2">
        {#each brands as brand (brand.name)}
          {@const isActive  = activeBrand === brand.name}
          {@const tone      = brandTone(brand.name)}
          <button
            onclick={() => handleBrand(brand.name, brand.enabled)}
            class="relative flex items-center justify-center w-full h-20 rounded-2xl transition-all"
            aria-label={brand.name}
            style="
              background:{isActive ? `color-mix(in srgb, ${tone} ${$isDark ? 20 : 10}%, transparent)` : 'transparent'};
              border:{isActive ? `1px solid color-mix(in srgb, ${tone} 40%, rgba(255,255,255,0.10))` : '1px solid transparent'};
              opacity:{brand.enabled ? 1 : 0.35};
              filter:{brand.enabled ? 'none' : 'grayscale(1)'};
              cursor:{brand.enabled ? 'pointer' : 'default'};
            "
          >
            <!-- Logo pill -->
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 p-2.5"
              style="background:{isActive ? `color-mix(in srgb, ${tone} ${$isDark ? 28 : 14}%, transparent)` : ($isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)')};border:{isActive ? `1px solid color-mix(in srgb, ${tone} 50%, transparent)` : `1px solid ${$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`};">
              <img src={brand.logo} alt={brand.name} class="w-full h-full object-contain"
                style="filter:{logoFilter};opacity:{isActive ? 1 : ($isDark ? 0.55 : 0.45)}" />
            </div>
            <!-- Active dot -->
            {#if isActive}
              <span class="absolute top-2 right-2 w-2 h-2 rounded-full flex-shrink-0"
                style="background:{tone};box-shadow:0 0 8px {tone}"></span>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <!-- Divider -->
    <div class="mx-4 my-3" style="height:1px;background:{dividerColor}"></div>

    <!-- ── SEMINUEVOS ── -->
    <div class="px-4">
      <button
        onclick={() => { onSeminuevosClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="directions_car" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Seminuevos</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>
    </div>

    <!-- Divider -->
    <div class="mx-4 my-3" style="height:1px;background:{dividerColor}"></div>

    <!-- ── COMPRA ── -->
    <div class="px-4">
      <p class="text-[10px] font-black uppercase tracking-widest mb-2" style="color:{labelColor}">Compra</p>

      <!-- Cotizar -->
      <button
        onclick={() => { onCotizarClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="description" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Cotizar</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>

      <!-- Prueba de manejo -->
      <button
        onclick={() => { onPruebaManejoClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="speed" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Prueba de manejo</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>

      <!-- Promociones -->
      <button
        onclick={() => { onPromocionesClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="local_offer" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Promociones</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>
    </div>

    <!-- Divider -->
    <div class="mx-4 my-3" style="height:1px;background:{dividerColor}"></div>

    <!-- ── POSTVENTA ── -->
    <div class="px-4">
      <p class="text-[10px] font-black uppercase tracking-widest mb-2" style="color:{labelColor}">Postventa</p>

      <button
        onclick={() => { onPostventaClick?.('cita'); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="build" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Cita de Servicio</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>

      <button
        onclick={() => undefined}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textMuted};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="description" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Fichas Técnicas</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>
    </div>

    <!-- Divider -->
    <div class="mx-4 my-3" style="height:1px;background:{dividerColor}"></div>

    <!-- ── CONTACTO ── -->
    <div class="px-4">
      <p class="text-[10px] font-black uppercase tracking-widest mb-2" style="color:{labelColor}">Contacto</p>

      <!-- Horarios y ubicación -->
      <button
        onclick={() => { onUbicacionClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="location_on" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Horarios y ubicación</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>

      <!-- Contáctanos -->
      <button
        onclick={() => { onContactoClick?.(); close() }}
        class="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all"
        style="color:{textColor};"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHoverBg}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <GoogleIcon name="call" size={20} />
        <span class="text-sm font-semibold flex-1 text-left">Contáctanos</span>
        <GoogleIcon name="chevron_right" size={16} />
      </button>
    </div>

  </div>
</aside>
