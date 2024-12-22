import { Image } from "@/types/types.images";
import { parse } from "csv-parse/sync";

export const getImages = async (): Promise<Image[]> => {
  const response = await fetch("/whiteboards.csv");
  const fileContent = await response.text();
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return records.map((record: any) => ({
    id: record.id,
    url: record.image_url,
  }));
};
