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
        top: false,
        left: false,
        bottom: false,
        right: false,
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
                <ListItem button key="Home">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button key="ShoppingCart">
                    <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
                    <ListItemText primary="Carrinho" />
                </ListItem>
                <ListItem button key="Favorite">
                    <ListItemIcon><FavoriteIcon /></ListItemIcon>
                    <ListItemText primary="Favoritos" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="Profile">
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Perfil" />
                </ListItem>
                <ListItem button key="Notification">
                    <ListItemIcon><NotificationsIcon /></ListItemIcon>
                    <ListItemText primary="Notificações" />
                </ListItem>
                <ListItem button key="Settings">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Configurações" />
                </ListItem>
            </List>
        </div>
    );


    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
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