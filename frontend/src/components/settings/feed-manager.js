import React, {useEffect, useState} from "react";
import {Snackbar, TextField, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SingleFeed from "./single-feed";
import {courseThunks} from "../../store/course-slice";
import {useDispatch} from "react-redux";
import {Alert} from "@material-ui/lab";


const FeedManager = ({rowData}) => {
    const dispatch = useDispatch()
    const [newFeed, setNewFeed] = useState("")
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const handleChange = (e) => {
        setNewFeed(e.target.value)
    }

    const handleAddCourse = () => {
        if (!newFeed) {
            setSnackBarOpen(true)
        } else {
            dispatch(courseThunks.createFeedForCourse({
                courseId: rowData.courseId,
                feed: {
                    feedName: newFeed
                }
            }))
        }
    }

    const handleClose = (event, reason) => {
        setSnackBarOpen(false);
    };

    return (

        <>

            <TextField helperText="Add a feed" onChange={handleChange} defaultValue={newFeed}
                       disabled={rowData.status === 0}/>
            <Tooltip title="Add">
                <>
                    <IconButton onClick={handleAddCourse} disabled={rowData.status === 0}>
                        <AddIcon/>
                    </IconButton>
                </>
            </Tooltip>


            <Snackbar open={snackBarOpen} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    Cannot add empty feed
                </Alert>
            </Snackbar>


            <br/>

            {rowData.feeds.map((feed, ndx) => {
                return (
                    <span style={{marginRight: 10}} key={ndx}>
                        <SingleFeed feed={feed} disable={rowData.status === 0}/>
                    </span>
                )
            })}

        </>
    )
}

export default FeedManager