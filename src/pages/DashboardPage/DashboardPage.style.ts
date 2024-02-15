import styled from 'styled-components';

export const TagWrapper = styled.div`
	height: fit-content;
	display: flex;
	flex-wrap: wrap;
	margin: 0;
	padding: 80px 20px 20px 20px;
	align-items: flex-start;
	justify-content: flex-start;
`;

export const Tag = styled.div<{index: number}>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-height: 30px;
	padding: 5px 10px;
	border-radius: 5px;
	width: fit-content;
	background-color: ${({index}) => `hsl(${(index * 100) % 360}, 100%, 80%)`};
	font-size: 14px;
	cursor: pointer;
	white-space: nowrap;
	margin: 0;
`;

export const DashboardWrapper = styled.div`
	width: 100%;
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	gap: 20px;
	padding: 10px 0;
`;

export const ArticleButtonWrapper = styled.div`
	width: 170px;
	height: fit-content;
	display: flex;
	position: absolute;
	//transform: translate(90px, 80px);
	justify-content: center;
	align-items: center;
	background-color: #fff;
	border-radius: 5px;
	padding: 10px;
	box-shadow:
		0 0 0 1px #d4d4d5,
		0 2px 0 0 #d4d4d5,
		0 1px 3px 0 #d4d4d5;
`;
export const ModifyArticleButton = styled.button`
	width: 90%;
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
export const DeleteArticleButton = styled.button`
	width: 90%;
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
