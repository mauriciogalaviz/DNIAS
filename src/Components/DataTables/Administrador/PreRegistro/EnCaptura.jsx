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
	const columns = [
		{
			name: 'entidad',
			label: 'Entidad',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({
					style: {
						minWidth: '40%',
					},
				}),
			},
		},
		{
			name: 'captura',
			label: 'En Captura',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '20%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'registro_rechazado',
			label: 'Pre-registro rechazado por enlace estatal',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '20%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
		{
			name: 'dictamen_rechazado',
			label: 'Dictamen rechazado por enlace estatal',
			options: {
				filter: true,
				sort: true,
				setCellProps: () => ({ style: { textAlign: 'center', width: '20%' } }),
				customHeadRender: (columnMeta) => (
					<th key={columnMeta.index} style={{ textAlign: 'center' }}>
						{columnMeta.label}
					</th>
				),
			},
		},
	];
	const listFake = async () => {
		let data = [
			{
				entidad: 'VERACRUZ IGNACIO DE LA LLAVE',
				captura: 30,
				registro_rechazado: 10,
				dictamen_rechazado: 5,
			},
			{
				entidad: 'CHIHUAHUA',
				captura: 10,
				registro_rechazado: 40,
				dictamen_rechazado: 54,
			},
			{
				entidad: 'COLIMA',
				captura: 20,
				registro_rechazado: 25,
				dictamen_rechazado: 35,
			},
		];

		data = data.map((e, i) => {
			e.captura = <Chip variant="outlined" key={i} label={e.captura} className="cursor-auto" onClick={() => {}} />;
			e.registro_rechazado = <Chip variant="outlined" key={i} label={e.registro_rechazado} className="cursor-auto" onClick={() => {}} />;
			e.dictamen_rechazado = <Chip variant="outlined" key={i} label={e.dictamen_rechazado} className="cursor-auto" onClick={() => {}} />;
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Box className="col-span-12  p-2 gap-4 text-left">{TableData}</Box>;
};

export default EnCaptura;
