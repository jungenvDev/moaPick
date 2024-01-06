import * as S from './Gnb.style';
import {FaRegTrashCan} from 'react-icons/fa6';
import {IoMdMore} from 'react-icons/io';
import {useAtom} from 'jotai';
import {deletedPostAtom, isDeleteModeAtom} from '../../../stores/postModalOpen';

export const Gnb = () => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);

	function handleDeleteClick() {
		setIsDeleteMode(false);
		selectedData.map((item: any) => {
			const selectedIds = item.id;
			fetch(`http://localhost:4000/posts/${selectedIds}`, {
				method: 'DELETE',
				body: JSON.stringify({ids: selectedIds}), // 선택된 데이터의 id를 요청 본문에 넣습니다.
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then(response => {
					if (response.status === 200) {
						console.log(`Data with IDs ${selectedIds} has been deleted.`);
						// 여기에서 추가적인 작업을 수행할 수 있습니다 (예: 상태 업데이트, UI 변경 등)
					} else {
						console.error('Error deleting data:', response.statusText);
					}
				})
				.catch(error => console.error('Error:', error));
		});
	}

	return (
		<S.GnbWrapper>
			<span onClick={() => {}}> MOAPICK</span>
			<S.ButtonWrapper>
				<FaRegTrashCan
					onClick={() => {
						setIsDeleteMode(true);
					}}
				/>
				{isDeleteMode && <span onClick={() => handleDeleteClick()}>삭제</span>}
				<IoMdMore onClick={() => {}} />
				{/*	로그아웃버튼 드롭다운*/}
			</S.ButtonWrapper>
		</S.GnbWrapper>
	);
};
