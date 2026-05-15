<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'
  import SeminuevoDetailLanding from './SeminuevoDetailLanding.svelte'

  const GS = 'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F'
  const GQ = '&alt=media'

  const INVENTORY = [
    // ── Jeep ───────────────────────────────────────────────────────────────
    { id:  1, title: 'Jeep Grand Cherokee', year: 2024, price: '$950,000',  km: '15,000 km',  image: `${GS}dbbe0b1e89813d5569554d4d88221a1b92e0d6f2.jpg?generation=1777350234515482${GQ}`, type: 'SUV',       brand: 'Jeep',    model: 'Grand Cherokee', transmission: 'Automática', numPrice: 950000,  numKm: 15000  },
    { id:  2, title: 'Jeep Compass',        year: 2023, price: '$580,000',  km: '28,000 km',  image: `${GS}0d3d7a1dc7e07f0e64c4fb84601cc8fa871c5acc.jpg?generation=1777350234540448${GQ}`, type: 'SUV',       brand: 'Jeep',    model: 'Compass',        transmission: 'Automática', numPrice: 580000,  numKm: 28000  },
    { id:  3, title: 'Jeep Commander',      year: 2023, price: '$720,000',  km: '19,500 km',  image: `${GS}0c31e45701627ca72a88b646087445172fc4a302.jpg?generation=1777350234492066${GQ}`, type: 'SUV',       brand: 'Jeep',    model: 'Commander',      transmission: 'Automática', numPrice: 720000,  numKm: 19500  },
    { id:  4, title: 'Jeep Renegade',       year: 2023, price: '$385,000',  km: '35,000 km',  image: `${GS}03eb70622ac5b618a05ca4b50608ada9e5f36dff.jpg?generation=1777350234483821${GQ}`, type: 'SUV',       brand: 'Jeep',    model: 'Renegade',       transmission: 'Manual',     numPrice: 385000,  numKm: 35000  },
    // ── Dodge ──────────────────────────────────────────────────────────────
    { id:  5, title: 'Dodge Journey',       year: 2023, price: '$520,000',  km: '32,000 km',  image: `${GS}c8f39b8a62ba049430811aa128ea21a793615787.jpg?generation=1777350234748118${GQ}`, type: 'SUV',       brand: 'Dodge',   model: 'Journey',        transmission: 'Automática', numPrice: 520000,  numKm: 32000  },
    { id:  6, title: 'Dodge Durango',       year: 2022, price: '$990,000',  km: '18,000 km',  image: `${GS}1d6f3f42a55407817e0572a9323b9aa10c891633.jpg?generation=1777350234722595${GQ}`, type: 'SUV',       brand: 'Dodge',   model: 'Durango',        transmission: 'Automática', numPrice: 990000,  numKm: 18000  },
    { id:  7, title: 'Dodge Attitude',      year: 2023, price: '$285,000',  km: '42,000 km',  image: `${GS}fd24ea9b590e1057b2b5aece02f0924645f557d3.jpg?generation=1777350234728971${GQ}`, type: 'Sedán',     brand: 'Dodge',   model: 'Attitude',       transmission: 'Automática', numPrice: 285000,  numKm: 42000  },
    // ── Ram ────────────────────────────────────────────────────────────────
    { id:  8, title: 'Ram 1500',            year: 2023, price: '$1,050,000',km: '11,000 km',  image: `${GS}366059fdfc8601cb267c2dfe66bce5eff26e9802.jpg?generation=1777350234982606${GQ}`, type: 'Pick-up',   brand: 'Ram',     model: '1500',           transmission: 'Automática', numPrice: 1050000, numKm: 11000  },
    { id:  9, title: 'Ram 1200 Pick-Up',    year: 2025, price: '$480,000',  km: '5,000 km',   image: `${GS}d77a3a9cf0b124b56b0ca97a272a05d66cdb4f9b.jpg?generation=1777350234972552${GQ}`, type: 'Pick-up',   brand: 'Ram',     model: '1200 Pick-Up',   transmission: 'Automática', numPrice: 480000,  numKm: 5000   },
    { id: 10, title: 'Ram 700',             year: 2023, price: '$370,000',  km: '15,000 km',  image: `${GS}f5ec5130c0e32e9b8f088516b511cd201f316b59.jpg?generation=1777350234996294${GQ}`, type: 'Pick-up',   brand: 'Ram',     model: '700',            transmission: 'Manual',     numPrice: 370000,  numKm: 15000  },
    // ── Fiat ───────────────────────────────────────────────────────────────
    { id: 11, title: 'Fiat Pulse',          year: 2024, price: '$360,000',  km: '20,000 km',  image: `${GS}12af6dc13f44f29033d673c803a50f637af22da0.jpg?generation=1777350234700225${GQ}`, type: 'SUV',       brand: 'Fiat',    model: 'Pulse',          transmission: 'Manual',     numPrice: 360000,  numKm: 20000  },
    { id: 12, title: 'Fiat Fastback',       year: 2023, price: '$418,000',  km: '24,000 km',  image: `${GS}73305e43e64c51813013640443da7b7c6dbe392e.jpg?generation=1777350234711531${GQ}`, type: 'SUV',       brand: 'Fiat',    model: 'Fastback',       transmission: 'Automática', numPrice: 418000,  numKm: 24000  },
    { id: 13, title: 'Fiat Argo',           year: 2023, price: '$265,000',  km: '38,000 km',  image: `${GS}35bd343876d4e41f21a86499747f1af99d5fe2b2.jpg?generation=1777350234727796${GQ}`, type: 'Hatchback', brand: 'Fiat',    model: 'Argo',           transmission: 'Manual',     numPrice: 265000,  numKm: 38000  },
    // ── Peugeot ────────────────────────────────────────────────────────────
    { id: 14, title: 'Peugeot 3008',        year: 2024, price: '$610,000',  km: '12,000 km',  image: `${GS}97992cfc1a6ba95676e9baa2cff5b4fe94dd63c7.jpg?generation=1777350234796103${GQ}`, type: 'SUV',       brand: 'Peugeot', model: '3008',           transmission: 'Automática', numPrice: 610000,  numKm: 12000  },
    { id: 15, title: 'Peugeot 5008',        year: 2023, price: '$695,000',  km: '22,000 km',  image: `${GS}a324072dc54a25de50940520db820b447f976fdd.jpg?generation=1777350234728825${GQ}`, type: 'SUV',       brand: 'Peugeot', model: '5008',           transmission: 'Automática', numPrice: 695000,  numKm: 22000  },
    { id: 16, title: 'Peugeot 2008',        year: 2022, price: '$420,000',  km: '30,000 km',  image: `${GS}7ac848efe89adde5660e4d2956b4983e1775ce00.jpg?generation=1777350234794617${GQ}`, type: 'SUV',       brand: 'Peugeot', model: '2008',           transmission: 'Automática', numPrice: 420000,  numKm: 30000  },
    // ── Otros ──────────────────────────────────────────────────────────────
    { id: 18, title: 'Nissan NP 300 Frontier', year: 2020, price: '$420,000', km: '86,853 km', image: 'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/1.jpeg',         type: 'Pick-up',   brand: 'Nissan',  model: 'NP 300 Frontier', transmission: 'Manual',    numPrice: 420000,  numKm: 86853  },
    { id: 19, title: 'BMW X3',              year: 2019, price: '$650,000',  km: '55,000 km',  image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800',              type: 'SUV',       brand: 'BMW',     model: 'X3',             transmission: 'Automática', numPrice: 650000,  numKm: 55000  },
  ]

  // Estados de filtrado avanzado
  let filterText = $state('')
  let selectedYear = $state('')
  let selectedBrand = $state('')
  let selectedModel = $state('')
  let selectedTransmission = $state('')
  let maxPrice = $state(2000000)
  let maxKm = $state(499001)

  // ── Price range constants ──────────────────────────────────────────────────
  const MIN_PRICE      = 50000
  const MAX_PRICE      = 2000000
  const PRICE_STEP     = 25000
  const PRICE_BINS     = 16
  const PRICE_BIN_SIZE = (MAX_PRICE - MIN_PRICE) / PRICE_BINS

  // Synthetic distribution (peaks 350k–750k, realistic for seminuevos MX)
  const HIST_H = [0, 2, 6, 18, 36, 62, 82, 100, 88, 70, 52, 34, 20, 12, 6, 2]

  let minPrice = $state(MIN_PRICE)

  let selectedCarId: number | null = $state(null)

  // Opciones derivadas para los selects
  const availableYears = [2025, 2024, 2023, 2022, 2020, 2019]
  const availableBrands = ['Jeep', 'Dodge', 'Ram', 'Fiat', 'Peugeot', 'Nissan', 'BMW']
  let availableModels = $derived(
    Array.from(new Set(
      selectedBrand 
        ? INVENTORY.filter(c => c.brand === selectedBrand).map(c => c.model)
        : INVENTORY.map(c => c.model)
    ))
  )

  // Filtrado reactivo en tiempo real
  let filteredInventory = $derived(INVENTORY.filter(car => {
    const matchSearch = filterText ? car.title.toLowerCase().includes(filterText.toLowerCase()) : true
    const matchYear = selectedYear ? car.year.toString() === selectedYear : true
    const matchBrand = selectedBrand ? car.brand === selectedBrand : true
    const matchModel = selectedModel ? car.model === selectedModel : true
    const matchTrans = selectedTransmission ? car.transmission === selectedTransmission : true
    const matchPrice = car.numPrice >= minPrice && car.numPrice <= maxPrice
    const matchKm = car.numKm <= maxKm
    return matchSearch && matchYear && matchBrand && matchModel && matchTrans && matchPrice && matchKm
  }))

  function resetFilters() {
    filterText = ''
    selectedYear = ''
    selectedBrand = ''
    selectedModel = ''
    selectedTransmission = ''
    minPrice = MIN_PRICE
    maxPrice = MAX_PRICE
    maxKm = 499001
  }

  // Formateadores locales basados en la imagen enviada por el usuario
  function formatCurr(val: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val)
  }

  function formatKm(val: number) {
    return new Intl.NumberFormat('es-MX').format(val) + ' km'
  }

  function formatPriceShort(val: number) {
    return '$ ' + new Intl.NumberFormat('es-MX').format(val)
  }

  const minPricePct = $derived(((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100)
  const maxPricePct = $derived(((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100)

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )
  const T = $derived({
    primary:   $isDark ? 'white'                      : '#111827',
    secondary: $isDark ? 'rgba(255,255,255,0.7)'      : 'rgba(17,24,39,0.75)',
    muted:     $isDark ? 'rgba(255,255,255,0.45)'     : 'rgba(17,24,39,0.45)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(51,78,139,0.12)',
    selectBg:  $isDark ? '#1f2937'                    : '#f3f4f6',
    panelBg:   $isDark ? 'rgba(15,23,42,0.6)'         : 'rgba(255,255,255,0.85)',
  })
  const glassCard = $derived($isDark
    ? 'background:rgba(255,255,255,0.035);backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.4);'
    : 'background:rgba(255,255,255,0.75);backdrop-filter:blur(30px);border:1px solid rgba(51,78,139,0.15);box-shadow:0 8px 32px rgba(51,78,139,0.06);'
  )
  const glassInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:white;'
    : 'background:rgba(255,255,255,0.9);border:1px solid rgba(51,78,139,0.2);color:#111827;'
  )
</script>

{#if selectedCarId}
  <SeminuevoDetailLanding 
    onBack={() => {
      selectedCarId = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    onContact={(tab) => {
      history.pushState({ view: 'Contacto', tab }, '', '/adistem2026/contacto/');
      window.location.reload();
    }}
  />
{:else}
  <div class="min-h-screen pt-24 pb-20 transition-colors duration-500" style="background:{pageBg}">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <!-- Header de Sección -->
      <div class="text-center mb-10">
        <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3" 
          style="background:{$isDark ? 'rgba(59,130,246,0.15)' : 'rgba(51,78,139,0.1)'}; color:{$isDark ? '#60a5fa' : '#334E8B'}">
          Garantía y Confianza
        </span>
        <h1 class="text-4xl md:text-5xl font-black mb-3 tracking-tight" style="color:{T.primary}">
          Catálogo de <span style="background:linear-gradient(135deg,#334E8B,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Seminuevos</span>
        </h1>
        <p class="max-w-2xl mx-auto text-sm md:text-base" style="color:{T.secondary}">
          Encuentra el auto perfecto para ti. Todos nuestros vehículos superan una rigurosa inspección técnica para garantizar tu tranquilidad.
        </p>
      </div>

      <!-- Layout Principal de 2 Columnas (Filtros Avanzados a la Izquierda + Resultados a la Derecha) -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        <!-- COLUMNA 1: PANEL DE FILTROS (Fiel al screenshot del usuario con estética 2026) -->
        <div class="rounded-2xl overflow-hidden border shadow-xl flex flex-col lg:sticky lg:top-24" 
          style="background:{T.panelBg}; border-color:{T.divider}; backdrop-filter:blur(24px);">
          
          <!-- Encabezado Negro Fiel a la Imagen -->
          <div class="bg-black py-4 px-6 text-center">
            <h2 class="text-white font-black tracking-wider text-sm md:text-base uppercase">
              Filtros de Búsqueda
            </h2>
          </div>

          <!-- Formulario de Filtros Interno -->
          <div class="p-6 flex flex-col gap-5">
            
            <!-- Año -->
            <div>
              <label for="select-year" class="block text-xs font-bold text-left mb-1.5" style="color:{T.primary}">
                Año
              </label>
              <select 
                id="select-year"
                bind:value={selectedYear}
                class="w-full h-10 px-3 rounded-lg text-xs font-semibold outline-none border transition-all cursor-pointer"
                style="background:{T.selectBg}; color:{T.primary}; border-color:{T.divider};"
              >
                <option value="">ELIJA UN AÑO</option>
                {#each availableYears as yr}
                  <option value={yr.toString()}>{yr}</option>
                {/each}
              </select>
            </div>

            <!-- Marca -->
            <div>
              <label for="select-brand" class="block text-xs font-bold text-left mb-1.5" style="color:{T.primary}">
                Marca
              </label>
              <select 
                id="select-brand"
                bind:value={selectedBrand}
                onchange={() => selectedModel = ''}
                class="w-full h-10 px-3 rounded-lg text-xs font-semibold outline-none border transition-all cursor-pointer"
                style="background:{T.selectBg}; color:{T.primary}; border-color:{T.divider};"
              >
                <option value="">ELIJA UNA MARCA</option>
                {#each availableBrands as b}
                  <option value={b}>{b}</option>
                {/each}
              </select>
            </div>

            <!-- Modelo -->
            <div>
              <label for="select-model" class="block text-xs font-bold text-left mb-1.5" style="color:{T.primary}">
                Modelo
              </label>
              <select 
                id="select-model"
                bind:value={selectedModel}
                class="w-full h-10 px-3 rounded-lg text-xs font-semibold outline-none border transition-all cursor-pointer"
                style="background:{T.selectBg}; color:{T.primary}; border-color:{T.divider};"
              >
                <option value="">ELIJA UN MODELO</option>
                {#each availableModels as mod}
                  <option value={mod}>{mod}</option>
                {/each}
              </select>
            </div>

            <!-- Tipo de transmisión -->
            <div>
              <label for="select-trans" class="block text-xs font-bold text-left mb-1.5" style="color:{T.primary}">
                Tipo de transmisión
              </label>
              <select 
                id="select-trans"
                bind:value={selectedTransmission}
                class="w-full h-10 px-3 rounded-lg text-xs font-semibold outline-none border transition-all cursor-pointer"
                style="background:{T.selectBg}; color:{T.primary}; border-color:{T.divider};"
              >
                <option value="">ELIJA UNA TRANSMISIÓN</option>
                <option value="Automática">Automática</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <!-- Precio Range con Histograma -->
            <div class="pt-2">
              <p class="text-xs font-bold mb-3" style="color:{T.primary}">Precio</p>

              <!-- Desde / Hasta boxes -->
              <div class="flex items-center gap-1.5 mb-3">
                <div class="flex-1 rounded-lg border px-2.5 py-2 min-w-0" style="background:{T.selectBg}; border-color:{T.divider};">
                  <p class="text-[8px] font-black uppercase tracking-widest mb-0.5" style="color:{T.muted}">Desde</p>
                  <p class="text-[11px] font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis" style="color:{T.primary}">{formatPriceShort(minPrice)}</p>
                </div>
                <span class="text-xs flex-shrink-0" style="color:{T.muted}">—</span>
                <div class="flex-1 rounded-lg border px-2.5 py-2 min-w-0" style="background:{T.selectBg}; border-color:{T.divider};">
                  <p class="text-[8px] font-black uppercase tracking-widest mb-0.5" style="color:{T.muted}">Hasta</p>
                  <p class="text-[11px] font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis" style="color:{T.primary}">{formatPriceShort(maxPrice)}</p>
                </div>
              </div>

              <!-- Histograma -->
              <div class="flex items-end gap-[2px] h-10 mb-1.5 px-0.5">
                {#each HIST_H as h, i}
                  {@const lo = MIN_PRICE + i * PRICE_BIN_SIZE}
                  {@const hi = MIN_PRICE + (i + 1) * PRICE_BIN_SIZE}
                  {@const active = hi > minPrice && lo < maxPrice}
                  <div
                    class="flex-1 rounded-[2px] transition-colors duration-150"
                    style="height:{h}%;min-height:{h > 0 ? '3px' : '0px'};background:{active
                      ? ($isDark ? '#4A6BC4' : '#334E8B')
                      : ($isDark ? 'rgba(255,255,255,0.10)' : 'rgba(51,78,139,0.14)')};"
                  ></div>
                {/each}
              </div>

              <!-- Dual-handle range slider -->
              <div class="relative h-5 mx-0.5">
                <!-- Track fondo -->
                <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
                  style="background:{$isDark ? 'rgba(255,255,255,0.12)' : 'rgba(51,78,139,0.14)'}"></div>
                <!-- Track fill activo -->
                <div class="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full"
                  style="left:{minPricePct}%;right:{100 - maxPricePct}%;background:{$isDark ? '#4A6BC4' : '#334E8B'};"></div>
                <!-- Handle mínimo -->
                <input
                  type="range"
                  min={MIN_PRICE} max={MAX_PRICE} step={PRICE_STEP}
                  bind:value={minPrice}
                  oninput={() => { if (minPrice >= maxPrice - PRICE_STEP) minPrice = maxPrice - PRICE_STEP }}
                  class="price-thumb"
                  aria-label="Precio mínimo"
                />
                <!-- Handle máximo -->
                <input
                  type="range"
                  min={MIN_PRICE} max={MAX_PRICE} step={PRICE_STEP}
                  bind:value={maxPrice}
                  oninput={() => { if (maxPrice <= minPrice + PRICE_STEP) maxPrice = minPrice + PRICE_STEP }}
                  class="price-thumb"
                  aria-label="Precio máximo"
                />
              </div>
            </div>

            <!-- Kilometraje Slider -->
            <div class="pt-2">
              <div class="flex justify-between items-center text-xs font-bold mb-1.5 text-left" style="color:{T.primary}">
                <span>Kilometraje</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="499001" 
                step="5000"
                bind:value={maxKm}
                class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-black dark:accent-blue-500 bg-gray-200 dark:bg-gray-700"
              />
              <span class="block text-[11px] font-medium mt-1 text-left" style="color:{T.muted}">
                Hasta {formatKm(maxKm)}
              </span>
            </div>

            <!-- Botones Finales Fieles a la Imagen -->
            <div class="pt-3 flex flex-col gap-2">
              <button 
                onclick={() => {
                  // Desplazarse a la cuadrícula de resultados suavemente en pantallas medianas o pequeñas
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                class="w-full py-3.5 bg-black hover:bg-black/80 text-white font-bold rounded-lg text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                style="background: {$isDark ? '#334E8B' : '#000000'}"
              >
                <span>Ver Resultados</span>
                <span class="text-xs bg-white/20 px-2 py-0.5 rounded-full">{filteredInventory.length}</span>
              </button>

              {#if selectedYear || selectedBrand || selectedModel || selectedTransmission || filterText || maxPrice < 2000000 || maxKm < 499001}
                <button 
                  onclick={resetFilters}
                  class="text-[11px] font-bold underline py-1 text-center transition-all hover:opacity-80 cursor-pointer"
                  style="color:{T.muted}"
                >
                  Restablecer Filtros
                </button>
              {/if}
            </div>

          </div>
        </div>

        <!-- COLUMNA 2-4: CUADRÍCULA DE INVENTARIO Y BÚSQUEDA RÁPIDA -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          
          <!-- Buscador de texto y feedback de resultados -->
          <div class="p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border" 
            style="background:{T.panelBg}; border-color:{T.divider}; backdrop-filter:blur(20px);">
            <div class="relative w-full sm:w-72">
              <GoogleIcon name="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" size={16} style="color:{T.primary}" />
              <input 
                type="text" 
                bind:value={filterText}
                placeholder="Búsqueda rápida por nombre..." 
                class="w-full h-10 pl-10 pr-3 rounded-lg text-xs font-medium outline-none transition-all"
                style={glassInput}
              />
            </div>
            
            <div class="flex items-center gap-2 text-xs font-semibold" style="color:{T.primary}">
              <span>Mostrando</span>
              <span class="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 font-black border border-blue-500/20">
                {filteredInventory.length}
              </span>
              <span>vehículos disponibles</span>
            </div>
          </div>

          <!-- Cuadrícula de tarjetas -->
          {#if filteredInventory.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each filteredInventory as car (car.id)}
                <div 
                  role="button"
                  tabindex="0"
                  onclick={() => {
                    selectedCarId = car.id;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onkeydown={(e) => { if (e.key === 'Enter') selectedCarId = car.id }}
                  class="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-left border" 
                  style="{glassCard}; border-color:{T.divider};"
                >
                  <div class="relative h-44 overflow-hidden bg-black/5">
                    <img src={car.image} alt={car.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-black text-white backdrop-blur-md" style="background:rgba(0,0,0,0.65)">
                      {car.year}
                    </div>
                  </div>
                  <div class="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span class="text-[9px] font-black uppercase tracking-wider text-blue-500 block mb-0.5">{car.type}</span>
                      <h3 class="text-base font-bold leading-tight line-clamp-1" style="color:{T.primary}">{car.title}</h3>
                      <div class="flex items-center gap-2 mt-1.5 text-[11px]" style="color:{T.muted}">
                        <span class="font-medium bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">{car.km}</span>
                        <span>•</span>
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                    <div class="pt-2 border-t flex items-end justify-between" style="border-color:{T.divider}">
                      <div>
                        <p class="text-[9px] uppercase tracking-wider mb-0.5 font-bold" style="color:{T.muted}">Precio</p>
                        <p class="text-lg font-black text-blue-500">{car.price}</p>
                      </div>
                      <button class="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-blue-500 group-hover:text-white" 
                        style="background:{$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}; color:{T.primary}">
                        <GoogleIcon name="chevron_right" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <!-- Estado Vacío -->
            <div class="p-12 text-center rounded-2xl border flex flex-col items-center justify-center gap-3" style="background:{T.panelBg}; border-color:{T.divider};">
              <GoogleIcon name="sentiment_dissatisfied" size={48} class="opacity-30 mb-2" style="color:{T.primary}" />
              <h3 class="text-lg font-bold" style="color:{T.primary}">No se encontraron vehículos</h3>
              <p class="text-xs max-w-md" style="color:{T.secondary}">
                Ningún seminuevo coincide con la combinación de filtros seleccionada. Intenta ampliar el rango de precio o restablecer los valores.
              </p>
              <button 
                onclick={resetFilters} 
                class="mt-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-500 text-white transition-all hover:opacity-90"
              >
                Restablecer Filtros
              </button>
            </div>
          {/if}

          <!-- Sección Informativa de Garantías Inferior -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div class="p-5 rounded-xl border" style="background:{T.panelBg}; border-color:{T.divider};">
              <GoogleIcon name="verified_user" class="mb-2 text-blue-500" size={24} />
              <h4 class="text-sm font-bold mb-1" style="color:{T.primary}">Garantía VAPSA</h4>
              <p class="text-xs leading-relaxed" style="color:{T.secondary}">Cobertura en motor y transmisión en modelos autorizados.</p>
            </div>
            <div class="p-5 rounded-xl border" style="background:{T.panelBg}; border-color:{T.divider};">
              <GoogleIcon name="build" class="mb-2 text-blue-500" size={24} />
              <h4 class="text-sm font-bold mb-1" style="color:{T.primary}">Inspección de 117 Puntos</h4>
              <p class="text-xs leading-relaxed" style="color:{T.secondary}">Revisión mecánica, de carrocería y sistemas de seguridad.</p>
            </div>
            <div class="p-5 rounded-xl border" style="background:{T.panelBg}; border-color:{T.divider};">
              <GoogleIcon name="description" class="mb-2 text-blue-500" size={24} />
              <h4 class="text-sm font-bold mb-1" style="color:{T.primary}">Certeza Jurídica</h4>
              <p class="text-xs leading-relaxed" style="color:{T.secondary}">Facturas validadas, tenencias y pagos vehiculares al corriente.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
{/if}

<style>
  /* ── Dual-handle price range thumbs ──────────────────────────────────────── */
  .price-thumb {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    pointer-events: none;
    cursor: pointer;
  }

  /* Webkit thumb */
  .price-thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #334E8B;
    border: 2.5px solid white;
    box-shadow: 0 1px 8px rgba(51, 78, 139, 0.50), 0 0 0 0 rgba(51,78,139,0);
    pointer-events: all;
    cursor: grab;
    transition: transform 0.1s, box-shadow 0.1s;
  }
  .price-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 12px rgba(51, 78, 139, 0.65);
  }
  .price-thumb:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.2);
  }
  .price-thumb::-webkit-slider-runnable-track {
    background: transparent;
    height: 3px;
  }

  /* Firefox thumb */
  .price-thumb::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #334E8B;
    border: 2.5px solid white;
    box-shadow: 0 1px 8px rgba(51, 78, 139, 0.50);
    pointer-events: all;
    cursor: grab;
  }
  .price-thumb::-moz-range-track {
    background: transparent;
    height: 3px;
  }
</style>
