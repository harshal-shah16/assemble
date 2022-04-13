import React, {useState} from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Editable from "./editable";
import {useDispatch, useSelector} from "react-redux";
import {postSelectors} from "../../../store/post-slice";
import useStyles, {answerStyles, commentStyles, questionStyles} from './post-styles';
import CrudDispatcher from "./CrudDispatcher";
import Resolver from './resolver';
import {CardActionArea, CardContent, Collapse, Tooltip} from '@material-ui/core';
import TextEditor from '../../util/text-editor';
import {ArrowDownward} from '@material-ui/icons';

const Post = ({post, user}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false)
    const [answering, setAnswering] = useState(false);
    const [commenting, setCommenting] = useState(false);

    const lastComment = post.comments.length - 1;
    const answers = post.question.answers
    const comments = post.comments

    const likes = useSelector(
        state => postSelectors.selectById(state, post.postId)?.likes)

    const dispatcher = new CrudDispatcher(post, useDispatch());
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleLikingForPost = (postId) => {
        if (likes.userIds.includes(user.userId)) {
            // alert("userid" + user.userId)
            dispatcher.handleDeletePostLike(post.courseId, post.postId, user.userId)
        } else {
            //const newUserIds = [...post.likes.userIds, user.userId]
            //const updatePostLike = {...post, likes:{userIds:newUserIds}}
            dispatcher.handleUpdatePostLike(post.courseId, post.postId, user.userId)
        }
    }

    const handleLikingForAnswer = (answerId) => {

        const answers = post?.question?.answers
        const selectedAnswer = answers?.find(answer => answer.answerId === answerId);
        const answerLikes = selectedAnswer?.likes;
        if (answerLikes?.userIds.includes(user.userId)) {

            dispatcher.handleDeleteAnswerLike(post.courseId, answerId, user.userId)
        } else {

            dispatcher.handleUpdateAnswerLike(post.courseId, answerId, user.userId)
        }
    }

    const handleLikingForComment = (commentId) => {

        const comments = post?.comments
        const selectedComment = comments?.find(comment => comment.commentId === commentId);
        const commentLikes = selectedComment?.likes;
        if (commentLikes?.userIds.includes(user.userId)) {

            dispatcher.handleDeleteCommentLike(post.courseId, commentId, user.userId)
        } else {

            dispatcher.handleUpdateCommentLike(post.courseId, commentId, user.userId)
        }
    }

    return (
        <Card
            className={clsx(classes.root, post.question.resolved ? classes.resolvedQuestion
                                                                 : classes.unresolvedQuestion)}>
            <div className={post.question.answers.length !== 0 || answering || commenting
                            ? classes.divider : ''}>
                <Editable
                    content={post.postBody}
                    fullName={`${post.courseRole.user.firstName} ${post.courseRole.user.lastName}`}
                    title={post.postTitle}
                    role={post.courseRole.role}
                    time={post.createdAt}
                    placeholder={`@${post.postId}`}
                    headerAction={<Resolver
                        disableTitle={'Mark Unresolved'}
                        enableTitle={'Mark Resolved'}
                        status={post.question.resolved}
                        handleToggle={() =>
                        dispatcher.handleQuestionUpdate({resolved: !post.question.resolved})
                    }/>}
                    numLikes={post.likes.userIds.length}
                    useStyles={questionStyles}
                    updatable={post.createdByUserId === user.userId}
                    commentable={true}
                    answerable={true}
                    deletable={post.createdByUserId === user.userId}
                    likeable={true}
                    handleUpdating={newContent => dispatcher.handleUpdatePost(
                        post, newContent)}
                    handleAnswering={() => setAnswering(true)}
                    handleCommenting={() => setCommenting(true)}
                    handleDeleting={() => dispatcher.handleDeletePost()}
                    handleLiking={() => handleLikingForPost(
                        post.postId)}
                />
            </div>

            {(answering || commenting || answers.length !== 0) &&
             <CardContent>
                 {answers.length !== 0 &&
                  answers.map((ans, ndx) =>
                                  <Editable
                                      key={ans.answerId}
                                      content={ans.content}
                                      fullName={`${ans.courseRole?.user.firstName} ${ans.courseRole?.user.lastName}`}
                                      role={ans.courseRole.role}
                                      title="Answer"
                                      time={ans.createdAt}
                                      placeholder={`${post.postId}.${ndx}`}
                                      numLikes={ans.likes.userIds.length}
                                      useStyles={answerStyles}
                                      updatable={ans.createdByUserId === user.userId}
                                      deletable={ans.createdByUserId === user.userId}
                                      likeable={true}
                                      handleUpdating={newContent =>
                                          dispatcher.handleUpdateAnswer(ans, newContent)}
                                      handleDeleting={() =>                                          // TODO set up deleting for answers
                                          dispatcher.handleDeleteAnswer(ans.answerId)}
                                      handleLiking={() =>
                                          // TODO set up liking for answers
                                          handleLikingForAnswer(ans.answerId)}
                                  />)
                 }
                 {answering &&
                  <TextEditor
                      placeholder={'What do you want to answer with?'}
                      onSubmit={content => {
                          dispatcher.handleCreateAnswer(content)
                          setAnswering(false)
                      }}
                      onCancel={() => setAnswering(false)}
                  />
                 }
                 {commenting &&
                  <TextEditor
                      placeholder={'What do you want to comment on?'}
                      onSubmit={content => {
                          dispatcher.handleCreateComment(content);
                          setExpanded(true)
                          setCommenting(false)
                      }}
                      onCancel={() => setCommenting(false)}
                  />
                 }
             </CardContent>
            }
            {post.comments.length !== 0 && <>
                <Tooltip
                    title={(expanded ? 'Collapse' : 'Expand') + ' Comments Section'}>
                    <CardActionArea
                        className={expanded ? classes.divider : ''}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ArrowDownward className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}/>
                    </CardActionArea>
                </Tooltip>


                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {
                        comments.map((com, ndx) =>
                                         <CardContent
                                             key={com.commentId}
                                             className={lastComment !== ndx
                                                        ? classes.divider : ''}>
                                             <Editable
                                                 content={com.content}
                                                 fullName={`${com.courseRole.user.firstName} ${com.courseRole.user.lastName}`}
                                                 title="Comment"
                                                 role={com.courseRole.role}
                                                 time={com.createdAt}
                                                 placeholder={`followup for postId @${post.postId}`}
                                                 numLikes={com.likes.userIds.length}
                                                 useStyles={commentStyles}
                                                 updatable={com.createdByUserId === user.userId}
                                                 deletable={com.createdByUserId === user.userId}
                                                 likeable={true}
                                                 handleUpdating={newContent =>
                                                     dispatcher.handleUpdateComment(com, newContent)
                                                 }
                                                 handleDeleting={() =>
                                                     dispatcher.handleDeleteComment(com.commentId)}
                                                 handleLiking={() =>
                                                     // TODO set up liking for comments
                                                     handleLikingForComment(com.commentId)}
                                             />
                                         </CardContent>)
                    }
                </Collapse>
            </>}
        </Card>

    );
};

export default Post
