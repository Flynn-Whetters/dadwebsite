<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { pieces } from '../data/pieces.js'

const route = useRoute()

const categoryToInterest = {
  board: 'Cheese/grazing board',
  'cutting-board': 'Cutting board',
  spoon: 'Spoon/utensil set',
  other: 'Something bigger',
}

const fields = reactive({
  name: '',
  email: '',
  interest: '',
  gift: '',
  details: '',
  company: '', // honeypot, left empty by real visitors
})

const touched = reactive({
  name: false,
  email: false,
  interest: false,
})

const status = ref('idle') // idle | submitting | success | error

// Arriving from a piece page (?piece=042) pre-fills what they're asking about.
watchEffect(() => {
  const piece = pieces.find((item) => item.id === route.query.piece)
  if (!piece) return
  fields.interest = categoryToInterest[piece.category] ?? 'Not sure'
  fields.details = `I'm interested in No. ${piece.id} — ${piece.title} (${piece.species}).\n\n`
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValid(field) {
  if (field === 'name') return fields.name.trim().length > 0
  if (field === 'email') return emailPattern.test(fields.email)
  if (field === 'interest') return fields.interest !== ''
  return true
}

function fieldState(field) {
  if (!touched[field]) return null
  return isValid(field) ? 'valid' : 'invalid'
}

function encodeForm(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

async function handleSubmit() {
  touched.name = true
  touched.email = true
  touched.interest = true

  if (!isValid('name') || !isValid('email') || !isValid('interest')) {
    return
  }

  // Honeypot: bots tend to fill every field, real visitors leave this blank.
  if (fields.company) {
    status.value = 'success'
    return
  }

  status.value = 'submitting'

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForm({ 'form-name': 'inquiry', ...fields }),
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="inquire" class="section inquire">
    <div class="wrap inquire__row">
      <div v-reveal class="inquire__intro">
        <p class="eyebrow">Get in touch</p>
        <h2 class="section-heading">Commission a piece, or ask about a gift</h2>
        <p class="section-intro">
          Tell me a bit about what you're after and I'll get back to you with timing and
          rough pricing. No obligation.
        </p>
      </div>

      <div v-reveal="120" class="inquire__form-wrap">
        <form
          v-if="status !== 'success'"
          name="inquiry"
          method="POST"
          data-netlify="true"
          netlify-honeypot="company"
          class="inquire__form"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="form-name" value="inquiry" />

          <div class="field field--honeypot" aria-hidden="true">
            <label for="company">Company</label>
            <input id="company" v-model="fields.company" type="text" name="company" tabindex="-1" autocomplete="off" />
          </div>

          <div class="field">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="fields.name"
              type="text"
              name="name"
              required
              :class="fieldState('name')"
              :aria-invalid="fieldState('name') === 'invalid'"
              @blur="touched.name = true"
            />
            <p v-if="fieldState('name') === 'invalid'" class="field__error">
              Please enter your name.
            </p>
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="fields.email"
              type="email"
              name="email"
              required
              :class="fieldState('email')"
              :aria-invalid="fieldState('email') === 'invalid'"
              @blur="touched.email = true"
            />
            <p v-if="fieldState('email') === 'invalid'" class="field__error">
              Please enter a valid email address.
            </p>
          </div>

          <div class="field">
            <label for="interest">What are you after?</label>
            <select
              id="interest"
              v-model="fields.interest"
              name="interest"
              required
              :class="fieldState('interest')"
              :aria-invalid="fieldState('interest') === 'invalid'"
              @blur="touched.interest = true"
            >
              <option value="" disabled>Choose one</option>
              <option>Cheese/grazing board</option>
              <option>Cutting board</option>
              <option>Spoon/utensil set</option>
              <option>Something bigger</option>
              <option>Not sure</option>
            </select>
            <p v-if="fieldState('interest') === 'invalid'" class="field__error">
              Please choose an option.
            </p>
          </div>

          <div class="field">
            <label for="gift">Is this a gift?</label>
            <select id="gift" v-model="fields.gift" name="gift">
              <option value="">No</option>
              <option>Yes — needs a note</option>
              <option>Yes — needs to ship by a date</option>
            </select>
          </div>

          <div class="field">
            <label for="details">Details</label>
            <textarea
              id="details"
              v-model="fields.details"
              name="details"
              rows="4"
              placeholder="Size, wood preference, timing — whatever's useful."
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="status === 'submitting'">
            {{ status === 'submitting' ? 'Sending…' : 'Send inquiry' }}
          </button>

          <p v-if="status === 'error'" class="inquire__status inquire__status--error">
            Something went wrong sending that — mind trying again in a moment?
          </p>
        </form>

        <div v-else class="inquire__success">
          <h3>Thanks — I'll get back to you soon.</h3>
          <p>Usually within a couple of days.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inquire__row {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 3rem;
}

.inquire__form-wrap {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}

.inquire__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field--honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 500;
}

.field input,
.field select,
.field textarea {
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-ink);
}

.field input.valid,
.field select.valid {
  border-color: var(--color-sage);
}

.field input.invalid,
.field select.invalid {
  border-color: #b5533f;
}

.field__error {
  font-size: 0.8rem;
  color: #b5533f;
}

.inquire__status--error {
  font-size: 0.85rem;
  color: #b5533f;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.inquire__success {
  padding: 2rem 0;
}

.inquire__success h3 {
  font-size: 1.3rem;
}

.inquire__success p {
  margin-top: 0.5rem;
  color: var(--color-ink-soft);
}

@media (max-width: 860px) {
  .inquire__row {
    grid-template-columns: 1fr;
  }
}
</style>
