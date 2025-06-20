import { Box, Chip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormularioContext } from '../../../Context/FormularioProvider';
import Options from '../../../ColumnsData/Options';
import { Edit, HighlightOff, Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { LoginContext } from '../../../Context/LoginProvider';
const Tablero = () => {
	const [TableData, setTableData] = useState([]);
	const { VerRegistro, EliminarRegistro } = useContext(FormularioContext);
	const { UserLogIn } = useContext(LoginContext);
	/* const { headerList } = useContext(DataContext); */
	const columns = [
		{
			name: 'folio',
			label: 'Folio',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'modulo',
			label: 'Módulo',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'institucion',
			label: 'Institución',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'tipo',
			label: 'Tipo',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'servicios',
			label: 'Servicios',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'entidad',
			label: 'Entidad',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'estatus',
			label: 'Estatus',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: 'folio',
			label: 'Opciones',
			options: {
				filter: false,
				sort: false,
				print: false,
				customBodyRender: (value, tableMeta) => {
					const id = tableMeta.rowData[0]; // Asumiendo que 'id' está en la primera columna
					const nombre = tableMeta.rowData[1]; // Asumiendo que 'nombre' está en la segunda columna
					const activo = tableMeta.rowData[2]; // Asumiendo que 'activo' está en la tercera columna
					return (
						<Box className="col-span-12 grid grid-cols-3 gap-3 p-2">
							<IconButton onClick={() => Centro_Ver(id, nombre, activo, 0)}>
								<Visibility />
							</IconButton>
							<IconButton onClick={() => Centro_Ver(id, nombre, activo, 1)}>
								<Edit />
							</IconButton>
							<IconButton onClick={() => Centro_Inactivate(id, nombre, activo)}>
								<HighlightOff />
							</IconButton>
							{UserLogIn.tipo_usuario == 2
								? ((
										<IconButton onClick={() => Centro_Ver(id, nombre, activo, 0)}>
											<Accep />
										</IconButton>
								  ),
								  (
										<IconButton onClick={() => Centro_Ver(id, nombre, activo, 1)}>
											<Edit />
										</IconButton>
								  ))
								: null}
						</Box>
					);
				},
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
				folio: '123456',
				modulo: 'Modulo 1',
				institucion: 'Institución 1',
				tipo: 'Tipo 1',
				servicios: 'Servicios 1',
				entidad: 'AGUASCALIENTES',
				estatus: 'En revisión',
			},
			{
				folio: '123457',
				modulo: 'Modulo 2',
				institucion: 'Institución 2',
				tipo: 'Tipo 2',
				servicios: 'Servicios 2',
				entidad: 'CHIHIUAHUA',
				estatus: 'En revisión',
			},
			{
				folio: '123458',
				modulo: 'Modulo 3',
				institucion: 'Institución 3',
				tipo: 'Tipo 3',
				servicios: 'Servicios 3',
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				estatus: 'En revisión',
			},
		];

		data = data.map((e, i) => {
			e.captura = <Chip variant="outlined" fullWidth key={i} label={e.captura} className="cursor-auto" onClick={() => {}} />;
			e.registro_rechazado = <Chip variant="outlined" fullWidth key={i} label={e.registro_rechazado} className="cursor-auto" onClick={() => {}} />;
			e.dictamen_rechazado = <Chip variant="outlined" fullWidth key={i} label={e.dictamen_rechazado} className="cursor-auto" onClick={() => {}} />;
			return e;
		});
		setTableData(<MUIDataTable className="MUIDataTable" title="Solicitudes por revisar" data={data} columns={columns} options={Options} />);
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

export default Tablero;
