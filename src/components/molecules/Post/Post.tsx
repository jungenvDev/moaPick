import * as S from './Post.style';
import {PostType} from '../../../type/post';

export const Post = ({data}: {data: PostType}) => {
	return (
		<S.PostWrapper>
			<S.PostOGImageWrapper>
				<S.PostOGImage src={'#'} />
			</S.PostOGImageWrapper>
			<S.PostContentWrapper>
				<S.PostTitle>
					{data.link} and {data.tag}
				</S.PostTitle>
			</S.PostContentWrapper>
		</S.PostWrapper>
	);
};
