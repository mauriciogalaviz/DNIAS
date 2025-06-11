import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { UtilsContext } from '../Context/UtilsProvider';
import { FormularioContext } from '../Context/FormularioProvider';
import PropTypes from 'prop-types'

const SaveFiles = ({handleFiles, anio}) => {
	const { SnackbarData, setSnackbarData, DialogData, setDialogData } = useContext(UtilsContext);
	const { SessionId } = useContext(FormularioContext);

	const formik = useFormik({
		initialValues: {
			files: null,
		},
		validationSchema: Yup.object({
			files: Yup.mixed().required('Archivo es obligatorio'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				console.log(values.files);
				let formData = new FormData();
				formData.append('id_sesion', SessionId);
				formData.append('file', values.files);

				let response = await fetch('https://api.dif.gob.mx/comiteEtica/documentos/', {
					method: 'POST',
					body: formData,
					
				});

				if (response.status === 404) {
					throw new Error('No se puede cargar el archivo');
				}

				if (!response.ok) {
					throw new Error(response.statusText);
				}

				let json = await response.json();
				console.log(json);

				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: 'Archivo cargado con éxito',
				});
				handleFiles(SessionId, anio);
				setDialogData({
					...DialogData,
					open: false,
				});
			} catch (error) {
				console.error('Error:', error);
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'error',
					content: `Error al cargar archivo: ${error.message}`,
				});
			} finally {
				setSubmitting(false);
			}
		},
	});

	const handleFileChange = (event) => {
		formik.setFieldValue('files', event.currentTarget.files[0]);
	};

	return (
		<Box className="col-span-12 grid grid-cols-12 gap-4 p-4">
			<form className="col-span-12 grid grid-cols-12 gap-4" onSubmit={formik.handleSubmit}>
				<Box className="col-span-12 md:col-span-6">
					<TextField
						fullWidth
						type="file"
						name="files"
						required
						label="Subir Archivo..."
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleFileChange}
						error={formik.touched.files && Boolean(formik.errors.files)}
						helperText={formik.touched.files && formik.errors.files}
					/>
				</Box>
				<Box className="col-span-4">
					<Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
						GUARDAR
					</Button>
				</Box>
			</form>
		</Box>
	);
};

SaveFiles.propTypes = {
    handleFiles: PropTypes.func.isRequired,
    anio: PropTypes.number.isRequired,
};

export default SaveFiles;
