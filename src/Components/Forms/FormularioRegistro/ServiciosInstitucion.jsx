import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import ServiciosInstitucionDataTable from './ServiciosInstitucionDataTable';
import BotonGuardar from '../BotonGuardar';
import { Add } from '@mui/icons-material';
import { InputLabel } from '@mui/material';

const ServiciosInstitucion = () => {
	const { FormDatosServicios, IDEntidad, IDMunicipio, Entidad, Municipio, clearFormCAI, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormDatosServicios.data,
		validationSchema: Yup.object({
			objeto_social: Yup.string().required('Este campo es obligatorio'),
			poblacion_objetivo_1: Yup.boolean().notRequired(),
			poblacion_objetivo_2: Yup.boolean().notRequired(),
			poblacion_objetivo_3: Yup.boolean().notRequired(),
			poblacion_objetivo_4: Yup.boolean().notRequired(),
			familias: Yup.boolean().notRequired(),
			apoyo_otras: Yup.boolean().notRequired(),
			investigacion: Yup.boolean().notRequired(),
			cantidad_H_1: Yup.number().notRequired(),
			cantidad_M_1: Yup.number().notRequired(),
			cantidad_H_2: Yup.number().notRequired(),
			cantidad_M_2: Yup.number().notRequired(),
			cantidad_H_3: Yup.number().notRequired(),
			cantidad_M_3: Yup.number().notRequired(),
			cantidad_H_4: Yup.number().notRequired(),
			cantidad_M_4: Yup.number().notRequired(),
			familias_cantidad: Yup.number().notRequired(),
			apoyo_otras_cantidad: Yup.number().notRequired(),
			investigacion_describe: Yup.string().notRequired(),
			cantidad_localidades: Yup.number().required('Este campo es obligatorio'),
			cantidad_colonias: Yup.number().required('Este campo es obligatorio'),
			cantidad_personas: Yup.number().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			setOpenBackDrop(true);
			values.id_entidad = IDEntidad;
			values.id_municipio = IDMunicipio;
			values.entidad = Entidad;
			values.municipio = Municipio;
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
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Servicios de institución
				</Typography>
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Objeto social de la institución
					</Typography>

					<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<TextField
							type="text"
							multiline
							rows={4}
							rowsMax={6}
							fullWidth
							className="col-span-12 md:col-span-6"
							label="Escriba como aparece en el documento de creación"
							name="objeto_social"
							value={formik.values.objeto_social}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.objeto_social && Boolean(formik.errors.objeto_social)}
							helperText={formik.touched.objeto_social && formik.errors.objeto_social}
							required
						/>
					</Box>
					<Divider className="col-span-12 pt-2" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Población objetivo de la institución
					</Typography>
					{/* NIÑAS Y/O NIÑOS (0 A 11 AÑOS) */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={
									<Checkbox
										name="poblacion_objetivo_1"
										checked={formik.values.poblacion_objetivo_1}
										onChange={(event) => {
											formik.setFieldValue('poblacion_objetivo_1', event.target.checked);
										}}
										onBlur={formik.handleBlur}
									/>
								}
								label="NIÑAS Y/O NIÑOS (0 A 11 AÑOS)"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de hombres"
								name="cantidad_H_1"
								value={formik.values.cantidad_H_1 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_H_1 && Boolean(formik.errors.cantidad_H_1)}
								helperText={formik.touched.cantidad_H_1 && formik.errors.cantidad_H_1}
								size="small"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_1"
								value={formik.values.cantidad_M_1 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_1 && Boolean(formik.errors.cantidad_M_1)}
								helperText={formik.touched.cantidad_M_1 && formik.errors.cantidad_M_1}
								size="small"
							/>
						</Box>
					</Box>
					{/* ADOLESCENTES (12 A 17 AÑOS) */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={
									<Checkbox
										name="poblacion_objetivo_2"
										checked={formik.values.poblacion_objetivo_2}
										onChange={(event) => {
											formik.setFieldValue('poblacion_objetivo_2', event.target.checked);
										}}
										onBlur={formik.handleBlur}
									/>
								}
								label="ADOLESCENTES (12 A 17 AÑOS)"
							/>
							{/* <FormControlLabel
								control={
									<Checkbox name="poblacion_objetivo_2" checked={formik.values.poblacion_objetivo_2 || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
								}
								label="ADOLESCENTES (12 A 17 AÑOS)"
							/> */}
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de hombres"
								name="cantidad_H_2"
								value={formik.values.cantidad_H_2 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_H_2 && Boolean(formik.errors.cantidad_H_2)}
								helperText={formik.touched.cantidad_H_2 && formik.errors.cantidad_H_2}
								size="small"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_2"
								value={formik.values.cantidad_M_2 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_2 && Boolean(formik.errors.cantidad_M_2)}
								helperText={formik.touched.cantidad_M_2 && formik.errors.cantidad_M_2}
								size="small"
							/>
						</Box>
					</Box>
					{/* ADULTOS (18 A 59 AÑOS) */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={
									<Checkbox name="poblacion_objetivo_3" checked={formik.values.poblacion_objetivo_3 || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
								}
								label="ADULTOS (18 A 59 AÑOS)"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de hombres"
								name="cantidad_H_3"
								value={formik.values.cantidad_H_3 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_H_3 && Boolean(formik.errors.cantidad_H_3)}
								helperText={formik.touched.cantidad_H_3 && formik.errors.cantidad_H_3}
								size="small"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_3"
								value={formik.values.cantidad_M_3 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_3 && Boolean(formik.errors.cantidad_M_3)}
								helperText={formik.touched.cantidad_M_3 && formik.errors.cantidad_M_3}
								size="small"
							/>
						</Box>
					</Box>
					{/* ADULTOS MAYORES (60 EN ADELANTE) */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={
									<Checkbox name="poblacion_objetivo_4" checked={formik.values.poblacion_objetivo_4 || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
								}
								label="ADULTOS MAYORES (60 EN ADELANTE)"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de hombres"
								name="cantidad_H_4"
								value={formik.values.cantidad_H_4 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_H_4 && Boolean(formik.errors.cantidad_H_4)}
								helperText={formik.touched.cantidad_H_4 && formik.errors.cantidad_H_4}
								size="small"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_4"
								value={formik.values.cantidad_M_4 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_4 && Boolean(formik.errors.cantidad_M_4)}
								helperText={formik.touched.cantidad_M_4 && formik.errors.cantidad_M_4}
								size="small"
							/>
						</Box>
					</Box>
					<Divider className="col-span-12" />
					{/* FAMILIAS */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={<Checkbox name="familias" checked={formik.values.familias || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
								label="FAMILIAS"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-2">
							<TextField
								type="number"
								fullWidth
								label="Cantidad"
								name="familias_cantidad"
								value={formik.values.familias_cantidad || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.familias_cantidad && Boolean(formik.errors.familias_cantidad)}
								helperText={formik.touched.familias_cantidad && formik.errors.familias_cantidad}
								size="small"
							/>
						</Box>
						{/* <Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_5"
								value={formik.values.cantidad_M_5 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_5 && Boolean(formik.errors.cantidad_M_5)}
								helperText={formik.touched.cantidad_M_5 && formik.errors.cantidad_M_5}
								size="small"
							/>
						</Box> */}
					</Box>

					{/* APOYO A OTRAS INSTITUCIONES */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={<Checkbox name="apoyo_otras" checked={formik.values.apoyo_otras || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
								label="APOYO A OTRAS INSTITUCIONES"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-2">
							<TextField
								type="number"
								fullWidth
								label="Cantidad"
								name="apoyo_otras_cantidad"
								value={formik.values.apoyo_otras_cantidad || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.apoyo_otras_cantidad && Boolean(formik.errors.apoyo_otras_cantidad)}
								helperText={formik.touched.apoyo_otras_cantidad && formik.errors.apoyo_otras_cantidad}
								size="small"
							/>
						</Box>
						{/* <Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_6"
								value={formik.values.cantidad_M_6 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_6 && Boolean(formik.errors.cantidad_M_6)}
								helperText={formik.touched.cantidad_M_6 && formik.errors.cantidad_M_6}
								size="small"
							/>
						</Box> */}
					</Box>
					{/* INVESTIGACIÓN */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-3 gap-4 text-left">
						<Box className="col-span-12 md:col-span-1">
							<FormControlLabel
								control={<Checkbox name="investigacion" checked={formik.values.investigacion || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
								label="INVESTIGACIÓN"
							/>
						</Box>
						<Box className="col-span-12 md:col-span-2">
							<TextField
								multiline
								rows={3}
								maxRows={6}
								fullWidth
								label="Describa"
								name="investigacion_describe"
								value={formik.values.cantidad_H_7 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.investigacion_describe && Boolean(formik.errors.cantidad_H_7)}
								helperText={formik.touched.investigacion_describe && formik.errors.investigacion_describe}
								size="small"
							/>
						</Box>
						{/* <Box className="col-span-12 md:col-span-1">
							<TextField
								type="number"
								fullWidth
								label="Cantidad de mujeres"
								name="cantidad_M_7"
								value={formik.values.cantidad_M_7 || ''}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cantidad_M_7 && Boolean(formik.errors.cantidad_M_7)}
								helperText={formik.touched.cantidad_M_7 && formik.errors.cantidad_M_7}
								size="small"
							/>
						</Box> */}
					</Box>
					<Divider className="col-span-12 pt-2" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Cobertura geográfica del servicio
					</Typography>

					<Box className="col-span-12 md:col-span-12">
						<InputLabel className='col-span-12 !text-right'>Agregar los Estados y Municipios de la cobertura geográfica  dando clic en el botón <Add /> de la tabla </InputLabel>
						<ServiciosInstitucionDataTable />
					</Box>
					<Box className="col-span-12 md:col-span-6 lg:col-span-4">
						<TextField
							type="number"
							fullWidth
							label="¿Cuantas localidades atiende?"
							name="cantidad_localidades"
							value={formik.values.cantidad_localidades || ''}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.cantidad_localidades && Boolean(formik.errors.cantidad_localidades)}
							helperText={formik.touched.cantidad_localidades && formik.errors.cantidad_localidades}
						/>
					</Box>
					<Box className="col-span-12 md:col-span-6 lg:col-span-4">
						<TextField
							type="number"
							fullWidth
							label="¿Cuantas colonias atiende?"
							name="cantidad_colonias"
							value={formik.values.cantidad_colonias || ''}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.cantidad_colonias && Boolean(formik.errors.cantidad_colonias)}
							helperText={formik.touched.cantidad_colonias && formik.errors.cantidad_colonias}
						/>
					</Box>
					<Box className="col-span-12 md:col-span-6 lg:col-span-6">
						<TextField
							type="number"
							fullWidth
							label="Capacidad máxima de personas que puede atender su institución"
							name="cantidad_personas"
							value={formik.values.cantidad_personas || ''}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.cantidad_personas && Boolean(formik.errors.cantidad_personas)}
							helperText={formik.touched.cantidad_personas && formik.errors.cantidad_personas}
						/>
					</Box>
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default ServiciosInstitucion;
