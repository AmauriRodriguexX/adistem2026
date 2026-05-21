<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  interface Props {
    initialTab?: 'cita' | 'fichas'
    hideTabs?: boolean
  }
  let { initialTab = 'cita', hideTabs = false }: Props = $props()

  let activeTab = $state<'cita' | 'fichas'>(initialTab)

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )
  const T = $derived({
    primary:   $isDark ? 'white'                   : '#1a2040',
    secondary: $isDark ? 'rgba(255,255,255,0.65)'  : 'rgba(20,30,80,0.65)',
    muted:     $isDark ? 'rgba(255,255,255,0.38)'  : 'rgba(20,30,80,0.38)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'  : 'rgba(100,130,220,0.14)',
    cardBg:    $isDark ? 'rgba(255,255,255,0.05)'  : 'rgba(255,255,255,0.72)',
    cardBord:  $isDark ? 'rgba(255,255,255,0.09)'  : 'rgba(100,140,220,0.18)',
  })

  const CDN = 'https://www.jeep.com.mx/content/dam/cross-regional'

  const FICHAS = [
    {
      brand: 'Jeep', name: 'Renegade', year: 2026,
      img: `${CDN}/nafta/jeep/es_mx/2026/renegade/vlp/desktop/my26-jeep-renegade-vlp-dk-mx.jpg.img.2880.jpg`,
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '1.3L Turbo 173 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Automática 9 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '185 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
    {
      brand: 'Jeep', name: 'Compass', year: 2026,
      img: `${CDN}/nafta/jeep/es_mx/2026/compass/vlp/desktop/my26-jeep-compass-hero-vlp-inicio-mx-dk-v4.jpg.img.2880.jpg`,
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '2.4L 180 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Automática 9 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '195 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
    {
      brand: 'Jeep', name: 'Commander', year: 2026,
      img: `${CDN}/nafta/jeep/es_mx/2026/commander/vlp/desktop/my26-jeep-commander-inicio-hero-mx-dk-v1.jpg.img.2880.jpg`,
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '1.3L Turbo 200 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Automática 6 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '190 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
    {
      brand: 'Jeep', name: 'Grand Cherokee', year: 2026,
      img: `${CDN}/nafta/jeep/es_mx/2026/grand-cherokee/vlp/desktop/my26-jeep-grand-cherokee-inicio-hero-mx-dk.jpg.img.2880.jpg`,
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '2.0L Turbo 270 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Automática 8 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '210 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
    {
      brand: 'Jeep', name: 'Wrangler', year: 2026,
      img: '/adistem2026/jeep/wrangler-2026.jpg',
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '2.0L Turbo 270 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Automática 8 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '185 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
    {
      brand: 'Jeep', name: 'Gladiator', year: 2026,
      img: `${CDN}/nafta/jeep/es_mx/2026/jt-gladiator/vlp/desktop/my26-jeep-mojave-inicio-vlp-mx-dk.jpg.img.2880.jpg`,
      specs: [
        { icon: 'bolt',              label: 'Motor',       val: '3.6L V6 285 hp' },
        { icon: 'settings',          label: 'Transmisión', val: 'Manual 6 vel.' },
        { icon: 'speed',             label: 'Vel. máx.',   val: '180 km/h' },
        { icon: 'local_gas_station', label: 'Combustible', val: 'Gasolina' },
      ],
    },
  ]
</script>

<div class="min-h-screen pt-24 pb-24 px-4 md:px-8 transition-colors duration-500" style="background:{pageBg}">
  <div class="max-w-5xl mx-auto">

    <!-- Header -->
    <div class="text-left mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
        style="background:rgba(51,78,139,0.10);color:#4C8EF0;border:1px solid rgba(51,78,139,0.20);">
        <GoogleIcon name="build_circle" size={15} />
        <span>Servicios para tu vehículo</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-2" style="color:{T.primary}">
        {hideTabs && activeTab === 'fichas' ? 'Fichas Técnicas' : 'Postventa'}
      </h1>
      <p class="max-w-lg text-sm leading-relaxed" style="color:{T.secondary}">
        {hideTabs && activeTab === 'fichas'
          ? 'Consulta información técnica de modelos destacados en una vista separada del flujo de citas y pruebas de manejo.'
          : 'Mantén tu vehículo en condiciones óptimas con nuestro equipo certificado y accede a las fichas técnicas oficiales.'}
      </p>
    </div>

    <!-- Tabs -->
    {#if !hideTabs}
    <div class="flex justify-start mb-8">
      <div class="inline-flex rounded-2xl p-1 gap-1"
        style="background:{$isDark ? 'rgba(255,255,255,0.07)' : 'rgba(51,78,139,0.07)'};border:1px solid {T.divider};">
        <button
          onclick={() => activeTab = 'cita'}
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          style="background:{activeTab === 'cita' ? ($isDark ? 'rgba(255,255,255,0.12)' : 'white') : 'transparent'};
                 color:{activeTab === 'cita' ? T.primary : T.muted};
                 box-shadow:{activeTab === 'cita' ? ($isDark ? '0 2px 12px rgba(0,0,0,0.35)' : '0 2px 12px rgba(51,78,139,0.10)') : 'none'};">
          <GoogleIcon name="build" size={16} />
          Cita de Servicio
        </button>
        <button
          onclick={() => activeTab = 'fichas'}
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          style="background:{activeTab === 'fichas' ? ($isDark ? 'rgba(255,255,255,0.12)' : 'white') : 'transparent'};
                 color:{activeTab === 'fichas' ? T.primary : T.muted};
                 box-shadow:{activeTab === 'fichas' ? ($isDark ? '0 2px 12px rgba(0,0,0,0.35)' : '0 2px 12px rgba(51,78,139,0.10)') : 'none'};">
          <GoogleIcon name="description" size={16} />
          Fichas Técnicas
        </button>
      </div>
    </div>
    {/if}

    <!-- ── Tab: Cita de Servicio ── -->
    {#if activeTab === 'cita'}
      <div class="flex flex-col items-start gap-10">
        <div class="w-full max-w-md">
          <ContactFormCard initialTab="cita" hideTabs={true} showExtraFields={true} />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8"
          style="border-top:1px solid {T.divider}">
          {#each [
            { icon: 'workspace_premium', title: 'Mano de Obra Calificada', desc: 'Especialistas capacitados bajo estándares de fábrica.' },
            { icon: 'settings',          title: 'Refacciones Originales',  desc: 'Garantía de rendimiento y durabilidad superior.' },
            { icon: 'bolt',              title: 'Servicio Express',         desc: 'Mantenimientos básicos listos el mismo día.' },
          ] as item}
            <div class="flex flex-col items-start text-left gap-2">
              <GoogleIcon name={item.icon} size={26} style="color:#4C8EF0" />
              <p class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">{item.title}</p>
              <p class="text-[11px] leading-relaxed" style="color:{T.secondary}">{item.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- ── Tab: Fichas Técnicas ── -->
    {#if activeTab === 'fichas'}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {#each FICHAS as ficha}
          <div class="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style="background:{T.cardBg};border:1px solid {T.cardBord};backdrop-filter:blur(20px);box-shadow:{$isDark ? '0 4px 24px rgba(0,0,0,0.40)' : '0 4px 24px rgba(51,78,139,0.08)'};">
            <!-- Image -->
            <div class="w-full aspect-video overflow-hidden">
              <img src={ficha.img} alt="{ficha.brand} {ficha.name}" class="w-full h-full object-cover" />
            </div>
            <!-- Content -->
            <div class="p-5">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-widest mb-0.5" style="color:#4C8EF0">{ficha.brand} · {ficha.year}</p>
                  <h3 class="text-lg font-black" style="color:{T.primary}">{ficha.name}</h3>
                </div>
                <span class="text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider"
                  style="background:rgba(51,78,139,0.12);color:#4C8EF0;border:1px solid rgba(51,78,139,0.18);">{ficha.year}</span>
              </div>

              <!-- Specs grid -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                {#each ficha.specs as spec}
                  <div class="flex items-center gap-2 p-2 rounded-xl"
                    style="background:{$isDark ? 'rgba(255,255,255,0.04)' : 'rgba(51,78,139,0.04)'};border:1px solid {T.divider};">
                    <GoogleIcon name={spec.icon} size={14} style="color:#4C8EF0;flex-shrink:0" />
                    <div>
                      <p class="text-[9px] uppercase tracking-wide leading-none" style="color:{T.muted}">{spec.label}</p>
                      <p class="text-[11px] font-semibold leading-tight mt-0.5" style="color:{T.primary}">{spec.val}</p>
                    </div>
                  </div>
                {/each}
              </div>

              <!-- Download button -->
              <button
                onclick={() => alert('Ficha técnica disponible próximamente.')}
                class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all hover:opacity-80 cursor-pointer"
                style="background:rgba(51,78,139,0.12);color:#4C8EF0;border:1px solid rgba(51,78,139,0.22);">
                <GoogleIcon name="download" size={15} />
                Descargar ficha técnica
              </button>
            </div>
          </div>
        {/each}
      </div>

      <p class="text-center text-xs mt-8" style="color:{T.muted}">
        Las fichas técnicas en PDF estarán disponibles próximamente.
      </p>
    {/if}

  </div>
</div>
