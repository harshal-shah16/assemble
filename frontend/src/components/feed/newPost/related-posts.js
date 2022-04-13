import {InputLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '30px',
    },
    description: {},
    summary: {},
    recentPost: {
        borderBottom: '.5px solid ' + theme.palette.primary.main,
        marginTop: '5px'
    }
}));

const RelatedPosts = () => {
    const classes = useStyles();
    let bogusText = 'Rerum nesciunt omnis pariatur consectetur illum.'
                    + 'Molestiae illo deleniti dolor nobis. Architecto'
                    + 'voluptatem provident inventore quia maxime sapiente'
                    + 'est rerum.'
    return (
        <div className={classes.root}>
            <InputLabel shrink>Assemble Related Posts</InputLabel>
            <Paper variant="outlined">
                {['@231 yesterday', '@111 one week ago', '@65 10/11/2020']
                    .map((data, i) =>
                             <Grid key={i} className={classes.recentPost} container>
                                 <Grid item xs={1}>
                                     <Avatar>CS</Avatar>
                                 </Grid>
                                 <Grid item xs={3} className={classes.description}>
                                     <Link href="#">
                                         {data}
                                     </Link>
                                 </Grid>
                                 <Grid item xs={8} className={classes.summary}>
                                     {bogusText}
                                 </Grid>
                             </Grid>
                    )}

            </Paper>
        </div>
    );
}

export default RelatedPosts;
