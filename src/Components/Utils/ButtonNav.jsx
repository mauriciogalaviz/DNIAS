import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';

const ButtonNav = ({ setActiveForm }) => {
	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<Fab color="primary" aria-label="add" onClick={() => setActiveForm(true)}>
				<AddIcon />
			</Fab>
		</Box>
	);
};

ButtonNav.propTypes = {
    setActiveForm: PropTypes.func.isRequired,
};

export default ButtonNav;
