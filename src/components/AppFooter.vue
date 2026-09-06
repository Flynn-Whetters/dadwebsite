<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const links = [
  { to: '/collection', label: 'The collection' },
  { to: '/care', label: 'Care guide' },
  { to: { path: '/', hash: '#timber' }, label: 'Our timber' },
  { to: { path: '/', hash: '#about' }, label: 'About the maker' },
  { to: { path: '/', hash: '#inquire' }, label: 'Send an inquiry' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__row">
      <div class="footer__brand-block">
        <RouterLink to="/" class="footer__brand">Hale &amp; Grain</RouterLink>
        <p class="footer__blurb">
          Boards, spoons and small furniture from local and salvaged timber. Made by hand
          in Warrandyte, Victoria.
        </p>
      </div>

      <nav class="footer__nav" aria-label="Footer">
        <RouterLink v-for="link in links" :key="link.label" :to="link.to">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>

    <div class="wrap footer__base">
      <span>&copy; {{ year }} Hale &amp; Grain</span>
      <span>Warrandyte, VIC</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  margin-top: var(--section-gap);
  view-transition-name: site-footer;
}

.footer__row {
  padding-top: 3rem;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 2.5rem;
}

.footer__brand {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  text-decoration: none;
}

.footer__blurb {
  margin-top: 0.75rem;
  max-width: 28rem;
  color: var(--color-ink-soft);
  font-size: 0.9rem;
}

.footer__nav {
  display: grid;
  gap: 0.6rem;
  justify-items: start;
  align-content: start;
}

.footer__nav a {
  text-decoration: none;
  font-size: 0.9rem;
  color: var(--color-ink-soft);
}

.footer__nav a:hover {
  color: var(--color-ink);
}

.footer__base {
  margin-top: 3rem;
  padding-block: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  font-size: 0.82rem;
  color: var(--color-ink-soft);
}

@media (max-width: 640px) {
  .footer__row {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
