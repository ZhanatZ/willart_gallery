import { Hero } from './components/Hero/Hero';
import { RoomTabs } from './components/RoomTabs/RoomTabs';
import { Gallery } from './components/Gallery/Gallery';
import { LightboxWrapper } from './components/LightboxWrapper/LightboxWrapper';
import { useGallery } from './hooks/useGallery';
import styles from './App.module.css';

export default function App() {
  const {
    project,
    rooms,
    activeRoomId,
    selectRoom,
    activeRoom,
    images,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  } = useGallery();

  return (
    <div className={styles.app}>
      <Hero project={project} />
      <RoomTabs
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelect={selectRoom}
      />
      <Gallery
        room={activeRoom}
        images={images}
        onImageClick={openLightbox}
      />
      <LightboxWrapper
        images={images}
        index={lightboxIndex}
        onClose={closeLightbox}
      />
    </div>
  );
}
