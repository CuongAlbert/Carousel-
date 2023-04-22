import { useState } from 'react';
import './App.css';
import { Flex, Box } from 'theme-ui';
import { Indicators } from './components/Indicators';
import Headings from './components/Headings';
import CardList from './components/CardList';
import { Slide } from './components/Slide';
import { Slideshow } from './components/Slideshow';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const data = [
  {
    title: 'Australia',
    buttonColor: 'lightblue',
    description: `1 ${description}`,
    backgroundImage: '/image/back-ground1.jpg',
    items: [
      {
        title: '1',
        rate: 4,
        image: '/image/image1.jpg',
      },
      {
        title: '2',
        rate: 4,
        image: '/image/image2.jpg',
      },
      {
        title: '3',
        rate: 4,
        image: '/image/image3.jpg',
      },
      {
        title: '4',
        rate: 4,
        image: '/image/image4.jpg',
      },
      {
        title: '5',
        rate: 4,
        image: '/image/image5.jpg',
      },
    ],
  },
  {
    title: 'Europe',
    buttonColor: 'blue',
    description: `2 ${description}`,
    backgroundImage: '/image/back-ground2.jpg',
    items: [
      {
        title: '21',
        rate: 4,
        image: '/image/image21.jpg',
      },
      {
        title: '22',
        rate: 4,
        image: '/image/image22.jpg',
      },
      {
        title: '23',
        rate: 4,
        image: '/image/image23.jpg',
      },
      {
        title: '24',
        rate: 4,
        image: '/image/image24.jpg',
      },
      {
        title: '25',
        rate: 4,
        image: '/image/image25.jpg',
      },
    ],
  },
  {
    title: 'Africa',
    buttonColor: 'red',
    description: `3 ${description}`,
    backgroundImage: '/image/back-ground3.jpg',
    items: [
      {
        title: '31',
        rate: 4,
        image: '/image/image31.png',
      },
      {
        title: '32',
        rate: 4,
        image: '/image/image32.jpg',
      },
      {
        title: '33',
        rate: 4,
        image: '/image/image33.jpg',
      },
      {
        title: '34',
        rate: 4,
        image: '/image/image34.jpg',
      },
      {
        title: '35',
        rate: 4,
        image: '/image/image35.jpg',
      },
    ],
  },
  {
    title: 'Asia',
    buttonColor: 'green',
    description: `4 ${description}`,
    backgroundImage: '/image/back-ground4.jpg',
    items: [
      {
        title: '41',
        rate: 4,
        image: '/image/image41.jpg',
      },
      {
        title: '42',
        rate: 4,
        image: '/image/image42.jpg',
      },
      {
        title: '43',
        rate: 4,
        image: '/image/image43.jpg',
      },
      {
        title: '44',
        rate: 4,
        image: '/image/image44.jpg',
      },
      {
        title: '45',
        rate: 4,
        image: '/image/image45.jpg',
      },
    ],
  },
  {
    title: 'America',
    buttonColor: 'red',
    description: `5 ${description}`,
    backgroundImage: '/image/back-ground5.jpg',
    items: [
      {
        title: '51',
        rate: 4,
        image: '/image/image51.jpg',
      },
      {
        title: '52',
        rate: 4,
        image: '/image/image52.jpg',
      },
      {
        title: '53',
        rate: 4,
        image: '/image/image53.jpg',
      },
      {
        title: '54',
        rate: 4,
        image: '/image/image54.jpg',
      },
      {
        title: '55',
        rate: 4,
        image: '/image/image55.jpg',
      },
    ],
  },
  {
    title: 'Arctic',
    buttonColor: 'brown',
    description: `6 ${description}`,
    backgroundImage: '/image/back-ground6.jpg',
    items: [
      {
        title: '61',
        rate: 4,
        image: '/image/image61.jpg',
      },
      {
        title: '62',
        rate: 4,
        image: '/image/image62.jpg',
      },
      {
        title: '63',
        rate: 4,
        image: '/image/image63.jpg',
      },
      {
        title: '64',
        rate: 4,
        image: '/image/image64.jpg',
      },
      {
        title: '65',
        rate: 4,
        image: '/image/image65.jpg',
      },
    ],
  },
];

function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  console.log(data[currentIdx].backgroundImage);
  // // useEffect(() => {
  // //   setTimeout(() => {
  // //     setCurrentIdx((currentIdx + 1) % data.length);
  // //   }, 2000);
  // }, [currentIdx]);
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        backgroundColor: '#333',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#333',
        }}
      >
        <Slide slides={data} currentIdx={currentIdx} />
        {/* <Slideshow slides={data} currentIdx={currentIdx} duration={1500} /> */}
      </Box>
      <Flex />
      <Flex sx={{ justifyContent: 'space-between', mb: '2vw' }}>
        <Box sx={{ ml: '2vw' }}>
          <Indicators
            total={data.length}
            currentIdx={currentIdx}
            onSelect={setCurrentIdx}
          />
        </Box>
        <Headings data={data} currentIdx={currentIdx} width="26vw" />
        <CardList list={data[currentIdx].items} width="54vw" />
      </Flex>
    </Flex>
  );
}

export default App;
