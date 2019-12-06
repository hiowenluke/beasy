
const me = {
	async start(func, maxTimes, numberOfProcesses = 10, runTimes = 100) {
		console.log(`Benchmark [${maxTimes}] times [${numberOfProcesses}] processes.\nStarting...`);

		const duringArr = [];
		const rateArr = [];

		for (let i = 0; i < runTimes; i ++) {
			const result = await this.runOnce(func, maxTimes, numberOfProcesses);
			const {during, rate} = result;
			console.log(`Run #${i + 1}: ${during} seconds, ${rate} times/sec.`);

			duringArr.push(during);
			rateArr.push(rate);
		}

		const avgDuring = (duringArr.reduce((acc, val) => acc + val) / duringArr.length).toFixed(2);
		const avgRate = (rateArr.reduce((acc, val) => acc + val) / rateArr.length).toFixed(0);

		console.log(`Done.\nAverage: ${avgDuring} seconds, ${avgRate} times/sec.`);
		process.exit();
	},

	async runOnce(func, maxTimes, numberOfProcesses) {
		let startTime;
		const averageTimes = Math.floor(maxTimes / numberOfProcesses);

		const run = async () => {
			const promises = [];

			for (let i = 0; i < numberOfProcesses; i ++) {
				const p = new Promise(async resolve => {
					setTimeout(async () => {
						startTime = new Date().getTime();

						let count = 0;
						while(++ count <= averageTimes) {
							await func(count);
						}

						resolve();
					}, 10);
				});
				promises.push(p);
			}

			return new Promise(resolve => {
				Promise.all(promises).then(values => {
					resolve();
				});
			});
		};

		await run();

		const endTime = new Date().getTime();
		const during = (endTime - startTime) / 1000;
		const rate = Math.floor(maxTimes / during);

		return {during, rate};
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
