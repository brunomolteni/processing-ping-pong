import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import cleanUpProcessing from "./utils/cleanUpProcessing";
import useGist from "./hooks/useGist";
import Round from "./Round";
import Footer from "./Footer";

import "./App.scss";

const App = () => {
  let gistId = document.location.search.split("id=").pop();

  if (!gistId) {
    gistId = "0bc9ad44727739ce6b1b23c88083a263";
    document.location.search = `?id=${gistId}`;
  }

  const sketches = useGist(gistId);

  const codeToRound = (code, i) => (
    <Round code={cleanUpProcessing(code)} id={i} key={i} />
  );

  return (
    sketches && (
      <main className="App">
        {sketches.map(codeToRound)}
        <h3>
          Participate in this Match by adding a comment with your round on{" "}
          <a href={`https://gist.github.com/${gistId}`}>this Gist</a>
        </h3>
        <p>
          You can learn more about how this was done in the{" "}
          <a href="https://github.com/brunomolteni/processing-ping-pong">
            Github Repository
          </a>
        </p>
        <Footer />
      </main>
    )
  );
};

App.displayName = "App";

export default hot(module)(App);
