import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const DEFAULT_POSITION = [23.6345, -102.5528]; // Coordenadas de México
const DEFAULT_ZOOM = 5; // Zoom inicial

function MapEvents({ setPosition, setTriggerFly }) {
	useMapEvents({
		click: (e) => {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			setTriggerFly(true);
		},
		dblclick: (e) => {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			setTriggerFly(true);
		},
	});
	return null;
}

function FlyToLocation({ position, triggerFly }) {
	const map = useMap();
	useEffect(() => {
		if (triggerFly) {
			map.flyTo(position, 18);
		}
	}, [position, triggerFly, map]);
	return null;
}

const DomicilioGeo = ({formik}) => {
	const [position, setPosition] = useState([formik.values.lat, formik.values.lng]);
	const [triggerFly, setTriggerFly] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPosition((prev) => {
			const newPosition = [...prev];
			if (name === 'lat') newPosition[0] = parseFloat(value);
			if (name === 'lng') newPosition[1] = parseFloat(value);
			return newPosition;
		});
		setTriggerFly(true);
	};

	const handleGetCurrentPosition = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition([pos.coords.latitude, pos.coords.longitude]);
				setTriggerFly(true);
			},
			(err) => {
				console.error('Error obteniendo ubicación:', err);
			}
		);
	};

	return (
		<Box className="col-span-12 grid grid-cols-12 gap-4">
			<Box className="col-span-12 py-2">
				<MapContainer center={position} zoom={DEFAULT_ZOOM} style={{ height: '400px', width: '100%' }}>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<FlyToLocation position={position} triggerFly={triggerFly} />
					<MapEvents setPosition={setPosition} setTriggerFly={setTriggerFly} />
					<Marker position={position}></Marker>
				</MapContainer>
			</Box>
			<Box className="col-span-12 grid grid-cols-12 gap-4">
				<TextField
					label="Latitud"
					name="lat"
					value={position[0]}
					onChange={() => {
						handleInputChange();
						formik.setFieldValue('lat', position[0]);
						formik.values.lat = parseFloat(position[0]);
					}}
					className="col-span-2"
				/>
				<TextField
					label="Longitud"
					name="lng"
					value={position[1]}
					onChange={() => {
						handleInputChange();
						formik.setFieldValue('lng', position[1]);
						formik.values.lng = parseFloat(position[1]);
					}}
					className="col-span-2"
				/>
				<Button variant="contained" onClick={handleGetCurrentPosition} className="col-span-2">
					Obtener Ubicación Actual
				</Button>
			</Box>
		</Box>
	);
};
DomicilioGeo.propTypes = {
	formik: PropTypes.object.isRequired,
};

export default DomicilioGeo;
