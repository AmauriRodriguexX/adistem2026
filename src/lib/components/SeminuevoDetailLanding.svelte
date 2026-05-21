<script lang="ts">
  import { fade } from 'svelte/transition'
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  interface Props {
    onBack?: () => void
    onContact?: (tab: 'cotizacion' | 'cita' | 'prueba') => void
  }

  let { onBack, onContact }: Props = $props()

  // Datos del vehículo
  const car = {
    title: 'Nissan Comerciales NP 300 Frontier',
    year: 2020,
    price: '$420,000',
    km: '86,853 km',
    location: 'VAPSA Rioverde',
    state: 'SLP',
    type: 'Pick-up',
    bodyType: 'Pick-up doble cabina',
    tagline: 'Nuestros seminuevos pasan por un proceso de inspección asegurando la calidad y legalidad de cada uno de ellos.',
    engine: 'Motor 2.5L de 4 cilindros',
    transmission: 'Manual de 6 velocidades',
    color: 'Plata Metálico',
    interiorColor: 'Negro',
    fuel: 'Gasolina',
    doors: 4,
    images: [
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/1.jpeg',
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/10.jpeg',
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/11.jpeg',
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/12.jpeg',
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/13.jpeg',
      'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/14.jpeg',
    ],
    features: [
      'Aire acondicionado manual',
      'Sistema de audio con Bluetooth y AUX',
      'Bolsas de aire frontales para conductor y pasajero',
      'Frenos ABS con EBD',
      'Rines de aluminio de 16 pulgadas',
      'Bedliner espreado original de fábrica',
      'Vidrios y seguros eléctricos',
      'Controles de audio al volante'
    ]
  }

  // 8 fichas técnicas ordenadas por relevancia para el comprador
  const specs = [
    { icon: 'speed',          label: 'Kilometraje',     value: car.km },
    { icon: 'local_gas_station', label: 'Combustible',  value: car.fuel },
    { icon: 'settings',       label: 'Transmisión',     value: car.transmission },
    { icon: 'directions_car', label: 'Motor',           value: car.engine },
    { icon: 'door_front',     label: 'Carrocería',      value: car.bodyType },
    { icon: 'sensor_door',    label: 'Puertas',         value: `${car.doors} puertas` },
    { icon: 'palette',        label: 'Color exterior',  value: car.color },
    { icon: 'chair',          label: 'Color interior',  value: car.interiorColor },
  ]

  let activeImageIndex = $state(0)
  let activeImage = $derived(car.images[activeImageIndex])

  // Modal state
  let showModal = $state(false)
  let modalNombre = $state('')
  let modalCorreo = $state('')
  let modalTelefono = $state('')
  let modalNotas = $state('')
  let modalPrivacidad = $state(false)
  let modalPromocion = $state(false)
  let modalSubmitting = $state(false)
  let modalSuccess = $state(false)

  function prevImage() {
    activeImageIndex = (activeImageIndex - 1 + car.images.length) % car.images.length
  }
  function nextImage() {
    activeImageIndex = (activeImageIndex + 1) % car.images.length
  }

  function openModal() {
    showModal = true
    document.body.style.overflow = 'hidden'
  }
  function closeModal() {
    showModal = false
    document.body.style.overflow = ''
  }
  function handleModalSubmit() {
    if (!modalNombre || !modalCorreo || !modalTelefono || !modalPrivacidad) return
    modalSubmitting = true
    setTimeout(() => {
      modalSubmitting = false
      modalSuccess = true
      setTimeout(() => {
        modalSuccess = false
        closeModal()
      }, 2500)
    }, 1200)
  }

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg, #030408 0%, #080C18 40%, #030408 100%)'
    : 'linear-gradient(160deg, #f3f6fc 0%, #e9eff8 50%, #f6f9fe 100%)'
  )
  const T = $derived({
    primary:   $isDark ? 'white'                      : '#111827',
    secondary: $isDark ? 'rgba(255,255,255,0.72)'     : 'rgba(17,24,39,0.74)',
    muted:     $isDark ? 'rgba(255,255,255,0.45)'     : 'rgba(17,24,39,0.52)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(51,78,139,0.12)',
    accent:    '#3b82f6',
  })
  const glassCard = $derived($isDark
    ? 'background: rgba(255, 255, 255, 0.035); backdrop-filter: blur(28px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);'
    : 'background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(28px) saturate(180%); border: 1px solid rgba(51, 78, 139, 0.16); box-shadow: 0 12px 40px rgba(51, 78, 139, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95);'
  )
  const glassForm = $derived($isDark
    ? 'background:rgb(5 7 18 / 54%);backdrop-filter:blur(65px) saturate(200%);-webkit-backdrop-filter:blur(65px) saturate(200%);border:1px solid rgba(255,255,255,0.12);box-shadow:rgba(0,0,0,0.6) 0px 32px 80px,rgba(255,255,255,0.06) 0px 1px 0px inset;'
    : 'background:rgba(255,255,255,0.40);backdrop-filter:blur(52px) saturate(200%);-webkit-backdrop-filter:blur(52px) saturate(200%);border:1px solid rgba(255,255,255,0.85);box-shadow:0 32px 80px rgba(10,30,80,0.20),inset 0 1px 0 rgba(255,255,255,0.98);'
  )
  const formInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);'
    : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);backdrop-filter:blur(12px);color:#1a2040;box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const labelColor = $derived($isDark ? 'rgba(255,255,255,0.50)' : 'rgba(20,30,80,0.55)')
  const checkColor = $derived($isDark ? 'rgba(255,255,255,0.42)' : 'rgba(20,30,80,0.48)')
  const modalCanComplete = $derived(
    modalNombre.trim().length > 0 &&
    modalCorreo.trim().length > 0 &&
    modalTelefono.trim().length > 0 &&
    modalPrivacidad
  )
</script>

<!-- ─────────────── MODAL COTIZACIÓN ─────────────── -->
{#if showModal}
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
    transition:fade={{ duration: 180 }}
    role="dialog"
    aria-modal="true"
    aria-label="Solicitar cotización"
  >
    <!-- Backdrop -->
    <button
      class="absolute inset-0 cursor-default"
      style="background: rgba(0,0,0,0.72); backdrop-filter: blur(8px);"
      onclick={closeModal}
      aria-label="Cerrar modal"
    ></button>

    <!-- Panel -->
    <div
      class="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      style="{glassForm}; max-height: 96dvh;"
    >
      <!-- Acento superior -->
      <div class="h-1 w-full" style="background: linear-gradient(90deg,#334E8B,#4C8EF0)"></div>

      <!-- Header modal -->
      <div class="flex items-center justify-between px-6 pt-5 pb-3">
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Seminuevos VAPSA</p>
          <h2 class="text-lg font-black leading-tight" style="color:{T.primary}">Solicitar cotización</h2>
        </div>
        <button
          onclick={closeModal}
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; color:{T.primary}"
          aria-label="Cerrar"
        >
          <GoogleIcon name="close" size={18} />
        </button>
      </div>

      <!-- Resumen del vehículo -->
      <div class="mx-6 mb-4 p-3 rounded-xl flex items-center gap-3" style="background:{$isDark ? 'rgba(255,255,255,0.04)' : 'rgba(51,78,139,0.06)'}; border:1px solid {T.divider}">
        <img src={car.images[0]} alt={car.title} class="w-14 h-10 object-cover rounded-lg flex-shrink-0" />
        <div class="min-w-0">
          <p class="text-xs font-black leading-tight truncate" style="color:{T.primary}">{car.title} {car.year}</p>
          <p class="text-lg font-black text-blue-500 leading-tight">{car.price}</p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="px-6 pb-6 overflow-y-auto flex flex-col gap-3.5">
        {#if modalSuccess}
          <div class="py-10 flex flex-col items-center gap-3 text-center" transition:fade={{ duration: 200 }}>
            <div class="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-1">
              <GoogleIcon name="check_circle" size={36} style="color:#22c55e" />
            </div>
            <h3 class="text-base font-black" style="color:{T.primary}">¡Cotización enviada!</h3>
            <p class="text-xs max-w-xs" style="color:{T.muted}">Un asesor de VAPSA Rioverde se pondrá en contacto contigo muy pronto.</p>
          </div>
        {:else}
          <!-- Botón Google -->
          <button
            type="button"
            class="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all active:scale-[0.98] cursor-pointer"
            style="{$isDark ? 'background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.80);' : 'background:rgba(240,245,255,0.85);border:1px solid rgba(100,130,220,0.22);color:rgba(20,30,80,0.80);'}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <!-- Separador -->
          <div class="flex items-center gap-3">
            <div class="flex-1 h-px" style="background:{T.divider}"></div>
            <span class="text-[10px] font-bold tracking-widest uppercase" style="color:{T.muted}">O llena el formulario</span>
            <div class="flex-1 h-px" style="background:{T.divider}"></div>
          </div>

          <!-- Nombre -->
          <div>
            <label for="modal-nombre" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">
              Nombre *
            </label>
            <input
              id="modal-nombre"
              type="text"
              bind:value={modalNombre}
              placeholder="Tu nombre"
              class="w-full h-10 px-3 rounded-lg text-sm outline-none transition-all"
              style={formInput}
            />
          </div>

          <!-- Correo -->
          <div>
            <label for="modal-correo" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">
              Email *
            </label>
            <input
              id="modal-correo"
              type="email"
              bind:value={modalCorreo}
              placeholder="correo@ejemplo.com"
              class="w-full h-10 px-3 rounded-lg text-sm outline-none transition-all"
              style={formInput}
            />
          </div>

          <!-- Teléfono -->
          <div>
            <label for="modal-telefono" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">
              Teléfono *
            </label>
            <input
              id="modal-telefono"
              type="tel"
              bind:value={modalTelefono}
              placeholder="55 1234 5678"
              class="w-full h-10 px-3 rounded-lg text-sm outline-none transition-all"
              style={formInput}
            />
          </div>

          <!-- Notas adicionales -->
          <div>
            <label for="modal-notas" class="block text-[10px] font-bold tracking-wider uppercase mb-1" style="color:{labelColor}">
              Notas adicionales
            </label>
            <textarea
              id="modal-notas"
              bind:value={modalNotas}
              placeholder="¿Alguna pregunta o comentario sobre el vehículo?"
              rows="3"
              class="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all resize-none"
              style={formInput}
            ></textarea>
          </div>

          <!-- Checkboxes -->
          <div class="space-y-2.5 pt-3 mt-1 border-t" style="border-color:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.08)'}">
            <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {modalPrivacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{modalPrivacidad ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={modalPrivacidad} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if modalPrivacidad}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-[11px] leading-relaxed" style="color:{checkColor}">
                Acepto el <span class="text-blue-500 font-semibold underline">Aviso de Privacidad</span> y el tratamiento de mis datos personales. *
              </span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group" style="display:flex;align-items:center;">
              <div class="relative flex items-center justify-center w-[18px] h-[18px] rounded transition-all duration-200 flex-shrink-0" style="border:1px solid {modalPromocion ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,80,0.3)')}; background:{modalPromocion ? '#3b82f6' : ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)')};">
                <input type="checkbox" bind:checked={modalPromocion} class="absolute opacity-0 w-0 h-0 cursor-pointer" />
                {#if modalPromocion}<svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>{/if}
              </div>
              <span class="text-[11px] leading-relaxed" style="color:{checkColor}">
                Deseo recibir ofertas, promociones y novedades de VAPSA por correo y WhatsApp.
              </span>
            </label>
          </div>

          <!-- CTA submit -->
          <button
            type="button"
            onclick={handleModalSubmit}
            disabled={!modalCanComplete || modalSubmitting}
            class="w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style="background: linear-gradient(135deg,#334E8B,#4C8EF0); box-shadow: 0 8px 24px rgba(51,78,139,0.35);"
          >
            {#if modalSubmitting}
              <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" stroke-width="3" stroke-dasharray="31.4" stroke-dashoffset="10"/>
              </svg>
              Enviando…
            {:else}
              <GoogleIcon name="send" size={16} />
              Enviar solicitud
            {/if}
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<!-- ─────────────── PÁGINA PRINCIPAL ─────────────── -->
<div class="min-h-screen pt-20 pb-28 transition-colors duration-500" style="background: {pageBg}">
  <div class="max-w-7xl mx-auto px-4 md:px-8">

    <!-- Botón Regresar -->
    <button
      onclick={onBack}
      class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-6 transition-all hover:-translate-x-1 cursor-pointer"
      style="background: {$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(51,78,139,0.06)'}; color: {T.primary}; border: 1px solid {T.divider};"
    >
      <GoogleIcon name="arrow_back" size={16} />
      <span class="hidden sm:inline">Regresar al inventario</span>
    </button>

    <!-- Encabezado Principal -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl md:text-5xl font-black tracking-tight" style="color: {T.primary}">
          {car.title} <span class="font-light opacity-60">{car.year}</span>
        </h1>
        <p class="text-sm mt-2 max-w-2xl" style="color: {T.secondary}">
          {car.tagline}
        </p>
      </div>
      <div class="flex-shrink-0 md:text-right border-t md:border-t-0 pt-3 md:pt-0" style="border-color: {T.divider}">
        <p class="text-[10px] font-black uppercase tracking-widest mb-0.5" style="color: {T.muted}">Precio</p>
        <p class="text-3xl md:text-4xl font-black text-blue-500">{car.price}</p>
        <p class="text-xs font-semibold mt-1 flex items-center md:justify-end gap-1" style="color: {T.muted}">
          <GoogleIcon name="location_on" size={14} /> {car.location}, {car.state}
        </p>
      </div>
    </div>

    <!-- Layout 2 columnas -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <!-- ── Columna Izquierda: Galería ── -->
      <div class="lg:col-span-2 flex flex-col gap-4">

        <!-- Imagen Principal -->
        <div class="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group border" style="border-color: {T.divider}">
          {#key activeImage}
            <img
              src={activeImage}
              alt="{car.title} vista principal"
              transition:fade={{ duration: 300 }}
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          {/key}
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          <button onclick={prevImage} aria-label="Imagen anterior"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white border border-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg">
            <GoogleIcon name="chevron_left" size={24} />
          </button>
          <button onclick={nextImage} aria-label="Imagen siguiente"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white border border-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg">
            <GoogleIcon name="chevron_right" size={24} />
          </button>

          <span class="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl backdrop-blur-md bg-black/40 text-white border border-white/10 text-xs font-bold tracking-wide pointer-events-none">
            Vista {activeImageIndex + 1} de {car.images.length}
          </span>
        </div>

        <!-- Miniaturas -->
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {#each car.images as img, i}
            <button
              onclick={() => activeImageIndex = i}
              class="relative w-24 md:w-32 aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 cursor-pointer"
              style="border-color: {activeImageIndex === i ? '#3b82f6' : T.divider}; opacity: {activeImageIndex === i ? 1 : 0.6}; transform: {activeImageIndex === i ? 'scale(1)' : 'scale(0.96)'}"
            >
              <img src={img} alt="miniatura {i+1}" class="w-full h-full object-cover" />
            </button>
          {/each}
        </div>

        <!-- ── 8 Fichas Técnicas ── -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {#each specs as spec}
            <div
              class="p-4 rounded-xl flex flex-col justify-center gap-0.5 transition-all hover:scale-[1.02]"
              style="background: {$isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.80)'}; border: 1px solid {T.divider}; box-shadow: {$isDark ? '0 4px 16px rgba(0,0,0,0.30)' : '0 4px 16px rgba(51,78,139,0.06)'};"
            >
              <GoogleIcon name={spec.icon} size={18} style="color:#4C8EF0; margin-bottom:4px;" />
              <span class="text-[9px] font-black uppercase tracking-wider opacity-55" style="color: {T.primary}">{spec.label}</span>
              <span class="text-xs font-black leading-tight mt-0.5" style="color: {T.primary}">{spec.value}</span>
            </div>
          {/each}
        </div>

        <!-- Equipamiento Destacado -->
        <div class="mt-2 p-6 rounded-2xl" style={glassCard}>
          <h3 class="text-base font-black tracking-wide uppercase mb-4 flex items-center gap-2" style="color: {T.primary}">
            <GoogleIcon name="star" size={18} class="text-blue-500" />
            Equipamiento y características
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {#each car.features as feature}
              <li class="flex items-start gap-2.5 text-xs font-medium" style="color: {T.secondary}">
                <GoogleIcon name="check_circle" size={16} class="text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- ── Columna Derecha: CTA Sticky ── -->
      <div class="lg:sticky lg:top-24 flex flex-col gap-4">

        <!-- ★ WHATSAPP CTA — máxima visibilidad / CRO -->
        <a
          href="https://wa.me/524448001200?text=Hola%2C%20me%20interesa%20el%20{encodeURIComponent(car.title + ' ' + car.year)}%20en%20%24{car.price}."
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-wide text-white flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] cursor-pointer shadow-lg"
          style="background: linear-gradient(135deg,#25d366,#128c7e); box-shadow: 0 8px 28px rgba(37,211,102,0.40);"
        >
          <!-- WhatsApp SVG icon -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>

        <!-- Tarjeta principal de cotización -->
        <div class="mt-4 p-7 rounded-2xl flex flex-col gap-5 relative overflow-hidden" style={glassCard}>
          <!-- Acento superior -->
          <div class="absolute top-0 left-0 right-0 h-1" style="background: linear-gradient(90deg,#334E8B,#4C8EF0)"></div>

          <div class="pt-1">
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-2">Tu próximo vehículo</span>
            <h3 class="text-xl font-black leading-snug mb-2" style="color: {T.primary}">¿Te interesa este {car.title}?</h3>
            <p class="text-xs leading-relaxed" style="color: {T.secondary}">
              Ponte en contacto con nuestro equipo de seminuevos para agendar una prueba de manejo o solicitar financiamiento.
            </p>
          </div>

          <!-- Info del distribuidor -->
          <div class="px-4 py-3.5 rounded-xl flex flex-col gap-2.5" style="background: {$isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'}; border: 1px solid {T.divider}">
            <p class="text-xs font-black flex items-center gap-1.5" style="color: {T.primary}">
              <GoogleIcon name="storefront" size={16} class="text-blue-500" />
              {car.location}
            </p>
            <p class="text-[11px] leading-relaxed" style="color: {T.secondary}">
              BLVD SAN LUIS 1158,<br />San Luis Potosí, San Luis Potosí
            </p>
            <div class="pt-2.5 mt-0.5 border-t flex items-center justify-between" style="border-color: {T.divider}">
              <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Teléfono Directo</span>
              <a href="tel:4448001200" class="text-xs font-black text-blue-500 hover:underline">444 800 1200</a>
            </div>
          </div>

          <!-- Botón cotización → abre modal -->
          <button
            onclick={openModal}
            class="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all hover:opacity-90 hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            style="background: linear-gradient(135deg,#334E8B,#4C8EF0); box-shadow: 0 8px 24px rgba(51,78,139,0.35);"
          >
            <GoogleIcon name="calculate" size={16} />
            <span>Solicitar cotización</span>
          </button>

          <!-- Garantías -->
          <div class="border-t pt-4" style="border-color:{T.divider}">
            <div class="flex items-stretch justify-around text-center">
              <div class="flex flex-col items-center justify-center gap-1 flex-1">
                <GoogleIcon name="task_alt" size={18} style="color:#4C8EF0" />
                <span class="text-[9px] font-extrabold uppercase tracking-widest leading-tight" style="color:{T.muted}">100% Legal</span>
              </div>
              <div class="w-px self-stretch mx-1" style="background:{T.divider}"></div>
              <div class="flex flex-col items-center justify-center gap-1 flex-1">
                <GoogleIcon name="build" size={18} style="color:#4C8EF0" />
                <span class="text-[9px] font-extrabold uppercase tracking-widest leading-tight" style="color:{T.muted}">Garantizado</span>
              </div>
              <div class="w-px self-stretch mx-1" style="background:{T.divider}"></div>
              <div class="flex flex-col items-center justify-center gap-1 flex-1">
                <GoogleIcon name="local_shipping" size={18} style="color:#4C8EF0" />
                <span class="text-[9px] font-extrabold uppercase tracking-widest leading-tight" style="color:{T.muted}">Entrega rápida</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Banner inspección -->
        <div class="p-5 rounded-2xl border flex items-start gap-3" style="background: {$isDark ? 'rgba(59,130,246,0.05)' : 'rgba(59,130,246,0.08)'}; border-color: rgba(59,130,246,0.15);">
          <GoogleIcon name="verified_user" size={20} class="text-blue-500 flex-shrink-0 mt-0.5" />
          <p class="text-xs leading-relaxed" style="color: {T.secondary}">
            <strong style="color: {T.primary}">Inspección Certificada:</strong> Este vehículo superó evaluaciones de compresión de motor, escaneo electrónico, chasis y revisión documental completa.
          </p>
        </div>

      </div><!-- /columna derecha -->
    </div><!-- /grid -->
  </div>
</div>
