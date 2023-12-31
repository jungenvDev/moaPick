import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FloatingButton} from '../../components/atoms/DashboardPage/FloatingButton/FloatingButton';

export const DashboardPage = () => {
	return (
		<>
			<Gnb />
			<S.DashboardWrapper>
				<FloatingButton />
			</S.DashboardWrapper>
		</>
	);
};
