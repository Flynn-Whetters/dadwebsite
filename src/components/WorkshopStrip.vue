<script setup>
import ResponsiveImage from './ResponsiveImage.vue'

// Drop matching photos into /public/images/workshop and they appear here.
const shots = [
  { src: '/images/workshop/slabbing.jpg', caption: 'Slabbing a red gum round' },
  { src: '/images/workshop/stacked.jpg', caption: 'Stacked and drying' },
  { src: '/images/workshop/carving.jpg', caption: 'Roughing out a spoon' },
  { src: '/images/workshop/sanding.jpg', caption: 'Final sand before oil' },
  { src: '/images/workshop/oiling.jpg', caption: 'First coat going on' },
]
</script>

<template>
  <section class="strip">
    <div class="wrap">
      <div v-reveal class="strip__head">
        <p class="eyebrow">In the workshop</p>
        <h2 class="section-heading">Somewhere between a tree and a board</h2>
      </div>
    </div>

    <ul class="strip__rail">
      <li v-for="shot in shots" :key="shot.src" class="strip__item">
        <div class="strip__frame">
          <ResponsiveImage :src="shot.src" :alt="shot.caption" sizes="(max-width: 640px) 72vw, 22rem" />
        </div>
        <p class="strip__caption">{{ shot.caption }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.strip {
  padding-block: var(--section-gap);
}

.strip__rail {
  margin-top: 2.5rem;
  list-style: none;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: max(1.5rem, calc((100vw - var(--content-width)) / 2));
  padding-inline: max(1.5rem, calc((100vw - var(--content-width)) / 2));
  padding-bottom: 1rem;
  scrollbar-width: thin;
}

.strip__item {
  flex: 0 0 auto;
  width: min(72vw, 22rem);
  scroll-snap-align: start;
}

.strip__frame {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.strip__caption {
  margin-top: 0.85rem;
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}
</style>
