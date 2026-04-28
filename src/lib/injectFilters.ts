/**
 * Injects the SVG filter defs needed by LiquidGlass into a container element.
 * Lives in a plain .ts file so Svelte's HTML parser never scans the SVG strings.
 */
export function injectLiquidGlassFilters(container: HTMLElement): void {
  const ns = 'http://www.w3.org/2000/svg'
  const fns = 'http://www.w3.org/2000/svg'

  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:fixed;top:0;left:0;overflow:hidden;pointer-events:none;z-index:-1'

  const defs = document.createElementNS(ns, 'defs')

  const filtersData = [
    { id: 'lg-frosted',       x: '-5%', y: '-5%', w: '110%', h: '110%', freq: '0.008 0.006', octaves: '2', seed: '15', scale: '10' },
    { id: 'lg-frosted-strong', x: '-8%', y: '-8%', w: '116%', h: '116%', freq: '0.006 0.004', octaves: '2', seed: '8',  scale: '16' },
    { id: 'lg-frosted-light',  x: '-3%', y: '-3%', w: '106%', h: '106%', freq: '0.012 0.010', octaves: '1', seed: '22', scale: '5'  },
  ]

  for (const f of filtersData) {
    const filter = document.createElementNS(fns, 'filter')
    filter.setAttribute('id', f.id)
    filter.setAttribute('x', f.x)
    filter.setAttribute('y', f.y)
    filter.setAttribute('width', f.w)
    filter.setAttribute('height', f.h)
    filter.setAttribute('color-interpolation-filters', 'sRGB')

    const turb = document.createElementNS(fns, 'feTurbulence')
    turb.setAttribute('type', 'fractalNoise')
    turb.setAttribute('baseFrequency', f.freq)
    turb.setAttribute('numOctaves', f.octaves)
    turb.setAttribute('seed', f.seed)
    turb.setAttribute('result', 'noise')

    const disp = document.createElementNS(fns, 'feDisplacementMap')
    disp.setAttribute('in', 'SourceGraphic')
    disp.setAttribute('in2', 'noise')
    disp.setAttribute('scale', f.scale)
    disp.setAttribute('xChannelSelector', 'R')
    disp.setAttribute('yChannelSelector', 'G')

    filter.appendChild(turb)
    filter.appendChild(disp)
    defs.appendChild(filter)
  }

  svg.appendChild(defs)
  container.appendChild(svg)
}
