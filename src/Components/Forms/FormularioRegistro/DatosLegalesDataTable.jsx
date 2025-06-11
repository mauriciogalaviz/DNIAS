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
import DatosLegalesRep from './DatosLegalesRep';
import { UtilsContext } from '../../Context/UtilsProvider';
const DatosLegalesDataTable = () => {
	const [TableData, setTableData] = useState([]);
	const { VerRegistro, EliminarRegistro } = useContext(FormularioContext);
	const { DialogData, setDialogData } = useContext(UtilsContext);
	/* const { headerList } = useContext(DataContext); */
	const columns = [
		{
			name: 'nombre_responsable',
			label: 'Nombre',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'pa_responsable',
			label: 'Primer Apellido',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'sa_responsable',
			label: 'Segundo Apellido',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'telefono1_responsable',
			label: 'Teléfono',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'telefono2_responsable',
			label: 'Teléfono 2',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'celular_responsable',
			label: 'Celular',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'identificacion',
			label: 'Se identifica con...',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'folio_responsable',
			label: 'Folio',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'fecha_expedicion_responsable',
			label: 'Fecha de expedición',
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
				<Tooltip title="Añadir Representante Legal">
					<IconButton
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Agregar Representante Legal',
								subtitle: 'Agregue un nuevo representante legal',
								content: <DatosLegalesRep />,
							});
						}}
						disabled={false}
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
				nombre: '',
				pa: '',
				sa: '',
				telefono1: '',
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
			<MUIDataTable className="MUIDataTable" title="Representantes Legales" data={TableData} columns={columns} options={options} />
		</Box>
	);
};

export default DatosLegalesDataTable;
