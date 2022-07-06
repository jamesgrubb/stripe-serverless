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
		.catch((err) => console.err(err));

	console.log(response);

	// To-do add stripe Element
};
