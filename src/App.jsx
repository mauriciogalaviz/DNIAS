import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, lazy, Suspense } from 'react';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { LoginContext } from './Components/Context/LoginProvider';
import SCDialog from './Components/Utils/SCDialog';
import SnackBarItem from './Components/Utils/SnackBarItem';
import { UtilsContext } from './Components/Context/UtilsProvider';
import BackDrop from './Components/Utils/BackDrop';

const Login = lazy(() => import('./Components/Login/Login'));
const Home = lazy(() => import('./Components/Home/Home'));

function App() {
	const { ActiveSession, CloseDialog } = useContext(LoginContext);
	const { OpenBackDrop,  FallBack } = useContext(UtilsContext);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);
	
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box className="grid grid-cols-12  !bg-slate-400 dark:!bg-neutral-900 antialiased ">
				<Suspense fallback={<FallBack />}>
					{!ActiveSession && <Login />}
					{ActiveSession && <Home />}
				</Suspense>
				<SnackBarItem />
				<SCDialog />
				<BackDrop />
				<SnackBarItem />
				{CloseDialog}
			</Box>
		</ThemeProvider>
	);
}

export default App;
