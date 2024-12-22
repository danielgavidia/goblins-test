"use client";

import { useImages } from "@/hooks/hooks.images";
import ChunkSelector from "./x-components/general.chunk-selector";
import { useState } from "react";
import { useChunks } from "@/hooks/hooks.chunks";
import { Chunk } from "@/types/types.chunks";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const { currentImageIndex, setCurrentImageIndex, currentImage } = useImages();
  const [parentSelection, setParentSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const { chunks, setChunks } = useChunks();

  const handleSubmitChunk = () => {
    if (currentImage) {
      const newChunk: Chunk = {
        id: uuidv4(),
        x: parentSelection.x,
        y: parentSelection.y,
        width: parentSelection.width,
        height: parentSelection.height,
        parentImageId: currentImage?.id,
      };
      setChunks([...chunks, newChunk]);
      setParentSelection({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <p className="text-2xl font-bold">Goblins Whiteboard Labeling Systems</p>

      {/* Chunk selector */}
      <div>
        {currentImage && (
          <ChunkSelector
            imageSrc={currentImage.url}
            imageAlt={currentImage.id}
            onSelectionChange={setParentSelection}
          />
        )}
      </div>
      <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)}>Next</button>

      {/* Submit chunk */}
      <button onClick={handleSubmitChunk} className="bg-black text-white p-2 rounded">
        Submit
      </button>

      {/* Chunk list */}
      <div>
        {currentImage &&
          chunks.map((chunk) => {
            if (chunk.parentImageId === currentImage.id) {
              return <div key={chunk.id}>{chunk.id}</div>;
            }
          })}
      </div>
    </div>
  );
};

export default Page;
