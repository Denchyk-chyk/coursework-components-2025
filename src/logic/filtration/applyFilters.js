export function applyFilters(
  books,
  selectedAuthors,
  selectedPublishers,
  selectedCovers,
  priceRange,
  selectedGenres
) {
  return books.filter((book) => {
    if (selectedAuthors.length > 0 && !selectedAuthors.includes(book.author)) {
      return false;
    }

    if (
      selectedPublishers.length > 0 &&
      !selectedPublishers.includes(book.publisher)
    ) {
      return false;
    }

    if (selectedCovers.length > 0 && !selectedCovers.includes(book.cover)) {
      return false;
    }

    if (priceRange) {
      if (book.price < priceRange.from || book.price > priceRange.to) {
        return false;
      }
    }

    if (selectedGenres.length > 0) {
      const genresInBook = [book.genre, book.subgenre1, book.subgenre2];
      const matches = genresInBook.some((g) => selectedGenres.includes(g));
      if (!matches) {
        return false;
      }
    }

    return true;
  });
}
