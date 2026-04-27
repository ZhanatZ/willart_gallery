import { useState, useCallback } from 'react';
import type { GalleryImage, RoomConfig } from '../../types';
import styles from './Gallery.module.css';

interface GalleryProps {
  room: RoomConfig;
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function Gallery({ room, images, onImageClick }: GalleryProps) {
  if (images.length === 0) {
    return (
      <section id={room.id} className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>{room.title}</h2>
          <p className={styles.empty}>Изображения скоро появятся</p>
        </div>
      </section>
    );
  }

  return (
    <section id={room.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{room.title}</h2>
          <span className={styles.meta}>{images.length} фото</span>
        </div>
        <div className={styles.grid}>
          {images.map((image, index) => (
            <GalleryCell
              key={image.src}
              image={image}
              index={index}
              roomTitle={room.title}
              onClick={onImageClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface GalleryCellProps {
  image: GalleryImage;
  index: number;
  roomTitle: string;
  onClick: (index: number) => void;
}

function GalleryCell({ image, index, roomTitle, onClick }: GalleryCellProps) {
  const [src, setSrc] = useState(image.thumb);

  const handleError = useCallback(() => {
    if (src !== image.thumbFallback) {
      setSrc(image.thumbFallback);
    }
  }, [src, image.thumbFallback]);

  return (
    <button
      className={styles.cell}
      onClick={() => onClick(index)}
      aria-label={`Открыть ${roomTitle}, фото ${index + 1}`}
    >
      <img
        className={styles.thumb}
        src={src}
        alt={image.alt}
        loading="lazy"
        onError={handleError}
      />
    </button>
  );
}
