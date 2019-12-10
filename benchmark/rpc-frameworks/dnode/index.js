
const fn = require('./client');
const be = require('../../..')();

be.before('./server');
be.start(fn, 2);
