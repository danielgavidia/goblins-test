"use client";

import { useImages } from "@/hooks/hooks.images";

const Page = () => {
  const { currentImageIndex, setCurrentImageIndex, currentImage } = useImages();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl font-bold">Goblins Whiteboard Labeling Systems</p>
      <div>
        {currentImage && <img src={currentImage.url} alt={currentImage.id} className="h-96" />}
      </div>
      <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)}>Next</button>
    </div>
  );
};

export default Page;
