<script lang="ts">
  import { MessageCircle, X, ChevronRight, Layers, Calculator, Wrench, Gauge, Phone } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import type { BrandFilter } from '$lib/types'

  interface Props {
    activeBrand?:  BrandFilter
    onBrandSelect?: (brand: BrandFilter) => void
    mobileOpen?:   boolean
    onMobileClose?: () => void
  }

  let {
    activeBrand   = 'Todas',
    onBrandSelect,
    mobileOpen    = false,
    onMobileClose,
  }: Props = $props()

  const brands: { name: BrandFilter; logo: string }[] = [
    { name: 'Jeep',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd4f306b104bdd75ff3d333df0fcf76cd286af873.svg?generation=1777350234231685&alt=media' },
    { name: 'Fiat',    logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9f59be0aa7edf3c4d1f6c53691839c04ea231b0d.svg?generation=1777350234233315&alt=media' },
    { name: 'Dodge',   logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7e91e187f7a58ac6058b1dd656f1f471917cfb80.svg%3Fv=1?generation=1777350234237830&alt=media' },
    { name: 'Ram',     logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b16b10ba0ffe4cccb07ddeb8fed199a72541048.svg?generation=1777350234223482&alt=media' },
    { name: 'Peugeot', logo: 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1aa0b8e902c45f89e937310760192244925939e5.svg?generation=1777350234239082&alt=media' },
  ]

  let hoveredBrand = $state<string | null>(null)

  const logoFilter  = $derived($isDark ? 'brightness(0) invert(1)' : 'brightness(0)')
  const dividerGrad = $derived($isDark
    ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)'
    : 'linear-gradient(to bottom, transparent, rgba(51,78,139,0.20), transparent)'
  )
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

  function brandActiveBg(isActive: boolean) {
    return isActive
      ? ($isDark ? 'rgba(51,78,139,0.28)' : 'rgba(51,78,139,0.10)')
      : ($isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.60)')
  }
  function brandActiveBorder(isActive: boolean) {
    return isActive
      ? ($isDark ? '1px solid rgba(51,78,139,0.50)' : '1px solid rgba(51,78,139,0.30)')
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
      <div class="relative w-full flex justify-center">
        <LiquidGlass
          tag="button"
          variant="pill"
          noRefract
          onclick={() => onBrandSelect?.(brand.name === activeBrand ? 'Todas' : brand.name)}
          onmouseenter={() => hoveredBrand = brand.name}
          onmouseleave={() => hoveredBrand = null}
          class="flex items-center justify-center transition-all duration-250"
          style="width:52px;height:52px;border-radius:14px;outline:none;cursor:pointer;transform:{(isActive || isHovered) ? 'scale(1.08)' : 'scale(1)'};{isActive ? ($isDark ? 'background:rgba(51,78,139,0.45);box-shadow:0 4px 22px rgba(51,78,139,0.55),inset 0 1px 0 rgba(255,255,255,0.25);' : 'background:rgba(51,78,139,0.12);box-shadow:0 4px 22px rgba(51,78,139,0.22),inset 0 1px 0 rgba(255,255,255,0.90);') : ''}"
        >
          <img src={brand.logo} alt={brand.name} class="w-8 h-8 object-contain"
            style="filter:{logoFilter};opacity:{isActive ? 1 : isHovered ? 0.88 : ($isDark ? 0.55 : 0.48)}" />
          {#if isActive}
            <span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style="background:{$isDark ? '#7EB3FF' : '#334E8B'}"></span>
          {/if}
        </LiquidGlass>
        <!-- Tooltip -->
        <span class="absolute left-[86px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50"
          style="background:rgba(51,78,139,0.90);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px rgba(51,78,139,0.40);opacity:{isHovered ? 1 : 0};transform:translateY(-50%) translateX({isHovered ? 0 : -8}px);">
          {brand.name}
        </span>
      </div>
    {/each}
  </nav>

  <div class="w-10 my-4 flex-shrink-0" style="height:1px;background:{dividerGrad}"></div>

  <!-- Quick Links -->
  <div class="flex flex-col items-center gap-4 w-full">
    {#each [
      {icon: Gauge, label: 'Test Drive', href: '#'},
      {icon: Calculator, label: 'Cotizar', href: '#'},
      {icon: Wrench, label: 'Servicio', href: '#'},
      {icon: Phone, label: 'Contacto', href: '#'}
    ] as link}
      <div class="relative w-full flex justify-center group">
        <a href={link.href} class="p-1.5 transition-all duration-200 hover:scale-110 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10" style="color:{$isDark ? 'rgba(255,255,255,0.65)' : 'rgba(20,30,80,0.65)'}">
          <link.icon size={18} />
        </a>
        <span class="absolute left-[86px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          style="background:rgba(51,78,139,0.90);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px rgba(51,78,139,0.40);">
          {link.label}
        </span>
      </div>
    {/each}
  </div>

  <div class="w-10 my-4 flex-shrink-0" style="height:1px;background:{dividerGrad}"></div>

  <!-- WhatsApp -->
  <div class="relative w-full flex justify-center group mb-3">
    <LiquidGlass
      tag="a"
      variant="pill"
      noRefract
      href="https://wa.me/524871108899?text=Hola,%20me%20interesa%20informaci%C3%B3n%20sobre%20sus%20veh%C3%ADculos"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center transition-all duration-250 hover:scale-110"
      style="width:44px;height:44px;border-radius:12px;background:rgba(37,211,102,0.14);border:1px solid rgba(37,211,102,0.32);box-shadow:0 4px 18px rgba(37,211,102,0.20),inset 0 1px 0 rgba(255,255,255,0.40);"
    >
      <MessageCircle size={18} style="color:#25D366;position:relative;z-index:7;" />
    </LiquidGlass>
    <span class="absolute left-[86px] top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none transition-all duration-200 z-50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
      style="background:rgba(37,211,102,0.90);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 4px 18px rgba(37,211,102,0.40);">
      WhatsApp
    </span>
  </div>>
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
        <X size={16} />
      </button>
    </div>

    <p class="px-5 pt-5 pb-3 text-xs uppercase tracking-widest"
      style="color:{$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.40)'}">Selecciona una marca</p>

    <nav class="flex flex-col gap-2 px-3 flex-1 overflow-y-auto">
      <!-- Todas -->
      <button onclick={() => { onBrandSelect?.('Todas'); onMobileClose?.() }}
        class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all active:scale-[0.98]"
        style="background:{brandActiveBg(activeBrand === 'Todas')};border:{brandActiveBorder(activeBrand === 'Todas')}">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'}">
          <Layers size={22} style="color:{$isDark ? 'rgba(255,255,255,0.8)' : 'rgba(51,78,139,0.8)'}" />
        </div>
        <div class="flex-1">
          <p class="text-base font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">Todas las marcas</p>
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.40)' : 'rgba(20,30,80,0.42)'}">Ver todas las promociones</p>
        </div>
        {#if activeBrand === 'Todas'}
          <div class="w-2 h-2 rounded-full flex-shrink-0" style="background:#334E8B"></div>
        {/if}
      </button>

      <!-- Individual brands -->
      {#each brands as brand (brand.name)}
        {@const isActive = activeBrand === brand.name}
        <button onclick={() => { onBrandSelect?.(brand.name); onMobileClose?.() }}
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all active:scale-[0.98]"
          style="background:{brandActiveBg(isActive)};border:{brandActiveBorder(isActive)}">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 p-2"
            style="background:{isActive ? ($isDark ? 'rgba(51,78,139,0.30)' : 'rgba(51,78,139,0.12)') : ($isDark ? 'rgba(255,255,255,0.07)' : 'rgba(51,78,139,0.07)')};border:{isActive ? '1px solid rgba(51,78,139,0.35)' : ($isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(100,130,220,0.14)')}">
            <img src={brand.logo} alt={brand.name} class="w-full h-full object-contain"
              style="filter:{logoFilter};opacity:{isActive ? 1 : ($isDark ? 0.60 : 0.55)}" />
          </div>
          <div class="flex-1">
            <p class="text-base font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">{brand.name}</p>
            <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.40)'}">Ver promociones {brand.name}</p>
          </div>
          {#if isActive}
            <div class="w-2 h-2 rounded-full flex-shrink-0" style="background:#334E8B"></div>
          {:else}
            <ChevronRight size={15} class="flex-shrink-0" style="color:{$isDark ? 'rgba(255,255,255,0.25)' : 'rgba(20,30,80,0.25)'}" />
          {/if}
        </button>
      {/each}
    </nav>

    <!-- WhatsApp row -->
    <div class="px-3 py-4 mt-2" style="border-top:{$isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(100,130,220,0.12)'}">
      <a href="https://wa.me/524871108899?text=Hola,%20me%20interesa%20informaci%C3%B3n%20sobre%20sus%20veh%C3%ADculos"
        target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
        style="background:rgba(37,211,102,0.10);border:1px solid rgba(37,211,102,0.24);">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style="background:rgba(37,211,102,0.18);">
          <MessageCircle size={20} style="color:#25D366" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">WhatsApp</p>
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.40)'}">(487) 110-8899</p>
        </div>
        <ChevronRight size={14} style="color:#25D366" />
      </a>
    </div>
  </div>
</aside>
