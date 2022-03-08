export const generateRandomString = (length: number) => {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';
	return Array(length)
		.fill('')
		.map(_ => {
			const set = Math.random() < 0.5 ? chars : numbers;
			return set[~~(Math.random() * set.length)];
		})
		.join('');
};

export const uid = () => generateRandomString(20);
