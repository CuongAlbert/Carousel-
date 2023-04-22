import { useState } from 'react';
import { Indicators } from './Indicators';

export default {
  title: 'Indicators',
  component: Indicators,
  // tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};
export const Default = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
      <Indicators total={6} currentIdx={currentIdx} onSelect={setCurrentIdx} />
    </div>
  );
};
