import {useMutation} from 'react-query';

export const getGoogleUserInfo = async (accessToken: string) => {
	try {
		const response = await fetch(
			'https://www.googleapis.com/oauth2/v3/userinfo',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching user data:', error);
		// 오류가 발생한 경우 null 또는 다른 값을 반환할 수 있습니다.
		return null;
	}
};

export const useSignIn = () => {
	return useMutation(async (email: string) => {
		const response = await fetch('https://moapick.p-e.kr/user/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email}),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return response.json();
	});
};

export const useLogInMutation = () => {
	return useMutation(async accessToken => {
		const response = await fetch('https://moapick.p-e.kr/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return await response.json();
	});
};
