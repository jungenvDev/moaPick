import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FloatingButton} from '../../components/atoms/DashboardPage/FloatingButton/FloatingButton';
import {Post} from '../../components/molecules/Post/Post';

export const DashboardPage = () => {
	return (
		<>
			<Gnb />
			<S.DashboardWrapper>
				{/*TODO: DB에서 데이터 일정 개수 받아와서 <Post> Mapping*/}
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<FloatingButton />
			</S.DashboardWrapper>
		</>
	);
};
