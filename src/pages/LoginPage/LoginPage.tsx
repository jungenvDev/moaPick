import * as S from './LoginPage.style';
import {GoogleLoginLogo} from '../../assets/svgs/login';
import {useGoogleLogin} from '@react-oauth/google';
import {useAtom} from 'jotai';
import {isUserLoggedInAtom} from '../../stores/googleLogin';

export const LoginPage = () => {
	const [, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
	const login = useGoogleLogin({
		onSuccess: tokenResponse => {
			console.log('=>(LoginPage.tsx:16) login', tokenResponse);

			tokenResponse.access_token && setIsUserLoggedIn(true);
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
