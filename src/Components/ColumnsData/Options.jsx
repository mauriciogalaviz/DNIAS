import * as XLSX from 'xlsx';
import PrintIcon from '@mui/icons-material/Print';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';

const catalogo = [
	// Preregristro
	'Entidad',
	'En Captura',
	'Pre-registro rechazado por enlace estatal',
	'Dictamen rechazado por enlace estatal',
	'Enviado',
	'Rechazado por verificador',
	'Rechazado por administrador',
	'En Por Revisión Verificador',
	'Por Verificar',
	'Nueva verificación',
	'Verificado',
	'Por revisión administrador sin verificación',
	'Por revisión administrador con verificación',
	'Organizaciones de la sociedad civil sin perfil',
	'Constancia emitida',
	// Actualización Anual
	'Constancia por vencer',
	'Constancia vencida',
	'Actualización anual en captura',
	'Actualización anual rechazada por enlace estatal',
	'rechazada por enlace estatal',
	'Dictamen de actualización anual rechazado por enlace estatal',
	'Actualización Anual',
	'Actualización Anual por Verificar',
	'por Verificar',
	'Nueva verificación para actualización anual',
	'para actualización anual',
	'Actualización Anual Verificada',
	'Por revisión administrador sin verificación',
	'Por revisión administrador con verificación',
	'Organizaciones de la sociedad civil sin perfil',
	//Tablero Admin
	'Folio',
	'Módulo',
	'Institución',
	'Tipo',
	'Servicios',
	'Estatus',
	'Opciones',
];

const Options = {
	filterType: 'checkbox',
	responsive: 'standard',
	serverSide: false,
	selectToolbar: true,
	selectableRows: 'none',
	downloadOptions: {
		filename: 'DNIAS-.xlsx',
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
		XLSX.utils.book_append_sheet(wb, ws, 'DNIAS');
		XLSX.writeFile(wb, 'DNIAS-.xlsx');

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
			<Tooltip title="Imprimir">
				<IconButton
					onClick={() => {
						const tableElement = document.querySelector('.MUIDataTable table');
						if (tableElement) {
							const headers = Array.from(tableElement.querySelectorAll('thead th')).map((th) => th.textContent);
							const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map((tr) =>
								Array.from(tr.querySelectorAll('td')).map((td) => {
									let cellText = td.textContent.trim();

									// Verifica si el contenido de la celda es un Chip y extrae su label
									const chipElement = td.querySelector('.MuiChip-label');
									if (chipElement) {
										cellText = chipElement.textContent.trim();
									}

									// Si no hay Chip, utiliza el texto de la celda directamente
									if (!cellText) {
										cellText = td.textContent.trim();
									}

									// Elimina cualquier texto que coincida con los valores en la constante catalogo
									catalogo.forEach((item) => {
										const regex = new RegExp(`^${item}\\s*`, 'i'); // Busca el texto al inicio de la celda
										cellText = cellText.replace(regex, '');
									});
									return cellText;
								})
							);

							const iframe = document.createElement('iframe');
							iframe.style.position = 'absolute';
							iframe.style.width = '0';
							iframe.style.height = '0';
							iframe.style.border = 'none';
							document.body.appendChild(iframe);

							const iframeDoc = iframe.contentWindow || iframe.contentDocument;
							iframeDoc.document.open();
							iframeDoc.document.write('<html><head><title>Imprimir Tabla</title></head><body>');
							iframeDoc.document.write(
								'<style>table { width: 100%; border-collapse: collapse; } table, th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>'
							);
							iframeDoc.document.write('<table>');
							iframeDoc.document.write('<thead><tr>');
							headers.forEach((header) => {
								iframeDoc.document.write(`<th>${header}</th>`);
							});
							iframeDoc.document.write('</tr></thead>');
							iframeDoc.document.write('<tbody>');
							rows.forEach((row) => {
								iframeDoc.document.write('<tr>');
								row.forEach((cell) => {
									iframeDoc.document.write(`<td>${cell}</td>`);
								});
								iframeDoc.document.write('</tr>');
							});
							iframeDoc.document.write('</tbody>');
							iframeDoc.document.write('</table>');
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
		);
	},
};

export default Options;