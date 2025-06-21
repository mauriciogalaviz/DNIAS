import { Button } from '@mui/material';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UtilsContext } from '../../Context/UtilsProvider';
import Autoriza from '../EnlaceEstatal/Autoriza';
import { LoginContext } from '../../Context/LoginProvider';
import Rechaza from '../EnlaceEstatal/Rechaza';
import AceptarVerificacion from '../Verificador/AceptarVerificacion';
import AutorizaVerificacion from '../EnlaceEstatal/AutorizarVerificacion';
import DialogMax from '../../Utils/DialogMax';
import { useState } from 'react';
import Dictamen from '../Verificador/Dictamen';
import { FormularioContext } from '../../Context/FormularioProvider';

const BotoneraUser = ({ value, IdInstitucion, handleBack, steps, handleNext }) => {
	const { ChangeEstatusCuestion } = useContext(FormularioContext);
	const { DialogData, setDialogData, DiologOnClose } = useContext(UtilsContext);
	const {UserLogIn} = useContext(LoginContext);
	const [OpenDictamen, setOpenDictamen] = useState(false);
	return (
		<Box className="col-span-12 p-4 flex justify-end gap-4">
			<Box className="col-span-12 p-4 flex  gap-4">
				{value !== 0 ? (
					<Button disabled={value === 0} onClick={handleBack} className="!bg-primary !text-white dark:!text-inherit">
						Regresar
					</Button>
				) : null}
				{IdInstitucion != 0 ? (
					<Button variant="contained" className="!bg-primary !text-white dark:!text-inherit" onClick={()=>{
						
						value === steps.length - 1 ? ChangeEstatusCuestion(47) : handleNext();
					}} hidden={UserLogIn.tipo_usuario >= 2 ? true : false}>
						{value === steps.length - 1 ? 'Enviar' : 'Siguiente'}
					</Button>
				) : null}
			</Box>
			{/* Botonera Enlace estatal */}
			{value === steps.length - 1 && UserLogIn.tipo_usuario == 2 ? (
				<Box className="col-span-12 p-4 flex  gap-4">
					<Button
						disabled={false}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Aceptación de pre registro y en su caso asignación de verificador',
								subtitle: 'Se genera la autorización y asignación de verificador si la institución en pública o privada',
								content: <Autoriza />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Autorizar
					</Button>
					<Button
						disabled={value === 0}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Rechazo de pre registro',
								subtitle: 'Se genera el rechazo del pre registro de la institución',
								content: <Rechaza />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Rechazar
					</Button>
				</Box>
			) : null}
			{value === steps.length - 1 && UserLogIn.tipo_usuario == 3 ? (
				<Box className="col-span-12 p-4 flex  gap-4">
					<Button
						disabled={false}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Aceptación de verificación del pre registro ',
								subtitle: 'Se genera la aceptación de la verificación del pre registro por parte del verificador asignado',
								content: <AceptarVerificacion />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Aceptar Verificación
					</Button>
					<Button
						disabled={value === 0}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Rechazo de pre registro',
								subtitle: 'Se genera el rechazo del pre registro de la institución',
								content: <Rechaza />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Rechazar Verificación
					</Button>
					<Button disabled={value === 0} onClick={() => {}} className="!bg-primary !text-white dark:!text-inherit">
						Imprimir Cédula de pre verificación
					</Button>

					<Button
						disabled={value === 0}
						onClick={() => {
							setOpenDictamen(true);
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Capturar Dictamen
					</Button>
				</Box>
			) : null}
			{value === steps.length - 1 && UserLogIn.tipo_usuario == 2 ? (
				<Box className="col-span-12 p-4 flex  gap-4">
					<Button
						disabled={false}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Aceptación de la verificación realizada pr el verificador',
								subtitle: 'Se genera la autorización de la verificación',
								content: <AutorizaVerificacion />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Autorizar Verificación
					</Button>
					<Button
						disabled={value === 0}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Rechazo de pre registro',
								subtitle: 'Se genera el rechazo del pre registro de la institución',
								content: <Rechaza />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Rechazar Verificación
					</Button>
					<Button
						disabled={value === 0}
						onClick={() => {
							setDialogData({
								...DialogData,
								open: true,
								title: 'Aceptación de pre registro y en su caso asignación de verificador',
								subtitle: 'Se genera la autorización y asignación de verificador si la institución en pública o privada',
								content: <Autoriza />,
								action: <Button onClick={DiologOnClose}>Cerrar</Button>,
								maxWidth: 'md',
							});
						}}
						className="!bg-primary !text-white dark:!text-inherit"
					>
						Nueva Verificación
					</Button>
				</Box>
			) : null}
			
			<DialogMax OpenDictamen={OpenDictamen} setOpenDictamen={setOpenDictamen} title='Dictamen de la verificación' component={<Dictamen />} />
		</Box>
	);
};
BotoneraUser.propTypes = {
	value: PropTypes.number.isRequired,
	IdInstitucion: PropTypes.number.isRequired,
	handleBack: PropTypes.func.isRequired,
	steps: PropTypes.array.isRequired,
	handleNext: PropTypes.func.isRequired,
}

export default BotoneraUser