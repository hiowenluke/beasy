
const baseTimes = require('../config').baseTimes;

const arr = [...Array(baseTimes).keys()];
let c = 0;

const main = () => {
	arr.forEach((item, i) => {
		c += i;
	});
};

module.exports = main;
