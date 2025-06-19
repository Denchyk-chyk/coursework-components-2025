export async function loadBooks(booksPath, names, authors, genres, covers, descriptions, imagePath, publishers) {
  const response = await fetch(booksPath);
  const text = await response.text();

  const lines = text.trim().split('\n');

  const books = lines.map((line, i) => {
    const idx = line.trim().split(/\s+/).map(Number);

    return {
      id: i,

      title: names[idx[0]],
      author: authors[idx[1]],

      genre: genres[idx[2]]?.name || '',
      subgenre1: genres[idx[2]]?.subgenres?.[idx[3]]?.name || '',
      subgenre2: genres[idx[2]]?.subgenres?.[idx[3]]?.subgenres?.[idx[4]] || '',

      cover: covers[idx[5]],
      description: descriptions[Math.floor((idx[6] - 50 ) / 950 * 45)],

      pageCount: idx[7],
      price: idx[8],
      image: `${imagePath}${idx[9]}.png`,

      publisher: publishers[Math.floor((idx[1] / authors.length) * publishers.length)],
    };
  });

  return books;
}
