<script lang="ts">
  import { ChevronRight, ChevronDown } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'
  import type { BrandFilter } from '$lib/types'
  import ContactFormCard from './ContactFormCard.svelte'

  interface Props {
    id?: string
    onMapClick?: () => void
    onCotizarClick?: () => void
    onPruebaManejoClick?: () => void
    brand?: BrandFilter
    config?: { video: string; image?: string; accent: string; title: string; subtitle: string; hideForm?: boolean }
  }
  let { id, onMapClick, onCotizarClick, onPruebaManejoClick, brand = 'Todas', config }: Props = $props()

  const TOPO_PATTERN = 'https://www.transparenttextures.com/patterns/topography.png'

  let formCardComponent: any = $state()

  export function highlight() {
    formCardComponent?.triggerHighlight()
  }

  const overlay1 = $derived($isDark
    ? 'linear-gradient(135deg,rgba(5,8,20,0.72) 0%,rgba(5,8,20,0.41) 50%,rgba(5,8,20,0.05) 100%)'
    : 'linear-gradient(135deg,rgba(235,240,248,0.85) 0%,rgba(235,240,248,0.55) 50%,rgba(235,240,248,0.15) 100%)'
  )

  const glassBtn   = $derived('background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);')

  const textPrimary = $derived($isDark ? 'white' : '#1a2040')
  const textMuted   = $derived($isDark ? 'rgba(255,255,255,0.65)' : 'rgba(20,30,80,0.75)')
  const bottomFade = $derived($isDark
    ? 'linear-gradient(to bottom,transparent,rgba(5,8,20,1))'
    : 'linear-gradient(to bottom,transparent,rgba(240,245,255,1))'
  )
</script>

<section {id} class="relative overflow-hidden {config?.image ? 'custom-carousel' : ''}" style={!config?.image ? "min-height:100svh;" : ""}>
  <style>
    .custom-carousel {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: auto;
        aspect-ratio: 16/9;
        max-height: 605px;
        background-color: #000;
    }
    @media (max-width: 1024px) {
        .custom-carousel {
            max-height: 400px;
        }
    }
  </style>
  <div class="absolute inset-0 overflow-hidden bg-[#050814] z-0" style={config?.image ? "margin-top: 61px;" : ""}>
    {#if config?.image}
      <div class="w-full h-full">
        <img src={config.image} alt={config?.title} class="w-full h-full object-cover transition-all duration-700" />
      </div>
    {:else}
      {#key config?.video}
        <video
          class="absolute left-0 top-0 w-full h-full pointer-events-none opacity-70 object-cover"
          src="/adistem2026/head-first.mp4"
          autoplay
          muted
          loop
          playsinline
        ></video>
      {/key}
    {/if}
  </div>

  {#if brand === 'Jeep'}
    <div class="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay z-[15]"
      style="background-image:url({TOPO_PATTERN});background-repeat:repeat;background-size:450px;"></div>
  {/if}

  {#if !config?.image}
    <div class="absolute inset-0" style="background:{overlay1};z-index:5;pointer-events:none;"></div>
    <div class="absolute inset-0" style="background:radial-gradient(ellipse at 15% 80%,{config?.accent}44 0%,transparent 65%);z-index:6;pointer-events:none;"></div>
  {/if}

  <!-- ── MOBILE (NO FORM) ── -->
  <div class="lg:hidden relative z-30 w-full px-5 pt-28 pb-12 flex flex-col items-center justify-center text-center gap-6 min-h-[calc(100svh-61px)]">
    <h1 class="mb-2" style="color:{textPrimary};font-size:clamp(2.5rem,8vw,3.5rem);font-weight:800;line-height:1.1;letter-spacing:-1px;">
      {@html config?.title ?? ''}
    </h1>
    <p class="mb-6 max-w-sm" style="color:{textMuted};font-size:0.95rem;line-height:1.65;">
      {config?.subtitle ?? ''}
    </p>

    <div class="w-full max-w-xs">
      <button onclick={onPruebaManejoClick} class="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold btn-glow-border tracking-wide transition-all active:scale-[0.98] cursor-pointer">
        Agenda tu prueba de manejo <ChevronRight size={15} />
      </button>
    </div>
  </div>

  <!-- ── DESKTOP (WITH FORM IF !hideForm) ── -->
  <div class="hidden lg:flex relative z-30 w-full px-8 pt-28 pb-12 flex-row items-center gap-12 max-w-7xl mx-auto min-h-screen">
    <div class="flex-1 {config?.hideForm ? 'text-center flex flex-col items-center' : ''}" style="color:{textPrimary}">
      <h1 class="mb-4" style="color:{textPrimary};font-size:3.5rem;font-weight:800;line-height:1.1;letter-spacing:-1px;">
        {@html config?.title ?? ''}
      </h1>
      <p class="mb-8 {config?.hideForm ? 'max-w-2xl' : 'max-w-lg'}" style="color:{textMuted};font-size:1.05rem;line-height:1.7;">
        {config?.subtitle ?? ''}
      </p>
      <div class="flex gap-3">
        <button onclick={onPruebaManejoClick} class="flex items-center gap-2 px-6 py-3 text-sm font-bold btn-glow-border tracking-wide cursor-pointer">Agenda tu prueba de manejo <ChevronRight size={15} /></button>
        {#if config?.hideForm}
          <button onclick={onCotizarClick} class="flex items-center gap-2 px-6 py-3 rounded-2xl text-white/85 text-sm font-medium cursor-pointer" style={glassBtn}>Cotizar Ahora <ChevronDown size={15} /></button>
        {/if}
      </div>
    </div>

    {#if !config?.hideForm}
      <ContactFormCard accent={config?.accent} bind:this={formCardComponent} />
    {/if}
  </div>

  {#if !config?.hideForm}
    <div class="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style="background:{bottomFade}"></div>
  {/if}
</section>
