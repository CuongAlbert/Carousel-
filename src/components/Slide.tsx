import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

export function Slide(props: {
  slides: { backgroundImage: string }[];
  currentIdx: number;
}) {
  const transitions = useTransition(props.currentIdx, {
    key: props.currentIdx,
    from: {
      rotate: '75deg',
      transform: 'scale(6.5)',
      opacity: 0.1,
    },
    enter: { rotate: '0deg', opacity: 1, transform: 'scale(1)' },
    leave: {
      rotate: '-75deg',
      transform: 'scale(6.5)',
      opacity: 0.1,
    },
    config: { tension: 220, friction: 120, duration: 450 },
    exitBeforeEnter: true,
  });
  return (
    <div>
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            backgroundImage: `url(${props.slides[i].backgroundImage})`,
            width: '100vw',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            transition: 'ease-in-out',
          }}
        ></animated.div>
      ))}
    </div>
  );
}
