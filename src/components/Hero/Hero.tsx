import type { ProjectConfig } from '../../types';
import styles from './Hero.module.css';

interface HeroProps {
  project: ProjectConfig;
}

export function Hero({ project }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.cover}
          src={project.cover}
          alt={project.title}
          loading="eager"
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <p className={styles.label}>Визуализация интерьера</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
      </div>
    </section>
  );
}
