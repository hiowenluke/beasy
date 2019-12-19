
const baseTimes = 100000;

const arr = [...Array(baseTimes).keys()];
let c = 0;

const main = () => {
	arr.forEach((item, i) => {
		c += i;
	});
};

module.exports = main;
