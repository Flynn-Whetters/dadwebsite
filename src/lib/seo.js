import { pieces, categoryLabels } from '../data/pieces.js'
import { SITE_NAME, SITE_URL } from './site.js'

export { SITE_NAME, SITE_URL }

const DEFAULT_DESCRIPTION =
  'Handmade cheese boards, cutting boards and spoons from local and salvaged timber, made by hand in Warrandyte, Victoria.'

function setTag(selector, create, content) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = create()
    document.head.appendChild(element)
  }
  element.setAttribute(element.tagName === 'LINK' ? 'href' : 'content', content)
}

function metaFor(route) {
  if (route.name === 'piece') {
    const piece = pieces.find((item) => item.id === route.params.id)
    if (piece) {
      return {
        title: `${piece.title} — No. ${piece.id}`,
        description: `${piece.title} in ${piece.species}, ${piece.dimensions}. ${piece.story}`,
        image: piece.image,
      }
    }
  }

  if (route.name === 'collection') {
    const types = [...new Set(pieces.map((piece) => categoryLabels[piece.category]))]
      .filter(Boolean)
      .join(', ')
      .toLowerCase()
    return {
      title: 'The collection',
      description: `Every piece made so far — ${types} — in Australian native and salvaged timber.`,
    }
  }

  if (route.name === 'care') {
    return {
      title: 'Looking after your board',
      description:
        'How to wash, dry and re-oil a handmade timber board so it lasts for decades.',
    }
  }

  return { title: null, description: DEFAULT_DESCRIPTION }
}

export function applyRouteMeta(route) {
  const { title, description, image } = metaFor(route)
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Handmade timber pieces`
  const url = `${SITE_URL}${route.fullPath === '/' ? '' : route.path}`

  document.title = fullTitle

  setTag('meta[name="description"]', () => createMeta('name', 'description'), description)
  setTag('meta[property="og:title"]', () => createMeta('property', 'og:title'), fullTitle)
  setTag(
    'meta[property="og:description"]',
    () => createMeta('property', 'og:description'),
    description,
  )
  setTag('meta[property="og:url"]', () => createMeta('property', 'og:url'), url)
  setTag('meta[name="twitter:title"]', () => createMeta('name', 'twitter:title'), fullTitle)
  setTag(
    'meta[name="twitter:description"]',
    () => createMeta('name', 'twitter:description'),
    description,
  )
  setTag('link[rel="canonical"]', () => createLink('canonical'), url)

  if (image) {
    const absolute = `${SITE_URL}${image}`
    setTag('meta[property="og:image"]', () => createMeta('property', 'og:image'), absolute)
    setTag('meta[name="twitter:image"]', () => createMeta('name', 'twitter:image'), absolute)
  }
}

function createMeta(attribute, value) {
  const element = document.createElement('meta')
  element.setAttribute(attribute, value)
  return element
}

function createLink(rel) {
  const element = document.createElement('link')
  element.setAttribute('rel', rel)
  return element
}
