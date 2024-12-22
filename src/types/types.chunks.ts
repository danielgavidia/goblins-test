export interface Chunk {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  transcription: string;
  confidence: number;
  parentImageId: string;
}
