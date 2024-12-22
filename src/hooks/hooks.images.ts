import { Image } from "@/types/types.images";
import { useState, useEffect } from "react";
import { getImages } from "@/utils/utils.get-images";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const currentImage = images[currentImageIndex];

  // Fetch images from CSV
  useEffect(() => {
    getImages().then(setImages);
  }, []);

  // Set current image to first image in array
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  return { images, setImages, currentImageIndex, setCurrentImageIndex, currentImage };
};
