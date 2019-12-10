
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', () => {
	// console.log('connected');
});

socket.on('disconnect', () => {});

const foo = async (...args) => {
	return new Promise(resolve => {
		socket.once('sayHi:ok', (result) => {
			resolve(result);
		});

		socket.emit('sayHi', ...args);
	})
};

const main = async (times = 0) => {
	const result = await foo('hello', 'world');
	times <= 10 && console.log(result);
};

module.exports = main;
// main();
