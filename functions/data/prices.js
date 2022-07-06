const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const prices = async () => {
	const prices = await stripe.list.prices({
		expand: ['product-items'],
	});
	return prices;
};
