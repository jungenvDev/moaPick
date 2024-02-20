import styled from 'styled-components';

export const PostModalBackground = styled.span`
	width: 100%;
	height: 100%;
	min-height: 300px;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
`;

export const PostModalWrapper = styled.div`
	width: 300px;
	min-height: 120px;
	height: fit-content;
	gap: 20px;
	background-color: #fff;
	border-radius: 5px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	padding: 20px 10px;
`;

export const TitleWrapper = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.div`
	font-size: 13px;
	font-weight: 600;
	display: flex;
	align-items: center;
`;

export const LinkInputWrapper = styled.div`
	width: 100%;
	height: fit-content;
	gap: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
export const LinkInputContainer = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #eee;
	height: 30px;
`;

export const LinkInput = styled.input`
	width: 100%;
`;

export const ErrorMessage = styled.div`
	width: 90%;
	font-size: 12px;
	color: red;
`;

export const TagWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px 0;
	gap: 10px;
`;

export const TagContainer = styled.div`
	width: 90%;
	min-height: 70px;
	display: flex;
	flex-direction: column;
	padding: 5px;
	background-color: #eee;
	overflow: scroll;
	//scrollbar
	::-webkit-scrollbar {
		width: 5px;
	}
`;

export const TagInputWrapper = styled.div<{isShowNewTagInput: boolean}>`
	width: 100%;
	align-items: center;
	justify-content: space-between;
	display: ${({isShowNewTagInput}) => (isShowNewTagInput ? 'flex' : 'none')};
`;

export const TagInput = styled.input`
	width: 80%;
	height: 30px;
`;

export const CheckBoxWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #eee;
`;

export const Tag = styled.span<{index: number; isTagModifyMode: number}>`
	width: 100%;
	height: fit-content;
	padding: 5px;
	font-size: 14px;
	display: ${({isTagModifyMode, index}) =>
		isTagModifyMode === index ? 'none' : 'flex'};
	align-items: center;
	gap: 5px;
`;

export const ModifyTagInput = styled.input`
	width: 100%;
	height: 30px;
`;

export const RadioInput = styled.input`
	width: 15px;
	height: 15px;
	display: flex;
	align-items: center;
`;

export const TagButtonWrapper = styled.div<{
	index: number;
	isTagModifyMode: number;
}>`
	width: 50%;
	display: ${({isTagModifyMode, index}) =>
		isTagModifyMode === index ? 'none' : 'flex'};
	justify-content: center;
	align-items: center;
	background-color: transparent;
`;

export const ModifyTagButton = styled.button`
	width: 100%;
	height: 20px;
	border-radius: 3px;
	border: none;
	background-color: #b2d0ed;
	color: #346de8;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	margin-right: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DeleteTagButton = styled.button`
	width: 100%;
	height: 20px;
	border-radius: 3px;
	border: none;
	background-color: #edb2b2;
	color: #e8344e;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export const Button = styled.button`
	width: 100%;
	height: 30px;
	border-radius: 5px;
	border: none;
	background-color: #eee;
	cursor: pointer;
`;
