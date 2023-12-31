import * as S from './Gnb.style';
import {FaRegTrashCan} from 'react-icons/fa6';
import {IoMdMore} from 'react-icons/io';

export const Gnb = () => {
	return (
		<S.GnbWrapper>
			<span onClick={() => {}}> MOAPICK</span>
			<S.ButtonWrapper>
				<FaRegTrashCan onClick={() => {}} />
				<IoMdMore onClick={() => {}} />
				{/*	로그아웃버튼 드롭다운*/}
			</S.ButtonWrapper>
		</S.GnbWrapper>
	);
};
