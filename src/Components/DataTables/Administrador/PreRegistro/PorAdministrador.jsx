import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Options from "../../../ColumnsData/Options"
import { FormularioContext } from '../../../Context/FormularioProvider';
const PorAdministrador = () => {
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
			name: 'sin_verificacion',
			label: 'Por revisión administrador sin verificación	',
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
			name: 'con_verificacion',
			label: 'Por revisión administrador con verificación',
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
			name: 'sin_perfil',
			label: 'Organizaciones de la sociedad civil sin perfil',
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
			name: 'constancia',
			label: 'Constancia Emitida',
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
				sin_verificacion: 1,
				con_verificacion: 1,
				sin_perfil: 5,
				constancia: 50,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				sin_verificacion: 1,
				con_verificacion: 1,
				sin_perfil: 5,
				constancia: 50,
			},
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				sin_verificacion: 1,
				con_verificacion: 1,
				sin_perfil: 5,
				constancia: 50,
			},
		];

		data = data.map((e, i) => {
			e.sin_verificacion = <Chip variant="outlined" fullWidth key={i} label={e.sin_verificacion} className="cursor-auto" onClick={() => {}} />;
			e.con_verificacion = <Chip variant="outlined" fullWidth key={i} label={e.con_verificacion} className="cursor-auto" onClick={() => {}} />;
			e.sin_perfil = <Chip variant="outlined" fullWidth key={i} label={e.sin_perfil} className="cursor-auto" onClick={() => {}} />;
			e.constancia = <Chip variant="outlined" fullWidth key={i} label={e.constancia} className="cursor-auto" onClick={() => {}} />;
			return e;
		});
		setTableData(<MUIDataTable className="MUIDataTable" title="Pre-Registro en Revisión Enlace Estatal" data={data} columns={columns} options={Options} />);
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

export default PorAdministrador;
