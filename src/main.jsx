import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UtilsProvider from './Components/Context/UtilsProvider.jsx';
import LoginProvider from './Components/Context/LoginProvider.jsx';
import DataProvider from './Components/Context/DataProvider.jsx';
import FormularioProvider from './Components/Context/FormularioProvider.jsx';
import UserProvider from './Components/Context/UserProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<UtilsProvider>
			<LoginProvider>
				<DataProvider>
					<UserProvider>
						<FormularioProvider>
							<App />
						</FormularioProvider>
					</UserProvider>
				</DataProvider>
			</LoginProvider>
		</UtilsProvider>
	</StrictMode>
);
