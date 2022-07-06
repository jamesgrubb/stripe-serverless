export const handlePaymentFormSubmit = async () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event);
	};
	// console.log(event);
	document
		.querySelector('#payment-form')
		.addEventListener('submit', (event) => {
			console.log(e);
		});
};
