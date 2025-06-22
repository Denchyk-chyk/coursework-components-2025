/**
 * Асинхронна функція для завантаження та формування масиву об'єктів книжок
 * на основі текстового файлу з індексами та масивів даних.
 *
 * @param {string} booksPath - Шлях або URL до текстового файлу з даними книжок.
 * @param {string[]} names - Масив назв книжок.
 * @param {string[]} authors - Масив авторів.
 * @param {object[]} genres - Масив жанрів з ієрархією піджанрів.
 * @param {string[]} covers - Масив назв або шляхів до обкладинок.
 * @param {string[]} descriptions - Масив текстів описів книжок.
 * @param {string} imagePath - Базовий шлях до зображень книжок.
 * @param {string[]} publishers - Масив видавців.
 *
 * @returns {Promise<object[]>} - Обіцянка, що розв’язується масивом об’єктів книжок.
 *
 * Функція:
 * 1. Завантажує текстовий файл за вказаним шляхом.
 * 2. Розбиває текст на рядки — кожен рядок описує одну книжку у вигляді індексів.
 * 3. Кожен рядок розбивається на числа — індекси, що посилаються на різні масиви.
 * 4. За індексами формується об’єкт книжки з конкретними даними.
 */
export async function loadBooks(
  booksPath,
  names,
  authors,
  genres,
  covers,
  descriptions,
  imagePath,
  publishers
) {
  // Завантаження текстового файлу з даними книжок
  const response = await fetch(booksPath);
  const text = await response.text();

  // Обрізка пробілів по краях та розбиття тексту на рядки за символом нового рядка
  const lines = text.trim().split("\n");

  // Обробка кожного рядка — формування об’єкта книжки
  const books = lines.map((line, i) => {
    // Розбиття рядка на частини за пропусками, перетворення кожної на число
    const idx = line.trim().split(/\s+/).map(Number);

    // Повернення об’єкта книжки зі всіма потрібними полями
    return {
      id: i, // унікальний ідентифікатор — індекс рядка

      // Вибір назви книжки за індексом у масиві names
      title: names[idx[0]],

      // Вибір автора за індексом у масиві authors
      author: authors[idx[1]],

      // Визначення жанру, піджанру 1 і піджанру 2 з ієрархії genres
      genre: genres[idx[2]]?.name || "",
      subgenre1: genres[idx[2]]?.subgenres?.[idx[3]]?.name || "",
      subgenre2: genres[idx[2]]?.subgenres?.[idx[3]]?.subgenres?.[idx[4]] || "",

      // Вибір обкладинки за індексом у масиві covers
      cover: covers[idx[5]],

      // Вибір опису за індексом, який розраховується складною формулою:
      // (корегування індексу idx[6] з діапазону [50..1000] у індекс опису [0..45])
      description: descriptions[Math.floor(((idx[6] - 50) / 950) * 45)],

      // Кількість сторінок — числове значення з idx[7]
      pageCount: idx[7],

      // Ціна книжки — числове значення з idx[8]
      price: idx[8],

      // Шлях до зображення книжки, формований зі шляху imagePath і індексу idx[9]
      image: `${imagePath}${idx[9]}.png`,

      // Визначення видавця за індексом, що пропорційно відноситься до автора
      publisher:
        publishers[Math.floor((idx[1] / authors.length) * publishers.length)],
    };
  });

  // Повернення сформованого масиву книжок
  return books;
}
