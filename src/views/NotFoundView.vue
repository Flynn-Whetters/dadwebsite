<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="wrap not-found">
    <p class="eyebrow">Page not found</p>
    <h1>That page has gone walkabout.</h1>
    <p class="not-found__text">
      The link might be old, or the piece may have been renumbered. The collection is
      the best place to pick up from.
    </p>
    <RouterLink to="/collection" class="btn btn-primary">Browse the collection</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  padding-block: 7rem;
  display: grid;
  justify-items: start;
  gap: 1rem;
}

.not-found h1 {
  font-size: clamp(1.9rem, 1.5rem + 2vw, 2.75rem);
  max-width: 18ch;
}

.not-found__text {
  color: var(--color-ink-soft);
  max-width: 34rem;
  margin-bottom: 0.75rem;
}
</style>
