"""Apply the selected customer photographs to the static site's image slots."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
html = html.replace('href="/images/interior.webp"', 'href="/images/realizacje/thumbs/image5.webp"')
for section, number, alt, caption, width, height in [
    ('hero', 5, 'Jasne żaluzje w drewnianym oknie, z widokiem na zieleń i taras', 'Żaluzje · naturalne światło', 480, 640),
    ('inspiration', 26, 'Żaluzje dopasowane do narożnego okna w drewnianych ramach', 'Żaluzje w narożnym oknie', 640, 480),
]:
    loading = 'fetchpriority="high"' if section == 'hero' else 'loading="lazy"'
    figure = f'''<figure class="{section}-visual">
          <img src="/images/realizacje/thumbs/image{number}.webp"
            alt="{alt}" width="{width}" height="{height}" {loading} decoding="async" />
          <figcaption><span>Nasza realizacja</span><span>{caption}</span></figcaption>
        </figure>'''
    html = re.sub(rf'<figure class="{section}-visual">.*?</figure>', lambda m: figure, html, flags=re.S)
html = html.replace('Poziome lamele, naturalne światło i spokojne materiały. Jedna z\n            inspiracji do rozmowy o Twoich osłonach.', 'Dopasowane żaluzje podkreślają narożne przeszklenie i pozwalają\n            regulować światło przez cały dzień. Zobacz jedną z naszych realizacji.')
html = html.replace('Ilustracje poglądowe produktów', 'Poznaj osłony z bliska')
products = [
    ('cassette', 7, 'Rolety dzień–noc w białych kasetach przy ramach okna'),
    ('daynight', 19, 'Jasne pasy rolet dzień–noc na dwuskrzydłowym oknie'),
    ('pleat', 11, 'Plisy osłaniające dolną część kuchennego okna'),
    ('venetian', 0, 'Jasne poziome lamele żaluzji — detal produktu'),
    ('roman', 15, 'Jasna roleta rzymska z miękkimi poziomymi fałdami'),
    ('screen', 22, 'Moskitiera okienna dopasowana do szarej ramy'),
    ('roof', 20, 'Plisowana osłona dopasowana do okna dachowego'),
    ('standard', None, 'Wizualizacja poglądowa: standardowa roleta z gładkiej tkaniny'),
    ('vertical', 12, 'Białe pionowe pasy żaluzji verticale przy oknie'),
]
for kind, number, alt in products:
    src = f'/images/realizacje/thumbs/image{number}.webp' if number is not None else '/images/products/roleta-standardowa.webp'
    badge = '<span class="product-photo-note">Wizualizacja poglądowa AI</span>' if number is None else ''
    from PIL import Image
    image_path = root / src.lstrip('/')
    width, height = Image.open(image_path).size if image_path.exists() else (1024, 1280)
    markup = f'''<div class="product-photo photo-{kind}">
              <img src="{src}" alt="{alt}" width="{width}" height="{height}" loading="lazy" decoding="async" />
              {badge}
            </div>'''
    html = re.sub(rf'<div class="product-art art-{kind}" aria-hidden="true">.*?</div>\s*</div>', lambda m: markup, html, flags=re.S)
    html = re.sub(rf'<div class="product-photo photo-{kind}">.*?</div>', lambda m: markup, html, flags=re.S)
page.write_text(html, encoding='utf-8')
print('Updated hero, inspiration and nine product photographs.')
