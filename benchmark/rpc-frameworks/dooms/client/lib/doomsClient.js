
const options = {
	redis: {
		host: 'localhost',
	}
};

const services = require('dooms').initClient(options);
module.exports = services;
