import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(ids: string[], offset = 72): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const handleScroll = () => {
      const currentIds = idsRef.current;
      if (currentIds.length === 0) return;

      let current = currentIds[0];

      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset + 1) {
            current = id;
          }
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom) {
        current = currentIds[currentIds.length - 1];
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return activeId;
}
