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

export const Gnb = () => {
	const [isDeleteMode, setIsDeleteMode] = useAtom(isDeleteModeAtom);
	const [selectedData, setSelectedData] = useAtom(deletedPostAtom);

	const {refetch} = useGetAllArticle();
	const {mutate: deleteDataMutation} = useDeleteArticleFromServer();

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
				<IoMdMore onClick={() => {}} />
				{/* TODO:	로그아웃버튼 드롭다운*/}
			</S.ButtonWrapper>
		</S.GnbWrapper>
	);
};
