
const socket = require('socket.io-client')('http://localhost:3000');

const sayHello = async (...args) => {
	return new Promise(resolve => {
		socket.once('sayHello:ok', (result) => {
			resolve(result);
		});

		socket.emit('sayHello', ...args);
	})
};

const main = async () => {
	const result = await sayHello();
	// console.log('Greeting:', result);
};

module.exports = main;
// main();
