import React from 'react';

import {LoginPage} from './pages/LoginPage/LoginPage';
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import {DashboardPage} from './pages/DashboardPage/DashboardPage';
import {GlobalStyle} from './globalStyle';
import {useAtom} from 'jotai';
import {isUserLoggedInAtom} from './stores/googleLogin';
import {QueryClient, QueryClientProvider} from 'react-query';
import {getAccessTokenFromURL} from './queries/auth';

function App() {
	const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
	if (getAccessTokenFromURL() !== '') {
		setIsUserLoggedIn(true);
	}

	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							isUserLoggedIn ? (
								<Navigate to='/dashboard' />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route
						path='/login'
						element={
							isUserLoggedIn ? <Navigate to='/dashboard' /> : <LoginPage />
						}
					/>
					<Route
						path={'/dashboard'}
						element={
							isUserLoggedIn ? <DashboardPage /> : <Navigate to='/login' />
						}
					/>
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
