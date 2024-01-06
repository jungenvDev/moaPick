import styled from 'styled-components';

export const PostWrapper = styled.div`
	width: 100%;
	height: 150px;
	border: 1px solid #eee;
	border-radius: 5px;
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
	height: 43px;
	padding: 3px;
`;

export const PostTitle = styled.div`
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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
