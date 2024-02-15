import {Gnb} from '../../components/molecules/Gnb/Gnb';
import * as S from './DashboardPage.style';
import {FloatingButton} from '../../components/atoms/DashboardPage/FloatingButton/FloatingButton';
import {PostModal} from '../../components/organisms/PostModal/PostModal';
import {useAtom} from 'jotai';
import {
	isModifyModeAtom,
	isPostModalOpenAtom,
} from '../../stores/articleModalOpen';
import {useGetAllArticle} from '../../queries/article';
import {Article} from '../../components/molecules/Article/Article';
import React, {useEffect, useRef, useState} from 'react';
import {useAttachTag, useGetAllTag} from '../../queries/tag';
import {selectedTagAtom} from '../../stores/tagAtom';

export const DashboardPage = () => {
	const [isModalOpen, setIsModalOpen] = useAtom(isPostModalOpenAtom);
	const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
	const [isModifyMode, setIsModifyMode] = useAtom(isModifyModeAtom);
	// const {data} = useGetArticleById('50');
	const {data: allArticle, isLoading, isError} = useGetAllArticle();
	const {data: allTags} = useGetAllTag();
	const {mutate: attachTagToArticle} = useAttachTag();
	const longTapTimeoutRef = useRef<number | null>(null);
	const [longTapIndex, setLongTapIndex] = useState<number | null>(null);
	const handleLongTapStart = (articleId: number) => {
		// setTimeout 호출 시 반환되는 타이머 ID를 useRef에 저장
		longTapTimeoutRef.current = window.setTimeout(() => {
			setLongTapIndex(articleId);
		}, 500);
	};

	const handleLongTapEnd = () => {
		// clearTimeout에 타이머 ID를 전달하여 타이머를 취소
		if (longTapTimeoutRef.current !== null) {
			clearTimeout(longTapTimeoutRef.current);
			longTapTimeoutRef.current = null;
		}
	};
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
						<S.Tag index={index}>{tag.title}</S.Tag>
						<S.DashboardWrapper>
							{allArticle
								?.filter(
									item => item.tags?.some((t: any) => t.title === tag.title),
								)
								.map(filteredItem => (
									<>
										<Article
											key={filteredItem.id}
											data={filteredItem}
											index={index}
											handleLongTapStart={() =>
												handleLongTapStart(filteredItem.id)
											}
											handleLongTapEnd={handleLongTapEnd}
										/>
										{longTapIndex === filteredItem.id && (
											<S.ArticleButtonWrapper>
												<S.ModifyArticleButton
													onClick={() => {
														setIsModalOpen(true);
														setIsModifyMode(filteredItem.id);
													}}
												>
													수정
												</S.ModifyArticleButton>
												<S.DeleteArticleButton>삭제</S.DeleteArticleButton>
											</S.ArticleButtonWrapper>
										)}
									</>
								))}
							<FloatingButton />
						</S.DashboardWrapper>
					</React.Fragment>
				))}
				<>
					<S.Tag index={-1}>태그없음</S.Tag>
					<S.DashboardWrapper>
						{allArticle
							?.filter(
								item => item.tags === undefined || item.tags?.length === 0,
							)
							.map(filteredItem => (
								<Article
									key={filteredItem.id}
									data={filteredItem}
									index={-1}
									handleLongTapStart={() => handleLongTapStart(filteredItem.id)}
									handleLongTapEnd={handleLongTapEnd}
								/>
							))}
						<FloatingButton />
					</S.DashboardWrapper>
				</>
			</S.TagWrapper>
		</>
	);
};
