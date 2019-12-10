
const spawn = require('child_process').spawn;
const caller = require('caller');
const path = require('path');

let cps = [];
let isDidBefore;

const wait = async (ms = 1000) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};

const killByPid = (pid) => {
	if (/^win/.test(process.platform)) {
		spawn("taskkill", ["/PID", pid, "/T", "/F"]);
	}
	else {
		process.kill(pid, 'SIGTERM');
	}
};

const me = {
	before(...scripts) {
		if (!scripts.length) return;
		console.log(`Running scripts...`);

		const pathToCaller = caller();
		const root = path.resolve(pathToCaller, '..');

		for (let i = 0; i < scripts.length; i ++) {
			const script = scripts[i];
			const filePath = script.substr(0, 1) === '/' ? script : root + '/' + script;

			setTimeout(() => {
				const cp = spawn('node', [filePath]);
				cps.push(cp);
			}, 10);
		}

		isDidBefore = 1;
	},

	async start(func, times = 100, runs = 10) {
		try {

			// Waiting for the scripts starting
			isDidBefore && await wait();

			console.log(`Benchmarking [${times}] times, [${runs}] runs.\nStarting...`);

			const duringArr = [];
			const rateArr = [];

			for (let i = 0; i < runs; i ++) {
				const result = await this.runOnce(func, times);
				const {during, rate} = result;
				console.log(`Run #${i + 1}: ${during} seconds, ${rate} times/sec.`);

				duringArr.push(during);
				rateArr.push(rate);
			}

			const avgDuring = (duringArr.reduce((acc, val) => acc + val) / duringArr.length).toFixed(2);
			const avgRate = (rateArr.reduce((acc, val) => acc + val) / rateArr.length).toFixed(0);

			console.log(`Done.\nAverage: ${avgDuring} seconds, ${avgRate} times/sec.`);

			// Exit all child processes
			cps.forEach(cp => killByPid(cp.pid));

			process.exit();
		}
		catch(e) {
			console.log(e);
		}
	},

	async runOnce(func, times) {
		const startTime = new Date().getTime();

		const run = async () => {
			return new Promise(async resolve => {
				let count = 0;
				while (++count <= times) {
					await func(times, count);
				}

				resolve();
			});
		};

		await run();

		const endTime = new Date().getTime();
		const during = (endTime - startTime) / 1000 || 1;
		const rate = Math.floor(times / during);

		return {during, rate};
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
