import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

const CatalogoContext = createContext(null);

const CatalogoProvider = ({ children }) => {
	const [catalogos, setCatalogos] = useState({
		estatus: [],
		tiposInstitucion: [],
		servicios: [],
		// puedes seguir agregando más catálogos aquí
	});
	const GetCatalogos = useCallback(async () => {
		try {
			const [resEstatus, resTipos, resServicios] = await Promise.all([
				axios.get('/api/catalogos/estatus'),
				axios.get('/api/catalogos/tiposInstitucion'),
				axios.get('/api/catalogos/servicios'),
			]);

			setCatalogos({
				estatus: resEstatus.data.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.name}
					</MenuItem>
				)),
				tiposInstitucion: resTipos.data.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.nombre}
					</MenuItem>
				)),
				servicios: resServicios.data.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.descripcion}
					</MenuItem>
				)),
			});
		} catch (error) {
			console.error('Error cargando catálogos:', error);
		}
	}, []);
	const data = {
		catalogos,
		setCatalogos,
		GetCatalogos,
	};
	return <CatalogoContext.Provider value={data}>{children}</CatalogoContext.Provider>;
};

CatalogoProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CatalogoProvider;
export { CatalogoContext };
