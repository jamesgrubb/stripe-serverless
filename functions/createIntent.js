const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prices = stripe.prices.list({
	expand: ['products-prices'],
});
exports.handler = () => {
	return {
		statusCode: 200,
		body: JSON.stringify({ prices }),
	};
};
