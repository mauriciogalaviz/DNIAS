import { Box } from '@mui/material';
import List from '@mui/material/List';
import { useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
const ListUsers = () => {
	const {listaUser} =
		useContext(UserContext);
	return (
		<Box className="grid grid-cols-12 col-span-12 md:col-span-6 p-6 h-[600px] overflow-y-auto">
			<List
				className="col-span-12 p-12"
				sx={{
					bgcolor: 'background.paper',
				}}
			>
				{listaUser}
			</List>
		</Box>
	);
};

export default ListUsers;
