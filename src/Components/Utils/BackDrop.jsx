import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';

import { UtilsContext } from '../Context/UtilsProvider';

const BackDrop = () => {
	const {openBackDrop} = useContext(UtilsContext)
	return (
		<div>
			<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={openBackDrop} >
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

export default BackDrop;
