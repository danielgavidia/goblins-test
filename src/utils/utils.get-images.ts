"use server";

import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";
import { Image } from "@/types/types.images";

export const getImages = async (): Promise<Image[]> => {
  const csvPath = path.join(process.cwd(), "src", "lib", "whiteboards.csv");
  const fileContent = await fs.readFile(csvPath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((record: any) => ({
    id: record.id,
    url: record.image_url,
  }));
};
