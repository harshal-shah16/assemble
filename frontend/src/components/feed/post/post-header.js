import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    avatarProfessor: {
        backgroundColor: theme.palette.primary.dark,
    },
    avatarStudent: {
        backgroundColor: theme.palette.secondary.dark,
    },
    role: {
        fontSize: '.75rem',
        display: 'flex',
        justifyContent: 'center',
        fontStyle: 'italic',
    },
}))

const PostHeader = ({title, fullName, role, time, tempMessage, action}) => {
    const classes = useStyles();
    const localTime = new Date(new Date(time).toUTCString().toLocaleString()).toLocaleString()

    return (
        <CardHeader
            avatar={
                <>
                    <Avatar className={role === 'INSTRUCTOR' ? classes.avatarProfessor
                                                             : classes.avatarStudent}
                            aria-label="avatar">
                        {fullName.split(' ')[0][0] + fullName.split(' ')[1][0]}
                    </Avatar>
                    <Typography className={classes.role} variant={'span'}>
                        {role === 'INSTRUCTOR' ? 'Instructor' : 'Student'}
                    </Typography>
                </>
            }
            action={action}
            title=
                {
                    <>
                        {tempMessage}
                        <Typography variant={'h3'}>{title}</Typography>
                        <div>{fullName}</div>
                    </>
                }
            subheader={localTime}
        />
    );
};

export default PostHeader;
