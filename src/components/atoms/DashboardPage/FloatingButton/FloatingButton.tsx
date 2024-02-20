import {FaPlus} from 'react-icons/fa';
import * as S from './FloatingButton.style';
import {useAtom} from 'jotai';
import {
	isModifyModeAtom,
	isPostModalOpenAtom,
} from '../../../../stores/articleModalOpen';

export const FloatingButton = () => {
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [, setIsModifyMode] = useAtom(isModifyModeAtom);
	return (
		<S.FloatingButtonWrapper
			onClick={() => {
				setIsModifyMode(-1);
				setIsModalOpen(true);
			}}
		>
			<FaPlus />
		</S.FloatingButtonWrapper>
	);
};
