import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";

import useIntersectionObserver from "./hooks/useIntersectionObserver";

const Sketch = ({ code, id, className }, ref) => {
  const classes = ["Sketch", className];
  const key = `sketch-${id}`;
  const canvasEl = useRef(null);
  const instanceRef = useRef(null);

  const compileAndRun = code => {
    exit();
    let sketch = Processing.compile(code);
    instanceRef.current = new Processing(key, sketch);
    playLoop();
  };

  const exit = () => !!instanceRef.current && instanceRef.current.exit();

  const stopLoop = () => !!instanceRef.current && instanceRef.current.noLoop();

  const playLoop = () => !!instanceRef.current && instanceRef.current.loop();

  const playWhenVisible = entries =>
    entries.map(entry => {
      entry.isIntersecting ? playLoop() : stopLoop();
    });

  useImperativeHandle(
    ref,
    () => ({
      stop: stopLoop,
      play: playLoop
    }),
    [code]
  );

  useEffect(() => {
    compileAndRun(code);

    return () => {
      stopLoop();
      exit();
    };
  }, [code, id]);

  useIntersectionObserver(canvasEl, playWhenVisible);

  return <canvas className={classes.join(" ")} id={key} ref={canvasEl} />;
};

Sketch.displayName = "Sketch";

export default forwardRef(Sketch);
