<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <AppHeader />
  <main id="main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 50;
  background: var(--color-ink);
  color: var(--color-surface);
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-link:focus-visible {
  top: 1rem;
}
</style>
