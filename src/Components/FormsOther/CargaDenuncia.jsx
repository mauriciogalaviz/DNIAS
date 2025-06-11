import {  TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { UtilsContext } from '../Context/UtilsProvider';
import { DataContext } from '../Context/DataProvider';
import PropTypes from 'prop-types'
import SelectUsers from './SelectUsers';
import { FormularioContext } from '../Context/FormularioProvider';


const CargaDenuncia = ({year}) => {
	const { personName, setPersonName, getTress } = useContext(FormularioContext);
	const { headerList } = useContext(DataContext);
	const { SnackbarData, setSnackbarData } = useContext(UtilsContext);
	const formik = useFormik({
		initialValues: {
			year: year,
			subCarpetaDenuncias: '',
			users: []
		},
		onSubmit: (values) => {
			// Simulate form submission
			formik.values.users = personName; 
			console.log('values', values);
			let cargarSession = async (values) => {
				try {
					// Simulate API call to upload file
					console.log('Guardando Datos...');
					let response = await fetch('https://api.dif.gob.mx/comiteEtica/carpetas/', {
						method: 'POST',
						headers: headerList,
						body: JSON.stringify(values),
					});
					if (response.status === 404) throw { status: response.status, message: 'no se puede cargar el archivo' };
					if (!response.ok) {
						throw { status: response.status, message: response.statusText };
					}
					let json = response.json();
					console.log('Archivo cargado correctamente:', json);
					setSnackbarData({
						...SnackbarData,
						open: true,
						severity: 'success',
						content: 'Session Creada Correctamente',
					});
					setPersonName([]);
					formik.resetForm();
					getTress();
				} catch (error) {
					console.error('Error al cargar archivo:', error);
					setSnackbarData({
						...SnackbarData,
						open: true,
						severity: 'error',
						content: 'Error al cargar archivo',
					});
				}
			};
			cargarSession(values);
		},
		validationSchema: Yup.object({
			subCarpetaDenuncias: Yup.string().required('Subcarpeta de denuncia requerido'),
		}),
	});
	////////////////////////
	
	////////////////////////
	return (
		<Card className="col-span-12 grid grid-cols-12 gap-4 !p-4">
			<form className="col-span-12 grid grid-cols-12 gap-4" onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur}>
					<Box className="col-span-12 md:col-span-12">
						<Box className="col-span-12 md:col-span-4">
							<TextField
								fullWidth
								type="text"
								name="subCarpetaDenuncias"
								required
								placeholder="Inserte el nombre de la sub carpeta de denuncias"
								label="Sub carpeta de denuncias"
								helperText="Inserte el nombre de la sub carpeta de denuncias"
								inputProps={{
									inputMode: 'numeric',
									min: 1,
									max: 365,
								}}
							/>
						</Box>
						<Box className="col-span-12 md:col-span-4">
							<SelectUsers formik={formik} />
						</Box>
					</Box>
				
				
				<Box className="col-span-12">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={(e) => {
							e.preventDefault();
							console.log(formik.errors);
							formik.handleSubmit();
						}}
					>
						GUARDAR
					</Button>
					
				</Box>
			</form>
		</Card>
	);
};

CargaDenuncia.propTypes = {
    year: PropTypes.number,
};

export default CargaDenuncia;
