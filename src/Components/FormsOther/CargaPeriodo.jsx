import {  TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { UtilsContext } from '../Context/UtilsProvider';
import { DataContext } from '../Context/DataProvider';
import { FormularioContext } from '../Context/FormularioProvider';

const CargaPeriodo = () => {
	const { headerList } = useContext(DataContext);
	const { SnackbarData, setSnackbarData } = useContext(UtilsContext);
	const { getTress } = useContext(FormularioContext);
	const formik = useFormik({
		initialValues: {
			year: '',
		},
		onSubmit: (values) => {
			// Simulate form submission
			console.log('values', values);
			let cargarSession = async (values) => {
				try {
					// Simulate API call to upload file
					console.log('Guardando Datos...');
					let response = await fetch('https://api.dif.gob.mx/comiteEtica/carpetas/generar_periodo/', {
						method: 'POST',
						headers: headerList,
						body: JSON.stringify(values),
					});
					if (response.status >= 400) throw { status: response.status, statusText: response.statusText};
					if (!response.ok) {
						throw { status: response.status, message: response.statusText };
					}
					let json = response.json();
					console.log('Archivo cargado correctamente:', json);
					setSnackbarData({
						...SnackbarData,
						open: true,
						severity: 'success',
						content: 'Carpeta de año Creada Correctamente',
					});
					getTress();
				} catch (error) {
					console.error('Error al cargar archivo:', error);
					setSnackbarData({
						...SnackbarData,
						open: true,
						severity: 'error',
						content: `Error al generar el periodo: ${error.message}`,
					});
				}
			};
			cargarSession(values);
		},
		validationSchema: Yup.object({
			year: Yup.string().required('Año requerido'),
		}),
	});
	////////////////////////
	
	////////////////////////
	return (
		<Card className="col-span-12 grid grid-cols-12 gap-4 !p-4">
			<form className="col-span-12 grid grid-cols-12 gap-4" onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur}>
				<Box className="col-span-12 md:col-span-12">
					<TextField
						fullWidth
						type="number"
						name="year"
						required
						placeholder="Periodo en el que se sube el archivo, ejem: 2025"
						label="Periodo del archivo"
						helperText="Periodo en el que se sube el archivo, ejem: 2025"
						inputProps={{
							min: 2020,
							max: 2100,
						}}
						error={formik.touched.year && Boolean(formik.errors.year)}
					/>
					{formik.touched.year && formik.errors.year ? <Box className="text-red-600 col-span-12">{formik.errors.year}</Box> : null}
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

export default CargaPeriodo;
