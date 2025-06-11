import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { FormularioContext } from '../Context/FormularioProvider';
import { DataContext } from '../Context/DataProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormHelperText } from '@mui/material';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

/* const names = [
	{ id: '1', name: 'Alice' },
	{ id: '2', name: 'Bob' },
	{ id: '3', name: 'Charlie' },
	{ id: '4', name: 'David' },
	{ id: '5', name: 'Eve' },
]; */

function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.some((person) => person.name === name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
	};
}

const SelectUsers = () => {
	const { personName, setPersonName } = useContext(FormularioContext);
	const [names, setNames] = useState([]);
	const { headerList } = useContext(DataContext);
	const theme = useTheme();
	const getusersDenuncia = async () => {
		try {
			let response = await fetch(`https://api.dif.gob.mx/comiteEtica/usuarios/denuncias/`, {
				method: 'GET',
				headers: headerList,
			});
			if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
			let json = await response.json();
			setNames(json.usuarios);
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value.map((id) => names.find((name) => name.id === id)));
	};
	useEffect(() => {
		getusersDenuncia();
	}, []);
	return (
		
			<FormControl >
				<InputLabel id="demo-multiple-chip-label">Usuarios del comité</InputLabel>
				<Select
					fullWidth={true}
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					name="users"
					value={personName.map((person) => person.id)}
					onChange={(e) => {
						handleChange(e);
					}}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((id) => {
								const person = names.find((name) => name.id === id);
								return <Chip key={id} label={person.nombre} />;
							})}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map((e) => (
						<MenuItem key={e.id} value={e.id} style={getStyles(e.nombre, personName, theme)}>
							{e.nombre}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>Usuarios del comité que tendrán acceso exclusivo a esta carpeta.</FormHelperText>
			</FormControl>
		
	);
};

export default SelectUsers;
