import { writable, derived } from 'svelte/store'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'
export const THEME_CYCLE: ThemeMode[] = ['dark']

function getStored(): ThemeMode {
  try { localStorage.setItem('vapsa-theme', 'dark') } catch { /* noop */ }
  return 'dark'
}

function getSystemDark(): boolean {
  return true
}

// Core stores
export const themeMode = writable<ThemeMode>(getStored())
export const systemDark = writable<boolean>(getSystemDark())

// Derived: resolved & isDark
export const resolvedTheme = derived(
  themeMode,
  () => 'dark' as ResolvedTheme
)

export const isDark = derived(resolvedTheme, () => true)

// Action
export function setTheme(t: ThemeMode) {
  try { localStorage.setItem('vapsa-theme', 'dark') } catch { /* noop */ }
  themeMode.set('dark')
}

// Theme is intentionally locked to dark, regardless of OS/browser preference.
export function initSystemListener() {
  themeMode.set('dark')
  systemDark.set(true)
  try { localStorage.setItem('vapsa-theme', 'dark') } catch { /* noop */ }
  return () => { /* noop */ }
}
