<script lang="ts">
  import { ChevronRight, Star, Shield, Zap, Wrench, ChevronDown, CreditCard, Mail, Phone, Banknote, ArrowRight, MapPin } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  interface Props { 
    id?: string
    onMapClick?: () => void
  }
  let { id, onMapClick }: Props = $props()

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
  let compra        = $state('credito')
  let contactoPref  = $state('telefono')

  const overlay1 = $derived($isDark
    ? 'linear-gradient(135deg,rgba(5,8,20,0.95) 0%,rgba(5,8,20,0.72) 50%,rgba(5,8,20,0.35) 100%)'
    : 'linear-gradient(135deg,rgba(235,240,248,0.85) 0%,rgba(235,240,248,0.55) 50%,rgba(235,240,248,0.15) 100%)'
  )
  const glassForm = $derived($isDark
    ? 'background:rgba(5,7,18,0.25);backdrop-filter:blur(52px) saturate(200%);-webkit-backdrop-filter:blur(52px) saturate(200%);border:1px solid rgba(255,255,255,0.12);box-shadow:0 32px 80px rgba(0,0,0,0.60),inset 0 1px 0 rgba(255,255,255,0.06);'
    : 'background:rgba(255,255,255,0.40);backdrop-filter:blur(52px) saturate(200%);-webkit-backdrop-filter:blur(52px) saturate(200%);border:1px solid rgba(255,255,255,0.85);box-shadow:0 32px 80px rgba(10,30,80,0.20),inset 0 1px 0 rgba(255,255,255,0.98);'
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

{#snippet cotizacionForm()}
      <!-- Google Auth -->
      <button type="button" class="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] cursor-pointer mb-2" style={googleBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continuar con Google
      </button>

      <!-- Divider -->
      <div class="flex items-center gap-3 my-4">
        <div class="flex-1 h-px" style="background:{divLine}"></div>
        <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">O llena el formulario</span>
        <div class="flex-1 h-px" style="background:{divLine}"></div>
      </div>

      <!-- Fields -->
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Nombre</label>
          <input type="text" bind:value={nombre} placeholder="Ej. Juan" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/30 transition-colors" style={glassInput} /></div>
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Apellido</label>
          <input type="text" bind:value={apellido} placeholder="Ej. Pérez" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/30 transition-colors" style={glassInput} /></div>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Email</label>
          <input type="email" bind:value={correo} placeholder="juan@correo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/30 transition-colors" style={glassInput} /></div>
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Teléfono</label>
          <input type="tel" bind:value={telefono} placeholder="55 1234 5678" class="w-full h-10 px-3 rounded-lg text-sm outline-none placeholder:text-white/30 transition-colors" style={glassInput} /></div>
      </div>

      <!-- MODELO DE INTERÉS -->
      <div class="mb-4">
        <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Modelo de interés</label>
        <div class="grid grid-cols-3 gap-2">
          <select bind:value={marca} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect}>
            <option value="">Marca</option>
            {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
          </select>
          <select bind:value={modelo} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect}>
            <option value="">Modelo</option>
          </select>
          <select bind:value={version} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect}>
            <option value="">Versión</option>
          </select>
        </div>
      </div>

      <!-- Action Selectors -->
      <div class="grid grid-cols-2 gap-3 mb-1">
        <!-- Compra -->
        <div>
          <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Método de compra</label>
          <div class="grid grid-cols-2 gap-2">
            <button type="button" onclick={() => compra = 'credito'} class="flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all cursor-pointer border" style="background:{compra === 'credito' ? 'rgba(51,78,139,0.3)' : 'transparent'}; border-color:{compra === 'credito' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};">
              <CreditCard size={15} style="color:{compra === 'credito' ? 'white' : 'rgba(255,255,255,0.5)'}" />
              <span class="text-[10px] font-semibold" style="color:{compra === 'credito' ? 'white' : 'rgba(255,255,255,0.5)'}">Crédito</span>
            </button>
            <button type="button" onclick={() => compra = 'contado'} class="flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all cursor-pointer border" style="background:{compra === 'contado' ? 'rgba(51,78,139,0.3)' : 'transparent'}; border-color:{compra === 'contado' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};">
              <Banknote size={15} style="color:{compra === 'contado' ? 'white' : 'rgba(255,255,255,0.5)'}" />
              <span class="text-[10px] font-semibold" style="color:{compra === 'contado' ? 'white' : 'rgba(255,255,255,0.5)'}">Contado</span>
            </button>
          </div>
        </div>
        <!-- Contacto -->
        <div>
          <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Contacto preferido</label>
          <div class="grid grid-cols-2 gap-2">
            <button type="button" onclick={() => contactoPref = 'email'} class="flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all cursor-pointer border" style="background:{contactoPref === 'email' ? 'rgba(51,78,139,0.3)' : 'transparent'}; border-color:{contactoPref === 'email' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};">
              <Mail size={15} style="color:{contactoPref === 'email' ? 'white' : 'rgba(255,255,255,0.5)'}" />
              <span class="text-[10px] font-semibold" style="color:{contactoPref === 'email' ? 'white' : 'rgba(255,255,255,0.5)'}">Email</span>
            </button>
            <button type="button" onclick={() => contactoPref = 'telefono'} class="flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all cursor-pointer border" style="background:{contactoPref === 'telefono' ? 'rgba(51,78,139,0.3)' : 'transparent'}; border-color:{contactoPref === 'telefono' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};">
              <Phone size={15} style="color:{contactoPref === 'telefono' ? 'white' : 'rgba(255,255,255,0.5)'}" />
              <span class="text-[10px] font-semibold" style="color:{contactoPref === 'telefono' ? 'white' : 'rgba(255,255,255,0.5)'}">Teléfono</span>
            </button>
          </div>
        </div>
      </div>
{/snippet}

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

      <h1 class="mb-3" style="color:{textPrimary};font-size:clamp(2.2rem,8vw,3rem);font-weight:800;line-height:1.12;letter-spacing:-0.5px;animation:hero-fade-up 0.72s cubic-bezier(0.22,1,0.36,1) 0.18s both;">
        Tu próximo<br />
        <span style="background:linear-gradient(135deg,{$isDark ? '#7EB3FF,#FFFFFF' : '#334E8B,#1a2040'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:hero-shimmer-text 3.5s ease-in-out 1.8s infinite;">vehículo ideal</span>
        <br />te espera.
      </h1>
      <p class="mb-6 max-w-sm" style="color:{textMuted};font-size:0.92rem;line-height:1.65;animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.30s both;">
        Jeep, FIAT, Dodge, Ram y Peugeot. Financiamiento desde 7.99% y bonos de hasta $200,000.
      </p>

      <div class="flex gap-3" style="animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.55s both;">
        <a href="#"
          class="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold tracking-wide btn-glow-border"
          >Test Drive <ChevronRight size={14} /></a>
        <a href="#form-mobile"
          class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white/85 text-sm font-medium active:scale-95 transition-all cursor-pointer"
          style={glassBtn}>Cotizar <ChevronDown size={14} /></a>
      </div>
    </div>

    <!-- Form mobile -->
    <div id="form-mobile" class="w-full" style="animation:hero-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.65s both;">
      <div class="mx-4 mb-6 rounded-2xl overflow-hidden" style={glassForm}>
        <div class="flex justify-between items-start px-4 pt-4 pb-2">
          <div>
            <p class="text-[10px] uppercase tracking-widest mb-1 font-semibold" style="color:{$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,80,0.45)'}">Formulario de contacto</p>
            <h2 style="font-size:1.15rem;font-weight:800;color:{hColor}">Obtén tu mejor oferta</h2>
          </div>
          <button onclick={(e) => { e.preventDefault(); onMapClick?.() }} class="flex flex-col items-center justify-center p-2 rounded-xl transition-all hover:scale-105 cursor-pointer" style="background:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,80,0.05)'};color:var(--color-brand-1)">
            <MapPin size={18} />
            <span class="text-[9px] font-bold mt-1 uppercase tracking-wider">Cómo llegar</span>
          </button>
        </div>
        <div class="flex gap-2 px-4 pb-4" style={formBorder}>
          {#each [{key:'cotizacion',label:'Cotización'},{key:'cita',label:'Cita de Servicio'}] as tab (tab.key)}
            <button onclick={() => activeTab = tab.key as TabKey}
              class="flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
              style={tabStyle(tab.key as TabKey)}>{tab.label}</button>
          {/each}
        </div>
        <div class="px-4 py-4 space-y-3">
          {#if activeTab === 'cotizacion'}
            {@render cotizacionForm()}
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
          {#if activeTab === 'cotizacion'}
            <button type="button" class="w-full py-3 text-sm mt-1 btn-glow-border font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer">
              Solicitar Información <ArrowRight size={16} />
            </button>
          {:else}
            <button type="button" class="w-full py-3 text-sm mt-1 btn-glow-border font-bold tracking-wide cursor-pointer">
              Agendar Cita
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- ── DESKTOP ── -->
  <div class="hidden lg:flex relative z-10 w-full px-8 pt-28 pb-12 flex-row items-center gap-12 max-w-7xl mx-auto min-h-screen">
    <!-- Left: Hero text -->
    <div class="flex-1" style="color:{textPrimary}">

      <h1 class="mb-4" style="color:{textPrimary};font-size:3.5rem;font-weight:800;line-height:1.1;letter-spacing:-1px;">
        Tu próximo<br />
        <span style="background:linear-gradient(135deg,{$isDark ? '#6B8ED4,#FFFFFF' : '#334E8B,#1a2040'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">vehículo ideal</span>
        <br />te espera.
      </h1>
      <p class="mb-8 max-w-lg" style="color:{textMuted};font-size:1.05rem;line-height:1.7;">
        Jeep, FIAT, Dodge, Ram y Peugeot. Ofertas exclusivas con financiamiento desde 7.99% y bonos de hasta $200,000.
      </p>

      <div class="flex gap-3">
        <a href="#"
          class="flex items-center gap-2 px-6 py-3 text-sm font-bold btn-glow-border tracking-wide"
          >Agenda tu Test Drive <ChevronRight size={15} /></a>
        <a href="#"
          class="flex items-center gap-2 px-6 py-3 rounded-full text-white/82 text-sm font-medium hover:text-white transition-all duration-300 cursor-pointer"
          style={glassBtn}>Ver Modelos</a>
      </div>
    </div>

    <!-- Right: Glass form -->
    <div class="w-[420px] flex-shrink-0 rounded-2xl overflow-hidden" style={glassForm}>
      <div class="px-6 pt-6 pb-4 flex justify-between items-start" style={formBorder}>
        <div>
          <p class="text-xs uppercase tracking-widest mb-1" style="color:{$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,80,0.45)'}">Formulario de ingreso</p>
          <h2 style="font-size:1.25rem;font-weight:700;color:{hColor}">Obtén tu mejor oferta</h2>
        </div>
        <button onclick={(e) => { e.preventDefault(); onMapClick?.() }} class="flex flex-col items-center justify-center p-2 rounded-xl transition-all hover:scale-105 cursor-pointer" style="background:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,80,0.05)'};color:var(--color-brand-1)">
          <MapPin size={18} />
          <span class="text-[9px] font-bold mt-1 uppercase tracking-wider">Cómo llegar</span>
        </button>
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
          {@render cotizacionForm()}
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
        {#if activeTab === 'cotizacion'}
          <button type="button"
            class="w-full py-3 text-sm mt-2 btn-glow-border font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer">
            Solicitar Información <ArrowRight size={16} />
          </button>
        {:else}
          <button type="button"
            class="w-full py-3 text-sm mt-2 btn-glow-border font-bold tracking-wide cursor-pointer">
            Agendar Cita
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Bottom fade -->
  <div class="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style="background:{bottomFade}"></div>
</section>
