<script setup>
// A tree cross-section. Radii wobble deterministically so the rings look grown
// rather than struck with a compass.
const rings = Array.from({ length: 14 }, (_, index) => {
  const t = index / 13
  const base = 5 + t * 43
  const wobble = Math.sin(index * 2.4) * 1.5

  return {
    rx: base + wobble,
    ry: base * 0.95 - wobble * 0.7,
    cx: 50 + Math.sin(index * 1.1) * 1.8,
    cy: 50 + Math.cos(index * 0.9) * 1.3,
    width: 0.45 + ((index * 7) % 3) * 0.4,
    opacity: 0.22 + (index % 3) * 0.13,
  }
})
</script>

<template>
  <svg class="rings" viewBox="0 0 100 100" role="presentation" aria-hidden="true">
    <defs>
      <radialGradient id="ring-face" cx="34%" cy="28%">
        <stop offset="0%" stop-color="#E4D3B4" />
        <stop offset="58%" stop-color="#CDA985" />
        <stop offset="100%" stop-color="#A87F5F" />
      </radialGradient>
      <clipPath id="ring-clip">
        <circle cx="50" cy="50" r="49" />
      </clipPath>
    </defs>

    <circle cx="50" cy="50" r="49" fill="url(#ring-face)" />

    <g clip-path="url(#ring-clip)" fill="none" stroke="#5C452F">
      <ellipse
        v-for="(ring, index) in rings"
        :key="index"
        :cx="ring.cx"
        :cy="ring.cy"
        :rx="ring.rx"
        :ry="ring.ry"
        :stroke-width="ring.width"
        :stroke-opacity="ring.opacity"
      />
      <!-- A split running out from the heartwood, the way a dried round usually checks. -->
      <path
        d="M50 50 C 56 38, 60 26, 63 6"
        stroke="#5C452F"
        stroke-opacity="0.3"
        stroke-width="1.1"
        stroke-linecap="round"
      />
    </g>

    <circle cx="50" cy="50" r="49" fill="none" stroke="#5C452F" stroke-opacity="0.25" />
  </svg>
</template>

<style scoped>
.rings {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 24px 48px rgb(46 58 44 / 22%));
}
</style>
