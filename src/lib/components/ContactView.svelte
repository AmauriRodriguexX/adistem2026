<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import { slide } from 'svelte/transition'
  import GoogleIcon from '$lib/components/GoogleIcon.svelte'

  interface Props {
    initialTab?: string
  }
  let { initialTab }: Props = $props()

  let nombre = $state('')
  let apellido = $state('')
  let email = $state('')
  let telefono = $state('')
  let departamento = $state('')
  let comentarios = $state('')
  let privacidad = $state(false)
  let marketing = $state(false)

  let isSubmitting = $state(false)
  let isSubmitted = $state(false)

  // FAQs interactive state
  let faqs = $state([
    {
      question: '¿Cuáles son los horarios de atención y recepción?',
      answer: 'Tanto nuestro showroom de ventas como el taller de servicio posventa se encuentran abiertos de Lunes a Viernes de 09:00 a 19:30, y los Sábados de 09:00 a 14:00.',
      open: false
    },
    {
      question: '¿Cómo puedo agendar una cita de mantenimiento preventivo?',
      answer: 'Puedes agendarla fácilmente desde el menú "Postventa > Cita de Servicio" o seleccionando el departamento de "Servicio" en este formulario de soporte para que un asesor te contacte de inmediato.',
      open: false
    },
    {
      question: '¿Qué financiamientos y promociones tienen vigentes?',
      answer: 'Contamos con planes de financiamiento con tasas preferenciales y bonos especiales según la marca y modelo (Jeep, RAM, Fiat, Dodge o Peugeot). Elige el departamento de "Ventas" en el formulario para enviarte una cotización detallada.',
      open: false
    },
    {
      question: '¿Ofrecen garantía y planes de cobertura para vehículos seminuevos?',
      answer: 'Sí, todos nuestros vehículos seminuevos pasan por una rigurosa inspección de 150 puntos mecánicos y legales, y cuentan con garantía de cobertura de motor y transmisión para tu total tranquilidad.',
      open: false
    },
    {
      question: '¿Cómo puedo enviar una sugerencia directamente a la dirección?',
      answer: 'Valoramos enormemente tu retroalimentación. Si deseas reportar un caso o enviar una propuesta, selecciona el departamento de "Gerencia" en el formulario. Tu mensaje será entregado directamente a nuestro equipo directivo.',
      open: false
    }
  ])

  function toggleFaq(index: number) {
    faqs = faqs.map((faq, i) => ({
      ...faq,
      open: i === index ? !faq.open : false // Collapse others, accordion behavior
    }))
  }

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

  const glassForm = $derived($isDark
    ? 'background:rgb(5 7 18 / 54%);backdrop-filter:blur(65px) saturate(200%);-webkit-backdrop-filter:blur(65px) saturate(200%);border:1px solid rgba(255,255,255,0.12);box-shadow:rgba(0,0,0,0.6) 0px 32px 80px,rgba(255,255,255,0.06) 0px 1px 0px inset;'
    : 'background:rgba(255,255,255,0.40);backdrop-filter:blur(52px) saturate(200%);-webkit-backdrop-filter:blur(52px) saturate(200%);border:1px solid rgba(255,255,255,0.85);box-shadow:0 32px 80px rgba(10,30,80,0.20),inset 0 1px 0 rgba(255,255,255,0.98);'
  )
  const glassInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const glassSelect = $derived($isDark
    ? 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const labelColor = $derived($isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.55)')
  const checkColor = $derived($isDark ? 'rgba(255,255,255,0.42)' : 'rgba(20,30,80,0.48)')
  const primaryBtn = $derived(`background:linear-gradient(135deg,#334E8B,#2E6CCF);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.28);box-shadow:0 8px 30px rgba(51,78,139,0.40),inset 0 1px 0 rgba(255,255,255,0.30);`)

  const isFormComplete = $derived(
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    email.trim().length > 0 &&
    telefono.trim().length > 0 &&
    departamento.trim().length > 0 &&
    privacidad
  )

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    if (!isFormComplete) return

    isSubmitting = true
    setTimeout(() => {
      isSubmitting = false
      isSubmitted = true
    }, 1500)
  }

  function handleReset() {
    nombre = ''
    apellido = ''
    email = ''
    telefono = ''
    departamento = ''
    comentarios = ''
    privacidad = false
    marketing = false
    isSubmitted = false
  }
</script>

<div class="min-h-screen pt-24 pb-16 md:pb-24 px-4 md:px-8 relative overflow-hidden" style="background:{pageBg};">
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="mb-10 text-left animation-fade-up">
      <p class="text-xs uppercase tracking-widest mb-2" style="color:{T.muted}">Atención Personalizada</p>
      <h1 style="font-size:clamp(2rem,5vw,3rem);font-weight:900;line-height:1.1;color:{T.primary};">
        Estamos aquí para ayudarte
      </h1>
      <p class="mt-4 max-w-2xl text-sm md:text-base" style="color:{T.secondary}">
        Ponte en contacto con nuestro equipo. Llena el siguiente formulario seleccionando el departamento correspondiente para atender tu solicitud.
      </p>
    </div>

    <!-- Layout Container (Map left, Form right) -->
    <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-center animation-fade-up" style="animation-delay: 0.15s">
      
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
                class="w-full py-3 text-xs font-bold tracking-wide flex items-center justify-center gap-2 btn-glow-border">
                <GoogleIcon name="directions_car" size={16} />
                Llévame ahí
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side on Desktop, Top on Mobile: Support Form -->
      <div class="w-full md:w-5/12 max-w-md mx-auto order-1 md:order-2 flex flex-col">
        {#if isSubmitted}
          <!-- Success View -->
          <div class="w-full p-8 rounded-2xl shadow-2xl text-center space-y-6 flex flex-col items-center flex-1 justify-center" style="{glassForm}">
            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background:rgba(16,185,129,0.18); border:1px solid rgba(16,185,129,0.35);">
              <GoogleIcon name="check_circle" size={32} style="color:#10B981" />
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-bold" style="color:{T.primary}">¡Mensaje enviado!</h2>
              <p class="text-sm leading-relaxed" style="color:{T.secondary}">
                Tu consulta ha sido canalizada al departamento correspondiente. En breve uno de nuestros asesores se pondrá en contacto contigo.
              </p>
            </div>
            <button
              onclick={handleReset}
              class="w-full py-3.5 btn-glow-border font-bold text-sm tracking-wide cursor-pointer"
              style={primaryBtn}
            >
              Enviar otro mensaje
            </button>
          </div>
        {:else}
          <!-- Form View -->
          <form onsubmit={handleSubmit} class="w-full p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 flex-1 flex flex-col justify-between" style="{glassForm}">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="nombre" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Nombre *</label>
                  <input id="nombre" type="text" bind:value={nombre} placeholder="Nombre" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required />
                </div>
                <div>
                  <label for="apellido" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Apellido *</label>
                  <input id="apellido" type="text" bind:value={apellido} placeholder="Apellido" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="email" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Email *</label>
                  <input id="email" type="email" bind:value={email} placeholder="correo@ejemplo.com" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required />
                </div>
                <div>
                  <label for="telefono" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Teléfono *</label>
                  <input id="telefono" type="tel" bind:value={telefono} placeholder="55 1234 5678" class="w-full h-10 px-3 rounded-lg text-sm outline-none" style={glassInput} required />
                </div>
              </div>

              <div>
                <label for="departamento" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Departamento *</label>
                <select id="departamento" bind:value={departamento} class="w-full h-10 px-3 rounded-lg text-sm outline-none cursor-pointer" style={glassSelect} required>
                  <option value="">Selecciona un departamento</option>
                  <option value="ventas">Ventas</option>
                  <option value="servicio">Servicio</option>
                  <option value="gerencia">Gerencia</option>
                </select>
              </div>

              <div>
                <label for="comentarios" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">Comentarios *</label>
                <textarea id="comentarios" bind:value={comentarios} rows="3" placeholder="Escribe tu consulta..." class="w-full p-3 rounded-lg text-sm outline-none resize-none" style={glassInput} required></textarea>
              </div>

              <div class="space-y-2.5 pt-3 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
                <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
                  <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {privacidad ? '#334E8B' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{privacidad ? '#334E8B' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                    <input type="checkbox" bind:checked={privacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                    {#if privacidad}
                      <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    {/if}
                  </div>
                  <span class="text-[10px] leading-relaxed" style="color:{checkColor}">He leído y acepto el <a href="/adistem2026/" class="text-blue-500 hover:text-blue-600 underline">Aviso de Privacidad *</a></span>
                </label>

                <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
                  <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {marketing ? '#334E8B' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{marketing ? '#334E8B' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                    <input type="checkbox" bind:checked={marketing} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                    {#if marketing}
                      <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    {/if}
                  </div>
                  <span class="text-[10px] leading-relaxed" style="color:{checkColor}">Deseo recibir ofertas y novedades</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-3.5 mt-4 btn-glow-border font-bold text-sm tracking-wide disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer flex items-center justify-center gap-2"
              style={`${primaryBtn}${!isFormComplete || isSubmitting ? 'filter:grayscale(0.35);' : 'cursor:pointer;'}`}
              disabled={!isFormComplete || isSubmitting}
            >
              {#if isSubmitting}
                <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Enviando...
              {:else}
                Enviar mensaje
              {/if}
            </button>
          </form>
        {/if}
      </div>

    </div>

    <!-- FAQ Section (Below Map & Form layout) -->
    <div class="max-w-4xl mx-auto mt-20 animation-fade-up" style="animation-delay: 0.3s">
      <div class="text-left mb-8">
        <h2 class="text-xl font-bold tracking-tight md:text-2xl" style="color:{T.primary}">
          Preguntas Frecuentes
        </h2>
        <p class="text-xs mt-2" style="color:{T.secondary}">
          Encuentra respuestas rápidas a las dudas más comunes de nuestros clientes.
        </p>
      </div>

      <div class="space-y-3">
        {#each faqs as faq, index (faq.question)}
          <div class="rounded-2xl border transition-all duration-300 overflow-hidden" 
               style="background:{faq.open ? ($isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.92)') : ($isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.50)')};
                      border-color:{faq.open ? ($isDark ? 'rgba(51,78,139,0.30)' : 'rgba(100,130,220,0.22)') : ($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(100,130,220,0.12)')};">
            <button
              onclick={() => toggleFaq(index)}
              class="w-full flex items-center justify-between p-5 text-left font-semibold text-sm cursor-pointer transition-colors duration-200"
              style="color:{T.primary}"
            >
              <span>{faq.question}</span>
              <span class="ml-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                    style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.06)'};
                           transform: rotate({faq.open ? '180deg' : '0deg'});">
                <GoogleIcon name="keyboard_arrow_down" size={16} />
              </span>
            </button>
            
            {#if faq.open}
              <div transition:slide={{ duration: 300 }} class="px-5 pb-5 text-xs sm:text-sm leading-relaxed" style="color:{T.secondary}">
                <div class="pt-1 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.06)'}"></div>
                <p class="mt-3">{faq.answer}</p>
              </div>
            {/if}
          </div>
        {/each}
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
