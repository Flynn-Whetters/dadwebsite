// Writes dist/sitemap.xml from the routes and content/pieces, so adding a piece there
// (by hand or through /admin) is enough to get it listed. Runs after `npm run build`.
//
// Reads content/pieces directly rather than importing src/data/pieces.js, since that
// module relies on Vite's import.meta.glob and this script runs under plain Node.

import { writeFile, readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/lib/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const pieceFiles = await readdir(join(root, 'content', 'pieces'))
const pieceIds = await Promise.all(
  pieceFiles
    .filter((file) => file.endsWith('.json'))
    .map(async (file) => JSON.parse(await readFile(join(root, 'content', 'pieces', file), 'utf8')).id),
)

const paths = ['/', '/collection', '/care', ...pieceIds.map((id) => `/pieces/${id}`)]
const today = new Date().toISOString().slice(0, 10)

const urls = paths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' || path === '/collection' ? 'weekly' : 'monthly'}</changefreq>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await writeFile(join(root, 'dist', 'sitemap.xml'), sitemap)
console.log(`Wrote dist/sitemap.xml with ${paths.length} URLs`)
