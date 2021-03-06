
const spawn = require('child_process').spawn;
const caller = require('caller');
const path = require('path');
const Table = require('cli-table');
const myOs = require('./os');

let cps = [];
let baseTimes = 1;
let waitTime = 3; // seconds

let isDidBefore;
let isCompare;

const wait = (ms = 1000) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};

const sleep = (seconds) => {
	var waitTill = new Date(new Date().getTime() + seconds * 1000);
	while(waitTill > new Date()){}
};

const killByPid = (pid) => {
	if (!pid) return;

	try {
		if (/^win/.test(process.platform)) {
			spawn("taskkill", ["/PID", pid, "/T", "/F"]);
		}
		else {
			process.kill(pid, 'SIGTERM');
		}
	}
	catch(e) {
		// console.log(e);
	}
};

const compare = (p) => {
	return (m,n) =>{
		return n[p] - m[p];
	}
};

const print = {
	breakLine(char = '-', length = 40) {
		const breakLine = char.repeat(length);
		console.log(breakLine);
	},

	title(topic, char, length) {
		this.breakLine(char, length);
		console.log(topic);
		this.breakLine(char, length);
	},

	table(name, data) {
		this.title(name, '=');

		const table = new Table({
			chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
				, 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
				, 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
				, 'right': '' , 'right-mid': '' , 'middle': ' ' },
			style: { 'padding-left': 0, 'padding-right': 0 }
		});

		data.forEach(result => {
			const {name, avgRate} = result;
			table.push([name, avgRate, 'times/sec']);
		});

		console.log(table.toString());
		this.breakLine('=');
	}
};

const me = {
	async compare(defs, times, bTimes = 1, runs, _waitTime) {
		if (!defs.length) return;

		const pathToCaller = caller();
		const root = path.resolve(pathToCaller, '..');

		baseTimes = bTimes;
		isCompare = 1;
		waitTime = _waitTime;

		// ['for-loop'] => [{name: 'for-loop', start: './for-loop'}]
		if (typeof defs[0] === 'string') {
			defs = defs.map(item => {
				return {name: item, start: './' + item}
			});
		}

		const results = [];
		for (let i = 0; i < defs.length; i ++) {
			const def = defs[i];
			const {name, before, start} = def;

			print.title(name);

			if (before) {
				let beforeScripts = Array.isArray(before) ? before : [before];

				// Convert the relative path of script to absolute path
				beforeScripts = beforeScripts.map(script =>
					script.substr(0, 1) === '/' ? script : path.resolve(root, script)
				);

				this.before(...beforeScripts);
			}

			let fn = start;
			if (typeof fn === 'string') {
				let filePath = fn;
				if (filePath.substr(0, 1) === '.') {
					filePath = path.resolve(root, filePath);
				}

				fn = require(filePath);
			}

			const result = await this.start(fn, times, runs);
			result.name = name;
			results.push(result);

			await wait(1000);
		}

		results.sort(compare("avgRate"));
		print.table('Results', results);

		console.log(myOs.getOSInfo());
		process.exit();
	},

	before(...scripts) {
		if (!scripts.length) return;

		const _waitTime = scripts[scripts.length - 1];
		if (typeof _waitTime === 'number') {
			scripts.pop();
			waitTime = _waitTime;
		}

		console.log(`Running scripts...`);

		const pathToCaller = caller();
		const root = path.resolve(pathToCaller, '..');

		cps = [];

		for (let i = 0; i < scripts.length; i ++) {
			const script = scripts[i];
			const filePath = script.substr(0, 1) === '/' ? script : root + '/' + script;

			const cp = spawn('node', [filePath]);
			cps.push(cp);
		}

		isDidBefore = 1;

		sleep(waitTime);
	},

	async start(func, times, runs) {
		times = times || 100;
		runs = runs || 10;

		try {

			// Waiting for the scripts starting
			isDidBefore && await wait();

			console.log(`Benchmarking [${times}] times, [${runs}] runs.\nStarting...`);

			const duringArr = [];
			const rateArr = [];

			for (let i = 0; i < runs; i ++) {
				const result = await this.runOnce(func, times);
				let {during, rate} = result;
				rate *= baseTimes;

				console.log(`Run #${i + 1}: ${during} seconds, ${rate} times/sec`);

				duringArr.push(during);
				rateArr.push(rate);
			}

			const avgDuring = (duringArr.reduce((acc, val) => acc + val) / duringArr.length).toFixed(2);
			const avgRate = (rateArr.reduce((acc, val) => acc + val) / rateArr.length).toFixed(0);

			console.log(`Done.\nAverage: ${avgDuring} seconds, ${avgRate} times/sec`);

			// Exit all child processes
			cps.forEach(cp => killByPid(cp.pid));

			if (isCompare) {
				return {avgDuring, avgRate};
			}
			else {
				print.breakLine();
				console.log(myOs.getOSInfo());
				process.exit();
			}
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
