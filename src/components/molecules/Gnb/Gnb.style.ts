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
	background-color: rgba(149, 218, 243, 0.79);
`;

export const ButtonWrapper = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
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
	width: 100px;
	height: 30px;
	position: absolute;
	transform: translate(400px, 50px);

	//그림자
	box-shadow:
		0 0 0 1px #d4d4d5,
		0 2px 0 0 #d4d4d5,
		0 1px 3px 0 #d4d4d5;
`;
