import type { GalleryConfig } from '../types';

export const galleryConfig: GalleryConfig = {
  project: {
    title: 'Дизайн-проект Willart',
    description: 'Визуализация интерьера квартиры — комнаты, материалы, освещение',
    cover: 'images/hero/08.jpg',
  },

  rooms: [
    {
      id: 'kabinet',
      title: 'Кабинет',
      images: [
        '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
        '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
        '11.jpg',
      ],
    },
    {
      id: 'koridor',
      title: 'Коридор',
      images: [
        '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
        '21.jpg', '22.jpg', '23.jpg', '24.jpg',
      ],
    },
    {
      id: 'kukhnya-gostinaya',
      title: 'Кухня-гостиная',
      images: [
        '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
        '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
        '11.jpg', '13.jpg', '14.jpg', '15.jpg', '25.jpg',
        '26.jpg',
      ],
    },
    {
      id: 'spalnya',
      title: 'Спальня',
      images: [
        '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
        '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
        '11.jpg', '12.jpg', '13.jpg', '14.jpg',
      ],
    },
    {
      id: 'sanuzel',
      title: 'Санузел',
      images: [
        '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg',
        '06.jpg', '07.jpg',
      ],
    },
  ],
};
