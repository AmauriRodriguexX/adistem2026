<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import GoogleIcon from './GoogleIcon.svelte'
  import SeminuevoDetailLanding from './SeminuevoDetailLanding.svelte'

  const INVENTORY = [
    { id: 1, title: 'Jeep Grand Cherokee', year: 2024, price: '$950,000', km: '15,000 km', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', type: 'SUV', brand: 'Jeep', model: 'Grand Cherokee', transmission: 'Automática', numPrice: 950000, numKm: 15000 },
    { id: 2, title: 'Dodge Journey', year: 2023, price: '$520,000', km: '32,000 km', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800', type: 'SUV', brand: 'Dodge', model: 'Journey', transmission: 'Automática', numPrice: 520000, numKm: 32000 },
    { id: 3, title: 'Ram 1200 Pick-Up', year: 2025, price: '$480,000', km: '5,000 km', image: 'https://images.unsplash.com/photo-1583122620076-2f089608a092?auto=format&fit=crop&q=80&w=800', type: 'Pick-up', brand: 'Ram', model: '1200 Pick-Up', transmission: 'Automática', numPrice: 480000, numKm: 5000 },
    { id: 4, title: 'Fiat Pulse', year: 2024, price: '$360,000', km: '20,000 km', image: 'https://images.unsplash.com/photo-1620216447814-616a2468f635?auto=format&fit=crop&q=80&w=800', type: 'SUV', brand: 'Fiat', model: 'Pulse', transmission: 'Manual', numPrice: 360000, numKm: 20000 },
    { id: 5, title: 'Peugeot 3008', year: 2024, price: '$610,000', km: '12,000 km', image: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3eb?auto=format&fit=crop&q=80&w=800', type: 'SUV', brand: 'Peugeot', model: '3008', transmission: 'Automática', numPrice: 610000, numKm: 12000 },
    { id: 6, title: 'Ford Mustang', year: 2020, price: '$780,000', km: '45,000 km', image: 'https://images.unsplash.com/photo-1584345611127-8dd8eb0c5b59?auto=format&fit=crop&q=80&w=800', type: 'Deportivo', brand: 'Ford', model: 'Mustang', transmission: 'Automática', numPrice: 780000, numKm: 45000 },
    { id: 7, title: 'Nissan Comerciales NP 300 Frontier', year: 2020, price: '$420,000', km: '86,853 km', image: 'https://spdfc.s3.us-west-2.amazonaws.com/distribuidores/Michoacan_Motors/seminuevos/5568/1.jpeg', type: 'Pick-up', brand: 'Nissan', model: 'NP 300 Frontier', transmission: 'Manual', numPrice: 420000, numKm: 86853 },
    { id: 8, title: 'BMW X3', year: 2019, price: '$650,000', km: '55,000 km', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800', type: 'SUV', brand: 'BMW', model: 'X3', transmission: 'Automática', numPrice: 650000, numKm: 55000 },
  ]

  // Estados de filtrado avanzado
  let filterText = $state('')
  let selectedYear = $state('')
  let selectedBrand = $state('')
  let selectedModel = $state('')
  let selectedTransmission = $state('')
  let maxPrice = $state(2000000)
  let maxKm = $state(499001)

  let selectedCarId: number | null = $state(null)

  // Opciones derivadas para los selects
  const availableYears = [2025, 2024, 2023, 2020, 2019]
  const availableBrands = ['Jeep', 'Dodge', 'Ram', 'Fiat', 'Peugeot', 'Ford', 'Nissan', 'BMW']
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
    const matchPrice = car.numPrice <= maxPrice
    const matchKm = car.numKm <= maxKm
    return matchSearch && matchYear && matchBrand && matchModel && matchTrans && matchPrice && matchKm
  }))

  function resetFilters() {
    filterText = ''
    selectedYear = ''
    selectedBrand = ''
    selectedModel = ''
    selectedTransmission = ''
    maxPrice = 2000000
    maxKm = 499001
  }

  // Formateadores locales basados en la imagen enviada por el usuario
  function formatCurr(val: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val)
  }

  function formatKm(val: number) {
    return new Intl.NumberFormat('es-MX').format(val) + ' km'
  }

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

            <!-- Precio Slider -->
            <div class="pt-2">
              <div class="flex justify-between items-center text-xs font-bold mb-1" style="color:{T.primary}">
                <span>Precio</span>
              </div>
              <div class="flex justify-between items-center text-[11px] mb-1.5 font-medium" style="color:{T.muted}">
                <span>$50,000.00</span>
                <span>$2,000,000.00</span>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="2000000" 
                step="25000"
                bind:value={maxPrice}
                class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-black dark:accent-blue-500 bg-gray-200 dark:bg-gray-700"
              />
              <span class="block text-[11px] font-medium mt-1 text-left" style="color:{T.muted}">
                Hasta {formatCurr(maxPrice)}
              </span>
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
