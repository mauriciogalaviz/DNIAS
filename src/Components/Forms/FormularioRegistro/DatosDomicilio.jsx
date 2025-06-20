import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Card } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import BotonGuardar from '../BotonGuardar';
import DomicilioGeo from './DomicilioGeo';

const DatosDomicilio = () => {
	const { FormDomicilio, setFormDomicilio, bringcod, IDEntidad, IDMunicipio, Entidad, Municipio, BotoneraForm, TipoInstitucion, clearDataForm2 } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormDomicilio.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es requerido'),
			cluni: TipoInstitucion == 2 ? Yup.string().required('este campo es requerido') : Yup.string().notRequired(),
			tipo_organizacion: TipoInstitucion == 1 ? Yup.string().required('este campo es requerido') : Yup.string().notRequired(),
			anios_servicio: Yup.string().required('Este campo es requerido'),
			vialidad: Yup.string().required('Este campo es requerido'),
			calle: Yup.string().required('Este campo es requerido'),
			num_ext: Yup.string().required('Este campo es requerido'),
			num_int: Yup.string().notRequired(),
			entre_calle1: Yup.string().required('Este campo es requerido'),
			entre_calle2: Yup.string().required('Este campo es requerido'),
			cp: Yup.string().required('Este campo es requerido'),
			id_entidad: Yup.string().notRequired(),
			id_municipio: Yup.string().notRequired(),
			id_asentamiento: Yup.string().required('Este campo es requerido'),
			telefono1: Yup.string().required('Este campo es requerido'),
			telefono2: Yup.string().required('Este campo es requerido'),
			telefono3: Yup.string().required('Este campo es requerido'),
			correo_institucion: Yup.string().required('Este campo es requerido'),
			web: Yup.string().notRequired(),
			redes: Yup.string().notRequired(),
			nombre_responsable: Yup.string().required('Este campo es requerido'),
			pa_responsable: Yup.string().required('Este campo es requerido'),
			sa_responsble: Yup.string().notRequired(),
			telefono1_responsable: Yup.string().required('Este campo es requerido'),
			telefono2_responsable: Yup.string().required('Este campo es requerido'),
			celular_responsable: Yup.string().required('Este campo es requerido'),
			identificacion_responsable: Yup.string().required('Este campo es requerido'),
			folio_responsable: Yup.string().required('Este campo es requerido'),
			fecha_expedicion_responsable: Yup.string().required('Este campo es requerido'),
		}),
		onSubmit: async (values) => {
			const newValues = { ...formik.values };
			delete newValues['cluni']; // Elimina la clave del objeto
			formik.setValues(newValues);
			console.log(values);
			setOpenBackDrop(true);
			setFormDomicilio({
				...FormDomicilio,
				data: formik.values,
			});
			console.log(FormDomicilio.data);
			values.id_entidad = 0;
			values.id_municipio = 0;
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
					Datos de Institución y Domicilio Social
				</Typography>
			}
			<Divider className="col-span-12 p-2" />
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit ">
						Datos generales
					</Typography>
					{/* Clave única de Registro (CLUNI) */}
					{TipoInstitucion == 2 ? (
						<Box className="col-span-12 md:col-span-8">
							<TextField
								fullWidth
								className="col-span-12"
								label="Clave única de Registro (CLUNI)"
								name="cluni"
								value={formik.values.cluni}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.cluni && Boolean(formik.errors.cluni)}
								helperText={formik.touched.cluni && formik.errors.cluni}
								required
							/>
						</Box>
					) : null}
					{/* Tipo de Organización */}
					{TipoInstitucion == 1 ? (
						<Box className="col-span-12 md:col-span-8">
							<TextField
								fullWidth
								select
								className="col-span-12"
								label="Tipo de Organización"
								name="tipo_organizacion"
								value={formik.values.tipo_organizacion}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.tipo_organizacion && Boolean(formik.errors.tipo_organizacion)}
								helperText={formik.touched.tipo_organizacion && formik.errors.tipo_organizacion}
								required
							>
								<MenuItem key={1} value="1">
									Sistema Estatal DIF
								</MenuItem>
								<MenuItem key={2} value="2">
									Sistema Municipal DIF
								</MenuItem>
								<MenuItem key={3} value="3">
									Procuraduría de la Defensa del Menor y la Familia
								</MenuItem>
								<MenuItem key={4} value="4">
									Centro Asistencial
								</MenuItem>
								<MenuItem key={5} value="5">
									Otro
								</MenuItem>
								<MenuItem key={6} value="6">
									Junta de Asistencia Privada (JAP)
								</MenuItem>
								<MenuItem key={7} value="7">
									Sistema Nacional DIF
								</MenuItem>
							</TextField>
						</Box>
					) : null}
					{/* Cantidad de años brindando el Servicio */}
					<Box className="col-span-12 md:col-span-4">
						<TextField
							type="number"
							fullWidth
							className="col-span-12 md:col-span-4"
							label="Cantidad de años brindando el Servicio"
							name="anios_servicio"
							value={formik.values.anios_servicio}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.anios_servicio && Boolean(formik.errors.anios_servicio)}
							helperText={formik.touched.anios_servicio && formik.errors.anios_servicio}
							required
							InputLabelProps={{ shrink: true }}
							inputProps={{ min: 0 }}
						/>
					</Box>
					<Divider className="col-span-12" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Domicilio Social
					</Typography>
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
							required
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
							required
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
							required
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
							required
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
							required
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
							required
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
							name="id_asentamiento"
							value={formik.values.id_asentamiento}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.id_asentamiento && Boolean(formik.errors.id_asentamiento)}
							helperText={formik.touched.id_asentamiento && formik.errors.id_asentamiento}
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
							required
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Teléfono2 */}
					<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
						<TextField
							type="tel"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Teléfono 2"
							name="telefono2"
							value={formik.values.telefono2}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.telefono2 && Boolean(formik.errors.telefono2)}
							helperText={formik.touched.telefono2 && formik.errors.telefono2}
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Teléfono3 */}
					<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
						<TextField
							type="tel"
							fullWidth
							className="col-span-12 md:col-span-12"
							label="Teléfono 3"
							name="telefono3"
							value={formik.values.telefono3}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.telefono3 && Boolean(formik.errors.telefono3)}
							helperText={formik.touched.telefono3 && formik.errors.telefono3}
							inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
						/>
					</Box>
					{/* Correo electrónico de la persona responsable */}
					<Box className="col-span-12  md:col-span-6">
						<TextField
							type="email"
							fullWidth
							className="col-span-12"
							label="Correo electrónico de la persona responsable"
							name="correo_institucion"
							value={formik.values.correo_institucion}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.correo_institucion && Boolean(formik.errors.correo_institucion)}
							helperText={formik.touched.correo_institucion && formik.errors.correo_institucion}
							required
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
							required
						/>
					</Box>
					{/* Redes sociales */}
					<Box className="col-span-12 md:col-span-12">
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
							required
						/>
					</Box>
					<Divider className="col-span-12" />
					<DomicilioGeo formik={formik} />
					<Divider className="col-span-12" />
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit">
						Datos del (la) director(a) o representante de la institución
					</Typography>
					{/* Nombre de la persona responsable */}
					<Box className="col-span-12  md:col-span-4">
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
					<Box className="col-span-12  md:col-span-4">
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
					<Box className="col-span-12  md:col-span-4">
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
					<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
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
					<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
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
					<Box className="col-span-12 grid grid-cols-12  md:col-span-4">
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
					<Box className="col-span-12 md:col-span-4">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Se identifica con"
							name="identificacion_responsable"
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
					<Box className="col-span-12 md:col-span-4">
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
					<Box className="col-span-12 md:col-span-4">
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

export default DatosDomicilio;
