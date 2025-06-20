import { Box, Divider, MenuItem, TextField, Card } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { FormularioContext } from '../../Context/FormularioProvider';
import { UtilsContext } from '../../Context/UtilsProvider';
import { DataContext } from '../../Context/DataProvider';
import BotonGuardar from '../BotonGuardar';

const RecusosHumanosInfra = () => {
	const { FormRecursosHumanosInfra, BotoneraForm } = useContext(FormularioContext);
	const { SnackbarData, setSnackbarData, setOpenBackDrop } = useContext(UtilsContext);
	const { headerList } = useContext(DataContext);

	const formik = useFormik({
		initialValues: FormRecursosHumanosInfra.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required('Este campo es obligatorio').nonNullable(),
			infra: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			setOpenBackDrop(true);
			let url = `https://api.dif.gob.mx/cuidados/cai/registro/`;
			let metodo = 'POST';
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
				//clearDataForm2();
				setSnackbarData({
					...SnackbarData,
					open: true,
					severity: 'success',
					content: 'CAI creada correctamente.',
					duration: 3000,
				});
				//clearDataForm2();
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
					{/* Se identifica con */}
					<Box className="col-span-12 md:col-span-12">
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Las instalaciones donde brinda sus servicios son:*"
							name="infra"
							value={formik.values.infra}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.infra && Boolean(formik.errors.infra)}
							helperText={formik.touched.infra && formik.errors.infra}
							required
						>
							<MenuItem key={1} value="1">
								PROPIAS
							</MenuItem>
							<MenuItem key={2} value="2">
								RENTADAS
							</MenuItem>
							<MenuItem key={3} value="3">
								COMODATO
							</MenuItem>
							<MenuItem key={3} value="3">
								PRESTADAS
							</MenuItem>
						</TextField>
					</Box>

					{/* Botonera */}
					{BotoneraForm ? <BotonGuardar formik={formik} /> : null}
				</form>
			</Box>
		</Card>
	);
};

export default RecusosHumanosInfra;
