# Design System — Factory Inventory Management

> Reference for building consistent, theme-aware UI across the application.
> All new components and views MUST follow these patterns.

---

## 1. Layout System

### App Shell
```
+------------------+---------------------------------------+
|                  |  Top Bar (FilterBar + ProfileMenu)    |
|    Sidebar       +---------------------------------------+
|    (260px)       |                                       |
|                  |         Content Area (fluid)          |
|  - Logo          |         max-width: 1600px             |
|  - Nav items     |         padding: 1.5rem 2rem          |
|  - Theme toggle  |                                       |
|  - Lang switcher |                                       |
+------------------+---------------------------------------+
```

- **Sidebar**: Fixed 260px width, full viewport height, `position: fixed`
- **Content area**: `margin-left: 260px`, fluid width, scrollable
- **Top bar**: Inside content area, contains FilterBar and ProfileMenu

### Sidebar Navigation
Each nav item uses an emoji icon for visual clarity:

| Route | Emoji | Label key |
|-------|-------|-----------|
| `/` | `📊` | `nav.overview` |
| `/inventory` | `📦` | `nav.inventory` |
| `/orders` | `🚚` | `nav.orders` |
| `/spending` | `💰` | `nav.finance` |
| `/demand` | `📈` | `nav.demandForecast` |
| `/reports` | `📋` | Reports |

---

## 2. Color Token System

All colors are defined as CSS custom properties on `:root` (light) and `[data-theme="dark"]`.

### Core Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-bg-page` | `#f8fafc` | `#0f1117` | Page background |
| `--color-bg-card` | `#ffffff` | `#1a1d27` | Cards, modals, sidebar |
| `--color-bg-elevated` | `#f8fafc` | `#1f2233` | Hover states, table headers, form bg |
| `--color-bg-input` | `#ffffff` | `#252836` | Input/select backgrounds |
| `--color-bg-overlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` | Modal overlays |
| `--color-border` | `#e2e8f0` | `#2a2d3a` | Primary borders |
| `--color-border-light` | `#f1f5f9` | `#1f2233` | Subtle borders (table rows) |
| `--color-border-heavy` | `#cbd5e1` | `#353849` | Emphasized borders |
| `--color-text-primary` | `#0f172a` | `#e2e8f0` | Headings, strong text |
| `--color-text-secondary` | `#334155` | `#a1a7bb` | Body text |
| `--color-text-muted` | `#64748b` | `#6b7280` | Labels, captions |
| `--color-text-faint` | `#94a3b8` | `#4b5163` | Placeholders, disabled |

### Accent Colors

| Token | Light | Dark |
|-------|-------|------|
| `--color-accent` | `#2563eb` | `#5b8def` |
| `--color-accent-bg` | `#eff6ff` | `#1a2332` |
| `--color-accent-hover` | `#1d4ed8` | `#7ba4f4` |

### Semantic Status Colors

| Status | Token prefix | Light bg | Light text | Dark bg | Dark text |
|--------|-------------|----------|------------|---------|-----------|
| Success | `--color-success` | `#d1fae5` | `#065f46` | `#0d3325` | `#6ee7b7` |
| Warning | `--color-warning` | `#fed7aa` | `#92400e` | `#3d2800` | `#fbbf24` |
| Danger | `--color-danger` | `#fecaca` | `#991b1b` | `#3d1212` | `#fca5a5` |
| Info | `--color-info` | `#dbeafe` | `#1e40af` | `#1a2332` | `#93c5fd` |

### Badge Variants
Badges also use semantic tokens:
- `.badge.success` → `--color-success-bg` / `--color-success-text`
- `.badge.warning` → `--color-warning-bg` / `--color-warning-text`
- `.badge.danger` → `--color-danger-bg` / `--color-danger-text`
- `.badge.info` → `--color-info-bg` / `--color-info-text`
- `.badge.stable` → uses `--color-stable-bg` / `--color-stable-text`

---

## 3. Typography

**Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

Loaded via Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Scale

| Usage | Size | Weight |
|-------|------|--------|
| Page title (h2) | `1.875rem` | 700 |
| Section title | `1.125rem` | 700 |
| Card title | `1.125rem` | 700 |
| Body text | `0.938rem` | 400 |
| Table header | `0.75rem` | 600, uppercase |
| Table cell | `0.875rem` | 400 |
| Label/caption | `0.813rem` | 600 |
| Badge text | `0.75rem` | 600, uppercase |
| Stat value | `2.25rem` | 700 |

---

## 4. Spacing Scale

Based on `rem` units with a consistent rhythm:

| Token | Value | Common use |
|-------|-------|-----------|
| `0.25rem` | 4px | Tight gaps |
| `0.5rem` | 8px | Icon gaps, padding |
| `0.75rem` | 12px | Small padding |
| `1rem` | 16px | Standard gap |
| `1.25rem` | 20px | Card padding |
| `1.5rem` | 24px | Section spacing |
| `2rem` | 32px | Page padding |

---

## 5. Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Badges, buttons, inputs |
| `--radius-md` | `8px` | Dropdowns, small cards |
| `--radius-lg` | `10px` | Cards, stat cards |
| `--radius-xl` | `12px` | Modals, large cards |

---

## 6. Component Patterns

### Cards
```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}
```

### Stat Cards
```css
.stat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}
.stat-label { color: var(--color-text-muted); }
.stat-value { color: var(--color-text-primary); }
```

### Tables
```css
thead { background: var(--color-bg-elevated); }
th { color: var(--color-text-muted); }
td { color: var(--color-text-secondary); border-top: 1px solid var(--color-border-light); }
tbody tr:hover { background: var(--color-bg-elevated); }
```

### Modals
```css
.modal-overlay { background: var(--color-bg-overlay); }
.modal-container { background: var(--color-bg-card); border: 1px solid var(--color-border); }
.modal-header { border-bottom: 1px solid var(--color-border); }
.modal-footer { border-top: 1px solid var(--color-border); }
.modal-title { color: var(--color-text-primary); }
.close-button { color: var(--color-text-muted); }
.close-button:hover { background: var(--color-bg-elevated); color: var(--color-text-primary); }
```

### Buttons
```css
.btn-secondary {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}
.btn-secondary:hover {
  background: var(--color-border);
  border-color: var(--color-border-heavy);
}
```

### Form Inputs
```css
.filter-select, .search-input, .task-input {
  background: var(--color-bg-input);
  border: 1px solid var(--color-border-heavy);
  color: var(--color-text-primary);
}
```

### Dropdowns
```css
.dropdown-menu {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 25px var(--color-shadow);
}
.dropdown-item { color: var(--color-text-secondary); }
.dropdown-item:hover { background: var(--color-bg-elevated); }
```

---

## 7. Theme Toggle

### Composable: `useTheme.js`

```js
import { useTheme } from '@/composables/useTheme'
const { theme, toggleTheme, isDark } = useTheme()
```

- **Storage**: `localStorage` key `app-theme`
- **Default**: `dark` (user prefers dark mode)
- **Mechanism**: Sets `data-theme` attribute on `<html>` element
- **Values**: `'light'` or `'dark'`

### ThemeToggle Component
- Sun icon (light mode active) / Moon icon (dark mode active)
- Located at bottom of sidebar
- Calls `toggleTheme()` on click

---

## 8. Color Migration Reference

When converting old hardcoded colors to CSS variables:

| Old hex | New variable |
|---------|-------------|
| `#f8fafc` (bg) | `var(--color-bg-page)` or `var(--color-bg-elevated)` |
| `#ffffff` / `white` | `var(--color-bg-card)` or `var(--color-bg-input)` |
| `#f1f5f9` | `var(--color-bg-elevated)` or `var(--color-border-light)` |
| `#e2e8f0` | `var(--color-border)` |
| `#cbd5e1` | `var(--color-border-heavy)` |
| `#94a3b8` | `var(--color-text-faint)` |
| `#64748b` | `var(--color-text-muted)` |
| `#475569` | `var(--color-text-muted)` (context-dependent) |
| `#334155` | `var(--color-text-secondary)` |
| `#1e293b` | `var(--color-text-primary)` |
| `#0f172a` | `var(--color-text-primary)` |
| `#2563eb` | `var(--color-accent)` |
| `#3b82f6` | `var(--color-accent)` |
| `#eff6ff` | `var(--color-accent-bg)` |
| `#d1fae5` | `var(--color-success-bg)` |
| `#065f46` | `var(--color-success-text)` |
| `#fecaca` | `var(--color-danger-bg)` |
| `#991b1b` | `var(--color-danger-text)` |
| `#fed7aa` | `var(--color-warning-bg)` |
| `#92400e` | `var(--color-warning-text)` |
| `#dbeafe` | `var(--color-info-bg)` |
| `#1e40af` | `var(--color-info-text)` |
| `rgba(0,0,0,0.5)` | `var(--color-bg-overlay)` |

### Special cases
- `#e0e7ff` / `#3730a3` (stable badge) → `var(--color-stable-bg)` / `var(--color-stable-text)`
- Gradient backgrounds (avatars, icons) → Keep as-is (brand colors)
- Chart colors (SVG inline) → Keep as-is (data visualization)
- Status-specific accents (`#10b981`, `#ef4444`, `#f59e0b`) in charts → Keep as-is

---

## 9. Shadow Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--color-shadow` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.4)` |
| `--color-shadow-lg` | `rgba(0,0,0,0.15)` | `rgba(0,0,0,0.5)` |

---

## 10. Transition Standards

All interactive elements use consistent transitions:
- **Duration**: `0.15s` to `0.2s`
- **Easing**: `ease`
- **Properties**: `all`, `background`, `color`, `border-color`, `transform`

---

## 11. Rules

1. **Never hardcode colors** — always use `var(--token-name)`
2. **Keep gradients** for brand elements (avatars, accent icons) — don't tokenize
3. **Keep chart colors** inline — data viz colors don't change with theme
4. **Use semantic tokens** — pick `success`, `warning`, `danger`, `info` over raw colors
5. **Test both themes** — every new component must look correct in light AND dark
6. **Use emojis** in navigation and UI elements for visual clarity
