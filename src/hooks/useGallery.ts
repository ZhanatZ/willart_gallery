import { useState, useMemo, useCallback } from 'react';
import { galleryConfig } from '../config/gallery.config';
import type { GalleryImage, RoomConfig } from '../types';

const BASE = import.meta.env.BASE_URL;

function assetUrl(path: string): string {
  return `${BASE}${path}`;
}

function buildImages(room: RoomConfig): GalleryImage[] {
  return room.images.map((filename) => {
    const full = assetUrl(`images/${room.id}/full/${filename}`);
    const thumb = assetUrl(`images/${room.id}/thumb/${filename}`);

    return {
      src: full,
      thumb,
      thumbFallback: full,
      alt: `${room.title} — ${filename}`,
    };
  });
}

export interface RoomWithImages {
  room: RoomConfig;
  images: GalleryImage[];
}

export function useGallery() {
  const { rooms } = galleryConfig;

  const project = useMemo(() => ({
    ...galleryConfig.project,
    cover: assetUrl(galleryConfig.project.cover),
  }), []);

  const roomsWithImages = useMemo<RoomWithImages[]>(
    () => rooms.map((room) => ({ room, images: buildImages(room) })),
    [rooms],
  );

  const [lightbox, setLightbox] = useState<{
    roomId: string;
    index: number;
  } | null>(null);

  const lightboxImages = useMemo(() => {
    if (!lightbox) return [];
    return roomsWithImages.find((r) => r.room.id === lightbox.roomId)?.images ?? [];
  }, [lightbox, roomsWithImages]);

  const openLightbox = useCallback((roomId: string, index: number) => {
    setLightbox({ roomId, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  return {
    project,
    rooms,
    roomsWithImages,
    lightboxImages,
    lightboxIndex: lightbox?.index ?? -1,
    openLightbox,
    closeLightbox,
  };
}
