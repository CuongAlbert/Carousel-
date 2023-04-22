import { useState, useEffect } from 'react';
import { Box, Flex, Text, AspectImage, AspectRatio } from 'theme-ui';
import { useTransition, animated } from 'react-spring';

const Controls = (props: { onNext?: () => void; onPrev?: () => void }) => {
  return (
    <Flex sx={{ color: 'white', fontSize: 32 }}>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '4vw',
          height: '4vw',
          borderRadius: '4vw',
          backgroundColor: 'rgba(255,255,255,0.3)',
          mr: 18,
          cursor: 'pointer',
        }}
        onClick={props.onPrev}
      >
        ‹
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '4vw',
          height: '4vw',
          borderRadius: '4vw',
          backgroundColor: 'rgba(255,255,255,0.3)',
          cursor: 'pointer',
          fontSize: 45,
        }}
        onClick={props.onNext}
      >
        ›
      </Flex>
    </Flex>
  );
};

const Pagination = (props: { current: number; total: number }) => (
  <Flex
    sx={{
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
    }}
  >
    <Text>{props.current.toString().padStart(2, '0')}</Text>
    <Box
      sx={{
        width: 65,
        mx: 25,
        height: 2,
        backgroundColor: 'white',
        opacity: 0.5,
      }}
    />
    <Text sx={{ opacity: 0.5 }}>{props.total.toString().padStart(2, '0')}</Text>
  </Flex>
);

function useDelayedState<T>(value: T, delay: number) {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return [state];
}

const IMAGE_RATIO = 401 / 569;

const CardTitle = ({
  title,
  duration = 550,
  delay,
  dotSize,
  rate,
}: {
  title: string;
  duration?: number;
  delay: number;
  dotSize: number;
  rate: number;
}) => {
  const [delayTitle] = useDelayedState(title, delay);
  const [delayRate] = useDelayedState(rate, delay);
  console.log(title, delayTitle);
  const titleTransition = useTransition(
    { title: delayTitle, rate: delayRate },
    {
      key: { title },
      from: { opacity: -2 },
      enter: { opacity: 1 },
      leave: { opacity: -2 },
      config: {
        tension: 220,
        friction: 120,
        duration: duration,
      },
    }
  );
  return (
    <Box sx={{ height: 75 }}>
      {titleTransition((style, item) => (
        <animated.div style={{ ...style, position: 'absolute' }}>
          <Text sx={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
          <Flex>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: dotSize,
                  height: dotSize,
                  mr: dotSize,
                  my: 25,
                  borderRadius: dotSize,
                  transition: 'all 500ms',
                  backgroundColor: 'white',
                  opacity: idx < (item.rate ?? 0) ? 1 : 0.5,
                }}
              />
            ))}
          </Flex>
        </animated.div>
      ))}
    </Box>
  );
};

const Card = ({
  image,
  width,
  delay,
  duration = 450,
}: {
  image: string;
  width: string;
  delay: number;
  duration?: number;
}) => {
  const [delayedImage] = useDelayedState(image, delay);
  console.log(image, delayedImage);
  const cardTransition = useTransition(delayedImage, {
    key: delayedImage,
    from: { transform: 'rotateY(180deg)' },
    enter: { transform: 'rotateY(0deg)' },
    leave: { transform: 'rotateY(-180deg)' },
    config: {
      tension: 220,
      friction: 120,
      duration: duration,
    },
  });
  return (
    <Box
      className="root"
      sx={{ '& > div > div:last-child': { perspective: 2000 } }}
    >
      <AspectRatio
        ratio={IMAGE_RATIO}
        sx={{
          // transition: `transform ${duration} ms`,
          transformStyle: 'preserve-3d',
        }}
      >
        {cardTransition((style, image) => (
          <animated.div
            style={{
              ...style,
              position: 'absolute',
              width,
              boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.05)',
              backfaceVisibility: 'hidden',
              transition: `width ${duration} ms`,
            }}
          >
            <AspectImage
              src={image ?? 'undifined'}
              ratio={IMAGE_RATIO}
              style={{ borderRadius: 8 }}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
              }}
            />
          </animated.div>
        ))}
      </AspectRatio>
    </Box>
  );
};

function CardList(props: {
  list: {
    title: string;
    rate: number;
    image: string;
  }[];
  width?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(0);
  }, [props.list]);

  const { width = '50vw' } = props;

  return (
    <Box sx={{ width, overflow: 'hidden', position: 'relative' }}>
      <Flex
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          left: `calc((${width}/2.5 + 40px) * (-${currentIdx}))`,
          transition: 'left 500ms',
        }}
      >
        {props.list.map((item, idx) => {
          const isBig = idx <= currentIdx;
          const dotSize = isBig ? 12 : 10;
          return (
            <Box
              key={idx}
              sx={{
                width: `calc(${width}/${isBig ? 2.5 : 2.8})`,
                transition: 'width 500ms',
                flexShrink: 0,
                mr: 40,
                position: 'relative',
              }}
            >
              <CardTitle
                title={item.title}
                dotSize={dotSize}
                delay={idx * 150}
                rate={item.rate}
              />
              <Card
                delay={150 * idx}
                image={item.image}
                width={`calc(${width}/${isBig ? 2.5 : 2.8})`}
              />
            </Box>
          );
        })}
      </Flex>
      <Flex sx={{ position: 'absolute', bottom: 0, left: 25 }}>
        <Controls
          onNext={() => {
            if (currentIdx + 1 < props.list.length) {
              setCurrentIdx(currentIdx + 1);
            }
          }}
          onPrev={() => {
            if (currentIdx > 0) {
              setCurrentIdx(currentIdx - 1);
            }
          }}
        />
      </Flex>
      <Flex sx={{ position: 'absolute', bottom: 0, right: 70 }}>
        <Pagination current={currentIdx + 1} total={props.list.length} />
      </Flex>
    </Box>
  );
}

export default CardList;
