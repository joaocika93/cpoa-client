import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <Link href={`/home/${localStorage.getItem('googleId')}`} >
                    <ListItem button key="Home" color="inherit">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </Link>
                <Link href="/carrinho">
                    <ListItem button key="ShoppingCart">
                        <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
                        <ListItemText primary="Carrinho" />
                    </ListItem>
                </Link>
                <Link href="/favoritos">
                    <ListItem button key="Favorites">
                        <ListItemIcon><FavoriteIcon /></ListItemIcon>
                        <ListItemText primary="Favoritos" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link href="/perfil">
                    <ListItem button key="Profile">
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                </Link>
                <Link href="/notificacao">
                    <ListItem button key="Notification">
                        <ListItemIcon><NotificationsIcon /></ListItemIcon>
                        <ListItemText primary="Notificações" />
                    </ListItem>
                </Link>
                <Link href="/configuracao">
                    <ListItem button key="Settings">
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </ListItem>
                </Link>
                <Divider/>
            </List>
        </div>
    );


    return (
        <div>
            <Button color="inherit" onClick={toggleDrawer('left', true)}><MenuIcon color="inherit" /></Button>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}