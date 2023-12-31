import styled from 'styled-components';

export const DashboardWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

//플로팅 버튼
export const FloatingButtonWrapper = styled.button`
	position: fixed;
	width: 80px;
	height: 40px;
	bottom: 40px;
	right: 50%;
	transform: translateX(50%);
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
