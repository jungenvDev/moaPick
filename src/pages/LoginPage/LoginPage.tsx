import * as S from './LoginPage.style';
import {GoogleLoginLogo} from '../../assets/svgs/login';

export const LoginPage = () => {
	return (
		<S.LoginPageWrapper>
			<S.MoaPickLogo>모아픽 로고</S.MoaPickLogo>
			<S.LoginButtonContainer>
				<GoogleLoginLogo /> Google 계정으로 로그인
			</S.LoginButtonContainer>
		</S.LoginPageWrapper>
	);
};
