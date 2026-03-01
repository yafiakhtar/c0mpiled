import pdfParse from "pdf-parse";

export type ParsedPdf = {
  text: string;
  pageCount: number;
};

export async function parsePdf(buffer: ArrayBuffer): Promise<ParsedPdf> {
  const data = await pdfParse(Buffer.from(buffer));
  return {
    text: data.text ?? "",
    pageCount: data.numpages ?? 0
  };
}

export function isLikelyScanned(text: string, pageCount: number) {
  if (!text) return true;
  const charsPerPage = text.length / Math.max(pageCount, 1);
  return charsPerPage < 300;
}
