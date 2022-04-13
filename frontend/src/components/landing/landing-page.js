import React from 'react'
import {AppBar, Container, Grid, makeStyles, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import hero1 from './landing-page-hero1.png'
import hero2 from './landing-page-hero2.png'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: "#9AAF88"
    },
    title: {
        flexGrow: 1,
    },
    navComp: {
        marginRight: "20px",
        color: "white",
    },
    header: {
        color: "#A09C9C",
        margin: '0 20%',
        alignItems: 'middle'
    },
    img: {
        height: "400px",
        [theme.breakpoints.down('sm')]: {
            height: '200px',
        },
    }
}));

const LandingPage = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="relative">
                <Toolbar className={classes.navbar}>
                    <Typography variant="h6" className={classes.title}>
                        Assemble
                    </Typography>
                    <Link style={{textDecoration: 'none'}} className={classes.navComp}
                          to="/login">Login </Link>
                    <Link style={{textDecoration: 'none'}} className={classes.navComp}
                          to="/sign-up">Sign up</Link>
                </Toolbar>
            </AppBar>
            <Container className="lg">
                <div style={{paddingTop: "25px"}}>
                    <Grid container>
                        <Grid xs={12} sm={6}>
                            <img className={classes.img} src={hero1} alt={'hero1'}/>
                        </Grid>
                        <Grid alignItems="center" xs={12} sm={6}>
                            <h1 className={classes.header}>
                                Simple and effective Q&A Platform for students and instructors
                            </h1>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6} alignItems="center">
                            <h1 className={classes.header}>
                                Integrates web answers with in class answers
                            </h1>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className={classes.img} src={hero2} alt='hero2'/>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default LandingPage
