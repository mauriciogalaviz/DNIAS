import { Box, Divider, MenuItem, TextField, Typography, FormControl, FormLabel, RadioGroup, FormHelperText, FormControlLabel, Radio, Button, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';

import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import ServiciosInstitucionDataTable from './ServiciosInstitucionDataTable';
import BotonGuardar from '../BotonGuardar';

const ServiciosInstitucionCobertura = () => {
	const { FormCoberturaGeo, IDEntidad, IDMunicipio, Entidad, Municipio, clearFormCAI, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormCoberturaGeo.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio'),
			entidad: Yup.number().required('Este campo es obligatorio'),
			municipio: Yup.number().required('Este campo es obligatorio'),
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
	return (
		<Box className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 grid grid-cols-12 p-4">
				<Divider className="col-span-12 pt-2" />
				<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 grid grid-cols-12 gap-4 pt-4">
					{/* Entidad */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Entidad"
							name="entidad"
							value={formik.values.entidad}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.entidad && Boolean(formik.errors.entidad)}
							helperText={formik.touched.entidad && formik.errors.entidad}
							required
						>
							<MenuItem key={1} value="1">
								Federal
							</MenuItem>
							<MenuItem key={2} value="2">
								Estatal
							</MenuItem>
							<MenuItem key={3} value="3">
								Municipal
							</MenuItem>
							<MenuItem key={4} value="4">
								Ninguno
							</MenuItem>
						</TextField>
					</Box>
					{/* Municipio */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Municipio"
							name="municipio"
							value={formik.values.municipio}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.municipio && Boolean(formik.errors.municipio)}
							helperText={formik.touched.municipio && formik.errors.municipio}
							required
						>
							<MenuItem key={1} value="1">
								Federal
							</MenuItem>
							<MenuItem key={2} value="2">
								Estatal
							</MenuItem>
							<MenuItem key={3} value="3">
								Municipal
							</MenuItem>
							<MenuItem key={4} value="4">
								Ninguno
							</MenuItem>
						</TextField>
					</Box>
					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Box>
	);
};

export default ServiciosInstitucionCobertura;
