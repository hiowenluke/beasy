
# Benchmark-Easy

An easy tools for benchmark testing for [Node.js](https://nodejs.org).

## Installation

```sh
npm install benchmark-easy --save
```

## Usage

### .start()

Create a file like below and run it:

```js
const be = require('benchmark-easy')();
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
```


### .before()

Run some script(s) before do .start(). See [this file](./benchmark/rpc-frameworks/booms/index.js) to learn more.

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

See "[./benchmark/rpc-frameworks/index.js](./benchmark/rpc-frameworks/index.js)" to learn more.
```js
const be = require('benchmark-easy')();
const times = 1000;

be.compare([
    {
        name: 'booms',
        before: './booms/server',
        start: './booms/client',
    },

    {
        name: 'gRPC-node',
        before: './gRPC-node/server',
        start: './gRPC-node/client',
    },

    ...
], times);
```

## RPC framework PK

Run
```sh
node ./benchmark/rpc-frameworks
```

Results
```sh
...
========================================
Results
========================================
gRPC-node 2844 times/sec
booms     2684 times/sec
dnode     792  times/sec
socket.io 786  times/sec
========================================
```


## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke
