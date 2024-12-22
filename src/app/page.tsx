"use client";

import { useImages } from "@/hooks/hooks.images";
import ChunkSelector, { SelectionArea } from "./x-components/general.chunk-selector";
import { useState } from "react";
import { useChunks } from "@/hooks/hooks.chunks";
import { Chunk } from "@/types/types.chunks";
import { v4 as uuidv4 } from "uuid";
import { exportToCsv } from "@/utils/utils.export-csv";
import TranscriptionInput from "./x-components/general.transcription";

const Page = () => {
  const { currentImageIndex, setCurrentImageIndex, currentImage } = useImages();
  const [parentSelection, setParentSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [confidence, setConfidence] = useState(2);
  const { chunks, setChunks } = useChunks();
  const [transcriptionValue, setTranscriptionValue] = useState({
    userInput: "",
    latex: "",
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<SelectionArea | null>(null);

  console.log(parentSelection);

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
        transcription: transcriptionValue.latex,
        confidence: confidence,
        parentImageId: currentImage?.id,
      };
      setChunks([...chunks, newChunk]);
      setParentSelection({ x: 0, y: 0, width: 0, height: 0 });
      setTranscriptionValue({ userInput: "", latex: "" });
      setConfidence(2);
      setCurrentSelection(null);
      setIsSelecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Header section */}
      <header className="w-full bg-white shadow-sm py-4 mb-6">
        <h1>Goblins Whiteboard Labeling System</h1>
      </header>

      <main className="container mx-auto px-4 flex flex-col gap-6 max-w-6xl">
        {/* Image navigation */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <span className="mr-2">←</span>
              Previous
            </button>
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Next
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Export to CSV */}
          <button
            onClick={() =>
              exportToCsv(chunks, `-goblins-image-chunks-${new Date().toISOString()}.csv`)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Export to CSV
          </button>
        </div>

        {/* Chunk selection */}
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            {currentImage && (
              <ChunkSelector
                imageSrc={currentImage.url}
                imageAlt={currentImage.id}
                onSelectionChange={setCurrentSelection}
                selection={currentSelection}
                isSelecting={isSelecting}
                setIsSelecting={setIsSelecting}
              />
            )}
          </div>

          {/* Chunk transcription */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Transcription</h2>
              <TranscriptionInput value={transcriptionValue} onChange={setTranscriptionValue} />

              {/* Confidence level */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Level
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <p className="text-sm text-gray-600 mt-1">
                  {confidenceMapping[confidence as keyof typeof confidenceMapping]}
                </p>
              </div>

              {/* Save chunk */}
              <button
                onClick={handleSubmitChunk}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Save Chunk
              </button>
            </div>

            {/* Current image chunks */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Current Image Chunks</h2>
              <div className="space-y-2">
                {currentImage &&
                  chunks.map((chunk) => {
                    if (chunk.parentImageId === currentImage.id) {
                      return (
                        <div key={chunk.id} className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">ID: {chunk.id}</p>
                          <p className="text-sm text-gray-600">Text: {chunk.transcription}</p>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
