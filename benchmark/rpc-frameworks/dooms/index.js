
const be = require('../../..')();
const fn = require('./client');

be.before('./service');
be.start(fn, 1000);
