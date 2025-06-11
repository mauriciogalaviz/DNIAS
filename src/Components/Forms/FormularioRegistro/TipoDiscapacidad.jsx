import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

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

const TipoDiscapacidad = ({ formik }) => {
	const Data = [
		{ label: 'Motriz', id: 'discapacidad_motriz' },
		{ label: 'Visual', id: 'discapacidad_visual' },
		{ label: 'Auditiva', id: 'discapacidad_auditiva' },
		{ label: 'Intelectual', id: 'discapacidad_intelectual' },
		{ label: 'Psicosocial', id: 'discapacidad_psicosocial' },
		{ label: 'Neurodiversa', id: 'discapacidad_neurodiversa' },
		{ label: 'Multiple', id: 'discapacidad_multiple' },
	];
	return (
		<Box className="col-span-12  grid grid-cols-12 md:grid-cols-4 lg:grid-cols-7 gap-4 p-6">
			{Data.map((item, index) => (
				<FormGroup className="col-span-7 md:col-span-1 lg:col-span-1" key={index}>
					<Typography variant="subtitle2" className="text-left">
						{item.label}
					</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography>NO</Typography>
						<AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={formik.values[item.id]} onChange={formik.handleChange} name={item.id} />
						<Typography>SI</Typography>
					</Stack>
				</FormGroup>
			))}
		</Box>
	);
};

TipoDiscapacidad.propTypes = {
	formik: PropTypes.element.isRequired,
};

export default TipoDiscapacidad;
