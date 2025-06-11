import { Box, Button, Divider, TextField, FormControl, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { DataContext } from '../Context/DataProvider';
import { UserContext } from '../Context/UserProvider';
import { useEffect } from 'react';

/**FormUsers
 * @function
 * @param {void} -node
 * Es el formulario para la creación de usuarios del sistema, se puede generar nuevo usuario o redirige a la actualización del registro de manera automática
 * @returns {void}
 */
const FormUsers = () => {
	const { UserData, setUserData, ListarUsuarios } = useContext(UserContext);
	const { headerList } = useContext(DataContext);
	const formik = useFormik({
		initialValues: {
			id: UserData.id,
			nombre: UserData.nombre,
			ap: UserData.ap,
			am: UserData.am,
			tipo_usuario: UserData.tipo_usuario,
			email: UserData.email,
			password: UserData.password,
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('Este campo es requerido'),
			ap: Yup.string().required('Este campo es requerido'),
			tipo_usuario: Yup.number().required('Este campo es requerido'),
			email: Yup.string().required('Este campo es requerido').email('No es un correo valido'),
		}),
		onSubmit: (values) => {
			console.log(values);
			formik.values.id = UserData.id;
			let register = async () => {
				try {
					let url = 'https://api.dif.gob.mx/comiteEtica/usuarios/registro/';
					let Method = 'POST';
					if (UserData.id != null) {
						url = 'https://api.dif.gob.mx/comiteEtica/usuarios/actualizar/';
						Method = 'PUT';
					}
					let res = await fetch(url, {
						method: Method,
						body: JSON.stringify(values),
						headers: headerList,
					});
					if (!res.ok) throw { status: res.status, statusText: res.statusText };
					//console.log('res', res);
					let json = await res.json();
					if (!json.ok) throw { status: json.status, statusText: json.statusText };
					//console.log('json', json);
					//setListaUserData(json);
					ListarUsuarios();
					handleResetUserForm();
					/*formik.resetForm();
					setIdUserA(null);
					setUserTipoA(null);
					setUserEstadoA(null);
					setUserTribunalA(null); */
				} catch (error) {
					console.error(error);
					//createSnackBar(`Ocurrió un problema: ${error.statusText}`);
				}
			};
			register();
		},
	});
	const handleResetUserForm = () => {
		setUserData({
			...UserData,
			id: null,
			nombre: '',
			ap: '',
			am: '',
			tipo_usuario: '',
			email: '',
			password: '',
		});
		formik.initialValues = { ...UserData };
		Object.keys(formik.initialValues).forEach((key) => {
			formik.setFieldValue(key, formik.initialValues[key]);
		});
		formik.handleReset();
		formik.resetForm();
	};
	useEffect(() => {
		formik.initialValues = UserData;
		formik.setFieldValue('id', UserData.id);
		formik.setFieldValue('nombre', UserData.nombre);
		formik.setFieldValue('ap', UserData.ap);
		formik.setFieldValue('am', UserData.am);
		formik.setFieldValue('tipo_usuario', UserData.tipo_usuario);
		formik.setFieldValue('email', UserData.email);
		formik.setFieldValue('password', UserData.password);
		formik.values = UserData;
	}, [UserData]);

	return (
		<Box className="grid grid-cols-12 col-span-12 md:col-span-6 !p-6 ">
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="grid grid-cols-12 col-span-12">
				<Box className="grid grid-cols-12 col-span-12 gap-4 !p-2">
					<Box fullwidth className="col-span-12">
						Registro de Usuarios
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								fullWidth
								label={'Nombre'}
								name={'nombre'}
								value={UserData.nombre}
								onChange={(e) => {
									setUserData({
										...UserData,
										nombre: e.target.value,
									});
									formik.values.nombre = e.target.value;
								}}
								onBlur={formik.handleBlur}
								autoComplete="off"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								fullWidth
								label={'Apellido Paterno'}
								name={'ap'}
								value={UserData.ap}
								onChange={(e) => {
									setUserData({
										...UserData,
										ap: e.target.value,
									});
									formik.values.ap = e.target.value;
								}}
								onBlur={formik.handleBlur}
								autoComplete="off"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								fullWidth
								name={'am'}
								label={'Apellido Materno'}
								value={UserData.am}
								onChange={(e) => {
									setUserData({
										...UserData,
										am: e.target.value,
									});
									formik.values.am = e.target.value;
								}}
								onBlur={formik.handleBlur}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								select
								required
								value={UserData.tipo_usuario}
								fullWidth
								name={'tipo_usuario'}
								label={'Tipo'}
								onChange={(e) => {
									setUserData({
										...UserData,
										tipo_usuario: e.target.value,
									});
									formik.values.tipo_usuario = e.target.value;
								}}
								onBlur={formik.handleBlur}
								InputLabelProps={{
									shrink: true,
								}}
							>
								<MenuItem value={1}>Visualizador Suplente</MenuItem>
								<MenuItem value={2}>Visualizador Titular</MenuItem>
								<MenuItem value={3}>Comité</MenuItem>
								<MenuItem value={4}>Administrador</MenuItem>
							</TextField>
						</FormControl>
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								fullWidth
								type="email"
								name={'email'}
								label={'Correo'}
								value={UserData.email}
								onChange={(e) => {
									setUserData({
										...UserData,
										email: e.target.value,
									});
									formik.values.email = e.target.value;
								}}
								onBlur={formik.handleBlur}
								autoComplete="off"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</Box>
					<Box className="col-span-12">
						<FormControl fullWidth className="">
							<TextField
								fullWidth
								name={'password'}
								label={'Contraseña'}
								type={'password'}
								value={UserData.password}
								onChange={(e) => {
									setUserData({
										...UserData,
										password: e.target.value,
									});
									formik.values.password = e.target.value;
								}}
								onBlur={formik.handleBlur}
								InputLabelProps={{
									autoComplete: false,
									shrink: true,
								}}
								autoComplete="new-password"
							/>
						</FormControl>
					</Box>
				</Box>
				<Divider className="col-span-12" />
				<Box className="grid grid-cols-2 col-span-12 !p-4">
					<Box>
						<Button
							variant="outlined"
							type="button"
							onClick={() => {
								console.error(formik.errors);
								formik.handleSubmit();
							}}
						>
							Guardar
						</Button>
					</Box>
					<Box>
						<Button
							variant="outlined"
							type="reset"
							onClick={(e) => {
								e.preventDefault();
								setUserData({
									...UserData,
									id: null,
									nombre: null,
									ap: null,
									am: null,
									tipo_usuario: null,
									email: null,
									password: null,
								});
								formik.handleReset();
							}}
						>
							Cancelar
						</Button>
					</Box>
				</Box>
			</form>
		</Box>
	);
};

export default FormUsers;
