import { ref, computed } from 'vue'

// Shared theme state (singleton pattern)
const theme = ref(localStorage.getItem('app-theme') || 'dark')

// Apply theme to document on init
document.documentElement.setAttribute('data-theme', theme.value)

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('app-theme', theme.value)
  }

  return {
    theme,
    isDark,
    toggleTheme
  }
}
