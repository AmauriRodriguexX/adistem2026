<script lang="ts">
  import { MessageCircle, X, Phone, ChevronRight } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  const contacts = [
    { label: 'Ventas — Línea 1',   number: '+524871108899', display: '(487) 110-8899', icon: '💬' },
    { label: 'Ventas — Línea 2',   number: '+524871005896', display: '(487) 100-5896', icon: '💬' },
    { label: 'Servicio al cliente', number: '+524871005896', display: '(487) 100-5896', icon: '🔧' },
  ]

  let open    = $state(false)
  let hovered = $state(false)

  const widgetStyle = $derived($isDark
    ? 'background:rgba(8,14,28,0.90);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);border:1px solid rgba(255,255,255,0.14);box-shadow:0 24px 60px rgba(0,0,0,0.75),inset 0 1px 0 rgba(255,255,255,0.18);'
    : 'background:rgba(255,255,255,0.90);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);border:1px solid rgba(100,140,220,0.22);box-shadow:0 24px 60px rgba(30,60,120,0.18),inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const nameColor    = $derived($isDark ? 'white' : '#1a2040')
  const msgColor     = $derived($isDark ? 'rgba(255,255,255,0.58)' : 'rgba(20,30,80,0.58)')
  const contactLabel = $derived($isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.50)')
  const itemBase     = $derived($isDark
    ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);'
    : 'background:rgba(240,245,255,0.70);border:1px solid rgba(100,130,220,0.16);'
  )
  const callBtn = $derived($isDark
    ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);color:white;'
    : 'background:rgba(240,245,255,0.80);border:1px solid rgba(100,130,220,0.20);color:#1a2040;'
  )
  const toggleBg = $derived(open
    ? 'background:rgba(220,53,69,0.85);'
    : 'background:linear-gradient(135deg,rgba(37,211,102,0.95),rgba(18,180,80,0.90));'
  )
  const toggleShadow = $derived(hovered
    ? '0 12px 40px rgba(37,211,102,0.55),inset 0 1px 0 rgba(255,255,255,0.3)'
    : '0 8px 30px rgba(37,211,102,0.38),inset 0 1px 0 rgba(255,255,255,0.25)'
  )
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

  {#if open}
    <div class="rounded-2xl overflow-hidden w-72" style={widgetStyle}>
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3"
        style="background:rgba(37,211,102,0.12);border-bottom:1px solid rgba(37,211,102,0.20);">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
          <span class="font-medium text-sm" style="color:{nameColor}">VAPSA — Contáctanos</span>
        </div>
        <button onclick={() => open = false} style="color:{msgColor}" class="hover:opacity-80 transition-opacity">
          <X size={16} />
        </button>
      </div>

      <!-- Message -->
      <div class="px-4 pt-4 pb-2">
        <p class="text-xs leading-relaxed" style="color:{msgColor}">
          Hola 👋 Estamos listos para ayudarte. Elige un número para chatear:
        </p>
      </div>

      <!-- Contacts -->
      <div class="px-4 pb-4 space-y-2">
        {#each contacts as contact, i (i)}
          <a
            href="https://wa.me/{contact.number.replace(/\D/g,'')}?text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20sus%20veh%C3%ADculos"
            target="_blank" rel="noopener noreferrer"
            class="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group"
            style={itemBase}
            onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.cssText = 'background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.28);display:flex;align-items:center;justify-content:space-between;padding:0.75rem;border-radius:0.75rem;' }}
            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.cssText = itemBase + 'display:flex;align-items:center;justify-content:space-between;padding:0.75rem;border-radius:0.75rem;' }}
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style="background:rgba(37,211,102,0.18);">
                {contact.icon}
              </div>
              <div>
                <p class="text-xs" style="color:{contactLabel}">{contact.label}</p>
                <p class="text-sm font-medium" style="color:{nameColor}">{contact.display}</p>
              </div>
            </div>
            <ChevronRight size={14} style="color:{$isDark ? 'rgba(255,255,255,0.28)' : 'rgba(20,30,80,0.30)'}" />
          </a>
        {/each}
      </div>

      <!-- Call -->
      <div class="px-4 pb-4">
        <a href="tel:+524871108899"
          class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
          style={callBtn}>
          <Phone size={14} />
          Llamar directamente
        </a>
      </div>
    </div>
  {/if}

  <!-- Toggle button -->
  <button
    onclick={() => open = !open}
    onmouseenter={() => hovered = true}
    onmouseleave={() => hovered = false}
    class="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
    style="{toggleBg}border:1px solid rgba(255,255,255,0.28);box-shadow:{toggleShadow};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);transform:{hovered ? 'scale(1.08)' : 'scale(1)'};"
    aria-label="Contactar por WhatsApp"
  >
    {#if open}
      <X size={22} class="text-white" />
    {:else}
      <MessageCircle size={22} class="text-white" fill="currentColor" />
      <span class="absolute inset-0 rounded-full animate-ping"
        style="background:rgba(37,211,102,0.35);animation-duration:2s;"></span>
    {/if}
  </button>
</div>
