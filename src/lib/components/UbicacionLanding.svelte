<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  // Estado interactivo
  let copiedPhone = $state(false)
  let copiedAddress = $state(false)

  const currentBranch = {
    name: 'VAPSA San Luis Potosí',
    subtitle: 'Concesionaria Autorizada Multimarca',
    address: 'BLVD SAN LUIS 1158, San Luis Potosí, S.L.P.',
    mapQuery: 'BLVD+SAN+LUIS+1158,+San+Luis+Potosí',
    mapEmbedUrl: 'https://maps.google.com/maps?q=BLVD%20SAN%20LUIS%201158,%20San%20Luis%20Potos%C3%AD,%20San%20Luis%20Potos%C3%AD&t=&z=16&ie=UTF8&iwloc=&output=embed',
    phoneLabel: 'Contacto General',
    phone: '4448001200',
    phoneDisplay: '444 800 1200',
    status: 'Atención en piso de venta',
    departments: [
      {
        name: 'Ventas y Showroom',
        icon: 'directions_car',
        accent: '#334E8B',
        phone: '4448001201', phoneDisplay: '444 800 1201',
        schedules: [
          { days: 'Lunes - Viernes', hours: '09:00 AM - 07:30 PM' },
          { days: 'Sábado', hours: '09:00 AM - 02:00 PM' },
          { days: 'Domingo', hours: 'Cerrado', closed: true },
        ]
      },
      {
        name: 'Servicio',
        icon: 'build',
        accent: '#818082',
        phone: '4448001202', phoneDisplay: '444 800 1202',
        schedules: [
          { days: 'Lunes - Viernes', hours: '08:00 AM - 06:00 PM' },
          { days: 'Sábado', hours: '08:00 AM - 02:00 PM' },
          { days: 'Domingo', hours: 'Cerrado', closed: true },
        ]
      },
      {
        name: 'Refacciones',
        icon: 'settings_suggest',
        accent: '#818082',
        phone: '4448001203', phoneDisplay: '444 800 1203',
        schedules: [
          { days: 'Lunes - Viernes', hours: '09:00 AM - 06:30 PM' },
          { days: 'Sábado', hours: '09:00 AM - 02:00 PM' },
          { days: 'Domingo', hours: 'Cerrado', closed: true },
        ]
      },
      {
        name: 'Seminuevos',
        icon: 'car_rental',
        accent: '#334E8B',
        phone: '4448001204', phoneDisplay: '444 800 1204',
        schedules: [
          { days: 'Lunes - Viernes', hours: '09:00 AM - 07:30 PM' },
          { days: 'Sábado', hours: '09:00 AM - 02:00 PM' },
          { days: 'Domingo', hours: 'Cerrado', closed: true },
        ]
      },
      {
        name: 'Flotillas',
        icon: 'local_shipping',
        accent: '#334E8B',
        phone: '4448001205', phoneDisplay: '444 800 1205',
        schedules: [
          { days: 'Lunes - Viernes', hours: '09:00 AM - 06:00 PM' },
          { days: 'Sáb - Dom', hours: 'Cerrado', closed: true },
        ]
      }
    ]
  }

  function copyToClipboard(text: string, type: 'phone' | 'address') {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      if (type === 'phone') {
        copiedPhone = true
        setTimeout(() => copiedPhone = false, 2000)
      } else {
        copiedAddress = true
        setTimeout(() => copiedAddress = false, 2000)
      }
    }
  }

  function handleContactRedirect() {
    if (typeof history !== 'undefined') {
      history.pushState({ view: 'Cotizacion' }, '', '/adistem2026/cotizacion/')
      window.dispatchEvent(new Event('popstate'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )

  const T = $derived({
    primary:   $isDark ? 'white'                      : '#111827',
    secondary: $isDark ? 'rgba(255,255,255,0.72)'     : 'rgba(17,24,39,0.75)',
    muted:     $isDark ? 'rgba(255,255,255,0.45)'     : 'rgba(51,78,139,0.55)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(51,78,139,0.12)',
    cardBg:    $isDark ? 'rgba(255,255,255,0.03)'     : 'rgba(255,255,255,0.75)',
    cardBorder:$isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(51,78,139,0.16)',
    activeTabBg:$isDark? 'rgba(59,130,246,0.15)'      : 'rgba(59,130,246,0.12)',
    activeTabBorder:$isDark? 'rgba(59,130,246,0.4)'   : 'rgba(59,130,246,0.3)',
  })

  const glassContainer = $derived($isDark
    ? 'background:rgba(255,255,255,0.03);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 12px 40px rgba(0,0,0,0.5);'
    : 'background:rgba(255,255,255,0.75);backdrop-filter:blur(40px);border:1px solid rgba(51,78,139,0.16);box-shadow:0 12px 40px rgba(51,78,139,0.08);'
  )

  const innerCard = $derived($isDark
    ? 'background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);'
    : 'background:rgba(255,255,255,0.5);border:1px solid rgba(51,78,139,0.08);'
  )
</script>

<div class="min-h-screen pt-28 pb-24 px-4 md:px-8 transition-colors duration-500" style="background:{pageBg}">
  <div class="max-w-7xl mx-auto flex flex-col items-center">
    
    <!-- Encabezado UX Tendencia 2026 -->
    <div class="text-center mb-8 w-full">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-300 hover:scale-105"
        style="background:{$isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)'}; color:#3b82f6; border:1px solid rgba(59,130,246,0.25);">
        <GoogleIcon name="location_on" size={16} />
        <span>Visita Nuestros Pisos de Venta</span>
      </div>
      <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-4" style="color:{T.primary}">
        Horarios y <span style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Ubicación</span>
      </h1>
      <p class="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style="color:{T.secondary}">
        Conoce las coordenadas exactas de nuestras agencias autorizadas, explora los horarios por departamento y programa tu visita con atención personalizada.
      </p>
    </div>



    <!-- Arquitectura Bento Grid 2026 -->
    <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      <!-- Panel Izquierdo: Áreas y Teléfonos (5 columnas) -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        
        <!-- Tarjetas de Horarios y Teléfonos por Departamento -->
        <div class="p-6 md:p-8 rounded-3xl flex flex-col gap-5 transition-all duration-300 h-full"
          style="{glassContainer}">
          
          <div class="flex items-center justify-between pb-3 border-b" style="border-color:{T.divider}">
            <div class="flex items-center gap-3">
              <GoogleIcon name="contact_phone" size={24} class="text-blue-500" />
              <div>
                <h3 class="text-base font-black uppercase tracking-wider leading-tight" style="color:{T.primary}">Áreas de Servicio</h3>
                <p class="text-[10px] font-bold tracking-widest uppercase mt-0.5" style="color:{T.muted}">Horarios y Líneas Directas</p>
              </div>
            </div>
            
            <button 
              onclick={handleContactRedirect}
              class="hidden sm:flex py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-xl text-[10px] tracking-wider uppercase transition-all shadow-md items-center justify-center gap-1.5 cursor-pointer">
              <span>CONTÁCTANOS</span>
            </button>
          </div>

          <div class="flex flex-col gap-3.5 overflow-y-auto pr-2 custom-scrollbar" style="max-height: 520px;">
            {#each currentBranch.departments as dept}
              <div class="p-4 rounded-2xl flex flex-col transition-all group hover:scale-[1.01]" style="{innerCard}">
                
                <!-- Encabezado de Área -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3 sm:gap-0">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors" style="background:{dept.accent}15; color:{dept.accent};">
                      <GoogleIcon name={dept.icon} size={16} />
                    </div>
                    <span class="text-sm font-black uppercase tracking-wider" style="color:{T.primary}">{dept.name}</span>
                  </div>
                  
                  <!-- Teléfono -->
                  {#if dept.phoneDisplay}
                    <button 
                      onclick={() => copyToClipboard(dept.phone, 'phone')}
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-500/10 cursor-pointer self-start sm:self-auto"
                      style="color:{dept.accent}; background:transparent; border:1px solid {dept.accent}30;"
                      title="Copiar teléfono">
                      <GoogleIcon name="phone" size={13} />
                      <span class="text-xs font-bold tracking-tight">{dept.phoneDisplay}</span>
                    </button>
                  {/if}
                </div>

                <!-- Horarios -->
                <div class="grid grid-cols-1 gap-1 pl-1 sm:pl-10">
                  {#each dept.schedules as sched}
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-medium" style="color:{T.muted}">{sched.days}</span>
                      <span class="font-bold {sched.closed ? 'text-red-500/80 dark:text-red-400/80' : ''}" style="color:{sched.closed ? '' : T.secondary}">
                        {sched.hours}
                      </span>
                    </div>
                  {/each}
                </div>

              </div>
            {/each}
          </div>

          <!-- Mobile Contact Button (Bottom) -->
          <button 
            onclick={handleContactRedirect}
            class="sm:hidden w-full mt-2 py-3 bg-blue-500 text-white font-black rounded-xl text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
            <span>CONTÁCTANOS</span>
          </button>
        </div>

      </div>

      <!-- Panel Derecho: Mapa 'Home Style' (7 columnas) -->
      <div class="lg:col-span-7 flex flex-col">
        <div class="relative w-full h-[600px] md:h-full min-h-[650px] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 flex flex-col" 
             style="{glassContainer}; padding: 6px;">
          
          <div class="relative w-full h-full rounded-[26px] overflow-hidden bg-black/5 dark:bg-white/5">
              <iframe
                src={currentBranch.mapEmbedUrl}
                class="w-full h-full border-0 absolute inset-0 transition-opacity duration-500"
                style="filter:{$isDark
                  ? 'invert(92%) hue-rotate(180deg) saturate(0.72) brightness(0.82) contrast(0.95)'
                  : 'none'};"
                allowfullscreen={false}
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa de {currentBranch.name}">
              </iframe>

            <!-- Overlay & Glow -->
            <div class="absolute inset-0 pointer-events-none" style="background:transparent; mix-blend-mode:normal; border-radius:inherit;"></div>
            <div class="absolute inset-0 pointer-events-none" style="
              box-shadow:inset 0 0 70px {$isDark ? 'rgba(5,8,20,0.70)' : 'rgba(51,78,139,0.14)'},
                         inset 0 0 20px {$isDark ? 'rgba(51,78,139,0.25)' : 'rgba(107,142,212,0.12)'};
              border-radius:inherit;">
            </div>

            <!-- Floating Address Badge -->
            <div class="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:w-[360px] rounded-2xl p-5 shadow-2xl flex flex-col gap-4 transition-all duration-300"
              style="background:{$isDark ? 'rgba(5,8,22,0.92)' : 'rgba(248,251,255,0.96)'};
                border:1px solid {$isDark ? 'rgba(51,78,139,0.40)' : 'rgba(51,78,139,0.18)'};
                backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);">
              
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
                  <GoogleIcon name="place" size={24} />
                </div>
                <div>
                  <h3 class="font-black text-lg leading-tight tracking-tight" style="color:{T.primary}">
                    {currentBranch.name}
                  </h3>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {currentBranch.status}
                    </p>
                  </div>
                </div>
              </div>

              <p class="text-[13px] font-medium leading-relaxed" style="color:{T.secondary}">
                {currentBranch.address}
              </p>

              <div class="flex items-center gap-2 pt-1">
                <button onclick={() => copyToClipboard(currentBranch.address, 'address')} class="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
                  <GoogleIcon name={copiedAddress ? 'check' : 'content_copy'} size={14} />
                  {copiedAddress ? 'Copiada' : 'Copiar'}
                </button>
                <a href="https://www.google.com/maps/search/?api=1&query={currentBranch.mapQuery}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer" style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'}; color:{T.primary};">
                  <GoogleIcon name="directions" size={14} /> Cómo llegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
