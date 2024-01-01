

export interface FoundObject {
  confidence: number;
  tag: {
    en: string;
  }
}

export interface ImageInfo {
  id: number;
  label: string;
  path: string;
  detect: boolean;
  objects: Array<FoundObject>;
  data: string;
}

export interface ImagePayload {
  label?: string;
  detect: boolean;
  path: string;
}