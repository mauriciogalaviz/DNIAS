import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
/* import { Fade } from 'react-awesome-reveal'; */
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, Modal, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RepPassEmail from './RepPass/RepPassEmail.jsx';
import RepPassToken from './RepPass/RepPassToken.jsx';
import RepPassPass from './RepPass/RepPassPass.jsx';
import RepPassSuccess from './RepPass/RepPassSuccess.jsx';
import Logo from '../../assets/img/logos/Salud_SNDIF_v2.png';
import LogoDark from '../../assets/img/logos/logo5.png';
import { UtilsContext } from '../Context/UtilsProvider.jsx';
import { LoginContext } from '../Context/LoginProvider.jsx';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 0,
	px: 0,
	pb: 3,
};

const Login = () => {
	const { SnackbarData, setSnackbarData } = useContext(UtilsContext);
	const { showPassword, handleClickShowPassword, handleMouseDownPassword, setActiveSession, UserLogIn, setUserLogIn, postLogin } = useContext(LoginContext);
	const [modalMsg, setModalMsg] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [recover1, setRecover1] = useState(true);

	const changeRecover = (num) => {
		//console.log('num', num);
		if (num == 1) {
			setOpenModal(false);
			setRecover1(<RepPassEmail changeRecover={() => changeRecover(2)} />);

			setOpenModal(true);
		}
		if (num == 2) {
			setOpenModal(false);
			setRecover1(<RepPassToken changeRecover={() => changeRecover(3)} />);

			setOpenModal(true);
		}
		if (num == 3) {
			setOpenModal(false);
			setRecover1(<RepPassPass changeRecover={() => changeRecover(4)} />);

			setOpenModal(true);
		}
		if (num == 4) {
			setOpenModal(false);
			setRecover1(<RepPassSuccess changeRecover={() => changeRecover(1)} setOpenModal={setOpenModal} />);

			setOpenModal(true);
		}
	};
	useEffect(() => {
		//console.log(modalMsg);
		changeRecover(1);
		setOpenModal(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleOpenModal = () => {
		setModalMsg(recover1);
		setOpenModal(true);
		console.log(modalMsg);
	};
	const handleCloseModal = () => setOpenModal(false);
	const formikL = useFormik({
		initialValues: {
			usuario: '',
			pass: '',
		},
		validationSchema: Yup.object({
			usuario: Yup.string().required('Este campo es requerido'),
			pass: Yup.string().required('Este campo es requerido'),
		}),

		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			let insert = async (values) => {
				let json = await postLogin(values);
				if (!json.ok) throw { status: '403', statusText: 'Usuario invalido' };
				console.log('json', json);
				console.log('json id', json.id);
				console.log('json token', json.token);
				if (!json.ok) throw { status: '403', statusText: 'Usuario invalido' };
				console.log('json', json.tipo_usuario);
				setUserLogIn({
					...UserLogIn,
					id_user: json.id,
					tipo_usuario: json.tipo_usuario,
					token: json.token,
				});
				setSnackbarData({
					...SnackbarData,
					open: true,
					content: 'Se concedió acceso al sistema',
					severity: 'success',
					duration: 3000,
				});
				json.token != null ? setActiveSession(true) : setActiveSession(false);
			};
			insert(values);
		},
	});
	return (
		<>
			<Box className="grid grid-cols-12 col-span-12 grid-rows-12 p-0 w-screen h-screen overflow-scroll">
				<Paper className="grid grid-cols-12 col-span-12 col-start-1 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4 grid-rows-12 row-span-12   md:row-start-1 md:row-span-12 lg:row-span-10  lg:row-start-2 xl:row-span-10  xl:row-start-2   !bg-white dark:!bg-neutral-700 dark:!text-neutral-100">
					<form onSubmit={formikL.handleSubmit} onChange={formikL.handleChange} className="grid grid-cols-12 p-2 md:p-6 row-span-1 col-span-12 md:col-span-12">
						<Box cascade damping={0.5} className="grid grid-cols-12 p-2 md:p-4 col-span-12">
							<Box className="col-span-12 md:col-span-12 rounded block dark:hidden items-center ">
								<img src={Logo} alt="" className="dark:hidden self-center w-2/4" />
							</Box>
							<Box className="col-span-12 md:col-span-12 rounded hidden dark:block items-center">
								<img src={LogoDark} alt="" className="self-center w-2/4" />
							</Box>
							<Box className="col-span-12 md:col-span-12 rounded  p-4">
								<Typography variant="h4" className="p-2">
									Directorio Nacional de Instituciones de Asistencia Social
								</Typography>
								<Typography variant="h5">DNIAS</Typography>
							</Box>
							<Box className="col-span-12 md:col-span-12 bg-secondary rounded text-white p-4">
								<Typography>Inicio de sesión</Typography>
							</Box>
							<Box className="col-span-12 md:col-span-12 p-4">
								<Box className="mb-2">
									<FormControl fullWidth className="">
										<TextField type="text" label="Usuario" required onChange={formikL.handleChange} onBlur={formikL.handleBlur} name="usuario" />
										{formikL.touched.usuario && formikL.errors.usuario ? <div className="text-red-700">{formikL.errors.usuario}</div> : null}
									</FormControl>
								</Box>
								<Box className="mb-2">
									<FormControl fullWidth>
										<InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											type={showPassword ? 'text' : 'password'}
											endAdornment={
												<InputAdornment position="end">
													<IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											required
											label="Contraseña"
											name="pass"
											onChange={formikL.handleChange}
											onSubmit={formikL.handleSubmit}
										/>
										{formikL.touched.pass && formikL.errors.pass ? <div className="text-red-700">{formikL.errors.pass}</div> : null}
									</FormControl>
								</Box>
								<Box className="p-2">
									<Button variant="contained" type="submit" className="!bg-primary">
										Iniciar sesión
									</Button>
								</Box>

								<Box className="col-span-12 text-primary dark:!text-inherit">
									Si olvido su contraseña de click{' '}
									<Link
										href="#"
										color="inherit"
										onClick={() => {
											handleOpenModal();
										}}
									>
										aquí
									</Link>{' '}
								</Box>
							</Box>
						</Box>
						<Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2" className="text-white headertop p-4">
									Reposición de contraseña
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }} className="p-4">
									{recover1}
								</Typography>
							</Box>
						</Modal>
					</form>
				</Paper>
			</Box>
		</>
	);
};

export default Login;
