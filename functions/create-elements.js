const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const getInventory = async () => {
	const response = await stripe.prices.list({
		expand: ['data.product'],
	});

	return response.data.filter((price) => price.active);
};

const calculatePrice = (price, quantity) => {
	return price * quantity;
};

exports.handler = async (event) => {
	const { id, quantity } = JSON.parse(event.body);
	console.log(id, quantity);
	const products = await getInventory();
	const product = products.find((p) => p.id === id);
	const currency = product.currency;
	const validateQuantity = quantity > 0 && quantity < 11 ? quantity : 1;
	console.log(product);
	const price = calculatePrice(product.unit_amount, validateQuantity);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: price,
		currency,
		automatic_payment_methods: {
			enabled: true,
		},
	});
	return {
		statusCode: 200,
		body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
	};
};
