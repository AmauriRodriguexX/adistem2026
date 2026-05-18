<script lang="ts">
  import { CreditCard, Mail, Phone, Banknote } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  interface Props {
    accent?: string
    initialTab?: 'cotizacion' | 'cita' | 'prueba'
    hideTabs?: boolean
    showExtraFields?: boolean
  }
  let { accent = '#334E8B', initialTab = 'cotizacion', hideTabs = false, showExtraFields = false }: Props = $props()

  let isHighlighted = $state(false)
  export function triggerHighlight() {
    isHighlighted = false
    // Force reflow so re-triggering restarts animation
    requestAnimationFrame(() => {
      isHighlighted = true
      setTimeout(() => { isHighlighted = false }, 2000)
    })
  }

  type TabKey = 'cotizacion' | 'cita' | 'prueba'
  let activeTab     = $state<TabKey>(initialTab)
  let nombre        = $state('')
  let apellido      = $state('')
  let correo        = $state('')
  let telefono      = $state('')
  let marca         = $state('')
  let modelo        = $state('')
  let version       = $state('')
  let fecha         = $state('')
  let servicio      = $state('')
  let citaStep      = $state(1)
  let vehiculoAno   = $state('')
  let vehiculoMarca = $state('')
  let vehiculoModelo = $state('')
  let vehiculoVersion = $state('')
  let citaHorario   = $state('')
  let citaComentarios = $state('')
  let cotizacionComentarios = $state('')
  let pruebaFecha   = $state('')
  let pruebaHorario = $state('')
  let pruebaComentarios = $state('')
  let privacidad    = $state(false)
  let marketing     = $state(false)
  let compra        = $state('credito')
  let contactoPref  = $state('telefono')

  const glassForm = $derived($isDark
    ? 'background:rgb(5 7 18 / 54%);backdrop-filter:blur(65px) saturate(200%);-webkit-backdrop-filter:blur(65px) saturate(200%);border:1px solid rgba(255,255,255,0.12);box-shadow:rgba(0,0,0,0.6) 0px 32px 80px,rgba(255,255,255,0.06) 0px 1px 0px inset;'
    : 'background:rgba(255,255,255,0.40);backdrop-filter:blur(52px) saturate(200%);-webkit-backdrop-filter:blur(52px) saturate(200%);border:1px solid rgba(255,255,255,0.85);box-shadow:0 32px 80px rgba(10,30,80,0.20),inset 0 1px 0 rgba(255,255,255,0.98);'
  )
  const glassInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const glassSelect = $derived($isDark
    ? 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const labelColor = $derived($isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.55)')
  const checkColor = $derived($isDark ? 'rgba(255,255,255,0.42)' : 'rgba(20,30,80,0.48)')
  const formBorder = $derived($isDark ? 'border-bottom:1px solid rgba(255,255,255,0.08);' : 'border-bottom:1px solid rgba(100,130,220,0.14);')

  function tabStyle(key: TabKey) {
    return activeTab === key
      ? ($isDark
          ? `background:${accent}44;border:1px solid ${accent}aa;color:white;`
          : `background:${accent}12;border:1px solid ${accent}44;color:${accent};`)
      : 'background:transparent;border:1px solid transparent;color:' + ($isDark ? 'rgba(255,255,255,0.40)' : 'rgba(20,30,80,0.40)') + ';'
  }

  function setActiveTab(key: TabKey) {
    activeTab = key
    if (key === 'cita') citaStep = 1
  }

  function stepStyle(step: number) {
    const active = citaStep === step
    if (active) {
      return $isDark
        ? `background:${accent}44;border:1px solid ${accent}aa;color:white;box-shadow:0 8px 24px ${accent}33;`
        : `background:${accent}14;border:1px solid ${accent}55;color:${accent};box-shadow:0 8px 22px ${accent}18;`
    }
    return $isDark
      ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.44);'
      : 'background:rgba(255,255,255,0.45);border:1px solid rgba(100,130,220,0.12);color:rgba(20,30,80,0.46);'
  }

  function handlePrimaryAction() {
    if (activeTab === 'cita' && citaStep === 1) {
      if (!citaStepOneComplete) return
      citaStep = 2
    }
  }

  function goToCitaVehicleStep() {
    if (!citaStepOneComplete) return
    citaStep = 2
  }

  const primaryBtn = $derived(`background:linear-gradient(135deg,${accent},#2E6CCF);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.28);box-shadow:0 8px 30px ${accent}66,inset 0 1px 0 rgba(255,255,255,0.30);`)
  const googleBtn   = $derived($isDark
    ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.75);'
    : 'background:rgba(240,245,255,0.80);border:1px solid rgba(100,130,220,0.22);color:rgba(20,30,80,0.75);'
  )
  const divLine = $derived($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(100,130,220,0.18)')
  const divText = $derived($isDark ? 'rgba(255,255,255,0.28)' : 'rgba(20,30,80,0.35)')
  const citaStepOneComplete = $derived(
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    correo.trim().length > 0 &&
    telefono.trim().length > 0
  )
  const citaComplete = $derived(
    citaStepOneComplete &&
    vehiculoAno.trim().length > 0 &&
    vehiculoMarca.trim().length > 0 &&
    vehiculoModelo.trim().length > 0 &&
    vehiculoVersion.trim().length > 0 &&
    servicio.trim().length > 0 &&
    fecha.trim().length > 0 &&
    citaHorario.trim().length > 0 &&
    privacidad
  )
  const cotizacionComplete = $derived(
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    correo.trim().length > 0 &&
    telefono.trim().length > 0 &&
    marca.trim().length > 0 &&
    modelo.trim().length > 0 &&
    version.trim().length > 0 &&
    privacidad
  )
  const pruebaComplete = $derived(
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    correo.trim().length > 0 &&
    telefono.trim().length > 0 &&
    marca.trim().length > 0 &&
    modelo.trim().length > 0 &&
    pruebaFecha.trim().length > 0 &&
    pruebaHorario.trim().length > 0 &&
    privacidad
  )

  const BRANDS = ['Jeep','Fiat','Dodge','Ram','Peugeot']
  const VEHICLE_YEARS = ['2026','2025','2024','2023','2022','2021','2020','2019','2018','2017','2016']

  // 1 modelo por marca (con año)
  const VEHICLE_MODELS: Record<string, string[]> = {
    Jeep:    ['Renegade 2026'],
    Fiat:    ['Pulse 2026'],
    Dodge:   ['Attitude 2026'],
    Ram:     ['1500 2026'],
    Peugeot: ['5008 2026'],
  }

  // 1 versión por modelo
  const VEHICLE_VERSIONS: Record<string, Record<string, string[]>> = {
    Jeep:    { 'Renegade 2026':  ['Latitude'] },
    Fiat:    { 'Pulse 2026':     ['Drive'] },
    Dodge:   { 'Attitude 2026':  ['SXT'] },
    Ram:     { '1500 2026':      ['Tungsten'] },
    Peugeot: { '5008 2026':      ['GT'] },
  }

  const HORARIOS = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00']
  const modelosServicio  = $derived(VEHICLE_MODELS[vehiculoMarca] ?? [])
  const modelosPrueba    = $derived(VEHICLE_MODELS[marca] ?? [])
  const versionesCotiz   = $derived(VEHICLE_VERSIONS[marca]?.[modelo] ?? [])
  const versionesServicio = $derived(VEHICLE_VERSIONS[vehiculoMarca]?.[vehiculoModelo] ?? [])
  const SERVICIOS = [
    { value: 'mantenimiento', label: 'Mantenimiento preventivo' },
    { value: 'revision',      label: 'Revisión general' },
    { value: 'frenos',        label: 'Frenos y suspensión' },
    { value: 'diagnostico',   label: 'Diagnóstico electrónico' },
  ]
</script>

<div class="w-full max-w-[440px] flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-700 mx-auto {isHighlighted ? 'card-glow-highlighted' : ''}" 
     style="{glassForm}">
  {#if !hideTabs}
    <div class="grid grid-cols-3 gap-2 px-4 pt-5 pb-4 sm:px-6 sm:pt-6" style={formBorder}>
      {#each [{key:'cotizacion',label:'Cotización'},{key:'cita',label:'Cita servicio'},{key:'prueba',label:'Prueba de manejo'}] as tab (tab.key)}
        <button onclick={() => setActiveTab(tab.key as TabKey)}
          class="min-h-10 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold leading-tight transition-all duration-200 cursor-pointer"
          style={tabStyle(tab.key as TabKey)}>{tab.label}</button>
      {/each}
    </div>
  {/if}
  <div class="flex-1 p-6 space-y-4 overflow-y-auto">
    {#if activeTab === 'cotizacion'}
      <button type="button" class="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] cursor-pointer" style={googleBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continuar con Google
      </button>
      <div class="flex items-center gap-3">
        <div class="flex-1 h-px" style="background:{divLine}"></div>
        <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">O llena el formulario</span>
        <div class="flex-1 h-px" style="background:{divLine}"></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Nombre *</label>
          <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Apellido *</label>
          <input type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Email *</label>
          <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
        <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Teléfono *</label>
          <input type="tel" bind:value={telefono} placeholder="55 1234 5678" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
      </div>
      <div>
        <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Modelo de interés *</label>
        <div class="grid grid-cols-3 gap-2">
          <select bind:value={marca} onchange={() => { modelo = ''; version = '' }} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect} required>
            <option value="">Marca</option>
            {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
          </select>
          <select bind:value={modelo} onchange={() => version = ''} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect} required>
            <option value="">Modelo</option>
            {#each modelosPrueba as item (item)}<option value={item}>{item}</option>{/each}
          </select>
          <select bind:value={version} class="w-full h-10 px-2 rounded-lg text-xs outline-none cursor-pointer" style={glassSelect} required>
            <option value="">Versión</option>
            {#each versionesCotiz as item (item)}<option value={item}>{item}</option>{/each}
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
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

      {#if showExtraFields}
        <div>
          <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Comentarios (Opcional)</label>
          <textarea bind:value={cotizacionComentarios} rows="2" placeholder="Requerimientos de enganche, plazo o versión específica..." class="w-full p-3 rounded-lg text-sm outline-none resize-none" style={glassInput}></textarea>
        </div>
      {/if}

      <div class="space-y-2.5 pt-3 mt-1 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
        <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
          <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
            <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
            {#if privacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
          </div>
          <span class="text-[10px] leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="#" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
          <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {marketing ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{marketing ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
            <input type="checkbox" bind:checked={marketing} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
            {#if marketing}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
          </div>
          <span class="text-[10px] leading-relaxed" style="color:{checkColor}">Deseo recibir ofertas y novedades</span>
        </label>
      </div>
    {:else if activeTab === 'cita'}
      <div class="space-y-4">
        <button type="button" class="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] cursor-pointer" style={googleBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <div class="grid grid-cols-2 gap-2">
          <button type="button" onclick={() => citaStep = 1} class="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all cursor-pointer" style={stepStyle(1)}>
            <span class="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black" style="background:{citaStep === 1 ? accent : (citaStepOneComplete ? '#10B981' : 'rgba(255,255,255,0.08)')};color:white;">
              {#if citaStep === 2 && citaStepOneComplete}✓{:else}1{/if}
            </span>
            <span class="min-w-0">
              <strong class="block text-[11px] leading-tight">Contacto</strong>
              <small class="block truncate text-[9px] opacity-60">Tus datos</small>
            </span>
          </button>
          <button
            type="button"
            onclick={goToCitaVehicleStep}
            disabled={!citaStepOneComplete}
            class="flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all disabled:cursor-not-allowed disabled:opacity-45"
            style={`${stepStyle(2)}${!citaStepOneComplete ? 'filter:grayscale(0.35);' : 'cursor:pointer;'}`}>
            <span class="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black" style="background:{citaStep === 2 ? accent : 'rgba(255,255,255,0.08)'};color:white;">2</span>
            <span class="min-w-0">
              <strong class="block text-[11px] leading-tight">Vehículo</strong>
              <small class="block truncate text-[9px] opacity-60">Servicio y horario</small>
            </span>
          </button>
        </div>

        {#if citaStep === 1}
          <div class="flex items-center gap-3">
            <div class="flex-1 h-px" style="background:{divLine}"></div>
            <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Datos de contacto</span>
            <div class="flex-1 h-px" style="background:{divLine}"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Nombre *</label>
              <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Apellido *</label>
              <input type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Email *</label>
              <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Teléfono *</label>
              <input type="tel" bind:value={telefono} placeholder="55 1234 5678" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
          </div>
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
        {:else}
          <div class="flex items-center justify-between pb-1 pt-0.5">
            <button type="button" onclick={() => citaStep = 1} class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer border hover:-translate-x-1" style="background:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.06)'}; border-color:{$isDark ? 'rgba(255,255,255,0.12)' : 'rgba(51,78,139,0.15)'}; color:{$isDark ? 'rgba(255,255,255,0.9)' : accent};">
              <span class="text-sm leading-none">&larr;</span> Volver a Contacto
            </button>
            <span class="text-[10px] font-medium opacity-50" style="color:{$isDark ? 'white' : '#111827'}">Paso 2 de 2</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex-1 h-px" style="background:{divLine}"></div>
            <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Datos del vehículo</span>
            <div class="flex-1 h-px" style="background:{divLine}"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Año *</label>
              <select bind:value={vehiculoAno} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                <option value="">Año</option>
                {#each VEHICLE_YEARS as year (year)}<option value={year}>{year}</option>{/each}
              </select></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Marca *</label>
              <select bind:value={vehiculoMarca} onchange={() => { vehiculoModelo = ''; vehiculoVersion = '' }} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                <option value="">Marca</option>
                {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
              </select></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Modelo *</label>
              <select bind:value={vehiculoModelo} onchange={() => vehiculoVersion = ''} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                <option value="">Modelo</option>
                {#each modelosServicio as model (model)}<option value={model}>{model}</option>{/each}
              </select></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Versión *</label>
              <select bind:value={vehiculoVersion} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                <option value="">Versión</option>
                {#each versionesServicio as item (item)}<option value={item}>{item}</option>{/each}
              </select></div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex-1 h-px" style="background:{divLine}"></div>
            <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Agenda de servicio</span>
            <div class="flex-1 h-px" style="background:{divLine}"></div>
          </div>
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Tipo de servicio *</label>
            <select bind:value={servicio} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
              <option value="">Selecciona servicio</option>
              {#each SERVICIOS as s}<option value={s.value}>{s.label}</option>{/each}
            </select></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Día de la cita *</label>
              <input type="date" bind:value={fecha} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
            <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Horario *</label>
              <select bind:value={citaHorario} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                <option value="">Hora</option>
                {#each HORARIOS as hora (hora)}<option value={hora}>{hora}</option>{/each}
              </select></div>
          </div>

          {#if showExtraFields}
            <div>
              <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Comentarios (Opcional)</label>
              <textarea bind:value={citaComentarios} rows="2" placeholder="Detalles de la falla o requerimiento especial..." class="w-full p-3 rounded-lg text-sm outline-none resize-none" style={glassInput}></textarea>
            </div>
          {/if}

          <div class="space-y-2.5 pt-3 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
            <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if privacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-[10px] leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="#" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {marketing ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{marketing ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={marketing} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if marketing}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-[10px] leading-relaxed" style="color:{checkColor}">Deseo recibir ofertas y novedades</span>
            </label>
          </div>
        {/if}
      </div>
    {:else}
      <div class="space-y-4">
        <button type="button" class="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] cursor-pointer" style={googleBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px" style="background:{divLine}"></div>
          <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Datos de contacto</span>
          <div class="flex-1 h-px" style="background:{divLine}"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Nombre *</label>
            <input type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Apellido *</label>
            <input type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Email *</label>
            <input type="email" bind:value={correo} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Teléfono *</label>
            <input type="tel" bind:value={telefono} placeholder="55 1234 5678" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex-1 h-px" style="background:{divLine}"></div>
          <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Modelo de interés</span>
          <div class="flex-1 h-px" style="background:{divLine}"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Marca *</label>
            <select bind:value={marca} onchange={() => modelo = ''} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
              <option value="">Marca</option>
              {#each BRANDS as m (m)}<option value={m}>{m}</option>{/each}
            </select></div>
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Modelo *</label>
            <select bind:value={modelo} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
              <option value="">Modelo</option>
              {#each modelosPrueba as model (model)}<option value={model}>{model}</option>{/each}
            </select></div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex-1 h-px" style="background:{divLine}"></div>
          <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{divText}">Agenda de prueba</span>
          <div class="flex-1 h-px" style="background:{divLine}"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Día de la cita *</label>
            <input type="date" bind:value={pruebaFecha} class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required /></div>
          <div><label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Horario *</label>
            <select bind:value={pruebaHorario} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
              <option value="">Hora</option>
              {#each HORARIOS as hora (hora)}<option value={hora}>{hora}</option>{/each}
            </select></div>
        </div>

        {#if showExtraFields}
          <div>
            <label class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Comentarios (Opcional)</label>
            <textarea bind:value={pruebaComentarios} rows="2" placeholder="Indicaciones o dudas previas a la prueba..." class="w-full p-3 rounded-lg text-sm outline-none resize-none" style={glassInput}></textarea>
          </div>
        {/if}

        <div class="space-y-2.5 pt-3 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
          <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
            <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
              <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
              {#if privacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
            </div>
            <span class="text-[10px] leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="#" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
            <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {marketing ? accent : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{marketing ? accent : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
              <input type="checkbox" bind:checked={marketing} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
              {#if marketing}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
            </div>
            <span class="text-[10px] leading-relaxed" style="color:{checkColor}">Deseo recibir ofertas y novedades</span>
          </label>
        </div>
      </div>
    {/if}
    <button
      class="w-full py-3.5 mt-2 btn-glow-border font-bold text-sm tracking-wide disabled:cursor-not-allowed disabled:opacity-55"
      style={`${primaryBtn}${(activeTab === 'cotizacion' && !cotizacionComplete) || (activeTab === 'cita' && citaStep === 1 && !citaStepOneComplete) || (activeTab === 'cita' && citaStep === 2 && !citaComplete) || (activeTab === 'prueba' && !pruebaComplete) ? 'filter:grayscale(0.35);' : 'cursor:pointer;'}`}
      disabled={(activeTab === 'cotizacion' && !cotizacionComplete) || (activeTab === 'cita' && citaStep === 1 && !citaStepOneComplete) || (activeTab === 'cita' && citaStep === 2 && !citaComplete) || (activeTab === 'prueba' && !pruebaComplete)}
      onclick={handlePrimaryAction}>
      {activeTab === 'cotizacion' ? 'Solicitar información' : activeTab === 'cita' ? (citaStep === 1 ? 'Continuar con datos del vehículo' : 'Agendar cita') : 'Agendar prueba de manejo'}
    </button>
  </div>
</div>

<style>
  :global(input[type="date"]::-webkit-calendar-picker-indicator) {
    filter: invert(1) brightness(2) !important;
    cursor: pointer;
  }
</style>
