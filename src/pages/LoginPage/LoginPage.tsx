import * as S from './LoginPage.style';
import {GoogleLoginLogo} from '../../assets/svgs/login';
import {useAtom} from 'jotai';
import {isUserLoggedInAtom, userAtom} from '../../stores/googleLogin';
import {useGoogleLogin} from '@react-oauth/google';
import {
	getAccessTokenFromURL,
	getGoogleUserInfo,
	useLogInMutation,
	useSignIn,
} from '../../queries/auth';
import {useEffect} from 'react';
import {getCookie, setCookie} from '../../util/cookie';

export const LoginPage = () => {
	const [, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
	const [, setUserData] = useAtom(userAtom);
	const {mutate: signIn} = useSignIn();
	const logInMutation = useLogInMutation();

	const mobileAccessToken = getAccessTokenFromURL();
	const login = useGoogleLogin({
		onSuccess: async tokenResponse => {
			if (tokenResponse.access_token) {
				const userData = await getGoogleUserInfo(tokenResponse.access_token);
				signIn(userData.email, {
					onSuccess: response => {
						// 로컬 스토리지에 access_token 저장
						setCookie(
							'accessToken',
							response.access_token ?? mobileAccessToken,
							7,
						); // 토큰을 7일 동안 유효한 쿠키로 설정
						logInMutation.mutate(response.access_token ?? mobileAccessToken, {
							onSuccess: data => {
								setIsUserLoggedIn(true);
								setUserData(data);
								// 로컬 스토리지에 사용자 데이터 저장 (예: JSON 형태로)
								setCookie('userData', JSON.stringify(data), 7);
							},
							onError: error => {
								console.error('로그인 오류', error);
							},
						});
					},
					onError: error => {
						console.error('로그인 오류', error);
					},
				});
			}
		},
		onError: () => console.log('로그인 실패'),
	});

	// 애플리케이션 로드 시 로그인 상태 확인
	useEffect(() => {
		const token = getCookie('accessToken');
		const userDataString = getCookie('userData');
		if (token) {
			// 로컬 스토리지에서 토큰을 가져와서 로그인 상태 유지
			const userData = userDataString;
			if (userData) {
				setIsUserLoggedIn(true);
				setUserData(userData);
			}
		}
	}, []);
	return (
		<S.LoginPageWrapper>
			<S.MoaPickLogo src={'/image/logo.png'} />
			<S.LoginButtonContainer onClick={() => login()}>
				<GoogleLoginLogo /> Google 계정으로 로그인
			</S.LoginButtonContainer>
		</S.LoginPageWrapper>
	);
};
