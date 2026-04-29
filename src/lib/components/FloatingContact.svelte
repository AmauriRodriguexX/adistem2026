<script lang="ts">
  import { MessageCircle, X, ArrowRight } from 'lucide-svelte'
  import { fade, scale } from 'svelte/transition'
  import { isDark } from '$lib/stores/theme'

  let isOpen = $state(false)

  const options = [
    { label: 'Ventas',     href: 'https://wa.me/524871108899?text=Hola,%20me%20interesan%20los%20vehículos%20nuevos' },
    { label: 'Seminuevos', href: 'https://wa.me/524871108899?text=Hola,%20busco%20información%20de%20seminuevos' },
    { label: 'Seguros',    href: 'https://wa.me/524871108899?text=Hola,%20necesito%20cotizar%20un%20seguro' },
    { label: 'Servicio',   href: 'https://wa.me/524871108899?text=Hola,%20quiero%20agendar%20una%20cita%20de%20servicio' },
    { label: 'Refacciones',href: 'https://wa.me/524871108899?text=Hola,%20busco%20una%20refacción' },
  ]

  const popupBg = $derived($isDark 
    ? 'background:#212121;border:1px solid rgba(255,255,255,0.08);' 
    : 'background:#303030;border:1px solid rgba(0,0,0,0.1);'
  )
  const btnBg = $derived($isDark
    ? 'background:#333333;border:1px solid rgba(255,255,255,0.06);'
    : 'background:#404040;border:1px solid rgba(255,255,255,0.08);'
  )
  const btnHoverBg = $derived($isDark
    ? 'background:#444444;'
    : 'background:#4d4d4d;'
  )
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
  {#if isOpen}
    <div 
      transition:scale={{ duration: 250, start: 0.95, opacity: 0 }}
      class="mb-4 w-72 md:w-80 rounded-3xl p-6 shadow-2xl origin-bottom-right"
      style={popupBg}
    >
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style="background:#25D366;">
          <MessageCircle size={26} class="text-white" fill="currentColor" />
        </div>
        <div>
          <h4 class="text-white font-bold text-[15px] leading-tight tracking-tight">Contáctanos por WhatsApp</h4>
          <p class="text-white/50 text-[10px] font-bold tracking-wider mt-1 uppercase">Respuesta Inmediata</p>
        </div>
      </div>

      <!-- Options -->
      <div class="flex flex-col gap-3">
        {#each options as opt}
          <a
            href={opt.href}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-200"
            style={btnBg}
            onmouseenter={(e) => e.currentTarget.style.cssText = btnHoverBg + 'border:1px solid rgba(255,255,255,0.12);'}
            onmouseleave={(e) => e.currentTarget.style.cssText = btnBg}
          >
            <span class="text-white text-[15px] font-semibold">{opt.label}</span>
            <ArrowRight size={16} class="text-white/40 group-hover:text-white/80 transition-colors" />
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Floating Button -->
  <button
    onclick={() => isOpen = !isOpen}
    class="flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
    style="background: {isOpen ? '#ef4444' : '#25D366'};"
    aria-label="WhatsApp Contact"
  >
    {#if isOpen}
      <X size={26} />
    {:else}
      <MessageCircle size={30} fill="currentColor" />
    {/if}
  </button>
</div>
