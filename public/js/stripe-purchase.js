const stripe = Stripe(
	'pk_test_51LDybtAMaZvK8tfum3J4bMvKVLqQxvCt2O65l2ZwoztFUHOgsnwJZylB8BS68FnEuHQvaF71bwmeeDRpEMM32dBq00DUN0m0Ab'
);

let elements;

export const handleFormSubmit = async (event) => {
	event.preventDefault();

	const form = new FormData(event.target);

	const data = {
		id: form.get('sku'),
		quantity: form.get('quantity'),
	};

	console.log(data);

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

export async function handleSubmit(e) {
	e.preventDefault();
	setLoading(true);

	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// Make sure to change this to your payment completion page
			return_url: 'http://localhost:8888/checkout.html',
		},
	});

	// This point will only be reached if there is an immediate error when
	// confirming the payment. Otherwise, your customer will be redirected to
	// your `return_url`. For some payment methods like iDEAL, your customer will
	// be redirected to an intermediate site first to authorize the payment, then
	// redirected to the `return_url`.
	if (error.type === 'card_error' || error.type === 'validation_error') {
		showMessage(error.message);
	} else {
		showMessage('An unexpected error occurred.');
	}

	setLoading(false);
}

// ------------ UI Helpers --------------------

function showMessage(messageText) {
	const messageContainer = document.querySelector('#payment-message');

	messageContainer.classList.remove('hidden');
	messageContainer.textContent = messageText;

	setTimeout(function () {
		messageContainer.classList.add('hidden');
		messageText.textContent = '';
	}, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
	if (isLoading) {
		// Disable the button and show a spinner
		document.querySelector('#submit').disabled = true;
		document.querySelector('#spinner').classList.remove('hidden');
		document.querySelector('#button-text').classList.add('hidden');
	} else {
		document.querySelector('#submit').disabled = false;
		document.querySelector('#spinner').classList.add('hidden');
		document.querySelector('#button-text').classList.remove('hidden');
	}
}
