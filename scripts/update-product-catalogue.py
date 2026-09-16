"""Render the catalogue with small vector symbols and typography, never photos."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
symbols = [
    'M12 10h40v8H12z M16 18v38h32V18 M16 40h32 M55 18v30',
    'M14 10h36v48H14z M14 20h36M14 26h36M14 36h36M14 42h36M14 52h36',
    'M14 10h36v48H14z M14 30h36l-36 6 36 6-36 6 36 6H14',
    'M14 10h36v48H14z M14 18l36-2M14 26l36-2M14 34l36-2M14 42l36-2M14 50l36-2',
    'M14 10h36v48H14z M14 24q18 7 36 0M14 37q18 7 36 0M14 50q18 7 36 0',
    'M12 8h40v52H12z M17 13h30v42H17z M22 13v42M32 13v42M42 13v42M17 23h30M17 34h30M17 45h30',
    'M12 8h40v52H12z M18 12l26 5v37l-26 4z M37 32v7 M10 19h4M10 49h4',
    'M8 10h48v48H8z M12 14h23v40H12z M35 14h17v40H35 M20 34h25m-5-5 5 5-5 5',
    'M12 10h40v8H12z M16 18v40m32-40v40 M16 40h32 M21 23v12m11-12v12m11-12v12 M27 51l5-5 5 5m-5-5v12',
    'M10 10h44v48H10z M15 14l5 40 5-40 5 40 5-40v40 M42 32h7m-3-3 3 3-3 3',
    'M24 9h29L40 58H11z M23 17h27M20 28h27M17 39h27M14 50h27',
    'M12 11h40 M16 11v39h32V11 M16 45h32 M54 13v34m-2 0h4',
    'M10 10h44 M14 14v43l7-3V14m5 0v43l7-3V14m5 0v43l7-3V14m5 0v43',
]
labels = {'rolety': 'Rolety', 'plisy': 'Plisy i żaluzje', 'moskitiery': 'Moskitiery'}
index = 0
def card(match):
    global index
    category, content = match.groups()
    body = re.search(r'<div class="product-body">(.*?)</div>', content, re.S)[1]
    body = re.sub(r'<span class="product-family">.*?</span>', '', body, flags=re.S)
    icon = symbols[index]
    index += 1
    return f'''<article class="product-card" data-category="{category}">
            <div class="product-symbol" aria-hidden="true"><svg viewBox="0 0 64 68" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="{icon}" /></svg></div>
            <div class="product-body"><span class="product-family">{labels[category]}</span>{body}</div>
          </article>'''
html = re.sub(r'<article class="product-card" data-category="([^"]+)">(.*?)</article>', card, html, flags=re.S)
assert index == 13, f'Expected 13 products, got {index}'
html = html.replace('Poznaj osłony z bliska', 'Dopasowane do Twoich okien')
page.write_text(html, encoding='utf-8')
print('Rendered 13 photo-free catalogue entries.')
