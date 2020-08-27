import React from 'react';
import Drawer from '../../components/Drawer'
import theme from '../../ui/Theme'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DeleteIcon from '@material-ui/icons/Delete';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditIcon from '@material-ui/icons/Edit';
import StoreIcon from '@material-ui/icons/Store';

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
    },
    grid: {
    },
    cadastro: {
        marginLeft: 27,
        height: 150,
        width: 150,
    },
    relatorio: {
        height: 150,
        width: 150,
    }

})

export default function Profile() {
    const classes = useStyle()

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid className={classes.grid} container spacing={2}>
                    <Grid item>
                        <AppBar className={classes.root} position="fixed" color="primary">
                            <Toolbar>
                                <Grid container direction="row">
                                    <Grid container justify="flex-start" item>
                                        <Drawer ></Drawer>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item >
                        <Button className={classes.cadastro} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <AddCircleIcon />
                                </Grid>
                                <Grid item>
                                    Cadastar Produto
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button className={classes.relatorio} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <AssessmentIcon />
                                </Grid>
                                <Grid item>
                                    Relatório de Encomendas
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item >
                        <Button className={classes.cadastro} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <DeleteIcon />
                                </Grid>
                                <Grid item>
                                    Exluir Produto
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button className={classes.relatorio} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <EventNoteIcon />
                                </Grid>
                                <Grid item>
                                    Agenda de Encomendas
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item >
                        <Button className={classes.cadastro} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <EditIcon />
                                </Grid>
                                <Grid item>
                                    Editar Produto
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button className={classes.relatorio} color='primary' variant='contained'>
                            <Grid container direction='row' justify='center' spacing={2}>
                                <Grid item>
                                    <StoreIcon />
                                </Grid>
                                <Grid item>
                                    Controle de Estoque
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>


            </ThemeProvider>
        </>
    );
}