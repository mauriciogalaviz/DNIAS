import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Card } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import { Fragment } from 'react';
import DatosLegalesDataTable from './DatosLegalesDataTable';
import BotonGuardar from '../BotonGuardar';

const DatosLegalesRep = () => {
	const { FormRepresentanteLegal, IDEntidad, IDMunicipio, Entidad, Municipio, clearDataForm2, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormRepresentanteLegal.data,
		validationSchema: Yup.object({
			nombre_responsable: Yup.string().required('Este campo es obligatorio'),
			pa_responsable: Yup.string().required('Este campo es obligatorio'),
			sa_responsable: Yup.string().required('Este campo es obligatorio'),
			telefono1_responsable: Yup.string().required('Este campo es obligatorio'),
			telefono2_responsable: Yup.string().required('Este campo es obligatorio'),
			celular_responsable: Yup.string().required('Este campo es obligatorio'),
			identificacion_responsable: Yup.string().required('Este campo es obligatorio'),
			folio_responsable: Yup.string().required('Este campo es obligatorio'),
			fecha_expedicion_responsable: Yup.string().required('Este campo es obligatorio'),
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
				clearDataForm2();
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: 'CAI creada correctamente.',
					duration: 3000,
				});
				clearDataForm2();
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
		<Card className="col-span-12 grid grid-cols-12 p-0 ">
			<Divider className="col-span-12 p-2" />
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4">
					{/* Nombre de la persona responsable */}
					<Box className="col-span-12  md:col-span-12">
						<TextField
							fullWidth
							className="col-span-12"
							label="Nombre"
							name="nombre_responsable"
							value={formik.values.nombre_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.nombre_responsable && Boolean(formik.errors.nombre_responsable)}
							helperText={formik.touched.nombre_responsable && formik.errors.nombre_responsable}
							required
						/>
					</Box>
					{/* Primer Apellido de la persona responsable */}
					<Box className="col-span-12  md:col-span-12">
						<TextField
							fullWidth
							className="col-span-12"
							label="Primer Apellido"
							name="pa_responsable"
							value={formik.values.pa_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.pa_responsable && Boolean(formik.errors.pa_responsable)}
							helperText={formik.touched.pa_responsable && formik.errors.pa_responsable}
							required
						/>
					</Box>
					{/* Segundo Apellido de la persona responsable */}
					<Box className="col-span-12  md:col-span-12">
						<TextField
							fullWidth
							className="col-span-12"
							label="Segundo Apellido"
							name="sa_responsable"
							value={formik.values.sa_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.sa_responsable && Boolean(formik.errors.sa_responsable)}
							helperText={formik.touched.sa_responsable && formik.errors.sa_responsable}
							required
						/>
					</Box>
					{/* Teléfono1 */}
					<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<TextField
							type="tel"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Teléfono 1"
							name="telefono1_responsable"
							value={formik.values.telefono1_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.telefono1_responsable && Boolean(formik.errors.telefono1_responsable)}
							helperText={formik.touched.telefono1_responsable && formik.errors.telefono1_responsable}
							required
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Teléfono2 */}
					<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<TextField
							type="tel"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Teléfono 2"
							name="telefono2_responsable"
							value={formik.values.telefono2_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.telefono2_responsable && Boolean(formik.errors.telefono2_responsable)}
							helperText={formik.touched.telefono2_responsable && formik.errors.telefono2_responsable}
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Teléfono3 */}
					<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<TextField
							type="tel"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Teléfono celular"
							name="celular_responsable"
							value={formik.values.celular_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.celular_responsable && Boolean(formik.errors.celular_responsable)}
							helperText={formik.touched.celular_responsable && formik.errors.celular_responsable}
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Se identifica con */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Se identifica con"
							name="identificacion"
							value={formik.values.identificacion_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.identificacion_responsable && Boolean(formik.errors.identificacion_responsable)}
							helperText={formik.touched.identificacion_responsable && formik.errors.identificacion_responsable}
							required
						>
							<MenuItem key={1} value="1">
								Pública
							</MenuItem>
							<MenuItem key={2} value="2">
								Privada
							</MenuItem>
							<MenuItem key={3} value="3">
								Mixta
							</MenuItem>
						</TextField>
					</Box>
					{/* Número de Folio */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							type="text"
							className="col-span-12 "
							label="Número de Folio"
							name="folio_responsable"
							value={formik.values.folio_responsable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.folio_responsable && Boolean(formik.errors.folio_responsable)}
							helperText={formik.touched.folio_responsable && formik.errors.folio_responsable}
							required
						/>
					</Box>
					{/* Fecha de Expedición */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							type="date"
							fullWidth
							name="fecha_expedicion_responsable"
							label="Fecha de Expedición"
							value={formik.values.fecha_expedicion_responsable}
							onChange={(e) => {
								formik.setFieldValue('fecha_expedicion_responsable', e.target.value);
								formik.values.fecha_expedicion_responsable = e.target.value;
								console.log('fecha_expedicion_responsable', formik.values.fecha_expedicion_responsable);
							}}
							InputLabelProps={{ shrink: true }}
							error={false}
						/>
					</Box>

					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Card>
	);
};

export default DatosLegalesRep;
