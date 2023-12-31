import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FaPlus} from 'react-icons/fa';
export const DashboardPage = () => {
	return (
		<>
			<Gnb />
			<S.DashboardWrapper>
				<S.FloatingButtonWrapper>
					<FaPlus />
				</S.FloatingButtonWrapper>
			</S.DashboardWrapper>
		</>
	);
};
