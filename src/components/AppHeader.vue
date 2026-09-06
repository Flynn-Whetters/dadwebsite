<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AdminAccessButton from './AdminAccessButton.vue'

const open = ref(false)

const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/care', label: 'Care guide' },
  { to: { path: '/', hash: '#timber' }, label: 'Our timber' },
  { to: { path: '/', hash: '#about' }, label: 'About' },
  { to: { path: '/', hash: '#inquire' }, label: 'Inquire' },
]

function closeMenu() {
  open.value = false
}
</script>

<template>
  <header class="header">
    <div class="wrap header__row">
      <RouterLink to="/" class="header__brand" @click="closeMenu">Hale &amp; Grain</RouterLink>

      <div class="header__right">
        <nav id="primary-nav" class="header__nav" :class="{ 'is-open': open }">
          <RouterLink v-for="link in links" :key="link.label" :to="link.to" @click="closeMenu">
            {{ link.label }}
          </RouterLink>
        </nav>

        <AdminAccessButton />

        <button
          class="header__toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="primary-nav"
          @click="open = !open"
        >
          <span class="sr-only">Menu</span>
          <span class="header__toggle-bar" :class="{ 'is-open': open }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  /* Held out of the page cross-fade so it stays put between routes. */
  view-transition-name: site-header;
  background: rgb(237 234 224 / 85%);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.1rem;
}

.header__brand {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header__nav {
  display: flex;
  gap: 1.75rem;
}

.header__nav a {
  text-decoration: none;
  font-size: 0.95rem;
  color: var(--color-ink-soft);
  transition: color 0.15s ease;
}

.header__nav a:hover {
  color: var(--color-ink);
}

.header__toggle {
  display: none;
  background: none;
  border: none;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  position: relative;
}

.header__toggle-bar,
.header__toggle-bar::before,
.header__toggle-bar::after {
  content: '';
  position: absolute;
  left: 0.4rem;
  right: 0.4rem;
  height: 2px;
  background: var(--color-ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.header__toggle-bar {
  top: 50%;
  transform: translateY(-50%);
}

.header__toggle-bar::before {
  top: -0.5rem;
}

.header__toggle-bar::after {
  top: 0.5rem;
}

.header__toggle-bar.is-open {
  background: transparent;
}

.header__toggle-bar.is-open::before {
  top: 0;
  transform: rotate(45deg);
}

.header__toggle-bar.is-open::after {
  top: 0;
  transform: rotate(-45deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 860px) {
  .header__toggle {
    display: block;
  }

  .header__nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }

  .header__nav.is-open {
    max-height: 20rem;
  }

  .header__nav a {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--color-border);
  }
}
</style>
