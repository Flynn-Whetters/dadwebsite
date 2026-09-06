<script setup>
import ResponsiveImage from './ResponsiveImage.vue'

const portraitSrc = '/images/maker-portrait.jpg'

const stats = [
  { value: '8+', label: 'years making' },
  { value: '200+', label: 'pieces made' },
  { value: '100%', label: 'local & salvaged timber' },
]
</script>

<template>
  <section id="about" class="section about">
    <div class="wrap about__row">
      <div v-reveal class="about__image">
        <ResponsiveImage
          :src="portraitSrc"
          alt="The maker in the workshop"
          sizes="(max-width: 860px) 88vw, 35vw"
        />
      </div>

      <div v-reveal="120" class="about__copy">
        <p class="eyebrow">About</p>
        <h2 class="section-heading">Made by hand, in Warrandyte</h2>
        <p class="about__text">
          I started making boards and spoons as a way to use timber that would otherwise
          go to waste — fallen trees, offcuts, storm damage. What began as a hobby in the
          shed has turned into a small, steady practice of taking wood with a bit of
          history and giving it a second life on someone's kitchen table.
        </p>
        <p class="about__text">
          Every piece is cut, shaped, sanded and oiled by hand. Nothing is mass produced,
          and nothing leaves the workshop looking like anything else.
        </p>

        <dl class="about__stats">
          <div v-for="stat in stats" :key="stat.label" class="about__stat">
            <dt class="about__stat-value">{{ stat.value }}</dt>
            <dd class="about__stat-label">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__row {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 3rem;
  align-items: center;
}

.about__image {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #e3ddc9;
}

.about__text {
  margin-top: 1.25rem;
  color: var(--color-ink-soft);
  max-width: 34rem;
}

.about__text:first-of-type {
  margin-top: 1rem;
}

.about__stats {
  margin-top: 2rem;
  display: flex;
  gap: 2.5rem;
}

.about__stat-value {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-clay);
}

.about__stat-label {
  margin-top: 0.25rem;
  margin-inline-start: 0;
  font-size: 0.82rem;
  color: var(--color-ink-soft);
}

@media (max-width: 860px) {
  .about__row {
    grid-template-columns: 1fr;
  }

  .about__image {
    max-width: 22rem;
    margin-inline: auto;
  }
}
</style>
