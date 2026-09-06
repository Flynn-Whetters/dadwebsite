// Turns full-size photos dropped into /public/images into responsive AVIF/WebP/JPEG
// variants plus a blur-up placeholder, and records them in src/data/imageManifest.json.
//
// Usage: npm run images
//
// Drop a photo in (e.g. public/images/pieces/042-main.jpg), run this, commit the result.
// The site works without running it — it just serves the original file instead.

import { readdir, writeFile, mkdir } from 'node:fs/promises'
import { join, relative, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')
const manifestPath = join(root, 'src', 'data', 'imageManifest.json')

const WIDTHS = [480, 768, 1200, 1800]
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])
// Generated files carry a -<width> suffix; skip them so reruns don't compound.
const GENERATED = /-\d+\.(avif|webp|jpg|jpeg|png)$/i

async function collectSources(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }

  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectSources(full)))
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase()) && !GENERATED.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function buildVariants(file) {
  const image = sharp(file)
  const { width, height } = await image.metadata()

  const dir = dirname(file)
  const name = basename(file, extname(file))
  const publicPath = (p) => '/' + relative(join(root, 'public'), p).split(/[\\/]/).join('/')

  const widths = WIDTHS.filter((w) => w <= width)
  if (widths.length === 0) widths.push(width)

  const variants = { avif: [], webp: [], jpeg: [] }

  for (const w of widths) {
    const resized = sharp(file).resize({ width: w, withoutEnlargement: true })

    const targets = [
      { format: 'avif', ext: 'avif', options: { quality: 55 } },
      { format: 'webp', ext: 'webp', options: { quality: 72 } },
      { format: 'jpeg', ext: 'jpg', options: { quality: 78, mozjpeg: true } },
    ]

    for (const target of targets) {
      const out = join(dir, `${name}-${w}.${target.ext}`)
      await resized.clone().toFormat(target.format, target.options).toFile(out)
      variants[target.format].push({ w, src: publicPath(out) })
    }
  }

  // Tiny blurred stand-in, inlined as a data URI so it paints with the HTML.
  const placeholderBuffer = await sharp(file)
    .resize({ width: 20 })
    .blur(1.4)
    .webp({ quality: 40 })
    .toBuffer()

  return {
    key: publicPath(file),
    entry: {
      width,
      height,
      placeholder: `data:image/webp;base64,${placeholderBuffer.toString('base64')}`,
      variants,
    },
  }
}

const sources = await collectSources(imagesDir)

if (sources.length === 0) {
  console.log('No source images found in public/images — nothing to do.')
}

const manifest = {}
for (const file of sources) {
  const { key, entry } = await buildVariants(file)
  manifest[key] = entry
  console.log(`optimized ${key} (${entry.variants.jpeg.length} sizes)`)
}

await mkdir(dirname(manifestPath), { recursive: true })
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\nWrote ${Object.keys(manifest).length} entries to src/data/imageManifest.json`)
