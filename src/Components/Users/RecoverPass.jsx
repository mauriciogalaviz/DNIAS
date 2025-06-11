import { Box, FormControl, TextField, Typography,Button } from "@mui/material";
import { useFormik } from "formik"
import { useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { DataContext } from "../Context/DataProvider";

const RecoverPass = ({id}) => {
	const [respuesta, setRespuesta] = useState('')
	const {headerList} = useContext(DataContext) 
	const formikPass = useFormik({
		initialValues: {
			id: id,
			password: '',
		},

		onSubmit: (values) => {
			//console.log(JSON.stringify(values, null, 2));
			//console.log("init fetched");
			let register = async () => {
				try {
					let res = await fetch('https://api.dif.gob.mx/comiteEtica/usuarios/pass/', {
						method: 'POST',
						body: JSON.stringify(values),
						headers: headerList,
					});
					//console.log("res", res);
					let json = await res.json();
					//console.log("json", json);
					setRespuesta(json.statusText);
				} catch (error) {
					console.error(error);
					setRespuesta(error.statusText);
				}
			};
			register();
		},
	});
  return (
		<form onSubmit={formikPass.handleSubmit} onChange={formikPass.handleChange} className="grid grid-cols-12 col-span-12">
			<Box className="grid grid-cols-1 col-span-12">
				<Typography>Escriba la nueva contraseña:</Typography>
				<FormControl fullWidth className="">
					<TextField fullWidth name={'password'} label={'Contraseña'} onChange={formikPass.handleChange} onBlur={formikPass.handleBlur} />
				</FormControl>
				<Button type="submit">Guardar contraseña nueva</Button>
				<Typography>{respuesta}</Typography>
			</Box>
		</form>
  );
}
RecoverPass.propTypes = {
	id: PropTypes.number.isRequired,
}
export default RecoverPass