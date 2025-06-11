import * as React from 'react';
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
		//setTipoServicioInstitucion,
	} = useContext(FormularioContext);
	const { FallBackIn } = useContext(UtilsContext);
	const [value, setValue] = useState(0);

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
			<Typography variant="h5" className="col-span-12 py-4 bg-primary !text-white">
				Datos del registro
			</Typography>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="p-4 !col-span-12 ">
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="!grid !grid-cols-1 !col-span-12" variant="fullWidth" sx={{ width: '100%' }}>
					{steps.map((e, i) => (
						<Tab
							key={i}
							className="!col-span-1 !max-w-1/7"
							wrapped
							label={e}
							{...a11yProps(i)}
							onClick={() => {
								if (i == 0) {
									CargaTipoInstitucion();
								} else if (i == 1) {
									CargaDatosDomicilio();
								} else if (i == 2) {
									CargaDatosLegales();
								} else if (i == 3) {
									CargaServiciosInstitucion();
								} else if (i == 4) {
									CargaAsistenciaSocial();
								} else if (i == 5 && TipoInstitucion >= 2) {
									CargaServiciosSalud();
								} else if (i == 6) {
									CargaRecursosHumanos();
								} else if (i == 7) {
									CargaDocumentacion();
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
						{i === 0 ? <TipoInstitutcion /> : null}
						{i === 1 ? <DatosDomicilio /> : null}
						{i === 2 ? <DatosLegales /> : null}
						{i === 3 ? <ServiciosInstitucion /> : null}
						{i === 4 ? <AsistenciaSocial /> : null}
						{i === 5 ? <ServiciosSalud /> : null}
						{i === 6 ? <RecursosHumanos /> : null}
						{i === 7 ? <Documentacion /> : null}

						<Box className="col-span-12 p-4 flex justify-end gap-4">
							{value !== 0 ? (
								<Button disabled={value === 0} onClick={handleBack} className="!bg-primary !text-white dark:!text-inherit">
									Regresar
								</Button>
							) : null}
							{IdInstitucion != 0 ? (
								<Button variant="contained" className="!bg-primary !text-white dark:!text-inherit" onClick={handleNext}>
									{value === steps.length - 1 ? 'Enviar' : 'Siguiente'}
								</Button>
							) : null}
						</Box>
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
		</Card>
	);
};

export default DniasTabs;
