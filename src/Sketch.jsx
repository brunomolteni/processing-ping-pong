import React, { useEffect, useRef } from "react";

import useIntersectionObserver from "./useIntersectionObserver";

import "./Sketch.scss";

const Sketch = ({ code, id }) => {
  const key = `pjs-${id}`;
  const canvasEl = useRef(null);
  var instance = null;

  const compileAndRun = code => {
    let sketch = Processing.compile(code);
    instance = new Processing(key, sketch);
    playLoop();
  };

  const updateCode = () => {
    stopLoop();
    let changedCode = canvasEl.current.textContent;
    compileAndRun(changedCode);
  };

  const stopLoop = () => {
    !!instance && instance.noLoop();
  };

  const playLoop = () => {
    !!instance && instance.loop();
  };

  const playWhenVisible = entries =>
    entries.map(entry => (entry.isIntersecting ? playLoop() : stopLoop()));

  useEffect(() => {
    canvasEl.current.textContent = code;
    compileAndRun(code);
  });

  useIntersectionObserver(canvasEl, playWhenVisible);

  return (
    <div className="Sketch">
      <canvas className="Sketch__canvas" id={key} />
      <hr className="Sketch__separator" />
      <pre
        className="Sketch__code"
        contentEditable
        ref={canvasEl}
        spellCheck="false"
      />
      <div className="Sketch__buttons">
        <button onClick={stopLoop}>◼</button>
        <button onClick={updateCode}>↷</button>
      </div>
    </div>
  );
};

Sketch.displayName = "Sketch";

export default Sketch;
