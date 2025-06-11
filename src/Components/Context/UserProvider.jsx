//import { Button, Box, Typography } from '@mui/material';
import { createContext, useState, useContext } from 'react';
/* import { Slide } from 'react-awesome-reveal'; */
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import PropTypes from 'prop-types';
import { DataContext } from './DataProvider';
import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Fragment } from 'react';
import { UtilsContext } from './UtilsProvider';
import RecoverPass from '../Users/RecoverPass';
//import RecoverPass from '../Users/RecoverPass';
const UserContext = createContext();
/** UserProvider
 * @namespace UserProvider
 * @param {PropTypes} -node
 * @Description Provider de datos a traves de un LoginContext. Contiene todas la funciones de control de menu y variables y funciones globales correspondientes al uso y control para el modulo de control de usuarios al sistema. Se instancia en App.jsx y envuelve todo el sistema. Recibe los componentes hijos y los envuelve con sus variables y funciones globales, es el equivalente a REDUX y envuelve a APP
 * @returns {object} data - {data} - Objeto con las funciones y variables globales
 */
const UserProvider = ({ children }) => {
	const { headerList } = useContext(DataContext);
	const { DialogData, setDialogData, SnackbarData, setSnackbarData } = useContext(UtilsContext);

	/* Admin ************************************************/
	/***************************************************************************************************************************** */
	// Variables principales formulario Usuarios ************************************************/
	const [UserData, setUserData] = useState({
		id: null,
		nombre: null,
		ap: null,
		am: null,
		tipo_usuario: null,
		email: null,
		password: null,
	});

	/************************************************/
	// Control de datos ************************************************/
	const [listaUser, setListaUser] = useState(null);
	const [listaUserData, setListaUserData] = useState(null);
	/**
	 * @namespace UserProvider.ListarUsuarios
	 * @description Función relistar usuarios. Función para realizar volver a cargar el listado de usuarios después de una iteración de creación, borrado o modificación
	 * @function
	 * @param {void} void
	 * No requiere valores
	 * @return void
	 */
	const ListarUsuarios = async () => {
		try {
			let res = await fetch('https://api.dif.gob.mx/comiteEtica/usuarios/', {
				method: 'GET',
				headers: headerList,
			});
			//console.log('res', res);
			if (!res.ok) throw { status: res.status, statusText: res.statusText };
			let json = await res.json();
			//console.log('json', json);
			if (!json.ok) throw { status: json.status, statusText: json.statusText };
			let listado = await json.usuarios.map((e, i) => {
				return (
					<ListItem alignItems="flex-start" key={i}>
						<ListItemAvatar>
							<Avatar alt={e.nombre} colorDefault>
								{e.nombre.slice(0, 1) + e.ap.slice(0, 1)}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={e.nombre}
							secondary={
								<Fragment>
									<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
										Apellidos: {e.ap + ' ' + e.am}
									</Typography>
									<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
										Correo: {e.email}
									</Typography>
									<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
										Tipo:{' '}
										{e.tipo_usuario == 1 ? 'Visualizador Suplente' : e.tipo_usuario == 2 ? 'Visualizador Titular' : e.tipo_usuario == 3 ? 'Comité' : e.tipo_usuario == 4 ? 'Administrador' : null}
									</Typography>
								</Fragment>
							}
						/>
						<Typography fullWidth variant="div" className="grid grid-cols-1" sx={{}}>
							<Button title="Editar">
								<EditIcon onClick={() => updateUser(e)} />
							</Button>
							<Button title="Eliminar">
								<DeleteIcon onClick={() => deleteUser(e.id, 0, e.nombre)} />
							</Button>
							<Button title="Restablecer Contraseña">
								<PasswordIcon onClick={() => handlePass(e.id)} />
							</Button>
						</Typography>
					</ListItem>
				);
			});
			setListaUser(listado);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};
	const bringListaUserData = async (list) => {
		let listado = await list.map((e, i) => {
			return (
				<ListItem alignItems="flex-start" key={i}>
					<ListItemAvatar>
						<Avatar alt={e.nombre} colorDefault>
							{e.nombre.slice(0, 1) + e.ap.slice(0, 1)}
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={e.nombre}
						secondary={
							<Fragment>
								<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
									Apellidos: {e.ap + ' ' + e.am}
								</Typography>
								<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
									Correo: {e.email}
								</Typography>
								<Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
									Tipo: {e.tipo_usuario == 1 ? 'Visualizador Suplente' : e.tipo_usuario == 2 ?'Visualizador Titular': e.tipo_usuario == 3 ?'Comité' : e.tipo_usuario == 4 ? 'Administrador': null}
								</Typography>
							</Fragment>
						}
					/>
					<Typography fullWidth variant="div" className="grid grid-cols-1" sx={{}}>
						<Button title="Editar">
							<EditIcon onClick={() => updateUser(e)} />
						</Button>
						<Button title="Eliminar">
							<DeleteIcon onClick={() => deleteUser(e.id, 0, e.nombre)} />
						</Button>
						<Button title="Restablecer Contraseña">
							<PasswordIcon onClick={() => handlePass(e.id)} />
						</Button>
					</Typography>
				</ListItem>
			);
		});
		//console.log('listado', listado);
		return listado;

		//console.log('listaUser', listaUser);
	};
	/**
	 * @namespace UserProvider.updateUser
	 * @description Función de actualizacion de usuario. Establece las variables de estado para que se presenten en el formulario de usuarios y pueda ser modificado
	 * @function
	 * @param {object} e
	 * Se recibe un objeto con los datos completos del usuario a modificar
	 * @return void
	 */
	const updateUser = (e) => {
		//console.log('UserData update', e);
		setUserData({
			...UserData,
			id: e.id,
			nombre: e.nombre,
			ap: e.ap,
			am: e.am,
			tipo_usuario: e.id_tipo,
			email: e.email,
			password: '',
		});
		//console.log('UserData update data', UserData);
	};
	/**
	 * @namespace UserProvider.borrar
	 * @description Función de Eliminar un usuario. Establece las variables de estado y función para la eliminación de usuarios
	 * @function
	 * @param {number} id
	 * Se recibe el id del usuario
	 * @return void
	 */
	const borrar = async (id) => {
		try {
			let res = await fetch(`https://api.dif.gob.mx/comiteEtica/usuarios/baja/${id}/ `, {
				method: 'DELETE',
				headers: headerList,
			});
			//console.log('res', res)
			if (!res.ok) throw { status: res.status, statusText: res.statusText };
			let json = await res.json();
			//console.log('json', json);
			if (!json.ok) throw { status: json.status, statusText: json.statusText };
			setDialogData({
				...DialogData,
				open: false,
			});
			setSnackbarData({
				...SnackbarData,
				open: true,
				content: 'Usuario eliminado correctamente',
				severity: 'success',
				duration: 3000,
			});
			ListarUsuarios();
		} catch (error) {
			console.error('error de usuario', error.status, error.statusText, error);
			setSnackbarData({
				...SnackbarData,
				open: true,
				content: 'Error al eliminar el usuario',
				severity: 'error',
				duration: 3000,
			});
		}
	};

	/**
	 * @namespace UserProvider.deleteUser
	 * @function
	 * @description Función pregunta. Estableciendo una pregunta para confirmar si en verdad se desea eliminar al usuario
	 * @param  {number} id
	 * Recibe el Id del usuario
	 * @param  {number} status
	 * Recibe el status del usuario
	 * @param  {string} nombre
	 * Recibe el nombre del usuario
	 * @return void
	 */
	const deleteUser = (id, status, nombre) => {
		setDialogData({
			...DialogData,
			open: true,
			title: 'Control de Usuarios',
			subtitle: 'Eliminación de Usuarios',
			content: (
				<Box className="grid grid-cols-1 col-span-12 p-4">
					<Typography variant="div" fullWidth style={{ width: '100%' }}>
						¿Desea eliminar definitivamente el registro de {nombre}?
					</Typography>
					<Typography></Typography>
					<Button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							borrar(id, status);
						}}
						className="mt-3"
					>
						Eliminar
					</Button>
				</Box>
			),
			action: (
				<Button
					onClick={() => {
						setDialogData({ ...DialogData, open: false });
					}}
				>
					Cerrar
				</Button>
			),
			maxWidth: 'sm',
		});
	};
	/**
	 * @namespace UserProvider.handlePass
	 * @function
	 * @description Función pregunta. Estableciendo una pregunta para confirmar si en verdad se desea eliminar al usuario
	 * @param  {number} id
	 * Recibe el Id del usuario
	 * @param  {string} nombre
	 * Recibe el nombre del usuario
	 * @return void
	 */
	const handlePass = (id, nombre) => {
		setDialogData({
			...DialogData,
			open: true,
			title: 'Control de Usuarios',
			subtitle: 'Restablecimiento de Contraseña',
			content: <RecoverPass id={id} nombre={nombre} />,
			action: (
				<Button
					onClick={() => {
						setDialogData({ ...DialogData, open: false });
					}}
				>
					Cerrar
				</Button>
			),
			maxWidth: 'sm',
		});
	};
	/**************************************************************************************************************************** */

	const data = {
		// Variables principales formulario
		UserData,
		setUserData,
		listaUser,
		setListaUser,
		listaUserData,
		setListaUserData,
		ListarUsuarios,
		bringListaUserData,
		deleteUser,
		handlePass,
		borrar,
	};
	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default UserProvider;
export { UserContext };
