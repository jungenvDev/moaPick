import styled from 'styled-components';

export const DashboardPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100vh;
	background-color: #f8f7f5;
`;

export const ContentWrapper = styled.div`
	height: fit-content;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	margin: 0;
	padding: 80px 20px 20px 20px;
	align-items: flex-start;
	justify-content: flex-start;
	background-color: #f8f7f5;
`;

export const Tag = styled.div<{index: number}>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	max-height: 30px;
	padding: 5px 10px;
	border-radius: 5px;
	width: fit-content;
	height: fit-content;
	background-color: ${({index}) => `hsl(${(index * 100) % 360}, 100%, 90%)`};
	font-size: 14px;
	cursor: pointer;
	white-space: nowrap;
	margin: 0;
`;

export const ArticleWrapper = styled.div`
	width: 100%;
	height: fit-content;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	gap: 20px;
	padding: 10px 0;
	background-color: #f8f7f5;
`;
