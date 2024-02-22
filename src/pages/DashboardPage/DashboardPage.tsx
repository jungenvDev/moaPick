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
import {getCookie, setCookie} from '../../util/cookie';

export const DashboardPage = () => {
	const accessToken = getCookie('accessToken');
	const [isModalOpen] = useAtom(isPostModalOpenAtom);
	const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);

	const {
		data: allArticle,
		isLoading,
		isError,
		refetch: refetchAllArticle,
	} = useGetAllArticle();
	const {data: allTags, refetch: refetchAllTags} = useGetAllTag();
	const {mutate: attachTagToArticle} = useAttachTag();

	useEffect(() => {
		// 로그인 상태 변경에 따른 데이터 재요청 로직
		const fetchData = async () => {
			await refetchAllArticle();
			await refetchAllTags();
		};

		if (accessToken) {
			fetchData();
		}
	}, [accessToken]); // 로그인 상태를 의존성 배열에 추가

	useEffect(() => {
		if (selectedTag.length === 0) return;
		selectedTag.forEach(selectedTag => {
			const tag = allTags?.find(tag => tag.title === selectedTag.name);
			console.log('=>(DashboardPage.tsx:44) tag', tag);

			if (tag) {
				attachTagToArticle({
					article_id: allArticle?.[allArticle.length - 1].id,
					tag_id: tag.id,
				});
			}
		});

		setSelectedTag([]);
	}, [allArticle, attachTagToArticle, allTags]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) {
		//localScript 삭제
		setCookie('accessToken', '', 0);
		setCookie('userData', '', 0);
		window.location.href = '/';
	}

	return (
		<>
			<Gnb />
			{isModalOpen && <PostModal />}
			<S.ContentWrapper>
				{/* 태그가 있는 기사 그룹 */}
				{allTags?.map((tag: any, index: number) => (
					<React.Fragment key={tag.id}>
						<S.Tag index={index}>{tag.title}</S.Tag>
						<S.ArticleWrapper>
							{allArticle
								?.filter(
									item => item.tags?.some((t: any) => t.title === tag.title),
								)
								.map(filteredItem => (
									<Article
										key={filteredItem.id}
										data={filteredItem}
										index={filteredItem.id}
									/>
								))}
							<FloatingButton />
						</S.ArticleWrapper>
					</React.Fragment>
				))}
				{/* 태그가 없는 기사 그룹 */}
				<S.Tag index={-1}>태그없음</S.Tag>
				<S.ArticleWrapper>
					{allArticle
						?.filter(item => !item.tags || item.tags?.length === 0)
						.map(filteredItem => (
							<Article
								key={filteredItem.id}
								data={filteredItem}
								index={filteredItem.id}
							/>
						))}
					<FloatingButton />
				</S.ArticleWrapper>
			</S.ContentWrapper>
		</>
	);
};
