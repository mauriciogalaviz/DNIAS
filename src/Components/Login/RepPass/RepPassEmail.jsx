import { Box, FormControl, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { DataContext } from '../../Context/DataProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
const RepPassEmail = ({ changeRecover }) => {
	const { setRecoverCorreo, createSnackBar } = useContext(DataContext);
	const headerList = {
		Accept: '*/*',
		'Content-Type': 'application/json',
	};
	const formik = useFormik({
		initialValues: {
			correo1: '',
		},
		validationSchema: Yup.object({
			correo1: Yup.string().required('Este campo es requerido').email('No es un correo'),
		}),
		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			let insert = async () => {
				try {
					//console.log('init fetching');
					setRecoverCorreo(formik.values.correo1);
					//console.log('set correo', recoverCorreo);
					let res = await fetch('https://api.dif.gob.mx/enadc/DatosGenerales/recuperacion/', {
						method: 'POST',
						body: JSON.stringify(values),
						headers: headerList,
					});
					//console.log('res', res);
					if (!res.ok)
						throw {
							status: res.status,
							statusText: res.statusText,
						};
					let json = await res.json();
					//console.log(json);
					if (!json.ok)
						throw {
							status: json.status,
							statusText: json.statusText,
						};
					//console.log('correo1', formik.values.correo1);

					//console.log(recoverCorreo);
					setLoading(false);
					changeRecover(2);
					createSnackBar(`Email enviado correctamente`, 'success', 5000);
				} catch (e) {
					//console.log('error', e.status, e.statusText);
					createSnackBar(`Código: ${e.status}, ${e.statusText}, verifique sus datos por favor `, 'warning', 5000);
					setLoading(false);
				}
			};
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
				<Box className="col-span-12 md:col-span-12 bg-yellow-700 rounded text-white p-4">
					<Typography>Escriba su correo electrónico, el mismo que registro cuando se dio de alta</Typography>
				</Box>
				<Box className="col-span-12 md:col-span-12 p-4">
					<Box className="mb-2">
						<FormControl fullWidth className="">
							<TextField type="email" label="Correo Electrónico" required onChange={formik.handleChange} onBlur={formik.handleBlur} name="correo1" />
							{formik.touched.correo1 && formik.errors.correo1 ? <div className="text-red-700">{formik.errors.correo1}</div> : null}
						</FormControl>
					</Box>

					<Box sx={{ m: 1, position: 'relative' }}>
						<Button variant="contained" sx={buttonSx} disabled={loading} fullWidth color="primary" onClick={handleButtonClick}>
							Enviar correo
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
export default RepPassEmail;
RepPassEmail.propTypes = {
	changeRecover: PropTypes.element.isRequired,
};
