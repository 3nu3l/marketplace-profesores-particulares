import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const anchor = 'left'

export default function HamburguerDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = () => (
    <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
            <Link color="inherit" href="/">
                <ListItem key={'home'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Inicio'} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Divider />

            <Link color="inherit" href="/signin">
                <ListItem key={'signin'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link color="inherit" href="/signup">
                <ListItem key={'signup'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Registrarse'} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Divider />

            <Link color="inherit" href="/registrationClass">
                <ListItem key={'registerClass'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Registrar clase'} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link color="inherit" href="/modifyClass">
                <ListItem key={'modifyClass'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Modificar clase'} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>

        <Divider />
        <Link color="inherit" href="/">
            <ListItem key={'logout'} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Cerrar sesión'} />
                </ListItemButton>
            </ListItem>
        </Link>
    </Box>
    );

    return (
        <React.Fragment key={anchor}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(anchor, true)}
            >
            <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
                ModalProps={{ onBackdropClick: toggleDrawer(anchor, false) }}
            >
                {list()}
            </SwipeableDrawer>
        </React.Fragment>
    );
}
