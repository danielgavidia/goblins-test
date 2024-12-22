"use client";

import { useImages } from "@/hooks/hooks.images";
import ChunkSelector from "./x-components/general.chunk-selector";
import { useState } from "react";
import { useChunks } from "@/hooks/hooks.chunks";
import { Chunk } from "@/types/types.chunks";
import { v4 as uuidv4 } from "uuid";
import { exportToCsv } from "@/utils/utils.export-csv";

const Page = () => {
  const { currentImageIndex, setCurrentImageIndex, currentImage } = useImages();
  const [parentSelection, setParentSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [confidence, setConfidence] = useState(2);
  const { chunks, setChunks } = useChunks();

  const confidenceMapping = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const handleSubmitChunk = () => {
    if (currentImage) {
      const newChunk: Chunk = {
        id: uuidv4(),
        x: parentSelection.x,
        y: parentSelection.y,
        width: parentSelection.width,
        height: parentSelection.height,
        confidence: confidence,
        parentImageId: currentImage?.id,
      };
      setChunks([...chunks, newChunk]);
      setParentSelection({ x: 0, y: 0, width: 0, height: 0 });
      setConfidence(2);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <p className="text-2xl font-bold">Goblins Whiteboard Labeling Systems</p>

      {/* CSV export */}
      <button
        onClick={() => exportToCsv(chunks, `-goblins-image-chunks-${new Date().toISOString()}.csv`)}
      >
        Export Image Chunks to CSV
      </button>

      {/* Image navigation */}
      <div className="flex flex-row gap-2">
        <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)}>Next</button>
        <button onClick={() => setCurrentImageIndex(currentImageIndex - 1)}>Previous</button>
      </div>

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

      {/* Confidence interval */}
      <input
        type="range"
        min={1}
        max={3}
        value={confidence}
        onChange={(e) => setConfidence(Number(e.target.value))}
      />
      <p>
        Confidence: {confidence} - {confidenceMapping[confidence as keyof typeof confidenceMapping]}
      </p>

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
