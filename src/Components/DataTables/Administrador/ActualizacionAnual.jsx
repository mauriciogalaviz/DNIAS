import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material';

import { FormularioContext } from '../../Context/FormularioProvider';
import { useContext } from 'react';
import EnCaptura from './ActualizacionAnual/EnCaptura';
import EnRevision from './ActualizacionAnual/EnRevision';
import EnVerificar from './ActualizacionAnual/EnVerificar';
import PorAdministrador from './ActualizacionAnual/PorAdministrador';
import { useEffect } from 'react';

const ActualizacionAnual = () => {
	const { activeButton, setActiveButton, ListView, setListView, handleButtonClick } = useContext(FormularioContext);
	useEffect(() => {
		setActiveButton(0);
		setListView(0);
		// eslint-disable-next-line
	}, []);
	return (
		<Card className="grid grid-cols-12 col-span-12 p-2  gap-4">
			<Typography variant="h6" className="col-span-12 p-2 text-inherit">
				Monitoreo de Actualización Anual - Adminstrador
			</Typography>
			<ButtonGroup variant="outined" aria-label="Basic button group" className="col-span-12 mx-4 text-white ">
				{['En Captura', 'Por Revisión', 'Por Verificar', 'Por Revision Administrador'].map((label, index) => (
					<Button
						key={index}
						className={`!border-white !border ${activeButton === index ? '!bg-secondary' : '!bg-primary dark:!text-inherit'}`}
						onClick={() => handleButtonClick(index)}
					>
						{label}
					</Button>
				))}
			</ButtonGroup>

			<Box className="grid grid-cols-12 col-span-12 p-2 gap-4">
				{ListView == 0 ? <EnCaptura /> : null}
				{ListView == 1 ? <EnRevision /> : null}
				{ListView == 2 ? <EnVerificar /> : null}
				{ListView == 3 ? <PorAdministrador /> : null}
			</Box>
		</Card>
	);
};

export default ActualizacionAnual;
