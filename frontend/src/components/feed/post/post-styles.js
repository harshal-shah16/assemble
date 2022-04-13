import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px 0',
        marginBottom: "50px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    nestedCard: {
        marginLeft: '20px',
        marginRight: '20px',
    },
    unresolvedQuestion: {
        //box-shadow: h-offset v-offset blur spread color, [...another shadow]
        boxShadow: `0px 1px 1px 0px ${theme.palette.error.light},
                    1px 1px 1px 0px ${theme.palette.error.light},
                    1px 1px 1px 1px ${theme.palette.error.light}`,
        borderTop: `1px solid ${theme.palette.error.light}`,
        borderLeft: `1px solid ${theme.palette.error.light}`,
    },
    resolvedQuestion: {
        //box-shadow: h-offset v-offset blur spread color, [...another shadow]
        boxShadow: `0px 3px 1px 0px ${theme.palette.success.main},
                    2px 1px 1px 0px ${theme.palette.success.main},
                    1px 1px 3px 1px ${theme.palette.success.main}`,
        borderTop: `1px solid ${theme.palette.success.main}`,
        borderLeft: `1px solid ${theme.palette.success.main}`,
    },
    divider: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: "2px solid",
        borderBottomStyle: "outset",
    },
    answer: {
        backgroundColor: theme.palette.success.dark,
    },
    discussion: {
        backgroundColor: theme.palette.info.main,
    },
    cardActions: {},
    expand: {
        margin: 'auto',
        display: 'block',
        padding: '0',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    test: {
        backgroundColor: "yellow"
    }
}));
export default useStyles;

export const questionStyles = makeStyles(theme => ({
    root: {},
}));
export const answerStyles = makeStyles(theme => ({
    root: {},
}));
export const commentStyles = makeStyles(theme => ({
    root: {},
}));
