import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Tooltip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FormularioContext } from '../../../Context/FormularioProvider';
import { DataContext } from '../../../Context/DataProvider';
import MapIcon from '@mui/icons-material/Map';
import PrintIcon from '@mui/icons-material/Print';
import Options from '../../../ColumnsData/Options';
const EnVerificar = () => {
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
			name: 'por_verificar',
			label: 'Actualización Anual por Verificar',
			options: {
				filter: true,
				sort: true,
			},
		},

		{
			name: 'nueva_verificacion',
			label: 'Nueva verificación para actualización anual	',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'verificadas',
			label: 'Actualización Anual Verificada',
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
									VerRegistro(e.id_institucion, name, 0);
								}}
							>
								<Visibility />
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar">
							<IconButton
								onClick={() => {
									VerRegistro(e.id_institucion, name, 1);
								}}
							>
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip title="Eliminar">
							<IconButton
								onClick={() => {
									EliminarRegistro(e.id_institucion, name);
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
				por_verificar: 30,
				nueva_verificacion: 10,
				verificadas: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				por_verificar: 30,
				nueva_verificacion: 10,
				verificadas: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				por_verificar: 30,
				nueva_verificacion: 10,
				verificadas: 5,
			},
		];

		data = data.map((e, i) => {
			e.por_verificar = <Chip variant="outlined" fullWidth key={i} label={e.por_verificar} className="cursor-auto" onClick={() => {}} />;
			e.nueva_verificacion = <Chip variant="outlined" fullWidth key={i} label={e.nueva_verificacion} className="cursor-auto" onClick={() => {}} />;
			e.verificadas = <Chip variant="outlined" fullWidth key={i} label={e.verificadas} className="cursor-auto" onClick={() => {}} />;

			return e;
		});
		setTableData(<MUIDataTable className="MUIDataTable" title="Pre-Registro en Verificación" data={data} columns={columns} options={Options} />);
	};
	useEffect(() => {
		//getList();
		listFake();
		return () => {
			//cleanup
		};
	}, []);
	return <Box className="col-span-12  p-2 gap-4 text-left">{TableData}</Box>;
};

export default EnVerificar;
