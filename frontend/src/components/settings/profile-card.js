import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {postSelectors} from "../../store/post-slice";
import {statuses} from "../../store/state-types";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(40),
            height: theme.spacing(90),
        },
    },
    avatarStyle: {
        margin: "auto",
        color: "black",
        backgroundColor: "orange",
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: 40,
        marginBottom: "3rem",
    },
    myRecords: {
        display: "flex",
        flexDirection: "column",
        fontSize: 40,
        justifyContent: "center",
        alignItems: "center",

    },
    myPosts: {
        marginBottom: "4rem",
    },
    myAnswers: {
        marginBottom: "4rem",

    },
    myComments: {

    },
}));

const ProfileCard = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.session.user);
    const [initials, setInitials] = useState();

    useEffect(() => {

        if (user.token) {
            setInitials(user.firstName[0] + user.lastName[0])
        }
    }, [user])



    return (
        <div className={classes.root}>

            <Paper variant="outlined">
                <Avatar className={classes.avatarStyle}>
                    {initials}
                </Avatar>
                <div className={classes.myRecords}>
                    <div>10</div>
                    <div className={classes.myPosts}> Posts</div>
                    <div>20</div>
                    <div className={classes.myAnswers}>Answers</div>
                    <div>30</div>
                    <div className={classes.myComments}>Comments</div>
                </div>
            </Paper>
        </div>
    );
}

export default ProfileCard