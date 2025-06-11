import { createContext } from "react"
import PropTypes from "prop-types";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider";
const DataContext = createContext();
const DataProvider = ({children}) => {
	const { UserLogIn } = useContext(LoginContext);
	// Navegador
	const [Navegador, setNavegador] = useState('');
	const [NavModule, setNavModule] = useState(0);
	const [NavMenu, setNavMenu] = useState(0);
	// Cat Estados
	const [catEstados, setCatEstados] = useState('');
	// HeaderList
	const headerList = {
		Accept: '*/*',
		'Content-Type': 'application/json',
		mode: 'cors',
		'Access-Control-Allow-Origin': '*',
		Authorization: `Bearer ${UserLogIn.token}`,
	};
	// DATA
	const data = {
		// HeaderList
		headerList,
		// Navegador
		Navegador,
		setNavegador,
		// NavModule
		NavModule,
		setNavModule, // LIST USERS
		//Nav Menu
		NavMenu, setNavMenu,
		// Cat Estados
		catEstados,
		setCatEstados,
		 // LIST USERS
		
	};
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DataProvider
export { DataContext }