export async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  const data = await response.json();
  return data;
}
