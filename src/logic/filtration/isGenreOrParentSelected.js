/**
 * Перевіряє, чи обрано заданий жанр (target) або будь-якого з його батьків у списку вибраних жанрів.
 *
 * @param {string} target - Назва жанру або піджанру для перевірки.
 * @param {string[]} selectedList - Масив вибраних жанрів (рядки).
 * @param {Array} genres - Повний масив жанрів з ієрархією (об'єкти з полем name і піджанрами).
 *
 * @returns {boolean} - true, якщо target або один із його батьків знаходиться у selectedList, інакше false.
 *
 * Опис роботи:
 * - Виконується глибинний пошук (DFS) по дереву жанрів.
 * - Кожен вузол (жанр або піджанр) порівнюється з target.
 * - Якщо знайдено вузол, який співпадає з target, перевіряється:
 *    - чи є він у списку вибраних (selectedList)
 *    - або чи є у списку вибраних будь-хто з його батьків (path)
 * - Якщо умови виконуються, повертається true.
 * - Якщо вузол — рядок (піджанр без вкладених піджанрів), порівнюється безпосередньо.
 * - Якщо не знайдено, функція рекурсивно проходить по всіх піджанрах.
 * - Якщо жоден шлях не дає позитивного результату — повертається false.
 */
export const isGenreOrParentSelected = (target, selectedList, genres) => {
  // Рекурсивна функція обходу, path — шлях батьків до поточного вузла
  const dfs = (node, path = []) => {
    if (typeof node === "string") {
      // Якщо вузол — рядок, перевіряємо співпадіння з target
      if (node === target) {
        // Повертаємо true, якщо цей вузол або будь-хто з батьків є у вибраних
        return (
          selectedList.includes(node) ||
          path.some((parent) => selectedList.includes(parent))
        );
      }
      return false;
    }

    // Вузол — об'єкт з назвою
    if (node.name === target) {
      // Перевірка, чи сам вузол або його батьки у вибраних
      return (
        selectedList.includes(node.name) ||
        path.some((parent) => selectedList.includes(parent))
      );
    }

    // Рекурсивно проходимо по піджанрах (якщо вони є)
    if (node.subgenres) {
      for (const child of node.subgenres) {
        if (dfs(child, [...path, node.name])) return true;
      }
    }

    // Якщо нічого не знайдено
    return false;
  };

  // Перевірка по кожному кореневому жанру в масиві genres
  return genres.some((genre) => dfs(genre));
};
