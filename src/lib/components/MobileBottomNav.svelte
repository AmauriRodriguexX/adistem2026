<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  interface Props {
    onCotizarClick?:      () => void
    onPruebaManejoClick?: () => void
    mode?: 'default' | 'model-detail'
  }
  let { onCotizarClick, onPruebaManejoClick, mode = 'default' }: Props = $props()

  const LINKS = [
    { icon: 'speed',      label: 'Prueba de manejo', href: '#', isWA: false, action: 'prueba' },
    { icon: 'calculate',  label: 'Cotizar',    href: '#', isWA: false, action: 'cotizar' },
    { icon: 'build',      label: 'Servicio',   href: '#', isWA: false, action: 'cotizar' },
    { icon: 'call',       label: 'Contacto',   href: '#', isWA: false, action: 'cotizar' },
    { icon: 'chat',       label: 'WhatsApp',   href: '#', isWA: true,  action: 'wa' },
  ] as const

  const MODEL_LINKS = [
    { icon: 'calculate',  label: 'Cotizar',          isWA: false, action: 'cotizar', primary: true  },
    { icon: 'speed',      label: 'Prueba de manejo', isWA: false, action: 'prueba',  primary: false },
  ] as const

  const WA_CONTACTS = [
    { label: 'Ventas',      number: '524871108899', display: '(487) 110-8899', text: 'Hola,%20me%20interesan%20los%20vehículos%20nuevos' },
    { label: 'Seminuevos',  number: '524871108899', display: '(487) 110-8899', text: 'Hola,%20busco%20información%20de%20seminuevos' },
    { label: 'Servicio',    number: '524871005896', display: '(487) 100-5896', text: 'Hola,%20quiero%20agendar%20una%20cita%20de%20servicio' },
    { label: 'Refacciones', number: '524871108899', display: '(487) 110-8899', text: 'Hola,%20busco%20una%20refacción' },
  ]

  const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

  let waOpen = $state(false)

  const BD_FILTER_SHEET = 'url(#lg-frosted) blur(48px) saturate(200%)'
  const BD_FILTER_NAV   = 'blur(20px) saturate(180%)'
  const navTint       = $derived($isDark ? 'rgba(5,7,18,0.22)' : 'rgb(248 249 250 / 19%)')
  const sheetTint     = $derived($isDark ? 'rgba(7,10,26,0.94)' : 'rgba(255,255,255,0.96)')
  
  const navShadow     = $derived($isDark ? '0 12px 32px rgba(0,0,0,0.40)' : '0 12px 32px rgba(0,0,0,0.08)')
  const navBorder     = $derived($isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.2)')
  const navBorderTop  = $derived($isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.4)')
  const navBorderBot  = $derived($isDark ? '1px solid rgba(0,0,0,0.5)' : '1px solid rgba(0,0,0,0.05)')

  const sheetShadow   = $derived($isDark
    ? '0 0 0 1.5px rgba(255,255,255,0.18),0 -12px 48px rgba(0,0,0,0.70)'
    : '0 0 0 1.5px rgba(255,255,255,0.95),0 -12px 48px rgba(20,40,120,0.20)'
  )
  const sheetBorder   = $derived($isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.75)')
  
  const textMuted     = $derived($isDark ? 'rgba(255,255,255,0.48)' : 'rgba(20,30,80,0.50)')
  const divider       = $derived($isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(100,130,220,0.12)')
  const noiseBlend    = $derived($isDark ? 'soft-light' : 'overlay')

  function handleAction(action: string) {
    if (action === 'cotizar') {
      onCotizarClick?.()
    } else if (action === 'prueba') {
      onPruebaManejoClick?.() ?? onCotizarClick?.()
    } else if (action === 'wa') {
      waOpen = true
    }
  }
</script>

<style>
  @keyframes bnIn {
    0% { opacity: 0; transform: translateY(100px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .nav-anim {
    opacity: 0;
    transform: translateY(100px);
    animation: bnIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
  }
</style>

{#if waOpen}
  <!-- Scrim -->
  <div class="fixed inset-0 z-40 md:hidden"
    style="background:rgba(0,0,0,0.48);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);"
    onclick={() => waOpen = false}></div>

  <!-- WA Sheet -->
  <div class="fixed z-50 md:hidden"
    style="left:16px;right:16px;bottom:calc(96px + env(safe-area-inset-bottom,0px));border-radius:22px;isolation:isolate;overflow:hidden;box-shadow:{sheetShadow};">
    <div style="position:absolute;inset:0;backdrop-filter:{BD_FILTER_SHEET};-webkit-backdrop-filter:{BD_FILTER_SHEET};z-index:0;"></div>
    <div style="position:absolute;inset:0;background:{sheetTint};z-index:1;"></div>
    <div style="position:absolute;inset:0;background:{$isDark ? 'linear-gradient(180deg,rgba(255,255,255,0.16) 0%,rgba(255,255,255,0.04) 25%,transparent 60%)' : 'linear-gradient(180deg,rgba(255,255,255,1.00) 0%,rgba(255,255,255,0.60) 20%,transparent 55%)'};pointer-events:none;z-index:3;"></div>
    <div style="position:absolute;inset:0;opacity:0.022;background-image:{NOISE_SVG};background-size:128px 128px;pointer-events:none;z-index:4;mix-blend-mode:{noiseBlend};"></div>
    <div style="position:absolute;inset:0;border-radius:22px;border:{sheetBorder};pointer-events:none;z-index:5;"></div>

    <div style="position:relative;z-index:6;">
      <div class="flex items-center justify-between px-5 py-4" style="border-bottom:{divider}">
        <div class="flex items-center gap-2.5">
          <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span class="text-sm font-semibold" style="color:{$isDark ? 'white' : '#1a2040'}">Contáctanos</span>
        </div>
        <button onclick={() => waOpen = false} class="p-1" style="color:{textMuted}"><GoogleIcon name="close" size={16} /></button>
      </div>
      <div class="p-4 space-y-3">
        <p class="text-xs mb-3" style="color:{textMuted}">Hola, escríbenos al número que prefieras:</p>
        {#each WA_CONTACTS as c (c.label)}
          <a href="https://wa.me/{c.number}?text={c.text}"
            target="_blank" rel="noopener noreferrer"
            onclick={() => waOpen = false}
            class="flex items-center gap-3 px-4 py-3 rounded-2xl active:scale-[0.97] transition-all"
            style="background:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(20,40,120,0.04)'};border:1px solid {$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,40,120,0.08)'};">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style="background:linear-gradient(135deg,#25D366,#128C7E);">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style="width:20px;height:20px;display:block;"
              />
            </div>
            <div class="flex-1 leading-none">
              <p class="text-[11px] font-semibold mb-0.5" style="color:{textMuted}">{c.label}</p>
              <p class="text-[14px] font-black tracking-wide" style="color:{$isDark ? 'white' : '#1a2040'}">{c.display}</p>
            </div>
            <GoogleIcon name="chevron_right" size={16} style="color:{textMuted}" />
          </a>
        {/each}
        <a href="tel:+524871108899"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-medium active:scale-[0.97] transition-all"
          style="background:{$isDark ? 'rgba(255,255,255,0.07)' : 'rgba(240,245,255,0.80)'};border:{$isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(100,130,220,0.20)'};color:{$isDark ? 'rgba(255,255,255,0.80)' : '#1a2040'};">
          <GoogleIcon name="call" size={14} /> Llamar directamente
        </a>
      </div>
    </div>
  </div>
{/if}

<!-- Bottom nav pill -->
<nav class="fixed z-40 md:hidden flex items-center p-[10px] gap-[2px] transition-colors duration-300 nav-anim"
  style="left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));
         background:{navTint};
         backdrop-filter:{BD_FILTER_NAV}; -webkit-backdrop-filter:{BD_FILTER_NAV};
         border:{navBorder}; border-top-color:{navBorderTop}; border-bottom:{navBorderBot};
         border-radius:30px;
         box-shadow:{navShadow};
         pointer-events:auto; overflow-x:auto; -ms-overflow-style:none; scrollbar-width:none;">
  
  <div class="flex items-stretch w-full justify-between" style="height:54px;">
    {#if mode === 'model-detail'}
      <!-- Modo detalle de modelo: solo Cotizar + Prueba de manejo -->
      {#each MODEL_LINKS as link (link.label)}
        <button
          onclick={() => handleAction(link.action)}
          class="flex-1 flex items-center justify-center gap-2 mx-1 rounded-xl text-sm font-bold transition-all active:scale-[0.96] cursor-pointer"
          style="{link.primary
            ? 'background:#334E8B;color:white;'
            : `background:${$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'};color:${$isDark ? 'rgba(255,255,255,0.88)' : '#1a2040'};`}">
          <GoogleIcon name={link.icon} size={18} />
          <span>{link.label}</span>
        </button>
      {/each}
    {:else}
      <!-- Modo default: 5 botones -->
      {#each LINKS as link (link.label)}
        {@const iconColor  = link.isWA ? '#25D366' : textMuted}
        {@const labelColor = link.isWA ? '#25D366' : textMuted}
        <button
          onclick={() => handleAction(link.action)}
          class="flex-1 flex flex-col items-center justify-center gap-1.5 active:scale-90 transition-transform"
          style="min-width:0;">
          <div class="relative flex items-center justify-center">
            {#if link.isWA}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style="width:22px;height:22px;background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);padding:3px;border-radius:6px;display:block;"
              />
            {:else}
              <GoogleIcon name={link.icon} size={21} style="color:{iconColor}" />
            {/if}
            {#if link.isWA}
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2"
                style="background:#25D366;border-color:{$isDark ? 'rgba(6,8,22,0.80)' : 'rgba(255,255,255,0.85)'}"></span>
            {/if}
          </div>
          <span class="text-[9.5px] font-medium leading-none" style="color:{labelColor}">{link.label}</span>
        </button>
      {/each}
    {/if}
  </div>
</nav>
