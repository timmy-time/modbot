module.exports = {
	name: 'rateLimit',
	once: false,
	execute(client) {
		console.log(`You have been ratelimited.`);
	},
};