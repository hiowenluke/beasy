
const services = require('./lib/boomsClient');

const main = async () => {
	const {ben} = await services();
	const result = await ben.test();
	// console.log(result);
};

module.exports = main;
