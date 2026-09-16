"""Render the catalogue with typography only, without photos or decorative symbols."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
labels = {'rolety': 'Rolety', 'plisy': 'Plisy i żaluzje', 'moskitiery': 'Moskitiery'}
index = 0
def card(match):
    global index
    category, content = match.groups()
    body = re.search(r'<div class="product-body">(.*?)</div>', content, re.S)[1]
    body = re.sub(r'<span class="product-family">.*?</span>', '', body, flags=re.S)
    index += 1
    return f'''<article class="product-card" data-category="{category}">
            <div class="product-body"><span class="product-family">{labels[category]}</span>{body}</div>
          </article>'''
html = re.sub(r'<article class="product-card" data-category="([^"]+)">(.*?)</article>', card, html, flags=re.S)
assert index == 13, f'Expected 13 products, got {index}'
html = html.replace('Poznaj osłony z bliska', 'Dopasowane do Twoich okien')
page.write_text(html, encoding='utf-8')
print('Rendered 13 photo-free catalogue entries.')
