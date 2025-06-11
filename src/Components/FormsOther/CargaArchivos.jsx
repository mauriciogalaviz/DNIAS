import { TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { UtilsContext } from '../Context/UtilsProvider';
import PropTypes from 'prop-types';
import { FormularioContext } from '../Context/FormularioProvider';
import { LoginContext } from '../Context/LoginProvider';
import { useState } from 'react';

const CargaArchivos = ({ id }) => {
	const { SnackbarData, setSnackbarData } = useContext(UtilsContext);
	const {  getFiles } = useContext(FormularioContext);
	const { UserLogIn } = useContext(LoginContext);
	const [dataFile, setDataFile] = useState('');
	const [nombreFile, setNombreFile] = useState(null);
	const formik = useFormik({
		initialValues: {
			id_carpeta: id,
			fileUp: [],
		},
		onSubmit: (values) => {
			// Simulate form submission
			console.log(dataFile)
			console.log('values', values);
			let cargarSession = async (values) => {
				try {
					let datos = new FormData();
					datos.append('id_carpeta', values.id_carpeta);

					datos.append('file', dataFile, dataFile.name);

					console.error('No file provided');

					console.log('Guardando Datos...');
					let response = await fetch('https://api.dif.gob.mx/comiteEtica/documentos/', {
						method: 'POST',
						headers: {
							//'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${UserLogIn.token}`,
							//Accept: '*/*',
							'Access-Control-Allow-Origin': '*',
							mode: 'cors',
						},
						body: datos,
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
					//getTress();
					getFiles(values.id_carpeta);
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
			files: Yup.mixed(),
		}),
	});
	return (
		<Card className="col-span-12 grid grid-cols-12 gap-4 !p-4">
			<form className="col-span-12 grid grid-cols-12 gap-4" onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur}>
				<Box className="col-span-12 md:col-span-12">
					<TextField
						fullWidth
						type="file"
						name="files"
						required
						label="Subir Archivo..."
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e)=>{
							console.log('e.target.value', e.target.value);
							console.log('e.target.files', e.target.files);
							console.log('e.target.files[0]', e.target.files[0]);
							setDataFile(e.target.files[0]);
							setNombreFile(e.target.files[0].name);
							console.log(dataFile);
							formik.setFieldValue('fileUp', e.target.files[0]);
							console.log(formik.values);
						}}
						error={formik.touched.files && Boolean(formik.errors.files)}
						helperText={formik.touched.files && formik.errors.files}
					/>
					<Typography className="col-span-12   rounded p-2">{nombreFile}</Typography>
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

CargaArchivos.propTypes = {
	id: PropTypes.string.isRequired,
};

export default CargaArchivos;
