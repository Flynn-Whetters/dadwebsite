<script setup>
import { computed, ref, useTemplateRef, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { pieces, categoryLabels } from '../data/pieces.js'
import PieceCard from '../components/PieceCard.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { morphingPieceId, MORPH_NAME } from '../lib/viewTransition.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const piece = computed(() => pieces.find((item) => item.id === props.id))

const related = computed(() =>
  pieces
    .filter(
      (item) =>
        item.id !== props.id &&
        (item.species === piece.value?.species || item.category === piece.value?.category),
    )
    .slice(0, 3),
)

const activeIndex = ref(0)

// Pairs with the grid tile the visitor clicked so the photo morphs between the two views.
const morphStyle = computed(() =>
  morphingPieceId.value === props.id ? { viewTransitionName: MORPH_NAME } : null,
)

watch(
  () => props.id,
  () => {
    activeIndex.value = 0
  },
)

const lightbox = useTemplateRef('lightbox')

function openLightbox() {
  lightbox.value?.showModal()
}

function closeLightbox() {
  lightbox.value?.close()
}

function step(offset) {
  const total = piece.value.gallery.length
  activeIndex.value = (activeIndex.value + offset + total) % total
}
</script>

<template>
  <div v-if="piece" class="piece-view">
    <div class="wrap">
      <RouterLink to="/collection" class="back-link">
        <span aria-hidden="true">&larr;</span> Back to the collection
      </RouterLink>

      <div class="piece-view__layout">
        <div class="piece-view__media">
          <button
            type="button"
            class="piece-view__main"
            :style="morphStyle"
            :aria-label="`View ${piece.title} larger`"
            @click="openLightbox"
          >
            <ResponsiveImage
              :src="piece.gallery[activeIndex]"
              :alt="piece.title"
              sizes="(max-width: 860px) 92vw, 55vw"
              eager
            />
          </button>

          <div v-if="piece.gallery.length > 1" class="thumbs">
            <button
              v-for="(src, index) in piece.gallery"
              :key="src"
              type="button"
              class="thumb"
              :class="{ 'thumb--active': index === activeIndex }"
              :aria-label="`View photo ${index + 1}`"
              :aria-current="index === activeIndex"
              @click="activeIndex = index"
            >
              <ResponsiveImage :src="src" alt="" sizes="5rem" />
            </button>
          </div>
        </div>

        <div class="piece-view__info">
          <p class="eyebrow">No. {{ piece.id }}</p>
          <h1 class="piece-view__title">{{ piece.title }}</h1>

          <dl class="spec">
            <div class="spec__row">
              <dt>Timber</dt>
              <dd>{{ piece.species }}</dd>
            </div>
            <div class="spec__row">
              <dt>Dimensions</dt>
              <dd>{{ piece.dimensions }}</dd>
            </div>
            <div class="spec__row">
              <dt>Type</dt>
              <dd>{{ categoryLabels[piece.category] ?? piece.category }}</dd>
            </div>
            <div class="spec__row">
              <dt>Status</dt>
              <dd>{{ piece.available ? 'Available' : 'Already found a home' }}</dd>
            </div>
          </dl>

          <p class="piece-view__story">{{ piece.story }}</p>

          <RouterLink
            :to="{ path: '/', hash: '#inquire', query: { piece: piece.id } }"
            class="btn btn-primary"
          >
            {{ piece.available ? 'Inquire about this piece' : 'Ask for something similar' }}
          </RouterLink>
        </div>
      </div>

      <section v-if="related.length" class="related">
        <h2 class="related__title">Other pieces you might like</h2>
        <div class="related__grid">
          <PieceCard v-for="item in related" :key="item.id" :piece="item" />
        </div>
      </section>
    </div>

    <dialog ref="lightbox" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox__inner">
        <ResponsiveImage
          :src="piece.gallery[activeIndex]"
          :alt="piece.title"
          sizes="92vw"
          class="lightbox__image"
        />

        <button type="button" class="lightbox__close" aria-label="Close" @click="closeLightbox">
          &times;
        </button>

        <template v-if="piece.gallery.length > 1">
          <button
            type="button"
            class="lightbox__nav lightbox__nav--prev"
            aria-label="Previous photo"
            @click="step(-1)"
          >
            &larr;
          </button>
          <button
            type="button"
            class="lightbox__nav lightbox__nav--next"
            aria-label="Next photo"
            @click="step(1)"
          >
            &rarr;
          </button>
        </template>
      </div>
    </dialog>
  </div>

  <div v-else class="wrap piece-view__missing">
    <h1>That piece isn't here.</h1>
    <RouterLink to="/collection" class="btn btn-secondary">Back to the collection</RouterLink>
  </div>
</template>

<style scoped>
.piece-view {
  padding-block: clamp(2rem, 1.5rem + 2vw, 3rem) var(--section-gap);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  font-size: 0.9rem;
  color: var(--color-sage);
}

.back-link:hover {
  color: var(--color-ink);
}

.piece-view__layout {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: start;
}

.piece-view__main {
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #e3ddc9;
  aspect-ratio: 4 / 3;
  cursor: zoom-in;
}

.thumbs {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.thumb {
  width: 5rem;
  aspect-ratio: 1;
  padding: 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: #e3ddc9;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 0.15s ease, border-color 0.15s ease;
}

.thumb:hover,
.thumb--active {
  opacity: 1;
  border-color: var(--color-sage);
}

.piece-view__title {
  margin-top: 0.75rem;
  font-size: clamp(1.9rem, 1.5rem + 1.8vw, 2.75rem);
}

.spec {
  margin-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.spec__row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.92rem;
}

.spec__row dt {
  color: var(--color-ink-soft);
}

.spec__row dd {
  margin: 0;
  font-weight: 500;
}

.piece-view__story {
  margin-block: 1.75rem;
  color: var(--color-ink-soft);
}

.related {
  margin-top: var(--section-gap);
  border-top: 1px solid var(--color-border);
  padding-top: 3rem;
}

.related__title {
  font-size: 1.5rem;
}

.related__grid {
  margin-top: 1.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.piece-view__missing {
  padding-block: 6rem;
  display: grid;
  justify-items: start;
  gap: 1.5rem;
}

.lightbox {
  border: none;
  background: transparent;
  max-width: min(92vw, 60rem);
  max-height: 92vh;
  padding: 0;
}

.lightbox::backdrop {
  background: rgb(46 58 44 / 82%);
  backdrop-filter: blur(3px);
}

.lightbox__inner {
  position: relative;
}

.lightbox__image {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.lightbox__image :deep(img) {
  max-height: 92vh;
  object-fit: contain;
}

.lightbox__close,
.lightbox__nav {
  position: absolute;
  border: none;
  background: var(--color-surface);
  color: var(--color-ink);
  border-radius: 50%;
  width: 2.75rem;
  height: 2.75rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.lightbox__close {
  top: 0.75rem;
  right: 0.75rem;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
}

.lightbox__nav--prev {
  left: 0.75rem;
}

.lightbox__nav--next {
  right: 0.75rem;
}

@media (max-width: 860px) {
  .piece-view__layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
