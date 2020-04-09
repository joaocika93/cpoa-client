import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { Container, Button, ButtonGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import imagem from '../../image/background-app2.jpg'
import { isMobile, isBrowser } from 'react-device-detect'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import api from '../../services/api'

const useStyles = makeStyles(theme => ({
    page: {
        backgroundImage: `url(${imagem})`,
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        marginLeft: "20%"
    },
    button: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: '32em'
    },
    sizeButton: {
        width: "13em"
    }
}))

export default function LoginPage({ history }) {
    const classes = useStyles()
    const [message, setMessage] = useState('')
    const [validator, setValidator] = useState(false)

    useEffect(() => {
        isLogged()
    })

    const responseGoogle = (response) => {
        const user = response
        api.get(`/clientes/buscar/${response.profileObj.googleId}`).then(response => {
            const data = response.data
            if (response.data !== "") {
                localStorage.setItem('logged', 'true')
                localStorage.setItem('googleId', data.googleId)
                history.push(`/home/${data.googleId}`)
            } else {
                localStorage.setItem('googleId', user.profileObj.googleId)
                sessionStorage.setItem('googleId', user.profileObj.googleId)
                sessionStorage.setItem('givenName', user.profileObj.givenName)
                sessionStorage.setItem('imageUrl', user.profileObj.imageUrl)
                sessionStorage.setItem('email', user.profileObj.email)
                history.push(`/googleflow/`)
            }
        })
    }

    const isLogged = () => {
        api.get(`/clientes/buscar/${localStorage.getItem('googleId')}`).then(response => {
            if(response.data === ''){
                setValidator(false)
            }else{
                setValidator(true)
            }
        })

        if (localStorage.getItem('logged') === "true" && validator === true ) {
            history.push(`/home`)
        }
    }

    const responseGoogleFailure = () => {
        setMessage('Login Failed')
    }

    const responseFacebook = (response) => {
        console.log(response)
        history.push(`/facebookflow/`)
    }

    const renderContent = () => {
        if (isMobile) {
            return (
                <div className={classes.page}>
                    <Container>
                        <ButtonGroup className={classes.button} orientation="vertical">
                            <GoogleLogin
                                clientId="911159398692-t8f5eipkjei3u5ag4040rmecrmb2k9f6.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-google-plain"></i>} variant="contained" color="secondary" onClick={renderProps.onClick} >Login com o Google</Button>
                                )}
                                buttonText="Entre com o Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            >
                            </GoogleLogin>
                            <FacebookLogin
                                appId="223215205718112"
                                fields="name, email, picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-facebook-plain"></i>} variant="contained" color="primary" onClick={renderProps.onClick} >Login com o Facebook</Button>
                                )}
                                scope="public_profile"
                            />
                        </ButtonGroup>
                        <p>{message}</p>
                    </Container>
                </div>
            )
        } else if (isBrowser) {
            return (
                <div className={classes.page}>
                    <Container className={classes.root}>
                        <ButtonGroup className={classes.button} orientation="vertical">
                            <GoogleLogin

                                clientId="911159398692-t8f5eipkjei3u5ag4040rmecrmb2k9f6.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-google-plain"></i>} variant="contained" color="secondary" onClick={renderProps.onClick} >Login com o Google</Button>
                                )}
                                buttonText="Entre com o Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            >
                            </GoogleLogin>
                            <FacebookLogin
                                appId="223215205718112"
                                fields="name, email, picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-facebook-plain"></i>} variant="contained" color="primary" onClick={renderProps.onClick} >Login com o Facebook</Button>
                                )}
                                scope="public_profile"
                            />
                        </ButtonGroup>
                        <p>{message}</p>
                    </Container>
                </div>

            )
        }
    }
    return renderContent()
}
