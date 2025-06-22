/**
 * Фільтрація масиву книжок за заданими критеріями.
 *
 * @param {object[]} books - Масив об'єктів книжок для фільтрації.
 * @param {string[]} selectedAuthors - Вибрані автори (фільтр за авторами).
 * @param {string[]} selectedPublishers - Вибрані видавці (фільтр за видавцями).
 * @param {string[]} selectedCovers - Вибрані обкладинки (фільтр за обкладинками).
 * @param {{from: number, to: number}} priceRange - Діапазон цін (мінімальна та максимальна).
 * @param {string[]} selectedGenres - Вибрані жанри/піджанри (фільтр за жанрами).
 *
 * @returns {object[]} - Масив книжок, які проходять всі вказані фільтри.
 *
 * Функція проходить усі книги і для кожної перевіряє умови:
 * - якщо вибрані автори і поточна книга не має серед них — виключає.
 * - якщо вибрані видавці і видавець книги не збігається — виключає.
 * - якщо вибрані обкладинки і обкладинка книги не збігається — виключає.
 * - якщо встановлений діапазон цін, перевіряє, чи ціна книги в межах.
 * - якщо вибрані жанри, перевіряє, чи хоча б один жанр/піджанр книги присутній у виборі.
 *
 * Якщо книга проходить усі перевірки — включається у результат.
 */
export function applyFilters(
  books,
  selectedAuthors,
  selectedPublishers,
  selectedCovers,
  priceRange,
  selectedGenres
) {
  return books.filter((book) => {
    // Фільтр за авторами: якщо вибрано хоча б одного автора і книга не серед них — виключити
    if (selectedAuthors.length > 0 && !selectedAuthors.includes(book.author)) {
      return false;
    }

    // Фільтр за видавцями: якщо вибрано видавців і видавець книги не у списку — виключити
    if (
      selectedPublishers.length > 0 &&
      !selectedPublishers.includes(book.publisher)
    ) {
      return false;
    }

    // Фільтр за обкладинками: якщо вибрано обкладинки і обкладинка книги не у списку — виключити
    if (selectedCovers.length > 0 && !selectedCovers.includes(book.cover)) {
      return false;
    }

    // Фільтр за діапазоном цін: якщо вказано, і ціна книги не в межах — виключити
    if (priceRange) {
      if (book.price < priceRange.from || book.price > priceRange.to) {
        return false;
      }
    }

    // Фільтр за жанрами: якщо вибрано жанри, перевірити чи є у книжки хоча б один із них
    if (selectedGenres.length > 0) {
      // Масив жанрів книги (основний жанр та піджанри)
      const genresInBook = [book.genre, book.subgenre1, book.subgenre2];
      // Перевірка на наявність співпадіння жанру книги з вибраними жанрами
      const matches = genresInBook.some((g) => selectedGenres.includes(g));
      if (!matches) {
        return false;
      }
    }

    // Якщо всі перевірки пройшли — книга підходить
    return true;
  });
}
