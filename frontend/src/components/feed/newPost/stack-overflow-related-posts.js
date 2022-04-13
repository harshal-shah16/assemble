import {InputLabel, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import Link from "@material-ui/core/Link";
import stackOverflowService from "../../../services/stack-overflow-service";
import {connect} from "react-redux";
import {stackOverFlowThunks} from "../../../store/stackoverflow-slice";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {marginTop: '30px',},
    description: {},
    summary: {},
    recentPost: {
        borderBottom: '.5px solid' + theme.palette.primary.main,
        marginTop: '5px'
    }
}));

const StackOverflowRelatedPosts = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();
   
    const stackOverflowPosts = useSelector(state => state.stackOverflowPosts.stackOverflowPosts);


    useEffect( () => {
        if (props.title){
        //findStackOverflowPosts(props.title)
        const resultAction = dispatch(stackOverFlowThunks.results(props.title))
        
        }
    }, [dispatch, props.title]);

    return (
        <div className={classes.root}>
            <InputLabel shrink> Stack Overflow Related Posts</InputLabel>
            <Paper variant="outlined">
                {stackOverflowPosts
                    .items.map((data, i) =>
                                   <Grid key={i} className={classes.recentPost}
                                         container>

                                       <Grid item xs={4}
                                             className={classes.description}>
                                           <Link href={data.link} target={'_blank'}>
                                               {data.view_count}
                                           </Link>

                                       </Grid>

                                       <Grid item xs={8} className={classes.summary}>
                                           {data.title}
                                       </Grid>

                                   </Grid>
                    )}
            </Paper>
        </div>
    );
}

export default StackOverflowRelatedPosts;
