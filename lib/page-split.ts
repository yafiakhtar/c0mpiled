export function splitPagesByFormFeed(text: string) {
  const pages = text.split("\f");
  if (pages.length > 1) {
    return pages.map((pageText, index) => ({ page: index + 1, text: pageText.trim() }));
  }
  return null;
}

export function splitPagesByMarker(text: string) {
  const regex = /\[page:\s*(\d+)\]/gi;
  const matches = [...text.matchAll(regex)];
  if (matches.length === 0) return null;

  const pages: { page: number; text: string }[] = [];
  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const next = matches[i + 1];
    const start = (current.index ?? 0) + current[0].length;
    const end = next?.index ?? text.length;
    const page = Number(current[1]);
    const pageText = text.slice(start, end).trim();
    pages.push({ page, text: pageText });
  }

  return pages;
}
