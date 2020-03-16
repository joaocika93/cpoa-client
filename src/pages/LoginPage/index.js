import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { Container, Card, TextField, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../services/api'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "20em",
        marginTop: "8em",
        height: "20em"

    },
    card: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "20em",
        height: "20em"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        boxSizing: "border-box",

    },
    google: {
        height: "3em"
    }
}))

export default function LoginPage({ history }) {
    const classes = useStyles()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    async function dataApi() {
        const response = await api.get(`/clientes/buscar/${user}`)
        console.log(response.data.usuario)
        if ((response.data.usuario === user) && (response.data.senha === password)) {
            response.data.logado = true
            history.push(`/home/${response.data.id}`)
            return setMessage("Login com Sucesso!")
        } else {
            return setMessage("Usuario ou senha errados!")
        }
    }

    const responseGoogle = (response) => {
        console.log(response)
        async function addClient() {
            await api.post("/clientes/add",
                {
                    googleId: response.profileObj.googleId,
                    nome: response.profileObj.name,
                    email: response.profileObj.email,
                    imagem: response.profileObj.imageUrl,
                    enderecos: [
                        {
                            id: 1,

                        }
                    ],
                }
            )
        }
        addClient()
    }


    return (
        <>
            <Container className={classes.root}>
                <Card className={classes.card}>
                    <Container className={classes.container}>
                        <TextField
                            id="standard-basic"
                            label="User"
                            value={user}
                            variant="outlined"
                            onChange={e => setUser(e.target.value)}
                        />
                        <br></br>
                        <TextField
                            id="standard-basic"
                            label="Password"
                            value={password}
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Button className={classes.google} variant="contained" color="primary" type="submit" onClick={dataApi}>Login</Button>
                            </Grid>
                            <Grid item>
                                <GoogleLogin
                                    clientId="911159398692-c3n1ckm3l206qqfkpp73lj5tmvmsc7os.apps.googleusercontent.com"
                                    buttonText="Entre com o Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className={classes.google}>
                                </GoogleLogin>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item className={classes.container}>
                                <p>{message}</p>
                            </Grid>
                        </Grid>
                    </Container>
                </Card>
            </Container>
        </>
    )
}
