
# Benchmark-Easy

An easy tools for benchmark testing of [Node.js](https://nodejs.org).

## Installation

```sh
npm install benchmark-easy --save
```

## Usage

```js
const be = require('benchmark-easy')();
const times = 1000000;

const main = async () => {
    // do something
};

be.start(main, times);
```

The result will be like below:
```
Done. 1000000 times, 0.221 seconds, 4524886/s
```

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke
