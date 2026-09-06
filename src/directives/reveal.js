const observers = new WeakMap()

export default {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (typeof binding.value === 'number') {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal--in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(el)
    observers.set(el, observer)
  },

  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
