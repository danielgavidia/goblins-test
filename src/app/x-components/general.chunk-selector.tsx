import React, { useState, useRef, useEffect } from "react";

export interface SelectionArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ChunkSelectorProps {
  imageSrc: string;
  imageAlt?: string;
  onSelectionChange: (selection: SelectionArea) => void;
  selection?: SelectionArea | null;
  isSelecting: boolean;
  setIsSelecting: (value: boolean) => void;
}

const ChunkSelector = ({
  imageSrc,
  imageAlt = "Selectable image",
  onSelectionChange,
  selection: externalSelection,
  isSelecting,
  setIsSelecting,
}: ChunkSelectorProps) => {
  const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalSelection === null) {
      setSelection({ x: 0, y: 0, width: 0, height: 0 });
    }
  }, [externalSelection]);

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
      x: currentX < startPos.x ? currentX : startPos.x,
      y: currentY < startPos.y ? currentY : startPos.y,
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
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />

        {(isSelecting || (selection.width > 0 && externalSelection !== null)) && (
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
    </div>
  );
};

export default ChunkSelector;
