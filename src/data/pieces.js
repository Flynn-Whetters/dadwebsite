export const categoryLabels = {
  board: 'Serving boards',
  'cutting-board': 'Cutting boards',
  spoon: 'Spoons & utensils',
  other: 'Larger pieces',
}

// Each piece lives in its own file under /content/pieces, edited either by hand or
// through the /admin content editor (see public/admin/config.yml). Adding a new piece
// there — a new file, or a new CMS entry — is all it takes; nothing here needs updating.
const files = import.meta.glob('../../content/pieces/*.json', { eager: true })

export const pieces = Object.values(files)
  .map((mod) => mod.default ?? mod)
  .map((data) => {
    const extraPhotos = (data.gallery ?? [])
      .map((item) => (typeof item === 'string' ? item : item?.src))
      .filter(Boolean)

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      species: data.species,
      dimensions: data.dimensions,
      story: data.story,
      image: data.image,
      gallery: [data.image, ...extraPhotos.filter((src) => src !== data.image)],
      available: data.available ?? true,
    }
  })
  .sort((a, b) => Number(b.id) - Number(a.id))
