import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Typography } from '@mui/material';

const steps = ['Tipo de Institución y servicios brindados', 'Datos de institución y domicilio social', 'Datos legales', 'Servicios de institución', 'Asistencia social', 'Recursos humanos, infraestructura, recursos económicos y donativos', 'Documentación y responsable de llenado'];

const DniasForm = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	return (
		<Box sx={{ width: '100%' }} className="col-span-12 grid grid-cols-12 bg-white p-4">
			<Typography className="col-span-12"></Typography>
			<Stepper activeStep={activeStep} alternativeLabel className="col-span-12">
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length ? (
				<Box className='col-span-12'>
					<Typography sx={{ mt: 2, mb: 1 }}>Todos los puntos estan completos -  clic en Enviar</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Enviar</Button>
					</Box>
				</Box>
			) : (
				<Box className='col-span-12'>
					<Typography sx={{ mt: 2, mb: 1 }}>Paso {activeStep + 1}</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
							Regresar
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />
						{isStepOptional(activeStep) && (
							<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
								Omitir
							</Button>
						)}
						<Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}</Button>
					</Box>
				</Box>
			)}
			
		</Box>
	);
}

export default DniasForm;
