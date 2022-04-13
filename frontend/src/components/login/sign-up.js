import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./copyright";
import {useDispatch, useSelector} from "react-redux";
import {userThunks} from "../../store/user-slice";
import {toast, ToastContainer} from "material-react-toastify";
import {sessionService} from "redux-react-session";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const [firstName, setFirstName] = React.useState("");
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const [lastName, setLastName] = React.useState("");
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const [email, setEmail] = React.useState("");
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = React.useState("");
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


    const dispatch = useDispatch()

    const handleSignUp = async () => {
        const resultAction = await dispatch(
            userThunks.signup({firstName: firstName, lastName: lastName, password: password, email: email})
        )
        if (resultAction.error) {
            toast.error(resultAction.error.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } else {
            dispatch(userThunks.login({email: email, password: password})).then(() => {
                sessionService.saveSession(resultAction.payload)
            })
                .then(() => {
                    sessionService.saveUser(resultAction.payload)
                        .then(() => {
                            history.push('/');
                        });
                });
        }

    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Assemble
                </Typography>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                firstname={firstName}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                lastname={lastName}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleLastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                email={email}
                                variant="outlined"
                                required
                                fullWidth
                                id="emailSignUp"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleEmail}
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                password={password}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="passwordSignup"
                                autoComplete="current-password"
                                onChange={handlePassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default SignUp
