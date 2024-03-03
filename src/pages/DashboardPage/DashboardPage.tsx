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
import {getAccessTokenFromURL, useLogInMutation} from '../../queries/auth';
import {isUserLoggedInAtom, userAtom} from '../../stores/googleLogin';

export const DashboardPage = () => {
	const accessToken = getCookie('accessToken');
	const [isModalOpen] = useAtom(isPostModalOpenAtom);
	const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
	const [, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
	const [, setUserData] = useAtom(userAtom);
	const {
		data: allArticle,
		isLoading,
		isError,
		refetch: refetchAllArticle,
	} = useGetAllArticle();

	const {data: allTags, refetch: refetchAllTags} = useGetAllTag();
	const {mutate: attachTagToArticle} = useAttachTag();
	const logInMutation = useLogInMutation();
	const mobileAccessToken = getAccessTokenFromURL();
	useEffect(() => {
		setCookie('accessToken', mobileAccessToken, 7); // 토큰을 7일 동안 유효한 쿠키로 설정
		logInMutation.mutate(mobileAccessToken, {
			onSuccess: data => {
				setIsUserLoggedIn(true);
				setUserData(data);
				// 로컬 스토리지에 사용자 데이터 저장 (예: JSON 형태로)
				setCookie('userData', JSON.stringify(data), 7);
			},
		});
	}, []);

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
			//TODO: 태그 삭제 기능 수정(찾기 힘들다고함)

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
		//로그인이 필요합니다 alert
		alert('로그인이 필요합니다.');
		//localScript 삭제
		setCookie('accessToken', '', 0);
		setCookie('userData', '', 0);
		window.location.href = '/';
	}

	return (
		<S.DashboardPageWrapper>
			{!mobileAccessToken && <Gnb />}
			{isModalOpen && <PostModal />}
			<S.ContentWrapper mobileAccessToken={mobileAccessToken}>
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
				{/* 태그가 없는 그룹 */}
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
		</S.DashboardPageWrapper>
	);
};
