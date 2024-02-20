import * as S from './Gnb.style';
import {FaRegTrashCan} from 'react-icons/fa6';
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

export const Gnb = () => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);
	const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
	const logoutRef = useRef<HTMLButtonElement>(null);
	const {refetch} = useGetAllArticle();
	const {mutate: deleteDataMutation} = useDeleteArticleFromServer();

	useEffect(() => {
		// 외부 클릭을 감지하는 함수
		function handleClickOutside(event: any) {
			if (logoutRef.current && !logoutRef.current.contains(event.target)) {
				setShowLogoutDropdown(false); // 로그아웃 버튼의 외부 클릭 시 드롭다운 숨김
			}
		}

		// 문서에 클릭 이벤트 리스너 추가
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// 컴포넌트 언마운트 시 이벤트 리스너 제거
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [logoutRef]); // ref가 변경될 때마다 useEffect 실행

	function handleLogout() {
		//localScript 삭제
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userData');
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
				<span onClick={() => {}}> MOAPICK</span>
				<S.ButtonWrapper>
					{/*TODO: 삭제할 데이터가 없을 때는 모드 전환X, 토스트 메시지*/}
					{isDeleteMode ? (
						<>
							<S.Button onClick={() => handleDeleteClick()}>삭제</S.Button>
							<S.Button onClick={() => setIsDeleteMode(false)}>취소</S.Button>
						</>
					) : (
						<FaRegTrashCan
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

					{/* TODO:	로그아웃버튼 드롭다운*/}
				</S.ButtonWrapper>
			</S.GnbWrapper>
			{showLogoutDropdown && (
				<S.LogoutButton ref={logoutRef}>
					<button onClick={handleLogout}>로그아웃</button>
				</S.LogoutButton>
			)}
		</>
	);
};
