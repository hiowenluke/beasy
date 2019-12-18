
const services = require('./lib/boomsClient');

const main = async () => {
	const {s1} = await services();
	const result = await s1.sayHello();
	// console.log('Greeting: ' + result);
};

module.exports = main;
// main();
