import { useState } from 'react';
import { Flex, Box, Text } from 'theme-ui';

const Dot = (props: { duration?: string; active?: boolean; size: string }) => {
  const size = props.active ? '100%' : '8px';
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: props.size,
        height: props.size,
        color: 'white',
      }}
    >
      <Flex
        sx={{
          width: size,
          height: size,
          borderRadius: 100,
          backgroundColor: 'white',
          boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.1)',
          transition: `${props.duration} ease`,
        }}
      />
    </Flex>
  );
};

const Pagination = (props: { current: number; total: number }) => (
  <Flex
    sx={{
      alignItems: 'center',
      color: 'white',
      transform: 'rotate(-90deg)',
      height: 80,
      fontSize: 14,
      fontWeight: 'bold',
    }}
  >
    <Text>{props.current.toString().padStart(2, '0')}</Text>
    <Text sx={{ opacity: 0.5, mx: '8px' }}>/</Text>
    <Text sx={{ opacity: 0.5 }}>{props.total.toString().padStart(2, '0')}</Text>
  </Flex>
);

export function Indicators(props: {
  total: number;
  currentIdx: number;
  onSelect?: (idx: number) => void;
  height?: string;
  width?: string;
  maxDisplayDots?: number;
  duration?: string;
}) {
  const {
    height = '80vh',
    duration = '350ms',
    width = '62px',
    maxDisplayDots = 6,
  } = props;

  const [hoveringIdx, setHoveringIdx] = useState<number | null>(null);
  return (
    <Flex sx={{ height, width, flexDirection: 'column' }}>
      <Flex
        sx={{
          flex: 1,
          width,
          position: 'relative',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ opacity: 0.5 }}>
          <div
            style={{
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(255,255,255,0.5)',
              left: '50%',
              boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.05)',
            }}
          />
          {[...new Array(props.total)].map((_, idx) => (
            <Box
              sx={{
                position: 'absolute',
                left: '0',
                top: `calc(${height}/2 + ${height}/${maxDisplayDots + 2} * ${
                  idx - props.currentIdx
                })`,
                transition: `${duration} ease`,
              }}
            >
              <Dot
                duration={duration}
                key={idx}
                size={width}
                active={idx === props.currentIdx || idx === hoveringIdx}
              />
            </Box>
          ))}
        </Box>
        <Box>
          {[...new Array(props.total)].map((_, idx) => (
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: '0',
                top: `calc(${height}/2 + ${height}/${maxDisplayDots + 2} * ${
                  idx - props.currentIdx
                })`,
                width,
                height: width,

                fontSize: '16px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveringIdx(idx)}
              onMouseLeave={() => setHoveringIdx(null)}
              onClick={() => props.onSelect?.(idx)}
            >
              <Box
                sx={{
                  transform: `scale(${
                    idx === props.currentIdx || idx === hoveringIdx
                      ? '1.1'
                      : '0.0'
                  })`,

                  transition: `${duration} ease`,
                }}
              >
                {`${idx + 1}`}
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
      <Pagination current={props.currentIdx + 1} total={props.total} />
    </Flex>
  );
}
