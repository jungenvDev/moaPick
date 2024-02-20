import styled from 'styled-components';

export const PostWrapper = styled.div`
	width: 100%;
	max-width: 220px;
	min-height: 150px;
	height: fit-content;
	border: 1px solid #eee;
	border-radius: 5px;
	cursor: pointer;
	position: relative;
`;

//EditButton
export const EditButton = styled.div`
	position: absolute;
	top: -10px;
	right: -10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	box-shadow:
		0 0 0 1px #d4d4d5,
		0 2px 0 0 #d4d4d5,
		0 1px 3px 0 #d4d4d5;
	background-color: #fff;
	cursor: pointer;
`;

export const PostOGImageWrapper = styled.div`
	background-color: #eee;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
	height: 100px;
`;

export const PostOGImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const PostContentWrapper = styled.div`
	height: fit-content;
	padding: 3px 5px;
`;

export const PostTitle = styled.div`
	font-size: 13px;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
`;

export const PostCheckboxWrapper = styled.div<{isDeleteMode: boolean}>`
	position: relative;
	display: ${({isDeleteMode}) => (isDeleteMode ? 'block' : 'none')};
	height: fit-content;
	width: fit-content;
`;

export const PostCheckbox = styled.input`
	width: 15px;
	height: 15px;
`;
