"""Maintain the five mosquito-screen product variants in the public catalogue."""
from pathlib import Path
from urllib.parse import quote
import re

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
variants = [
    ('ramkowe', 'Siatka w dopasowanej ramce do okna.', 22,
     'Moskitiera ramkowa w szarej ramie okiennej', False),
    ('drzwiowe', 'Otwierane skrzydło z siatką do drzwi balkonowych i tarasowych.', 24,
     'Moskitiera drzwiowa przy wyjściu na taras', False),
    ('przesuwne', 'Skrzydło z siatką przesuwane w prowadnicach przy dużych przeszkleniach.', 23,
     'Detal siatki moskitiery — zdjęcie materiału, nie mechanizmu przesuwnego', True),
    ('rolowane', 'Siatka zwijana do kasety, gdy nie jest potrzebna.', 23,
     'Detal siatki moskitiery — zdjęcie materiału, nie mechanizmu rolowanego', True),
    ('plisowane', 'Siatka składana w harmonijkę, wygodna przy wyjściu na taras.', 23,
     'Detal siatki moskitiery — zdjęcie materiału, nie mechanizmu plisowanego', True),
]
cards = []
for kind, description, photo, alt, detail in variants:
    badge = '<span class="product-photo-note">Detal siatki · zdjęcie poglądowe</span>' if detail else ''
    cards.append(f'''          <article class="product-card" data-category="moskitiery">
            <div class="product-photo photo-screen-{kind}">
              <img src="/images/realizacje/thumbs/image{photo}.webp" alt="{alt}" width="480" height="640" loading="lazy" decoding="async" />
              {badge}
            </div>
            <div class="product-body">
              <h3>Moskitiery {kind}</h3>
              <p>{description}</p>
              <a class="product-link"
                href="mailto:biuro@ambitoplus.pl?subject={quote('Zapytanie o moskitiery ' + kind)}"
                aria-label="Zapytaj mailowo o moskitiery {kind}">
                Zapytaj o produkt
                <svg class="icon" aria-hidden="true"><use href="#icon-diagonal" /></svg>
              </a>
            </div>
          </article>''')
pattern = r'          <article class="product-card" data-category="moskitiery">.*?</article>'
matches = list(re.finditer(pattern, html, re.S))
assert matches, 'Expected existing mosquito-screen card(s).'
first = matches[0].start()
html = re.sub(pattern, '', html, flags=re.S)
html = html[:first] + '\n'.join(cards) + html[first:]
page.write_text(html, encoding='utf-8')
print('Updated five mosquito-screen variants.')
import runpy
runpy.run_path(str(root / 'scripts/update-product-catalogue.py'))
