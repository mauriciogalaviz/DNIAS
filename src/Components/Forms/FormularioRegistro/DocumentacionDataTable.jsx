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
import DocumentacionCargaArchivos from './DocumentacionCargaArchivos';

const DocumentacionDataTable = () => {
	const [TableData, setTableData] = useState([]);
	const { VerRegistro, EliminarRegistro } = useContext(FormularioContext);
	const { DialogData, setDialogData } = useContext(UtilsContext);
	const columns = [
		{
			name: 'archivo',
			label: 'Archivo',
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
								content: <DocumentacionCargaArchivos />,
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
			<MUIDataTable className="MUIDataTable" title="Documentos" data={TableData} columns={columns} options={options} />
		</Box>
	);
};

export default DocumentacionDataTable;
