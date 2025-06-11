import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { UtilsContext } from '../Context/UtilsProvider';


export default function SCDialog() {
	const { DialogData, DiologOnClose } = useContext(UtilsContext);
	return (
		<>
			<Dialog fullWidth={true} maxWidth={DialogData.maxWidth} open={DialogData.open} onClose={DiologOnClose}>
				<DialogTitle className="!bg-[#611232] text-white p-2 rounded">{DialogData.title}</DialogTitle>
				<DialogContent className='p-2'>
					<DialogContentText className="!font-bold text-left p-2">{DialogData.subtitle}</DialogContentText>
					{DialogData.content}
				</DialogContent>
				<DialogActions>{DialogData.action}</DialogActions>
			</Dialog>
		</>
	);
}
