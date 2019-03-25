import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

import useIntersectionObserver from "./hooks/useIntersectionObserver";
import getScrollbarWidth from "./utils/getScrollbarWidth";

import "./Round.scss";

const scrollbarWidth = getScrollbarWidth();

const Round = ({ code, id }) => {
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
    <div className={`Round ${isExpanded ? "--expanded" : ""}`}>
      <h3 className="Round__title">Round {id + 1}</h3>
      <canvas className="Round__canvas" id={key} ref={canvasEl} />
      <hr className="Round__separator" />
      <pre
        className="Round__code"
        title="You can edit this and then click the Run button to see the changes live"
      >
        <code
          contentEditable
          spellCheck="false"
          ref={codeEl}
          className="language-java"
          style={{
            marginRight: -scrollbarWidth,
            marginBottom: -scrollbarWidth
          }}
        />
      </pre>
      <div className="Round__buttons">
        <button onClick={stopLoop}>◼ Stop</button>
        <button onClick={updateCode}>↻ Run</button>
        <button onClick={toggleExpanded}>↕ Code</button>
      </div>
    </div>
  );
};

Round.displayName = "Round";

export default Round;
