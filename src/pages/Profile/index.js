import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer'
import theme from '../../ui/Theme'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Typography, Avatar } from '@material-ui/core'
import api from '../../services/api'
import EditIcon from '@material-ui/icons/Edit';

const useStyle = makeStyles({
    root: {
        background: theme.palette.primary,
    },
    text: {
        background: '#FFFFFF',
        backgroundColor: theme.palette.primary
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    card: {
        background: theme.palette.primary,
        width: 345
    },
    toolbar: {
        minHeight: 240,
        alignItems: "flex-start",
        justifyContent: 'center',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    }
})

export default function Profile() {
    const [logged, setLogged] = useState([])
    const classes = useStyle()

    useEffect(() => {
        load()
        //eslint-disable-next-line
    }, [])

    async function load() {
        const response = await api.get(`/clientes/buscar/${localStorage.getItem('googleId')}`)
        setLogged(response.data)
    }

    console.log(logged)
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={1}>
                    <Grid item>
                        <AppBar className={classes.root} position="fixed" color="primary">
                            <Toolbar>
                                <Grid container direction="row">
                                    <Grid container justify="flex-start" item>
                                        <Drawer ></Drawer>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                    <Grid container justify="center" item>
                                        <Typography>Perfil</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" >
                                    <Grid container justify="flex-end" item>
                                        <EditIcon />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                            <Toolbar className={classes.toolbar}>
                                <Grid container direction="column" alignItems="center" alignContent="center"  spacing={2}>
                                    <Grid item>
                                        <Avatar src={logged.imagem} className={classes.large} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h4">{logged.nome}</Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}