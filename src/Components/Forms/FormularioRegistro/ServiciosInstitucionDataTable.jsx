import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FormularioContext } from '../../Context/FormularioProvider';
import { DataContext } from '../../Context/DataProvider';
import MapIcon from '@mui/icons-material/Map';
import { Fragment } from 'react';
import { Add } from '@mui/icons-material';
import { UtilsContext } from '../../Context/UtilsProvider';
import ServiciosInstitucionCobertura from './ServiciosInstitucionCobertura';
const ServiciosInstitucionDataTable = () => {
	const [TableData, setTableData] = useState([]);
	const { VerRegistro, EliminarRegistro } = useContext(FormularioContext);
	const { headerList } = useContext(DataContext);
	const { DialogData, setDialogData } = useContext(UtilsContext);
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
			name: 'municipio',
			label: 'Municipio',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'opc',
			label: 'Opciones',
			options: {
				filter: true,
				sort: true,
			},
		},
	];
	const options = {
		filterType: 'checkbox',
		responsive: 'standard',
		serverSide: false,
		selectToolbar: true,
		selectableRows: 'none',
		download: false,
		print: false,
		viewColumns: false,
		filter: false,
		customToolbar: () => {
			return (
				<Tooltip title="Añadir Cobertura">
					<IconButton
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Agregar Cobertura',
								subtitle: 'Agregue una nueva cobertura geográfica.',
								content: <ServiciosInstitucionCobertura />,
							});
						}}
					>
						<Add />
					</IconButton>
				</Tooltip>
			);
		},
	};
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
				entidad: '',
				municipio: '',
			},
		];

		data = data.map((e, i) => {
			e.captura = <Chip variant="outlined" fullWidth key={i} label={e.captura} className="cursor-auto" onClick={() => {}} />;
			e.registro_rechazado = <Chip variant="outlined" fullWidth key={i} label={e.registro_rechazado} className="cursor-auto" onClick={() => {}} />;
			e.dictamen_rechazado = <Chip variant="outlined" fullWidth key={i} label={e.dictamen_rechazado} className="cursor-auto" onClick={() => {}} />;
			return e;
		});
		setTableData(data);
	};

	useEffect(() => {
		/* getList(); */
		listFake();
		return () => {
			//cleanup
		};
	}, []);

	return (
		<Box className="col-span-12  p-2 gap-4 text-left">
			<MUIDataTable className="MUIDataTable" title="Cobertura Geográfica" data={TableData} columns={columns} options={options} />
		</Box>
	);
};

export default ServiciosInstitucionDataTable;
