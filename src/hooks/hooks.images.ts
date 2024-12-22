import { Image } from "@/types/types.images";
import { useState, useEffect } from "react";
import { getImages } from "@/utils/utils.get-images";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    getImages().then(setImages);
  }, []);

  return { images, setImages };
};
