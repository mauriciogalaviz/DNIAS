import React from 'react';
import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import DocumentacionDataTable from './DocumentacionDataTable';
import BotonGuardar from '../BotonGuardar';

const Documentacion = () => {
	const { FormDocumentacion, clearFormCAI, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormDocumentacion.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio'),
			nombre_captura: Yup.string().required('Este campo es obligatorio'),
			cargo_captura: Yup.string().required('Este campo es obligatorio'),
			fecha_captura: Yup.string().required('Este campo es obligatorio'),
			modelo_intervencion: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			setOpenBackDrop(true);
			
			let url = `https://api.dif.gob.mx/cuidados/cai/registro/`;
			let metodo = 'POST';
			if (formik.values.id_institucion != null) {
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
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Documentación y responsable de llenado
				</Typography>
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					<Box className="col-span-12 md:col-span-12">
						<DocumentacionDataTable />
					</Box>
					<Divider className="col-span-12 pt-2" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit dark:!text-inherit">
						Modelo de intervención
					</Typography>
					<Box className="col-span-12 md:col-span-12 text-left">
						<FormControl component="fieldset">
							<FormLabel component="legend" error={formik.touched.modelo_intervencion && Boolean(formik.errors.modelo_intervencion)}>
								¿Cuenta con un modelo de intervención en asistencia social establecido?*
							</FormLabel>
							<RadioGroup row name="modelo_intervencion" value={formik.values.modelo_intervencion || ''} onChange={formik.handleChange}>
								<FormControlLabel value={true} control={<Radio />} label="Sí" />
								<FormControlLabel value={false} control={<Radio />} label="No" />
							</RadioGroup>
							<FormHelperText className="!text-red-600">{formik.touched.modelo_intervencion && formik.errors.modelo_intervencion}</FormHelperText>
						</FormControl>
					</Box>
					<Divider className="col-span-12 pt-2" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit dark:!text-inherit">
						Responsable del llenado de la cédula
					</Typography>

					<Box className="col-span-12 grid grid-cols-12 md:col-span-12 lg:col-span-5">
						<TextField
							type="text"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Nombre completo"
							name="nombre_captura"
							value={formik.values.nombre_captura}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.nombre_captura && Boolean(formik.errors.nombre_captura)}
							helperText={formik.touched.nombre_captura && formik.errors.nombre_captura}
							required
						/>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-12 lg:col-span-5">
						<TextField
							type="text"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Cargo"
							name="cargo_captura"
							value={formik.values.cargo_captura}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.cargo_captura && Boolean(formik.errors.cargo_captura)}
							helperText={formik.touched.cargo_captura && formik.errors.cargo_captura}
							required
						/>
					</Box>
					{/* Fecha de Expedición */}
					<Box className="col-span-12 md:col-span-4 lg:col-span-2">
						<TextField
							type="date"
							fullWidth
							name="fecha_captura"
							label="Fecha de captura"
							value={formik.values.fecha_captura}
							onChange={(e) => {
								formik.setFieldValue('fecha_captura', e.target.value);
								formik.values.fecha_captura = e.target.value;
								console.log('fecha_captura', formik.values.fecha_captura);
							}}
							InputLabelProps={{ shrink: true }}
							error={false}
						/>
					</Box>

					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default Documentacion;
