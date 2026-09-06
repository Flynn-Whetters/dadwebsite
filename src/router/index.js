import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/CollectionView.vue'
import PieceView from '../views/PieceView.vue'
import CareView from '../views/CareView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { installViewTransitions } from '../lib/viewTransition.js'
import { applyRouteMeta } from '../lib/seo.js'

// The whole site is small enough to ship as one bundle, so every view is imported
// eagerly here rather than code-split — that removes the network round-trip a lazy
// `import()` would otherwise add the first time a visitor opens each page.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/collection', name: 'collection', component: CollectionView },
    { path: '/pieces/:id', name: 'piece', component: PieceView, props: true },
    { path: '/care', name: 'care', component: CareView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Offset by the sticky header so anchored sections aren't tucked underneath it.
    if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
    return { top: 0 }
  },
})

installViewTransitions(router)
router.afterEach(applyRouteMeta)

export default router
