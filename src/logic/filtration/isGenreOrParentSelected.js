export const isGenreOrParentSelected = (target, selectedList, genres) => {
  const dfs = (node, path = []) => {
    if (typeof node === "string") {
      if (node === target) {
        return (
          selectedList.includes(node) ||
          path.some((parent) => selectedList.includes(parent))
        );
      }
      return false;
    }

    if (node.name === target) {
      return (
        selectedList.includes(node.name) ||
        path.some((parent) => selectedList.includes(parent))
      );
    }

    if (node.subgenres) {
      for (const child of node.subgenres) {
        if (dfs(child, [...path, node.name])) return true;
      }
    }

    return false;
  };

  return genres.some((genre) => dfs(genre));
};
