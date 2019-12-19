
const be = require('../..')();
const fn = require('./client');

be.before('./server');
be.start(fn, 10000);
