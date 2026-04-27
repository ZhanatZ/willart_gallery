import { useMemo, useCallback } from 'react';
import { Hero } from './components/Hero/Hero';
import { RoomTabs } from './components/RoomTabs/RoomTabs';
import { Gallery } from './components/Gallery/Gallery';
import { LightboxWrapper } from './components/LightboxWrapper/LightboxWrapper';
import { useGallery } from './hooks/useGallery';
import { useScrollSpy } from './hooks/useScrollSpy';
import styles from './App.module.css';

export default function App() {
  const {
    project,
    rooms,
    roomsWithImages,
    lightboxImages,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  } = useGallery();

  const sectionIds = useMemo(() => rooms.map((r) => r.id), [rooms]);
  const activeRoomId = useScrollSpy(sectionIds);

  const scrollToRoom = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={styles.app}>
      <Hero project={project} />
      <RoomTabs
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelect={scrollToRoom}
      />
      {roomsWithImages.map(({ room, images }) => (
        <Gallery
          key={room.id}
          room={room}
          images={images}
          onImageClick={(index) => openLightbox(room.id, index)}
        />
      ))}
      <LightboxWrapper
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
      />
    </div>
  );
}
