
const options = {
	redis: {
		host: 'localhost',
	}
};

const services = require('booms').initClient(options);
module.exports = services;
