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

export const Tag = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-height: 30px;
	padding: 5px 10px;
	border-radius: 5px;
	width: fit-content;
	background-color: #eee;
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
