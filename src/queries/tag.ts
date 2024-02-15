import {useMutation, useQuery, useQueryClient} from 'react-query';

const accessToken = localStorage.getItem('accessToken');

export const useAddTags = () => {
	const queryClient = useQueryClient();
	return useMutation(async (data: any) => {
		const response = await fetch('https://moapick.p-e.kr/tag', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		} else {
			await queryClient.invalidateQueries(['getTags', 'all']);
		}
		return response;
	});
};

export const useDeleteTag = () => {
	const queryClient = useQueryClient();
	return useMutation(
		async (tagId: number) => {
			const response = await fetch(`https://moapick.p-e.kr/tag/${tagId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
		},
		{
			onSuccess: () => {
				// 삭제 작업이 성공적으로 완료된 후에 getTags 쿼리를 무효화합니다.
				queryClient.invalidateQueries(['getTags', 'all']);
			},
		},
	);
};

export const useGetAllTag = () => {
	return useQuery<any[]>(['getTags', 'all'], getTags, {
		enabled: !!accessToken,
		onError: error => {
			console.log('=>(tag.ts:52) error', error);
		},
	});
};

export const getTags = async () => {
	const response = await fetch('https://moapick.p-e.kr/tag/all', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json(); // 데이터를 반환합니다.
};

export const useAttachTag = () => {
	const queryClient = useQueryClient();
	return useMutation(
		async (data: any) => {
			const response = await fetch('https://moapick.p-e.kr/tag/attach', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(data),
			});

			console.log('=>(tag.ts:85) response', response);
			return response;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['getArticles', 'all']);
			},
		},
	);
};

export const useDetachTag = () => {
	const queryClient = useQueryClient();
	return useMutation(async (data: any) => {
		const response = await fetch('https://moapick.p-e.kr/tag/detach', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(data),
		});

		console.log('=>(tag.ts:99) response', response);
		return response;
	});
};
