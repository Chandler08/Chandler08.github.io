
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("hide");
  setTimeout(() => {
    popup.style.display = "none";
    // Zapisz w localStorage, że popup został zamknięty
    localStorage.setItem('popupClosed', 'true');
  }, 400);
}

document.addEventListener('DOMContentLoaded', function() {
  // Sprawdź czy popup nie był już zamknięty
  if (!localStorage.getItem('popupClosed')) {
    document.getElementById("popup").style.display = "flex";
    initDots();
  }
});

let currentIndex = 0;
const images = document.querySelectorAll('#slider-images img');
const dotsContainer = document.getElementById('dots-container');

function initDots() {
  images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  updateDots();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

// Automatyczne przewijanie co 5 sekund
let slideInterval = setInterval(nextImage, 5000);

// Zatrzymaj automatyczne przewijanie gdy użytkownik interaguje
document.querySelectorAll('.arrow, .dot').forEach(element => {
  element.addEventListener('click', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextImage, 5000);
  });
});
