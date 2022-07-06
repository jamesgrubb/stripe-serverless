import { prices } from './data/prices';

exports.handler = () => {
	return {
		statusCode: 200,
		body: JSON.stringify({ prices }),
	};
};
