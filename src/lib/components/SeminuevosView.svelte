<script lang="ts">
  import { Search, SlidersHorizontal, ChevronRight, CheckCircle2, ShieldCheck, Wrench, FileText } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'

  const INVENTORY = [
    { id: 1, title: 'Jeep Grand Cherokee', year: 2024, price: '$950,000', km: '15,000 km', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', type: 'SUV' },
    { id: 2, title: 'Dodge Journey', year: 2023, price: '$520,000', km: '32,000 km', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800', type: 'SUV' },
    { id: 3, title: 'Ram 1200 Pick-Up', year: 2025, price: '$480,000', km: '5,000 km', image: 'https://images.unsplash.com/photo-1583122620076-2f089608a092?auto=format&fit=crop&q=80&w=800', type: 'Pick-up' },
    { id: 4, title: 'Fiat Pulse', year: 2024, price: '$360,000', km: '20,000 km', image: 'https://images.unsplash.com/photo-1620216447814-616a2468f635?auto=format&fit=crop&q=80&w=800', type: 'SUV' },
    { id: 5, title: 'Peugeot 3008', year: 2024, price: '$610,000', km: '12,000 km', image: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3eb?auto=format&fit=crop&q=80&w=800', type: 'SUV' },
    { id: 6, title: 'Ford Mustang', year: 2020, price: '$780,000', km: '45,000 km', image: 'https://images.unsplash.com/photo-1584345611127-8dd8eb0c5b59?auto=format&fit=crop&q=80&w=800', type: 'Deportivo' },
    { id: 7, title: 'Nissan NP300 Frontier', year: 2020, price: '$390,000', km: '68,000 km', image: 'https://images.unsplash.com/photo-1605816988085-30043ec11d21?auto=format&fit=crop&q=80&w=800', type: 'Pick-up' },
    { id: 8, title: 'BMW X3', year: 2019, price: '$650,000', km: '55,000 km', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800', type: 'SUV' },
  ]

  let filterText = $state('')
  let filteredInventory = $derived(INVENTORY.filter(car => car.title.toLowerCase().includes(filterText.toLowerCase())))

  const pageBg = $derived($isDark
    ? 'linear-gradient(160deg,#05080F 0%,#080C18 40%,#05080F 100%)'
    : 'linear-gradient(160deg,#f0f4ff 0%,#e8eef8 50%,#f5f8ff 100%)'
  )
  const T = $derived({
    primary:   $isDark ? 'white'                      : '#1a2040',
    secondary: $isDark ? 'rgba(255,255,255,0.7)'      : 'rgba(20,30,80,0.7)',
    muted:     $isDark ? 'rgba(255,255,255,0.45)'     : 'rgba(20,30,80,0.5)',
    divider:   $isDark ? 'rgba(255,255,255,0.08)'     : 'rgba(100,130,220,0.14)',
  })
  const glassCard = $derived($isDark
    ? 'background:rgba(255,255,255,0.04);backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.4);'
    : 'background:rgba(255,255,255,0.75);backdrop-filter:blur(30px);border:1px solid rgba(100,140,220,0.2);box-shadow:0 8px 32px rgba(30,60,120,0.08);'
  )
  const glassInput = $derived($isDark
    ? 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:white;'
    : 'background:rgba(255,255,255,0.9);border:1px solid rgba(100,130,220,0.25);color:#1a2040;'
  )
</script>

<div class="min-h-screen pt-24 pb-20" style="background:{pageBg}">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    
    <!-- Header -->
    <div class="text-center mb-12">
      <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4" 
        style="background:{$isDark ? 'rgba(59,130,246,0.15)' : 'rgba(51,78,139,0.1)'}; color:{$isDark ? '#60a5fa' : '#334E8B'}">
        Garantía y Confianza
      </span>
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4" style="color:{T.primary}; letter-spacing:-1px">
        Seminuevos <span style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Garantizados</span>
      </h1>
      <p class="max-w-2xl mx-auto text-lg" style="color:{T.secondary}">
        Encuentra el auto perfecto para ti. Todos nuestros vehículos pasan por una rigurosa inspección de 117 puntos para garantizar tu tranquilidad.
      </p>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-2xl" style={glassCard}>
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={18} style="color:{T.primary}" />
        <input 
          type="text" 
          bind:value={filterText}
          placeholder="Buscar marca o modelo..." 
          class="w-full h-12 pl-11 pr-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/50"
          style={glassInput}
        />
      </div>
      <button class="flex items-center justify-center gap-2 px-6 h-12 rounded-xl font-semibold transition-all hover:opacity-80" 
        style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'}; color:{T.primary}; border:1px solid {T.divider}">
        <SlidersHorizontal size={18} />
        Filtros Avanzados
      </button>
    </div>

    <!-- Inventory Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {#each filteredInventory as car (car.id)}
        <div class="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer" style={glassCard}>
          <div class="relative h-48 overflow-hidden">
            <img src={car.image} alt={car.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-md" style="background:rgba(0,0,0,0.6)">
              {car.year}
            </div>
          </div>
          <div class="p-5 flex flex-col flex-1">
            <span class="text-[10px] uppercase tracking-wider font-bold mb-1" style="color:#3b82f6">{car.type}</span>
            <h3 class="text-lg font-bold mb-1 line-clamp-1" style="color:{T.primary}">{car.title}</h3>
            <div class="flex items-center gap-2 mb-4" style="color:{T.muted}">
              <span class="text-xs font-medium bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{car.km}</span>
            </div>
            <div class="mt-auto flex items-end justify-between">
              <div>
                <p class="text-[10px] uppercase tracking-wider mb-0.5" style="color:{T.muted}">Precio</p>
                <p class="text-xl font-black" style="color:{T.primary}">{car.price}</p>
              </div>
              <button class="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:bg-blue-500 group-hover:text-white" 
                style="background:{$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; color:{T.primary}">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Benefits Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl" style={glassCard}>
        <ShieldCheck class="mb-4 text-blue-500" size={32} />
        <h4 class="text-lg font-bold mb-2" style="color:{T.primary}">Garantía VAPSA</h4>
        <p class="text-sm" style="color:{T.secondary}">Hasta 1 año de garantía en motor y transmisión en modelos seleccionados.</p>
      </div>
      <div class="p-6 rounded-2xl" style={glassCard}>
        <Wrench class="mb-4 text-blue-500" size={32} />
        <h4 class="text-lg font-bold mb-2" style="color:{T.primary}">Inspección Mecánica</h4>
        <p class="text-sm" style="color:{T.secondary}">Evaluación exhaustiva de 117 puntos de seguridad, estética y funcionamiento.</p>
      </div>
      <div class="p-6 rounded-2xl" style={glassCard}>
        <FileText class="mb-4 text-blue-500" size={32} />
        <h4 class="text-lg font-bold mb-2" style="color:{T.primary}">Documentación en regla</h4>
        <p class="text-sm" style="color:{T.secondary}">Garantizamos que todos nuestros vehículos cuentan con facturas y pagos al día.</p>
      </div>
    </div>

  </div>
</div>
