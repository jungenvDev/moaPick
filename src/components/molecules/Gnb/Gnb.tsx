import * as S from './Gnb.style';
import {IoMdMore} from 'react-icons/io';
import {useAtom} from 'jotai';
import {
	deletedPostAtom,
	isDeleteModeAtom,
} from '../../../stores/articleModalOpen';
import {
	useDeleteArticleFromServer,
	useGetAllArticle,
} from '../../../queries/article';
import {useEffect, useRef, useState} from 'react';
import {setCookie} from '../../../util/cookie';
import {userAtom} from '../../../stores/googleLogin';

export const Gnb = () => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const [userData] = useAtom(userAtom);
	const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
	const logoutRef = useRef<HTMLButtonElement>(null);
	const {refetch} = useGetAllArticle();
	const {mutate: deleteDataMutation} = useDeleteArticleFromServer();

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (logoutRef.current && !logoutRef.current.contains(event.target)) {
				setShowLogoutDropdown(false); // 로그아웃 버튼의 외부 클릭 시 드롭다운 숨김
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// 컴포넌트 언마운트 시 이벤트 리스너 제거
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [logoutRef]);

	function handleLogout() {
		//localScript 삭제
		setCookie('accessToken', '', 0);
		setCookie('userData', '', 0);
		window.location.href = '/';
	}

	function handleDeleteClick() {
		if (selectedData.length <= 0) {
			//TODO: 토스트 메시지로 변경
			alert('삭제할 데이터가 없습니다.');
		} else {
			setIsDeleteMode(false);
			selectedData.map((item: any) => {
				const selectedIds = item.id;
				deleteDataMutation(selectedIds, {
					onSuccess: () => {
						setSelectedData([]);
						refetch();
					},
				});
			});
		}
	}

	return (
		<>
			<S.GnbWrapper>
				<S.GnbLogo src={'/image/gnb-logo.png'} />
				<S.ButtonWrapper>
					{/*TODO: 삭제할 데이터가 없을 때는 모드 전환X, 토스트 메시지*/}
					{isDeleteMode ? (
						<>
							<S.Button onClick={() => handleDeleteClick()}>삭제</S.Button>
							<S.Button onClick={() => setIsDeleteMode(false)}>취소</S.Button>
						</>
					) : (
						<S.DeleteIcon
							src={'/image/trash.png'}
							onClick={() => {
								setIsDeleteMode(true);
							}}
						/>
					)}
					<IoMdMore
						onClick={() => {
							setShowLogoutDropdown(!showLogoutDropdown);
						}}
					/>
					{showLogoutDropdown && (
						<S.LogoutButton ref={logoutRef}>
							{/*<S.HelloUser>*/}
							{/*	안녕하세요! <br /> {userData.email}님!*/}
							{/*</S.HelloUser>*/}
							<button onClick={handleLogout}>로그아웃</button>
						</S.LogoutButton>
					)}
				</S.ButtonWrapper>
			</S.GnbWrapper>
		</>
	);
};
