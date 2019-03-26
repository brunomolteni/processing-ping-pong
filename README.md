# [Processing Ping-Pong 🏓](https://processing-ping-pong.netlify.com)

A match consist of several people who alternate making changes to the same sketch, getting something new along the way.

## How does it works?

The matches are hosted on public gists, where a .pde file starts the match and each new round is a comment with tagged code ( either \`\`\` or \`\`\`java which gets code highlighting).

The site loads the sketches from github public API and renders them with processing.js. Once running you can edit the code and re-run the sketch with the changes applied to try new things out.

You can look an example gist [here](https://gist.github.com/martoo6/0bc9ad44727739ce6b1b23c88083a263).

Once you have the gist online you can view the match by copying the id ( gist.github.com/USER/THIS_PART_IS_THE_ID ) and pasting it in the url, like [this](https://processing-ping-pong.netlify.com?id=e43b684b87d67be8f974ec2e2fe27036).

## How it's done?

This was done using the following:

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Processing.js](http://processingjs.org/)
- [Prism](https://prismjs.com)
- [Poi](https://poi.js.org/)
- [Gists API](https://developer.github.com/v3/gists/)

## Can I run it locally?

Sure thing! Just clone the repo to your computer and run `npm i && npm start` in the directory. You're done!
