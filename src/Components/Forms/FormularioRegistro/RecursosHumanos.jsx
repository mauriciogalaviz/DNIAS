import {
	Box,
	Divider,
	MenuItem,
	TextField,
	Typography,
	FormControl,
	FormLabel,
	RadioGroup,
	FormHelperText,
	FormControlLabel,
	Radio,
	Button,
	Checkbox,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	InputLabel,
	OutlinedInput,
	InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import ServiciosInstitucionDataTable from './ServiciosInstitucionDataTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment } from 'react';
import RecursosHumanosDataTable from './RecursosHumanosDataTable';
import BotonGuardar from '../BotonGuardar';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import RecursosHumanosInstitucionDataTable from './RecursosHumanosInstitucionDataTable';

const RecursosHumanos = () => {
	const { FormRecursosHumanos, IDEntidad, IDMunicipio, Entidad, Municipio, clearFormCAI, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);
	//const [DonateActivate, setDonateActivate] = useState(false);
	const [SumPorcentaje, setSumPorcentaje] = useState(0);
	const Sumando = async () => {
		console.log('Antes', SumPorcentaje);
		if (SumPorcentaje != 0) {
			setSumPorcentaje((prev) => 0);
		}
		setSumPorcentaje((prev) => prev - prev);
		console.log('Ahora', SumPorcentaje);
		let suma = parseInt(formik.values.porcentaje_0) + parseInt(formik.values.porcentaje_1) + parseInt(formik.values.porcentaje_2) + parseInt(formik.values.porcentaje_3);
		console.log('suma', suma);
		setSumPorcentaje((prev) => prev + suma);
		console.log('despues', SumPorcentaje);
		formik.setFieldValue('porcentaje_total', SumPorcentaje);
		formik.setTouched({ porcentaje_total: true }, false);
		formik.validateForm(); // Esto valida todo el formulario
	};
	const formik = useFormik({
		initialValues: FormRecursosHumanos.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio'),
			especialidad_0: Yup.number().notRequired(),
			licenciatura_0: Yup.number().notRequired(),
			carrera_tecnica_0: Yup.number().notRequired(),
			educacion_media_superior_0: Yup.number().notRequired(),
			educacion_basica_0: Yup.number().notRequired(),
			sin_instruccion_academica_0: Yup.number().notRequired(),
			especialidad_1: Yup.number().notRequired(),
			licenciatura_1: Yup.number().notRequired(),
			carrera_tecnica_1: Yup.number().notRequired(),
			educacion_media_superior_1: Yup.number().notRequired(),
			educacion_basica_1: Yup.number().notRequired(),
			sin_instruccion_academica_1: Yup.number().notRequired(),
			especialidad_2: Yup.number().notRequired(),
			licenciatura_2: Yup.number().notRequired(),
			carrera_tecnica_2: Yup.number().notRequired(),
			educacion_media_superior_2: Yup.number().notRequired(),
			educacion_basica_2: Yup.number().notRequired(),
			sin_instruccion_academica_2: Yup.number().notRequired(),
			capacitacion_asistencia_social: Yup.boolean().required('Este campo es obligatorio'),
			institucion_asistencia_social: Yup.boolean().required('Este campo es obligatorio'),
			objeto_social: Yup.string().required('Este campo es obligatorio'),
			institucion_atender_poblacion: Yup.boolean().required('Este campo es obligatorio'),
			institucion_red_organizaciones: Yup.boolean().required('Este campo es obligatorio'),
			institucion_red_organizaciones_nombre: Yup.string().notRequired(),
			recursos_0: Yup.boolean().notRequired(),
			recursos_1: Yup.boolean().notRequired(),
			recursos_2: Yup.boolean().notRequired(),
			recursos_3: Yup.boolean().notRequired(),
			instituto_0: Yup.boolean().notRequired(),
			instituto_1: Yup.boolean().notRequired(),
			instituto_2: Yup.boolean().notRequired(),
			instituto_3: Yup.boolean().notRequired(),
			instituto_4: Yup.boolean().notRequired(),
			institucion_gobierno_apoyo: Yup.number().notRequired(),
			rubro_0: Yup.boolean().notRequired(),
			porcentaje_0: Yup.number().notRequired(),
			rubro_1: Yup.boolean().notRequired(),
			porcentaje_1: Yup.number().notRequired(),
			rubro_2: Yup.boolean().notRequired(),
			porcentaje_2: Yup.number().notRequired(),
			rubro_3: Yup.boolean().notRequired(),
			porcentaje_3: Yup.number().notRequired(),
			porcentaje_total: Yup.number().max(100, 'El porcentaje no puede ser mayor a 100').required('Este campo es obligatorio'),
			recursos_donativos: Yup.string().required('Este campo es obligatorio'),
			donatario_autorizado: Yup.string().required('Este campo es obligatorio'),
			donatario_autorizado_clave: Yup.string().notRequired(),
			medios_0: Yup.boolean().notRequired(),
			medios_1: Yup.boolean().notRequired(),
			medios_2: Yup.boolean().notRequired(),
			medios_3: Yup.boolean().notRequired(),
			medios_4: Yup.boolean().notRequired(),
			medios_5: Yup.boolean().notRequired(),
			medios_6: Yup.boolean().notRequired(),
			medios_7: Yup.boolean().notRequired(),
			medios_8: Yup.boolean().notRequired(),
			medios_9: Yup.boolean().notRequired(),
			medios_10: Yup.boolean().notRequired(),
			medios_11: Yup.boolean().notRequired(),
			medios_12: Yup.boolean().notRequired(),
			medios_13: Yup.boolean().notRequired(),
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
	const nivel_educativos = ['Personal remunerado', 'Voluntarios', 'Servicio social'];
	const puntos = {
		recursos: ['FINANCIAMIENTO PROPIO', 'FIDEICOMISO', 'CUOTAS DE RECUPERACIÓN', 'DONATIVOS O APOYOS'],
		rubrosPorcentajes: [
			'PAGO DE SERVICIOS',
			'INSUMOS (COMIDA, ROPA, JABÓN, ETC.)',
			'EQUIPO Y MATERIALES (COMPUTADORAS, PLUMAS, CUADERNOS, CAPACITACIONES, ETC.)',
			'RECURSOS HUMANOS (SUELDOS, PRESTACIONES)',
		],
		medios: [
			'PERIÓDICOS',
			'REVISTAS',
			'FOLLETOS Y CARTELES',
			'RADIO',
			'TELEVISIÓN',
			'INTERNET',
			'ESPECTACULARES',
			'PARADA DE AUTOBÚS',
			'PANTALLA ELECTRÓNICA',
			'PANORÁMICOS',
			'PERIFONEO',
			'PINTA DE PAREDES',
			'OTRO',
		],
	};
	const InstitutoRecurso = ['Empesas', 'Personas físicas', 'Instituciones financieras', 'Fundaciones', 'Instituciones de gobierno'];

	return (
		<Box className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Recursos humanos, infraestructura, recursos económicos y donativos
				</Typography>
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
						Recursos humanos
					</Typography>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8px', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Total de empleados por nivel educativo *
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{nivel_educativos.map((nivel, index) => (
								<Box key={index} className="col-span-12 grid grid-cols-12 md:col-span-12 gap-2">
									<Box className="col-span-12 grid grid-cols-7">
										<Typography className="col-span-7 text-left">{nivel}</Typography>
									</Box>
									<Box className="col-span-12 grid grid-cols-6 gap-2">
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Especialidad, maestría o doctorado"
												name={`especialidad_${index}`}
												value={formik.values[`especialidad_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`especialidad_${index}`] && Boolean(formik.errors[`especialidad_${index}`])}
												helperText={formik.touched[`especialidad_${index}`] && formik.errors[`especialidad_${index}`]}
												size="small"
											/>
										</Box>
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Licenciatura"
												name={`licenciatura_${index}`}
												value={formik.values[`licenciatura_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`licenciatura_${index}`] && Boolean(formik.errors[`licenciatura_${index}`])}
												helperText={formik.touched[`licenciatura_${index}`] && formik.errors[`licenciatura_${index}`]}
												size="small"
											/>
										</Box>
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Carrera técnica"
												name={`carrera_tecnica_${index}`}
												value={formik.values[`carrera_tecnica_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`carrera_tecnica_${index}`] && Boolean(formik.errors[`carrera_tecnica_${index}`])}
												helperText={formik.touched[`carrera_tecnica_${index}`] && formik.errors[`carrera_tecnica_${index}`]}
												size="small"
											/>
										</Box>
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Educación media superior"
												name={`educacion_media_superior_${index}`}
												value={formik.values[`educacion_media_superior_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`educacion_media_superior_${index}`] && Boolean(formik.errors[`educacion_media_superior_${index}`])}
												helperText={formik.touched[`educacion_media_superior_${index}`] && formik.errors[`educacion_media_superior_${index}`]}
												size="small"
											/>
										</Box>
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Educación básica"
												name={`educacion_basica_${index}`}
												value={formik.values[`educacion_basica_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`educacion_basica_${index}`] && Boolean(formik.errors[`educacion_basica_${index}`])}
												helperText={formik.touched[`educacion_basica_${index}`] && formik.errors[`educacion_basica_${index}`]}
												size="small"
											/>
										</Box>
										<Box className="col-span-6 lg:col-span-2 text-wrap">
											<TextField
												type="number"
												fullWidth
												label="Sin instrucción académica"
												name={`sin_instruccion_academica_${index}`}
												value={formik.values[`sin_instruccion_academica_${index}`] || ''}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched[`sin_instruccion_academica_${index}`] && Boolean(formik.errors[`sin_instruccion_academica_${index}`])}
												helperText={formik.touched[`sin_instruccion_academica_${index}`] && formik.errors[`sin_instruccion_academica_${index}`]}
												size="small"
											/>
										</Box>
									</Box>
								</Box>
							))}
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12 m-0 p-0" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8px', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Formación de recursos humanos
							</Typography>
						</AccordionSummary>
						<AccordionDetails className="text-left grid col-span-12 grid-cols-12 gap-4">
							<FormControl component="fieldset" error={formik.touched.capacitacion_asistencia_social && formik.errors.capacitacion_asistencia_social} className="col-span-12">
								<FormLabel component="legend">¿Su institución brinda capacitación en asistencia social?*</FormLabel>
								<RadioGroup row name="capacitacion_asistencia_social" value={formik.values.capacitacion_asistencia_social || ''} onChange={formik.handleChange}>
									<FormControlLabel value={true} control={<Radio />} label="Sí" />
									<FormControlLabel value={false} control={<Radio />} label="No" />
								</RadioGroup>
								<FormHelperText>
									{formik.touched.capacitacion_asistencia_social && formik.errors.capacitacion_asistencia_social ? formik.errors.capacitacion_asistencia_social : ''}
								</FormHelperText>
							</FormControl>
							{formik.values.capacitacion_asistencia_social == 'true' ? (
								<Box className="col-span-12 md:col-span-6 ">
									<TextField
										fullWidth
										multiline
										rows={3}
										rowsMax={6}
										label="¿Que tipo de cursos ofrece?"
										name="capacitacion_asistencia_social_tipo_cursos"
										value={formik.values.capacitacion_asistencia_social_tipo_cursos}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</Box>
							) : null}
							{formik.values.capacitacion_asistencia_social == 'true' ? (
								<Box className="col-span-12 md:col-span-6">
									<TextField
										fullWidth
										multiline
										rows={3}
										rowsMax={6}
										label="¿Que tipo capacitación requiere el personal de su institución?"
										name="capacitacion_asistencia_social_requiere"
										value={formik.values.capacitacion_asistencia_social_requiere}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</Box>
							) : null}
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8x', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Coordinación
							</Typography>
						</AccordionSummary>
						<AccordionDetails className="col-span-12 grid grid-cols-12 gap-4">
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<FormControl
									component="fieldset"
									className="col-span-12 md:col-span-12 text-left"
									error={formik.touched.institucion_asistencia_social && formik.errors.institucion_asistencia_social}
								>
									<FormLabel component="legend">¿Mantiene coordinación con otras instituciones de asistencia social?*</FormLabel>
									<RadioGroup row name="institucion_asistencia_social" value={formik.values.institucion_asistencia_social || ''} onChange={formik.handleChange}>
										<FormControlLabel value={true} control={<Radio />} label="Sí" />
										<FormControlLabel value={false} control={<Radio />} label="No" />
									</RadioGroup>
									<FormHelperText>{formik.touched.institucion_asistencia_social && formik.errors.institucion_asistencia_social}</FormHelperText>
								</FormControl>
							</Box>
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<TextField
									type="text"
									multiline
									rows={4}
									rowsMax={6}
									fullWidth
									className="col-span-12 md:col-span-6"
									label="Indique la(s) institución(es) con quien mantiene coordinación:*"
									name="objeto_social"
									value={formik.values.objeto_social}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.objeto_social && Boolean(formik.errors.objeto_social)}
									helperText={formik.touched.objeto_social && formik.errors.objeto_social}
									inputProps={{ maxLength: 10 }}
									required
								/>
							</Box>
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<FormControl
									component="fieldset"
									className="col-span-12 md:col-span-12 text-left"
									error={formik.touched.institucion_atender_poblacion && formik.errors.institucion_atender_poblacion}
								>
									<FormLabel component="legend">¿Su institución ha trabajado con otras instituciones para atender a su población objetivo?*</FormLabel>
									<RadioGroup row name="institucion_atender_poblacion" value={formik.values.institucion_atender_poblacion || ''} onChange={formik.handleChange}>
										<FormControlLabel value={true} control={<Radio />} label="Sí" />
										<FormControlLabel value={false} control={<Radio />} label="No" />
									</RadioGroup>
									<FormHelperText>{formik.touched.institucion_atender_poblacion && formik.errors.institucion_atender_poblacion}</FormHelperText>
								</FormControl>
							</Box>
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<FormControl
									component="fieldset"
									className="col-span-12 md:col-span-12 text-left"
									error={formik.touched.institucion_red_organizaciones && formik.errors.institucion_red_organizaciones}
								>
									<FormLabel component="legend">¿Su institución pertenece a alguna red de organizaciones?*</FormLabel>
									<RadioGroup row name="institucion_red_organizaciones" value={formik.values.institucion_red_organizaciones || ''} onChange={formik.handleChange}>
										<FormControlLabel value={true} control={<Radio />} label="Sí" />
										<FormControlLabel value={false} control={<Radio />} label="No" />
									</RadioGroup>
									<FormHelperText>{formik.touched.institucion_red_organizaciones && formik.errors.institucion_red_organizaciones}</FormHelperText>
								</FormControl>
								{formik.values.institucion_red_organizaciones == 'true' ? (
									<Box className="col-span-12">
										<TextField
											fullWidth
											type="text"
											label="Escriba el nombre de la red"
											name="institucion_red_organizaciones_nombre"
											value={formik.values.institucion_red_organizaciones_nombre}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</Box>
								) : null}
							</Box>
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8x', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Infraestructura
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<FormLabel component="legend" className="col-span-12 text-left">
								Las instalaciones donde brinda sus servicios son:*
							</FormLabel>
							<InputLabel className="col-span-12 !text-right">
								Agregar las instalaciones dando clic en el botón <Add /> de la tabla{' '}
							</InputLabel>
							<RecursosHumanosDataTable />
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8x', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Recursos económicos
							</Typography>
						</AccordionSummary>
						<AccordionDetails className="col-span-12 grid grid-cols-12 gap-6">
							<Box className="col-span-12 grid grid-cols-12 gap-4">
								<InputLabel className="col-span-12 text-left">Señale cómo obtiene los recursos para su operación*</InputLabel>
								{puntos.recursos.map((e, i) => (
									<Box className="col-span-10 md:col-span-9 lg:col-span-12 border-b-2 border-gray-100 text-left">
										<FormControlLabel
											control={
												<Checkbox
													name={`recursos_${i}`}
													checked={formik.values[`recursos_${i}`] || false}
													onChange={formik.handleChange}
													/* onChange={() => {
														//formik.handleChange();
														if (i == 3) {
															setDonateActivate(true);
														}
														formik.handleChange()
													}} */
													onBlur={formik.handleBlur}
												/>
											}
											label={e}
										/>
									</Box>
								))}
								{formik.values.recursos_3 == true ? (
									<Box className="col-span-12 grid grid-cols-12 gap-4 pl-12">
										<InputLabel className="col-span-12 text-left">Tipo de institución que proporciona los recursos</InputLabel>
										{InstitutoRecurso.map((e, i) => {
											return (
												<Fragment key={i}>
													<Box className="col-span-10 md:col-span-9 lg:col-span-12 border-b-2 border-gray-100 text-left">
														<FormControlLabel
															control={<Checkbox name={`instituto_${i}`} checked={formik.values[`instituto_${i}`] || false} onChange={formik.handleChange} />}
															label={e}
														/>
													</Box>
												</Fragment>
											);
										})}
										{formik.values.instituto_4 == true ? (
											<Box className="col-span-12 grid grid-cols-12 gap-4 pl-12">
												<InputLabel className="col-span-12 !text-right">
													Asignar las instituciones de gobierno dando clic en el botón <Add /> de la tabla{' '}
												</InputLabel>
												<RecursosHumanosInstitucionDataTable />
											</Box>
										) : null}
									</Box>
								) : null}
							</Box>
							<Box className="col-span-12 md:col-span-12 grid grid-cols-12 sm:gap-4 lg:gap-0  text-left">
								<InputLabel className="col-span-12 text-left my-4">Indique los rubros y porcentaje en que se distribuye sus recursos económicos*</InputLabel>
								<Box className="col-span-10 md:col-span-8 lg:col-span-6">Rubros</Box>
								<Box className="col-span-2 md:col-span-3 lg:col-span-4">Porcentajes</Box>
								<Box className="col-span-12 grid grid-cols-12">
									<Box className="col-span-10 grid grid-cols-12">
										{puntos.rubrosPorcentajes.map((e, i) => (
											<Fragment>
												<Box className="col-span-9  border-b-2 border-gray-100">
													<FormControlLabel
														control={<Checkbox name={`rubro_${i}`} checked={formik.values[`rubro_${i}`] || false} onChange={formik.handleChange} />}
														label={e}
													/>
												</Box>
												<Box className="col-span-2 ">
													<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
														<OutlinedInput
															type="number"
															id="outlined-adornment-weight"
															endAdornment={<InputAdornment position="end">%</InputAdornment>}
															aria-describedby="outlined-weight-helper-text"
															inputProps={{
																'aria-label': 'weight',
															}}
															name={`porcentaje_${i}`}
															value={formik.values[`porcentaje_${i}`] || 0}
															onChange={() => {
																formik.handleChange();
															}}
															onBlur={formik.handleBlur}
															onKeyUp={Sumando}
														/>
													</FormControl>
												</Box>
											</Fragment>
										))}
									</Box>

									<Box className="col-span-12 md:col-span-12 lg:col-span-2 ">
										<InputLabel className="!text-2xl !mt-[-5]">Total</InputLabel>
										<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
											<OutlinedInput
												type="number"
												id="outlined-adornment-weight"
												endAdornment={<InputAdornment position="end">%</InputAdornment>}
												aria-describedby="outlined-weight-helper-text"
												inputProps={{
													'aria-label': 'weight',
												}}
												name="porcentaje_total"
												value={SumPorcentaje}
												onChange={(event) => {
													console.log('event', event.target.value);
													formik.setFieldValue('porcentaje_total', SumPorcentaje);
													formik.setTouched({ porcentaje_total: true }, false);
													formik.validateForm(); // Esto valida todo el formulario
												}}
												error={Boolean(formik.touched.porcentaje_total && formik.errors.porcentaje_total)}
												onBlur={formik.handleBlur}
												inputprops={{ maxLength: 100 }}
												disabled
											/>
											<FormHelperText className={formik.errors.porcentaje_total ? `!text-red-800` : ''}>
												{formik.errors.porcentaje_total || 'El total de los porcentajes sumados no puede exceder del 100%'}
											</FormHelperText>
										</FormControl>
									</Box>
								</Box>
							</Box>
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8x', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Donativos
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<FormControl component="fieldset" className="col-span-12 md:col-span-12 text-left">
									<FormLabel component="legend" error={formik.touched.recursos_donativos && formik.errors.recursos_donativos}>
										¿Cuenta con recursos para otorgar donativos?*
									</FormLabel>
									<RadioGroup row name="recursos_donativos" value={formik.values.recursos_donativos || ''} onChange={formik.handleChange}>
										<FormControlLabel value={true} control={<Radio />} label="Sí" />
										<FormControlLabel value={false} control={<Radio />} label="No" />
									</RadioGroup>
									<FormHelperText>{formik.touched.recursos_donativos && formik.errors.recursos_donativos}</FormHelperText>
								</FormControl>
							</Box>
							<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
								<FormControl
									component="fieldset"
									className="col-span-12 md:col-span-12 text-left"
									error={formik.touched.donatario_autorizado && formik.errors.donatario_autorizado}
								>
									<FormLabel component="legend">¿Es donataria autorizada?*</FormLabel>
									<RadioGroup row name="donatario_autorizado" value={formik.values.donatario_autorizado || ''} onChange={formik.handleChange}>
										<FormControlLabel value={true} control={<Radio />} label="Sí" />
										<FormControlLabel value={false} control={<Radio />} label="No" />
									</RadioGroup>
									<FormHelperText>{formik.touched.donatario_autorizado && formik.errors.donatario_autorizado}</FormHelperText>
								</FormControl>
								{formik.values.donatario_autorizado == 'true' ? (
									<Box className="col-span-12">
										<TextField
											fullWidth
											label="Anote su clavede donataria autorizada"
											value={formik.values.donatario_autorizado_clave}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</Box>
								) : null}
							</Box>
						</AccordionDetails>
					</Accordion>
					<Accordion className="col-span-12" defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1-content"
							id="panel1-header"
							sx={{
								padding: '2px 8x', // Ajusta el padding para hacerlo más delgado
								maxHeight: '44px', // Cambia la altura mínima
								'& .MuiAccordionSummary-content': {
									margin: '0', // Ajusta el margen interno
								},
								margin: '0px',
							}}
						>
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Difusión
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box className="col-span-12 grid grid-cols-12 gap-4">
								<InputLabel className="col-span-12 text-left">Indique los medios que utiliza para difundir los servicios de la institución:*</InputLabel>
								{puntos.medios.map((e, i) => (
									<Box className="col-span-12 md:col-span-6 lg:col-span-6 border-b border-gray-100 text-left">
										<FormControlLabel
											control={
												<Checkbox name={`medios_${i}`} checked={formik.values[`medios_${i}`] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />
											}
											label={e}
										/>
									</Box>
								))}
							</Box>
						</AccordionDetails>
					</Accordion>

					<Divider className="col-span-12 pt-2" />
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default RecursosHumanos;
