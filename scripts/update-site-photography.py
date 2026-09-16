"""Apply the selected customer photographs to the static site's image slots."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
html = html.replace('href="/images/interior.webp"', 'href="/images/realizacje/image5.jpeg"').replace('href="/images/realizacje/thumbs/image5.webp"', 'href="/images/realizacje/image5.jpeg"')
for section, number, alt, caption, width, height in [
    ('hero', 5, 'Jasne żaluzje w drewnianym oknie, z widokiem na zieleń i taras', 'Żaluzje · naturalne światło', 480, 640),
    ('inspiration', 26, 'Żaluzje dopasowane do narożnego okna w drewnianych ramach', 'Żaluzje w narożnym oknie', 640, 480),
]:
    loading = 'fetchpriority="high"' if section == 'hero' else 'loading="lazy"'
    src = f'/images/realizacje/image{number}.jpeg' if section == 'hero' else f'/images/realizacje/thumbs/image{number}.webp'
    figure = f'''<figure class="{section}-visual">
          <img src="{src}"
            alt="{alt}" width="{width}" height="{height}" {loading} decoding="async" />
          <figcaption><span>Nasza realizacja</span><span>{caption}</span></figcaption>
        </figure>'''
    html = re.sub(rf'<figure class="{section}-visual">.*?</figure>', lambda m: figure, html, flags=re.S)
html = html.replace('Poziome lamele, naturalne światło i spokojne materiały. Jedna z\n            inspiracji do rozmowy o Twoich osłonach.', 'Dopasowane żaluzje podkreślają narożne przeszklenie i pozwalają\n            regulować światło przez cały dzień. Zobacz jedną z naszych realizacji.')
html = html.replace('Ilustracje poglądowe produktów', 'Poznaj osłony z bliska')
page.write_text(html, encoding='utf-8')
print('Updated hero and inspiration photographs.')
