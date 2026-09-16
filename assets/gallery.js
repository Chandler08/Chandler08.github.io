const grid = document.querySelector('#gallery');
const figures = [...grid.querySelectorAll('figure')];
const links = figures.map(figure => figure.querySelector('a'));
const batch = 6;
let visible = batch;
const more = document.createElement('button');
more.className = 'gallery-more';
more.type = 'button';
more.setAttribute('aria-controls', 'gallery');
const status = document.createElement('p');
status.className = 'gallery-count';
status.setAttribute('role', 'status');
const controls = document.createElement('div');
controls.className = 'gallery-controls';
controls.append(status, more);
grid.after(controls);
function update() {
  figures.forEach((figure, index) => { figure.hidden = index >= visible; });
  status.textContent = `${Math.min(visible, figures.length)} z ${figures.length} zdjęć`;
  more.textContent = `Pokaż więcej zdjęć (+${Math.min(batch, figures.length - visible)})`;
  more.hidden = visible >= figures.length;
}
more.addEventListener('click', () => {
  const next = visible;
  visible += batch;
  update();
  links[next]?.focus({ preventScroll: true });
});
update();

const dialog = document.createElement('dialog');
dialog.className = 'gallery-dialog';
dialog.setAttribute('aria-label', 'Podgląd zdjęć realizacji');
dialog.innerHTML = `<div class="gallery-viewer">
  <div class="gallery-toolbar"><span class="gallery-position" aria-live="polite"></span><button type="button" class="gallery-close" autofocus aria-label="Zamknij podgląd">Zamknij ×</button></div>
  <div class="gallery-stage"><img class="gallery-full" alt="" /><p class="gallery-error" role="status" hidden>Nie udało się wczytać zdjęcia. <a>Otwórz oryginał</a></p></div>
  <div class="gallery-bottom"><button type="button" class="gallery-prev" aria-label="Poprzednie zdjęcie">←</button><p id="gallery-caption"></p><button type="button" class="gallery-next" aria-label="Następne zdjęcie">→</button></div>
</div>`;
document.body.append(dialog);
const photo = dialog.querySelector('.gallery-full');
const error = dialog.querySelector('.gallery-error');
let current = 0;
let opener;
function show(index) {
  current = (index + links.length) % links.length;
  const link = links[current];
  error.hidden = true;
  photo.hidden = false;
  photo.alt = link.querySelector('img').alt;
  photo.src = link.href;
  error.querySelector('a').href = link.href;
  dialog.querySelector('#gallery-caption').textContent = figures[current].querySelector('figcaption').textContent;
  dialog.querySelector('.gallery-position').textContent = `${current + 1} / ${links.length}`;
}
photo.addEventListener('error', () => { photo.hidden = true; error.hidden = false; });
links.forEach((link, index) => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  opener = link;
  show(index);
  dialog.showModal();
  document.documentElement.classList.add('gallery-modal-open');
}));
dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    show(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('gallery-modal-open');
  opener?.focus({ preventScroll: true });
});
