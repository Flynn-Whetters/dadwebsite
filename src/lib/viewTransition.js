import { nextTick, ref } from 'vue'

// The piece whose photo should morph between the grid tile and the detail hero.
export const morphingPieceId = ref(null)

export const MORPH_NAME = 'piece-photo'

export function supportsViewTransitions() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Called synchronously from the tile's click handler, before navigation starts, so the
// outgoing snapshot is guaranteed to have the name applied. Vue owns the name on the
// destination via `morphingPieceId`; the source element is unmounting either way.
export function startPieceMorph(element, pieceId) {
  if (!supportsViewTransitions()) return
  morphingPieceId.value = pieceId
  if (element) element.style.viewTransitionName = MORPH_NAME
}

// Cap on how long navigation can ever be held up waiting on the transition to start.
// Without this, any hiccup in the browser's view-transition machinery (or a race with
// Vue's own render timing) blocks the entire route change instead of just skipping
// the animation.
const START_TIMEOUT_MS = 150

export function installViewTransitions(router) {
  router.beforeResolve((to, from) => {
    if (!from.name || !supportsViewTransitions()) {
      morphingPieceId.value = null
      return true
    }

    return new Promise((resolve) => {
      let settled = false
      const proceed = () => {
        if (settled) return
        settled = true
        resolve(true)
      }
      const releaseMorph = () => {
        morphingPieceId.value = null
      }

      const timeout = setTimeout(proceed, START_TIMEOUT_MS)

      try {
        const transition = document.startViewTransition(() => {
          clearTimeout(timeout)
          proceed()
          return nextTick()
        })
        transition.finished.then(releaseMorph, releaseMorph)
      } catch {
        clearTimeout(timeout)
        proceed()
        releaseMorph()
      }
    })
  })
}
