import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import ServiciosInstitucionDataTable from './ServiciosInstitucionDataTable';
import { Fragment } from 'react';
import BotonGuardar from '../BotonGuardar';
import { useState } from 'react';
import TipoDiscapacidad from './TipoDiscapacidad';

const AsistenciaSocial = () => {
	const { FormAsistenciaSocial, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);
	const [puntosRelevantes, setPuntosRelevantes] = useState(1);
	const [RelevanteActive, setRelevanteActive] = useState(false);

	const CountCheck = async (num) => {
		console.log(num);
		console.log(puntosRelevantes);
		console.log(typeof puntosRelevantes); // Debe ser 'number'

		console.log('Antes:', puntosRelevantes, 'Num:', num);
		const nuevoValor = puntosRelevantes <= 1 ? puntosRelevantes + num : puntosRelevantes - num;
		console.log('Después:', nuevoValor);
		setPuntosRelevantes(nuevoValor);

		puntosRelevantes == 2 ? setRelevanteActive(true) : setRelevanteActive(false);
	};
	const puntos = [
		'APOYO ALIMENTARIO Y ORIENTACIÓN NUTRICIONAL',
		'APOYO ECONÓMICO O APOYO EN ESPECIE',
		'APOYO EN GESTACIÓN O LACTANCIA EN SITUACIÓN DE VULNERABILIDAD',
		'APOYO Y ASESORÍA JURÍDICA',
		'ESTANCIA DE DÍA',
		'ESTANCIA DE NOCHE',
		'CASA HOGAR',
		'ALBERGUE',
		'PROTECCIÓN A DERECHOS DE LOS NIÑOS',
		'ATENCIÓN A LA FARMACODEPENDENCIA Y ALCOHOLISMO',
		'EDUCACIÓN ESPECIAL',
		'PREVENCIÓN Y ATENCIÓN AL DESAMPARO O ABANDONO, MARGINACIÓN O SUJETOS DE MALTRATO',
		'FOMENTO DE ACCIONES EN BENEFICIO DE LA COMUNIDAD',
		'PROMOCIÓN DEL SANO DESARROLLO FÍSICO, MENTAL Y SOCIAL',
		'DESARROLLO, MEJORAMIENTO E INTEGRACIÓN FAMILIAR',
		'ATENCIÓN A LA VIOLENCIA INTRAFAMILIAR',
		'ATENCIÓN Y APOYO A MIGRANTES Y REPATRIADOS',
		'ATENCIÓN Y APOYO INDÍGENAS MIGRANTES, DESPLAZADOS O EN SITUACIÓN VULNERABLE',
		'ATENCIÓN A PERSONAS VÍCTIMAS DEL DELITO',
		'ATENCIÓN PERSONAS INDIGENTES',
		'ATENCIÓN A VÍCTIMAS DE DESASTRE',
		'REALIZACIÓN DE INVESTIGACIONES SOBRE CAUSAS Y EFECTOS DE LOS PROBLEMAS PRIORITARIOS DE ASISTENCIA SOCIAL',
		'ATENCIÓN Y APOYO A HUÉRFANOS',
		'APOYO A MADRES ADOLESCENTES O SOLAS CON HIJOS MENORES DE 18 AÑOS',
		'ATENCIÓN A VICTIMAS DE CONFLICTOS ARMADOS Y DE PERSECUCIÓN ÉTNICA O RELIGIOSA',
		'PREVENCIÓN, REHABILITACIÓN, TERAPIA Y HABILITACIÓN DE DISCAPACIDAD',
	];
	const formik = useFormik({
		initialValues: FormAsistenciaSocial.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio').nonNullable(),
			punto_0: Yup.boolean().notRequired(),
			punto_0_relevante: Yup.boolean().notRequired(),
			punto_1: Yup.boolean().notRequired(),
			punto_1_relevante: Yup.boolean().notRequired(),
			punto_2: Yup.boolean().notRequired(),
			punto_2_relevante: Yup.boolean().notRequired(),
			punto_3: Yup.boolean().notRequired(),
			punto_3_relevante: Yup.boolean().notRequired(),
			punto_4: Yup.boolean().notRequired(),
			punto_4_relevante: Yup.boolean().notRequired(),
			punto_5: Yup.boolean().notRequired(),
			punto_5_relevante: Yup.boolean().notRequired(),
			punto_6: Yup.boolean().notRequired(),
			punto_6_relevante: Yup.boolean().notRequired(),
			punto_7: Yup.boolean().notRequired(),
			punto_7_relevante: Yup.boolean().notRequired(),
			punto_8: Yup.boolean().notRequired(),
			punto_8_relevante: Yup.boolean().notRequired(),
			punto_9: Yup.boolean().notRequired(),
			punto_9_relevante: Yup.boolean().notRequired(),
			punto_10: Yup.boolean().notRequired(),
			punto_10_relevante: Yup.boolean().notRequired(),
			punto_11: Yup.boolean().notRequired(),
			punto_11_relevante: Yup.boolean().notRequired(),
			punto_12: Yup.boolean().notRequired(),
			punto_12_relevante: Yup.boolean().notRequired(),
			punto_13: Yup.boolean().notRequired(),
			punto_13_relevante: Yup.boolean().notRequired(),
			punto_14: Yup.boolean().notRequired(),
			punto_14_relevante: Yup.boolean().notRequired(),
			punto_15: Yup.boolean().notRequired(),
			punto_15_relevante: Yup.boolean().notRequired(),
			punto_16: Yup.boolean().notRequired(),
			punto_16_relevante: Yup.boolean().notRequired(),
			punto_17: Yup.boolean().notRequired(),
			punto_17_relevante: Yup.boolean().notRequired(),
			punto_18: Yup.boolean().notRequired(),
			punto_18_relevante: Yup.boolean().notRequired(),
			punto_19: Yup.boolean().notRequired(),
			punto_19_relevante: Yup.boolean().notRequired(),
			punto_20: Yup.boolean().notRequired(),
			punto_20_relevante: Yup.boolean().notRequired(),
			punto_21: Yup.boolean().notRequired(),
			punto_21_relevante: Yup.boolean().notRequired(),
			punto_22: Yup.boolean().notRequired(),
			punto_22_relevante: Yup.boolean().notRequired(),
			punto_23: Yup.boolean().notRequired(),
			punto_23_relevante: Yup.boolean().notRequired(),
			punto_24: Yup.boolean().notRequired(),
			punto_24_relevante: Yup.boolean().notRequired(),
			punto_25: Yup.boolean().notRequired(),
			punto_25_relevante: Yup.boolean().notRequired(),
			/* punto_26: Yup.boolean().notRequired(),
			punto_26_relevante: Yup.boolean().notRequired(),
			punto_27: Yup.boolean().notRequired(),
			punto_27_relevante: Yup.boolean().notRequired(),
			punto_28: Yup.boolean().notRequired(),
			punto_28_relevante: Yup.boolean().notRequired(), */
			discapacidad_motriz: Yup.boolean().notRequired(),
			discapacidad_visual: Yup.boolean().notRequired(),
			discapacidad_auditiva: Yup.boolean().notRequired(),
			discapacidad_intelectual: Yup.boolean().notRequired(),
			discapacidad_psicosocial: Yup.boolean().notRequired(),
			discapacidad_neurodiversa: Yup.boolean().notRequired(),
			discapacidad_multiple: Yup.boolean().notRequired(),
		}),
		onSubmit: async (values) => {
			console.log(values);
			setOpenBackDrop(true);
			/* let relevantes = formik.values.map((e, i)=>{
				//console.log('Punto 0',e.punto_0);
				console.log('Puntos 0', e[i]);
				//console.log('Puntos',e);
				if(e.punto_0_relevante){
					setPuntosRelevantes({
						...PuntosRelevantes,
						e
					}) 
				}
			})
			console.log('Relevantes', relevantes); */
			setOpenBackDrop(false);
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

				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: 'CAI creada correctamente.',
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
	//const puntosSeleccionados = Object.keys(formik.values).filter((key) => key.startsWith('punto_') && formik.values[key] === true).length;

	const relevantesSeleccionados = Object.keys(formik.values).filter((key) => key.startsWith('punto_') && formik.values[`${key}_relevante`] === true).length;

	return (
		<Box className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Asistencia Social
				</Typography>
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Catálogo de servicios de asistencia social
					</Typography>
					<helperText className="col-span-12 p-2 text-primary dark:!text-inherit text-left">Seleccione el o los servicios que proporciona su institución*</helperText>

					{/* Catálogo de servicios de asistencia social */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-12 sm:gap-4 lg:gap-0  text-left">
						<Box className="col-span-10 md:col-span-8 lg:col-span-8">Servicios</Box>
						<Box className="col-span-2 md:col-span-3 lg:col-span-4">Relevante</Box>
						{puntos.map((e, i) => (
							<Fragment>
								<Box className="col-span-10 md:col-span-9 lg:col-span-8 border-b-2 border-gray-100">
									<FormControlLabel
										control={<Checkbox name={`punto_${i}`} checked={formik.values[`punto_${i}`] || false} onChange={formik.handleChange} onBlur={formik.handleBlur} />}
										label={e}
									/>
								</Box>
								<Box className="col-span-2 md:col-span-3 lg:col-span-4 ">
									<FormControlLabel
										control={
											<Checkbox
												name={`punto_${i}_relevante`}
												checked={formik.values[`punto_${i}_relevante`] || false}
												onChange={() => {
													CountCheck(1);
													formik.handleChange();
												}}
												onBlur={formik.handleBlur}
												disabled={
													formik.values[`punto_${i}`] === true // Activar solo si el punto está seleccionado
														? relevantesSeleccionados < 2 // Permitir selección si hay menos de 2 relevantes activos
															? false
															: formik.values[`punto_${i}_relevante`] // Bloquear los no seleccionados
															? false
															: true
														: true // Bloquear si el punto no está seleccionado
												}
											/>
										}
										label=""
									/>
								</Box>
							</Fragment>
						))}
						{formik.values.punto_25 == true ? <TipoDiscapacidad formik={formik} /> : null}
					</Box>
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default AsistenciaSocial;
