<script lang="ts">
  import type { Snippet } from 'svelte'
  import { isDark } from '$lib/stores/theme'

  export type GlassVariant = 'default' | 'strong' | 'card' | 'pill' | 'nav' | 'sidebar'
  export type GlassTint    = 'neutral' | 'blue' | 'dark'

  interface Props {
    children?: Snippet
    variant?:  GlassVariant
    tint?:     GlassTint
    class?:    string
    style?:    string
    tag?:      string
    noRefract?: boolean
    onclick?:     (e: MouseEvent) => void
    onmouseenter?: (e: MouseEvent) => void
    onmouseleave?: (e: MouseEvent) => void
    [key: string]: unknown
  }

  let {
    children,
    variant  = 'default',
    tint     = 'neutral',
    class:   cls = '',
    style:   extraStyle = '',
    tag      = 'div',
    noRefract = false,
    onclick,
    onmouseenter,
    onmouseleave,
    ...rest
  }: Props = $props()

  const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

  type CfgEntry = {
    blur: number; saturate: number; refractId: string
    lightBg: string; darkBg: string
    lightBorder: string; darkBorder: string
    specularLight: string; specularDark: string
    shadowLight: string; shadowDark: string
    borderRadius: string; noiseOpacity: number
  }

  const CONFIG: Record<GlassVariant, CfgEntry> = {
    default: {
      blur: 48, saturate: 180, refractId: 'lg-frosted',
      lightBg: 'rgba(255,255,255,0.55)', darkBg: 'rgba(255,255,255,0.07)',
      lightBorder: 'rgba(255,255,255,0.90)', darkBorder: 'rgba(255,255,255,0.18)',
      specularLight: 'linear-gradient(175deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.28) 12%, rgba(255,255,255,0.04) 36%, transparent 60%)',
      specularDark:  'linear-gradient(175deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.12) 12%, rgba(255,255,255,0.02) 36%, transparent 60%)',
      shadowLight: '0 0 0 1.5px rgba(255,255,255,0.75), 0 16px 40px rgba(20,40,120,0.14), 0 2px 8px rgba(20,40,120,0.08)',
      shadowDark:  '0 0 0 1.5px rgba(255,255,255,0.22), 0 16px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.30)',
      borderRadius: '20px', noiseOpacity: 0.025,
    },
    strong: {
      blur: 64, saturate: 200, refractId: 'lg-frosted-strong',
      lightBg: 'rgba(255,255,255,0.65)', darkBg: 'rgba(255,255,255,0.09)',
      lightBorder: 'rgba(255,255,255,0.95)', darkBorder: 'rgba(255,255,255,0.24)',
      specularLight: 'linear-gradient(172deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.38) 10%, rgba(255,255,255,0.06) 28%, transparent 52%)',
      specularDark:  'linear-gradient(172deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.18) 10%, rgba(255,255,255,0.03) 28%, transparent 52%)',
      shadowLight: '0 0 0 2px rgba(255,255,255,0.85), 0 24px 60px rgba(20,40,120,0.22), 0 4px 16px rgba(20,40,120,0.10)',
      shadowDark:  '0 0 0 2px rgba(255,255,255,0.28), 0 24px 60px rgba(0,0,0,0.70), 0 4px 16px rgba(0,0,0,0.40)',
      borderRadius: '24px', noiseOpacity: 0.030,
    },
    card: {
      blur: 40, saturate: 175, refractId: 'lg-frosted',
      lightBg: 'rgba(255,255,255,0.50)', darkBg: 'rgba(255,255,255,0.06)',
      lightBorder: 'rgba(255,255,255,0.80)', darkBorder: 'rgba(255,255,255,0.12)',
      specularLight: 'linear-gradient(175deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.22) 14%, rgba(255,255,255,0.03) 38%, transparent 65%)',
      specularDark:  'linear-gradient(175deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.09) 14%, rgba(255,255,255,0.01) 38%, transparent 65%)',
      shadowLight: '0 0 0 1px rgba(255,255,255,0.72), 0 6px 28px rgba(20,40,120,0.12)',
      shadowDark:  '0 0 0 1px rgba(255,255,255,0.14), 0 6px 28px rgba(0,0,0,0.50)',
      borderRadius: '18px', noiseOpacity: 0.022,
    },
    pill: {
      blur: 28, saturate: 165, refractId: 'lg-frosted-light',
      lightBg: 'rgba(255,255,255,0.62)', darkBg: 'rgba(255,255,255,0.08)',
      lightBorder: 'rgba(255,255,255,0.85)', darkBorder: 'rgba(255,255,255,0.18)',
      specularLight: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.18) 40%, transparent 100%)',
      specularDark:  'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, transparent 100%)',
      shadowLight: '0 0 0 1px rgba(255,255,255,0.80), 0 4px 16px rgba(20,40,120,0.10)',
      shadowDark:  '0 0 0 1px rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.40)',
      borderRadius: '999px', noiseOpacity: 0.018,
    },
    nav: {
      blur: 52, saturate: 155, refractId: 'lg-frosted-light',
      lightBg: 'rgba(255,255,255,0.97)', darkBg: 'rgba(5,7,18,0.88)',
      lightBorder: 'rgba(255,255,255,1)', darkBorder: 'rgba(255,255,255,0.10)',
      specularLight: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 8%, rgba(255,255,255,0.08) 30%, transparent 60%)',
      specularDark:  'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)',
      shadowLight: '0 0 0 0.5px rgba(255,255,255,1), 0 2px 20px rgba(20,40,120,0.07)',
      shadowDark:  '0 0 0 0.5px rgba(255,255,255,0.10), 0 2px 20px rgba(0,0,0,0.50)',
      borderRadius: '0px', noiseOpacity: 0.012,
    },
    sidebar: {
      blur: 56, saturate: 175, refractId: 'lg-frosted-light',
      lightBg: 'rgba(255,255,255,0.90)', darkBg: 'rgba(6,8,20,0.88)',
      lightBorder: 'rgba(255,255,255,1)', darkBorder: 'rgba(255,255,255,0.08)',
      specularLight: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.42) 12%, transparent 40%)',
      specularDark:  'linear-gradient(90deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 12%, transparent 40%)',
      shadowLight: '0 0 0 0.5px rgba(255,255,255,1), 4px 0 30px rgba(20,40,120,0.10)',
      shadowDark:  '0 0 0 0.5px rgba(255,255,255,0.06), 4px 0 30px rgba(0,0,0,0.60)',
      borderRadius: '0px', noiseOpacity: 0.018,
    },
  }

  const tintMap: Record<GlassTint, string> = {
    neutral: 'transparent',
    blue:    $isDark ? 'rgba(51,78,139,0.18)' : 'rgba(51,78,139,0.06)',
    dark:    $isDark ? 'rgba(0,0,0,0.28)' : 'rgba(10,20,60,0.06)',
  }

  const cfg      = $derived(CONFIG[variant])
  const bg       = $derived($isDark ? cfg.darkBg      : cfg.lightBg)
  const specular = $derived($isDark ? cfg.specularDark : cfg.specularLight)
  const shadow   = $derived($isDark ? cfg.shadowDark  : cfg.shadowLight)
  const bdFilter = $derived(
    noRefract
      ? `blur(${cfg.blur}px) saturate(${cfg.saturate}%)`
      : `url(#${cfg.refractId}) blur(${cfg.blur}px) saturate(${cfg.saturate}%)`
  )
  const borderColor = $derived($isDark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.80)')
  const noiseBlend  = $derived($isDark ? 'soft-light' : 'overlay')
  const tintColor   = $derived(tintMap[tint])
</script>

<svelte:element
  this={tag}
  class={cls}
  style="position:relative;isolation:isolate;border-radius:{cfg.borderRadius};overflow:hidden;box-shadow:{shadow};{extraStyle}"
  {onclick}
  {onmouseenter}
  {onmouseleave}
  {...rest}
>
  <!-- Layer 0: backdrop refraction -->
  <div style="position:absolute;inset:0;border-radius:inherit;backdrop-filter:{bdFilter};-webkit-backdrop-filter:{bdFilter};z-index:0;"></div>
  <!-- Layer 1: base tint -->
  <div style="position:absolute;inset:0;border-radius:inherit;background:{bg};z-index:1;"></div>
  <!-- Layer 2: color tint overlay -->
  <div style="position:absolute;inset:0;border-radius:inherit;background:{tintColor};z-index:2;"></div>
  <!-- Layer 3: specular highlight -->
  <div style="position:absolute;inset:0;border-radius:inherit;background:{specular};pointer-events:none;z-index:3;"></div>
  <!-- Layer 4: noise texture -->
  <div style="position:absolute;inset:0;border-radius:inherit;opacity:{cfg.noiseOpacity};background-image:{NOISE_SVG};background-size:128px 128px;pointer-events:none;z-index:4;mix-blend-mode:{noiseBlend};"></div>
  <!-- Layer 5: border diamond-cut -->
  <div style="position:absolute;inset:0;border-radius:inherit;border:1px solid {borderColor};pointer-events:none;z-index:5;"></div>
  <!-- Layer 6: content -->
  <div style="position:relative;z-index:6;{variant === 'card' ? 'height:100%;display:flex;flex-direction:column;' : ''}">
    {@render children?.()}
  </div>
</svelte:element>
