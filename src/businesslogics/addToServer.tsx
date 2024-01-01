export const addDataToServer = async (data: any) => {
	try {
		const response = await fetch('http://localhost:4000/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};
