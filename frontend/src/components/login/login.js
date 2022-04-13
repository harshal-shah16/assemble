import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./copyright";
import {useHistory} from "react-router";
import {toast, ToastContainer} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux'
import {userThunks} from '../../store/user-slice';
import { sessionService } from 'redux-react-session';
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {

    const dispatch = useDispatch()

    const history = useHistory();

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const handleLogin = async (event) => {
        event.preventDefault()
        const resultAction = await dispatch(
            userThunks.login({email: email,password: password})
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
        }
        else {
            sessionService.saveSession(resultAction.payload)
                .then(() => {
            sessionService.saveUser(resultAction.payload)
                .then(() => {
                history.push('/');
            });
        });

        }       
        
    }


    const [checked, setChecked] = useState(false);
    const handleRemember = (event) => {
        setChecked(event.target.checked);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

   
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
   
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Assemble
                </Typography>

                <Typography component="h2" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        value={email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="emailLogin"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmail}
                        type="email"
                    />
                    <TextField
                        value={password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="passwordLogin"
                        autoComplete="current-password"
                        onChange={handlePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={checked}
                                           onChange={handleRemember}/>}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                    >
                        Sign In
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
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>

            <Box mt={8}>
                <Copyright/>
            </Box>

        </Container>
    );
}

export default SignIn;
