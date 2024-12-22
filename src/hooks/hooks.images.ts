import { Image } from "@/types/types.images";
import { useState, useEffect } from "react";
import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const csvPath = path.join(process.cwd(), "lib", "whiteboards.csv");
      const fileContent = await fs.readFile(csvPath, "utf-8");
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      });

      const parsedImages: Image[] = records.map((record: any) => ({
        id: record.id,
        url: record.image_url,
      }));

      setImages(parsedImages);
    };

    fetchImages();
  }, []);

  return { images, setImages };
};
