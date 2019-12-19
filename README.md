
# Beasy

An easy tools for benchmark testing for [Node.js](https://nodejs.org).

## Install

```sh
npm install beasy --save
```

## Usage

### .start()

Create a file like below and run it. See [example](./examples/start/index.js)

```js
const be = require('beasy')();
const times = 1000000;

const main = async () => {
    // do something
};

be.start(main, times);
```

The result will be like below:
```sh
Benchmarking [1000000] times, [10] runs.
Starting...
Run #1: 0.311 seconds, 3215434 times/sec.
Run #2: 0.413 seconds, 2421307 times/sec.
Run #3: 0.3 seconds, 3333333 times/sec.
Run #4: 0.475 seconds, 2105263 times/sec.
Run #5: 0.238 seconds, 4201680 times/sec.
Run #6: 0.203 seconds, 4926108 times/sec.
Run #7: 0.184 seconds, 5434782 times/sec.
Run #8: 0.194 seconds, 5154639 times/sec.
Run #9: 0.171 seconds, 5847953 times/sec.
Run #10: 0.208 seconds, 4807692 times/sec.
Done.
Average: 0.27 seconds, 4144819 times/sec.
----------------------------------------
Platform info:
macOS Mojave 10.14 x64
Intel(R) Core(TM) i7-4558U CPU @ 2.80GHz x 4
Total Memory 16 GB
Node.js v10.16.3
V8 6.8.275.32-node.54
```


### .before()

Run some script(s) before do .start(). See [example](./examples/before/index.js)

```js
// Run a script
be.before('/path/to/server.js');
be.start(...);
```
Or
```js
// Run several scripts
be.before(
    '/path/to/server1.js',
    '/path/to/server2.js',
);
be.start(...);
```

### .compare()

Run a set of scripts and compare the results. See [example](./examples/compare/index.js)

```js
const be = require('beasy')();
const baseTimes = 100000; // the run times in scripts. the default value is 1
const times = 10;

be.compare([
	'for-loop',
	'forEach',
], times, baseTimes);
```

Compare results
```sh
...
========================================
Results
========================================
for-loop 30410000 times/sec
forEach  17450000 times/sec
========================================
Platform info:
macOS Mojave 10.14 x64
Intel(R) Core(TM) i7-4558U CPU @ 2.80GHz x 4
Total Memory 16 GB
Node.js v10.16.3
V8 6.8.275.32-node.54
```


## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke
