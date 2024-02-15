import {useMutation, useQuery, useQueryClient} from 'react-query';

const accessToken = localStorage.getItem('accessToken');
export const useAddArticleToServer = () => {
	const queryClient = useQueryClient();
	return useMutation(async (data: any) => {
		const response = await fetch('https://moapick.p-e.kr/article', {
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
			await queryClient.invalidateQueries(['getArticles', 'all']);
		}
		return response;
	});
};

export const useDeleteArticleFromServer = () => {
	const queryClient = useQueryClient();
	return useMutation(async (selectedIds: any) => {
		const response = await fetch(
			`https://moapick.p-e.kr/article/${selectedIds}`,
			{
				method: 'DELETE',
				body: JSON.stringify({ids: selectedIds}), // 선택된 데이터의 id를 요청 본문에 넣습니다.
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)
			.then(response => {
				if (response.status === 200) {
					console.log(`Data with IDs ${selectedIds} has been deleted.`);
					queryClient.invalidateQueries(['getArticles', 'all']);
					// 여기에서 추가적인 작업을 수행할 수 있습니다 (예: 상태 업데이트, UI 변경 등)
				} else {
					console.error('Error deleting data:', response.statusText);
				}
			})
			.catch(error => console.error('Error:', error));
	});
};

export const useModifyArticle = () => {
	const queryClient = useQueryClient();
	return useMutation(async (data: any) => {
		const response = await fetch(
			`https://moapick.p-e.kr/article/title/${data.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({title: data.title}),
			},
		);

		console.log('=>(post.ts:20response) ', response);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		} else {
			await queryClient.invalidateQueries(['getArticles', 'all']);
		}

		return await response.json();
	});
};

export const useGetAllArticle = () => {
	return useQuery<any[]>(['getArticles', 'all'], getArticle, {
		enabled: !!accessToken,
	});
};

export const getArticle = async () => {
	const response = await fetch('https://moapick.p-e.kr/article/all', {
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

export const useGetArticleById = (id: number) => {
	return useQuery<any>(['getArticles', id], () => getArticleById(id), {});
};

export const getArticleById = async (id: number) => {
	const response = await fetch(`https://moapick.p-e.kr/article/${id}`, {
		headers: {
			// Authorization 헤더에 'Bearer <액세스 토큰>' 형태로 토큰을 포함시킵니다.
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.json(); // 데이터를 반환합니다.
};
