
const be = require('../..')();
const baseTimes = require('./config').baseTimes; // the run times in scripts. the default value is 1
const times = 10;

be.compare(times, baseTimes);
