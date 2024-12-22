import { Chunk } from "@/types/types.chunks";
import { useState } from "react";

export const useChunks = () => {
  const [chunks, setChunks] = useState<Chunk[]>([]);

  return { chunks, setChunks };
};
