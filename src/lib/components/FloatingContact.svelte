<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  let isOpen = $state(false)

  const options = [
    { label: 'Ventas',     href: 'https://wa.me/524871108899?text=Hola,%20me%20interesan%20los%20vehículos%20nuevos' },
    { label: 'Seminuevos', href: 'https://wa.me/524871108899?text=Hola,%20busco%20información%20de%20seminuevos' },
    { label: 'Seguros',    href: 'https://wa.me/524871108899?text=Hola,%20necesito%20cotizar%20un%20seguro' },
    { label: 'Servicio',   href: 'https://wa.me/524871108899?text=Hola,%20quiero%20agendar%20una%20cita%20de%20servicio' },
    { label: 'Refacciones',href: 'https://wa.me/524871108899?text=Hola,%20busco%20una%20refacción' },
  ]

  const popupBg = $derived($isDark 
    ? 'background:rgba(15,22,45,0.75);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 16px 40px rgba(0,0,0,0.5);' 
    : 'background:rgba(255,255,255,0.80);border:1px solid rgba(100,130,220,0.2);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 16px 40px rgba(30,60,120,0.15);'
  )
  const btnBg = $derived($isDark
    ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.05);'
    : 'background:rgba(20,40,120,0.04);border:1px solid rgba(20,40,120,0.08);'
  )
  const btnHoverBg = $derived($isDark
    ? 'background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.15);'
    : 'background:rgba(20,40,120,0.08);border:1px solid rgba(20,40,120,0.16);'
  )
  const textPrimary = $derived($isDark ? 'text-white' : 'text-[#1a2040]')
  const textMuted = $derived($isDark ? 'text-white/60' : 'text-[#1a2040]/60')
  const iconColor = $derived($isDark ? 'text-white/40 group-hover:text-white/80' : 'text-[#1a2040]/40 group-hover:text-[#1a2040]/80')
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
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            class="w-full h-full object-contain p-2" 
            style="background: #25D366;"
          />
        </div>
        <div>
          <h4 class="{textPrimary} font-bold text-[15px] leading-tight tracking-tight">Contáctanos por WhatsApp</h4>
          <p class="{textMuted} text-[10px] font-bold tracking-wider mt-1 uppercase">Respuesta Inmediata</p>
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
            onmouseenter={(e) => e.currentTarget.style.cssText = btnHoverBg}
            onmouseleave={(e) => e.currentTarget.style.cssText = btnBg}
          >
            <span class="{textPrimary} text-[15px] font-semibold">{opt.label}</span>
            <GoogleIcon name="arrow_forward" size={16} class="{iconColor} transition-colors" />
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Floating Button -->
  <button
    onclick={() => isOpen = !isOpen}
    class="flex items-center justify-center w-14 h-14 transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
    style="background: transparent;"
    aria-label="WhatsApp Contact"
  >
    {#if isOpen}
      <div class="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl bg-[#ef4444]">
        <GoogleIcon name="close" size={26} />
      </div>
    {:else}
      <div class="w-full h-full flex items-center justify-center drop-shadow-xl">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          class="w-13 h-13 object-contain"
          style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); padding: 10px; border-radius: 28%;"
        />
      </div>
    {/if}
  </button>
</div>
