import { LinearCopy } from 'gl-react';
import { Surface } from 'gl-react-dom';
import GLImage from 'gl-react-image';
import GLTransitions from 'gl-transitions';
import { Component, useEffect, useRef, useState } from 'react';
import { Node, connectSize } from 'gl-react';

const GLTransition = //connectSize
  (props: {
    transition: {
      glsl: string;
      defaultParams?: Object;
    };
    transitionParams?: Object;
    progress: number;
    // from and to can be any value that are accepted by gl-react for textures.
    from: any;
    to: any;
    // provided by connectSize
    width: number;
    height: number;
  }) => {
    const getUniformsWithProgress = (progress: number) => {
      const {
        transition: { defaultParams },
        transitionParams,
        from,
        to,
        width,
        height,
      } = props;
      return {
        ...defaultParams,
        ...transitionParams,
        progress,
        from,
        to,
        ratio: width / height,
      };
    };
    const ref = useRef<Node | null>(null);
    const setProgress = (progress: number) => {
      if (!ref.current) return;
      ref.current.drawProps.uniforms = getUniformsWithProgress(progress);
    };
    const {
      transition: { glsl },
      progress,
    } = props;
    return (
      <Node
        ref={(n) => (ref.current = n)}
        shader={{
          frag: `
precision highp float;
varying vec2 uv;
uniform float progress, ratio;
uniform sampler2D from, to;
vec4 getFromColor(vec2 uv){return texture2D(from, uv);}
vec4 getToColor(vec2 uv){return texture2D(to, uv);}
${glsl}
void main(){gl_FragColor=transition(uv);}`,
        }}
        ignoreUnusedUniforms={['ratio']}
        uniforms={getUniformsWithProgress(progress)}
      />
    );
  };

function usePrevious<T>(value: T) {
  const [temp, setTemp] = useState<T | null>(null);
  const [previous, setPrevious] = useState<T | null>(null);

  useEffect(() => {
    setTemp(value);
    setPrevious(temp);
  }, [value]);

  return previous;
}
export const Slideshow = (props: {
  slides: { backgroundImage: string }[];
  duration?: number;
  currentIdx: number;
}) => {
  const { duration = 1500 } = props;
  const previousIdx = usePrevious(props.currentIdx);
  const to = props.slides[props.currentIdx].backgroundImage;
  const from =
    (previousIdx !== null && props.slides[previousIdx].backgroundImage) || null;
  // if (!previousIdx) return <LinearCopy>{to}</LinearCopy>;
  const transition = GLTransitions[10];

  const [progress, setProgress] = useState(0);
  const INTERVAL = 1000 / 60;

  useEffect(() => {
    setProgress(0);
  }, [props.currentIdx]);

  useEffect(() => {
    if (progress < 1) {
      const interval = setTimeout(() => {
        setProgress(progress + INTERVAL / duration);
      }, INTERVAL);
      return () => {
        clearInterval(interval);
      };
    }
  }, [progress]);
  // return (
  //   <Surface width={600} height={400}>
  //     <GLImage source={to} resizeMode="stretch" zoom={1} center={[0.5, 0.5]} />
  //   </Surface>
  // );
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return (
    <Surface width={vw} height={vh}>
      {progress < 1 && from ? (
        <GLTransition
          width={vw}
          height={vh}
          from={<GLImage source={from} resizeMode="cover" />}
          to={<GLImage source={to} resizeMode="cover" />}
          progress={progress}
          transition={transition}
        />
      ) : (
        <LinearCopy>{to}</LinearCopy>
      )}
    </Surface>
  );
};
