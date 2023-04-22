import { useState } from 'react';
import { Slideshow } from './Slideshow';

export default {
  title: 'Slideshow',
  component: Slideshow,
};

const slides = [
  { backgroundImage: '/image/back-ground1.jpg' },
  { backgroundImage: '/image/back-ground2.jpg' },
  { backgroundImage: '/image/back-ground3.jpg' },
  { backgroundImage: '/image/back-ground4.jpg' },
  { backgroundImage: '/image/back-ground5.jpg' },
  { backgroundImage: '/image/back-ground6.jpg' },
];

export const Default = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
      <Slideshow slides={slides} currentIdx={currentIdx} duration={450} />
      <button onClick={() => setCurrentIdx((currentIdx + 1) % slides.length)}>
        Next
      </button>
    </div>
  );
};
