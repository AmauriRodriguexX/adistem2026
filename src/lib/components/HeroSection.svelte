<script lang="ts">
  import { ChevronRight, Star, Shield, Zap, Wrench, ChevronDown } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  interface Props { id?: string }
  let { id }: Props = $props()

  const HERO_BG = 'https://images.unsplash.com/photo-1655457353393-04bb8d53b996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBTVVYlMjBhdXRvbW90aXZlJTIwc2hvd3Jvb20lMjBuaWdodCUyMGRhcmt8ZW58MXx8fHwxNzc3MzUxNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080'

  type TabKey = 'cotizacion' | 'cita'
  let activeTab     = $state<TabKey>('cotizacion')
  let nombre        = $state('')
  let apellido      = $state('')
  let correo        = $state('')
  let telefono      = $state('')
  let marca         = $state('')
  let modelo        = $state('')
  let version       = $state('')
  let fecha         = $state('')
  let servicio      = $state('')
  let privacidad    = $state(false)
  let ofertas       = $state(false)

  const overlay1 = $derived($isDark
    ? 'linear-gradient(135deg,rgba(5,8,20,0.95) 0%,rgba(5,8,20,0.72) 50%,rgba(5,8,20,0.35) 100%)'
    : 'linear-gradient(135deg,rgba(235,240,248,0.85) 0%,rgba(235,240,248,0.55) 50%,rgba(235,240,248,0.15) 100%)'
  )
  const glassForm = $derived($isDark
    ? 'background:rgba(8,12,28,0.78);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(255,255,255,0.15);box-shadow:0 32px 80px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,255,255,0.20);'
    : 'background:rgba(255,255,255,0.80);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(255,255,255,0.75);box-shadow:0 32px 80px rgba(10,30,80,0.20),inset 0 1px 0 rgba(255,255,255,0.98);'
  )
  const glassInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.13);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const glassSelect = $derived($isDark
    ? 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.13);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const labelColor = $derived($isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.55)')
  const checkColor = $derived($isDark ? 'rgba(255,255,255,0.42)' : 'rgba(20,30,80,0.48)')
  const formBorder = $derived($isDark ? 'border-bottom:1px solid rgba(255,255,255,0.08);' : 'border-bottom:1px solid rgba(100,130,220,0.14);')
  const hColor     = $derived($isDark ? 'white' : '#1a2040')
  const textPrimary = $derived($isDark ? 'white' : '#1a2040')
  const textMuted   = $derived($isDark ? 'rgba(255,255,255,0.65)' : 'rgba(20,30,80,0.75)')

  function tabStyle(key: TabKey) {
    return activeTab === key
      ? ($isDark
          ? 'background:rgba(51,78,139,0.50);border:1px solid rgba(51,78,139,0.65);color:white;'
          : 'background:rgba(51,78,139,0.12);border:1px solid rgba(51,78,139,0.28);color:#334E8B;')
      : 'background:transparent;border:1px solid transparent;color:' + ($isDark ? 'rgba(255,255,255,0.40)' : 'rgba(20,30,80,0.40)') + ';'
  }

  const primaryBtn = 'background:linear-gradient(135deg,rgba(51,78,139,0.65),rgba(46,108,207,0.65));backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.28);box-shadow:0 8px 30px rgba(51,78,139,0.45),inset 0 1px 0 rgba(255,255,255,0.30);'
  const glassBtn   = $derived('background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);')
  const benefitPill = 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.14);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);'
  const googleBtn   = $derived($isDark
    ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.75);'
    : 'background:rgba(240,245,255,0.80);border:1px solid rgba(100,130,220,0.22);color:rgba(20,30,80,0.75);'
  )
  const divLine = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(100,130,220,0.18)')
  const divText = $derived($isDark ? 'rgba(255,255,255,0.28)' : 'rgba(20,30,80,0.35)')
  const bottomFade = $derived($isDark
    ? 'linear-gradient(to bottom,transparent,rgba(5,8,20,1))'
    : 'linear-gradient(to bottom,transparent,rgba(240,245,255,1))'
  )

  const BRANDS = ['Jeep','Fiat','Dodge','Ram','Peugeot']
  const SERVICIOS = [
    { value: 'mantenimiento', label: 'Mantenimiento preventivo' },
    { value: 'revision',      label: 'Revisión general' },
    { value: 'frenos',        label: 'Frenos y suspensión' },
    { value: 'diagnostico',   label: 'Diagnóstico electrónico' },
  ]
</script>

<section {id} class="relative overflow-hidden" style="min-height:100svh;">
  <div class="absolute inset-0 overflow-hidden bg-[#050814] z-0">
    <iframe
      title="VAPSA Hero Video"
      class="absolute left-1/2 -translate-x-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] pointer-events-none opacity-80 top-0 md:top-1/2 md:-translate-y-1/2"
      src="https://www.youtube.com/embed/FzFoLRs7ZIs?autoplay=1&mute=1&loop=1&playlist=FzFoLRs7ZIs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="absolute inset-0" style="background:{overlay1}"></div>
  <div class="absolute inset-0" style="background:radial-gradient(ellipse at 15% 80%,rgba(51,78,139,0.30) 0%,transparent 65%)"></div>

  <!-- ── MOBILE ── -->
  <div class="lg:hidden relative z-10 flex flex-col pt-24 pb-8">
    <div class="flex flex-col px-5 mb-6">
      <div class="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full mb-5"
        style="background:rgba(51,78,139,0.35);border:1px solid rgba(51,78,139,0.60);backdrop-filter:blur(10px);animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.05s both;">
        <Star size={11} class="text-yellow-400" fill="currentColor" />
        <span class="text-xs text-white/80 tracking-wide uppercase">Concesionaria #1 en Rioverde</span>
      </div>
      <h1 class="mb-3" style="color:{textPrimary};font-size:clamp(2.2rem,8vw,3rem);font-weight:800;line-height:1.12;letter-spacing:-0.5px;animation:hero-fade-up 0.72s cubic-bezier(0.22,1,0.36,1) 0.18s both;">
        Tu próximo<br />
        <span style="background:linear-gradient(135deg,{$isDark ? '#7EB3FF,#FFFFFF' : '#334E8B,#1a2040'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:hero-shimmer-text 3.5s ease-in-out 1.8s infinite;">vehículo ideal</span>
        <br />te espera.
      </h1>
      <p class="mb-6 max-w-sm" style="color:{textMuted};font-size:0.92rem;line-height:1.65;animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.30s both;">
        Jeep, FIAT, Dodge, Ram y Peugeot. Financiamiento desde 7.99% y bonos de hasta $200,000.
      </p>
      <div class="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-1" style="mask-image: linear-gradient(to right, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%); animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.42s both;">
        {#each [{icon: Zap, text:'Cotiza en 60 seg.'},{icon:Shield,text:'Financiamiento'},{icon:Star,text:'Test Drive gratis'}] as b (b.text)}
          <div class="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg" style={benefitPill}>
            <b.icon size={12} class="text-blue-400" />
            <span class="text-white/80 text-xs whitespace-nowrap">{b.text}</span>
          </div>
        {/each}
      </div>
      <div class="flex gap-3" style="animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s both;">
        <a href="#"
          class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-semibold active:scale-95 transition-all btn-shine"
          style={primaryBtn}>Test Drive <ChevronRight size={14} /></a>
        <a href="#form-mobile"
          class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white/85 text-sm font-medium active:scale-95 transition-all"
          style={glassBtn}>Cotizar <ChevronDown size={14} /></a>
      </div>
    </div>

    <!-- Form mobile -->
    <div id="form-mobile" class="w-full" style="animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.65s both;">
      <div class="mx-4 mb-6 rounded-2xl overflow-hidden" style={glassForm}>
        <div class="flex gap-2 px-4 pt-4 pb-6" style={formBorder}>
          {#each [{key:'cotizacion',label:'Cotización'},{key:'cita',label:'Cita de Servicio'}] as tab (tab.key)}
            <button onclick={() => activeTab = tab.key as TabKey}
              class="flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
              style={tabStyle(tab.key as TabKey)}>{tab.label}</button>
          {/each}
        </div>
        <div class="px-4 py-4 space-y-3">
          {#if activeTab === 'cotizacion'}
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Nombre *</label>
                <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Apellido *</label>
                <input type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
            </div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Correo *</label>
              <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Teléfono *</label>
              <input type="tel" bind:value={telefono} placeholder="10 dígitos" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Marca *</label>
                <select bind:value={marca} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                  <option value="">Elija marca</option>
                  {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
                </select></div>
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Modelo *</label>
                <select bind:value={modelo} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                  <option value="">Todos</option>
                </select></div>
            </div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Versión *</label>
              <select bind:value={version} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                <option value="">Todas las versiones</option>
              </select></div>
          {:else}
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Nombre *</label>
                <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
              <div><label class="block text-xs mb-1" style="color:{labelColor}">Teléfono *</label>
                <input type="tel" bind:value={telefono} placeholder="10 dígitos" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
            </div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Correo *</label>
              <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/25" style={glassInput} /></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Tipo de Servicio *</label>
              <select bind:value={servicio} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                <option value="">Seleccionar servicio</option>
                {#each SERVICIOS as s (s.value)}<option value={s.value}>{s.label}</option>{/each}
              </select></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Fecha preferida *</label>
              <input type="date" bind:value={fecha} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput + 'color-scheme:' + ($isDark ? 'dark' : 'light') + ';'} /></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Marca del vehículo</label>
              <select bind:value={marca} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                <option value="">Elija marca</option>
                {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
              </select></div>
          {/if}
          <div class="space-y-3 pt-2">
            <label class="flex items-start gap-3 cursor-pointer group">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded mt-0.5 transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if privacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-xs leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="#" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded mt-0.5 transition-all duration-200 flex-shrink-0" style="border:1px solid {ofertas ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{ofertas ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={ofertas} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if ofertas}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-xs" style="color:{checkColor}">Deseo recibir ofertas y novedades.</span>
            </label>
          </div>
          <button type="button" class="w-full py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 active:scale-[0.98] mt-1" style={primaryBtn}>
            {activeTab === 'cotizacion' ? 'Cotiza Ahora' : 'Agendar Cita'}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── DESKTOP ── -->
  <div class="hidden lg:flex relative z-10 w-full px-8 pt-28 pb-12 flex-row items-center gap-12 max-w-7xl mx-auto min-h-screen">
    <!-- Left: Hero text -->
    <div class="flex-1" style="color:{textPrimary}">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
        style="background:{$isDark ? 'rgba(51,78,139,0.35)' : 'rgba(51,78,139,0.10)'};border:1px solid {$isDark ? 'rgba(51,78,139,0.60)' : 'rgba(51,78,139,0.20)'};backdrop-filter:blur(10px);">
        <Star size={12} class="text-yellow-400" fill="currentColor" />
        <span class="text-xs tracking-wider uppercase font-semibold" style="color:{textPrimary}">Concesionaria #1 en Rioverde</span>
      </div>
      <h1 class="mb-4" style="color:{textPrimary};font-size:3.5rem;font-weight:800;line-height:1.1;letter-spacing:-1px;">
        Tu próximo<br />
        <span style="background:linear-gradient(135deg,{$isDark ? '#6B8ED4,#FFFFFF' : '#334E8B,#1a2040'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">vehículo ideal</span>
        <br />te espera.
      </h1>
      <p class="mb-8 max-w-lg" style="color:{textMuted};font-size:1.05rem;line-height:1.7;">
        Jeep, FIAT, Dodge, Ram y Peugeot. Ofertas exclusivas con financiamiento desde 7.99% y bonos de hasta $200,000.
      </p>
      <div class="flex flex-wrap gap-3 mb-8">
        {#each [{icon:Zap,text:'Cotiza en 60 seg.'},{icon:Shield,text:'Financiamiento garantizado'},{icon:Star,text:'Test Drive gratis'}] as b (b.text)}
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg" style={benefitPill}>
            <b.icon size={14} class="text-blue-400" />
            <span class="text-sm font-medium" style="color:{textPrimary}">{b.text}</span>
          </div>
        {/each}
      </div>
      <div class="flex gap-3">
        <a href="#"
          class="flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 btn-shine"
          style={primaryBtn}>Agenda tu Test Drive <ChevronRight size={15} /></a>
        <a href="#"
          class="flex items-center gap-2 px-6 py-3 rounded-full text-white/82 text-sm font-medium hover:text-white transition-all duration-300"
          style={glassBtn}>Ver Modelos</a>
      </div>
    </div>

    <!-- Right: Glass form -->
    <div class="w-[420px] flex-shrink-0 rounded-2xl overflow-hidden" style={glassForm}>
      <div class="px-6 pt-6 pb-4" style={formBorder}>
        <p class="text-xs uppercase tracking-widest mb-1" style="color:{$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,80,0.45)'}">Formulario de ingreso</p>
        <h2 style="font-size:1.25rem;font-weight:700;color:{hColor}">Obtén tu mejor oferta</h2>
      </div>
      <div class="flex gap-2 px-6 pt-5 pb-8">
        {#each [{key:'cotizacion',label:'Cotización'},{key:'cita',label:'Cita de Servicio'}] as tab (tab.key)}
          <button onclick={() => activeTab = tab.key as TabKey}
            class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={tabStyle(tab.key as TabKey)}>{tab.label}</button>
        {/each}
      </div>
      <!-- Form body -->
      <div class="px-6 pb-6 space-y-3">
        {#if activeTab === 'cotizacion'}
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Nombre *</label>
              <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Apellido *</label>
              <input type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
          </div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Correo *</label>
            <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Teléfono *</label>
            <input type="tel" bind:value={telefono} placeholder="10 dígitos" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Marca *</label>
              <select bind:value={marca} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                <option value="">Elija marca</option>
                {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
              </select></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Modelo *</label>
              <select bind:value={modelo} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
                <option value="">Todos</option>
              </select></div>
          </div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Versión *</label>
            <select bind:value={version} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
              <option value="">Todas las versiones</option>
            </select></div>
        {:else}
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Nombre *</label>
              <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
            <div><label class="block text-xs mb-1" style="color:{labelColor}">Teléfono *</label>
              <input type="tel" bind:value={telefono} placeholder="10 dígitos" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
          </div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Correo *</label>
            <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} /></div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Tipo de Servicio *</label>
            <select bind:value={servicio} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
              <option value="">Seleccionar servicio</option>
              {#each SERVICIOS as s (s.value)}<option value={s.value}>{s.label}</option>{/each}
            </select></div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Fecha preferida *</label>
            <input type="date" bind:value={fecha} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput + 'color-scheme:' + ($isDark ? 'dark' : 'light') + ';'} /></div>
          <div><label class="block text-xs mb-1" style="color:{labelColor}">Marca del vehículo</label>
            <select bind:value={marca} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassSelect}>
              <option value="">Elija marca</option>
              {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
            </select></div>
        {/if}
        <div class="space-y-3 pt-2">
          <label class="flex items-start gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded mt-0.5 transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
              <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
              {#if privacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
            </div>
            <span class="text-xs leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="#" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
          </label>
          <label class="flex items-start gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded mt-0.5 transition-all duration-200 flex-shrink-0" style="border:1px solid {ofertas ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{ofertas ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
              <input type="checkbox" bind:checked={ofertas} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
              {#if ofertas}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
            </div>
            <span class="text-xs" style="color:{checkColor}">Deseo recibir ofertas y novedades.</span>
          </label>
        </div>
        <button type="button"
          class="w-full py-3 rounded-full text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2"
          style={primaryBtn}>
          {activeTab === 'cotizacion' ? 'Cotiza Ahora' : 'Agendar Cita'}
        </button>
      </div>
    </div>
  </div>

  <!-- Bottom fade -->
  <div class="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style="background:{bottomFade}"></div>
</section>
