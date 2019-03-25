import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import cleanUpProcessing from "./utils/cleanUpProcessing";
import useGist from "./hooks/useGist";
import Round from "./Round";
import Footer from "./Footer";

import "./App.scss";

const App = () => {
  const sketches = useGist();

  const codeToRound = (code, i) => (
    <Round code={cleanUpProcessing(code)} id={i} key={i} />
  );

  return (
    sketches && (
      <main className="App">
        {sketches.map(codeToRound)}
        <Footer />
      </main>
    )
  );
};

App.displayName = "App";

export default hot(module)(App);
