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
	return useMutation(async (accessToken: string) => {
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

export const getAccessTokenFromURL = () => {
	const queryParams = new URLSearchParams(window.location.search);
	return queryParams.get('token') || '';
};

export const removeTokenFromUrl = () => {
	const url = new URL(window.location.href); // 현재 URL을 가져옵니다.
	url.searchParams.delete('token'); // 'token' 파라미터를 제거합니다.

	// 변경된 URL로 히스토리 상태를 업데이트합니다. 페이지는 새로고침되지 않습니다.
	window.history.pushState({}, '', url);
};
