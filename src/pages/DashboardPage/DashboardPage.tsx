import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FloatingButton} from '../../components/atoms/DashboardPage/FloatingButton/FloatingButton';
import {Post} from '../../components/molecules/Post/Post';
import {PostModal} from '../../components/organisms/PostModal/PostModal';
import {useAtom} from 'jotai/index';
import {isPostModalOpenAtom} from '../../stores/postModalOpen';
import {useEffect} from 'react';
import {postsAtom} from '../../stores/post';
import {PostType} from '../../type/post';

export const DashboardPage = () => {
	const [isModalOpen] = useAtom(isPostModalOpenAtom);
	const [data, setData] = useAtom(postsAtom);

	useEffect(() => {
		fetch('http://localhost:4000/posts')
			.then(response => response.json())
			.then(data => setData(data))
			.catch(error => console.error('Error fetching data:', error));
	}, [setData]);

	return (
		<>
			<Gnb />
			{isModalOpen && <PostModal />}
			<S.DashboardWrapper>
				{data.map((item: PostType) => (
					<Post key={item.id} data={item} />
				))}

				<FloatingButton />
			</S.DashboardWrapper>
		</>
	);
};
