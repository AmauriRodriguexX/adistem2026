<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'
  import ContactFormCard from './ContactFormCard.svelte'

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )

  const T = $derived({
    primary:   $isDark ? 'white'                      : '#1a2040',
    secondary: $isDark ? 'rgba(255,255,255,0.65)'     : 'rgba(20,30,80,0.65)',
  })
</script>

<div class="min-h-screen pt-28 pb-24 px-4 md:px-8 transition-colors duration-500" style="background:{pageBg}">
  <div class="max-w-4xl mx-auto flex flex-col items-start w-full">
    
    <!-- Encabezado Específico -->
    <div class="text-left mb-10 w-full">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 bg-blue-500/10 text-blue-500 border border-blue-500/20">
        <GoogleIcon name="speed" size={16} />
        <span>Vive la Experiencia</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-3" style="color:{T.primary}">
        Prueba de Manejo
      </h1>
      <p class="max-w-xl text-sm md:text-base leading-relaxed" style="color:{T.secondary}">
        Siente el desempeño, confort y tecnología de tu próximo vehículo. Agenda tu prueba de manejo personalizada hoy mismo sin compromiso.
      </p>
    </div>

    <!-- Contenedor del Formulario Desacoplado sin Mapa -->
    <div class="w-full max-w-md">
      <ContactFormCard initialTab="prueba" hideTabs={true} showExtraFields={true} />
    </div>

    <!-- Puntos Clave Inferiores -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t w-full text-left" style="border-color: {$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.12)'}">
      <div>
        <GoogleIcon name="directions_car" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Modelos Disponibles</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Unidades de demostración listas para carretera o ciudad.</p>
      </div>
      <div>
        <GoogleIcon name="schedule" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Horarios a tu medida</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Elige el día y la hora que mejor se adapte a tu agenda.</p>
      </div>
      <div>
        <GoogleIcon name="support_agent" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Asesoría Dedicada</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Te explicamos cada función y sistema de asistencia al volante.</p>
      </div>
    </div>

  </div>
</div>
