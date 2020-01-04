
const baseTimes = require('../config').baseTimes;

let c = 0;

const main = () => {
	for (let i = 0; i < baseTimes; i ++) {
		c += i;
	}
};

module.exports = main;

