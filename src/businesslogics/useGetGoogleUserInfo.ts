export const getGoogleUserInfo = async (accessToken: string) => {
	fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(userData => {
			console.log(userData);
			// 여기에서 사용자 데이터를 처리할 수 있습니다.
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
		});
};
