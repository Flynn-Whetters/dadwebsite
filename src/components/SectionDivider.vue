<template>
  <div class="divider" role="presentation" aria-hidden="true">
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
      <path
        d="M0 14 C 90 6, 150 20, 250 13 S 420 4, 520 14 S 700 22, 810 12 S 980 5, 1090 15 S 1160 19, 1200 12"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.divider {
  width: min(100% - 3rem, var(--content-width));
  margin-inline: auto;
  color: var(--color-sage);
  opacity: 0.5;
}

.divider svg {
  display: block;
  width: 100%;
  height: 1.5rem;
}
</style>
