<script lang="ts">
  import { scale } from 'svelte/transition'
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  let isOpen = $state(false)

  const contacts = [
    { label: 'Ventas',      phone: '(487) 110-8899', href: 'https://wa.me/524871108899?text=Hola,%20me%20interesan%20los%20vehículos%20nuevos' },
    { label: 'Seminuevos',  phone: '(487) 110-8899', href: 'https://wa.me/524871108899?text=Hola,%20busco%20información%20de%20seminuevos' },
    { label: 'Servicio',    phone: '(487) 100-5896', href: 'https://wa.me/524871005896?text=Hola,%20quiero%20agendar%20una%20cita%20de%20servicio' },
    { label: 'Refacciones', phone: '(487) 110-8899', href: 'https://wa.me/524871108899?text=Hola,%20busco%20una%20refacción' },
  ]

  const popupBg = $derived($isDark
    ? 'background:rgba(15,22,45,0.80);border:1px solid rgba(255,255,255,0.10);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 16px 40px rgba(0,0,0,0.5);'
    : 'background:rgba(255,255,255,0.88);border:1px solid rgba(100,130,220,0.20);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);box-shadow:0 16px 40px rgba(30,60,120,0.15);'
  )
  const divider  = $derived($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(100,130,220,0.12)')
  const rowBg    = $derived($isDark ? 'rgba(255,255,255,0.06)'  : 'rgba(20,40,120,0.04)')
  const rowBord  = $derived($isDark ? 'rgba(255,255,255,0.08)'  : 'rgba(20,40,120,0.08)')
  const rowHover = $derived($isDark ? 'rgba(255,255,255,0.11)'  : 'rgba(20,40,120,0.09)')
  const T = $derived({
    primary: $isDark ? 'white'                  : '#1a2040',
    muted:   $isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.50)',
    sub:     $isDark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,80,0.60)',
  })
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
  {#if isOpen}
    <div
      transition:scale={{ duration: 230, start: 0.95, opacity: 0 }}
      class="mb-4 w-72 md:w-80 rounded-3xl overflow-hidden shadow-2xl origin-bottom-right"
      style={popupBg}
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid {divider};">
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:#25D366;box-shadow:0 0 7px #25D366;"></span>
          <span class="text-sm font-bold tracking-tight" style="color:{T.primary}">Contáctanos</span>
        </div>
        <button onclick={() => isOpen = false} class="transition-opacity hover:opacity-100 opacity-50 cursor-pointer" style="color:{T.primary}">
          <GoogleIcon name="close" size={16} />
        </button>
      </div>

      <!-- Subtitle -->
      <p class="px-5 pt-4 pb-3 text-[13px]" style="color:{T.sub}">Hola, escríbenos al número que prefieras:</p>

      <!-- Contact rows -->
      <div class="flex flex-col gap-2 px-4 pb-5">
        {#each contacts as c}
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
            style="background:{rowBg};border:1px solid {rowBord};"
            onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = rowHover}
            onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = rowBg}
          >
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style="background:linear-gradient(135deg,#25D366,#128C7E);">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="w-5 h-5 object-contain" />
            </div>
            <div class="flex-1 leading-none">
              <p class="text-[11px] font-semibold mb-0.5" style="color:{T.muted}">{c.label}</p>
              <p class="text-[14px] font-black tracking-wide" style="color:{T.primary}">{c.phone}</p>
            </div>
            <GoogleIcon name="chevron_right" size={18} style="color:{T.muted}" />
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
