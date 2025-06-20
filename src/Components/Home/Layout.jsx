import { styled, useTheme } from '@mui/material/styles';
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
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import UserControl from '../Users/UserControl';
import { UserContext } from '../Context/UserProvider';
import { useEffect } from 'react';
import { Avatar, Collapse, Tooltip } from '@mui/material';
import { ExpandLess, FormatListNumbered, ManageAccounts, People, Schedule } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { LoginContext } from '../Context/LoginProvider';
import { FormularioContext } from '../Context/FormularioProvider';
import { lazy } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Suspense } from 'react';
import MenuInstitucion from '../Menus/MenuInstitucion';
import MenuEnlaceEstatal from '../Menus/MenuEnlaceEstatal';
import MenuVerificador from '../Menus/MenuVerificador';
import MenuAdministrador from '../Menus/MenuAdministrador';
import InstitucionCentros from '../DataTables/Institucion/InstitucionCentros';
import { Button } from '@mui/material';
import PreregistroEnlace from '../DataTables/EnlaceEstatal/PreregistroEnlace';
import ActualizacionAnualEnlace from '../DataTables/EnlaceEstatal/ActualizacionAnualEnlace';
import TableroEnlace from '../DataTables/EnlaceEstatal/TableroEnlace';
import TableroVerificador from '../DataTables/Verificador/TableroVerificador';
import { UtilsContext } from '../Context/UtilsProvider';
import Dictamen from '../Forms/Verificador/Dictamen';

const DniasTabs = lazy(() => import('../Forms/DniasTabs'));
const PreRegistro = lazy(() => import('../DataTables/Administrador/PreRegistro'));
const ActualizacionAnual = lazy(() => import('../DataTables/Administrador/ActualizacionAnual'));


const TableroAdmin = lazy(() => import('../DataTables/Administrador/TableroAdmin'));
const drawerWidth = 240;
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});
const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});
const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			},
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			},
		},
	],
}));
export default function Layout() {
	const { CloseSessionQuestion, UserLogIn, setUserLogIn } = useContext(LoginContext);
	const { ListarUsuarios } = useContext(UserContext);
	const { NavModule, setNavModule, NavMenu } = useContext(DataContext);
	const { setListView, activeButtonMenu, setActiveButtonMenu, setBotoneraForm } = useContext(FormularioContext);
	const { setOpenBackDrop, FallBack } = useContext(UtilsContext);

	/* const {BringCatalogos} = useContext(FormularioContext) */

	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [openForms, setOpenForms] = useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
		setOpenForms(false);
		setActiveButtonMenu((prevState) => ({
			...prevState,
			active: -1,
			subActive: -1,
		}));
	};
	const handleClick = () => {
		setOpenForms(!openForms);
		handleDrawerOpen();
	};
	const handleButtonClickMenu = (index) => {
		setActiveButtonMenu((prevState) => ({
			...prevState,
			subActive: index,
		}));
		console.log(index);
		if (index == 0) {
			console.log('CAI');
		}
		setListView(index);
		setBotoneraForm(true);
	};
	useEffect(() => {
		console.log('UserLogIn', UserLogIn);
		console.log('UserLogIn', UserLogIn.tipo_usuario);
		//setNavModule(0);
		// eslint-disable-next-line
	}, []);

	return (
		<Box sx={{ display: 'flex' }} className="col-span-12 gap-4 overflow-scroll !h-screen ">
			<CssBaseline />
			<AppBar position="fixed" open={open} className="!bg-primary">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={[
							{
								marginRight: 5,
							},
							open && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Directorio Nacional de Instituciones de Asistencia Social (DNIAS)
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<Box className="w-full grid grid-cols-12 p-2">
						<Box className="col-span-4">
							<Avatar>{UserLogIn.user.slice(0, 3)}</Avatar>
						</Box>
						<Box className="col-span-8">
							<Typography variant="h6" noWrap component="div">
								{UserLogIn.user}
							</Typography>
							<Typography variant="p" noWrap component="div">
								{UserLogIn.tipo_usuario == 1
									? 'Institución'
									: UserLogIn.tipo_usuario == 2
									? 'Enlace Estatal'
									: UserLogIn.tipo_usuario == 3
									? 'Verificador'
									: UserLogIn.tipo_usuario == 4
									? 'Administrador'
									: null}
							</Typography>
						</Box>
					</Box>
					<IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
				</DrawerHeader>
				<Divider />
				{/* Institución */}
				{UserLogIn.tipo_usuario == 1 ? <MenuInstitucion /> : null}
				{/* Enlace Estatal */}
				{UserLogIn.tipo_usuario == 2 ? <MenuEnlaceEstatal handleClick={handleClick} handleButtonClickMenu={handleButtonClickMenu} /> : null}
				{/* Verificador */}
				{UserLogIn.tipo_usuario == 3 ? <MenuVerificador /> : null}
				<Divider />
				{/* Menu Administrador */}
				{UserLogIn.tipo_usuario == 4 ? <MenuAdministrador handleClick={handleClick} handleButtonClickMenu={handleButtonClickMenu} /> : null}
				{/* Administrador */}
				<List>
					<Tooltip title="Administrador" placement="right">
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
									active: activeButtonMenu.active == -1 || activeButtonMenu.active != 4 ? 4 : -1,
									subActive: -1,
								});
							}}
							className={activeButtonMenu.active === 4 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
						>
							<ListItemIcon>
								<SettingsIcon className={activeButtonMenu.active === 4 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
							</ListItemIcon>
							<ListItemText primary="Administrador" />
							{activeButtonMenu.active === 4 ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
					</Tooltip>
					<Collapse in={activeButtonMenu.active == 4} timeout="auto" unmountOnExit>
						{['Usuario', 'Usuarios', 'Catalogos', 'Bitacora'].map((label, index) =>
							UserLogIn.tipo_usuario == 1 && index >= 1 ? null : UserLogIn.tipo_usuario == 2 && index == 1 ? null : UserLogIn.tipo_usuario == 3 &&
							  index == 1 ? null : UserLogIn.tipo_usuario == 4 && index == 0 ? null : (
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
										console.log(activeButtonMenu.active);
										console.log(index);
										if (activeButtonMenu.active == 4 && index + 1 == 1) {
											let datos = await ListarUsuarios();
											console.log('datos:', datos);
											datos ? setNavModule(30) : null;
										}
										/* if (activeButtonMenu.active == 4 && index + 1 == 2) {
										}
										if (activeButtonMenu.active == 4 && index + 1 == 3) {
										} */

										//setNavModule(index + 1);
										handleButtonClickMenu(index);
									}}
								>
									<ListItemIcon>
										{index == 0 ? <People /> : index == 1 ? <ManageAccounts /> : index == 2 ? <FormatListNumbered /> : index == 3 ? <Schedule /> : null}
									</ListItemIcon>
									<ListItemText primary={label} />
								</ListItemButton>
							)
						)}
					</Collapse>
				</List>
				{UserLogIn.tipo_usuario > 0 ? <Divider /> : null}
				{/* Cerrar Sesión */}
				<List>
					<Tooltip title="Cerrar Sesión" placement="right">
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
									CloseSessionQuestion();
									setActiveButtonMenu('cerrarSesion');
									setOpenBackDrop(true); // Activate backdrop when loading a component
									setTimeout(() => setOpenBackDrop(false), 500); // Deactivate after loading
								}}
								className={activeButtonMenu === 'cerrarSesion' ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
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
									<LogoutIcon className={activeButtonMenu === 'cerrarSesion' ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
								</ListItemIcon>
								<ListItemText
									primary={'Cerrar Sesión'}
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
				<Button
					onClick={() => {
						console.log('UserLogIn', UserLogIn.tipo_usuario);
						let login = UserLogIn.tipo_usuario + 1;
						if (login > 4) {
							login = 1;
						}
						setUserLogIn({
							...UserLogIn,
							tipo_usuario: login,
						});
					}}
				>
					Change User {UserLogIn.tipo_usuario}
				</Button>
			</Drawer>

			<Box component="main" className=" grid-cols-12 !mt-[0dvh] overflow-scroll !p-6">
				<DrawerHeader className=" col-span-12 min-h-24 max-h-24 " />

				<Box className=" grid grid-cols-12 col-span-12 gap-4  ">
					<Suspense fallback={<FallBack />}>
						{NavModule == 1 && NavMenu == 1 ? <DniasTabs /> : null}
						{NavModule == 1 && NavMenu == 2 ? <InstitucionCentros /> : null}
						{NavModule == 2 && NavMenu == 1 ? <PreregistroEnlace /> : null}
						{NavModule == 2 && NavMenu == 2 ? <ActualizacionAnualEnlace /> : null}
						{NavModule == 2 && NavMenu == 3 ? <TableroEnlace /> : null}
						{NavModule == 3 && NavMenu == 1 ? <TableroVerificador /> : null}
						{NavModule == 4 && NavMenu == 1 ? <PreRegistro /> : null} {/* Pre registro Admin */}
						{NavModule == 4 && NavMenu == 2 ? <ActualizacionAnual /> : null}
						{NavModule == 4 && NavMenu == 3 ? <TableroAdmin /> : null}
						{/* {NavModule == 5 ? <PreRegistro /> : null}
						{NavModule == 6 ? <ActualizacionAnual /> : null}
						{NavModule == 7 ? <TableroAdmin /> : null} */}
						{/* {NavModule == 7 ? <ControlList /> : null} */}
						{/* {NavModule != 3 ? <TressFiles /> : null} */}
						{/* {NavModule == 30 ? <UserControl /> : null} */}
						{/* NavModule == 4 ? <UserControl /> : null} */}
						
					</Suspense>
					
				</Box>
			
			</Box>
		</Box>
	);
}
