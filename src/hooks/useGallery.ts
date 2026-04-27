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
      thumb: thumb,
      thumbFallback: full,
      alt: `${room.title} — ${filename}`,
    };
  });
}

export function useGallery() {
  const { rooms } = galleryConfig;

  const project = useMemo(() => ({
    ...galleryConfig.project,
    cover: assetUrl(galleryConfig.project.cover),
  }), []);

  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id ?? '');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.id === activeRoomId) ?? rooms[0],
    [rooms, activeRoomId],
  );

  const images = useMemo(() => buildImages(activeRoom), [activeRoom]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
  }, []);

  const selectRoom = useCallback((id: string) => {
    setActiveRoomId(id);
    setLightboxIndex(-1);
  }, []);

  return {
    project,
    rooms,
    activeRoomId,
    selectRoom,
    activeRoom,
    images,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  };
}
