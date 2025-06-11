import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types'
import FormularioPoblacion from '../Forms/Poblacion/FormularioPoblacion';
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMax = ({ formik, formik1, setActiveForm }) => {
	const [open, setOpen] = React.useState(true);

	

	const handleClose = () => {
		setOpen(false);
		setActiveForm(false);
	};

	return (
		<React.Fragment>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Población del CAS: {formik1.values.denominacion} - {formik1.values.id}
						</Typography>
						{/* <Button autoFocus color="inherit" onClick={handleClose}>
							save
						</Button> */}
					</Toolbar>
				</AppBar>
				<Box className="pt-6">
					<FormularioPoblacion formik={formik} />
				</Box>
			</Dialog>
		</React.Fragment>
	);
};

DialogMax.propTypes = {
    formik: PropTypes.element.isRequired,
	formik1: PropTypes.element.isRequired,
	setActiveForm: PropTypes.func.isRequired,
}

export default DialogMax;
