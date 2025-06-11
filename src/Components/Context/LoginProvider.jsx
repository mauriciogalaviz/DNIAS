import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UtilsContext } from './UtilsProvider';
import { Box, Button, Typography } from '@mui/material';

const LoginContext = createContext();
const LoginProvider = ({ children }) => {
	const { DialogData, setDialogData, SnackbarData, setSnackbarData } = useContext(UtilsContext);
	/*** Control Session ********************************************** */
	const [ActiveSession, setActiveSession] = useState(true);
	// UserLogIN
	const [UserLogIn, setUserLogIn] = useState({
		id_user: null,
		tipo_usuario: 1,
		token: null,
		user: 'DTI'
	});
	// Login
	const headerListLogin = {
		Accept: '*/*',
		'Content-Type': 'application/json',
		mode: 'cors',
		'Access-Control-Allow-Origin': '*',
	};
	const postLogin = async (values) => {
		try {
			let res = await fetch('https://api.dif.gob.mx/cuidados/login/', {
				method: 'POST',
				body: JSON.stringify(values),
				headers: headerListLogin,
			});
			//console.log('res', res);
			if (!res.ok)
				throw {
					status: res.status,
					statusText: res.statusText,
				};
			let json = await res.json();
			if (!json.ok)
				throw {
					status: json.status,
					statusText: json.statusText,
				};
			//console.log('json.token', json.token);
			return json;
		} catch (error) {
			console.log(error);
			setSnackbarData({
				...SnackbarData,
				open: true,
				content: 'Usuario invalido',
				severity: 'error',
				duration: 3000,
			});
		}
	};
	// Users Token
	//
	const [CloseDialog, setCloseDialog] = useState(null);
	const [CloseDialogText, setCloseDialogText] = useState('¿Esta seguro de abandonar el sistema RENCAI?');

	const CloseSessionQuestion = async () => {
		setDialogData({
			...DialogData,
			open: true,
			title: 'Cierre de Sesión',
			subtitle: '',
			content: (
				<Box className="grid grid-cols-1 col-span-12 p-4">
					<Typography variant="div" fullWidth style={{ width: '100%' }}>
						¿Esta seguro de abandonar el Directorio Nacional de Instituciones de Asistencia Social - DNIAS?
					</Typography>
					<Typography></Typography>
					<Button
						type="button"
						onClick={() => {
							closeSession();
						}}
						className="mt-3"
					>
						Cerrar Sesión
					</Button>
				</Box>
			),
			action: (
				<Button
					onClick={() => {
						setDialogData({ ...DialogData, open: false });
					}}
				>
					Cancelar
				</Button>
			),
			maxWidth: 'sm',
		});
	};
	const closeSession = () => {
		//console.log('closeSession');
		let cierre = async () => {
			try {
				let sesion = await fetch('https://api.dif.gob.mx/comiteEtica/logout/', {
					method: 'GET',
					headers: {
						Accept: '*/*',
						'Content-Type': 'application/json',
						mode: 'cors',
						'Access-Control-Allow-Origin': '*',
						Authorization: `Bearer ${UserLogIn.token}`,
					},
				});
				console.log(sesion);
				if (!sesion.ok) throw { status: sesion.status, statusText: sesion.statusText };
				//let json = await sesion.json();
				//if (!json.ok) throw { status: json.status, statusText: json.statusText };
				setActiveSession(false);
				setUserLogIn({
					...UserLogIn,
					tipo_usuario: null,
					token: null,
				});
				setDialogData({
					...DialogData,
					open: false,
				});
				setSnackbarData({
					...SnackbarData,
					open: true,
					content: 'Sesión cerrada',
					severity: 'success',
					duration: 3000,
				});
			} catch (error) {
				console.log(error);
				/*setDialogData({
					...DialogData,
					open: false,
				}); */
				setSnackbarData({
					...SnackbarData,
					open: true,
					content: 'Error al cerrar la sesión',
					severity: 'error',
					duration: 3000,
				});
			}
		};
		cierre();
	};
	const [anchorEl, setAnchorEl] = useState(null);
	/****Control Password **************************************** */
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [recoverCorreo, setRecoverCorreo] = useState('');
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleVerify = () => {};

	const [userId, setUserId] = useState('');
	const [userNombre, setUserNombre] = useState('');
	const [userAp, setUserAp] = useState('');
	const [userAm, setUserAm] = useState('');
	const [userTipo, setUserTipo] = useState('');
	const [userUser, setUserUser] = useState('');
	const [sumSum, setSumSum] = useState(false);
	/***************************************************************************************************************************** */
	/***************************************************************************************************************************** */
	const data = {
		// Control Session
		ActiveSession,
		setActiveSession,
		// Login
		postLogin,
		// User LogIn
		UserLogIn,
		setUserLogIn,
		//
		anchorEl,
		setAnchorEl,
		showPassword,
		setShowPassword,
		handleClickShowPassword,
		recoverCorreo,
		setRecoverCorreo,
		handleMouseDownPassword,

		userId,
		userNombre,
		userAp,
		userAm,
		userTipo,
		userUser,
		setUserId,
		setUserNombre,
		setUserAp,
		setUserAm,
		setUserTipo,
		setUserUser,
		open,
		handleVerify,
		closeSession,
		sumSum,
		setSumSum,
		CloseDialog,
		setCloseDialog,
		CloseSessionQuestion,
		CloseDialogText,
		setCloseDialogText,
	};
	return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>;
};
export default LoginProvider;
export { LoginContext };
LoginProvider.propTypes = {
	children: PropTypes.element.isRequired,
};
