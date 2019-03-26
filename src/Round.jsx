import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

import useIntersectionObserver from "./hooks/useIntersectionObserver";
import getScrollbarWidth from "./utils/getScrollbarWidth";

import "./Round.scss";

import Sketch from "./Sketch";

const scrollbarWidth = getScrollbarWidth();

const Round = ({ code, id }) => {
  const key = `pjs-${id}`;
  const sketchEl = useRef(null);
  const codeEl = useRef(null);
  const [isExpanded, setExpanded] = useState(false);
  const [currentCode, setCurrentCode] = useState(false);

  const toggleExpanded = () => setExpanded(!isExpanded);

  const updateCode = () => {
    let changedCode = codeEl.current.textContent;
    changedCode === currentCode ? play() : setCurrentCode(changedCode);
  };

  const stop = () => sketchEl.current.stop();

  const play = () => sketchEl.current.play();

  useEffect(() => {
    codeEl.current.textContent = currentCode || code;
    !currentCode && setCurrentCode(code);
    Prism.highlightAll();
  });

  return (
    <div className={`Round ${isExpanded ? "--expanded" : ""}`}>
      <h3 className="Round__title">Round {id + 1}</h3>
      {currentCode && (
        <Sketch
          code={currentCode}
          id={key}
          className="Round__canvas"
          ref={sketchEl}
        />
      )}
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
        <button onClick={stop}>◼ Stop</button>
        <button onClick={updateCode}>↻ Run</button>
        <button onClick={toggleExpanded}>↕ Code</button>
      </div>
    </div>
  );
};

Round.displayName = "Round";

export default Round;
