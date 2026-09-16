# Atelier Rolet

Public Polish-language brand site for window coverings in Radom and nearby areas.

Preserve the established Manrope / DM Sans typography and warm, quiet palette:
canvas `#faf9f6`, ink `#292e29`, muted `#606357`, linen `#e9e4da`, accent `#77613c`.
Existing tokens are defined in the original stylesheet in `assets/`.

The new identity uses an open window frame with progressively shorter horizontal
slats, suggesting a raised blind and incoming light. The Manrope wordmark is
outlined in SVG, requiring no installed font. Primary and reversed variants and
the standalone symbol are in `images/brand/`; keep the supplied font licenses.

The gallery contains all 22 supplied photographs, including product details and
display samples. Avoid invented customer names, locations or installation dates.
Six photos are initially visible, followed by batches of six. Without JavaScript
all photos remain accessible as links to the originals. Thumbnails are WebP;
original JPEG files are preserved. The native modal supports keyboard arrows,
Escape, focus restoration and mobile controls. Reduced motion is respected.

This repository is a static published-site layout. New editable behavior and
styles live in `assets/gallery.js` and `assets/atelier.css`; gallery HTML is in
`index.html`. `scripts/prepare-gallery.py` regenerates thumbnails and gallery
markup (Pillow). `scripts/prepare-logo.py` rebuilds SVGs (fontTools).
The desktop `atelierolet` source project was consulted but not modified.
Future full Vite builds must carry these additions into their source inputs.
