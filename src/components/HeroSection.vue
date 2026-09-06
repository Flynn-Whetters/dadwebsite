<script setup>
import HeroRings from './HeroRings.vue'
</script>

<template>
  <section id="top" class="hero">
    <div class="wrap hero__row">
      <div class="hero__copy">
        <p class="eyebrow">Warrandyte, VIC</p>
        <h1 class="hero__headline">
          Handmade boards, spoons and small furniture from timber that already had a life.
        </h1>
        <p class="hero__intro">
          I mill and carve local and salvaged wood into cheese boards, cutting boards,
          spoons and the occasional bigger piece. Every board is one of a kind — no two
          grain patterns are the same, and none of it comes from a factory.
        </p>
        <div class="hero__actions">
          <a href="#collection" class="btn btn-primary">Browse the collection</a>
          <a href="#inquire" class="btn btn-secondary">Commission a piece</a>
        </div>
      </div>

      <div class="hero__visual">
        <HeroRings />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(3rem, 2rem + 4vw, 6rem) var(--section-gap);
}

.hero__row {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
}

.hero__headline {
  margin-top: 1rem;
  font-size: clamp(2.25rem, 1.6rem + 3vw, 3.75rem);
  max-width: 22ch;
}

.hero__intro {
  margin-top: 1.5rem;
  max-width: 34rem;
  color: var(--color-ink-soft);
  font-size: 1.05rem;
}

.hero__actions {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero__visual {
  display: grid;
  place-items: center;
}

@media (max-width: 860px) {
  .hero__row {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    max-width: 16rem;
    margin-inline: auto;
  }
}
</style>
