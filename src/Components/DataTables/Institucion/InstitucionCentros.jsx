import { Add, Edit, HighlightOff, Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { Tooltip } from '@mui/material';
import { Box } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { Fragment } from 'react';
import * as XLSX from 'xlsx';
import { useContext } from 'react';
import { FormularioContext } from '../../Context/FormularioProvider';

const InstitucionCentros = () => {
	const {Centro_Ver, Centro_Inactivate} = useContext(FormularioContext)
	const columns = [
		{
			label: 'ID',
			name: 'id_institucion',
			sortable: true,
		},
		{
			label: 'Estatus',
			name: 'estatus',
			sortable: true,
		},
		{
			label: 'Razón Social',
			name: 'razon_social',
			sortable: true,
		},
		{
			label: 'Tipo Registro',
			name: 'tipo_registro',
			sortable: true,
		},
		{
			label: 'Tipo Institución',
			name: 'tipo_institucion',
			sortable: true,
		},
		{
			label: 'Entidad',
			name: 'entidad',
			sortable: true,
		},
		{
			label: 'Opciones',
			name: 'id_institucion',
			sortable: false,
			options: {
				filter: false,
				sort: false,
				Download: false,
				print: false, // Evita que se imprima esta columna
				customBodyRender: (value, tableMeta) => {
					//const rowIndex = tableMeta.rowIndex;
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
						</Box>
					);
				},
			},
		},
	];
	const options = {
		filterType: 'checkbox',
		responsive: 'standard',
		serverSide: false,
		selectToolbar: true,
		selectableRows: 'none',
		downloadOptions: {
			filename: 'Sistema Registro de Donativos-.xlsx',
			separator: ';',
		},
		onDownload: (buildHead, buildBody, columns, data) => {
			const wb = XLSX.utils.book_new();

			// Función auxiliar para obtener el valor de la celda
			const getCellValue = (cellContent) => {
				if (typeof cellContent === 'object' && cellContent.props && cellContent.props.label) {
					// Si es un Chip, extrae el texto del label
					return cellContent.props.label;
				}
				// Si no es un Chip, devuelve el valor directamente
				return cellContent || '';
			};

			// Construye los datos de la tabla incluyendo todas las columnas
			const rows = data.map((row) => {
				const rowData = {};
				columns.forEach((column, index) => {
					const cellContent = row.data[index];
					rowData[column.label] = getCellValue(cellContent); // Usa la función auxiliar
				});
				return rowData;
			});
			// Crea la hoja de cálculo con los datos procesados
			const ws = XLSX.utils.json_to_sheet(rows);
			XLSX.utils.book_append_sheet(wb, ws, 'DNIAS-Centros-Institucion');
			XLSX.writeFile(wb, `DNIAS-Centros-Institucion-${new Date().toISOString().split('T')[0]}.xlsx`);
			return false; // Evita el comportamiento predeterminado
		},
		print: false,
		textLabels: {
			body: {
				noMatch: 'No se encontraron resultados',
				toolTip: 'Ordenar',
				columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
			},
			pagination: {
				next: 'Siguiente Página',
				previous: 'Página Anterior',
				rowsPerPage: 'Filas por página:',
				displayRows: 'de',
			},
			toolbar: {
				search: 'Buscar',
				downloadCsv: 'Descargar archivo XLSX',
				print: 'Imprimir',
				viewColumns: 'Ver Columnas',
				filterTable: 'Filtrar Tabla',
			},
			filter: {
				all: 'Todos',
				title: 'FILTROS',
				reset: 'REINICIAR',
			},
			selectedRows: {
				text: 'fila(s) seleccionada(s)',
				delete: 'Borrar',
				deleteAria: 'Borrar la(s) fila(s) seleccionada(s)',
			},
			viewColumns: {
				title: 'Mostrar Columnas',
				titleAria: 'Mostrar/Ocultar Columnas',
			},
			filterTable: {
				all: 'Todos',
				title: 'FILTROS',
				reset: 'REINICIAR',
			},
		},
		customToolbar: () => {
			return (
				<Fragment>
					<Tooltip title="Imprimir">
						<IconButton
							onClick={() => {
								const tableElement = document.querySelector('.MUIDataTable table');
								if (tableElement) {
									const iframe = document.createElement('iframe');
									iframe.style.position = 'absolute';
									iframe.style.width = '0';
									iframe.style.height = '0';
									iframe.style.border = 'none';
									document.body.appendChild(iframe);

									const iframeDoc = iframe.contentWindow || iframe.contentDocument;
									iframeDoc.document.open();
									iframeDoc.document.write('<html><head><title>Imprimir Tabla</title></head><body>');
									iframeDoc.document.write('<style>table { width: 100%; border-collapse: collapse; } table, th, td { border: 1px solid black; }</style>');
									iframeDoc.document.write(tableElement.outerHTML);
									iframeDoc.document.write('</body></html>');
									iframeDoc.document.close();

									iframeDoc.focus();
									iframeDoc.print();

									// Elimina el iframe después de imprimir
									iframeDoc.onafterprint = () => {
										document.body.removeChild(iframe);
									};
								}
							}}
						>
							<PrintIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Agregar Nuevo">
						<IconButton
							onClick={() => {
								/* setActiveFormCatCentros(true); */
							}}
						>
							<Add />
						</IconButton>
					</Tooltip>
				</Fragment>
			);
		},
	};

  return (
	<Box className="col-span-12 grid grid-cols-12 gap-4 p-2">
		<MUIDataTable columns={columns} options={options} data={[]} className='col-span-12' />
	</Box>
  )
}

export default InstitucionCentros