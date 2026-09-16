"""Create web thumbnails and static, no-JavaScript-compatible gallery markup."""
from pathlib import Path
from PIL import Image, ImageOps
import re

root = Path(__file__).resolve().parents[1]
photos = [
    (26, 'Żaluzje w narożnym oknie', 'Brązowe żaluzje poziome w narożnym oknie nad blatem'),
    (16, 'Rolety rzymskie', 'Dwie jasne rolety rzymskie w oknie kuchennym'),
    (19, 'Rolety dzień–noc', 'Jasne rolety dzień–noc na dwuskrzydłowym oknie'),
    (5, 'Żaluzje poziome', 'Jasne żaluzje z szerokimi lamelami w nasłonecznionym oknie'),
    (11, 'Plisy w kuchni', 'Ciemne plisy zasłaniające dolną część okna nad zlewem'),
    (24, 'Osłony drzwi tarasowych', 'Przeszklenie tarasowe z plisami i moskitierą'),
    (0, 'Żaluzje — detal', 'Jasne lamele żaluzji na ekspozycji'),
    (1, 'Żaluzje w ciepłym odcieniu', 'Żaluzja z lamelami w odcieniu drewna na ekspozycji'),
    (2, 'Żaluzje w ramie okna', 'Szara żaluzja pozioma zamontowana w ciemnej ramie'),
    (3, 'Światło pod kontrolą', 'Jasne żaluzje w głębokiej wnęce okiennej'),
    (4, 'Żaluzje w oknie', 'Poziome żaluzje rozpraszające światło w pomieszczeniu'),
    (6, 'Dzień–noc w ciemnej ramie', 'Pasy rolet dzień–noc na oknie z ciemnymi ramami'),
    (7, 'Dzień–noc w jasnej ramie', 'Rolety dzień–noc na białym oknie nad grzejnikiem'),
    (9, 'Osłony dużych przeszkleń', 'Ciemne osłony na dużym dwuskrzydłowym przeszkleniu'),
    (12, 'Żaluzje pionowe', 'Białe pionowe lamele przy szerokim oknie'),
    (14, 'Verticale — detal', 'Jasne żaluzje pionowe osłaniające przeszklenie'),
    (15, 'Roleta rzymska — detal', 'Jasna roleta rzymska z poziomymi fałdami tkaniny'),
    (20, 'Plisy na poddaszu', 'Jasna plisa dopasowana do okna dachowego'),
    (21, 'Plisy w oknie dachowym', 'Ciemna plisa częściowo zasłaniająca okno dachowe'),
    (22, 'Moskitiera okienna', 'Moskitiera w szarej ramie widziana od zewnątrz'),
    (23, 'Moskitiera — detal', 'Zbliżenie siatki i ramy moskitiery'),
    (25, 'Plisy przy tarasie', 'Jasne plisy w wysokich drzwiach tarasowych'),
]
thumbs = root / 'images/realizacje/thumbs'
thumbs.mkdir(exist_ok=True)
figures = []
for number, caption, alt in photos:
    with Image.open(root / f'images/realizacje/image{number}.jpeg') as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        photo.thumbnail((800, 1000))
        photo.save(thumbs / f'image{number}.webp', 'WEBP', quality=82)
        width, height = photo.size
    figures.append(f'''          <figure class="gallery-photo">
            <a class="gallery-open" href="/images/realizacje/image{number}.jpeg" aria-label="Powiększ: {caption}">
              <img src="/images/realizacje/thumbs/image{number}.webp" alt="{alt}" width="{width}" height="{height}" loading="lazy" decoding="async" />
              <span class="gallery-zoom" aria-hidden="true">Powiększ ↗</span>
            </a>
            <figcaption>{caption}</figcaption>
          </figure>''')
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
html = re.sub(r'(<div class="gallery-grid" id="gallery">).*?(\n        </div>)', lambda m: m[1] + '\n' + '\n'.join(figures) + m[2], html, flags=re.S)
html = html.replace('Zdjęcia naszych realizacji nie zostały jeszcze dodane. Poniżej\n            pozostawiamy miejsce na prawdziwe fotografie.', 'Zobacz, jak osłony okienne wyglądają z bliska — od detali tkanin\n            po gotowe wnętrza. Rolety, żaluzje, plisy i moskitiery.')
page.write_text(html, encoding='utf-8')
print(f'Prepared {len(figures)} photographs.')
