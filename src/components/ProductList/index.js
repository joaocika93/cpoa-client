import React, { useState, useEffect } from 'react'
import Drawer from '../Drawer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThemeProvider, makeStyles, fade, withStyles } from '@material-ui/core/styles';
import api from '../../services/api'
import theme from '../../ui/Theme'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    AppBar, Toolbar, Grid, Container, InputBase, IconButton, Badge,
    Button, Card, CardActionArea, CardMedia, CardContent, Typography,
    CardActions, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, LinearProgress
} from '@material-ui/core'

const useStyle = makeStyles({
    root: {
        background: theme.palette.primary,
    },
    text: {
        background: '#FFFFFF',
        backgroundColor: theme.palette.primary,
        width: "10em"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '13em',
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '20ch',
        },
    },
})

const StyledBadge = withStyles(theme => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function ProductList() {
    const classes = useStyle()
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState([]);
    const [productPage] = useState(4);
    const [countBadge, setCountBadge] = useState(0)
    const [logged, setLogged] = useState([])

    useEffect(() => {
        getList()
        getAllProduct()
        badge()
        //eslint-disable-next-line
    }, [])

    function getAllProduct() {
        api.get('/produtos/getAll').then(response => {
            setTotalProduct(response.data);
        })

        api.get(`/clientes/buscar/${localStorage.getItem('googleId')}`).then(response => {
            setLogged(response.data)
        })
    }

    function getList() {
        setTimeout(() => {
            api.get(`/produtos/get?page=${page}&size=${productPage}`).then(response => {
                setProduct([...product, ...response.data.content]);
                setPage(page + 1)
            })
        }, 2000);
    }

    function badge() {
        api.get(`itempedido/countitens/${localStorage.getItem('googleId')}`).then(response => {
            setCountBadge(response.data)
        })

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            window.location.href = `buscaProduto/${e.target.value}`

        }
    }

    function addCart(product) {
        setCountBadge(countBadge + 1)

        api.post('/itempedido/add', {
            desconto: 0,
            quantidade: 1,
            preco: product.preco,
            googleId: logged.googleId,
            produto: {
                id: product.id,
            }
        }).then(response => {
            console.log('Salvo com Sucess')
        })
    }

    return (
        <div >
            <ThemeProvider theme={theme}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <AppBar className={classes.root} position="fixed" color="primary">
                            <Toolbar>
                                <Grid container direction="row">
                                    <Grid container justify="flex-start" item>
                                        <Drawer></Drawer>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row">
                                    <Grid container justify="center" item>
                                        <div className={classes.search}>
                                            <div className={classes.searchIcon}>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
                                                placeholder="Search…"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </div>
                                    </Grid>

                                </Grid>
                                <Grid container direction="row">
                                    <Grid container justify="flex-end" style={{ marginRight: "10px" }} item>
                                        <IconButton aria-label="cart" href="/carrinho" >
                                            <StyledBadge badgeContent={countBadge} color="secondary">
                                                <ShoppingCartIcon />
                                            </StyledBadge>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Container>
                        <br></br>
                        <br></br>
                        <br></br>
                        <InfiniteScroll
                            style={{ justifyContent: "center", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, 20em)", gridGap: "20px" }}
                            dataLength={product.length}
                            next={getList}
                            hasMore={product.length === totalProduct.length ? false : true}
                            loader={<LinearProgress color='primary' />}
                            endMessage={
                                <div>
                                    <br></br>
                                    <Typography color="secondary" style={{ textAlign: "center" }}>Isso é Tudo</Typography>
                                </div>
                            }
                        >
                            {product.map(dados => <div key={dados.id} >
                                <br></br>
                                <Card style={{ background: "#fafafa" }}>
                                    <CardActionArea>
                                        <CardMedia style={{ height: "10em", width: "10em" }}
                                            component="img"
                                            image={dados.imagem}
                                        />
                                        <CardContent>
                                            <Typography color="primary" gutterBottom variant="h5" component="h2">
                                                {dados.nome}
                                            </Typography>
                                            <Typography color="secondary" gutterBottom variant="body1" component="h1">
                                                R$ {dados.preco}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary" onClick={() => addCart(dados)}>Adicionar ao Carrinho</Button>
                                        <Button size="small" href='/carrinho' variant="contained" color="secondary">Encomendar</Button>
                                    </CardActions>
                                    <ExpansionPanel style={{ background: "#fafafa" }} >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography color="primary" gutterBottom variant="body2" component="p">
                                                Descrição do Produto
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography style={{ width: "20em", textAlign: "left" }} color="primary" gutterBottom variant="body2" component="p">
                                                {dados.descricao}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Card>
                                <br></br>
                            </div>)}
                        </InfiniteScroll>
                        <br />
                    </Container>
                </Grid>
            </ThemeProvider>

        </div >
    )

}



