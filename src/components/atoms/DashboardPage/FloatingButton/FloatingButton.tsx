import {FaPlus} from 'react-icons/fa';
import * as S from './FloatingButton.style';
import {useAtom} from 'jotai';
import {isPostModalOpenAtom} from '../../../../stores/postModalOpen';

export const FloatingButton = () => {
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	return (
		<S.FloatingButtonWrapper
			onClick={() => {
				setIsModalOpen(true);
			}}
		>
			<FaPlus />
		</S.FloatingButtonWrapper>
	);
};
