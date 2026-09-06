<script setup>
import { computed, ref } from 'vue'
import manifest from '../data/imageManifest.json'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  // Tells the browser how wide the image renders, so it can pick the right variant.
  sizes: { type: String, default: '100vw' },
  eager: { type: Boolean, default: false },
})

// Present once `npm run images` has processed this photo; until then we serve the original.
const entry = computed(() => manifest[props.src] ?? null)
const failed = ref(false)
const loaded = ref(false)

function srcset(format) {
  return entry.value.variants[format].map((variant) => `${variant.src} ${variant.w}w`).join(', ')
}

const frameStyle = computed(() =>
  entry.value && !loaded.value ? { backgroundImage: `url("${entry.value.placeholder}")` } : null,
)
</script>

<template>
  <div class="ri" :style="frameStyle">
    <picture v-if="entry && !failed">
      <source :srcset="srcset('avif')" :sizes="sizes" type="image/avif" />
      <source :srcset="srcset('webp')" :sizes="sizes" type="image/webp" />
      <img
        :src="entry.variants.jpeg.at(-1).src"
        :srcset="srcset('jpeg')"
        :sizes="sizes"
        :alt="alt"
        :width="entry.width"
        :height="entry.height"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
        class="ri__img"
        :class="{ 'ri__img--loaded': loaded }"
        @load="loaded = true"
        @error="failed = true"
      />
    </picture>

    <img
      v-else-if="!failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="ri__img ri__img--loaded"
      @error="failed = true"
    />

    <div v-else class="ri__pending">
      <span>Photo coming soon</span>
    </div>
  </div>
</template>

<style scoped>
.ri {
  width: 100%;
  height: 100%;
  background-color: #e3ddc9;
  background-size: cover;
  background-position: center;
}

.ri picture {
  display: contents;
}

.ri__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.ri__img--loaded {
  opacity: 1;
}

.ri__pending {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: repeating-linear-gradient(
    135deg,
    #e3ddc9,
    #e3ddc9 10px,
    #ddd6be 10px,
    #ddd6be 20px
  );
  color: var(--color-ink-soft);
  font-size: 0.85rem;
}
</style>
