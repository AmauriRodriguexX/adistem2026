<script lang="ts">
  import { isDark } from '$lib/stores/theme'
  import LiquidGlass from './LiquidGlass.svelte'
  import GoogleIcon from './GoogleIcon.svelte'
  import type { BrandFilter } from '$lib/types'

  interface Props {
    brand: BrandFilter
    accent: string
  }
  let { brand, accent }: Props = $props()

  const BENEFITS = {
    'Jeep': [
      { icon: 'verified_user', title: 'Seguridad 5 Estrellas', desc: 'Sistemas avanzados de asistencia al conductor y robustez legendaria en cada terreno.' },
      { icon: 'bolt',          title: 'Capacidad 4x4',         desc: 'La tecnología Trail Rated® que te permite superar cualquier obstáculo con confianza.' },
      { icon: 'build',         title: 'Servicio Mopar®',       desc: 'Mantenimiento especializado con refacciones originales para mantener tu Jeep® como nuevo.' }
    ],
    'Ram': [
      { icon: 'local_shipping', title: 'Capacidad de Carga', desc: 'Diseñadas para los trabajos más pesados con la mayor durabilidad del mercado.' },
      { icon: 'workspace_premium', title: 'Lujo Interior',    desc: 'La combinación perfecta de fuerza bruta y acabados de primera clase.' },
      { icon: 'speed',          title: 'Poder HEMI®',         desc: 'Motores legendarios que entregan el torque necesario para cualquier desafío.' }
    ],
    'Todas': [
      { icon: 'verified_user', title: 'Garantía Extendida',    desc: 'Protección total para tu inversión con planes de garantía de hasta 7 años.' },
      { icon: 'payments',      title: 'Financiamiento',        desc: 'Planes a tu medida con tasas competitivas y aprobación inmediata.' },
      { icon: 'build',         title: 'Talleres Certificados', desc: 'Red nacional de servicio con técnicos capacitados por fábrica.' }
    ]
  }

  const currentBenefits = $derived(BENEFITS[brand as keyof typeof BENEFITS] || BENEFITS['Todas'])
</script>

<section class="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-12 md:mb-16">
      <p class="text-xs uppercase tracking-[0.3em] font-bold mb-3" style="color:{accent}cc">Beneficios Exclusivos</p>
      <h2 class="text-3xl md:text-5xl font-extrabold" style="color:{$isDark ? 'white' : '#1a2040'}">
        ¿Por qué elegir <span style="color:{accent}">{brand === 'Todas' ? 'VAPSA' : brand}</span>?
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {#each currentBenefits as benefit, i}
        <div style="animation: benefit-card-in 0.6s cubic-bezier(0.22,1,0.36,1) {i * 150}ms both;">
          <LiquidGlass variant="card" class="h-full p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
              style="background:{$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(51,78,139,0.05)'}; border:1px solid {$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(51,78,139,0.1)'}; color:{accent}">
              <GoogleIcon name={benefit.icon} size={32} weight={300} />
            </div>
            <h3 class="text-xl font-bold mb-4" style="color:{$isDark ? 'white' : '#1a2040'}">{benefit.title}</h3>
            <p class="text-sm leading-relaxed mb-6" style="color:{$isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,80,0.6)'}">
              {benefit.desc}
            </p>
            <a href="#" class="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:gap-3" style="color:{accent}">
              Saber más <GoogleIcon name="chevron_right" size={16} />
            </a>
          </LiquidGlass>
        </div>
      {/each}
    </div>
  </div>

  <!-- Background decorative elements -->
  <div class="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-[120px] opacity-20 pointer-events-none" style="background:{accent}"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none" style="background:{accent}"></div>
</section>

<style>
  @keyframes benefit-card-in {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
