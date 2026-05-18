<script lang="ts">
  import { fade, slide } from 'svelte/transition'
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'

  interface Props {
    onBack?: () => void
    onContact?: (tab: 'cotizacion' | 'cita' | 'prueba') => void
  }

  let { onBack, onContact }: Props = $props()

  // Datos extraídos de la URL solicitada
  const car = {
    title: 'Nissan Comerciales NP 300 Frontier',
    year: 2020,
    price: '$420,000',
    km: '86,853 km',
    location: 'Michoacán Motors',
    state: 'Michoacán',
    type: 'Pick-up',
    tagline: 'Nuestros seminuevos pasan por un proceso de inspección asegurando la calidad y legalidad de cada uno de ellos.',
    engine: 'Motor 2.5L de 4 cilindros',
    transmission: 'Manual de 6 velocidades',
    color: 'Plata Metálico',
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

  let activeImageIndex = $state(0)
  let activeImage = $derived(car.images[activeImageIndex])

  function prevImage() {
    activeImageIndex = (activeImageIndex - 1 + car.images.length) % car.images.length
  }

  function nextImage() {
    activeImageIndex = (activeImageIndex + 1) % car.images.length
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
</script>

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
        <p class="text-[10px] font-black uppercase tracking-widest mb-0.5" style="color: {T.muted}">Precio de contado</p>
        <p class="text-3xl md:text-4xl font-black text-blue-500">{car.price}</p>
        <p class="text-xs font-semibold mt-1 flex items-center md:justify-end gap-1" style="color: {T.muted}">
          <GoogleIcon name="location_on" size={14} /> {car.location}, {car.state}
        </p>
      </div>
    </div>

    <!-- Layout de Galería e Información -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <!-- Columna Izquierda: Galería de Imágenes (2 Columnas en Desktop) -->
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
          
          <!-- Controles de navegación de flechas -->
          <button 
            onclick={prevImage}
            aria-label="Imagen anterior"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white border border-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg"
          >
            <GoogleIcon name="chevron_left" size={24} />
          </button>
          
          <button 
            onclick={nextImage}
            aria-label="Imagen siguiente"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/70 text-white border border-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg"
          >
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

        <!-- Ficha Técnica Rápida -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div class="p-4 rounded-xl flex flex-col justify-center" style="background: {$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid {T.divider}">
            <GoogleIcon name="speed" size={18} class="text-blue-500 mb-1.5" />
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Kilometraje</span>
            <span class="text-sm font-black mt-0.5" style="color: {T.primary}">{car.km}</span>
          </div>
          <div class="p-4 rounded-xl flex flex-col justify-center" style="background: {$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid {T.divider}">
            <GoogleIcon name="settings" size={18} class="text-blue-500 mb-1.5" />
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Transmisión</span>
            <span class="text-xs font-black mt-0.5 leading-tight" style="color: {T.primary}">{car.transmission}</span>
          </div>
          <div class="p-4 rounded-xl flex flex-col justify-center" style="background: {$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid {T.divider}">
            <GoogleIcon name="directions_car" size={18} class="text-blue-500 mb-1.5" />
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Motor</span>
            <span class="text-xs font-black mt-0.5 leading-tight line-clamp-1" style="color: {T.primary}">{car.engine}</span>
          </div>
          <div class="p-4 rounded-xl flex flex-col justify-center" style="background: {$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid {T.divider}">
            <GoogleIcon name="palette" size={18} class="text-blue-500 mb-1.5" />
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Color exterior</span>
            <span class="text-xs font-black mt-0.5 leading-tight" style="color: {T.primary}">{car.color}</span>
          </div>
        </div>

        <!-- Sección de Equipamiento Destacado -->
        <div class="mt-6 p-6 rounded-2xl" style={glassCard}>
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

      <!-- Columna Derecha: Tarjeta de Contacto / Apartado (Sticky) -->
      <div class="lg:sticky lg:top-24 flex flex-col gap-6">
        
        <div class="p-6 md:p-8 rounded-2xl flex flex-col gap-5 relative overflow-hidden" style={glassCard}>
          <!-- Acento decorativo superior -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>

          <div>
            <span class="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-1">Tu próximo vehículo</span>
            <h3 class="text-xl font-black leading-tight" style="color: {T.primary}">¿Te interesa este {car.title}?</h3>
            <p class="text-xs mt-1.5 leading-relaxed" style="color: {T.secondary}">
              Ponte en contacto directo con nuestro equipo de seminuevos para agendar una prueba de manejo o solicitar financiamiento.
            </p>
          </div>

          <!-- Información del Distribuidor -->
          <div class="p-4 rounded-xl flex flex-col gap-2" style="background: {$isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'}; border: 1px solid {T.divider}">
            <p class="text-xs font-black flex items-center gap-1.5" style="color: {T.primary}">
              <GoogleIcon name="storefront" size={16} class="text-blue-500" />
              {car.location}
            </p>
            <p class="text-[11px] leading-relaxed" style="color: {T.secondary}">
              Av. Madero Poniente #1474 Col. Nueva Valladolid,<br />Morelia, Michoacán.
            </p>
            <div class="pt-2 mt-1 border-t flex items-center justify-between" style="border-color: {T.divider}">
              <span class="text-[10px] font-bold uppercase tracking-wider opacity-60" style="color: {T.primary}">Teléfono Directo</span>
              <a href="tel:4433160075" class="text-xs font-black text-blue-500 hover:underline">443 316 0075</a>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex flex-col gap-2.5 pt-2">
            <button 
              onclick={() => onContact?.('cotizacion')}
              class="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all hover:opacity-90 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              style="background: #334E8B;"
            >
              <GoogleIcon name="calculate" size={16} />
              <span>Solicitar cotización</span>
            </button>
          </div>

          <!-- Garantías Cortas -->
          <div class="pt-2 flex items-center justify-center gap-4 text-center">
            <div>
              <GoogleIcon name="task_alt" size={16} class="text-blue-500 mb-0.5" />
              <span class="block text-[9px] font-extrabold uppercase tracking-widest" style="color: {T.muted}">100% Legal</span>
            </div>
            <div class="w-px h-6" style="background: {T.divider}"></div>
            <div>
              <GoogleIcon name="build" size={16} class="text-blue-500 mb-0.5" />
              <span class="block text-[9px] font-extrabold uppercase tracking-widest" style="color: {T.muted}">Garantizado</span>
            </div>
            <div class="w-px h-6" style="background: {T.divider}"></div>
            <div>
              <GoogleIcon name="local_shipping" size={16} class="text-blue-500 mb-0.5" />
              <span class="block text-[9px] font-extrabold uppercase tracking-widest" style="color: {T.muted}">Entrega Inmediata</span>
            </div>
          </div>
        </div>

        <!-- Banner Informativo Extra -->
        <div class="p-5 rounded-2xl border flex items-start gap-3" style="background: {$isDark ? 'rgba(59,130,246,0.05)' : 'rgba(59,130,246,0.08)'}; border-color: rgba(59,130,246,0.15);">
          <GoogleIcon name="info" size={20} class="text-blue-500 flex-shrink-0 mt-0.5" />
          <p class="text-xs leading-relaxed" style="color: {T.secondary}">
            <strong style="color: {T.primary}">Inspección Certificada:</strong> Este vehículo superó evaluaciones de compresión de motor, escaneo electrónico, chasis y revisión documental completa.
          </p>
        </div>

      </div>

    </div>

  </div>
</div>
