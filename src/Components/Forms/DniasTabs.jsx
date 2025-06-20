import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Button, Card, Typography } from '@mui/material';
import { lazy } from 'react';
import { Suspense } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UtilsContext } from '../Context/UtilsProvider.jsx';
import { FormularioContext } from '../Context/FormularioProvider.jsx';
import ServiciosSalud from './FormularioRegistro/ServiciosSalud.jsx';
import BotoneraUser from './FormularioRegistro/BotoneraUser.jsx';
import { Chip } from '@mui/material';
import CedulaPreRegistro from './CedulaPreRegistro.jsx';
const TipoInstitutcion = lazy(() => import('./FormularioRegistro/TipoInstitutcion'));
const DatosDomicilio = lazy(() => import('./FormularioRegistro/DatosDomicilio'));
const DatosLegales = lazy(() => import('./FormularioRegistro/DatosLegales.jsx'));
const ServiciosInstitucion = lazy(() => import('./FormularioRegistro/ServiciosInstitucion.jsx'));
const AsistenciaSocial = lazy(() => import('./FormularioRegistro/AsistenciaSocial.jsx'));
const RecursosHumanos = lazy(() => import('./FormularioRegistro/RecursosHumanos.jsx'));
const Documentacion = lazy(() => import('./FormularioRegistro/Documentacion.jsx'));

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const DniasTabs = () => {
	const {
		CargaTipoInstitucion,
		CargaDatosDomicilio,
		CargaDatosLegales,
		CargaServiciosInstitucion,
		CargaAsistenciaSocial,
		CargaRecursosHumanos,
		CargaDocumentacion,
		CargaServiciosSalud,
		IdInstitucion,
		setIdInstitucion,
		TipoInstitucion,
		TipoServicioInstitucion,
		FormTipoInstitucion,
		FormDomicilio,

		//setTipoServicioInstitucion,
	} = useContext(FormularioContext);
	const { FallBackIn, setOpenBackDrop } = useContext(UtilsContext);
	const [CreatePDF, setCreatePDF] = useState(false);

	const handleClick = () => {
		setOpenBackDrop(true);
		setCreatePDF(true);
		setTimeout(() => {
			setCreatePDF(false);
			setOpenBackDrop(false);
		}, 3000);
	};
	const [value, setValue] = useState(0);
	const [Showing, setShowing] = useState(0);

	const steps = [
		'Tipo de Institución y servicios brindados',
		'Datos de institución y domicilio social',
		'Datos legales',
		'Servicios de institución',
		'Asistencia social',
		'Servicios de Salud',
		'Recursos humanos, infraestructura, recursos económicos y donativos',
		'Documentación y responsable de llenado',
	];

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleNext = () => {
		setValue((prevValue) => {
			let nextValue = Math.min(prevValue + 1, steps.length - 1);

			// Si el siguiente valor es 5 y TipoInstitucion < 2, salta al siguiente
			if (nextValue === 5 && TipoInstitucion < 2) {
				nextValue = Math.min(nextValue + 1, steps.length - 1);
			}

			return nextValue;
		});
	};

	const handleBack = () => {
		setValue((prevValue) => Math.max(prevValue - 1, 0));
	};

	return (
		<Card sx={{ width: '100%' }} className="col-span-12 grid grid-cols-12">
			<Box className="col-span-12 p-4 bg-primary flex items-center justify-center-safe">
				<Typography variant="h5" className="!text-white !w-full !text-center pl-8">
					Datos del registro
				</Typography>
				
				<Chip
					size="small"
					label="imprimir avance"
					onClick={handleClick}
					className='!text-white !border-2 !border-white'
				/>
			</Box>

			<Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="p-4 !col-span-12 ">
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="!grid !grid-cols-1 !col-span-12" variant="fullWidth" sx={{ width: '100%' }}>
					{steps.map((e, i) => (
						<Tab
							key={i}
							className="!col-span-1 !max-w-1/7"
							wrapped
							label={e}
							{...a11yProps(i)}
							onClick={async () => {
								if (i == 0) {
									await CargaTipoInstitucion();
									setShowing(0);
								} else if (i == 1) {
									await CargaDatosDomicilio();
									setShowing(1);
								} else if (i == 2) {
									await CargaDatosLegales();
									setShowing(2);
								} else if (i == 3) {
									await CargaServiciosInstitucion();
									setShowing(3);
								} else if (i == 4) {
									await CargaAsistenciaSocial();
									setShowing(4);
								} else if (i == 5 && TipoInstitucion >= 2) {
									await CargaServiciosSalud();
									setShowing(5);
								} else if (i == 6) {
									await CargaRecursosHumanos();
									setShowing(6);
								} else if (i == 7) {
									await CargaDocumentacion();
									setShowing(7);
								}
							}}
							disabled={IdInstitucion == 0 && i > 0 ? true : false}
							hidden={i === 5 && TipoServicioInstitucion < 2 ? true : IdInstitucion == 0 && i > 0 ? true : false}
						/>
					))}
				</Tabs>
			</Box>
			<Suspense fallback={<FallBackIn />}>
				{steps.map((e, i) => (
					<CustomTabPanel className="col-span-12" value={value} index={i} key={i}>
						{Showing === 0 ? <TipoInstitutcion /> : null}
						{Showing === 1 ? <DatosDomicilio /> : null}
						{Showing === 2 ? <DatosLegales /> : null}
						{Showing === 3 ? <ServiciosInstitucion /> : null}
						{Showing === 4 ? <AsistenciaSocial /> : null}
						{Showing === 5 ? <ServiciosSalud /> : null}
						{Showing === 6 ? <RecursosHumanos /> : null}
						{Showing === 7 ? <Documentacion /> : null}
						<BotoneraUser value={value} handleBack={handleBack} steps={steps} IdInstitucion={IdInstitucion} handleNext={handleNext} />
					</CustomTabPanel>
				))}
			</Suspense>
			<Button
				onClick={() =>
					setIdInstitucion((prev) => {
						if (prev == 0) {
							return 1;
						} else {
							return 0;
						}
					})
				}
			>
				Change Institucion {IdInstitucion}
			</Button>

			{CreatePDF ? <CedulaPreRegistro /> : null}
		</Card>
	);
};

export default DniasTabs;
