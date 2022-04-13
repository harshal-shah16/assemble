import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Chip, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import {feedThunks} from "../../store/feed-slice";
import {courseThunks} from "../../store/course-slice";


const SingleFeed = ({feed, disable}) => {

    const dispatch = useDispatch();
    const [feedName, setFeedName] = useState(feed.feedName)
    const [editing, setEditing] = useState(false)

    const handleSave = () => {
        if (feedName !== feed.feedName) {
            dispatch(courseThunks.updateFeedById({
                courseId: feed.courseId,
                feedId: feed.feedId,
                feed: {
                    feedName: feedName
                }
            }))
        }
        setEditing(false)
    }


    return (

        <>

            <Chip
                icon=
                    {
                        <>
                            {
                                !editing && !disable &&
                                <EditIcon onClick={() => setEditing(true)}
                                />
                            }
                            {
                                editing &&
                                <DoneIcon onClick={handleSave}
                                />
                            }
                        </>
                    }

                label=
                    {
                        <>
                            {
                                editing &&
                                <TextField
                                    defaultValue={feedName}
                                    onChange={(e) => setFeedName(e.target.value)}
                                />

                            }

                            {
                                !editing && feedName
                            }
                        </>
                    }

            />

        </>
    )

}


export default SingleFeed;