<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <div class="sidebar-logo">
        <h1>{{ t('nav.companyName') }}</h1>
        <span class="sidebar-subtitle">{{ t('nav.subtitle') }}</span>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item.to) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

    <div class="sidebar-bottom">
      <div class="sidebar-controls">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const route = useRoute()
const { t } = useI18n()

const navItems = computed(() => [
  { to: '/', icon: '📊', label: t('nav.overview') },
  { to: '/inventory', icon: '📦', label: t('nav.inventory') },
  { to: '/orders', icon: '🚚', label: t('nav.orders') },
  { to: '/spending', icon: '💰', label: t('nav.finance') },
  { to: '/demand', icon: '📈', label: t('nav.demandForecast') },
  { to: '/reports', icon: '📋', label: 'Reports' }
])

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: var(--color-bg-card);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar-top {
  flex: 1;
  padding: 1.5rem 1rem;
  overflow-y: auto;
}

.sidebar-logo {
  padding: 0 0.75rem;
  margin-bottom: 2rem;
}

.sidebar-logo h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
}

.sidebar-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.938rem;
  border-radius: 8px;
  transition: all 0.15s ease;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-elevated);
}

.nav-item.active {
  color: var(--color-accent);
  background: var(--color-accent-bg);
}

.nav-icon {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-bottom {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.sidebar-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
