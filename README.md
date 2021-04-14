<p align="center">
    <img src="https://github.com/joeymalvinni/git-contributions-api/raw/main/imgs/git-contributions-api.svg"></img>
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0">
	<img alt="Apache 2.0 License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg">
  </a>
  <a href="https://github.com/joeymalvinni/git-contributions-api/contributors/">
	<img alt="Github contributors" src="https://img.shields.io/github/contributors/joeymalvinni/git-contributions-api.svg">
  </a>
  <a href="https://github.com/joeymalvinni/git-contributions-api/pulls">
	<img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
</p>

<br>

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install git-contributions-api
```

## Features

  * Create a JSON Server
  * Request the data yourself
  * Focus on high performance

## Quick Start

  The quickest way to get started with git-contributions-api is to use the module in a script and output a username as shown below:

  Install the executable:

```bash
$ npm install -g git-contributions-api
```

  Make an `index.js` file and give it the following contents:
  
```js
const { Server } = require('git-contributions-api');
const http = require('http');
const PORT = process.env.PORT || 3000

http.createServer(Server).listen(PORT);
```

  Test the application:

```bash
$ node index.js
```

  Now visit `http://localhost:3000/your-github-username/count`!

## Contributing

[Contributing Guide](Contributing.md)

## Authors

The author of git-contributions-api is [Joey Malvinni](https://github.com/joeymalvinni)

[List of all contributors](https://github.com/joeymalvinni/random-usernames/graphs/contributors)

## License

  [Apache 2.0](LICENSE)