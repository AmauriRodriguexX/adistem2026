<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import { ShieldAlert, X, AlertTriangle, CheckCircle, Search, Calendar, Phone } from 'lucide-svelte'
  import { fade, scale } from 'svelte/transition'

  interface Props {
    onClose: () => void
    onScheduleService?: () => void
  }
  let { onClose, onScheduleService }: Props = $props()

  let vin = $state('')
  let isChecking = $state(false)
  let checkResult = $state<'pending' | 'clear' | 'invalid' | null>(null)

  const glassModal = $derived($isDark
    ? 'background:rgba(10, 14, 26, 0.94); backdrop-filter:blur(30px) saturate(200%); border:1px solid rgba(239, 68, 68, 0.25); box-shadow:0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06);'
    : 'background:rgba(255, 255, 255, 0.96); backdrop-filter:blur(30px) saturate(200%); border:1px solid rgba(239, 68, 68, 0.3); box-shadow:0 24px 60px rgba(239,68,68,0.1), inset 0 1px 0 rgba(255,255,255,0.98);'
  )

  const T = $derived({
    primary:   $isDark ? 'white'                      : '#111827',
    secondary: $isDark ? 'rgba(255,255,255,0.75)'     : 'rgba(17,24,39,0.78)',
    muted:     $isDark ? 'rgba(255,255,255,0.45)'     : 'rgba(51,78,139,0.55)',
    inputBg:   $isDark ? 'rgba(255,255,255,0.07)'     : 'rgba(51,78,139,0.05)',
    inputBorder: $isDark ? 'rgba(255,255,255,0.15)'   : 'rgba(51,78,139,0.14)',
  })

  function handleCheck() {
    const cleanVin = vin.trim().toUpperCase()
    if (cleanVin.length !== 17) {
      checkResult = 'invalid'
      return
    }
    isChecking = true
    checkResult = null
    
    setTimeout(() => {
      isChecking = false
      // Simulated rule: if it contains an odd number at the end, it's affected.
      // Else, it's clear.
      const lastChar = cleanVin.charAt(cleanVin.length - 1)
      if (['1', '3', '5', '7', '9', 'A', 'C', 'E', 'G', 'M', 'P'].includes(lastChar)) {
        checkResult = 'pending'
      } else {
        checkResult = 'clear'
      }
    }, 1200)
  }

  function handleVinInput(e: Event) {
    const target = e.target as HTMLInputElement
    vin = target.value.toUpperCase().slice(0, 17)
  }
</script>

<div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
  <div 
    class="w-full max-w-lg rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col relative transition-all duration-300"
    style={glassModal}
    transition:scale={{ start: 0.95, duration: 250 }}
  >
    <!-- Botón Cerrar -->
    <button 
      onclick={onClose}
      class="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 transition-colors cursor-pointer text-gray-400 hover:text-red-500"
      aria-label="Cerrar"
    >
      <X size={20} />
    </button>

    <!-- Encabezado -->
    <div class="flex items-start gap-4 mb-5 mt-2">
      <div class="p-3 rounded-2xl bg-red-500/10 text-red-500 flex-shrink-0 animate-pulse">
        <ShieldAlert size={28} />
      </div>
      <div>
        <span class="text-[10px] font-black uppercase tracking-wider text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
          Aviso Crítico de Seguridad
        </span>
        <h2 class="text-xl md:text-2xl font-black mt-2.5 leading-tight" style="color: {T.primary}">
          Campaña de Reemplazo Bolsas de Aire Takata
        </h2>
      </div>
    </div>

    <!-- Descripción -->
    <div class="space-y-3.5 mb-6 text-xs md:text-sm leading-relaxed" style="color: {T.secondary}">
      <p>
        Stellantis (Jeep, Dodge, RAM, FIAT y Peugeot) ha emitido un llamado a revisión preventivo para el reemplazo de los infladores de bolsas de aire **Takata**.
      </p>
      <p class="font-semibold text-red-500">
        ⚠️ Con el tiempo, el inflador puede degradarse y romperse al desplegarse, proyectando fragmentos metálicos. El reemplazo es 100% GRATUITO.
      </p>
    </div>

    <!-- Buscador de VIN -->
    <div class="p-5 rounded-2xl border mb-6" style="background: {$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(51,78,139,0.03)'}; border-color: {T.inputBorder}">
      <h3 class="text-xs font-bold uppercase tracking-wider mb-2.5" style="color: {T.primary}">
        Verificador de VIN / Número de Chasis
      </h3>
      <p class="text-[11px] mb-4 leading-normal" style="color: {T.muted}">
        Ingresa los 17 caracteres alfanuméricos de tu VIN (ubicado en tu tarjeta de circulación o parabrisas).
      </p>

      <form onsubmit={(e) => { e.preventDefault(); handleCheck() }} class="flex gap-2">
        <div class="relative flex-1">
          <input 
            type="text" 
            placeholder="Ej: 1C4HJXDG9LW..." 
            value={vin}
            oninput={handleVinInput}
            disabled={isChecking}
            class="w-full h-11 px-4 text-xs font-mono font-bold tracking-widest rounded-xl outline-none border transition-all"
            style="background: {T.inputBg}; border-color: {T.inputBorder}; color: {T.primary}"
            maxlength="17"
            required
          />
          <span class="absolute right-3 top-3.5 text-[9.5px] font-bold opacity-60 font-mono" style="color: {T.primary}">
            {vin.length}/17
          </span>
        </div>
        <button 
          type="submit" 
          disabled={isChecking || vin.length !== 17}
          class="h-11 px-5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-[0.98] cursor-pointer bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          {#if isChecking}
            <span class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {:else}
            <Search size={14} />
          {/if}
          Buscar
        </button>
      </form>

      <!-- Resultados del Check -->
      {#if checkResult}
        <div class="mt-4" transition:fade={{ duration: 150 }}>
          {#if checkResult === 'pending'}
            <div class="p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3">
              <AlertTriangle size={18} class="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="text-xs font-black uppercase text-red-500">Vehículo Afectado</h4>
                <p class="text-[11px] mt-1 text-red-600/90 dark:text-red-400/90 leading-relaxed">
                  Tu unidad requiere el reemplazo preventivo del inflador de bolsa de aire. Agenda tu cita de servicio sin costo.
                </p>
                <button 
                  onclick={() => { onClose(); onScheduleService?.() }}
                  class="mt-3 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Calendar size={12} />
                  Agendar Cita Gratis
                </button>
              </div>
            </div>
          {:else if checkResult === 'clear'}
            <div class="p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-start gap-3">
              <CheckCircle size={18} class="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="text-xs font-black uppercase text-green-500">Sin Campañas Pendientes</h4>
                <p class="text-[11px] mt-1 text-green-600 dark:text-green-400 leading-relaxed">
                  Tu vehículo no presenta campañas preventivas de bolsas de aire Takata en nuestro sistema. ¡Buen viaje!
                </p>
              </div>
            </div>
          {:else if checkResult === 'invalid'}
            <p class="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
              <AlertTriangle size={14} /> El VIN ingresado es inválido. Debe tener exactamente 17 caracteres.
            </p>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Footer del Modal -->
    <div class="flex items-center justify-between mt-1 pt-4 border-t" style="border-color: {$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
      <span class="text-[10px] opacity-75" style="color: {T.secondary}">Línea de Atención Recall: <strong class="font-bold">800-505-1020</strong></span>
      <button 
        onclick={onClose}
        class="py-2 px-5 rounded-xl text-xs font-bold transition-all hover:scale-[1.01] cursor-pointer"
        style="background: {$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.06)'}; color: {T.primary}"
      >
        Entendido
      </button>
    </div>

  </div>
</div>
