
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Fragment, useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import UserControl from '../Users/UserControl';
import { UserContext } from '../Context/UserProvider';

import { Avatar, Collapse, Tooltip } from '@mui/material';
import { ExpandLess, People } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';

import { Add } from '@mui/icons-material';
import { LoginContext } from '../Context/LoginProvider';
import { FormularioContext } from '../Context/FormularioProvider';

import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';
import { Suspense } from 'react';
import UtilsProvider, { UtilsContext } from '../Context/UtilsProvider';


const MenuAdministrador = ({ handleClick, handleButtonClickMenu }) => {
	const { CloseSessionQuestion, UserLogIn } = useContext(LoginContext);
	const { ListarUsuarios } = useContext(UserContext);
	const { NavModule, setNavModule, setNavMenu } = useContext(DataContext);
	const {  activeButtonMenu, setActiveButtonMenu } = useContext(FormularioContext);

	return (
		<Fragment>
			{/* Monitor */}
			<List>
				<Tooltip title="Monitor" placement="right">
					<ListItemButton
						sx={[
							{
								minHeight: 48,
								px: 2.5,
							},
						]}
						onClick={() => {
							handleClick();
							console.log(activeButtonMenu.active);

							setActiveButtonMenu({
								...activeButtonMenu,
								active: activeButtonMenu.active > 5 || activeButtonMenu.active < 5 ? 5 : -1,
								subActive: -1,
							});
						}}
						className={activeButtonMenu.active === 5 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
					>
						<ListItemIcon>
							<MonitorIcon className={activeButtonMenu.active === 5 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
						</ListItemIcon>
						<ListItemText primary="Monitor" />
						{activeButtonMenu.active === 5 ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</Tooltip>
				<Collapse in={activeButtonMenu.active === 5} timeout="auto" unmountOnExit>
					{['Pre Registro', 'Actualización Anual'].map((label, index) => (
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									pl: 3.5,
								},
								open
									? {
											justifyContent: 'initial',
									  }
									: {
											justifyContent: 'center',
									  },
							]}
							key={label}
							className={`!border-white  '!bg-inherit'} !text-wrap`}
							onClick={async () => {
								setActiveButtonMenu({
									...activeButtonMenu,
									subActive: index,
								});
								if (activeButtonMenu.active == 5 && index + 1 == 1) {
									setNavMenu(1)
									setNavModule(4);
									}
									if (activeButtonMenu.active == 5 && index + 1 == 2) {
										setNavMenu(2);
										setNavModule(4);
									}
								
								handleButtonClickMenu(index);
							}}
						>
							<ListItemIcon>{index == 5 ? <Add /> : index == 1 ? <UpdateIcon /> : null}</ListItemIcon>
							<ListItemText primary={label} />
						</ListItemButton>
					))}
				</Collapse>
			</List>
			<Divider />
			{/* Tablero */}
			<List>
				<Tooltip title="Tablero" placement="right">
					<ListItem key={0} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
									? {
											justifyContent: 'initial',
									  }
									: {
											justifyContent: 'center',
									  },
							]}
							onClick={() => {
								setNavMenu(3);
								setNavModule(4);
							}}
							className={activeButtonMenu.active === 6 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
						>
							<ListItemIcon
								sx={[
									{
										minWidth: 0,
										justifyContent: 'center',
									},
									open
										? {
												mr: 3,
										  }
										: {
												mr: 'auto',
										  },
								]}
							>
								<ListAltIcon className={activeButtonMenu.active === 6 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
							</ListItemIcon>
							<ListItemText
								primary={'Tablero'}
								sx={[
									open
										? {
												opacity: 1,
										  }
										: {
												opacity: 0,
										  },
								]}
							/>
						</ListItemButton>
					</ListItem>
				</Tooltip>
			</List>
			<Divider />
			{/* Estadisticas */}
			<List>
				<Tooltip title="Estadísticas" placement="right">
					<ListItem key={0} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
									? {
											justifyContent: 'initial',
									  }
									: {
											justifyContent: 'center',
									  },
							]}
							onClick={() => {
								setNavModule(7);
								setActiveButtonMenu({
									...activeButtonMenu,
									active: 2,
								});
							}}
							className={activeButtonMenu.active === 2 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
						>
							<ListItemIcon
								sx={[
									{
										minWidth: 0,
										justifyContent: 'center',
									},
									open
										? {
												mr: 3,
										  }
										: {
												mr: 'auto',
										  },
								]}
							>
								<AnalyticsIcon className={activeButtonMenu.active === 2 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
							</ListItemIcon>
							<ListItemText
								primary={'Estadísticas'}
								sx={[
									open
										? {
												opacity: 1,
										  }
										: {
												opacity: 0,
										  },
								]}
							/>
						</ListItemButton>
					</ListItem>
				</Tooltip>
			</List>
			<Divider />
			{/* Consultas */}
			<List>
				<Tooltip title="Consultas" placement="right">
					<ListItemButton
						sx={[
							{
								minHeight: 48,
								px: 2.5,
							},
						]}
						onClick={() => {
							handleClick();
							setActiveButtonMenu({
								...activeButtonMenu,
								active: activeButtonMenu.active == -1 || activeButtonMenu.active != 3 ? 3 : -1,
								subActive: -1,
							});
						}}
						className={activeButtonMenu.active === 3 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
					>
						<ListItemIcon>
							<ManageSearchIcon className={activeButtonMenu.active === 3 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
						</ListItemIcon>
						<ListItemText primary="Consultas" />
						{activeButtonMenu.active === 3 ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</Tooltip>
				<Collapse in={activeButtonMenu.active === 3} timeout="auto" unmountOnExit>
					{['Institución', 'Por Estatus', /* 'Ficha Salud', */ 'Modelo', 'Mejores Practicas'].map((label, index) => (
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									pl: 3.5,
								},
								open
									? {
											justifyContent: 'initial',
									  }
									: {
											justifyContent: 'center',
									  },
							]}
							key={label}
							className={`!border-white  '!bg-inherit'} !text-wrap`}
							onClick={async () => {
								setActiveButtonMenu({
									...activeButtonMenu,
									subActive: index,
								});
								/* if (activeButtonMenu.active == 3 && index + 1 == 1) {
									await clearFormCAI();
								}
								if (activeButtonMenu.active == 3 && index + 1 == 2) {
									await clearFormCAS();
								}
								if (activeButtonMenu.active == 3 && index + 1 == 3) {
									await clearFormCANM();
								}
								if (activeButtonMenu.active == 3 && index + 1 == 4) {
									await clearFormCAPM();
								}
								if (activeButtonMenu.active == 3 && index + 1 == 5) {
									await clearFormRNR();
								} */

								setNavModule(index + 1);
								handleButtonClickMenu(index);
							}}
						>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText primary={label} />
						</ListItemButton>
					))}
				</Collapse>
			</List>
			<Divider />
		</Fragment>
	);
};

export default MenuAdministrador