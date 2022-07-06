// import { handlePaymentFormSubmit } from './handle-payment-form-submit.js';
const stripe = Stripe(
	'pk_test_51LDybtAMaZvK8tfum3J4bMvKVLqQxvCt2O65l2ZwoztFUHOgsnwJZylB8BS68FnEuHQvaF71bwmeeDRpEMM32dBq00DUN0m0Ab'
);

export const handleFormSubmit = async (event) => {
	event.preventDefault();

	const form = new FormData(event.target);

	const data = {
		id: form.get('sku'),
		quantity: form.get('quantity'),
	};

	console.log(data);

	document
		.querySelector('#payment-form')
		.addEventListener('submit', handlePaymentFormSubmit(event, ''));

	let elements;

	const response = await fetch('/.netlify/functions/create-elements', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));

	console.log(
		'🚀 ~ file: stripe-purchase.js ~ line 24 ~ handleFormSubmit ~ response',
		response
	);
	const { clientSecret } = response;
	const appearance = {
		theme: 'stripe',
	};
	elements = stripe.elements({ appearance, clientSecret });
	const paymentElement = elements.create('payment');
	paymentElement.mount('#payment-element');
	// To-do add stripe Element
};
