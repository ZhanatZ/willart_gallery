import { useState, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GalleryImage } from '../../types';
import styles from './Lightbox.module.css';

interface LightboxWrapperProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
}

export function LightboxWrapper({ images, index, onClose }: LightboxWrapperProps) {
  const [currentIndex, setCurrentIndex] = useState(index);

  const handleView = useCallback(({ index: i }: { index: number }) => {
    setCurrentIndex(i);
  }, []);

  if (index < 0) return null;

  const slides = images.map((img) => ({ src: img.src }));
  const total = images.length;

  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={slides}
      on={{ view: handleView }}
      animation={{ fade: 200, swipe: 200 }}
      carousel={{ imageFit: 'contain', preload: 2 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      labels={{
        Previous: 'Назад',
        Next: 'Вперёд',
        Close: 'Закрыть',
      }}
      styles={{
        root: {
          '--yarl__color_backdrop': 'rgba(18, 18, 16, 0.95)',
          '--yarl__color_button': 'rgba(255, 255, 255, 0.7)',
          '--yarl__color_button_active': 'rgba(255, 255, 255, 1)',
          '--yarl__button_filter': 'none',
        },
      }}
      render={{
        controls: () => (
          <div className={styles.counter}>
            <span className={styles.current}>{currentIndex + 1}</span>
            <span className={styles.separator}> из </span>
            <span className={styles.total}>{total}</span>
          </div>
        ),
      }}
    />
  );
}
