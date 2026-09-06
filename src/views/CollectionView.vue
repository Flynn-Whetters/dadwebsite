<script setup>
import { computed, ref } from 'vue'
import { pieces, categoryLabels } from '../data/pieces.js'
import PieceCard from '../components/PieceCard.vue'

const activeCategory = ref('all')
const activeSpecies = ref('all')

const categories = computed(() => [...new Set(pieces.map((piece) => piece.category))])
const speciesList = computed(() => [...new Set(pieces.map((piece) => piece.species))].sort())

const filtered = computed(() =>
  pieces.filter(
    (piece) =>
      (activeCategory.value === 'all' || piece.category === activeCategory.value) &&
      (activeSpecies.value === 'all' || piece.species === activeSpecies.value),
  ),
)

// Vary tile shape across the wall so the grid reads as a gallery, not a product catalog.
const ratios = ['standard', 'tall', 'wide', 'standard', 'wide', 'tall']
function ratioFor(index) {
  return ratios[index % ratios.length]
}

function reset() {
  activeCategory.value = 'all'
  activeSpecies.value = 'all'
}
</script>

<template>
  <div class="collection">
    <div class="wrap">
      <header class="collection__head">
        <p class="eyebrow">The collection</p>
        <h1 class="collection__title">Everything that's come out of the workshop</h1>
        <p class="section-intro">
          Boards, spoons and the occasional larger piece. Some are still available, some
          have already found a home — all of them can be made again in a similar shape.
        </p>
      </header>

      <div class="filters">
        <div class="filters__group" role="group" aria-label="Filter by type">
          <button
            type="button"
            class="chip"
            :class="{ 'chip--active': activeCategory === 'all' }"
            :aria-pressed="activeCategory === 'all'"
            @click="activeCategory = 'all'"
          >
            Everything
          </button>
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="chip"
            :class="{ 'chip--active': activeCategory === category }"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ categoryLabels[category] ?? category }}
          </button>
        </div>

        <label class="filters__species">
          <span>Timber</span>
          <select v-model="activeSpecies">
            <option value="all">Any species</option>
            <option v-for="species in speciesList" :key="species" :value="species">
              {{ species }}
            </option>
          </select>
        </label>
      </div>

      <p class="collection__count" aria-live="polite">
        {{ filtered.length }} {{ filtered.length === 1 ? 'piece' : 'pieces' }}
      </p>

      <div v-if="filtered.length" class="wall">
        <PieceCard
          v-for="(piece, index) in filtered"
          :key="piece.id"
          :piece="piece"
          :ratio="ratioFor(index)"
        />
      </div>

      <div v-else class="collection__empty">
        <p>Nothing matches that combination yet.</p>
        <button type="button" class="btn btn-secondary" @click="reset">Clear filters</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collection {
  padding-block: clamp(2.5rem, 2rem + 2vw, 4rem) var(--section-gap);
}

.collection__title {
  margin-top: 1rem;
  font-size: clamp(2rem, 1.5rem + 2.4vw, 3.25rem);
  max-width: 20ch;
}

.filters {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.filters__group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-ink-soft);
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.chip:hover {
  border-color: var(--color-sage);
  color: var(--color-ink);
}

.chip--active {
  background: var(--color-ink);
  border-color: var(--color-ink);
  color: var(--color-surface);
}

.filters__species {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}

.filters__species select {
  font-family: var(--font-body);
  font-size: 0.88rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-ink);
}

.collection__count {
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--color-sage);
}

.wall {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1.75rem;
  align-items: start;
}

.collection__empty {
  margin-top: 3rem;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: grid;
  justify-items: center;
  gap: 1.25rem;
  color: var(--color-ink-soft);
}
</style>
