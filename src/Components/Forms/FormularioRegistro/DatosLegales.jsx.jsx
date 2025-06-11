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
import { InputLabel } from '@mui/material';
import { Add } from '@mui/icons-material';

const DatosLegales = () => {
	const { FormDatosLegales, bringcod, IDEntidad, IDMunicipio, Entidad, Municipio, clearDataForm2, BotoneraForm, TipoInstitucion } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormDatosLegales.data,
		validationSchema: Yup.object({
			nombre_notario: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			numero_notaria: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			acta_constitutiva: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			acta_constitutiva_lugar: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			acta_constitutiva_fecha: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			figura_juridica: TipoInstitucion == 2 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			nombre_documento: TipoInstitucion == 1 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			numero_documento: TipoInstitucion == 1 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			documento_lugar: TipoInstitucion == 1 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			documento_fecha: TipoInstitucion == 1 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			naturaleza_juridica: TipoInstitucion == 1 ? Yup.string().required('Este campo es obligatorio') : Yup.string().notRequired(),
			// Direccion legal
			direccion_legal: Yup.string().required('Este campo es obligatorio'),
			vialidad: Yup.string().notRequired(),
			calle: Yup.string().required('Este campo es obligatorio'),
			num_ext: Yup.string().required('Este campo es obligatorio'),
			num_int: Yup.string().required('Este campo es obligatorio'),
			entre_calle1: Yup.string().required('Este campo es obligatorio'),
			entre_calle2: Yup.string().required('Este campo es obligatorio'),
			cp: Yup.string().required('Este campo es obligatorio'),
			colonia: Yup.string().required('Este campo es obligatorio'),
			telefono1: Yup.string().required('Este campo es obligatorio'),
			correo: Yup.string().required('Este campo es obligatorio'),
			web: Yup.string().required('Este campo es obligatorio'),
			redes: Yup.string().required('Este campo es obligatorio'),
			representante_legal: Yup.string().required('Este campo es obligatorio'),
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
		<Card className="col-span-12 grid grid-cols-12 p-0 bg-white">
			{
				<Typography variant="h6" className="col-span-12 p-2 bg-primary text-white">
					Datos Legales
				</Typography>
			}
			<Divider className="col-span-12 p-2" />
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4">
					{TipoInstitucion == 2 ? (
						<Box className="col-span-12 grid grid-col-12 gap-4 p-0 m-0">
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Acta Constitutiva
							</Typography>
							{/* Nombre del notario */}
							<Box className="col-span-12  md:col-span-8">
								<TextField
									fullWidth
									className="col-span-12"
									label="Nombre del notario"
									name="nombre_notario"
									value={formik.values.nombre_notario}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.nombre_notario && Boolean(formik.errors.nombre_notario)}
									helperText={formik.touched.nombre_notario && formik.errors.nombre_notario}
									required
								/>
							</Box>
							{/* Número de la notaría */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									fullWidth
									className="col-span-12"
									label="Número de la notaría"
									name="numero_notaria"
									value={formik.values.numero_notaria}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.numero_notaria && Boolean(formik.errors.numero_notaria)}
									helperText={formik.touched.numero_notaria && formik.errors.numero_notaria}
									required
								/>
							</Box>
							{/* Acta Constitutiva */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12"
									label="Acta Constitutiva"
									name="acta_constitutiva"
									value={formik.values.acta_constitutiva}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.acta_constitutiva && Boolean(formik.errors.acta_constitutiva)}
									helperText={formik.touched.acta_constitutiva && formik.errors.acta_constitutiva}
									required
								/>
							</Box>
							{/* Lugar */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12"
									label="Lugar"
									name="acta_constitutiva_lugar"
									value={formik.values.acta_constitutiva_lugar}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.acta_constitutiva_lugar && Boolean(formik.errors.acta_constitutiva_lugar)}
									helperText={formik.touched.acta_constitutiva_lugar && formik.errors.acta_constitutiva_lugar}
									required
								/>
							</Box>
							{/* Fecha */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									type="date"
									fullWidth
									name="acta_constitutiva_fecha"
									label="Fecha"
									value={formik.values.acta_constitutiva_fecha}
									onChange={(e) => {
										formik.setFieldValue('acta_constitutiva_fecha', e.target.value);
										formik.values.acta_constitutiva_fecha = e.target.value;
										console.log('acta_constitutiva_fecha', formik.values.acta_constitutiva_fecha);
									}}
									InputLabelProps={{ shrink: true }}
									error={false}
								/>
							</Box>
							{/* Figura jurídica */}
							<Box className="col-span-12 md:col-span-8">
								<TextField
									fullWidth
									select
									className="col-span-12"
									label="Figura jurídica"
									name="figura_juridica"
									value={formik.values.figura_juridica}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.figura_juridica && Boolean(formik.errors.figura_juridica)}
									helperText={formik.touched.figura_juridica && formik.errors.figura_juridica}
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
						</Box>
					) : null}
					{TipoInstitucion == 1 ? (
						<Box className="col-span-12 grid grid-col-12 gap-4 p-0 m-0">
							<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
								Fundamento legal de creación
							</Typography>
							{/* Nombre del notario */}
							<Box className="col-span-12  md:col-span-8">
								<TextField
									fullWidth
									className="col-span-12"
									label="Nombre del documento"
									name="nombre_documento"
									value={formik.values.nombre_documento}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.nombre_documento && Boolean(formik.errors.nombre_documento)}
									helperText={formik.touched.nombre_documento && formik.errors.nombre_documento}
									required
								/>
							</Box>
							{/* Número de la notaría */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									fullWidth
									className="col-span-12"
									label="Número"
									name="numero_documento"
									value={formik.values.numero_documento}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.numero_documento && Boolean(formik.errors.numero_documento)}
									helperText={formik.touched.numero_documento && formik.errors.numero_documento}
									required
								/>
							</Box>
							{/* Acta Constitutiva */}
							{/* <Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12"
									label="Acta Constitutiva"
									name="acta_constitutiva"
									value={formik.values.acta_constitutiva}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.acta_constitutiva && Boolean(formik.errors.acta_constitutiva)}
									helperText={formik.touched.acta_constitutiva && formik.errors.acta_constitutiva}
									required
								/>
							</Box> */}
							{/* Lugar */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12"
									label="Lugar"
									name="documento_lugar"
									value={formik.values.documento_lugar}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.documento_lugar && Boolean(formik.errors.documento_lugar)}
									helperText={formik.touched.documento_lugar && formik.errors.documento_lugar}
									required
								/>
							</Box>
							{/* Fecha */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									type="date"
									fullWidth
									name="documento_fecha"
									label="Fecha"
									value={formik.values.documento_fecha}
									onChange={(e) => {
										formik.setFieldValue('documento_fecha', e.target.value);
										formik.values.documento_fecha = e.target.value;
										console.log('documento_fecha', formik.values.documento_fecha);
									}}
									InputLabelProps={{ shrink: true }}
									error={false}
								/>
							</Box>
							{/* Naturaleza Jurídica */}
							<Box className="col-span-12 md:col-span-8">
								<TextField
									fullWidth
									select
									className="col-span-12"
									label="Naturaleza Jurídica"
									name="naturaleza_juridica"
									value={formik.values.naturaleza_juridica}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.naturaleza_juridica && Boolean(formik.errors.naturaleza_juridica)}
									helperText={formik.touched.naturaleza_juridica && formik.errors.naturaleza_juridica}
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
						</Box>
					) : null}
					<Divider className="col-span-12" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
						Domicilio Legal
					</Typography>
					<Box className="col-span-12 text-left">
						<FormControl component="fieldset" className="col-span-12">
							<FormLabel component="legend">¿El domicilio legal es igual que el domicilio social? *</FormLabel>
							<RadioGroup
								aria-label=""
								name="direccion_legal"
								error={formik.touched.direccion_legal && Boolean(formik.errors.direccion_legal)}
								helperText={formik.touched.direccion_legal && formik.errors.direccion_legal}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="col-span-12"
								value={formik.values.direccion_legal}
								required
							>
								<FormControlLabel value="1" control={<Radio />} label="SI" />
								<FormControlLabel value="0" control={<Radio />} label="NO" />
							</RadioGroup>
							<FormHelperText></FormHelperText>
						</FormControl>
					</Box>
					{formik.values.direccion_legal == '0' ? (
						<Fragment>
							{/* Tipo de Vialidad */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									fullWidth
									select
									className="col-span-12"
									label="Tipo de Vialidad"
									name="vialidad"
									value={formik.values.vialidad}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.vialidad && Boolean(formik.errors.vialidad)}
									helperText={formik.touched.vialidad && formik.errors.vialidad}
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
							{/* Calle */}
							<Box className="col-span-12 md:col-span-8">
								<TextField
									fullWidth
									className="col-span-12"
									label="Calle"
									name="calle"
									value={formik.values.calle}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.calle && Boolean(formik.errors.calle)}
									helperText={formik.touched.calle && formik.errors.calle}
								/>
							</Box>
							{/* Número Exterior */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									type="Text"
									fullWidth
									className="col-span-12 md:col-span-4"
									label="Número Exterior"
									name="num_ext"
									value={formik.values.num_ext}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.num_ext && Boolean(formik.errors.num_ext)}
									helperText={formik.touched.num_ext && formik.errors.num_ext}
								/>
							</Box>
							{/* Número Interior */}
							<Box className="col-span-12 md:col-span-4">
								<TextField
									fullWidth
									className="col-span-12 md:col-span-4"
									label="Número Interior"
									name="num_int"
									value={formik.values.num_int}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.num_int && Boolean(formik.errors.num_int)}
									helperText={formik.touched.num_int && formik.errors.num_int}
								/>
							</Box>
							{/* Entre Calle 1 */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12 "
									label="Entre la Calle"
									name="entre_calle1"
									value={formik.values.entre_calle1}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.entre_calle1 && Boolean(formik.errors.entre_calle1)}
									helperText={formik.touched.entre_calle1 && formik.errors.entre_calle1}
								/>
							</Box>
							{/* Entre Calle 2 */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									className="col-span-12 "
									label="y Calle"
									name="entre_calle2"
									value={formik.values.entre_calle2}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.entre_calle2 && Boolean(formik.errors.entre_calle2)}
									helperText={formik.touched.entre_calle2 && formik.errors.entre_calle2}
								/>
							</Box>
							{/* Código Postal */}
							<Box className="col-span-12  md:col-span-4 text-left">
								<TextField
									fullWidth
									label="Código postal"
									name="cp"
									onChange={(e) => {
										bringcod(e.target.value);
										formik.setFieldValue('cp', e.target.value);
										formik.values.cp = e.target.value;
									}}
									onBlur={formik.handleBlur}
									error={formik.touched.cp && Boolean(formik.errors.cp)}
									helperText={formik.touched.cp && formik.errors.cp}
									value={formik.values.cp}
								/>
							</Box>
							{/* Entidad */}
							<Box className="col-span-12  md:col-span-6">
								<TextField
									label="Entidad"
									fullWidth
									name="entidad"
									className="dark:!text-neutral-100 "
									InputLabelProps={{ shrink: true }}
									disabled
									value={Entidad}
									onChange={formik.handleChange}
								/>
							</Box>
							{/* Municipio */}
							<Box className="col-span-12  md:col-span-6">
								<TextField
									label="Municipio"
									fullWidth
									name="municipio"
									className="dark:!text-neutral-100 "
									InputLabelProps={{ shrink: true }}
									disabled
									value={Municipio}
									onChange={formik.handleChange}
								/>
							</Box>
							{/* Asentamiento / Colonia */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									select
									className="col-span-12"
									label="Asentamiento / Colonia"
									name="colonia"
									value={formik.values.colonia}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.colonia && Boolean(formik.errors.colonia)}
									helperText={formik.touched.colonia && formik.errors.colonia}
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
							{/* Teléfono1 */}
							<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
								<TextField
									type="tel"
									fullWidth
									className="col-span-12 md:col-span-12"
									label="Teléfono 1"
									name="telefono1"
									value={formik.values.telefono1}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.telefono1 && Boolean(formik.errors.telefono1)}
									helperText={formik.touched.telefono1 && formik.errors.telefono1}
									inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
								/>
							</Box>
							{/* Correo electrónico  */}
							<Box className="col-span-12  md:col-span-6">
								<TextField
									type="email"
									fullWidth
									className="col-span-12"
									label="Correo electrónico de la persona responsable"
									name="correo"
									value={formik.values.correo}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.correo && Boolean(formik.errors.correo)}
									helperText={formik.touched.correo && formik.errors.correo}
								/>
							</Box>
							{/* Sitio Web */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									type="url"
									className="col-span-12 "
									label="Sitio Web"
									name="web"
									value={formik.values.web}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.web && Boolean(formik.errors.web)}
									helperText={formik.touched.web && formik.errors.web}
								/>
							</Box>
							{/* Redes sociales */}
							<Box className="col-span-12 md:col-span-6">
								<TextField
									fullWidth
									multiline
									rows={4}
									rowsMax={6}
									className="col-span-12 "
									label="Redes sociales"
									name="redes"
									value={formik.values.redes}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.redes && Boolean(formik.errors.redes)}
									helperText={formik.touched.redes && formik.errors.redes}
								/>
							</Box>
						</Fragment>
					) : null}

					<Divider className="col-span-12" />

					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
						Datos de (los) representante(s) legale(s) (máx. 4)
					</Typography>
					<Box className="col-span-12 text-left">
						<FormControl component="fieldset" className="col-span-12">
							<FormLabel component="legend">¿El director o representante de la institución es alguno de los representantes legales? *</FormLabel>
							<RadioGroup
								aria-label=""
								name="representante_legal"
								error={formik.touched.representante_legal && Boolean(formik.errors.representante_legal)}
								helperText={formik.touched.representante_legal && formik.errors.representante_legal}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="col-span-12"
								value={formik.values.representante_legal}
								required
							>
								<FormControlLabel value="1" control={<Radio />} label="SI" />
								<FormControlLabel value="0" control={<Radio />} label="NO" />
							</RadioGroup>
							<FormHelperText></FormHelperText>
						</FormControl>
					</Box>

					<Box className="col-span-12 grid grid-cols-12  md:col-span-12">
						<InputLabel className='col-span-12 !text-right'>Asignar a los representantes Legales (Max 4) dando clic en el botón <Add /> de la tabla </InputLabel>
						<DatosLegalesDataTable />
					</Box>
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Card>
	);
};

export default DatosLegales;
