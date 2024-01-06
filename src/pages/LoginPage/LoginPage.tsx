import * as S from './LoginPage.style';
import {GoogleLoginLogo} from '../../assets/svgs/login';
import {useGoogleLogin} from '@react-oauth/google';
import {useAtom} from 'jotai';
import {isUserLoggedInAtom} from '../../stores/googleLogin';
import {getGoogleUserInfo} from '../../businesslogics/useGetGoogleUserInfo';

export const LoginPage = () => {
	const [, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
	const login = useGoogleLogin({
		onSuccess: tokenResponse => {
			if (tokenResponse.access_token) {
				setIsUserLoggedIn(true);
				getGoogleUserInfo(tokenResponse.access_token);
			}
		},
		onError: () => console.log('로그인 실패'),
	});

	return (
		<S.LoginPageWrapper>
			<S.MoaPickLogo>모아픽 로고</S.MoaPickLogo>
			<S.LoginButtonContainer onClick={() => login()}>
				<GoogleLoginLogo /> Google 계정으로 로그인
			</S.LoginButtonContainer>
		</S.LoginPageWrapper>
	);
};
