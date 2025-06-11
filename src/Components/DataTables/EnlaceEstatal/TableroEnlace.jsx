import { Box, Card, Typography } from '@mui/material';
import Tablero from '../../DataTables/Administrador/Tablero/Tablero';

const TableroEnlace = () => {
  return (
		<Card className="grid grid-cols-12 col-span-12 p-2  gap-4">
			<Typography variant="h6" className="col-span-12 p-2 text-inherit">
				Monitoreo de Pre-Registros - Enlace
			</Typography>

			<Box className="grid grid-cols-12 col-span-12 p-2 gap-4">
				<Tablero />
			</Box>
		</Card>
  );
}

export default TableroEnlace