import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { Container, Button, ButtonGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import imagem from '../../image/background.jpg'
import { isMobile, isBrowser } from 'react-device-detect'
import SmsIcon from '@material-ui/icons/Sms';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

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
        width: "20em",
        marginRight: "1em",
        height: "20em",
    },
    rootMobile: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "20em",
        height: "20em",
    },
    button: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
    }
}))

export default function LoginPage({ history }) {
    const classes = useStyles()
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        dispatch({ type: 'LOAD_USER', user: response.profileObj })
        history.push(`/googleflow/${response.tokenId}`)
    }

    const responseGoogleFailure = () => {
        setMessage('Login Failed')
    }

    const responseFacebook = (response) => {
        console.log("entrei")
        console.log(response);
    }

    const renderContent = () => {
        if (isMobile) {
            return (
                <div className={classes.page}>

                    <Container className={classes.rootMobile}>
                        <ButtonGroup className={classes.button} orientation="vertical">
                            <GoogleLogin
                                clientId="911159398692-t8f5eipkjei3u5ag4040rmecrmb2k9f6.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-google-plain"></i>} variant="contained" color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login com o Google</Button>
                                )}
                                buttonText="Entre com o Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            >
                            </GoogleLogin>
                            <FacebookLogin
                                appId="223215205718112"
                                autoLoad
                                fields="name, email, picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-facebook-plain"></i>} variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login com o Google</Button>
                                )}
                                scope="public_profile"
                            />
                            <Button startIcon={<SmsIcon />} variant="contained" color="default">Login com Telefone</Button>
                        </ButtonGroup>
                        <p>{message}</p>
                    </Container>
                </div>
            )
        } else if (isBrowser) {
            return (
                <div className={classes.page}>
                    <Container className={classes.root}>
                        <ButtonGroup className={classes.button} orientation="vertical" >
                            <GoogleLogin
                                clientId="911159398692-t8f5eipkjei3u5ag4040rmecrmb2k9f6.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-google-plain"></i>} variant="contained" color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login com o Google</Button>
                                )}
                                buttonText="Entre com o Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
                            >
                            </GoogleLogin>
                            <FacebookLogin
                                appId="223215205718112"
                                autoLoad
                                fields="name, email, picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <Button startIcon={<i className="devicon-facebook-plain"></i>} variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login com o Google</Button>
                                )}
                                scope="public_profile"
                            />
                            <Button startIcon={<SmsIcon />} variant="contained" color="default">Login com Telefone</Button>
                        </ButtonGroup>
                        <p>{message}</p>
                    </Container>
                </div>

            )
        }
    }
    return renderContent()
}
