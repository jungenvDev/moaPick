import * as S from './Article.style';
import {
	deletedPostAtom,
	isDeleteModeAtom,
} from '../../../stores/articleModalOpen';
import {useAtom} from 'jotai';
import urlMetadata from 'url-metadata';
import {useEffect, useState} from 'react';

export const Article = ({data}: {data: any}) => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const isSelected = selectedData.some(item => item.id === data.id);

	const [metadata, setMetadata] = useState<urlMetadata.Result | null>(null);
	const fetchMetadata = async () => {
		try {
			const metadata = await urlMetadata(data.article_link);

			setMetadata(metadata);
		} catch (err) {
			console.error('Error fetching metadata:', err);
			setMetadata(null);
		}
	};
	useEffect(() => {
		fetchMetadata();
	}, [data.article_link]);

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
					: window.open(data.article_link, '_blank')
			}
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
