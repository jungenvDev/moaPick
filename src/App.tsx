import React from 'react';
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

function App() {
	const [isUserLoggedIn] = useAtom(isUserLoggedInAtom);
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<Router>
				<Routes>
					<Route path='/' element={<Navigate to='/dashboard' />} />
					<Route path='/login' element={<Navigate to='/dashboard' />} />
					<Route path={'/dashboard'} element={<DashboardPage />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
