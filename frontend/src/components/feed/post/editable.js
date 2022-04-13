import React, {useState} from 'react';
import TextEditor from "../../util/text-editor";
import {Card, CardActions, CardContent, IconButton, Tooltip, useTheme,} from "@material-ui/core";
import {FaEdit} from "react-icons/all";
import PostHeader from "./post-header";
import {Comment, Spellcheck, ThumbUp} from "@material-ui/icons";
import {FaTrash} from "react-icons/fa";

const Editable = (
    {
        content,
        fullName = '',
        role = '',
        title = "",
        time = '',
        placeholder = '',
        headerAction = <></>,
        numLikes = 0,
        useStyles = () => ({root: {}}),
        updatable = false,
        commentable = false,
        answerable = false,
        deletable = false,
        likeable = false,
        handleUpdating = () => undefined,
        handleAnswering = () => undefined,
        handleCommenting = () => undefined,
        handleDeleting = () => undefined,
        handleLiking = () => undefined,
    }
) => {
    const classes = useStyles();
    const [open, setOpen] = useState(!Boolean(content));
    const theme = useTheme();

    const handleClickOpen = () => setOpen(true)

    return (
        <>
            {
                !open && content &&
                <Card className={classes.root}>
                    <PostHeader
                        title={title}
                        fullName={fullName}
                        role={role}
                        time={time}
                        placeholder={placeholder}
                        action={headerAction}
                    />
                    <CardContent dangerouslySetInnerHTML={{__html: content}}/>

                    <CardActions>
                        {
                            likeable &&
                            <>
                                <Tooltip title={'Like'}>
                                    <IconButton
                                        onClick={handleLiking}>
                                        <ThumbUp style={{color: theme.palette.primary.light}}
                                                 fontSize={'small'}/>
                                    </IconButton>
                                </Tooltip>
                                {numLikes !== 0 && numLikes}
                            </>
                        }
                        {
                            commentable &&
                            <Tooltip title={'Comment'}>
                                <IconButton
                                    onClick={handleCommenting}>
                                    <Comment style={{color: theme.palette.info.dark}}
                                             fontSize={'small'}/>
                                </IconButton>
                            </Tooltip>
                        }
                        {
                            answerable &&
                            <Tooltip title={'Answer'}>
                                <IconButton
                                    onClick={handleAnswering}>
                                    <Spellcheck style={{
                                        color: theme.palette.success.dark,
                                        fontSize: 1.8 + 'rem'
                                    }}/>
                                </IconButton>
                            </Tooltip>
                        }
                        {
                            updatable &&
                            <span style={{marginLeft: 'auto'}}>
                                {deletable &&
                                 <Tooltip title={'Delete'}>
                                     <IconButton size={"medium"} onClick={handleDeleting}>
                                         <FaTrash color={theme.palette.error.main} size={20}/>
                                     </IconButton>
                                 </Tooltip>
                                }
                                <Tooltip title={'Edit'}>
                                    <IconButton size={"medium"} onClick={handleClickOpen}>
                                                <FaEdit color={theme.palette.secondary.dark}
                                                        size={20}/>
                                    </IconButton>
                                </Tooltip>
                            </span>
                        }
                    </CardActions>

                </Card>
            }


            {
                open &&
                <TextEditor
                    content={content}
                    onSubmit={content => {
                        handleUpdating(content);
                        setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                />
            }
        </>
    )
};

export default Editable;
