import { writable, derived } from 'svelte/store'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'
export const THEME_CYCLE: ThemeMode[] = ['light', 'dark', 'system']

function getStored(): ThemeMode {
  try { return (localStorage.getItem('vapsa-theme') as ThemeMode) || 'system' }
  catch { return 'system' }
}

function getSystemDark(): boolean {
  try { return window.matchMedia('(prefers-color-scheme: dark)').matches }
  catch { return false }
}

// Core stores
export const themeMode = writable<ThemeMode>(getStored())
export const systemDark = writable<boolean>(getSystemDark())

// Derived: resolved & isDark
export const resolvedTheme = derived(
  [themeMode, systemDark],
  ([$mode, $sys]) => ($mode === 'system' ? ($sys ? 'dark' : 'light') : $mode) as ResolvedTheme
)

export const isDark = derived(resolvedTheme, ($r) => $r === 'dark')

// Action
export function setTheme(t: ThemeMode) {
  try { localStorage.setItem('vapsa-theme', t) } catch { /* noop */ }
  themeMode.set(t)
}

// Wire up system‑preference listener (call once from App.svelte onMount)
export function initSystemListener() {
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    // Crucial fix: sync the current state immediately on mount
    systemDark.set(mq.matches)
    
    const handler = (e: MediaQueryListEvent) => systemDark.set(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  } catch {
    return () => { /* noop */ }
  }
}
