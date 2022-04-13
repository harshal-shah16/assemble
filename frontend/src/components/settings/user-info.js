import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(90),
            height: theme.spacing(90),
        },
    },
    myAccountRow: {
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
    },
    editButtonStyle: {
        backgroundColor: "#DC004E",
        color: "white",
    },
    saveButtonStyle: {
        backgroundColor: "#00A300",
        color: "white",
    },
}));

const UserInfo = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        if (user.token) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email)
        }
    }, [user])

    const [helperText, setHelperText] = useState("");
    const [readOnly, setReadOnly] = useState(true);


    return (
        <div className={classes.root}>
            <Paper variant="outlined">
                <Typography variant="h6" gutterBottom className={classes.myAccountRow}>
                    My Account
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.saveButtonStyle}
                            startIcon={<SaveIcon/>}
                            onClick={() => {
                                setReadOnly(true)
                                setHelperText("")
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.editButtonStyle}
                            startIcon={<EditIcon/>}
                            onClick={() => {
                                setReadOnly(false)
                                setHelperText("can be changed")
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                </Typography>

                <Divider/>


                <div style={{padding: 20}}>

                    <Typography variant="overline" display="block" gutterBottom>
                        USER INFORMATION
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={email}
                                required
                                disabled={true}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Password"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: readOnly,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>

                    <br/>
                    <Divider/>
                    <br/>

                    <Typography variant="overline" display="block" gutterBottom>
                        PERSONAL INFORMATION
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: readOnly,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                required
                                helperText={helperText}
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: readOnly,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                required
                                helperText={helperText}
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Grid>
                    </Grid>


                </div>

            </Paper>

        </div>
    );
}

export default UserInfo;
