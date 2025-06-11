import { Add, Book, ListAlt, People, } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Fragment, useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import { FormularioContext } from '../Context/FormularioProvider';
import { ListItemButton,ListItemText, ListItem, List, ListItemIcon, Typography } from '@mui/material';

const MenuInstitucion = () => {
	const { setNavModule, setNavMenu } = useContext(DataContext);
	const { activeButtonMenu, setActiveButtonMenu, ClearPreRegistro } = useContext(FormularioContext);

	return (
		<Fragment >
			
			{/* Pre-Registro */}
			<List>
				<Tooltip title="Pre-Registro" placement="right">
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
							onClick={async() => {
								await ClearPreRegistro();
								setNavMenu(1)
								setNavModule(1);
								setActiveButtonMenu({
									...activeButtonMenu,
									active: 1,
								});

							}}
							className={activeButtonMenu.active === 1 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'}
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
								<Add className={activeButtonMenu.active === 1 ? '!bg-primary !text-white !text-wrap' : '!bg-inherit'} />
							</ListItemIcon>
							<ListItemText
								primary={'Pre-Registro'}
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
			{/* Centros */}
			<List>
				<Tooltip title="Centros" placement="right">
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
								setNavMenu(2);
								setNavModule(1);
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
								primary={'Centros'}
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
								/* setNavModule(3);
								setActiveButtonMenu({
									...activeButtonMenu,
									active: 3,
								}); */
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

export default MenuInstitucion