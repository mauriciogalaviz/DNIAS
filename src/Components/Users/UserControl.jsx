import {  Card} from "@mui/material";
import ListUsers from "./ListUsers";
import FormUsers from "./FormUsers";

const UserControl = () => {
	
	return (
		<Card className="grid grid-cols-12 col-span-12 !p-4">
			<FormUsers />
			<ListUsers />
		</Card>
	);
};

export default UserControl;
