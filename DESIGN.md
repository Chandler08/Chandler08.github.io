# Atelier Rolet

Public Polish-language brand site for window coverings in Radom and nearby areas.

Preserve the established Manrope / DM Sans typography and warm, quiet palette:
canvas `#faf9f6`, ink `#332e28`, muted `#6a6054`, linen `#e9e4da`, accent `#77613c`, line `#ddd5c8`.
The warm palette overrides the original tokens in `assets/atelier.css`.
Use brown and beige undertones throughout, including contact, footer, buttons
and gallery overlays. The primary logo and favicon share the bronze accent
`#77613c`; avoid green-tinted charcoal in brand assets and interface surfaces.

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

## Site photography and catalogue

The hero uses original customer JPEG 5, with its full portrait frame and a
maximum rendered width of 480 CSS pixels. Its EXIF-oriented dimensions are
480 ? 640; never crop or stretch it into the former large square hero.
Inspiration uses customer photo 26 in a full 4:3 frame beside the section copy.
All 22 original photographs remain in the gallery.

Products intentionally contain no photographs or decorative symbols. Thirteen warm beige catalogue
panels combine a family label, product name,
description and enquiry link. Use two columns on desktop and one on mobile.
Preserve filters and the five mosquito-screen variants: ramkowe, drzwiowe,
przesuwne, rolowane, plisowane. Each enquiry names the corresponding variant.

`scripts/update-product-catalogue.py` maintains the photo-free presentation.
`scripts/update-mosquito-screens.py` rebuilds variants then applies that style.
`scripts/update-site-photography.py` only updates hero and inspiration.
Old product photo files are retained as unused assets, not shown in the catalogue.
