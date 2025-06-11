import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { DataContext } from '../../Context/DataProvider';
import PropTypes from 'prop-types';
const RepPassToken = ({ changeRecover }) => {
	const { recoverCorreo, createSnackBar } = useContext(DataContext);
	const headerList = {
		Accept: '*/*',
		'Content-Type': 'application/json',
	};
	const formik = useFormik({
		initialValues: {
			token: '',
		},
		validationSchema: Yup.object({
			token: Yup.string().required('Este campo es requerido'),
		}),
		onChange: (values) => {
			//console.log(JSON.stringify(values, null, 2));
		},
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			let insert = async () => {
				try {
					//console.log("init fetching");
					let res = await fetch('https://api.dif.gob.mx/enadc/DatosGenerales/validaToken/', {
						method: 'POST',
						body: JSON.stringify(values),
						headers: headerList,
					});
					//console.log("res", res);
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
					//setRecoverCorreo(json.correo1)
					setLoading(false);
					changeRecover(3);
				} catch (e) {
					//console.log("error", e.status, e.statusText);
					createSnackBar(`Código: ${e.status}, ${e.statusText}, verifique sus datos por favor `, 'warning', 5000);
					setLoading(false);
				}
			};
			//
			insert();
		},
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const timer = useRef();

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	useEffect(() => {
		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	const handleButtonClick = () => {
		if (!loading) {
			setSuccess(false);
			setLoading(true);
			timer.current = window.setTimeout(() => {
				setSuccess(true);
				formik.submitForm();
			}, 2000);
		}
	};
	return (
		<Box className="text-black">
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
				<Box className="col-span-12 md:col-span-12 bg-green-950 rounded text-white p-4">
					<Typography>Escriba el código que se envío a tu correo para continuar</Typography>
				</Box>
				<Box className="col-span-12 md:col-span-12 p-4">
					<Typography>Correo: {recoverCorreo}</Typography>

					<Box className="mb-2">
						<FormControl fullWidth className="">
							<TextField type="text" label="Código de acceso" required onChange={formik.handleChange} onBlur={formik.handleBlur} name="token" />
							{formik.touched.token && formik.errors.token ? <div className="text-red-700">{formik.errors.token}</div> : null}
						</FormControl>
					</Box>

					<Box sx={{ m: 1, position: 'relative' }}>
						<Button variant="contained" sx={buttonSx} disabled={loading} fullWidth color="primary" onClick={handleButtonClick}>
							Enviar código
						</Button>
						{loading && (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
									position: 'absolute',
									top: '50%',
									left: '50%',
									marginTop: '-12px',
									marginLeft: '-12px',
								}}
							/>
						)}
					</Box>
				</Box>
			</form>
		</Box>
	);
};
export default RepPassToken;
RepPassToken.propTypes = {
	changeRecover: PropTypes.element.isRequired,
};
