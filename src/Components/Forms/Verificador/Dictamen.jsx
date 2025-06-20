import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cuestions1 from './Cuestions1';
import { FormLabel } from '@mui/material';
import Cuestions2 from './Cuestions2';
import Cuestions3 from './Cuestions3';
import Cuestions4 from './Cuestions4';
import Cuestions5 from './Cuestions5';
import { Card } from '@mui/material';
import { useContext } from 'react';
import { FormularioContext } from '../../Context/FormularioProvider';
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 15,
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(9px)',
		},
	},
	'& .MuiSwitch-switchBase': {
		padding: 2,
		'&.Mui-checked': {
			transform: 'translateX(12px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: '#1890ff',
				...theme.applyStyles('dark', {
					backgroundColor: '#177ddc',
				}),
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: 'rgba(0,0,0,.25)',
		boxSizing: 'border-box',
		...theme.applyStyles('dark', {
			backgroundColor: 'rgba(255,255,255,.35)',
		}),
	},
}));
const Dictamen = () => {
	const { FormularioDictamen } = useContext(FormularioContext);
	const formRef = useRef();
	const formik = useFormik({
		initialValues: FormularioDictamen.data,
		validationSchema: Yup.object({
			id_institucion: Yup.string().required(),
			id_enlace: Yup.number().required(),
			id_verificador: Yup.number().notRequired(),
			fecha_verificacion: Yup.date().required('Este campo es obligatorio'),
			c1_0: Yup.boolean().notRequired(),
			c1_1: Yup.boolean().notRequired(),
			c1_2: Yup.boolean().notRequired(),
			c1_3: Yup.boolean().notRequired(),
			c1_4: Yup.boolean().notRequired(),
			c1_5: Yup.boolean().notRequired(),
			c1_6: Yup.boolean().notRequired(),
			c2_0: Yup.boolean().notRequired(),
			c2_1: Yup.boolean().notRequired(),
			c2_2: Yup.boolean().notRequired(),
			c2_3: Yup.boolean().notRequired(),
			c2_4: Yup.boolean().notRequired(),
			c2_5: Yup.boolean().notRequired(),
			c2_6: Yup.boolean().notRequired(),
			c3_0: Yup.boolean().notRequired(),
			c4_0: Yup.boolean().notRequired(),
			c5_0: Yup.boolean().notRequired(),
			observaciones_infraestructura: Yup.string().notRequired(),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
			} catch (error) {
				console.error(error);
			}
		},
	});
	const exportPDF = () => {
		const input = formRef.current;
		const chip = document.querySelector('.hide-during-export');

		// Aplicar estilos temporales
		chip.classList.add('!hidden');
		const originalStyle = input.getAttribute('style');
		input.style.padding = '20px';
		input.style.lineHeight = '1.6';
		input.style.boxSizing = 'border-box';

		// Añadir clase para forzar font-size con Tailwind
		input.classList.add('text-[18px]');

		document.fonts.ready.then(() => {
			requestAnimationFrame(() => {
				html2canvas(input, { useCORS: true, scale: 2, allowTaint: false }).then((canvas) => {
					const pdf = new jsPDF('p', 'mm', 'a4');
					const pageWidth = pdf.internal.pageSize.getWidth();
					const pageHeight = pdf.internal.pageSize.getHeight();
					const margin = 10;
					const usableWidth = pageWidth - margin * 2;
					const usableHeight = pageHeight - margin * 2;

					const pxPerMm = 15500 / input.offsetWidth;
					const pageHeightPx = usableHeight * pxPerMm;

					let positionY = 0;
					let pageCount = 0;

					while (positionY < canvas.height) {
						const pageCanvas = document.createElement('canvas');
						pageCanvas.width = canvas.width;
						pageCanvas.height = Math.min(pageHeightPx, canvas.height - positionY);

						const ctx = pageCanvas.getContext('2d');
						ctx.drawImage(canvas, 0, positionY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);

						const imgData = pageCanvas.toDataURL('image/png');
						if (pageCount > 0) pdf.addPage();
						pdf.addImage(imgData, 'PNG', margin, margin, usableWidth, pageCanvas.height / pxPerMm);

						positionY += pageCanvas.height;
						pageCount++;
					}

					pdf.save('formulario.pdf');

					// Restaurar estilos
					chip.classList.remove('!hidden');
					input.classList.remove('text-[18px]');
					input.setAttribute('style', originalStyle || '');
				});
			});
		});
	};
	  
	return (
		<Card className="col-span-12 grid grid-cols-12 gap-1 pt-4" ref={formRef}>
			<Typography variant="h4" className="col-span-12">
				Dictamen
			</Typography>
			<Chip
				label="Imprimir"
				className="col-span-12 hide-during-export "
				onClick={() => {
					exportPDF();
				}}
			/>
			<form onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="col-span-12 p-4 grid grid-cols-12 gap-4">
				<FormLabel className="col-span-12">Datos del centro</FormLabel>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography className="col-span-12 text-left">Tipo de registro</Typography>
					<Typography className="col-span-12 text-left">{''}</Typography>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography className="col-span-12 text-left">Tipo Institución</Typography>
					<Typography className="col-span-12 text-left p-2">{''}</Typography>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography className="col-span-12 text-left">RFC</Typography>
					<Typography className="col-span-12 text-left p-2">{''}</Typography>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography className="col-span-12 text-left">Nombre, denominación o razón social</Typography>
					<Typography className="col-span-12 text-left p-2">{''}</Typography>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
					<Typography className="col-span-12 text-left">Tipo de servicios que brinda la institución</Typography>
					<Typography className="col-span-12 text-left p-2">{''}</Typography>
				</Box>
				<Divider className="col-span-12" />
				<Box className="col-span-12 grid grid-cols-12 gap-4 p-2">
					<TextField
						type="date"
						fullWidth
						className="col-span-12"
						label="Fecha de Verificación"
						name="fecha_verificacion"
						value={formik.values.fecha_verificacion}
						error={formik.touched.fecha_verificacion && Boolean(formik.errors.fecha_verificacion)}
						helperText={formik.touched.fecha_verificacion && formik.errors.fecha_verificacion}
						InputLabelProps={{ shrink: true }}
					/>
				</Box>
				<Box className="col-span-12 grid grid-cols-12 gap-4 p-2">
					<FormLabel className="col-span-12">Datos de la institución verificada</FormLabel>
					<Cuestions1 formik={formik} />
					<FormLabel className="col-span-12">Documentación presentada en la visita de verificación</FormLabel>
					<Cuestions2 formik={formik} />
					<FormLabel className="col-span-12">Población objetivo de la institución</FormLabel>
					<Cuestions3 formik={formik} />
					<FormLabel className="col-span-12">Servicios de asistencia social</FormLabel>
					<Cuestions4 formik={formik} />
					<FormLabel className="col-span-12">Infraestructura de la institución</FormLabel>
					<Cuestions5 formik={formik} />
					<Divider className="col-span-12" />
					<FormLabel className="col-span-12">Datos del Verificador</FormLabel>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography variant="body1" className="col-span-12  text-left">
							Nombre del verificador
						</Typography>
						<Typography className="col-span-12 text-left">{'Nombre del verificador'}</Typography>
					</Box>
					{/* <Box className="col-span-12 grid grid-cols-12">
						<TextField
							select
							fullWidth
							className="col-span-12"
							label="¿Comó se identificará en la verificación?"
							name="verificador_identificacion"
							value={formik.values.verificador_identificacion}
							error={formik.touched.verificador_identificacion && Boolean(formik.errors.verificador_identificacion)}
							helperText={formik.touched.verificador_identificacion && formik.errors.verificador_identificacion}
						>
							<MenuItem value={1}>Credencial de elector</MenuItem>
							<MenuItem value={2}>Pasaporte</MenuItem>
							<MenuItem value={3}>Cédula profesional</MenuItem>
							<MenuItem value={4}>Credencial de empleado</MenuItem>
							<MenuItem value={5}>Licencia de conducir</MenuItem>
						</TextField>
					</Box> */}
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">¿Comó se identificará en la verificación?</Typography>
						<Typography className="col-span-12 text-left p-2">{formik.values.verificador_identificacion}</Typography>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">Número de folio</Typography>
						<Typography className="col-span-12 text-left p-2">{''}</Typography>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">Expedida por</Typography>
						<Typography className="col-span-12 text-left p-2">{''}</Typography>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">Teléfono</Typography>
						<Typography className="col-span-12 text-left p-2">{''}</Typography>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">Correo Electrónico</Typography>
						<Typography className="col-span-12 text-left p-2">{''}</Typography>
					</Box>
					<Box className="col-span-12 grid grid-cols-12 md:col-span-4 gap-2">
						<Typography className="col-span-12 text-left">Domicilio del centro de trabajo</Typography>
						<Typography className="col-span-12 text-left p-2">{''}</Typography>
					</Box>
					<Divider className="col-span-12" />
					<FormLabel className="col-span-12">Resultado de la verificación</FormLabel>
					<Box className="col-span-12 grid grid-cols-12">
						<TextField
							select
							fullWidth
							className="col-span-12"
							label="Instancia responsable de la verificación"
							name="resultado_verificacion_instancia"
							value={formik.values.resultado_verificacion_instancia}
							error={formik.touched.resultado_verificacion_instancia && Boolean(formik.errors.resultado_verificacion_instancia)}
							helperText={formik.touched.resultado_verificacion_instancia && formik.errors.resultado_verificacion_instancia}
						>
							<MenuItem value={1}>Credencial de elector</MenuItem>
							<MenuItem value={2}>Pasaporte</MenuItem>
							<MenuItem value={3}>Cédula profesional</MenuItem>
							<MenuItem value={4}>Credencial de empleado</MenuItem>
							<MenuItem value={5}>Licencia de conducir</MenuItem>
						</TextField>
					</Box>
					<Box className="col-span-12 grid grid-cols-12">
						<Box className="col-span-12 grid grid-cols-12 gap-2" key={0}>
							<Box className="col-span-10 grid items-center text-left border-b-1 p-2">
								<Typography variant="subtitle2" className="!align-bottom">
									¿Se encontraron irregularidades?
								</Typography>
							</Box>

							<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} className="!col-span-2">
								<Typography>NO</Typography>
								<AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={formik.values.verificacion_irregularidades} onChange={formik.handleChange} name={0} />
								<Typography>SI</Typography>
							</Stack>
						</Box>
					</Box>
					<Box className="col-span-12 grid grid-cols-12">
						<TextField
							fullWidth
							multiline
							rows={4}
							maxRows={6}
							className="col-span-12 p-2"
							label="Observaciones"
							name="verificacion_observaciones"
							value={formik.values.verificacion_observaciones}
							error={formik.touched.verificacion_observaciones && Boolean(formik.errors.verificacion_observaciones)}
							helperText={formik.touched.verificacion_observacionesacion_observaciones}
						/>
					</Box>
					<FormLabel className="col-span-12">Datos de Enlace Estatal</FormLabel>
				</Box>
			</form>
		</Card>
	);
};

export default Dictamen;
