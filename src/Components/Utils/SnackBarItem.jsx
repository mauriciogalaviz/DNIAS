import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { UtilsContext } from '../Context/UtilsProvider';


export default function SnackBarItem() {
	const { SnackbarData, closeSnackbarData } = useContext(UtilsContext);

	return (
		<div>
			<Snackbar
				open={SnackbarData.open}
				autoHideDuration={SnackbarData.duration}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				onClose={closeSnackbarData}
				TransitionComponent={Slide}
			>
				<Alert onClose={closeSnackbarData} severity={SnackbarData.severity} variant="filled" sx={{ width: '100%' }}>
					{SnackbarData.content}
				</Alert>
			</Snackbar>
		</div>
	);
}
