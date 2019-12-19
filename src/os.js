
const os = require('os');
const osName = require('os-name')(os.platform(), os.release());
const mac = require('macos-release');

const me = {
	getOSInfo() {
		return '' +
			'Platform info:\n' +
			this.getOSType() + ' ' + os.arch() + '\n' +
			os.cpus()[0].model + ' x ' + os.cpus().length + '\n' +
			'Total Memory ' + parseInt(os.totalmem() / (1024 * 1024 * 1024)) + ' GB' + '\n' +
			'Node.js ' + process.version + '\n' +
			'V8 ' + process.versions.v8 + '\n' +
		'';
	},

	getOSType() {
		if (osName.split(' ')[0] === 'macOS') {
			const macOs = mac();
			return 'macOS' + ' ' + macOs.name + ' ' + macOs.version;
		}
		else {
			return os.type() + ' ' + os.release();
		}
	},
};

module.exports = me;
