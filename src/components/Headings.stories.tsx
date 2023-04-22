import React from 'react';
import Headings from './Headings';

export default {
  title: 'Headings',
  component: Headings,
};

export function Default() {
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  const data = [
    { title: 'Australia', buttonColor: 'red', description: `1 ${description}` },
    { title: 'Europe', buttonColor: 'blue', description: `2 ${description}` },
    { title: 'Africa', buttonColor: 'red', description: `3 ${description}` },
    { title: 'Asia', buttonColor: 'green', description: `4 ${description}` },
    { title: 'America', buttonColor: 'red', description: `5 ${description}` },
    { title: 'Arctic', buttonColor: 'orange', description: `6 ${description}` },
  ];

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % data.length);
    }, 1000);
  }, [currentIdx]);
  return (
    <div style={{ backgroundColor: '#333', width: '100vw', height: '100vh' }}>
      <Headings data={data} currentIdx={currentIdx} />
    </div>
  );
}
