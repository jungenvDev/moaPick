import * as S from './Post.style';

export const Post = () => {
	return (
		<S.PostWrapper>
			<S.PostOGImageWrapper>
				<S.PostOGImage src={'#'} />
			</S.PostOGImageWrapper>
			<S.PostContentWrapper>
				<S.PostTitle>제목은 두줄까지만 표시되고 그 이후는 ...으로 표시됩니다.제목은 두줄까지만</S.PostTitle>
			</S.PostContentWrapper>
		</S.PostWrapper>
	);
};
