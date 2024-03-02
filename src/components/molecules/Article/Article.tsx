import * as S from './Article.style';
import {
	deletedPostAtom,
	isDeleteModeAtom,
	isModifyModeAtom,
	isPostModalOpenAtom,
} from '../../../stores/articleModalOpen';
import {useAtom} from 'jotai';
import React from 'react';
import {MdModeEdit} from 'react-icons/md';

export const Article = ({data, index}: {data: any; index: number}) => {
	const [isDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const isSelected = selectedData.some(item => item.id === data.id);
	const [, setIsModifyMode] = useAtom(isModifyModeAtom);
	const [, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const handlePostClick = () => {
		if (isSelected) {
			setSelectedData(selectedData.filter(item => item.id !== data.id));
		} else {
			setSelectedData([...selectedData, data]);
		}
	};

	return (
		<S.PostWrapper
			onClick={e => {
				e.stopPropagation();
				isDeleteMode
					? setSelectedData([...selectedData, data])
					: window.open(data.article_link, '_blank');
			}}
		>
			<S.EditButton
				onClick={(e: any) => {
					e.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 함
					setIsModifyMode(index);
					setIsModalOpen(true);
				}}
			>
				<MdModeEdit />
			</S.EditButton>
			<S.PostOGImageWrapper>
				<S.PostOGImage
					src={
						data.og_image_link === ''
							? '/image/blank-article.png'
							: data.og_image_link
					}
				/>
			</S.PostOGImageWrapper>
			<S.PostContentWrapper>
				<S.PostCheckboxWrapper isDeleteMode={isDeleteMode}>
					<S.PostCheckbox
						type='checkbox'
						checked={isSelected}
						onChange={handlePostClick}
					/>
				</S.PostCheckboxWrapper>
				<S.PostTitleWrapper>
					<S.PostTitleImage src={'image/article-title.png'} />
					<S.PostTitle>
						{data.title === '' ? data.link : data.title}
					</S.PostTitle>
				</S.PostTitleWrapper>
			</S.PostContentWrapper>
		</S.PostWrapper>
	);
};
