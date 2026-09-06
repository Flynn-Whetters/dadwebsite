<script setup>
const steps = [
  {
    title: 'A tree comes down',
    text: 'Usually after a storm, or from a local arborist clearing a block — never cut just for timber.',
  },
  {
    title: 'It sits and dries',
    text: 'Slabbed and stacked for months so the wood settles before it’s touched.',
  },
  {
    title: 'Shaped by hand',
    text: 'Cut, sanded and oiled in the workshop, working with the grain rather than against it.',
  },
  {
    title: 'Onto your table',
    text: 'Finished with food-safe oil and ready for daily use, boards and all.',
  },
]
</script>

<template>
  <section class="section story">
    <div class="wrap">
      <div v-reveal>
        <p class="eyebrow">How it's made</p>
        <h2 class="section-heading">From fallen tree to kitchen table</h2>
        <p class="section-intro">
          Nothing here starts life as a plank on a shelf. Most of it was a whole tree once —
          felled by weather, not by me.
        </p>
      </div>

      <ol class="story__steps">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          v-reveal="index * 100"
          class="story__step"
        >
          <span class="story__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="story__title">{{ step.title }}</h3>
            <p class="story__text">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.story__steps {
  margin-top: 3rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.story__step {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
}

.story__index {
  font-family: var(--font-heading);
  color: var(--color-clay);
  font-size: 1.5rem;
}

.story__title {
  margin-top: 0.75rem;
  font-size: 1.05rem;
}

.story__text {
  margin-top: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}

@media (max-width: 860px) {
  .story__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .story__steps {
    grid-template-columns: 1fr;
  }
}
</style>
