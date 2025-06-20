import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { FormularioContext } from '../Context/FormularioProvider';
import logoBase64 from '../../assets/img/logos/logo5.png'; // reemplaza con tu logo en base64
import { useEffect } from 'react';

const labelsTipoInstitucion = {
	id_institucion: 'ID',
	tipo_institucion: 'Tipo de institución',
	tipo_registro: 'Tipo de registro',
	rfc_institucion: 'RFC',
	razon_social: 'Nombre, Denominación o Razon Social',
	siglas_institucion: 'Sigles',
	tipo_servicio: 'Tipo de servicio que brinda la institución.',
	// agrega los campos que necesites
};

const CedulaPreRegistro = () => {
	const cat_tipo_registro = [
		{ id: 1, nombre: 'Matriz' },
		{ id: 2, nombre: 'Filial' },
	];
	const cat_tipo_Institución = [
		{ id: 1, nombre: 'Pública' },
		{ id: 2, nombre: 'Privada' },
	];
	const cat_tipo_servicio = [
		{ id: 1, nombre: 'DE ASITENCIA SOCIAL' },
		{ id: 2, nombre: 'DE ASITENCIA SOCIAL Y SALUD' },
	];

	const {
		FormTipoInstitucion,
		FormDomicilio,
		FormDatosLegales,
		FormRepresentanteLegal,
		FormDatosServicios,
		FormCoberturaGeo,
		FormAsistenciaSocial,
		FormServiciosSalud,
		FormRecursosHumanos,
		FormRecursosHumanosInfra,
		FormRecursosHumanosGobierno,
		FormDocumentacion,
	} = useContext(FormularioContext);
	const drawHeader = (doc, logoBase64) => {
		const image = new Image();
		image.src = logoBase64;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			logoBase64 = canvas.toDataURL('image/png');
		};
		doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // (x, y, width, height)
		doc.setFontSize(14);
		doc.setFont('helvetica', 'bold');
		doc.text('Directorio Nacional de Instituciones de Asistencia Social (DNIAS)', 50, 20);
		doc.setFontSize(12);
		doc.text('Cédula del registro', 50, 30);
		doc.setLineWidth(0.5);
		doc.line(10, 42, 200, 42); // línea divisoria
	};

	console.log('formInstitucion data', FormTipoInstitucion?.data);
	// Helper para convertir objeto a array de filas [campo, valor]
	const objectToRows = (obj = {}, labels = {}) => Object.entries(obj).map(([key, value]) => [labels[key] || key, value?.toString() ?? '']);

	const handleGeneratePDF = () => {
		const doc = new jsPDF();
		// reemplaza con tu logo en base64

		drawHeader(doc, logoBase64);
		const mapFieldFromCatalog = (obj, field, catalog) => {
			const match = catalog.find((item) => item.id === Number(obj[field]));
			return match ? match.nombre : 'Desconocido';
		};
		const formatearTipoInstitucion = (data) => ({
			...data,
			tipo_institucion: mapFieldFromCatalog(data, 'tipo_institucion', cat_tipo_Institución),
			tipo_registro: mapFieldFromCatalog(data, 'tipo_registro', cat_tipo_registro),
			tipo_servicio: mapFieldFromCatalog(data, 'tipo_servicio', cat_tipo_servicio),
		});
		const tipoInstitucionFormateado = formatearTipoInstitucion(FormTipoInstitucion?.data);
		const sections = [
			{ title: 'Tipo de Institución', data: tipoInstitucionFormateado, labels: labelsTipoInstitucion },
			{ title: 'Domicilio', data: FormDomicilio?.data },
			{ title: 'Datos Legales', data: FormDatosLegales?.data },
			{ title: 'Representante Legal', data: FormRepresentanteLegal?.data },
			{ title: 'Datos de Servicios', data: FormDatosServicios?.data },
			{ title: 'Cobertura Geográfica', data: FormCoberturaGeo?.data },
			{ title: 'Asistencia Social', data: FormAsistenciaSocial?.data },
			{ title: 'Servicios de Salud', data: FormServiciosSalud?.data },
			{ title: 'Recursos Humanos', data: FormRecursosHumanos?.data },
			{ title: 'Recursos Humanos Infraestructura', data: FormRecursosHumanosInfra?.data },
			{ title: 'Recursos Humanos Gobierno', data: FormRecursosHumanosGobierno?.data },
			{ title: 'Documentación', data: FormDocumentacion?.data },
		];

		let y = 50; // arrancamos debajo del encabezado
		sections.forEach((section, idx) => {
			if (!section.data) return;

			doc.setFontSize(14);
			doc.text(section.title, 10, y);
			y += 6;

			autoTable(doc, {
				startY: y,
				head: [['Campo', 'Valor']],
				body: objectToRows(section.data, section.labels),
				theme: 'grid',
				styles: { fontSize: 10 },
				headStyles: { fillColor: [97, 18, 50] },
				margin: { left: 10, right: 10 },
			});

			y = doc.lastAutoTable.finalY + 10;
			if (y > 250 && idx < sections.length - 1) {
				doc.addPage();
				y = 10;
			}
		});

		doc.save('CedulaPreRegistro.pdf');
	};

	useEffect(() => {
		handleGeneratePDF();
	}, []);

	return null;
};

export default CedulaPreRegistro;
