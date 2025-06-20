import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';

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

const Cuestions5 = ({ formik }) => {
	const Data = [
		{ label: '¿La institución del inmueble donde la institución brinda sus servicios coincide con lo asentado en la cédula de registro?', id: 'c5_0' },
		
	];
	return (
		<Box className="col-span-12  grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-4 p-6">
			{Data.map((item, index) => (
				<Box className="col-span-12 grid grid-cols-12 gap-5" key={index}>
					<Box className="col-span-10 grid items-center text-left border-b-1 p-2">
						<Typography variant="subtitle2" className="!align-bottom">
							{item.label}
						</Typography>
					</Box>

					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} className="!col-span-2">
						<Typography>NO</Typography>
						<AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={formik.values[item.id]} onChange={formik.handleChange} name={item.id} />
						<Typography>SI</Typography>
					</Stack>
					<TextField
						fullWidth
						multiline
						rows={4}
						maxRows={6}
						label="Observaciones de infraestructura"
						name='observaciones_infraestructura'
						value={formik.values.observaciones_infraestructura}
						error={formik.touched.observaciones_infraestructura && Boolean(formik.errors.observaciones_infraestructura)}
						helperText={formik.touched.observaciones_infraestructura && formik.errors.observaciones_infraestructura}
						className='col-span-12 p-2'
					/>

				</Box>
			))}
		</Box>
	);
};

Cuestions5.propTypes = {
	formik: PropTypes.element.isRequired,
};

export default Cuestions5;
