import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
const RepPassSuccess = ({ setOpenModal }) => {
	return (
		<Box className="text-black">
			<Box className="col-span-12 md:col-span-12 bg-green-00 rounded text-black p-4">
				<Typography>
					Contraseña guardada con exito, cierre esta ventana e intente
					iniciar sesión colocando su correo y la contraseña nueva
				</Typography>
			</Box>
			<Box className="col-span-12 md:col-span-12 p-4">
				<Box className="mb-2">
					<Button
						onClick={() => {
							setOpenModal(1);
							setOpenModal(false);
						}}
					>
						Cerrar Ventana
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
export default RepPassSuccess;
RepPassSuccess.propTypes = {
	setOpenModal: PropTypes.element.isRequired,
};