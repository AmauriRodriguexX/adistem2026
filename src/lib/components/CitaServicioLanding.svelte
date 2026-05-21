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
        <GoogleIcon name="build" size={16} />
        <span>Taller Certificado</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-3" style="color:{T.primary}">
        Formulario para cita de servicio
      </h1>
      <p class="max-w-xl text-sm md:text-base leading-relaxed" style="color:{T.secondary}">
        Programa tu servicio de mantenimiento con técnicos certificados y refacciones originales garantizadas.
      </p>
    </div>

    <!-- Contenedor del Formulario Desacoplado sin Mapa -->
    <div class="w-full max-w-md">
      <ContactFormCard initialTab="cita" hideTabs={true} showExtraFields={true} />
    </div>

    <!-- Puntos Clave Inferiores -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t w-full text-left" style="border-color: {$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.12)'}">
      <div>
        <GoogleIcon name="workspace_premium" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Mano de Obra Calificada</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Especialistas capacitados bajo estándares de fábrica.</p>
      </div>
      <div>
        <GoogleIcon name="settings" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Refacciones Originales</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Garantía de rendimiento y durabilidad superior.</p>
      </div>
      <div>
        <GoogleIcon name="bolt" size={24} class="text-blue-500 mb-1" />
        <h4 class="text-xs font-bold uppercase tracking-wider" style="color:{T.primary}">Servicio Express</h4>
        <p class="text-[11px] mt-0.5" style="color:{T.secondary}">Mantenimientos básicos listos el mismo día.</p>
      </div>
    </div>

  </div>
</div>
