import React from 'react';
import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button } from '@mui/material';
import { ErrorMessage, useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import BotonGuardar from '../BotonGuardar';
import axios from 'axios';

const TipoInstitutcion = () => {
	const {
		FormTipoInstitucion,
		IDEntidad,
		IDMunicipio,
		Entidad,
		Municipio,
		clearFormCAI,
		BotoneraForm,
		setTipoInstitucion,
		TipoInstitucion,
		TipoServicioInstitucion,
		setTipoServicioInstitucion,
		TipoRegistro,
	} = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormTipoInstitucion.data,
		validationSchema: Yup.object({
			tipo_registro: Yup.number().required('Este campo es obligatorio'),
			tipo_institucion: Yup.number().required('Este campo es obligatorio'),
			rfc_institucion: Yup.string().required('Este campo es obligatorio').max(13, 'El RFC debe tener 13 caracteres.').min(13,  'El RFC debe tener 13 caracteres.').required('Este campo es obligatorio'),
			razon_social: Yup.string().required('Este campo es obligatorio'),
			siglas_institucion: Yup.string().required('Este campo es obligatorio'),
			tipo_servicio: Yup.number().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			try {
				console.log('Submit values',values);
				setOpenBackDrop(true);
				let response;
				if (formik.values.id_centro != null) {
					response = await axios.post(`https://api.dif.gob.mx/cuidados/cai/registro/`, values, { headers: headerList });
				}else{
					response = await axios.post(`https://api.dif.gob.mx/cuidados/cai/actualizar/`, values, { headers: headerList });
				}
				console.log('response',response)
				setOpenBackDrop(false);
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: response.data.statusText,
					duration: 3000,
				});
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
					Tipo de Institución y Servicios Brindados
				</Typography>
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					{/* Tipo de registro  */}
					<Box className="col-span-12 md:col-span-6">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Tipo de registro "
							name="tipo_registro"
							value={formik.values.tipo_registro}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.tipo_registro && Boolean(formik.errors.tipo_registro)}
							helperText={
								formik.errors.tipo_registro
									? formik.touched.tipo_registro && formik.errors.tipo_registro
									: '(seleccione de acuerdo a si es un registro de una matriz o una filial.)'
							}
							required
						>
							<MenuItem key={1} value="1">
								Matriz
							</MenuItem>
							<MenuItem key={2} value="2">
								Filial
							</MenuItem>
						</TextField>
					</Box>
					{/* Tipo de institución  */}
					<Box className="col-span-12 md:col-span-6">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Tipo de institución "
							name="tipo_institucion"
							value={TipoInstitucion}
							onChange={(e) => {
								setTipoInstitucion(e.target.value);
								formik.values.tipo_institucion = e.target.value;
							}}
							onBlur={formik.handleBlur}
							error={formik.touched.tipo_institucion && Boolean(formik.errors.tipo_institucion)}
							helperText={
								formik.errors.tipo_institucion
									? formik.touched.tipo_institucion && formik.errors.tipo_institucion
									: '(seleccione de acuerdo a su figura jurídica, ejemplo: Asociación civil igual a privada.)'
							}
							required
						>
							<MenuItem key={1} value="1">
								Pública
							</MenuItem>
							<MenuItem key={2} value="2">
								Privada
							</MenuItem>
							
						</TextField>
					</Box>
					{/* RFC */}
					<Box className="col-span-12 md:col-span-6">
						<TextField
							fullWidth
							className="col-span-12"
							label="RFC"
							name="rfc_institucion"
							value={formik.values.rfc_institucion}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.rfc_institucion && Boolean(formik.errors.rfc_institucion)}
							helperText={formik.touched.rfc_institucion && formik.errors.rfc_institucion}
							required
							inputProps={{ maxLength: 13, minLength: 13 }}
						/>
					</Box>
					{/* Nombre/Razón social */}
					<Box className="col-span-12 md:col-span-9">
						<TextField
							fullWidth
							className="col-span-12"
							label="Nombre, Denominación o Razón Social"
							name="razon_social"
							value={formik.values.razon_social}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.razon_social && Boolean(formik.errors.razon_social)}
							helperText={formik.touched.razon_social && formik.errors.razon_social}
							required
						/>
					</Box>
					{/* Siglas */}
					<Box className="col-span-12 md:col-span-3">
						<TextField
							fullWidth
							className="col-span-12 "
							label="Sigas"
							name="siglas_institucion"
							value={formik.values.siglas_institucion}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.siglas_institucion && Boolean(formik.errors.siglas_institucion)}
							helperText={formik.touched.siglas_institucion && formik.errors.siglas_institucion}
							required
						/>
					</Box>

					{/* Tipo de Servicio que brinda su Institución (Si su institución brinda servicios de salud por favor selecciones la 3a opción AMBAS DE ASISTENCIA Y SALUD.) */}
					<Box className="col-span-12 md:col-span-6">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Tipo de Servicio que brinda su Institución"
							name="tipo_servicio"
							value={TipoServicioInstitucion}
							onChange={(e) => {
								setTipoServicioInstitucion(e.target.value);
								formik.values.tipo_servicio = e.target.value;
							}}
							onBlur={formik.handleBlur}
							error={formik.touched.tipo_servicio && Boolean(formik.errors.tipo_servicio)}
							helperText={
								formik.touched.tipo_servicio && formik.errors.tipo_servicio
									? formik.errors.tipo_servicio
									: 'Si su institución brinda servicios de salud por favor selecciones la 2a opción DE ASISTENCIA SOCIAL y SALUD'
							}
							required
						>
							<MenuItem key={1} value="1">
								DE ASISTENCIA SOCIAL
							</MenuItem>
							<MenuItem key={2} value="2">
								DE ASISTENCIA SOCIAL Y SALUD
							</MenuItem>
						</TextField>
					</Box>
					{/* Observaciones internas */}
					{/* <Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<TextField
							type="text"
							multiline
							rows={4}
							rowsMax={6}
							fullWidth
							className="col-span-12 md:col-span-6"
							label="Observaciones internas"
							name="observaciones"
							value={formik.values.observaciones}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
							helperText={formik.touched.observaciones && formik.errors.observaciones}
							inputProps={{ maxLength: 10 }}
						/>
					</Box> */}

					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default TipoInstitutcion;
