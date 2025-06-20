import { Box, Chip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormularioContext } from '../../../Context/FormularioProvider';
import Options from '../../../ColumnsData/Options';
const EnCaptura = () => {
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
			name: 'constancia_por_vencer',
			label: 'Constancia por vencer',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '14%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'constancia_vencida',
			label: 'Constancia vencida',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '14%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'actualizacion_captura_anual',
			label: 'Actualización anual en captura',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '14%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'actualizacion_anual_rechazada',
			label: 'Actualización anual rechazada por enlace estatal',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '14%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'dictamen_anual_rechazado',
			label: 'Dictamen de actualización anual rechazado por enlace estatal',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '14%' } }),
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
				constancia_por_vencer: 30,
				constancia_vencida: 10,
				actualizacion_captura_anual: 5,
				actualizacion_anual_rechazada: 5,
				dictamen_anual_rechazado: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				constancia_por_vencer: 30,
				constancia_vencida: 10,
				actualizacion_captura_anual: 5,
				actualizacion_anual_rechazada: 5,
				dictamen_anual_rechazado: 5,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				constancia_por_vencer: 30,
				constancia_vencida: 10,
				actualizacion_captura_anual: 5,
				actualizacion_anual_rechazada: 5,
				dictamen_anual_rechazado: 5,
			},
		];

		data = data.map((e, i) => {
			e.constancia_por_vencer = <Chip variant="outlined" fullWidth key={i} label={e.constancia_por_vencer} className="cursor-auto" onClick={() => {}} />;
			e.constancia_vencida = <Chip variant="outlined" fullWidth key={i} label={e.constancia_vencida} className="cursor-auto" onClick={() => {}} />;
			e.actualizacion_captura_anual = <Chip variant="outlined" fullWidth key={i} label={e.actualizacion_captura_anual} className="cursor-auto" onClick={() => {}} />;
			e.actualizacion_anual_rechazada = <Chip variant="outlined" fullWidth key={i} label={e.actualizacion_anual_rechazada} className="cursor-auto" onClick={() => {}} />;
			e.dictamen_anual_rechazado = <Chip variant="outlined" fullWidth key={i} label={e.dictamen_anual_rechazado} className="cursor-auto" onClick={() => {}} />;
			return e;
		});
		setTableData(<MUIDataTable className="MUIDataTable" title="Pre-Registro en Captura" data={data} columns={columns} options={Options} />);
	};

	useEffect(() => {
		/* getList(); */
		listFake();
		return () => {
			//cleanup
		};
		// eslint-disable-next-line
	}, []);

	return <Box className="col-span-12  p-2 gap-4 text-left">{TableData}</Box>;
};

export default EnCaptura;
