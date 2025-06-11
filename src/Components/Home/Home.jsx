import { Box } from "@mui/material";
import Layout from "./Layout";


const Home = () => {
  return (
		<Box className=" grid grid-cols-12 col-span-12  w-screen h-screen overflow-hidden ">
			<Box className="grid grid-cols-12 col-span-12 h-screen ">
				<Layout />
			</Box>
		</Box>
  );
}

export default Home