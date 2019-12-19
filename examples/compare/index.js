
const be = require('../..')();

const baseTimes = 100000; // the run times in scripts. the default value is 1
const times = 10;

be.compare([
	'for-loop',
	'forEach',
], times, baseTimes);
