import axios from 'axios';

// API конфігурація
const API_KEY = '19753267-9cf01e6822d74b7ae8fe04f3f';
const BASE_URL = 'https://pixabay.com/api/';

// Конфігурація axios
const pixabayAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15, // 15 зображень на сторінку
  },
});

/**
 * Отримання зображень за пошуковим запитом з пагінацією
 * @param {string} query - Пошукове слово
 * @param {number} page - Номер сторінки
 * @returns {Promise} - Promise з даними від API
 */
export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await pixabayAPI.get('', {
      params: {
        q: query.trim(),
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
