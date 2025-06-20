import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { FormularioContext } from '../../Context/FormularioProvider';
import { useContext } from 'react';
import * as Yup from 'yup';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';

const AceptarVerificacion = () => {
	const { TipoInstitucion, IdInstitucion } = useContext(FormularioContext);
	const formik = useFormik({
		initialValues: {
			id_institucion: IdInstitucion,
			id_enlace: 0,
			id_verificador: null,
			comentarios_aceptacion: '',
			verificador_identificacion: null,
			verificador_identificacion_folio: null,
			verificador_identificacion_emitida: null,
			verificador_telefono: null,
			verificador_correo: null,
			domicilio: '',
		},
		validationSchema: Yup.object({
			id_institucion: Yup.string().required(),
			id_enlace: Yup.string().required(),
			id_verificador: Yup.number().notRequired(),
			comentarios_aceptacion: Yup.string().notRequired(),
			verificador_identificacion: Yup.number().required('Este campo es obligatorio'),
			verificador_identificacion_folio: Yup.string().required('Este campo es obligatorio'),
			verificador_identificacion_emitida: Yup.string().required('Este campo es obligatorio'),
			verificador_telefono: Yup.number('Solo se permiten números')
				.required('Este campo es obligatorio'),
			verificador_correo: Yup.string()
				.email('Ingresa un correo válido') // Valida que el formato sea correcto
				.required('Este campo es obligatorio'),

			domicilio: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
			} catch (error) {
				console.error(error);
			}
		},
	});
	return (
		<Box className="col-span-12 grid grid-cols-12 gap-1">
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 p-4 grid grid-cols-12 gap-4">
				<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
					<TextField
						fullWidth
						className="col-span-12"
						multiline
						rows={4}
						maxRows={8}
						label="Comentarios de aceptación"
						name="comentarios_aceptacion"
						value={formik.values.comentarios_aceptacion}
						error={formik.touched.comentarios_aceptacion && Boolean(formik.errors.comentarios_aceptacion)}
						helperText={formik.touched.comentarios_aceptacion && formik.errors.comentarios_aceptacion}
					/>
				</Box>

				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography variant="body1" className="col-span-12  text-left">
						Nombre del verificador
					</Typography>
					<Typography className="col-span-12 text-left">{'Nombre del verificador'}</Typography>
				</Box>
				<Box className="col-span-12 grid grid-cols-12">
					<TextField
						select
						fullWidth
						className="col-span-12"
						label="¿Comó se identificará en la verificación?"
						name="verificador_identificacion"
						value={formik.values.verificador_identificacion}
						error={formik.touched.verificador_identificacion && Boolean(formik.errors.verificador_identificacion)}
						helperText={formik.touched.verificador_identificacion && formik.errors.verificador_identificacion}
					>
						<MenuItem value={1}>Credencial de elector</MenuItem>
						<MenuItem value={2}>Pasaporte</MenuItem>
						<MenuItem value={3}>Cédula profesional</MenuItem>
						<MenuItem value={4}>Credencial de empleado</MenuItem>
						<MenuItem value={5}>Licencia de conducir</MenuItem>
					</TextField>
				</Box>
				<Box className="col-span-12 grid grid-cols-12">
					<TextField
						fullWidth
						className="col-span-12"
						label="Número de folio"
						name="verificador_identificacion_folio"
						value={formik.values.verificador_identificacion_folio}
						error={formik.touched.verificador_identificacion_folio && Boolean(formik.errors.verificador_identificacion_folio)}
						helperText={formik.touched.verificador_identificacion_folio && formik.errors.verificador_identificacion_folio}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12">
					<TextField
						fullWidth
						className="col-span-12"
						label="Emitida por"
						name="verificador_identificacion_emitida"
						value={formik.values.verificador_identificacion_emitida}
						error={formik.touched.verificador_identificacion_emitida && Boolean(formik.errors.verificador_identificacion_emitida)}
						helperText={formik.touched.verificador_identificacion_emitida && formik.errors.verificador_identificacion_emitida}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12">
					<TextField
						type="tel"
						fullWidth
						className="col-span-12"
						label="Teléfono"
						name="verificador_telefono"
						value={formik.values.verificador_telefono}
						error={formik.touched.verificador_telefono && Boolean(formik.errors.verificador_telefono)}
						helperText={formik.touched.verificador_telefono && formik.errors.verificador_telefono}
						inputProps={{
							inputMode: 'numeric',
							minLength: 10,
							maxLength: 10,
							required: true,
							pattern: '[0-9]*',
						}}
						onChange={() => {
							/* console.log(event.target.value);
							const value = event.target.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
							console.log(value)
							formik.values.verificador_telefono = value;
							formik.setFieldValue('verificador_telefono', value); */
							formik.handleChange();
						}}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12">
					<TextField
						type="email"
						fullWidth
						className="col-span-12"
						label="Correo electrónico"
						name="verificador_correo"
						value={formik.values.verificador_correo}
						error={formik.touched.verificador_correo && Boolean(formik.errors.verificador_correo)}
						helperText={formik.touched.verificador_correo && formik.errors.verificador_correo}
						inputProps={{ inputMode: 'email' }}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 justify-center gap-4">
					<TextField
						fullWidth
						className="col-span-12"
						multiline
						rows={4}
						maxRows={8}
						label="Domicilio del centro de trabajo"
						name="domicilio"
						value={formik.values.domicilio}
						error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
						helperText={formik.touched.domicilio && formik.errors.domicilio}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography variant="body1" className="col-span-12  text-left">
						Tipo de usuario
					</Typography>
					<Typography className="col-span-12 text-left">{'Tipo de usuario'}</Typography>
				</Box>
				<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
					<Button type="submit" className="!bg-primary col-span-12 !text-white dark:!text-inherit">
						Aceptación de verificación del pre registro
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default AceptarVerificacion;
