
const baseTimes = require('../config').baseTimes;

const parseMessage = (message) => {
	const pos = message.indexOf('#');
	const a = message.substr(0, pos);
	const b = message.substr(pos + 1);
	return [a, b];
};

const main = () => {
	for (let i = 0; i < baseTimes; i ++) {
		parseMessage('aaa#123')
	}
};

module.exports = main;

