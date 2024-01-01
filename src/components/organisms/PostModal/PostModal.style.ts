import styled from 'styled-components';

export const PostModalBackground = styled.span`
	width: 100%;
	height: 100%;
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
	gap: 20px;
	height: fit-content;
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
	height: 70px;
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

export const Tag = styled.span`
	width: fit-content;
	height: fit-content;
	padding: 5px;
	font-size: 14px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
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
