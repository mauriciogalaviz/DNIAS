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

const ServiciosSalud = () => {
	const { FormServiciosSalud, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const servicios = [
		'SALUD MATERNA',
		'SALUD MENTAL',
		'SALUD BUCAL',
		'DISCAPACIDADES',
		'PREVENCIÓN Y PROMOCIÓN DE LA SALUD',
		'JORNADAS MÉDICAS',
		'EQUIDAD DE GÉNERO',
		'NUTRICIÓN, SOBREPESO Y OBESIDAD',
		'VIH/SIDA',
		'ADICCIONES',
		'OTRAS ENFERMEDADES',
		'ENFERMEDADES CRÓNICAS NO TRANSMISIBLES',
	];
	const formik = useFormik({
		initialValues: FormServiciosSalud.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio').nonNullable(),
			servicio_salud_0: Yup.boolean().notRequired(),
			servicio_salud_1: Yup.boolean().notRequired(),
			servicio_salud_2: Yup.boolean().notRequired(),
			servicio_salud_3: Yup.boolean().notRequired(),
			servicio_salud_4: Yup.boolean().notRequired(),
			servicio_salud_5: Yup.boolean().notRequired(),
			servicio_salud_6: Yup.boolean().notRequired(),
			servicio_salud_7: Yup.boolean().notRequired(),
			servicio_salud_8: Yup.boolean().notRequired(),
			servicio_salud_9: Yup.boolean().notRequired(),
			servicio_salud_10: Yup.boolean().notRequired(),
			servicio_salud_11: Yup.boolean().notRequired(),
			enfermedades_cronicas: Yup.number().notRequired(),
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
	return (
		<Box className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Servicios de Salud
				</Typography>
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Catálogo de servicios de salud
					</Typography>
					<helperText className="col-span-12 p-2 text-primary dark:!text-inherit text-left">Seleccione el o los servicios que proporciona su institución*</helperText>

					{/* Catálogo de servicios de salud */}
					<Box className="col-span-12 md:col-span-12 grid grid-cols-12 sm:gap-4 lg:gap-0  text-left">
						<Box className="col-span-10 md:col-span-8 lg:col-span-8">Servicios</Box>

						{servicios.map((e, i) => (
							<Fragment key={i}>
								<Box className="col-span-10 md:col-span-9 lg:col-span-8 border-b-2 border-gray-100">
									<FormControlLabel
										control={
											<Checkbox
												name={`servicio_salud_${i}`}
												checked={formik.values[`servicio_salud_${i}`] || false}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										}
										label={e}
									/>
								</Box>
							</Fragment>
						))}
					</Box>
					{formik.values.servicio_salud_11 == true ? (
						<Box className="col-span-12 md:col-span-12 grid grid-cols-12 sm:gap-4 lg:gap-0  text-left">
							<TextField
								fullWidth
								select
								className="col-span-12"
								label="Tipo de enfermedad crónica"
								name="enfermedades_cronicas"
								value={formik.values.enfermedades_cronicas}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								<MenuItem key={1} value="1">
									Enfermedad crónica 1
								</MenuItem>
								<MenuItem key={2} value="2">
									Enfermedad crónica 2
								</MenuItem>
								<MenuItem key={3} value="3">
									Enfermedad crónica 3
								</MenuItem>
								<MenuItem key={4} value="4">
									Enfermedad crónica 4
								</MenuItem>
								<MenuItem key={5} value="5">
									Enfermedad crónica 5
								</MenuItem>
								<MenuItem key={6} value="6">
									Enfermedad crónica 6
								</MenuItem>
								<MenuItem key={7} value="7">
									Enfermedad crónica 7
								</MenuItem>
								<MenuItem key={8} value="8">
									Enfermedad crónica 8
								</MenuItem>
							</TextField>
						</Box>
					) : null}
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default ServiciosSalud;
