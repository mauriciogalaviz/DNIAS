import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import ServiciosInstitucionDataTable from './ServiciosInstitucionDataTable';
import BotonGuardar from '../BotonGuardar';

const RecursosHumanosGobierno = () => {
	const { FormRecursosHumanosGobierno, IDEntidad, IDMunicipio, Entidad, Municipio, clearFormCAI, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormRecursosHumanosGobierno.data,
		validationSchema: Yup.object({
			id_centro: Yup.string().required('Este campo es obligatorio'),
			institucion_gobierno_apoyo: Yup.string().required('Este campo es obligatorio'),
			nombre_instituto_gob: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			setOpenBackDrop(true);

			let url = `https://api.dif.gob.mx/cuidados/cai/registro/`;
			let metodo = 'POST';
			if (formik.values.id_centro != null) {
				url = `https://api.dif.gob.mx/cuidados/cai/actualizar/`;
				metodo = 'PUT';
			}

			try {
				let response = await fetch(url, {
					method: metodo,
					headers: headerList,
					body: JSON.stringify(values),
				});
				if (!response.ok) throw { error: response.status, message: response.statusText };
				let json = await response.json();
				console.log(json);
				setOpenBackDrop(false);
				clearFormCAI();
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: 'CAI creada correctamente.',
					duration: 3000,
				});
				clearFormCAI();
			} catch (error) {
				console.error('Error:', error);
				setOpenBackDrop(false);
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'error',
					content: 'Hubo un error al crear la CAI. Por favor, intente de nuevo.',
					duration: 3000,
				});
			}
		},
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: true,
		validateOnMount: true,
	});
	return (
		<Box className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					{/* Nombre de la Institución de Gobierno */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Institución de gobierno que brinda el apoyo"
							name="institucion_gobierno_apoyo"
							value={formik.values.institucion_gobierno_apoyo}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.institucion_gobierno_apoyo && Boolean(formik.errors.institucion_gobierno_apoyo)}
							helperText={formik.touched.institucion_gobierno_apoyo && formik.errors.institucion_gobierno_apoyo}
						>
							<MenuItem key={1} value="1">
								Federal
							</MenuItem>
							<MenuItem key={2} value="2">
								Estatal
							</MenuItem>
							<MenuItem key={3} value="3">
								Municipal
							</MenuItem>
							<MenuItem key={4} value="4">
								Varias
							</MenuItem>
						</TextField>
						<TextField
							fullWidth
							className="col-span-12"
							label="Nombre de la institución de gobierno"
							name="nombre_instituto_gob"
							value={formik.values.nombre_instituto_gob}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.nombre_instituto_gob && Boolean(formik.errors.nombre_instituto_gob)}
							helperText={formik.touched.nombre_instituto_gob && formik.errors.nombre_instituto_gob}
							required
						/>
					</Box>
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default RecursosHumanosGobierno;
