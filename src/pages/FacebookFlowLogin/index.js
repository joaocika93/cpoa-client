import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Card, TextField, Container, List, ListItem,
    Divider, ListItemText, ListItemAvatar, Avatar,
    Typography, AppBar, Toolbar, IconButton, Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import api from 'axios'
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InfoIcon from '@material-ui/icons/Info';
import validator from 'validator'


const useStyles = makeStyles(theme => ({
    page: {
        backgroundColor: theme.palette.background.default,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "scroll",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        content: "",
        zIndex: 0,
    },
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        position: "relative",
        marginTop: "10em"
    },
    rootMobile: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "auto",
        height: "20em",
    },
    cardCep: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        position: "relative",
        height: "25em",
        width: "20em"
    }
}))


export default function GoogleFlow() {
    const classes = useStyles()
    const [cep, setCep] = useState('')
    const [message, setMessage] = useState('')
    const [number, setNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [address, setAddress] = useState([])
    const [error, setError] = useState(true)
    const logged = useSelector(state => state)

    const validatePhoneNumber = (phone) => {
        const isValidPhoneNumber = validator.isMobilePhone(phone, 'pt-BR')
        return (isValidPhoneNumber)
    }

    useEffect(() => {
        load()
    }, [cep])

    function load() {
        api.get(`https://apps.widenet.com.br/busca-cep/api/cep/${cep}.json`).then(response => {
            const responseUser = {
                response
            }

            if (responseUser.response.data.status === 200) {
                setAddress(responseUser.response.data)
                setError(false)
            } else {
                setError(true)
                setMessage('Cep Inválido')
            }

        }).catch(error => {
            console.log(error)
        })

    }

    console.log(logged)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setCep(e.target.value)
        }
    }

    const handleOnClickSalveContact = () => {
        console.log("entrou")
        window.location.reload()
        if(number === null || phone === null || cpf === null){
            console.log("Preencha todos os campos")
        }
    }

    return (
        <div className={classes.page}>
            <Container className={classes.root}>
                {error === true ?
                    <>
                        <AppBar color="primary">
                            <Toolbar >
                                <IconButton edge="start" color="inherit">
                                    <InfoIcon />
                                </IconButton>
                                <Typography variant="h6">
                                    Informe o CEP
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <TextField onKeyDown={handleKeyDown} id="filled-required" label="Digite seu CEP..." variant="filled" helperText={message} />
                    </>
                    :
                    <>
                        <AppBar color="primary">
                            <Toolbar >
                                <IconButton edge="start" color="inherit">
                                    <InfoIcon />
                                </IconButton>
                                <Typography variant="h6">
                                    Finalizar cadastro
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Card className={classes.cardCep}>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <PersonIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography color="textPrimary">{logged.name}</Typography>
                                    </ListItemText>
                                    <ListItemText>
                                        <Avatar alt="User" src={logged.picture.data.url} />
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <EmailIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography color="textPrimary">{logged.email}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <HomeIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Container>
                                            <Typography color="textPrimary">{address.address}</Typography>
                                        </Container>
                                    </ListItemText>
                                    <ListItemText>
                                        <TextField
                                            id="standard-number"
                                            label="Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            onChange={e => setNumber(e.target.value)}
                                            value={number}
                                        />
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <LocationCityIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography color="textPrimary">{address.district}</Typography>
                                    </ListItemText>
                                    <ListItemText>
                                        <Typography color="textPrimary">{address.city}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <PhoneIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <TextField
                                            id="standard-number"
                                            label="Phone Number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            onChange={e => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                    </ListItemText>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <CreditCardIcon />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <TextField
                                            id="standard-number"
                                            label="CPF"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            onChange={e => setCpf(e.target.value)}
                                            value={cpf}
                                        />
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Card>
                        <br></br>
                        <Button onClick={handleOnClickSalveContact} color='primary' variant="contained">Salvar</Button>
                    </>}
            </Container>
        </div>
    )
}
