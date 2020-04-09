import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer'
import api from '../../services/api'
import theme from '../../ui/Theme'
import {
    Grid, AppBar, Toolbar, makeStyles, ThemeProvider, ListItem, ListItemAvatar,
    Avatar, ListItemText, Typography, Divider
} from '@material-ui/core';

const useStyle = makeStyles({
    root: {
        background: theme.palette.primary,
    },
    drawer: {
        width: '5em'
    }
})

export default function ShoppingCart() {
    const classes = useStyle()
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function getList() {
            const response = await api.get(`/itempedido/buscar/${localStorage.getItem("googleId")}`);
            setProduct(response.data)
        }
        getList()

        function atualizaCarrinho() {
            var totals = 0
            product.map(product => {
               return totals += product.preco
            })
            setTotal(totals)
        }
        atualizaCarrinho()
        
    }, [total, product])

    

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid container justify='flex-start' spacing={2}>
                    <Grid item>
                        <AppBar className={classes.root} position="fixed" color="primary">
                            <Toolbar>
                                <Grid className={classes.drawer} container direction='row'>
                                    <Grid container justify='flex-start' item>
                                        <Drawer />
                                    </Grid>
                                </Grid>
                                <Grid container direction='row'>
                                    <Grid container justify='flex-start' item>
                                        <Typography variant='h6'>Carrinho</Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid container direction='column' justify='flex-start'>
                        <Grid item>
                            {product.map(
                                product =>
                                    <div key={product.produto.id}>
                                        <Grid container direction='row' justify='flex-start'>
                                            <ListItem alignItems="flex-start">
                                                <Grid item>
                                                    <ListItemAvatar>
                                                        <Avatar src={product.produto.imagem} />
                                                    </ListItemAvatar>
                                                </Grid>
                                                <Grid item>
                                                    <ListItemText
                                                        primary={product.produto.nome}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component='span'
                                                                    variant='body2'
                                                                    color='textPrimary'
                                                                >
                                                                    {product.produto.preco}
                                                                </Typography>

                                                            </React.Fragment>
                                                        }
                                                    />
                                                </Grid>
                                            </ListItem>
                                        </Grid>
                                        <Divider />
                                    </div>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container direction='row' justify='flex-end'>
                    <Grid item>
                        <Typography>Total:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{total}</Typography>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div >
    );
}
