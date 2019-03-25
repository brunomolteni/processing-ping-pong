import { useState, useEffect } from "react";

const apiUrl = id => `https://api.github.com/gists/${id}`;
const getJson = resp => resp.json();
const hasCode = comment => comment.body.indexOf("```") > -1;
const getCode = comment => comment.body.match(/```(?:java)?\s?([^`]*)/)[1];
const getFirstFile = files => Object.entries(files)[0][1];

const useGist = () => {
  const [currentGist, setCurrentGist] = useState(null);

  useEffect(() => {
    let fetchGist = async () => {
      let gistId =
        document.location.search.split("id=").pop() ||
        "0bc9ad44727739ce6b1b23c88083a263";

      const gist = await fetch(apiUrl(gistId)).then(getJson);
      const comments = await fetch(gist.comments_url).then(getJson);

      const sketches = [
        getFirstFile(gist.files).content,
        ...comments.filter(hasCode).map(getCode)
      ];

      return sketches;
    };

    fetchGist().then(setCurrentGist);
  }, []);

  return currentGist;
};

export default useGist;
