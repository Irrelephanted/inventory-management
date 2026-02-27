<template>
  <div class="app">
    <AppSidebar />
    <div class="app-content">
      <div class="top-bar">
        <FilterBar />
        <ProfileMenu
          @show-profile-details="showProfileDetails = true"
          @show-tasks="showTasks = true"
        />
      </div>
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <ProfileDetailsModal
      :is-open="showProfileDetails"
      @close="showProfileDetails = false"
    />

    <TasksModal
      :is-open="showTasks"
      :tasks="tasks"
      @close="showTasks = false"
      @add-task="addTask"
      @delete-task="deleteTask"
      @toggle-task="toggleTask"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { api } from './api'
import { useAuth } from './composables/useAuth'
import { useI18n } from './composables/useI18n'
import { useTheme } from './composables/useTheme'
import AppSidebar from './components/AppSidebar.vue'
import FilterBar from './components/FilterBar.vue'
import ProfileMenu from './components/ProfileMenu.vue'
import ProfileDetailsModal from './components/ProfileDetailsModal.vue'
import TasksModal from './components/TasksModal.vue'

export default {
  name: 'App',
  components: {
    AppSidebar,
    FilterBar,
    ProfileMenu,
    ProfileDetailsModal,
    TasksModal
  },
  setup() {
    const { currentUser } = useAuth()
    const { t } = useI18n()
    // Initialize theme (applies data-theme attribute)
    useTheme()
    const showProfileDetails = ref(false)
    const showTasks = ref(false)
    const apiTasks = ref([])

    // Merge mock tasks from currentUser with API tasks
    const tasks = computed(() => {
      return [...currentUser.value.tasks, ...apiTasks.value]
    })

    const loadTasks = async () => {
      try {
        apiTasks.value = await api.getTasks()
      } catch (err) {
        console.error('Failed to load tasks:', err)
      }
    }

    const addTask = async (taskData) => {
      try {
        const newTask = await api.createTask(taskData)
        // Add new task to the beginning of the array
        apiTasks.value.unshift(newTask)
      } catch (err) {
        console.error('Failed to add task:', err)
      }
    }

    const deleteTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const isMockTask = currentUser.value.tasks.some(t => t.id === taskId)

        if (isMockTask) {
          // Remove from mock tasks
          const index = currentUser.value.tasks.findIndex(t => t.id === taskId)
          if (index !== -1) {
            currentUser.value.tasks.splice(index, 1)
          }
        } else {
          // Remove from API tasks
          await api.deleteTask(taskId)
          apiTasks.value = apiTasks.value.filter(t => t.id !== taskId)
        }
      } catch (err) {
        console.error('Failed to delete task:', err)
      }
    }

    const toggleTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const mockTask = currentUser.value.tasks.find(t => t.id === taskId)

        if (mockTask) {
          // Toggle mock task status
          mockTask.status = mockTask.status === 'pending' ? 'completed' : 'pending'
        } else {
          // Toggle API task
          const updatedTask = await api.toggleTask(taskId)
          const index = apiTasks.value.findIndex(t => t.id === taskId)
          if (index !== -1) {
            apiTasks.value[index] = updatedTask
          }
        }
      } catch (err) {
        console.error('Failed to toggle task:', err)
      }
    }

    onMounted(loadTasks)

    return {
      t,
      showProfileDetails,
      showTasks,
      tasks,
      addTask,
      deleteTask,
      toggleTask
    }
  }
}
</script>

<style>
/* =============================================
   CSS Custom Properties — Light Mode (default)
   ============================================= */
:root {
  /* Backgrounds */
  --color-bg-page: #f8fafc;
  --color-bg-card: #ffffff;
  --color-bg-elevated: #f8fafc;
  --color-bg-input: #ffffff;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);

  /* Borders */
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-border-heavy: #cbd5e1;

  /* Text */
  --color-text-primary: #0f172a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-text-faint: #94a3b8;

  /* Accent */
  --color-accent: #2563eb;
  --color-accent-bg: #eff6ff;
  --color-accent-hover: #1d4ed8;

  /* Semantic — Success */
  --color-success-bg: #d1fae5;
  --color-success-text: #065f46;

  /* Semantic — Warning */
  --color-warning-bg: #fed7aa;
  --color-warning-text: #92400e;

  /* Semantic — Danger */
  --color-danger-bg: #fecaca;
  --color-danger-text: #991b1b;

  /* Semantic — Info */
  --color-info-bg: #dbeafe;
  --color-info-text: #1e40af;

  /* Semantic — Stable */
  --color-stable-bg: #e0e7ff;
  --color-stable-text: #3730a3;

  /* Shadows */
  --color-shadow: rgba(0, 0, 0, 0.1);
  --color-shadow-lg: rgba(0, 0, 0, 0.15);

  /* Error block */
  --color-error-bg: #fef2f2;
  --color-error-border: #fecaca;
  --color-error-text: #991b1b;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
}

/* =============================================
   CSS Custom Properties — Dark Mode
   ============================================= */
[data-theme="dark"] {
  /* Backgrounds */
  --color-bg-page: #0f1117;
  --color-bg-card: #1a1d27;
  --color-bg-elevated: #1f2233;
  --color-bg-input: #252836;
  --color-bg-overlay: rgba(0, 0, 0, 0.7);

  /* Borders */
  --color-border: #2a2d3a;
  --color-border-light: #1f2233;
  --color-border-heavy: #353849;

  /* Text */
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #a1a7bb;
  --color-text-muted: #6b7280;
  --color-text-faint: #4b5163;

  /* Accent */
  --color-accent: #5b8def;
  --color-accent-bg: #1a2332;
  --color-accent-hover: #7ba4f4;

  /* Semantic — Success */
  --color-success-bg: #0d3325;
  --color-success-text: #6ee7b7;

  /* Semantic — Warning */
  --color-warning-bg: #3d2800;
  --color-warning-text: #fbbf24;

  /* Semantic — Danger */
  --color-danger-bg: #3d1212;
  --color-danger-text: #fca5a5;

  /* Semantic — Info */
  --color-info-bg: #1a2332;
  --color-info-text: #93c5fd;

  /* Semantic — Stable */
  --color-stable-bg: #1e1b4b;
  --color-stable-text: #a5b4fc;

  /* Shadows */
  --color-shadow: rgba(0, 0, 0, 0.4);
  --color-shadow-lg: rgba(0, 0, 0, 0.5);

  /* Error block */
  --color-error-bg: #3d1212;
  --color-error-border: #7f1d1d;
  --color-error-text: #fca5a5;
}

/* =============================================
   Global Reset & Base Styles
   ============================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--color-bg-page);
  color: var(--color-text-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* =============================================
   App Layout — Sidebar + Content
   ============================================= */
.app {
  display: flex;
  min-height: 100vh;
}

.app-content {
  margin-left: 260px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
  height: 60px;
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 90;
}

.top-bar > .filters-bar {
  flex: 1;
}

.main-content {
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

/* =============================================
   Shared Component Styles
   ============================================= */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.375rem;
  letter-spacing: -0.025em;
}

.page-header p {
  color: var(--color-text-muted);
  font-size: 0.938rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--color-bg-card);
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: var(--color-border-heavy);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.stat-label {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.625rem;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
}

.stat-card.warning .stat-value {
  color: #ea580c;
}

.stat-card.success .stat-value {
  color: #059669;
}

.stat-card.danger .stat-value {
  color: #dc2626;
}

.stat-card.info .stat-value {
  color: var(--color-accent);
}

/* Cards */
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  margin-bottom: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.025em;
}

/* Tables */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

th {
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--color-border-light);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

tbody tr {
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background: var(--color-bg-elevated);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.313rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge.success {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.badge.warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
}

.badge.danger {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

.badge.info {
  background: var(--color-info-bg);
  color: var(--color-info-text);
}

.badge.increasing {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.badge.decreasing {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

.badge.stable {
  background: var(--color-stable-bg);
  color: var(--color-stable-text);
}

.badge.high {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

.badge.medium {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
}

.badge.low {
  background: var(--color-info-bg);
  color: var(--color-info-text);
}

/* Loading & Error */
.loading {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  font-size: 0.938rem;
}

.error {
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  color: var(--color-error-text);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin: 1rem 0;
  font-size: 0.938rem;
}
</style>
