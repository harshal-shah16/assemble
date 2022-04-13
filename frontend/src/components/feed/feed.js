import NewPost from "./newPost/new-post";
import {
    CircularProgress,
    Container,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Post from "./post/post";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {postSelectors, postThunks} from "../../store/post-slice";
import {useDispatch, useSelector} from "react-redux";
import {statuses} from "../../store/state-types";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '98%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '70%',
        },
        flexGrow: 1,
    },
    searchBar: {
        margin: theme.spacing(1),
        width: '100%',
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
}));

const Feed = () => {

    const classes = useStyles();
    const {feedId} = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(postSelectors.selectAll);
    const user = useSelector(state => state.session.user);
    const postStatus = useSelector(state => state.posts.status)
    const [displayedPosts, setDisplayedPosts] = useState([]);

    const handleSearch = (value) =>
        setDisplayedPosts(
            posts.filter(p =>
                             p.postTitle.toUpperCase().indexOf(value) !== -1
                             || p.postBody.toUpperCase().indexOf(value) !== -1
                             || p.comments.find(
                             c => c.content.toUpperCase().indexOf(value) !== -1) !== undefined
                             || p.question.answers.find(
                             a => a.content.toUpperCase().indexOf(value) !== -1) !== undefined)
        );
    useEffect(() => {
        if (feedId !== "undefined" && typeof feedId !== "undefined" && user.token) {
            dispatch(postThunks.findAllPostsForFeed({feedId}))
        }
    }, [dispatch, feedId, user.token, user.userId])

    useEffect(() => setDisplayedPosts(posts), [posts]);

    return (
        <Container className={classes.root}>

            {
                postStatus === statuses.LOADING && <CircularProgress className={classes.loading}
                                                                     size={60}/>
            }

            <Grid container spacing={3}>
                <Grid item xs={9} offset={3}>
                    <TextField
                        onChange={e => handleSearch(e.target.value.toUpperCase())}
                        id="outlined-start-adornment"
                        className={classes.searchBar}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: <InputAdornment
                                position="start"><SearchIcon/></InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={3}>
                    <NewPost/>
                </Grid>
            </Grid>
            <hr/>
            {displayedPosts?.map(p => <Post key={p.postId} post={p} user={user}/>)}
            {(!displayedPosts || displayedPosts?.length === 0) && postStatus !== statuses.LOADING &&
             <Typography variant={'h3'} style={{marginTop: '2%'}}>
                 No post for this feed yet...
             </Typography>}

        </Container>
    );
}

export default Feed
