import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar} from '@material-ui/core'
import { ThemeProvider, makeStyles, fade, withStyles } from '@material-ui/core/styles';
import theme from '../../../ui/Theme'
import Drawer from '../../../components/Drawer'


const useStyles = makeStyles({
    root: {
        background: theme.palette.primary,
    },
})

export default function CadastrarProduto() {
    const classes = useStyles()

    // useEffect(() => {
    //     load()
    //     //eslint-disable-next-line
    // }, [])


    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar className={classes.root}>
                    <Toolbar>
                        <Drawer></Drawer>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </>
    )
}