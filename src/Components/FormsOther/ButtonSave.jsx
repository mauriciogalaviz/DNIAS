import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PropTypes from 'prop-types'
import { DataContext } from '../Context/DataProvider';
export default function ButtonSave({ submit  }) {
	const { successCharge, setSuccessCharge, loading, setLoading, success, setSuccess, buttonFile } = React.useContext(DataContext);

	const timer = React.useRef();
	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};
	React.useEffect(() => {
		return () => {
			clearTimeout(timer);
		};
	}, []);
	const handleButtonClick = () => {
		setSuccessCharge(true);
		setSuccess(false);
		setLoading(true);

		const timer = window.setInterval(() => {
			if (successCharge === true) {
				//console.log('successCharge', successCharge);
				if (successCharge === false) {
					setSuccess(true);
					setLoading(false);
					clearInterval(timer);
				}
			}
		}, 1000);
		//console.log(successCharge, successCharge);
	};
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ m: 1, position: 'relative' }}>
				<Fab aria-label="save" color="primary" sx={buttonSx}>
					{success ? <CheckIcon /> : <CloudUploadIcon />}
				</Fab>
				{loading && (
					<CircularProgress
						size={68}
						sx={{
							color: green[500],
							position: 'absolute',
							top: -6,
							left: -6,
							zIndex: 1,
						}}
					/>
				)}
			</Box>
			<Box sx={{ m: 1, position: 'relative' }}>
				<Button
					fullWidth
					variant="contained"
					sx={buttonSx}
					disabled={loading}
					type="submit"
					onClick={() => {
						submit();
						handleButtonClick();
					}}
				>
					{buttonFile}
				</Button>
				{loading && (
					<CircularProgress
						size={24}
						sx={{
							color: green[500],
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px',
						}}
					/>
				)}
			</Box>
		</Box>
	);
}
ButtonSave.propTypes = {
	submit: PropTypes.func.isRequired,
   
};