import React, {useState} from 'react';
import ProfileCard from "./profile-card";
import UserInfo from "./user-info";
import Grid from "@material-ui/core/Grid";
import ToggleButton from '@material-ui/lab/ToggleButton';
import {ToggleButtonGroup} from "@material-ui/lab";
import CourseManager from "./course-manager";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "2rem",
    }
}))


const ProfilePage = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={6}>
                    <UserInfo/>
                </Grid>

                <Grid item xs={4}>
                    <ProfileCard/>
                </Grid>

            </Grid>

        </div>

    );
}

export default ProfilePage;
