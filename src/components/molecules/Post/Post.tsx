import * as S from './Post.style';
import {PostType} from '../../../type/post';
import {deletedPostAtom, isDeleteModeAtom} from '../../../stores/postModalOpen';
import {useAtom} from 'jotai';

export const Post = ({data}: {data: PostType}) => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const isSelected = selectedData.some(item => item.id === data.id);

	const handlePostClick = () => {
		if (isSelected) {
			setSelectedData(selectedData.filter(item => item.id !== data.id));
		} else {
			setSelectedData([...selectedData, data]);
		}
	};
	return (
		<S.PostWrapper
			onClick={() =>
				isDeleteMode
					? setSelectedData([...selectedData, data])
					: window.open(data.link, '_blank')
			}
		>
			<S.PostOGImageWrapper>
				<S.PostOGImage src={'#'} />
			</S.PostOGImageWrapper>
			<S.PostContentWrapper>
				<S.PostTitle>{data.id}</S.PostTitle>
				<S.PostCheckboxWrapper isDeleteMode={isDeleteMode}>
					<S.PostCheckbox
						type='checkbox'
						checked={isSelected}
						onChange={handlePostClick}
					/>
				</S.PostCheckboxWrapper>
			</S.PostContentWrapper>
		</S.PostWrapper>
	);
};
