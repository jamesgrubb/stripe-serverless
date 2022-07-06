const createProductFromTemplate = (item) => {
	const template = document.querySelector('#product');
	const product = template.content.cloneNode(true);

	product.querySelector('h2').innerText = item.product.name;
	product.querySelector('.description').innerText = item.product.description;
	product.querySelector('[name=sku]').innerText = item.id;
	product.querySelector('.price').innerText = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: item.currency,
	}).format((item.unit_amount / 100).toFixed(2));

	return product;
};

export const loadProducts = async () => {
	const data = await fetch('/.netlify/functions/createIntent')
		.then((res) => res.json())
		.catch((err) => console.err(err));

	const products = document.querySelector('.products');
	// const pre = document.createElement('pre');
	// pre.innerText = JSON.stringify(data, null, 2);
	// products.appendChild(pre);

	data.forEach((item) => {
		const product = createProductFromTemplate(item);
		products.appendChild(product);
	});
};
