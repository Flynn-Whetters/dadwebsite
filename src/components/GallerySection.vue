<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { pieces } from '../data/pieces.js'
import PieceCard from './PieceCard.vue'

const featured = computed(() => pieces.slice(0, 3))
</script>

<template>
  <section id="collection" class="section">
    <div class="wrap">
      <div v-reveal class="gallery-head">
        <div>
          <p class="eyebrow">Recently finished</p>
          <h2 class="section-heading">A few pieces from the workshop</h2>
        </div>
        <RouterLink to="/collection" class="gallery-head__link">
          See the full collection
          <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>

      <div class="gallery-grid">
        <PieceCard
          v-for="(piece, index) in featured"
          :key="piece.id"
          v-reveal="index * 90"
          :piece="piece"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 2rem;
}

.gallery-head__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: var(--color-sage);
  font-weight: 500;
  font-size: 0.95rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
  transition: gap 0.15s ease, color 0.15s ease;
}

.gallery-head__link:hover {
  gap: 0.7rem;
  color: var(--color-ink);
}

.gallery-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
}
</style>
