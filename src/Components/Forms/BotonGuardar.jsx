import { Button } from '@mui/material';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FormularioContext } from '../Context/FormularioProvider';

const BotonGuardar = ({formik}) => {
	const { ErrorMessage, setIdInstitucion } = useContext(FormularioContext);
  return (
		<Box className="col-span-12 grid grid-cols-12  md:col-span-12 gap-4">
			<Button
				type="submit"
				variant="contained"
				color="primary"
				onClick={async (e) => {
					e.preventDefault();
					/*const newValues = { ...formik.values };
					 delete newValues['cluni']; // Elimina la clave del objeto
					formik.setValues('newValues', newValues); 
					console.log('newValues', newValues);*/
					//console.log('formik.values', formik.values);
					formik.handleSubmit();
					console.log('formik.errors', formik.errors);
					
					// Send form data to server here
					/* if (!formik.errors) {
					formik.handleSubmit();
					setIdInstitucion(1);} */
					setIdInstitucion(1);
				}}
				className="!bg-primary !text-white"
			>
				Guardar
			</Button>
		</Box>
  );
}
BotonGuardar.propTypes = {
	formik: PropTypes.element.isRequired
}

export default BotonGuardar