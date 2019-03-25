import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

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
    Prism.highlightAll();
  });

  useIntersectionObserver(canvasEl, playWhenVisible);

  return (
    <div className="Sketch">
      <canvas className="Sketch__canvas" id={key} />
      <hr className="Sketch__separator" />
      <pre
        className="Sketch__code"
        title="You can edit this and then click the Run button to see the changes live"
      >
        <code
          contentEditable
          spellCheck="false"
          ref={codeEl}
          className="language-java"
        />
      </pre>
      <div className="Sketch__buttons">
        <button onClick={stopLoop}>◼</button>
        <button onClick={updateCode}>↷</button>
      </div>
    </div>
  );
};

Sketch.displayName = "Sketch";

export default Sketch;
