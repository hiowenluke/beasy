
const dnode = require('dnode');

const sayHello = async (username) => {
	return new Promise(resolve => {
		dnode.connect(7070, function (remote, conn) {
			remote.sayHello(username, function (result) {
				conn.end();
				resolve(result);
			});
		});
	});
};

const main = async () => {
	const result = await sayHello();
	// console.log('Greeting:', result);
};

module.exports = main;
// main();
