import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { FormularioContext } from '../../Context/FormularioProvider';
import { useContext } from 'react';
import * as Yup from 'yup';
import { MenuItem } from '@mui/material';

const Autoriza = () => {
	const { TipoInstitucion, IdInstitucion } = useContext(FormularioContext);
	const formik = useFormik({
		initialValues: {
			id_institucion: IdInstitucion,
			id_enlace: 0,
			descripcion: '',
			verificador: null,
		},
		validationSchema: Yup.object({
			id_institucion: Yup.string().required(),
			id_enlace: Yup.string().required(),
			descripcion: Yup.string().notRequired(),
			verificador: Yup.number().notRequired(),
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
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 p-4 grid grid-cols-12">
				{TipoInstitucion == 2 ? (
					<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
						<TextField
							fullWidth
							className="col-span-12"
							multiline
							rows={4}
							maxRows={8}
							label="Descripción del enlace estatal"
							name="descripcion"
							value={formik.values.descripcion}
							error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
							helperText={formik.touched.descripcion && formik.errors.descripcion}
						/>
					</Box>
				) : null}
				{TipoInstitucion == 2 ? (
					<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
						<FormLabel className="col-span-12">La institución es de tipo privada, por lo cuál requiere ser verificada, asigne un verificador</FormLabel>
						<TextField
							fullWidth
							select
							className="col-span-12"
							label="Selecciona verificador"
							name="verificador"
							value={formik.values.verificador}
							error={formik.touched.verificador && Boolean(formik.errors.verificador)}
							helperText={formik.touched.verificador && formik.errors.verificador}
						>
							<MenuItem value={1}>Verificador 1</MenuItem>
							<MenuItem value={2}>Verificador 2</MenuItem>
							<MenuItem value={3}>Verificador 3</MenuItem>
						</TextField>
					</Box>
				) : null}
				<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
					<Button type="submit" className="!bg-primary col-span-12 !text-white dark:!text-inherit">
						{TipoInstitucion == 2 ? 'Aceptación de pre registro y asignación de verificador de institución privada' : 'Aceptación de pre registro de institución pública'}
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default Autoriza;
