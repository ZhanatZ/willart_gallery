import { useRef, useEffect } from 'react';
import type { RoomConfig } from '../../types';
import styles from './RoomTabs.module.css';

interface RoomTabsProps {
  rooms: RoomConfig[];
  activeRoomId: string;
  onSelect: (id: string) => void;
}

export function RoomTabs({ rooms, activeRoomId, onSelect }: RoomTabsProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeRoomId]);

  return (
    <nav className={styles.tabs} aria-label="Комнаты">
      <div className={styles.container}>
        {rooms.map((room) => {
          const isActive = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              ref={isActive ? activeRef : null}
              className={`${styles.tab} ${isActive ? styles.active : ''}`}
              onClick={() => onSelect(room.id)}
              aria-pressed={isActive}
            >
              {room.title}
              <span className={styles.count}>{room.images.length}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
