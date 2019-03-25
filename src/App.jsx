import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import cleanUp from "./cleanUp";
import useGist from "./useGist";
import Sketch from "./Sketch";
import Attribution from "./Attribution";

import "./App.scss";

const App = () => {
  const sketches = useGist();

  const codeToSketch = (code, i) => (
    <Sketch code={cleanUp(code)} id={i} key={i} />
  );

  return (
    sketches && (
      <main className="App">
        {sketches.map(codeToSketch)}
        <Attribution />
      </main>
    )
  );
};

App.displayName = "App";

export default hot(module)(App);
