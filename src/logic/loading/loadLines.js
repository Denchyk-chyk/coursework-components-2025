export async function loadLines(fileName) {
  const response = await fetch(`/${fileName}`);
  if (!response.ok) {
    throw new Error(`Не вдалося завантажити файл: ${fileName}`);
  }
  const text = await response.text();
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}
