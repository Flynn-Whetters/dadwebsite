<script setup>
import { useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import ResponsiveImage from './ResponsiveImage.vue'
import { startPieceMorph } from '../lib/viewTransition.js'

const props = defineProps({
  piece: {
    type: Object,
    required: true,
  },
  // Gallery-wall layouts vary tile height so the grid doesn't read as a product catalog.
  ratio: {
    type: String,
    default: 'standard',
    validator: (value) => ['standard', 'tall', 'wide'].includes(value),
  },
})

const photo = useTemplateRef('photo')

function handleNavigate() {
  startPieceMorph(photo.value, props.piece.id)
}
</script>

<template>
  <article class="piece">
    <RouterLink :to="`/pieces/${piece.id}`" class="piece__link" @click="handleNavigate">
      <div ref="photo" class="piece__image" :class="`piece__image--${ratio}`">
        <ResponsiveImage
          :src="piece.image"
          :alt="piece.title"
          sizes="(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 30vw"
        />
        <span v-if="!piece.available" class="piece__badge">Past piece</span>
      </div>

      <div class="piece__body">
        <div class="piece__meta">
          <span class="piece__no">No. {{ piece.id }}</span>
          <span class="piece__species">{{ piece.species }}</span>
        </div>
        <h3 class="piece__title">{{ piece.title }}</h3>
        <p class="piece__dimensions">{{ piece.dimensions }}</p>
        <p class="piece__story">{{ piece.story }}</p>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.piece {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.piece:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -24px rgb(46 58 44 / 45%);
}

.piece__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.piece__link:focus-visible {
  outline-offset: -4px;
}

.piece__image {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #e3ddc9;
  overflow: hidden;
}

.piece__image--tall {
  aspect-ratio: 3 / 4;
}

.piece__image--wide {
  aspect-ratio: 16 / 10;
}

.piece__image :deep(.ri) {
  transition: transform 0.5s ease;
}

.piece:hover .piece__image :deep(.ri) {
  transform: scale(1.04);
}

.piece__badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--color-ink);
  color: var(--color-surface);
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
}

.piece__body {
  padding: 1.25rem 1.4rem 1.5rem;
}

.piece__meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-sage);
  font-weight: 500;
}

.piece__title {
  margin-top: 0.6rem;
  font-size: 1.2rem;
}

.piece__dimensions {
  margin-top: 0.3rem;
  font-size: 0.85rem;
  color: var(--color-ink-soft);
}

.piece__story {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--color-ink-soft);
}
</style>
