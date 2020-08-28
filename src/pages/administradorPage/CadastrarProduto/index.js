import React, { useEffect, useState } from 'react';
import {
    Card, TextField, Container, List, ListItem,
    Divider, ListItemText, ListItemAvatar, Avatar,
    Typography, AppBar, Toolbar, IconButton, Button, InputAdornment, OutlinedInput, InputLabel
} from '@material-ui/core'
import { ThemeProvider, makeStyles, fade, withStyles } from '@material-ui/core/styles';
import theme from '../../../ui/Theme'
import Drawer from '../../../components/Drawer'

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024;

const useStyles = makeStyles({
    root: {
        background: theme.palette.primary,
    },
    img: {
        width: 100
    }
})

export default function CadastrarProduto() {
    const classes = useStyles()
    const [images, setImages] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        load()
        //eslint-disable-next-line
    })

    function load() {
        console.log(images)
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar className={classes.root}>
                    <Toolbar>
                        <Drawer></Drawer>
                    </Toolbar>
                </AppBar>
                <br></br>
                <br></br>
                <br></br>
                <Card>
                    <List>
                        <ListItem>
                            <ListItemText>
                            <TextField
                                    id="outlined-basic"
                                    label="Url Imagem"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setImages(e.target.value)}
                                    value={images}
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    id="outlined-basic"
                                    label="Nome do Produto"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <TextField
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

                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <TextField
                                    id="outlined-basic"
                                    label="Preço do Produto"
                                    id="standard-start-adornment"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    variant="outlined"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </ListItemText>
                        </ListItem>
                    </List>
                </Card>
            </ThemeProvider>
        </>
    )
}
