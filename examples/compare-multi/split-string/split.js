
const baseTimes = require('../config').baseTimes;

const parseMessage = (message) => {
	let [a, b] = message.split('#');
	return [a, b];
};

const main = () => {
	for (let i = 0; i < baseTimes; i ++) {
		parseMessage('aaa#123')
	}
};

module.exports = main;
