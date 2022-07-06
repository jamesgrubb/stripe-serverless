const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const getPrices = async () => {
	const response = await stripe.prices.list({
		expand: ['data.product'],
	});

	return response.data.filter((price) => price.active);
};
exports.handler = async () => {
	const prices = await stripe.prices.list({
		expand: ['data.product'],
	});
	return {
		statusCode: 200,
		body: JSON.stringify(await getPrices()),
	};
};
