
const servers = require('./boomsServers');

const main = async () => {
	const {s1} = await servers('s1');
	const result = await s1.sayHello();
	// console.log('Greeting: ' + result);
};

module.exports = main;
// main();
