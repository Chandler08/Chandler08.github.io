"""Create portable outlined SVG wordmarks from the site's licensed Manrope font."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

root = Path(__file__).resolve().parents[1]
font = TTFont(next((root / 'assets').glob('manrope-latin-500-*.woff')))
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm

def lettering(text, x, baseline, size, tracking=0):
    scale = size / units
    paths = []
    for char in text:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        paths.append(f'<path d="{pen.getCommands()}"/>')
        x += glyphs[name].width * scale + tracking
    return ''.join(paths)

mark = '<path d="M8 64V12h38v52M8 12h38M8 23h38M8 34h38M8 45h25M8 56h14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"/>'
letters = lettering('atelier', 65, 46, 42, -1.2) + lettering('ROLET', 68, 65, 10.5, 5.2)
dest = root / 'images/brand'
dest.mkdir(exist_ok=True)
for name, color in [('atelier-rolet', '#77613c'), ('atelier-rolet-light', '#faf9f6')]:
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 80" role="img" aria-labelledby="title"><title id="title">Atelier Rolet</title><g color="{color}" fill="{color}">{mark}{letters}</g></svg>'
    (dest / f'{name}.svg').write_text(svg, encoding='utf-8')
(dest / 'atelier-rolet-symbol.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 76" color="#77613c">{mark}</svg>', encoding='utf-8')
(root / 'favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 76"><rect width="76" height="76" rx="12" fill="#77613c"/><g transform="translate(11 0)" color="#faf9f6">{mark}</g></svg>', encoding='utf-8')
print('Created primary, reversed, symbol and favicon SVGs.')
