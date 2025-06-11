import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import BackDrop from '../Utils/BackDrop';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';

// Crear el contexto
const UtilsContext = createContext();

// Crear el proveedor
export const UtilsProvider = ({ children }) => {
	// Snackbar
	const [SnackbarData, setSnackbarData] = useState({
		open: false,
		content: 'Hola Mundo',
		title: null,
		action: null,
		severity: 'info',
		duration: 3000,
	});
	const closeSnackbarData = () => {
		setSnackbarData({
			...SnackbarData,
			open: false,
		});
	};
	// Dialog
	const DiologOnClose = () => {
		setDialogData({
			...DialogData,
			open: false,
		});
	};
	const [DialogData, setDialogData] = useState({
		open: false,
		title: 'Dialogo',
		subtitle: 'Subtitulo',
		content: 'Contenido del dialogo',
		action: <Button onClick={DiologOnClose}>Cerrar</Button>,
		maxWidth: 'sm',
	});
	// BackDrop
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const FallBack = () =>{
			useEffect(() => {
				setOpenBackDrop(true)
				return () => {
					setOpenBackDrop(false);
				};
			}, []);
			return <BackDrop />;
		}
	const FallBackIn = () => {
		useEffect(() => {
				
				return () => {
					
				};
			}, []);
			return <Box className='col-span-12 !w-full flex p-2 text-center'><CircularProgress color="inherit" /></Box>;
	}
	// Data
	const data = {
		// Snackbar
		SnackbarData,
		setSnackbarData,
		closeSnackbarData,
		// Dialog
		DialogData,
		setDialogData,
		DiologOnClose,
		// BackDrop
		openBackDrop,
		setOpenBackDrop,
		FallBack,
		FallBackIn,
	};
	return <UtilsContext.Provider value={data}>{children}</UtilsContext.Provider>;
};

// Definir prop-types para el proveedor
UtilsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto
export default UtilsProvider
export {UtilsContext}
