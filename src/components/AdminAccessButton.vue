<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'

// A quick memorable gate so the admin link isn't just sitting in the nav for anyone to
// click — not real security. The actual protection is Netlify Identity: this only gets
// as far as /admin, where a real login is still required before anything can be saved.
const PIN = '1234'

const dialog = useTemplateRef('dialog')
const pinInput = useTemplateRef('pinInput')
const pin = ref('')
const error = ref(false)

async function open() {
  pin.value = ''
  error.value = false
  dialog.value?.showModal()
  await nextTick()
  pinInput.value?.focus()
}

function close() {
  dialog.value?.close()
}

function submit() {
  if (pin.value === PIN) {
    window.location.href = '/admin/'
    return
  }
  error.value = true
  pin.value = ''
  pinInput.value?.focus()
}
</script>

<template>
  <button
    type="button"
    class="admin-btn"
    aria-label="Site admin"
    title="Site admin"
    @click="open"
  >
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>

  <dialog ref="dialog" class="pin-dialog" @click.self="close">
    <form class="pin-form" @submit.prevent="submit">
      <h2 class="pin-form__title">Admin access</h2>
      <p class="pin-form__hint">Enter the PIN to add or update photos.</p>

      <input
        ref="pinInput"
        v-model="pin"
        type="password"
        inputmode="numeric"
        maxlength="4"
        autocomplete="off"
        class="pin-form__input"
        :class="{ 'pin-form__input--error': error }"
        aria-label="PIN"
      />

      <p v-if="error" class="pin-form__error">That's not it — try again.</p>

      <div class="pin-form__actions">
        <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
        <button type="submit" class="btn btn-primary">Continue</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.admin-btn {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-ink-soft);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.admin-btn:hover {
  color: var(--color-ink);
  border-color: var(--color-sage);
}

.admin-btn svg {
  width: 1.1rem;
  height: 1.1rem;
}

.pin-dialog {
  border: none;
  border-radius: var(--radius-lg);
  padding: 0;
  background: var(--color-surface);
  box-shadow: 0 24px 60px -20px rgb(46 58 44 / 45%);
}

.pin-dialog::backdrop {
  background: rgb(46 58 44 / 45%);
  backdrop-filter: blur(2px);
}

.pin-form {
  padding: 2rem;
  display: grid;
  gap: 0.4rem;
  width: min(88vw, 20rem);
}

.pin-form__title {
  font-size: 1.2rem;
}

.pin-form__hint {
  color: var(--color-ink-soft);
  font-size: 0.88rem;
  margin-bottom: 0.75rem;
}

.pin-form__input {
  font-family: var(--font-body);
  font-size: 1.4rem;
  letter-spacing: 0.6rem;
  text-align: center;
  padding: 0.7rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-ink);
}

.pin-form__input--error {
  border-color: #b5533f;
}

.pin-form__error {
  font-size: 0.82rem;
  color: #b5533f;
}

.pin-form__actions {
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
