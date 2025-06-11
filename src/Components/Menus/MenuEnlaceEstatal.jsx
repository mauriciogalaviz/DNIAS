import { Add, Book, ListAlt, People } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Fragment, useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import { FormularioContext } from '../Context/FormularioProvider';
import { ListItemButton, ListItemText, ListItem, List, ListItemIcon } from '@mui/material';
import PropTypes from 'prop-types';
import MonitorIcon from '@mui/icons-material/Monitor';
import { ExpandLess } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';

const MenuEnlaceEstatal = ({ handleClick, handleButtonClickMenu }) => {
	const { setNavModule, setNavMenu } = useContext(DataContext);
	const { activeButtonMenu, setActiveButtonMenu } = useContext(FormularioContext);
	return (
		<Fragment>
			{/* Pre-Registro */}
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
							console.log('activeButtonMenu.active', activeButtonMenu.active);

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
								console.log('enlace');
								if (activeButtonMenu.active == 5 && index == 0) {
									setNavMenu(1);
									setNavModule(2);
								}
								if (activeButtonMenu.active == 5 && index == 1) {
									setNavMenu(2);
									setNavModule(2);
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
			{/* Centros */}
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
								setNavModule(2);
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
								<ListAlt className={activeButtonMenu.active === 2 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
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

			<List>
				<Tooltip title="Manual" placement="right">
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
								
							}}
							className={activeButtonMenu.active === 3 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
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
								<Book className={activeButtonMenu.active === 3 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
							</ListItemIcon>
							<ListItemText
								primary={'Manual'}
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
		</Fragment>
	);
};

MenuEnlaceEstatal.propTypes = {
	handleClick: PropTypes.func.isRequired,
	handleButtonClickMenu: PropTypes.func.isRequired,
};

export default MenuEnlaceEstatal;
