import { Box, Button, Card, Divider, FormControl, FormHelperText, FormLabel, MenuItem, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext } from 'react';
import { FormularioContext } from '../../Context/FormularioProvider';
import { useState } from 'react';
import { Fragment } from 'react';
import BotonGuardar from '../BotonGuardar';

const DocumentacionCargaArchivos = () => {
	const { FormDocumentacionCarga, BotoneraForm } = useContext(FormularioContext);
	const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
	const formik = useFormik({
		initialValues: FormDocumentacionCarga.data,
		onSubmit: async (values) => {
			console.log('values', values.archivo[0]);
			console.log(archivoSeleccionado);
			console.log(archivoSeleccionado.name);
			console.log(archivoSeleccionado.size);
			console.log(archivoSeleccionado.type);
			values.archivo = [archivoSeleccionado];
			console.log(values.archivo);
		},
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio').nonNullable(),
			tipo_archivo: Yup.number().required('Este campo es obligatorio').nonNullable(),
		}),
	});
	return (
		<Card className="col-span-12 grid grid-cols-12 p-0 bg-white">
			<Divider className="col-span-12 p-2" />
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4">
					<Typography variant="h6" className="col-span-12 p-2 text-primary dark:!text-inherit dark:!text-inherit">
						Documentación
					</Typography>
					{/* Componente de carga de archivo */}
					<Box className="col-span-12 md:col-span-12">
						<FormControl fullWidth className="grid gap-4">
							<FormLabel>Seleccione el documento que anexará, y agréguelo al listado de archivos</FormLabel>
							<TextField
								fullWidth
								select
								className="col-span-12"
								label="Documento *"
								name="tipo_archivo"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.tipo_archivo && Boolean(formik.errors.tipo_archivo)}
								helperText={formik.touched.tipo_archivo && formik.errors.tipo_archivo}
								required
							>
								<MenuItem key={1} value="1">
									COMPROBANTE DE DOMICILIO SOCIAL
								</MenuItem>
								<MenuItem key={2} value="2">
									IDENTIFICACIÓN REPRESENTANTE LEGAL
								</MenuItem>
								<MenuItem key={3} value="3">
									IDENTIFICACIÓN DIRECTOR(A)
								</MenuItem>
								<MenuItem key={4} value="4">
									COMPROBANTE DE DOMICILIO LEGAL
								</MenuItem>
								<MenuItem key={5} value="5">
									REGISTRO FEDERAL DE CONTRIBUYENTES (RFC)
								</MenuItem>
								<MenuItem key={6} value="6">
									CLUNI
								</MenuItem>
								<MenuItem key={7} value="7">
									OTRO
								</MenuItem>
								<MenuItem key={8} value="8">
									VALIDACIÓN POR LA JAP
								</MenuItem>
								<MenuItem key={9} value="9">
									VALIDACIÓN DE DOCUMENTOS
								</MenuItem>
								<MenuItem key={10} value="10">
									INFORME ANUAL
								</MenuItem>
							</TextField>
							<Box className="mt-4">
								<Button variant="contained" component="label" color="primary">
									Seleccionar archivo
									<input
										type="file"
										hidden
										name="archivo"
										accept=".pdf"
										onChange={(e) => {
											const file = e.target.files[0];
											if (file && file.type !== 'application/pdf') {
												alert('Solo se permiten archivos con extensión .pdf');
												setArchivoSeleccionado(null);
												formik.setFieldValue('archivo', null);
											} else {
												setArchivoSeleccionado(file);
												formik.setFieldValue('archivo', file);
											}
										}}
									/>
								</Button>
								{archivoSeleccionado && (
									<Fragment>
										<Typography variant="body2" className="mt-2">
											Archivo seleccionado: {archivoSeleccionado.name}
										</Typography>
										<Typography variant="body2" className="mt-2">
											Nombre del archivo en el sistema con el que se guardará:{' '}
											{formik.values.tipo_archivo == 1
												? 'COMPROBANTE_DE_DOMICILIO_SOCIAL'
												: formik.values.tipo_archivo == 2
												? 'IDENTIFICACION_REPRESENTANTE_LEGAL'
												: formik.values.tipo_archivo == 3
												? 'IDENTIFICACION_DIRECTOR'
												: formik.values.tipo_archivo == 4
												? 'COMPROBANTE_DE_DOMICILIO_LEGAL'
												: formik.values.tipo_archivo == 5
												? 'REGISTRO_FEDERAL_DE_CONTRIBUYENTES'
												: formik.values.tipo_archivo == 6
												? 'CLUNI'
												: formik.values.tipo_archivo == 7
												? 'OTRO'
												: formik.values.tipo_archivo == 8
												? 'VALIDACION_POR_LA_JAP'
												: formik.values.tipo_archivo == 9
												? 'VALIDACION_DE_DOCUMENTOS'
												: formik.values.tipo_archivo == 10
												? 'INFORME_ANUAL'
												: 'DESCONOCIDO'}
										</Typography>
									</Fragment>
								)}
							</Box>
							{formik.touched.archivo && formik.errors.archivo && <FormHelperText error>{formik.errors.archivo}</FormHelperText>}
						</FormControl>
					</Box>
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Card>
	);
};

export default DocumentacionCargaArchivos;
