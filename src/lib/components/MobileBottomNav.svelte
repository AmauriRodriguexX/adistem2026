<script lang="ts">
  import { Calculator, Wrench, Gauge, Phone, MessageCircle, X, ChevronRight } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  const LINKS = [
    { icon: Calculator,    label: 'Cotizar',    href: '#', isWA: false },
    { icon: Wrench,        label: 'Servicio',   href: '#', isWA: false },
    { icon: Gauge,         label: 'Test Drive', href: '#', isWA: false },
    { icon: Phone,         label: 'Contacto',   href: '#', isWA: false },
    { icon: MessageCircle, label: 'WhatsApp',   href: '#', isWA: true  },
  ] as const

  const WA_CONTACTS = [
    { label: 'Ventas',   number: '524871108899', display: '(487) 110-8899' },
    { label: 'Servicio', number: '524871005896', display: '(487) 100-5896' },
  ]

  const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

  let waOpen = $state(false)

  const BD_FILTER   = 'url(#lg-frosted) blur(48px) saturate(200%)'
  const navTint     = $derived($isDark ? 'rgba(6,8,22,0.78)' : 'rgba(255,255,255,0.82)')
  const sheetTint   = $derived($isDark ? 'rgba(7,10,26,0.94)' : 'rgba(255,255,255,0.96)')
  const navSpecular = $derived($isDark
    ? 'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.05) 30%,transparent 70%)'
    : 'linear-gradient(180deg,rgba(255,255,255,1.00) 0%,rgba(255,255,255,0.55) 25%,transparent 65%)'
  )
  const navShadow   = $derived($isDark
    ? '0 0 0 1.5px rgba(255,255,255,0.20),0 -6px 32px rgba(0,0,0,0.60),0 8px 24px rgba(0,0,0,0.20)'
    : '0 0 0 1.5px rgba(255,255,255,0.90),0 -6px 32px rgba(20,40,120,0.14),0 8px 24px rgba(20,40,120,0.06)'
  )
  const sheetShadow = $derived($isDark
    ? '0 0 0 1.5px rgba(255,255,255,0.18),0 -12px 48px rgba(0,0,0,0.70)'
    : '0 0 0 1.5px rgba(255,255,255,0.95),0 -12px 48px rgba(20,40,120,0.20)'
  )
  const navBorder   = $derived($isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.75)')
  const textMuted   = $derived($isDark ? 'rgba(255,255,255,0.48)' : 'rgba(20,30,80,0.50)')
  const divider     = $derived($isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(100,130,220,0.12)')
  const noiseBlend  = $derived($isDark ? 'soft-light' : 'overlay')
</script>

{#if waOpen}
  <!-- Scrim -->
  <div class="fixed inset-0 z-40 md:hidden"
    style="background:rgba(0,0,0,0.48);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);"
    onclick={() => waOpen = false}></div>

  <!-- WA Sheet -->
  <div class="fixed z-50 md:hidden"
    style="left:16px;right:16px;bottom:calc(96px + env(safe-area-inset-bottom,0px));border-radius:22px;isolation:isolate;overflow:hidden;box-shadow:{sheetShadow};">
    <div style="position:absolute;inset:0;backdrop-filter:{BD_FILTER};-webkit-backdrop-filter:{BD_FILTER};z-index:0;"></div>
    <div style="position:absolute;inset:0;background:{sheetTint};z-index:1;"></div>
    <div style="position:absolute;inset:0;background:{$isDark ? 'linear-gradient(180deg,rgba(255,255,255,0.16) 0%,rgba(255,255,255,0.04) 25%,transparent 60%)' : 'linear-gradient(180deg,rgba(255,255,255,1.00) 0%,rgba(255,255,255,0.60) 20%,transparent 55%)'};pointer-events:none;z-index:3;"></div>
    <div style="position:absolute;inset:0;opacity:0.022;background-image:{NOISE_SVG};background-size:128px 128px;pointer-events:none;z-index:4;mix-blend-mode:{noiseBlend};"></div>
    <div style="position:absolute;inset:0;border-radius:22px;border:{navBorder};pointer-events:none;z-index:5;"></div>

    <div style="position:relative;z-index:6;">
      <div class="flex items-center justify-between px-5 py-4" style="border-bottom:{divider}">
        <div class="flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span class="text-sm font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">VAPSA — Contáctanos</span>
        </div>
        <button onclick={() => waOpen = false} class="p-1" style="color:{textMuted}"><X size={16} /></button>
      </div>
      <div class="p-4 space-y-3">
        <p class="text-xs mb-3" style="color:{textMuted}">Hola 👋 Escríbenos al número que prefieras:</p>
        {#each WA_CONTACTS as c (c.number)}
          <a href="https://wa.me/{c.number}?text=Hola,%20me%20interesa%20informaci%C3%B3n%20sobre%20sus%20veh%C3%ADculos"
            target="_blank" rel="noopener noreferrer"
            onclick={() => waOpen = false}
            class="flex items-center justify-between p-3.5 rounded-xl active:scale-[0.97] transition-all"
            style="background:{$isDark ? 'rgba(37,211,102,0.10)' : 'rgba(37,211,102,0.08)'};border:1px solid rgba(37,211,102,0.26);">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center" style="background:rgba(37,211,102,0.18);">
                <MessageCircle size={17} style="color:#25D366" />
              </div>
              <div>
                <p class="text-xs" style="color:{textMuted}">{c.label}</p>
                <p class="text-sm font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">{c.display}</p>
              </div>
            </div>
            <ChevronRight size={14} style="color:#25D366" />
          </a>
        {/each}
        <a href="tel:+524871108899"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium active:scale-[0.97] transition-all"
          style="background:{$isDark ? 'rgba(255,255,255,0.07)' : 'rgba(240,245,255,0.80)'};border:{$isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(100,130,220,0.20)'};color:{$isDark ? 'rgba(255,255,255,0.80)' : '#1a2040'};">
          <Phone size={14} /> Llamar directamente
        </a>
      </div>
    </div>
  </div>
{/if}

<!-- Bottom nav pill -->
<nav class="fixed z-40 md:hidden"
  style="left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));border-radius:24px;overflow:hidden;isolation:isolate;box-shadow:{navShadow};">
  <div style="position:absolute;inset:0;backdrop-filter:{BD_FILTER};-webkit-backdrop-filter:{BD_FILTER};z-index:0;"></div>
  <div style="position:absolute;inset:0;background:{navTint};z-index:1;"></div>
  <div style="position:absolute;inset:0;background:{navSpecular};pointer-events:none;z-index:3;"></div>
  <div style="position:absolute;inset:0;opacity:0.025;background-image:{NOISE_SVG};background-size:128px 128px;pointer-events:none;z-index:4;mix-blend-mode:{noiseBlend};"></div>
  <div style="position:absolute;inset:0;border:{navBorder};border-radius:inherit;pointer-events:none;z-index:5;"></div>

  <div style="position:relative;z-index:6;">
    <div class="flex items-stretch" style="height:62px;">
      {#each LINKS as link (link.label)}
        {@const iconColor  = link.isWA ? '#25D366' : textMuted}
        {@const labelColor = link.isWA ? '#25D366' : textMuted}
        {#if link.isWA}
          <button
            onclick={() => waOpen = true}
            class="flex-1 flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform"
            style="min-width:0;">
            <div class="relative flex items-center justify-center">
              <link.icon size={21} style="color:{iconColor}" />
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2"
                style="background:#25D366;border-color:{$isDark ? 'rgba(6,8,22,0.80)' : 'rgba(255,255,255,0.85)'}"></span>
            </div>
            <span class="text-[9.5px] font-medium leading-none" style="color:{labelColor}">{link.label}</span>
          </button>
        {:else}
          <a href={link.href} target="_blank" rel="noopener noreferrer"
            class="flex-1 flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform"
            style="min-width:0;">
            <link.icon size={21} style="color:{iconColor}" />
            <span class="text-[9.5px] font-medium leading-none" style="color:{labelColor}">{link.label}</span>
          </a>
        {/if}
      {/each}
    </div>
  </div>
</nav>
