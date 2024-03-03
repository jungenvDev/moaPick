import styled from 'styled-components';

export const GnbWrapper = styled.div`
	width: 100%;
	height: 70px;
	position: fixed;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	font-weight: 700;
	font-size: 24px;
	flex: 1;
	z-index: 10;
	background-color: #f8f7f5;
`;

export const GnbLogo = styled.img`
	width: 143px;
	height: 25px;
`;

export const ButtonWrapper = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`;

export const Button = styled.button`
	//회색 그림자
	box-shadow:
		0 0 0 1px #d4d4d5,
		0 2px 0 0 #d4d4d5,
		0 1px 3px 0 #d4d4d5;
	background-color: #fff;
	color: #000;
	border-radius: 0.28571429rem;
	padding: 0.5em 1em;
	font-size: 15px;
	cursor: pointer;
`;

export const LogoutButton = styled.button`
	background-color: #fff;
	color: #2a2a2a;
	border-radius: 0.28571429rem;
	padding: 0.5em 1em;
	font-size: 15px;
	cursor: pointer;
	width: fit-content;
	height: fit-content;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transform: translate(0, 30px);
	z-index: 11;
	gap: 10px;
	box-shadow:
		0 0 0 1px #d4d4d5,
		0 2px 0 0 #d4d4d5,
		0 1px 3px 0 #d4d4d5;
`;

export const HelloUser = styled.span`
	font-size: 16px;
	border-bottom: 1px solid #000;
	white-space: nowrap;
`;

export const DeleteIcon = styled.img`
	width: 25px;
	height: 25px;
`;
