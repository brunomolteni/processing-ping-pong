import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

import useIntersectionObserver from "./useIntersectionObserver";

import "./Sketch.scss";

const Sketch = ({ code, id }) => {
  const key = `pjs-${id}`;
  const canvasEl = useRef(null);
  const codeEl = useRef(null);
  const [isExpanded, setExpanded] = useState(false);
  var instance = null;

  const toggleExpanded = () => setExpanded(!isExpanded);

  const compileAndRun = code => {
    stopLoop();
    let sketch = Processing.compile(code);
    instance = new Processing(key, sketch);
    playLoop();
  };

  const updateCode = () => {
    let changedCode = codeEl.current.textContent;
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
    codeEl.current.textContent = code;
    compileAndRun(code);
    Prism.highlightAll();
  });

  useIntersectionObserver(canvasEl, playWhenVisible);

  return (
    <div className={`Sketch ${isExpanded ? "--expanded" : ""}`}>
      <h3 className="Sketch__title">Round {id + 1}</h3>
      <canvas className="Sketch__canvas" id={key} ref={canvasEl} />
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
        <button onClick={stopLoop}>◼ Stop</button>
        <button onClick={updateCode}>↻ Run</button>
        <button onClick={toggleExpanded}>↕ Code</button>
      </div>
    </div>
  );
};

Sketch.displayName = "Sketch";

export default Sketch;
