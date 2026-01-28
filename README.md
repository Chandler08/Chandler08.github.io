# Ambito Plus - Strona Internetowa

Nowoczesna, profesjonalna strona internetowa dla firmy **Ambito Plus Sp. z o.o.** - hurtowni okuć meblowych.

## 🎨 Charakterystyka projektu

### Styl wizualny
- **Kolory**: Biel + grafit + akcent zielony (#4CAF50)
- **Typografia**: Inter (Google Fonts) - nowoczesny sans-serif
- **Styl**: Industrialny / stolarski / techniczny
- **Design**: Minimalistyczny, przestronny, z animacjami scroll

### Funkcjonalności
- ✅ Responsywna konstrukcja (mobile + desktop)
- ✅ Animacje przy przewijaniu strony
- ✅ Interaktywne menu mobilne
- ✅ Formularz kontaktowy z walidacją
- ✅ Płynne przewijanie do sekcji
- ✅ Animowane liczniki statystyk
- ✅ SEO-friendly struktura HTML5
- ✅ Accessibility (dostępność)

## 📋 Struktura strony

1. **Hero Section** - Nagłówek z hasłem głównym i statystykami
2. **O firmie** - Prezentacja zalet firmy (4 karty)
3. **Oferta** - Kategorie produktów (6 kart)
4. **Dlaczego my** - 5 powodów do współpracy
5. **Opinie** - Testimoniale klientów (3 opinie)
6. **Kontakt** - Formularz + dane kontaktowe + mapa Google
7. **Stopka** - Informacje firmowe i social media

## 🚀 Jak uruchomić

### Metoda 1: Bezpośrednio w przeglądarce
Otwórz plik `index.html` w przeglądarce (podwójne kliknięcie).

### Metoda 2: Lokalny serwer (zalecane)

**Python:**
```bash
# Python 3
python -m http.server 8080

# Następnie otwórz: http://localhost:8080
```

**Node.js (npx):**
```bash
npx serve .

# lub
npx http-server -p 8080
```

**PHP:**
```bash
php -S localhost:8080
```

## 📁 Struktura plików

```
ambito-plus-website/
├── index.html          # Główna strona HTML
├── style.css           # Arkusz stylów CSS
├── script.js           # Skrypty JavaScript
└── README.md           # Ten plik
```

## 🎯 Dane firmy

**Nazwa:** Ambito Plus Sp. z o.o.  
**Adres:** Żwirki i Wigury 13/15, 05-220 Zielonka  
**Telefon:** 504 228 296  
**Godziny:** Pon.–Pt. 08:00–16:00  
**Oceny:** 5.0/5 (29 opinii)

## 🛠 Technologie

- **HTML5** - Semantyczna struktura
- **CSS3** - Custom properties, Grid, Flexbox, animacje
- **Vanilla JavaScript** - Bez zewnętrznych bibliotek
- **Google Fonts** - Inter

## 📱 Responsywność

Strona jest w pełni responsywna i dostosowuje się do:
- 📱 Smartfonów (< 480px)
- 📱 Tabletów (480px - 768px)
- 💻 Laptopów (768px - 1200px)
- 🖥 Dużych ekranów (> 1200px)

## ✨ Kluczowe funkcje CSS

- **Custom Properties** - Łatwa personalizacja kolorów i odstępów
- **CSS Grid & Flexbox** - Nowoczesne układy
- **Smooth Animations** - Płynne przejścia i animacje
- **Gradient Backgrounds** - Nowoczesne tła
- **Hover Effects** - Interaktywne elementy

## 🔧 Personalizacja

### Zmiana kolorów
Edytuj zmienne CSS w pliku `style.css`:

```css
:root {
    --color-primary: #2D5F3F;      /* Główny kolor */
    --color-accent: #4CAF50;        /* Kolor akcentu */
    --color-dark: #1A1A1A;          /* Ciemny */
    /* ... */
}
```

### Zmiana treści
Edytuj plik `index.html` - wszystkie teksty są w czytelnej strukturze HTML.

### Dodanie mapy Google
W sekcji kontakt znajduje się placeholder mapy. Aby dodać prawdziwą mapę:

1. Wejdź na [Google Maps](https://www.google.com/maps)
2. Znajdź adres: Żwirki i Wigury 13/15, 05-220 Zielonka
3. Kliknij "Udostępnij" → "Osadź mapę"
4. Skopiuj kod iframe
5. Zamień istniejący iframe w `index.html`

## 📧 Formularz kontaktowy

Formularz zawiera walidację po stronie klienta. Aby formularz działał:

1. **Opcja 1**: Dodaj backend (PHP, Node.js, Python)
2. **Opcja 2**: Użyj usługi typu Formspree, EmailJS
3. **Opcja 3**: Podłącz do Google Forms

Przykład z EmailJS (dodaj przed `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

## 🎨 Ikony i grafika

Strona używa:
- **SVG Icons** - Wbudowane ikony SVG (skalowalne, lekkie)
- **Gradient Backgrounds** - Zamiast zdjęć dla lepszej wydajności

## ⚡ Wydajność

- Brak zewnętrznych zależności (poza Google Fonts)
- Zoptymalizowane animacje (GPU-accelerated)
- Lazy loading dla mapy
- Debounced scroll events
- Minimalna ilość JavaScript

## 📊 SEO

Strona zawiera:
- ✅ Semantyczne tagi HTML5
- ✅ Meta description
- ✅ Meta keywords
- ✅ Proper heading hierarchy (H1-H4)
- ✅ Alt texts (dla przyszłych obrazów)
- ✅ Structured data ready

## 🔒 Bezpieczeństwo

- Walidacja formularza po stronie klienta
- Brak inline JavaScript
- Przygotowane do HTTPS

## 📝 TODO / Przyszłe ulepszenia

- [ ] Dodać prawdziwą mapę Google (z API key)
- [ ] Podłączyć formularz do backendu
- [ ] Dodać galerię zdjęć produktów
- [ ] Dodać blog/aktualności
- [ ] Dodać wersje językowe (EN)
- [ ] Dodać certyfikaty SSL
- [ ] Integracja z Google Analytics
- [ ] Dodać favicon
- [ ] Dodać Open Graph meta tags

## 📞 Wsparcie

W razie pytań lub problemów:
- Email: [placeholder]
- Telefon: 504 228 296

## 📄 Licencja

© 2026 Ambito Plus Sp. z o.o. Wszelkie prawa zastrzeżone.

---

**Wykonanie:** Antigravity AI  
**Data:** Styczeń 2026  
**Wersja:** 1.0.0
