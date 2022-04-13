import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {IconButton, ListItem, ListItemText, TextField, withStyles} from "@material-ui/core";
import TextEditor from "../../util/text-editor";
import CloseIcon from "@material-ui/icons/Close";
import {FileCopy} from "@material-ui/icons";
import List from "@material-ui/core/List";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postThunks} from "../../../store/post-slice";
import StackOverflowRelatedPosts from "./stack-overflow-related-posts";
import {stackOverFlowActions} from "../../../store/stackoverflow-slice";
import {useHistory} from 'react-router';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        justifyContent: "flex-end",
        width: '100%',
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    newPost: {
        marginTop: '10px',
        float: 'right',
        '& span': {
            padding: '6px 14px'
        },
    }
});

const NewPost = withStyles(styles)(({classes}) => {
    const [open, setOpen] = useState(false);
    const [postBody, setPostBody] = useState();
    const [postTitle, setPostTitle] = useState();
    const [feedDialogOpen, setFeedDialogOpen] = useState(false);
    const {feedId} = useParams();
    const history = useHistory();

    const handleBodyChange = (body) => setPostBody(body);

    const handleTitleChange = (e) => setPostTitle(e.target.value);

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const courseSelected = useSelector(state => state.courses.selectedCourse);

    const handleSubmit = async (feedIdForCreate) => {
        if (postBody !== undefined && postTitle !== undefined && user.token) {
            const res = await dispatch(await postThunks.createPostForFeed({feedId: feedIdForCreate, postTitle, postBody}))
            if (!res.error && feedIdForCreate !== Number.parseInt(feedId)) {
                history.push(`/feed/${feedIdForCreate}`);
            }
        }
        setOpen(false);
        setFeedDialogOpen(false);
    };

    const stackOverflowPosts = useSelector(state => state.stackOverflowPosts.stackOverflowPosts);

    const [stackPostTitle, setstackPostTitle] = useState("");

    const hitStackApi = ({keyCode}) => {
        //ArrowLeft Keyboard Event
        if (keyCode === 39) {
            setstackPostTitle(postTitle);
        }

    }

    const handleClose = () => {
        dispatch(stackOverFlowActions.stackOverFlowComplete());
        setOpen(false);
    }

    const feedList = () => {
        setFeedDialogOpen(true);
    }
    useEffect(() => {
        document.addEventListener("keyup", hitStackApi, false);

        return () => {
            document.removeEventListener("keyup", () => {
            }, false);
        };
    },);

    return (
        <div>
            <Button variant={'contained'} className={classes.newPost} onClick={() => setOpen(true)}>
                <FileCopy/>New Post
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="new-post-title"
                aria-describedby="new-post-text-box">
                <DialogTitle id="new-post-title">
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent id="new-post-text-box">
                    <TextField
                        label="New Post"
                        placeholder="Post Title"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        onChange={(e) => handleTitleChange(e)}/>
                    <TextEditor
                        placeholder="What would you like to talk about?"
                        feedList={feedList}
                        onSubmit={content => {
                            setPostBody(content)
                            feedList()
                        }}
                        onCancel={() => setOpen(false)}
                        onChange={handleBodyChange}/>
                    <StackOverflowRelatedPosts title={stackPostTitle}/>
                </DialogContent>
                <DialogActions>
                    <Dialog onClose={() => setFeedDialogOpen(false)}
                            aria-labelledby="post-selection" open={feedDialogOpen}>
                        <DialogTitle id="post-selection">
                            Which feed would you like to post to?
                        </DialogTitle>
                        <List>
                            {courseSelected?.feeds?.map((f, i) =>
                                                            <ListItem key={i} autoFocus button
                                                                      onClick={() => handleSubmit(
                                                                          f.feedId)}>
                                                                <ListItemText primary={f.feedName}/>
                                                            </ListItem>)}
                        </List>
                    </Dialog>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default NewPost



