import React, { useState, useRef } from "react";

interface ChunkSelectorProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ChunkSelector = ({
  onSelectionChange,
}: {
  onSelectionChange: (selection: ChunkSelectorProps) => void;
}) => {
  const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPos({ x, y });
    setIsSelecting(true);
    setSelection({ x, y, width: 0, height: 0 });
    onSelectionChange({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const newSelection = {
      x: Math.min(currentX, startPos.x),
      y: Math.min(currentY, startPos.y),
      width: Math.abs(currentX - startPos.x),
      height: Math.abs(currentY - startPos.y),
    };

    setSelection(newSelection);
    onSelectionChange(newSelection);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    // Final selection is already passed to parent via onSelectionChange
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        ref={containerRef}
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img src="/api/placeholder/800/600" alt="Selectable image" className="w-full h-auto" />

        {(isSelecting || selection.width > 0) && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
            style={{
              left: `${selection.x}px`,
              top: `${selection.y}px`,
              width: `${selection.width}px`,
              height: `${selection.height}px`,
            }}
          />
        )}
      </div>

      {selection.width > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-medium">Selection Coordinates:</p>
          <p>X: {Math.round(selection.x)}</p>
          <p>Y: {Math.round(selection.y)}</p>
          <p>Width: {Math.round(selection.width)}</p>
          <p>Height: {Math.round(selection.height)}</p>
        </div>
      )}
    </div>
  );
};

export default ChunkSelector;
