
const me = {
	async start(func, times = 100, runs = 10) {
		console.log(`Benchmark [${times}] times [${runs}] runs.\nStarting...`);

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
		process.exit();
	},

	async runOnce(func, times) {
		const startTime = new Date().getTime();

		const run = async () => {
			return new Promise(async resolve => {

				let count = 0;
				while (++count <= times) {
					await func(count);
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
