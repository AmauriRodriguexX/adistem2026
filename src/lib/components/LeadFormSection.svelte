<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import ContactFormCard from './ContactFormCard.svelte'
  
  interface Props {
    id?: string
    accent?: string
  }
  let { id, accent = '#334E8B' }: Props = $props()
  
  let formCardComponent: any = $state()

  export function highlight() {
    formCardComponent?.triggerHighlight()
  }
</script>

<section {id} class="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
  <div class="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">
    <div class="text-center lg:text-left flex-1">
      <p class="text-xs uppercase tracking-[0.2em] font-black mb-3" style="color:{accent}">Contacto directo</p>
      <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4" style="color:{$isDark ? 'white' : '#1a2040'}">
        Comienza tu <span style="background:linear-gradient(135deg,{accent},#4C8EF0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">experiencia VAPSA</span>
      </h2>
      <p class="text-sm md:text-base max-w-xl mx-auto lg:mx-0 opacity-60" style="color:{$isDark ? 'white' : '#1a2040'}">
        Solicita una cotización personalizada o agenda tu cita de servicio en menos de un minuto.
      </p>
    </div>

    <div class="w-full flex justify-center lg:justify-end">
      <ContactFormCard {accent} bind:this={formCardComponent} />
    </div>
  </div>
  
  <div class="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20 blur-[100px] -z-10"
       style="background:radial-gradient(circle,{accent},transparent 70%); transform:translate(30%,-30%);"></div>
</section>
