<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from '$lib/components/GoogleIcon.svelte'
  import ContactFormCard from '$lib/components/ContactFormCard.svelte'

  interface Props {
    initialTab?: 'cotizacion' | 'cita' | 'prueba'
  }
  let { initialTab = 'cotizacion' }: Props = $props()

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )

  const T = $derived({
    primary:   $isDark ? 'white'                      : '#1a2040',
    secondary: $isDark ? 'rgba(255,255,255,0.58)'     : 'rgba(20,30,80,0.58)',
    muted:     $isDark ? 'rgba(255,255,255,0.35)'     : 'rgba(20,30,80,0.38)',
  })

  const glassCard = $derived($isDark
    ? 'background:rgba(255,255,255,0.05);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(255,255,255,0.10);box-shadow:0 8px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.14),inset 0 -1px 0 rgba(0,0,0,0.20);'
    : 'background:rgba(255,255,255,0.60);backdrop-filter:blur(60px) saturate(220%);-webkit-backdrop-filter:blur(60px) saturate(220%);border:1px solid rgba(100,140,220,0.20);box-shadow:0 8px 40px rgba(30,60,120,0.10),inset 0 1px 0 rgba(255,255,255,0.95),inset 0 -1px 0 rgba(100,130,220,0.08);'
  )

</script>

<div class="min-h-screen py-16 md:py-24 px-4 md:px-8 relative overflow-hidden" style="background:{pageBg};">
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="mb-10 text-center animation-fade-up">
      <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Atención Personalizada</p>
      <h1 style="font-size:clamp(2rem,5vw,3rem);font-weight:900;line-height:1.1;color:{T.primary};">
        Estamos aquí para ayudarte
      </h1>
      <p class="mt-4 max-w-2xl mx-auto text-sm md:text-base" style="color:{T.secondary}">
        Ya sea que busques cotizar tu próximo vehículo, agendar un servicio de mantenimiento o realizar una prueba de manejo, en VAPSA estamos listos para atenderte.
      </p>
    </div>

    <!-- Layout Container -->
    <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-center animation-fade-up" style="animation-delay: 0.15s">
      
      <!-- Right Side on Desktop, Top on Mobile: Form -->
      <div class="w-full md:w-5/12 max-w-md mx-auto order-1 md:order-2 flex flex-col">
        {#key initialTab}
          <ContactFormCard {initialTab} />
        {/key}
      </div>

      <!-- Left Side on Desktop, Bottom on Mobile: Map & Location -->
      <div class="w-full md:w-7/12 order-2 md:order-1 flex flex-col">
        <div class="relative flex-1 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500" 
             style="{glassCard}; padding: 6px;">
          <div class="relative w-full h-[400px] md:h-full min-h-[500px] rounded-[22px] overflow-hidden">
            <!-- Mapa -->
            <iframe
              src="https://maps.google.com/maps?q=BLVD%20SAN%20LUIS%201158,%20San%20Luis%20Potos%C3%AD,%20San%20Luis%20Potos%C3%AD&t=&z=16&ie=UTF8&iwloc=&output=embed"
              class="w-full h-full border-0 block"
              style="filter:{$isDark
                ? 'invert(92%) hue-rotate(180deg) saturate(0.72) brightness(0.82) contrast(0.95)'
                : 'none'};"
              allowfullscreen={false}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación VAPSA">
            </iframe>

            <!-- Overlay & Glow -->
            <div class="absolute inset-0 pointer-events-none" style="background:transparent; mix-blend-mode:normal; border-radius:inherit;"></div>
            <div class="absolute inset-0 pointer-events-none" style="
              box-shadow:inset 0 0 70px {$isDark ? 'rgba(5,8,20,0.70)' : 'rgba(51,78,139,0.14)'},
                         inset 0 0 20px {$isDark ? 'rgba(51,78,139,0.25)' : 'rgba(107,142,212,0.12)'};
              border-radius:inherit;">
            </div>

            <!-- Floating Address Badge -->
            <div class="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:w-80 rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
              style="background:{$isDark ? 'rgba(5,8,22,0.92)' : 'rgba(248,251,255,0.96)'};
                border:1px solid {$isDark ? 'rgba(51,78,139,0.40)' : 'rgba(51,78,139,0.18)'};
                backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);
                box-shadow:{$isDark ? '0 8px 32px rgba(0,0,0,0.60),inset 0 1px 0 rgba(255,255,255,0.08)' : '0 8px 32px rgba(51,78,139,0.14),inset 0 1px 0 rgba(255,255,255,0.95)'};
                z-index:3;">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                  style="background:linear-gradient(135deg,rgba(51,78,139,0.30),rgba(46,108,207,0.20));border:1px solid rgba(51,78,139,0.35);">
                  <GoogleIcon name="location_on" size={16} style="color:#4C8EF0" />
                </div>
                <div>
                  <p class="text-sm font-bold mb-0.5" style="color:{T.primary}">VAPSA San Luis Potosí</p>
                  <p class="text-xs leading-relaxed" style="color:{T.secondary}">
                    BLVD SAN LUIS 1158,<br/>San Luis Potosí, S.L.P.
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-2 pt-2" style="border-top:1px solid {$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.12)'}">
                <div class="flex items-center gap-2 text-xs" style="color:{T.secondary}">
                   <GoogleIcon name="schedule" size={14} /> Lunes a Viernes: 09:00 - 19:30
                </div>
                <div class="flex items-center gap-2 text-xs" style="color:{T.secondary}">
                   <GoogleIcon name="schedule" size={14} /> Sábado: 09:00 - 14:00
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=BLVD+SAN+LUIS+1158,+San+Luis+Potosí,+San+Luis+Potosí" target="_blank" rel="noopener noreferrer"
                class="w-full py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 btn-glow-border">
                <GoogleIcon name="directions_car" size={16} />
                Llévame ahí
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .animation-fade-up {
    animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
