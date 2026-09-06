<script setup>
import { RouterLink } from 'vue-router'

const steps = [
  {
    title: 'Wash it by hand',
    text: 'Warm water, a little dish soap, a cloth or soft brush. Rinse it and move on — the thing to avoid is leaving it sitting in water.',
  },
  {
    title: 'Never the dishwasher',
    text: 'The heat and the long soak will split a board faster than anything else. This is the one rule worth being strict about.',
  },
  {
    title: 'Dry it standing up',
    text: 'Stand it on its edge so both faces dry at the same rate. Lying flat on a wet bench is how boards end up cupped.',
  },
  {
    title: 'Oil it when it looks thirsty',
    text: 'When the colour goes pale and dry-looking, it wants oil. For a board in regular use that tends to be every month or so at first, then a few times a year.',
  },
]

const oiling = [
  'Make sure the board is clean and completely dry.',
  'Pour a generous puddle of food-safe oil straight onto the wood.',
  'Spread it over every surface with a cloth — edges and underside included.',
  'Leave it to soak in for a few hours, or overnight if you can.',
  'Wipe off whatever hasn’t been absorbed. It should feel dry, not sticky.',
]
</script>

<template>
  <article class="care">
    <div class="wrap">
      <header class="care__head">
        <p class="eyebrow">Care guide</p>
        <h1 class="care__title">Looking after your board</h1>
        <p class="section-intro">
          A timber board will outlast almost everything else in your kitchen if you treat
          it reasonably. None of this is complicated — it's mostly about keeping water out
          and oil in.
        </p>
      </header>

      <section class="care__section">
        <h2 class="care__heading">Day to day</h2>
        <ol class="care__steps">
          <li v-for="(step, index) in steps" :key="step.title" v-reveal="index * 80" class="care__step">
            <span class="care__index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="care__section">
        <h2 class="care__heading">Re-oiling, step by step</h2>
        <p class="care__note">
          Use food-safe oil — food-grade mineral oil is cheap and works well, or a
          beeswax and oil blend if you want a bit more sheen. Avoid cooking oils like
          olive or vegetable: they go rancid and the board will start to smell.
        </p>
        <ol class="care__list">
          <li v-for="item in oiling" :key="item">{{ item }}</li>
        </ol>
      </section>

      <section class="care__section">
        <h2 class="care__heading">If something goes wrong</h2>
        <dl class="care__faq">
          <div>
            <dt>The surface feels rough after washing</dt>
            <dd>
              Normal — water lifts the grain slightly. A very light sand with fine paper
              and a re-oil brings it straight back.
            </dd>
          </div>
          <div>
            <dt>There's a stain from beetroot or turmeric</dt>
            <dd>
              A paste of coarse salt and half a lemon, scrubbed in and rinsed off, lifts
              most of it. Some deep stains just become part of the board's history.
            </dd>
          </div>
          <div>
            <dt>It's started to cup or bow</dt>
            <dd>
              Usually one face has dried faster than the other. Oil the dry side well and
              store it standing up. If it's badly warped, send me a photo — it can often
              be re-flattened.
            </dd>
          </div>
        </dl>
      </section>

      <div class="care__cta">
        <p>Still not sure about something?</p>
        <RouterLink :to="{ path: '/', hash: '#inquire' }" class="btn btn-primary">
          Ask me directly
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.care {
  padding-block: clamp(2.5rem, 2rem + 2vw, 4rem) var(--section-gap);
}

.care__title {
  margin-top: 1rem;
  font-size: clamp(2rem, 1.5rem + 2.4vw, 3.25rem);
  max-width: 18ch;
}

.care__section {
  margin-top: 3.5rem;
  max-width: 44rem;
}

.care__heading {
  font-size: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.care__steps {
  margin-top: 1.75rem;
  list-style: none;
  display: grid;
  gap: 1.5rem;
}

.care__step {
  display: flex;
  gap: 1.25rem;
}

.care__index {
  font-family: var(--font-heading);
  color: var(--color-clay);
  font-size: 1.35rem;
  flex-shrink: 0;
}

.care__step h3 {
  font-size: 1.1rem;
}

.care__step p {
  margin-top: 0.35rem;
  color: var(--color-ink-soft);
  font-size: 0.95rem;
}

.care__note {
  margin-top: 1.5rem;
  color: var(--color-ink-soft);
}

.care__list {
  margin-top: 1.25rem;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.6rem;
  color: var(--color-ink-soft);
}

.care__faq {
  margin-top: 1.75rem;
  display: grid;
  gap: 1.5rem;
}

.care__faq dt {
  font-weight: 500;
}

.care__faq dd {
  margin: 0.4rem 0 0;
  color: var(--color-ink-soft);
  font-size: 0.95rem;
}

.care__cta {
  margin-top: 4rem;
  padding: 2.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.care__cta p {
  font-family: var(--font-heading);
  font-size: 1.25rem;
}
</style>
