import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "./side-nav-styles";
import SideNav from "./side-nav";
import {AppBar, Toolbar, Tooltip} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import {FaBars} from 'react-icons/all';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import {AccountCircle} from '@material-ui/icons';
import {sessionService} from 'redux-react-session';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Route, useHistory} from 'react-router';
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    title: {
        marginRight: 'auto',
        '&:hover': {
            cursor: 'pointer',
        },
    },
}))

const AssembleAppBar = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();


    return (
        <>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >

                <Toolbar>
                    <Route path={['/feed/:feedId', '/']} exact>
                        <Tooltip title={'Course Menu'}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => setOpen(true)}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <FaBars/>
                            </IconButton>
                        </Tooltip>
                    </Route>
                    <Tooltip title={'Back to first feed'}>
                        <Typography
                            onClick={() => history.push('/')}
                            variant="h6" noWrap className={classes.title}>
                            Assemble
                        </Typography>
                    </Tooltip>
                    <Tooltip title={'Settings'}>
                        <IconButton aria-label="settingIcon"
                                    onClick={() => {
                                        setOpen(false)
                                        history.push('/courses/manager')
                                    }}>
                            <SettingsIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Profile'}>
                        <IconButton aria-label="profileIcon"
                                    onClick={() => {
                                        setOpen(false)
                                        history.push('/profile')
                                    }}>
                            <AccountCircle/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Logout'}>
                        <IconButton aria-label="logOutIcon"
                                    onClick={() => {
                                        sessionService.deleteSession()
                                        sessionService.deleteUser();
                                        dispatch({type: 'RESET'});
                                        history.push('/login')
                                    }}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Tooltip>

                </Toolbar>
                <Route path={['/feed/:feedId', '/']} exact>
                    <SideNav
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                </Route>
            </AppBar>
        </>
    )
}
export default AssembleAppBar;
