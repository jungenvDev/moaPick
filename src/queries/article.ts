import {useMutation, useQuery} from 'react-query';

export const useAddArticleToServer = () => {
	return useMutation(async (data: any) => {
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
	});
};

export const useDeleteArticleFromServer = () => {
	return useMutation(async (selectedIds: any) => {
		const response = await fetch(`http://localhost:4000/posts/${selectedIds}`, {
			method: 'DELETE',
			body: JSON.stringify({ids: selectedIds}), // 선택된 데이터의 id를 요청 본문에 넣습니다.
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.status === 200) {
					console.log(`Data with IDs ${selectedIds} has been deleted.`);
					// 여기에서 추가적인 작업을 수행할 수 있습니다 (예: 상태 업데이트, UI 변경 등)
				} else {
					console.error('Error deleting data:', response.statusText);
				}
			})
			.catch(error => console.error('Error:', error));
	});
};

export const useUpdateArticleFromServer = () => {
	return useMutation(async (data: any) => {
		const response = await fetch(`http://localhost:4000/posts/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		console.log('=>(post.ts:20response) ', response);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return await response.json();
	});
};

export const useGetArticle = () => {
	return useQuery<any[]>('getPost', getArticle, {});
};

export const getArticle = async () => {
	const response = await fetch('http://localhost:4000/posts');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json(); // 데이터를 반환합니다.
};
