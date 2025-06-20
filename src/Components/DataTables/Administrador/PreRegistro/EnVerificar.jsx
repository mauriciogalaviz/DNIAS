import { Box, Button, Chip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormularioContext } from '../../../Context/FormularioProvider';
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
				setCellProps: () => ({
					style: {
						minWidth: '35%',
					},
				}),
			},
		},
		{
			name: 'revision_verificador',
			label: 'En Por Revisión Verificador',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '15%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'verificar',
			label: 'Por Verificar',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '15%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'nueva_verificacion',
			label: 'Nueva verificación',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '15%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'verificado',
			label: 'Verificado',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '15%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
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
				revision_verificador: 30,
				verificar: 10,
				nueva_verificacion: 5,
				verificado: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				revision_verificador: 30,
				verificar: 10,
				nueva_verificacion: 5,
				verificado: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				revision_verificador: 30,
				verificar: 10,
				nueva_verificacion: 5,
				verificado: 5,
			},
		];

		data = data.map((e, i) => {
			e.revision_verificador = <Chip variant="outlined" fullWidth key={i} label={e.revision_verificador} className="cursor-auto" onClick={() => {}} />;
			e.verificar = <Chip variant="outlined" fullWidth key={i} label={e.verificar} className="cursor-auto" onClick={() => {}} />;
			e.nueva_verificacion = <Chip variant="outlined" fullWidth key={i} label={e.nueva_verificacion} className="cursor-auto" onClick={() => {}} />;
			e.verificado = <Chip variant="outlined" fullWidth key={i} label={e.verificado} className="cursor-auto" onClick={() => {}} />;

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
		// eslint-disable-next-line
	}, []);

	return <Box className="col-span-12  p-2 gap-4 text-left">{TableData}</Box>;
};

export default EnVerificar;
