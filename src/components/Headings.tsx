import React from 'react';
import { Text, Box, Button, Flex } from 'theme-ui';
import { useTransition, animated } from '@react-spring/web';

const Heading = ({
  active,
  children,
  duration,
}: React.PropsWithChildren<{ active?: boolean; duration: string }>) => {
  const commonStyles = {
    fontWeight: 'bold',
    fontSize: active ? '150px' : '90px',
    color: 'white',
    letterSpacing: '-1px',
    transition: `font-size ${duration} ease-out, opacity ${duration} ease-out`,
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Text
        sx={{
          opacity: active ? 0 : 1,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0))',

          backgroundClip: 'text',
          textFillColor: 'transparent',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          ...commonStyles,
        }}
      >
        {children}
      </Text>
      <Text
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: active ? 1 : 0,
          ...commonStyles,
        }}
      >
        {children}
      </Text>
    </Box>
  );
};

export const Description = (props: {
  data: {
    title: string;
    description?: string;
    buttonColor: string;
  }[];
  currentIdx: number;
  onExplore?: (idx: number) => void;
  width?: string;
  height?: string;
}) => {
  const fadingTextPropsTransition = useTransition(props.currentIdx, {
    key: props.currentIdx,
    from: { opacity: -2 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    config: {
      tension: 220,
      friction: 120,
      duration: 500,
    },
  });

  const buttonTransition = useTransition(props.currentIdx, {
    key: props.currentIdx,
    from: { opacity: -2 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    config: {
      tension: 220,
      friction: 120,
      duration: 500,
      delay: 100,
    },
  });

  return (
    <Text
      sx={{
        position: 'absolute',
        top: `calc(${props.height} / 2 + 60px)`,
        color: 'white',
        fontSize: 16,
        lineHeight: 2,
      }}
    >
      {fadingTextPropsTransition((style, item) => (
        <animated.div
          style={{ ...style, position: 'absolute', animation: 'delay 100ms' }}
        >
          <Flex sx={{ flexDirection: 'column' }}>
            <Text sx={{ width: '26vw', fontWeight: 'bold' }}>
              {props.data[item].description}
            </Text>
          </Flex>
        </animated.div>
      ))}

      {buttonTransition((style, item) => (
        <animated.div
          style={{
            ...style,
            opacity: style.opacity,
            color: 'white',
            position: 'absolute',
            top: 100,
          }}
        >
          <Button
            sx={{
              backgroundColor: props.data[item].buttonColor,
              px: 30,
              py: 10,
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            <Flex>
              Explore
              <Text sx={{ ml: 80, opacity: 0.5, display: 'inline-block' }}>
                ⟶
              </Text>
            </Flex>
          </Button>
        </animated.div>
      ))}
    </Text>
  );
};

function Headings(props: {
  data: {
    title: string;
    description?: string;
    buttonColor: string;
  }[];
  currentIdx: number;
  onExplore?: (idx: number) => void;
  width?: string;
  height?: string;
}) {
  const { data, currentIdx, width = '50vw', height = '80vh' } = props;

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
      }}
    >
      <Description data={data} currentIdx={currentIdx} height={height} />
      {data.map((item, idx) => (
        <Box
          sx={{
            position: 'absolute',
            transition: `bottom 450ms ease, opacity 150ms ease`,
            ...(currentIdx === idx
              ? { bottom: `calc(${height} / 2)` }
              : currentIdx < idx
              ? { bottom: 0 }
              : { bottom: `calc(${height} - 106px)` }),
            opacity: Math.abs(currentIdx - idx) < 2 ? 1 : 0,
          }}
        >
          <Heading active={idx === currentIdx} duration="450ms">
            {item.title}
          </Heading>
        </Box>
      ))}
    </Box>
  );
}

export default Headings;
