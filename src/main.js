import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getCardHeight,
  loadMoreBtn,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Глобальні змінні
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadedImages = 0;

// Елементи DOM
const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');

// Обробники подій
searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

/**
 * Обробник відправки форми пошуку
 * @param {Event} event - Подія відправки форми
 */
async function onSearchFormSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  // Перевірка на порожній рядок
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  // Скидання параметрів для нового пошуку
  currentQuery = query;
  currentPage = 1;
  loadedImages = 0;

  // Очищення попередніх результатів
  clearGallery();
  hideLoadMoreButton();

  await searchImages();

  // Очищення поля вводу
  searchInput.value = '';
}

/**
 * Обробник кліку по кнопці Load More
 */
async function onLoadMoreClick() {
  currentPage += 1;
  await searchImages();
}

/**
 * Основна функція пошуку зображень
 */
async function searchImages() {
  try {
    // Показуємо лоадер
    showLoader();

    // Виконуємо запит до API
    const data = await getImagesByQuery(currentQuery, currentPage);

    // Ховаємо лоадер
    hideLoader();

    // Перевірка першого запиту
    if (currentPage === 1) {
      totalHits = data.totalHits;

      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      // Показуємо успішне повідомлення для першого запиту
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${totalHits} images!`,
        position: 'topRight',
      });
    }

    // Відображаємо галерею
    createGallery(data.hits);
    loadedImages += data.hits.length;

    // Перевірка чи досягнуто кінця колекції
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();

      if (totalHits > 15) {
        // Показуємо повідомлення тільки якщо було більше однієї сторінки
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      showLoadMoreButton();
    }

    // Плавне прокручування для Load More (не для першого запиту)
    if (currentPage > 1) {
      smoothScroll();
    }
  } catch (error) {
    // Ховаємо лоадер в разі помилки
    hideLoader();
    hideLoadMoreButton();

    console.error('Search error:', error);

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  }
}

/**
 * Плавне прокручування сторінки на дві висоти карточки
 */
function smoothScroll() {
  const cardHeight = getCardHeight();
  const scrollDistance = cardHeight * 2;

  window.scrollBy({
    top: scrollDistance,
    behavior: 'smooth',
  });
}
