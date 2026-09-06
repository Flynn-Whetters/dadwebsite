Drop piece photos here, named to match the `image`/`gallery` paths in
`src/data/pieces.js` (e.g. `042-main.jpg`, `042-detail.jpg`).

Until a photo exists, the site shows a "Photo coming soon" placeholder automatically —
nothing breaks.

## Optional but recommended

After adding photos, run:

    npm run images

That generates resized AVIF/WebP/JPEG versions alongside each original and records them
in `src/data/imageManifest.json`, so visitors download a photo sized for their screen
instead of the full-size file. Commit the generated files along with the originals.

Other photo locations:

- `/public/images/maker-portrait.jpg` — the About section
- `/public/images/workshop/` — the "In the workshop" strip on the home page
- `/public/images/og-cover.jpg` — the preview image shown when the site is shared
