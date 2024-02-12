import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FloatingButton} from '../../components/atoms/DashboardPage/FloatingButton/FloatingButton';
import {PostModal} from '../../components/organisms/PostModal/PostModal';
import {useAtom} from 'jotai';
import {isPostModalOpenAtom} from '../../stores/articleModalOpen';
import {useGetAllArticle} from '../../queries/article';
import {Article} from '../../components/molecules/Article/Article';
import React, {useEffect} from 'react';
import {useAttachTag, useGetAllTag} from '../../queries/tag';
import {selectedTagAtom} from '../../stores/tagAtom';

export const DashboardPage = () => {
	const [isModalOpen] = useAtom(isPostModalOpenAtom);
	const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
	const {data: allArticle, isLoading, isError} = useGetAllArticle();
	// const {data} = useGetArticleById('50');

	const {data: allTags} = useGetAllTag();

	const {mutate: attachTagToArticle} = useAttachTag();
	useEffect(() => {
		if (selectedTag.length === 0) return;
		selectedTag.forEach(selectedTag => {
			const tag = allTags?.find(tag => tag.title === selectedTag.name);

			if (tag) {
				attachTagToArticle({
					article_id: allArticle?.[allArticle.length - 1].id,
					tag_id: tag.id,
				});
			}
		});

		// 선택된 태그를 초기화합니다.
		setSelectedTag([]);
	}, [allArticle, attachTagToArticle, allTags]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: </div>;
	return (
		<>
			<Gnb />
			{isModalOpen && <PostModal />}
			<S.TagWrapper>
				{allTags?.map((tag: any, index: number) => (
					<React.Fragment key={tag.id}>
						<S.Tag>{tag.title}</S.Tag>
						<S.DashboardWrapper>
							{allArticle
								?.filter(
									item => item.tags?.some((t: any) => t.title === tag.title),
								)
								.map(filteredItem => (
									<Article key={filteredItem.id} data={filteredItem} />
								))}
							<FloatingButton />
						</S.DashboardWrapper>
					</React.Fragment>
				))}
				<>
					<S.Tag>태그없음</S.Tag>
					<S.DashboardWrapper>
						{allArticle
							?.filter(
								item => item.tags === undefined || item.tags?.length === 0,
							)
							.map(filteredItem => (
								<Article key={filteredItem.id} data={filteredItem} />
							))}
						<FloatingButton />
					</S.DashboardWrapper>
				</>
			</S.TagWrapper>
		</>
	);
};
