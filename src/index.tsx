import CreateDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = CreateDOM.createRoot(rootElement);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
	throw new Error('REACT_APP_GOOGLE_CLIENT_ID 환경 변수가 설정되지 않았습니다.');
}

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={clientId}>
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>,
);
