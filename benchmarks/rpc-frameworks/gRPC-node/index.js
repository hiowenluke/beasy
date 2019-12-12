
const be = require('../../..')();
const fn = require('./greeter_client');

be.before('./greeter_server');
be.start(fn, 1000);
