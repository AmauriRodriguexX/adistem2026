<script lang="ts">
  import type { VehicleType, BrandFilter } from '$lib/types'
  import { ChevronRight, ChevronLeft, Tag, LayoutGrid, List } from 'lucide-svelte'
  import { isDark } from '$lib/stores/theme'
  import { untrack } from 'svelte'
  import LiquidGlass from './LiquidGlass.svelte'

  interface Props {
    initialBrand?: BrandFilter
    initialType?:  VehicleType
  }
  let { initialBrand = 'Todas', initialType = 'Todos' }: Props = $props()

  const ALL_VEHICLES = [
    { id:1,  brand:'Jeep',    type:'SUV',        model:'Wrangler',       year:'2025', version:'Willys Unlimited',     img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdbbe0b1e89813d5569554d4d88221a1b92e0d6f2.jpg?generation=1777350234515482&alt=media',    deal:'Bono de hasta $200,000 ó 24 MSI sin comisión por apertura', badge:'⭐ ESTRELLA',    link:'#', accent:'#334E8B' },
    { id:2,  brand:'Jeep',    type:'SUV',        model:'Compass',        year:'2026', version:'Limited Premium',       img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0d3d7a1dc7e07f0e64c4fb84601cc8fa871c5acc.jpg?generation=1777350234540448&alt=media',    deal:'Descuento $70,000 · Mensualidad desde $6,499',              badge:'🔥 HOT',         link:'#', accent:'#334E8B' },
    { id:3,  brand:'Jeep',    type:'SUV',        model:'Commander',      year:'2025', version:'Overland FWD',          img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0c31e45701627ca72a88b646087445172fc4a302.jpg?generation=1777350234492066&alt=media',    deal:'Descuento $82,000 · Tasa desde 13.99%',                     badge:null,             link:'#', accent:'#334E8B' },
    { id:4,  brand:'Jeep',    type:'SUV',        model:'Renegade',       year:'2026', version:'Latitude',              img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F03eb70622ac5b618a05ca4b50608ada9e5f36dff.jpg?generation=1777350234483821&alt=media',    deal:'Descuento $40,000 · Mensualidad desde $5,499',              badge:null,             link:'#', accent:'#334E8B' },
    { id:5,  brand:'Fiat',    type:'SUV',        model:'Pulse',          year:'2026', version:'Drive T200',            img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F12af6dc13f44f29033d673c803a50f637af22da0.jpg?generation=1777350234700225&alt=media',    deal:'Bono $20,000 · Tasa 7.99% · Enganche $39,000',             badge:'💎 NUEVO',       link:'#', accent:'#D50000' },
    { id:6,  brand:'Fiat',    type:'Deportivos', model:'Pulse Abarth',   year:'2026', version:'Abarth',                img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcab9193a2663f242fe2c565e771d2cb7acb3bdfd.jpg?generation=1777350234690980&alt=media',    deal:'Bono $20,000 · Enganche desde $52,000',                     badge:'SPORT',          link:'#', accent:'#D50000' },
    { id:7,  brand:'Fiat',    type:'SUV',        model:'Fastback',       year:'2026', version:'Limited',               img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F73305e43e64c51813013640443da7b7c6dbe392e.jpg?generation=1777350234711531&alt=media',    deal:'Enganche $55,000 · Bono $20,000 · Tasa 7.99%',             badge:null,             link:'#', accent:'#D50000' },
    { id:8,  brand:'Fiat',    type:'Sedán',      model:'Argo',           year:'2025', version:'Drive',                 img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F35bd343876d4e41f21a86499747f1af99d5fe2b2.jpg?generation=1777350234727796&alt=media',    deal:'Bono $40,000 · Tasa desde 9.99%',                           badge:null,             link:'#', accent:'#D50000' },
    { id:9,  brand:'Dodge',   type:'SUV',        model:'Durango',        year:'2025', version:'R/T Plus',              img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1d6f3f42a55407817e0572a9323b9aa10c891633.jpg?generation=1777350234722595&alt=media',    deal:'Plan de financiamiento · Tasa desde 14.50%',                badge:'💪 POTENCIA',    link:'#', accent:'#D50000' },
    { id:10, brand:'Dodge',   type:'Sedán',      model:'Attitude',       year:'2026', version:'SXT',                   img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffd24ea9b590e1057b2b5aece02f0924645f557d3.jpg?generation=1777350234728971&alt=media',    deal:'Precio $379,900 · Mensualidad desde $4,299',                badge:null,             link:'#', accent:'#D50000' },
    { id:11, brand:'Dodge',   type:'SUV',        model:'Journey',        year:'2026', version:'GT',                    img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc8f39b8a62ba049430811aa128ea21a793615787.jpg?generation=1777350234748118&alt=media',    deal:'0% comisión por apertura · Tasa desde 14.50%',              badge:null,             link:'#', accent:'#D50000' },
    { id:12, brand:'Peugeot', type:'SUV',        model:'Nueva 2008',     year:'2026', version:'GT Pack',               img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7ac848efe89adde5660e4d2956b4983e1775ce00.jpg?generation=1777350234794617&alt=media',    deal:'Bono $62,000 · Tasa 9.99% · 3 años mantenimiento gratis',  badge:'🏆 MEJOR PRECIO', link:'#', accent:'#0074E8' },
    { id:13, brand:'Peugeot', type:'SUV',        model:'Nueva 5008',     year:'2026', version:'GT',                    img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa324072dc54a25de50940520db820b447f976fdd.jpg?generation=1777350234728825&alt=media',    deal:'Tasa 9.99% · 0% comisión · 3 años mantenimiento',           badge:null,             link:'#', accent:'#0074E8' },
    { id:14, brand:'Peugeot', type:'SUV',        model:'Nueva 3008',     year:'2026', version:'Allure Pack',           img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F97992cfc1a6ba95676e9baa2cff5b4fe94dd63c7.jpg?generation=1777350234796103&alt=media',    deal:'Bono $15,000 · Tasa 9.99% · 3 años mantenimiento',          badge:null,             link:'#', accent:'#0074E8' },
    { id:15, brand:'Peugeot', type:'Pick-ups',   model:'Nueva Partner',  year:'2026', version:'Active',                img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb1d61b52adc2aa72f9170a07361f38035b5794a8.jpg?generation=1777350234922828&alt=media',    deal:'Bono $25,000 · Tasa 11.99% · 2 años mantenimiento',         badge:null,             link:'#', accent:'#0074E8' },
    { id:16, brand:'Ram',     type:'Pick-ups',   model:'1500',           year:'2025', version:'Laramie 4x4',           img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F366059fdfc8601cb267c2dfe66bce5eff26e9802.jpg?generation=1777350234982606&alt=media',    deal:'Bono $50,000 · 24 meses sin intereses sin comisión',        badge:'🚀 TOP',          link:'#', accent:'#7B1F1F' },
    { id:17, brand:'Ram',     type:'Pick-ups',   model:'1200',           year:'2026', version:'Limited',               img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd77a3a9cf0b124b56b0ca97a272a05d66cdb4f9b.jpg?generation=1777350234972552&alt=media',    deal:'Precio $402,900 · Bono $47,000 · Tasa 14.50%',             badge:null,             link:'#', accent:'#7B1F1F' },
    { id:18, brand:'Ram',     type:'Pick-ups',   model:'700',            year:'2026', version:'Rebel',                 img:'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff5ec5130c0e32e9b8f088516b511cd201f316b59.jpg?generation=1777350234996294&alt=media',    deal:'Precio desde $344,900 · 0% comisión por apertura',          badge:null,             link:'#', accent:'#7B1F1F' },
  ]

  const TODAS_IDS: number[] = [1, 2, 9, 12, 16, 5, 3, 11, 13]

  const BRANDS: BrandFilter[] = ['Todas', 'Jeep', 'Fiat', 'Dodge', 'Peugeot', 'Ram']
  const TYPES:  VehicleType[] = ['Todos', 'Sedán', 'SUV', 'Deportivos', 'Pick-ups']
  const TYPE_ICONS: Record<VehicleType, string> = { 'Todos':'🚗','Sedán':'🚙','SUV':'🛻','Deportivos':'🏎️','Pick-ups':'🚚' }

  let activeBrand  = $state<BrandFilter>(initialBrand)
  let activeType   = $state<VehicleType>(initialType)
  let viewMode     = $state<'grid'|'matrix'>('grid')
  let carouselIdx  = $state(0)
  let scrollRef    = $state<HTMLDivElement | null>(null)

  /** Returns the set of VehicleTypes that exist for a given brand. */
  function getAvailableTypes(brand: BrandFilter): VehicleType[] {
    if (brand === 'Todas') return TYPES.filter(t => t !== 'Todos')
    return [...new Set(ALL_VEHICLES.filter(v => v.brand === brand).map(v => v.type))] as VehicleType[]
  }

  /** Types to render in the filter row – only those available for the active brand */
  const availableTypes = $derived(
    activeBrand === 'Todas'
      ? TYPES
      : ['Todos' as VehicleType, ...getAvailableTypes(activeBrand)]
  )

  const vehicles = $derived((() => {
    const isDefault = activeBrand === 'Todas' && activeType === 'Todos'
    if (isDefault) return TODAS_IDS.map(id => ALL_VEHICLES.find(v => v.id === id)!).filter(Boolean)
    return ALL_VEHICLES.filter(v => {
      const bOk = activeBrand === 'Todas' || v.brand === activeBrand
      const tOk = activeType  === 'Todos' || v.type  === activeType
      return bOk && tOk
    })
  })())

  /**
   * Sync from PARENT PROP → local state.
   * Using untrack() so that reads of activeBrand/activeType inside the
   * callback do NOT make the effect reactive to those variables.
   * Without untrack, every chip click would re-trigger the effect and
   * immediately reset the user's selection back to the parent's value.
   */
  $effect(() => {
    const brand = initialBrand  // reactive: tracks only this prop
    untrack(() => {
      activeBrand = brand
      // Also reset activeType if it doesn't exist for the new brand
      const avail = getAvailableTypes(brand)
      if (activeType !== 'Todos' && !avail.includes(activeType)) {
        activeType = 'Todos'
      }
    })
  })

  $effect(() => {
    const type = initialType  // reactive: tracks only this prop
    untrack(() => { activeType = type })
  })

  // Reset carousel on filter change (tracks both activeBrand and activeType)
  $effect(() => {
    // read them to create dependency
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    activeBrand; activeType
    untrack(() => {
      carouselIdx = 0
      scrollRef?.scrollTo({ left: 0 })
    })
  })

  const featured = $derived(vehicles[0])
  const rest     = $derived(vehicles.slice(1, 9))

  const sectionBg = $derived($isDark
    ? 'rgba(5,8,20,1)'
    : 'linear-gradient(180deg,rgba(240,245,255,1) 0%,rgba(232,240,255,1) 100%)'
  )
  const textPrimary = $derived($isDark ? 'white' : '#1a2040')
  const textMuted   = $derived($isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.45)')
  const seeAllColor = $derived($isDark ? 'rgba(255,255,255,0.48)' : 'rgba(20,30,80,0.50)')
  const isFiltered  = $derived(activeBrand !== 'Todas' || activeType !== 'Todos')

  const filterPanelStyle = $derived($isDark
    ? 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.10);'
    : 'background:rgba(255,255,255,0.72);border:1px solid rgba(100,130,220,0.18);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);box-shadow:0 2px 16px rgba(20,40,120,0.06),inset 0 1px 0 rgba(255,255,255,0.95);'
  )
  const rowLabelStyle = $derived(`color:${$isDark ? 'rgba(255,255,255,0.38)' : 'rgba(20,30,80,0.40)'};font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;`)
  const divStyle = $derived(`height:1px;background:${$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(100,130,220,0.12)'};`)
  const toggleBg = $derived(`background:${$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.72)'};border:${$isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(100,130,220,0.20)'};`)

  function chipStyle(isActive: boolean, disabled = false) {
    if (disabled) return $isDark
      ? 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.22);backdrop-filter:blur(10px);cursor:not-allowed;opacity:0.45;'
      : 'background:rgba(200,210,240,0.30);border:1px solid rgba(100,130,220,0.10);color:rgba(20,30,80,0.25);backdrop-filter:blur(10px);cursor:not-allowed;opacity:0.45;'
    return isActive
      ? ($isDark
          ? 'background:rgba(51,78,139,0.65);border:1px solid rgba(100,150,255,0.60);color:white;box-shadow:0 0 0 3px rgba(51,78,139,0.30),0 6px 20px rgba(51,78,139,0.45);transform:scale(1.06);backdrop-filter:blur(10px);'
          : 'background:rgba(51,78,139,0.18);border:1px solid rgba(51,78,139,0.45);color:#334E8B;box-shadow:0 0 0 3px rgba(51,78,139,0.12),0 6px 20px rgba(51,78,139,0.14);transform:scale(1.06);backdrop-filter:blur(10px);')
      : ($isDark
          ? 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.50);backdrop-filter:blur(10px);'
          : 'background:rgba(255,255,255,0.75);border:1px solid rgba(100,130,220,0.22);color:rgba(20,30,80,0.55);backdrop-filter:blur(10px);')
  }
  function viewBtnStyle(active: boolean) {
    return active
      ? ($isDark ? 'background:rgba(51,78,139,0.50);color:white;' : 'background:rgba(51,78,139,0.18);color:#334E8B;')
      : ($isDark ? 'color:rgba(255,255,255,0.40);' : 'color:rgba(20,30,80,0.42);')
  }


  function goTo(idx: number) {
    if (!scrollRef) return
    const cards = scrollRef.querySelectorAll('[data-card]')
    const cardEl = cards[idx] as HTMLElement | undefined
    if (cardEl) scrollRef.scrollTo({ left: cardEl.offsetLeft - 16, behavior: 'smooth' })
    carouselIdx = idx
  }
  function handleScroll() {
    if (!scrollRef) return
    const cards = scrollRef.querySelectorAll('[data-card]')
    let closest = 0, closestDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs((card as HTMLElement).offsetLeft - scrollRef!.scrollLeft - 16)
      if (dist < closestDist) { closestDist = dist; closest = i }
    })
    carouselIdx = closest
  }

  // Matrix helpers
  const activeBrands = BRANDS.filter(b => b !== 'Todas')
  const activeTypes  = TYPES.filter(t => t !== 'Todos')
  const headerBg     = $derived($isDark ? 'rgba(51,78,139,0.22)' : 'rgba(51,78,139,0.10)')
  const headerBorder = $derived($isDark ? 'rgba(51,78,139,0.40)' : 'rgba(51,78,139,0.22)')
  const cellBg       = $derived($isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.60)')
  const cellBorder   = $derived($isDark ? 'rgba(255,255,255,0.08)' : 'rgba(100,140,220,0.16)')
</script>

<section id="promociones" class="py-10 md:py-16 px-4 md:px-8" style="background:{sectionBg}">
  <div class="max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-3">
      <div>
        <p class="text-xs uppercase tracking-widest mb-1.5" style="color:{textMuted}">Ofertas exclusivas</p>
        <h2 style="font-size:clamp(1.6rem,5vw,2.2rem);font-weight:800;color:{textPrimary};">
          Nuestras <span style="background:linear-gradient(135deg,#334E8B,#6B8ED4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Promociones</span>
        </h2>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden md:flex items-center rounded-xl p-1 gap-1" style={toggleBg}>
          <button onclick={() => viewMode='grid'} class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={viewBtnStyle(viewMode==='grid')}>
            <LayoutGrid size={13} /> Grid
          </button>
          <button onclick={() => viewMode='matrix'} class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={viewBtnStyle(viewMode==='matrix')}>
            <List size={13} /> Matriz
          </button>
        </div>
        <a href="#" class="flex items-center gap-1.5 text-xs transition-colors hover:text-blue-600" style="color:{seeAllColor}">
          Ver todas <ChevronRight size={13} />
        </a>
      </div>
    </div>

    <!-- Filter panel -->
    <div class="mb-6 md:mb-8 rounded-2xl p-3 md:p-4" style={filterPanelStyle}>
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
        <span style={rowLabelStyle} class="flex-shrink-0 w-10">Marca</span>
        {#each BRANDS as brand (brand)}
          <button onclick={() => activeBrand = brand}
            class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
            style={chipStyle(activeBrand === brand)}>{brand}</button>
        {/each}
      </div>
      <div style="{divStyle}margin:8px 0;" ></div>
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
        <span style={rowLabelStyle} class="flex-shrink-0 w-10">Tipo</span>
        {#each availableTypes as type (type)}
          <button
            onclick={() => activeType = type}
            class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
            style={chipStyle(activeType === type)}>{type}</button>
        {/each}
      </div>
      {#if isFiltered}
        <div class="flex items-center justify-between pt-0.5">
          <p class="text-xs" style="color:{$isDark ? 'rgba(255,255,255,0.40)' : 'rgba(20,30,80,0.42)'}">
            {activeBrand !== 'Todas' ? activeBrand + ' ' : ''}{activeType !== 'Todos' ? '· ' + activeType + ' ' : ''}— {vehicles.length} resultado{vehicles.length !== 1 ? 's' : ''}
          </p>
          <button onclick={() => { activeBrand='Todas'; activeType='Todos' }}
            class="text-xs underline" style="color:{$isDark ? 'rgba(100,150,255,0.8)' : '#334E8B'}">Limpiar</button>
        </div>
      {/if}
    </div>

    <!-- Matrix view -->
    {#if viewMode === 'matrix'}
      <div class="overflow-x-auto">
        <table class="w-full" style="border-collapse:separate;border-spacing:6px;">
          <thead>
            <tr>
              <th class="px-4 py-3 rounded-xl text-xs font-medium text-left" style="background:{headerBg};border:1px solid {headerBorder};color:{textMuted}">Marca / Tipo</th>
              {#each activeTypes as type (type)}
                <th class="px-4 py-3 rounded-xl text-xs font-medium text-center whitespace-nowrap" style="background:{headerBg};border:1px solid {headerBorder};color:{textPrimary}">{TYPE_ICONS[type]} {type}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each activeBrands as brand (brand)}
              {@const brandVehicles = ALL_VEHICLES.filter(v => v.brand === brand)}
              <tr>
                <td class="px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap" style="background:{headerBg};border:1px solid {headerBorder};color:{textPrimary}">{brand}</td>
                {#each activeTypes as type (type)}
                  {@const match = brandVehicles.filter(v => v.type === type)}
                  <td class="rounded-xl align-top p-2" style="background:{cellBg};border:1px solid {cellBorder};min-width:160px;">
                    {#if match.length === 0}
                      <div class="flex items-center justify-center h-12 opacity-20">
                        <span class="text-xs" style="color:{textMuted}">—</span>
                      </div>
                    {:else}
                      <div class="space-y-2">
                        {#each match as v (v.id)}
                          <a href={v.link}
                            class="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 group"
                            style="background:{$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.06)'};border:{$isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(51,78,139,0.12)'};"
                            onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = $isDark ? 'rgba(255,255,255,0.12)' : 'rgba(51,78,139,0.14)' }}
                            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = $isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.06)' }}>
                            <div class="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                              <img src={v.img} alt={v.model} class="w-full h-full object-cover" />
                            </div>
                            <div class="min-w-0">
                              <p class="text-xs font-medium truncate" style="color:{textPrimary}">{v.model}</p>
                              <p class="text-xs truncate" style="color:{textMuted}">{v.year}</p>
                            </div>
                            <ChevronRight size={10} class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style="color:{$isDark ? 'rgba(100,150,255,0.9)' : '#334E8B'}" />
                          </a>
                        {/each}
                      </div>
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <!-- Grid view -->
    {#if viewMode === 'grid'}
      {#if vehicles.length === 0}
        <div class="flex flex-col items-center justify-center py-16 gap-3" style="color:{textMuted}">
          <span class="text-4xl">🔍</span>
          <p class="text-sm">No hay vehículos con esa combinación de filtros.</p>
          <button onclick={() => { activeBrand='Todas'; activeType='Todos' }}
            class="text-xs underline" style="color:{$isDark ? 'rgba(100,150,255,0.8)' : '#334E8B'}">Ver todos</button>
        </div>
      {:else}
        <!-- Mobile carousel -->
        <div class="md:hidden">
          {#if vehicles.length <= 2}
            <div class="flex flex-col gap-4">
              {#each vehicles as v, i (v.id)}
                <div style="height:340px;">{@render VehicleCard({vehicle: v, featured: i === 0})}</div>
              {/each}
            </div>
          {:else}
            <div>
              <div bind:this={scrollRef} onscroll={handleScroll}
                class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 no-scrollbar scrollbar-none"
                style="scroll-padding-left:16px;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;">
                {#each vehicles as v, i (v.id)}
                  <div data-card class="snap-start flex-shrink-0" style="width:min(82vw,300px);height:360px;">
                    {@render VehicleCard({vehicle: v, featured: i === 0})}
                  </div>
                {/each}
              </div>
              <!-- Controls: dots ··· [<] [>] -->
              <div class="flex items-center mt-4 px-1 gap-3">
                <!-- Dots -->
                <div class="flex items-center gap-1.5">
                  {#each vehicles as _, i (i)}
                    <button onclick={() => goTo(i)} class="transition-all duration-300" aria-label="Ir a slide {i + 1}"
                      style="width:{i===carouselIdx ? 20 : 6}px;height:6px;border-radius:999px;background:{i===carouselIdx ? ($isDark ? 'rgba(100,150,255,1)' : '#334E8B') : ($isDark ? 'rgba(255,255,255,0.22)' : 'rgba(20,30,80,0.18)')};">
                    </button>
                  {/each}
                </div>
                <!-- Spacer -->
                <div class="flex-1"></div>
                <!-- Prev -->
                <button onclick={() => goTo(Math.max(0, carouselIdx - 1))} disabled={carouselIdx === 0}
                  aria-label="Anterior"
                  class="flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90"
                  style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'};border:{$isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(51,78,139,0.18)'};backdrop-filter:blur(12px);opacity:{carouselIdx === 0 ? 0.3 : 1};color:{$isDark ? 'rgba(255,255,255,0.75)' : '#334E8B'};">
                  <ChevronLeft size={17} />
                </button>
                <!-- Next -->
                <button onclick={() => goTo(Math.min(vehicles.length - 1, carouselIdx + 1))} disabled={carouselIdx === vehicles.length - 1}
                  aria-label="Siguiente"
                  class="flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90"
                  style="background:{$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(51,78,139,0.08)'};border:{$isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(51,78,139,0.18)'};backdrop-filter:blur(12px);opacity:{carouselIdx === vehicles.length-1 ? 0.3 : 1};color:{$isDark ? 'rgba(255,255,255,0.75)' : '#334E8B'};">
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          {/if}
        </div>

        <!-- Desktop bento -->
        {#if featured}
          <div class="hidden md:grid gap-4" style="grid-template-columns:repeat(4,1fr);grid-auto-rows:320px;">
            <div style="grid-column:span 2;grid-row:span 2;">
              {@render VehicleCard({vehicle: featured, featured: true})}
            </div>
            {#each rest.slice(0, 2) as v (v.id)}
              <div>{@render VehicleCard({vehicle: v})}</div>
            {/each}
            {#each rest.slice(2, 8) as v (v.id)}
              <div>{@render VehicleCard({vehicle: v})}</div>
            {/each}
          </div>
        {/if}
      {/if}
    {/if}

  </div>
</section>

<!-- VehicleCard as inline component -->
{#snippet VehicleCard({ vehicle, featured = false }: { vehicle: typeof ALL_VEHICLES[0], featured?: boolean })}
  {@const isDarkVal = $isDark}
  {@const typeBadge = `background:${isDarkVal ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.88)'};border:${isDarkVal ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(100,140,220,0.30)'};color:${isDarkVal ? 'rgba(255,255,255,0.80)' : 'rgba(20,30,80,0.72)'};backdrop-filter:blur(14px);box-shadow:${isDarkVal ? 'inset 0 1px 0 rgba(255,255,255,0.14),0 2px 8px rgba(0,0,0,0.30)' : 'inset 0 1px 0 rgba(255,255,255,0.95),0 2px 8px rgba(20,40,120,0.08)'};padding:3px 8px;font-weight:500;letter-spacing:0.02em;`}
  <div class="h-full group" style="position:relative;">
    <LiquidGlass
      variant="card"
      class="relative overflow-hidden cursor-pointer h-full transition-all duration-300"
      style="transform:translateY(0);box-shadow:{isDarkVal ? '0 0 0 1px rgba(255,255,255,0.10),0 8px 32px rgba(0,0,0,0.50)' : '0 0 0 1px rgba(255,255,255,0.72),0 8px 32px rgba(20,40,120,0.12)'};"
    >
      <!-- Image area -->
      <div class="relative overflow-hidden" style="height:{featured ? '65%' : '56%'}">
        <img src={vehicle.img} alt="{vehicle.brand} {vehicle.model} {vehicle.year}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <!-- gradient overlay -->
        <div class="absolute inset-0" style="background:linear-gradient(to bottom,rgba(0,0,0,0.02) 0%,rgba(5,8,20,0.75) 70%,rgba(5,8,20,0.95) 100%)"></div>
        <!-- type badge -->
        <div class="absolute top-3 right-3 rounded-full text-xs" style={typeBadge}>
          {vehicle.type}
        </div>
        <!-- promo badge -->
        {#if vehicle.badge}
          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
            style="background:linear-gradient(135deg,rgba(51,78,139,0.95),rgba(80,110,180,0.90));border:1px solid rgba(255,255,255,0.28);backdrop-filter:blur(12px);box-shadow:0 4px 14px rgba(51,78,139,0.50),inset 0 1px 0 rgba(255,255,255,0.30);letter-spacing:0.03em;">
            {vehicle.badge}
          </div>
        {/if}
        <!-- model info overlay -->
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-6" style="background:linear-gradient(to top,rgba(5,8,20,0.85) 0%,transparent 100%)">
          <p class="text-white/60 text-xs uppercase tracking-widest mb-0.5 font-medium">{vehicle.brand}</p>
          <h3 class="text-white font-bold leading-tight" style="font-size:{featured ? '1.5rem' : '1.1rem'};text-shadow:0 2px 8px rgba(0,0,0,0.40);">
            {vehicle.model} <span class="font-light opacity-70">{vehicle.year}</span>
          </h3>
        </div>
      </div>

      <!-- Card body -->
      <div class="flex flex-col" style="padding:{featured ? '16px 20px 20px' : '12px 16px 16px'};border-top:{isDarkVal ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(100,140,220,0.14)'};flex:1;">
        <!-- Text content: grows to fill available space -->
        <div class="flex-1 overflow-hidden">
          <p class="text-xs mb-1 font-semibold tracking-wider uppercase" style="color:{isDarkVal ? 'rgba(100,150,255,0.75)' : '#334E8B'};opacity:0.85;">{vehicle.version}</p>
          <p class="leading-snug" style="font-size:0.71rem;color:{isDarkVal ? 'rgba(255,255,255,0.68)' : 'rgba(20,30,80,0.68)'};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            <Tag size={10} style="display:inline;margin-right:4px;color:{isDarkVal ? '#60a5fa' : '#3b82f6'};vertical-align:-1px;" />
            {vehicle.deal}
          </p>
        </div>
        <!-- CTA always pinned to bottom -->
        <a href="#"
          class="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition-all duration-250 group/btn"
          style="font-size:0.74rem;padding:8px 14px;background:{isDarkVal ? 'linear-gradient(135deg,rgba(51,78,139,0.55),rgba(80,110,180,0.40))' : 'linear-gradient(135deg,rgba(51,78,139,0.12),rgba(80,110,180,0.08))'};border:{isDarkVal ? '1px solid rgba(100,150,255,0.35)' : '1px solid rgba(51,78,139,0.28)'};color:{isDarkVal ? 'rgba(140,180,255,1)' : '#334E8B'};box-shadow:{isDarkVal ? '0 2px 12px rgba(51,78,139,0.30),inset 0 1px 0 rgba(255,255,255,0.12)' : '0 2px 12px rgba(51,78,139,0.12),inset 0 1px 0 rgba(255,255,255,0.80)'};backdrop-filter:blur(8px);flex-shrink:0;">
          Ver detalles
          <ChevronRight size={12} class="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
        </a>
      </div>
    </LiquidGlass>
  </div>
{/snippet}

