<script setup>
import { timbers } from '../data/timbers.js'
</script>

<template>
  <section id="timber" class="section timber">
    <div class="wrap">
      <div v-reveal>
        <p class="eyebrow">Our timber</p>
        <h2 class="section-heading">The species that turn up most</h2>
        <p class="section-intro">
          All native, and mostly local to the Warrandyte area — salvaged from storms,
          clearing work, or trees that simply reached the end of their life.
        </p>
      </div>

      <div class="timber-grid">
        <div
          v-for="(timber, index) in timbers"
          :key="timber.name"
          v-reveal="index * 80"
          class="timber-item"
        >
          <h3 class="timber-item__name">{{ timber.name }}</h3>
          <p class="timber-item__note">{{ timber.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timber-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 2.5rem;
}

.timber-item {
  border-top: 1px solid var(--color-border);
  padding-top: 1.25rem;
}

.timber-item__name {
  font-size: 1.15rem;
}

.timber-item__note {
  margin-top: 0.5rem;
  color: var(--color-ink-soft);
  font-size: 0.92rem;
}

@media (max-width: 640px) {
  .timber-grid {
    grid-template-columns: 1fr;
  }
}
</style>
