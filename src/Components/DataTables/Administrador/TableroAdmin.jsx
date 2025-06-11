import { Box, Card, Typography } from '@mui/material';
import Tablero from './Tablero/Tablero';

const TableroAdmin = () => {
  return (
		<Card className="grid grid-cols-12 col-span-12 p-2  gap-4">
			<Typography variant="h6" className="col-span-12 p-2 text-inherit">
				Tablero de Pre-Registros - Administrador
			</Typography> 
			
			<Box className="grid grid-cols-12 col-span-12 p-2 gap-4">
				<Tablero />
			</Box>
		</Card>
  );
}

export default TableroAdmin