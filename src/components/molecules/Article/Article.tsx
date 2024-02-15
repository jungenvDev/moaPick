import * as S from './Article.style';
import {
	deletedPostAtom,
	isDeleteModeAtom,
} from '../../../stores/articleModalOpen';
import {useAtom} from 'jotai';
import React, {useRef} from 'react';

export const Article = ({
	data,
	index,
	handleLongTapStart,
	handleLongTapEnd,
}: {
	data: any;
	index: number;
	handleLongTapStart: (index: number) => void;
	handleLongTapEnd: () => void;
}) => {
	const [isDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const isSelected = selectedData.some(item => item.id === data.id);
	const longTapTimeoutRef = useRef<number | null>(null);
	const handlePostClick = () => {
		if (isSelected) {
			setSelectedData(selectedData.filter(item => item.id !== data.id));
		} else {
			setSelectedData([...selectedData, data]);
		}
	};

	return (
		<S.PostWrapper
			onMouseDown={() => handleLongTapStart(index)}
			onMouseUp={() => handleLongTapEnd()}
			onTouchStart={() => handleLongTapStart(index)}
			onTouchEnd={() => handleLongTapEnd()}
			onClick={e => {
				e.stopPropagation();
				isDeleteMode
					? setSelectedData([...selectedData, data])
					: window.open(data.article_link, '_blank');
			}}
		>
			<S.PostOGImageWrapper>
				<S.PostOGImage src={data.og_image_link ?? '#'} />
			</S.PostOGImageWrapper>
			<S.PostContentWrapper>
				<S.PostCheckboxWrapper isDeleteMode={isDeleteMode}>
					<S.PostCheckbox
						type='checkbox'
						checked={isSelected}
						onChange={handlePostClick}
					/>
				</S.PostCheckboxWrapper>
				<S.PostTitle>{data.title}</S.PostTitle>
			</S.PostContentWrapper>
		</S.PostWrapper>
	);
};
