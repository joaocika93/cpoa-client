import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card, TextField, Container, List, ListItem,
    Divider, ListItemText, ListItemAvatar, Avatar,
    Typography, AppBar, Toolbar, IconButton, Button, InputAdornment, OutlinedInput, InputLabel, Grid, Popover
} from '@material-ui/core'
import { ThemeProvider, makeStyles, fade, withStyles, hexToRgb } from '@material-ui/core/styles';
import theme from '../../../ui/Theme'
import Drawer from '../../../components/Drawer'
import api from '../../../services/api'
import NumberFormat from 'react-number-format';


const useStyles = makeStyles({
    root: {
        background: theme.palette.primary,
    },
    card: {
        margin: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        width: '100%'
    },
    input: {
        border: theme.palette.primary
    },
    button: {
        justifyContent: 'center'
    },
    typography: {
        padding: theme.spacing(2),
    },
})

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator=' '
            isNumericString
            prefix="R$"
        />
    );
}


NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function CadastrarProduto({ history }) {
    const classes = useStyles()
    const [images, setImages] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [values, setValues] = React.useState({
        textmask: '(1  )    -    ',
        numberformat: ' 0.00',
    });
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    // useEffect(() => {
    //     load()
    //     //eslint-disable-next-line
    // })


    const handleOnClickSalveContact = () => {

        if (name === "" || images === "" || description === "" || values.numberformat === "") {
            console.log("Preencha todos os campos")
            setAnchorEl(null);
        } else {
            api.post("/produtos/add", {
                nome: name,
                descricao: description,
                preco: values.numberformat,
                imagem: images
            }).then(response => {
                console.log(response)
            })
            history.push(`/administrador`)

        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (name === "" || images === "" || description === "" || values.numberformat === "") {
            setMessage('Preencha todos os campos')
        } else {
            setMessage('Salvo com Sucesso!')
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;




    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar className={classes.root}>
                    <Toolbar>
                        <Grid container alignItems='center'>
                            <Grid item>
                                <Drawer></Drawer>
                            </Grid>
                            <Grid item>
                                <Typography color='inherit'>
                                    Cadastrar Novo Produto
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <br></br>
                <br></br>
                <br></br>
                <Card className={classes.card}>
                    <List className={classes.list} >
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    className={classes.input}
                                    id="outlined-basic"
                                    label="Url Imagem"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setImages(e.target.value)}
                                    value={images}
                                    fullWidth
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    className={classes.input}
                                    id="outlined-basic"
                                    label="Nome do Produto"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    fullWidth
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    className={classes.input}
                                    id="outlined-basic"
                                    label="Descrição do Produto"
                                    multiline
                                    rows={4}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    fullWidth
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <TextField
                                className={classes.input}
                                label="Preço do Produto"
                                value={values.numberformat}
                                onChange={handleChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                variant='outlined'
                                fullWidth
                            />
                        </ListItem>
                        <ListItem className={classes.button}>
                            <Button aria-describedby={id} onClick={handleClick} color='primary' variant="contained">Salvar</Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleOnClickSalveContact}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography className={classes.typography}>{message}</Typography>
                            </Popover>
                        </ListItem>
                    </List>
                </Card>
            </ThemeProvider>
        </>
    )
}
