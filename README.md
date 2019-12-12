
# Benchmark-Easy

An easy tools for benchmark testing for [Node.js](https://nodejs.org).

## Installation

```sh
npm install benchmark-easy --save
```

## Usage

### .start()

See [example](./benchmark/rpc-frameworks/dooms/index.js) to learn more.

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

Run some script(s) before do .start(). See [example](./benchmark/rpc-frameworks/dooms/index.js) to learn more.

```js
// Run a script
be.before('/path/to/server.js');
be.start(...);
```

```js
// Run several scripts
be.before(
    '/path/to/server1.js',
    '/path/to/server2.js',
);
be.start(...);
```

### .compare()

See [example](./benchmark/rpc-frameworks/index.js) to learn more.

```js
const be = require('benchmark-easy')();
const times = 1000;

be.compare([
	{
		name: 'dooms',
		before: './dooms/service',
		start: './dooms/client',
	},

	{
		name: 'gRPC-node',
		before: './gRPC-node/greeter_server',
		start: './gRPC-node/greeter_client',
	},

	{
		name: 'socket.io',
		before: './socket.io/server',
		start: './socket.io/client',
	},

	{
		name: 'dnode',
		before: './dnode/server',
		start: './dnode/client',
	}

], times);
```

Results
```sh
...
========================================
Results
========================================
gRPC-node 2844 times/sec
dooms     2684 times/sec
dnode     792  times/sec
socket.io 786  times/sec
========================================
```

## Frameworks PK

RPC frameworks

```sh
node ./benchmark/rpc-frameworks

...
========================================
Results
========================================
gRPC-node 2844 times/sec
dooms     2684 times/sec
dnode     792  times/sec
socket.io 786  times/sec
========================================
```


## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke
