import {makeStyles} from "@material-ui/core/styles";

export const drawerWidth = 240;

const useSideNavStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.main,
        width: drawerWidth,
        color: '#fff',
    },
    drawerHeader: {
        '& button': {
            margin: 0,
        },
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    drawerCollapse: {
        float: "right",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    hamburger: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.main,
    },
    selected: {
      backgroundColor: theme.palette.secondary.dark + ' !important',
    },
}));

export default useSideNavStyles;
