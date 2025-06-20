import { TextField } from '@mui/material'
import { FormLabel } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import { FormularioContext } from '../../Context/FormularioProvider'
import { useContext } from 'react'
import * as Yup from 'yup'

const Rechaza = () => {
	const { IdInstitucion } = useContext(FormularioContext);
  const formik = useFormik({
		initialValues: {
			id_institucion: IdInstitucion,
			id_enlace: '0',
			descripcion: '',
		},
		validationSchema: Yup.object({
			id_institucion: Yup.string().required(),
			id_enlace: Yup.string().required(),
			descripcion: Yup.string().notRequired(),
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
			<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
					<TextField
						fullWidth
						className="col-span-12"
						multiline
						rows={4}
						maxRows={8}
						label="Motivo del rechazo"
						name="descripcion"
						value={formik.values.descripcion}
						error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
						helperText={formik.touched.descripcion && formik.errors.descripcion}
					/>
				</Box>
				<Box className="col-span-12 p-2 grid grid-cols-12 justify-center gap-4">
					<Button type="submit" className="!bg-primary col-span-12 !text-white dark:!text-inherit">
						Rechazar pre registro
					</Button>
				</Box>
			</form>
		</Box>
	);
}

export default Rechaza