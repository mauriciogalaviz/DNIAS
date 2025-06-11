import { Box, Chip} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormularioContext } from '../../../Context/FormularioProvider';
import Options from '../../../ColumnsData/Options';
const EnRevision = () => {
	const [TableData, setTableData] = useState([]);
	const { VerRegistro, EliminarRegistro } = useContext(FormularioContext);
	/* const { headerList } = useContext(DataContext); */

	const columns = [
		{
			name: 'entidad',
			label: 'Entidad',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'enviado',
			label: 'Enviado',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'rechazado_verificador',
			label: 'Rechazado por verificador',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'rechazado_administrador',
			label: 'Rechazado por administrador',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'revision_verificador',
			label: 'Actualización Anual',
			options: {
				filter: true,
				sort: true,
			},
		},
	];
	
	/* const getList = async (name = 'cai') => {
		try {
			// Fetch data from API or database
			const response = await fetch('https://api.dif.gob.mx/cuidados/cai/', {
				method: 'GET',
				headers: headerList,
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			data.centros = data.centros.map((e) => {
				e.opc = (
					<Box className="flex grid-cols-4">
						<Tooltip title="Ver Detalles">
							<IconButton
								onClick={() => {
									VerRegistro(e.id_centro, name, 0);
								}}
							>
								<Visibility />
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar">
							<IconButton
								onClick={() => {
									VerRegistro(e.id_centro, name, 1);
								}}
							>
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip title="Eliminar">
							<IconButton
								onClick={() => {
									EliminarRegistro(e.id_centro, name);
								}}
							>
								<Delete />
							</IconButton>
						</Tooltip>
						<Tooltip title="Ubicación">
							<IconButton
								onClick={() => {
									window.open(e.google, '_blank');
								}}
							>
								<MapIcon />
							</IconButton>
						</Tooltip>
					</Box>
				);
				return e;
			});
			setTableData(data.centros);
		} catch (error) {
			console.error(error);
		}
	}; */
	const listFake = async () => {
		let data = [
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				enviado: 30,
				rechazado_verificador: 10,
				rechazado_administrador: 5,
				revision_verificador: 30,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				enviado: 30,
				rechazado_verificador: 10,
				rechazado_administrador: 5,
				revision_verificador: 30,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				enviado: 30,
				rechazado_verificador: 10,
				rechazado_administrador: 5,
				revision_verificador: 30,
			},
		];

		data = data.map((e, i) => {
			e.enviado = <Chip variant="outlined" fullWidth key={i} label={e.enviado} className="cursor-auto" onClick={() => {}} />;
			e.rechazado_verificador = <Chip variant="outlined" fullWidth key={i} label={e.rechazado_verificador} className="cursor-auto" onClick={() => {}} />;
			e.rechazado_administrador = <Chip variant="outlined" fullWidth key={i} label={e.rechazado_administrador} className="cursor-auto" onClick={() => {}} />;
			e.revision_verificador = <Chip variant="outlined" fullWidth key={i} label={e.revision_verificador} className="cursor-auto" onClick={() => {}} />;

			return e;
		});
		setTableData(<MUIDataTable className="MUIDataTable" title="Pre-Registro en Revisión Enlace Estatal y Verificador" data={data} columns={columns} options={Options} />);
	};
	useEffect(() => {
		/* getList(); */
		listFake();
		return () => {
			//cleanup
		};
	}, []);

	return <Box className="col-span-12  p-2 gap-4 text-left">{TableData}</Box>;
};

export default EnRevision;
