export interface ProjectConfig {
  title: string;
  description: string;
  cover: string;
}

export interface RoomConfig {
  id: string;
  title: string;
  images: string[];
}

export interface GalleryImage {
  src: string;
  thumb: string;
  thumbFallback: string;
  alt: string;
}

export interface GalleryConfig {
  project: ProjectConfig;
  rooms: RoomConfig[];
}
